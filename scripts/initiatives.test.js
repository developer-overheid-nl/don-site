const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const loadModule = () => import("./initiatives.mjs");

const initiativeFixture = (slug) => ({
  slug,
  source: { repository: `example/${slug}`, branch: "dist-don" },
});

/**
 * Bouwt een nep-build: faalt zolang een van de opgegeven slugs met zijn nieuwste
 * versie is geinstalleerd, en noemt dan het bestand zoals Docusaurus dat doet.
 */
function createBuildFake({ breakingSlugs = [], isAlwaysBroken = false } = {}) {
  const installed = new Map();
  const calls = [];
  return {
    calls,
    install: (slug, choice) => installed.set(slug, choice.origin),
    runBuild: async () => {
      calls.push(Object.fromEntries(installed));
      if (isAlwaysBroken) {
        return { isSuccess: false, output: "Error: src/theme/Foo.tsx" };
      }
      const broken = breakingSlugs.filter(
        (slug) => installed.get(slug) === "latest",
      );
      if (broken.length === 0) {
        return { isSuccess: true, output: "" };
      }
      return {
        isSuccess: false,
        output: broken
          .map(
            (slug) =>
              `Error: Markdown link couldn't be resolved in source file "initiatieven/${slug}/index.md"`,
          )
          .join("\n"),
      };
    },
  };
}

const silentLog = () => {};

test("builds with the latest version of every initiative when it builds", async () => {
  const { buildWithFallback } = await loadModule();
  const fake = createBuildFake();

  const choices = await buildWithFallback({
    initiatives: [initiativeFixture("alpha"), initiativeFixture("beta")],
    fetchLatest: async (initiative) => ({
      directory: `/tmp/${initiative.slug}`,
      commit: "a".repeat(40),
    }),
    snapshotCommit: () => "b".repeat(40),
    install: fake.install,
    runBuild: fake.runBuild,
    log: silentLog,
  });

  assert.equal(fake.calls.length, 1);
  assert.equal(choices.get("alpha").origin, "latest");
  assert.equal(choices.get("beta").origin, "latest");
});

test("reverts only the initiative the build output names", async () => {
  const { buildWithFallback } = await loadModule();
  const fake = createBuildFake({ breakingSlugs: ["beta"] });

  const choices = await buildWithFallback({
    initiatives: [initiativeFixture("alpha"), initiativeFixture("beta")],
    fetchLatest: async () => ({ directory: "/tmp/x", commit: "a".repeat(40) }),
    snapshotCommit: () => "b".repeat(40),
    install: fake.install,
    runBuild: fake.runBuild,
    log: silentLog,
  });

  assert.equal(fake.calls.length, 2);
  assert.equal(choices.get("alpha").origin, "latest");
  assert.equal(choices.get("beta").origin, "snapshot");
  assert.equal(choices.get("beta").commit, "b".repeat(40));
});

test("uses the snapshot when fetching fails", async () => {
  const { buildWithFallback } = await loadModule();
  const fake = createBuildFake();

  const choices = await buildWithFallback({
    initiatives: [initiativeFixture("alpha")],
    fetchLatest: async () => {
      throw new Error("network down");
    },
    snapshotCommit: () => "b".repeat(40),
    install: fake.install,
    runBuild: fake.runBuild,
    log: silentLog,
  });

  assert.equal(choices.get("alpha").origin, "snapshot");
});

test("fails when fetching fails and there is no snapshot", async () => {
  const { buildWithFallback } = await loadModule();
  const fake = createBuildFake();

  await assert.rejects(
    buildWithFallback({
      initiatives: [initiativeFixture("alpha")],
      fetchLatest: async () => {
        throw new Error("network down");
      },
      snapshotCommit: () => null,
      install: fake.install,
      runBuild: fake.runBuild,
      log: silentLog,
    }),
    /geen snapshot/,
  );
});

test("fails when the latest version breaks and there is no snapshot", async () => {
  const { buildWithFallback } = await loadModule();
  const fake = createBuildFake({ breakingSlugs: ["alpha"] });

  await assert.rejects(
    buildWithFallback({
      initiatives: [initiativeFixture("alpha")],
      fetchLatest: async () => ({
        directory: "/tmp/x",
        commit: "a".repeat(40),
      }),
      snapshotCommit: () => null,
      install: fake.install,
      runBuild: fake.runBuild,
      log: silentLog,
    }),
    /nieuwste versie van alpha, en daarvan is geen snapshot/,
  );
  assert.equal(fake.calls.length, 1);
});

test("does not revert other initiatives when the broken one has no snapshot", async () => {
  const { buildWithFallback } = await loadModule();
  const fake = createBuildFake({ breakingSlugs: ["beta"] });

  await assert.rejects(
    buildWithFallback({
      initiatives: [initiativeFixture("alpha"), initiativeFixture("beta")],
      fetchLatest: async () => ({
        directory: "/tmp/x",
        commit: "a".repeat(40),
      }),
      snapshotCommit: (slug) => (slug === "alpha" ? "b".repeat(40) : null),
      install: fake.install,
      runBuild: fake.runBuild,
      log: silentLog,
    }),
    /nieuwste versie van beta/,
  );
  assert.equal(fake.calls.length, 1);
});

test("reverts everything once, then fails, when the error is not in initiative content", async () => {
  const { buildWithFallback } = await loadModule();
  const fake = createBuildFake({ isAlwaysBroken: true });

  await assert.rejects(
    buildWithFallback({
      initiatives: [initiativeFixture("alpha"), initiativeFixture("beta")],
      fetchLatest: async () => ({
        directory: "/tmp/x",
        commit: "a".repeat(40),
      }),
      snapshotCommit: () => "b".repeat(40),
      install: fake.install,
      runBuild: fake.runBuild,
      log: silentLog,
    }),
    /niet op content van een initiatief/,
  );
  assert.deepEqual(fake.calls, [
    { alpha: "latest", beta: "latest" },
    { alpha: "snapshot", beta: "snapshot" },
  ]);
});

test("findFailingInitiatives matches relative and absolute content paths", async () => {
  const { findFailingInitiatives } = await loadModule();
  const output = [
    'Error: MDX compilation failed for file "/home/user/site/initiatieven/mijn-services/a.md"',
    "Module not found in '/home/user/site/initiatieven/other/b'",
  ].join("\n");

  assert.deepEqual(
    findFailingInitiatives(output, ["mijn-services", "other", "third"]),
    ["mijn-services", "other"],
  );
  assert.deepEqual(findFailingInitiatives(output, ["mijn"]), []);
});

test("installBundle and writeSnapshot keep markdown and images together", async () => {
  const {
    installBundle,
    writeSnapshot,
    readSnapshotCommit,
    snapshotDirectory,
  } = await loadModule();
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "initiatives-test-"));
  const bundle = path.join(root, "bundle");
  fs.mkdirSync(path.join(bundle, "docs", "alpha"), { recursive: true });
  fs.mkdirSync(path.join(bundle, "static", "img", "alpha"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(bundle, "static", "img", "intruder"), {
    recursive: true,
  });
  fs.writeFileSync(path.join(bundle, "docs", "alpha", "index.md"), "# Alpha\n");
  fs.writeFileSync(
    path.join(bundle, "static", "img", "alpha", "logo.svg"),
    "<svg/>",
  );
  fs.writeFileSync(
    path.join(bundle, "static", "img", "intruder", "x.svg"),
    "<svg/>",
  );

  try {
    const commit = "c".repeat(40);
    writeSnapshot(
      {
        initiative: initiativeFixture("alpha"),
        bundleDirectory: bundle,
        commit,
      },
      root,
    );
    assert.equal(readSnapshotCommit("alpha", root), commit);
    assert.equal(readSnapshotCommit("missing", root), null);

    installBundle(
      {
        slug: "alpha",
        bundleDirectory: snapshotDirectory("alpha", root),
        origin: "snapshot",
        commit,
      },
      root,
    );
    assert.ok(
      fs.existsSync(path.join(root, "initiatieven", "alpha", "index.md")),
    );
    assert.ok(
      fs.existsSync(
        path.join(root, ".initiatives", "static", "img", "alpha", "logo.svg"),
      ),
    );
    assert.ok(
      !fs.existsSync(
        path.join(root, ".initiatives", "static", "img", "intruder"),
      ),
      "an initiative only gets images under its own slug",
    );
    const provenance = JSON.parse(
      fs.readFileSync(
        path.join(root, "initiatieven", "alpha", ".provenance.json"),
        "utf8",
      ),
    );
    assert.deepEqual(provenance, { origin: "snapshot", commit });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
