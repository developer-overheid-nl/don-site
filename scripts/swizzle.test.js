const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { check, update, createContext, formatFinding } = require("./swizzle.js");

// Faalt zodra een Docusaurus-update een geswizzeld component wijzigt, hernoemt
// of verwijdert. Zie AGENTS.md, "Docusaurus upgraden".
test("swizzled components match the installed upstream sources", () => {
  const findings = check(createContext());
  assert.deepEqual(
    findings.map(formatFinding),
    [],
    "Draai `pnpm swizzle:check` voor de diff en `pnpm swizzle:update` om te mergen.",
  );
});

const UPSTREAM_SOURCE = `/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import React from "react";

export default function Foo() {
  return <div className="foo">Foo</div>;
}
`;

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function createFixture(t) {
  const siteDir = fs.mkdtempSync(path.join(os.tmpdir(), "swizzle-test-"));
  t.after(() => fs.rmSync(siteDir, { recursive: true, force: true }));

  const packageDir = path.join(siteDir, "upstream", "theme-test");
  write(
    path.join(packageDir, "package.json"),
    JSON.stringify({ name: "theme-test", version: "2.0.0" }),
  );
  write(path.join(packageDir, "src/theme/Foo/index.tsx"), UPSTREAM_SOURCE);
  write(path.join(packageDir, "src/theme/Bar/index.tsx"), "export {};\n");

  write(
    path.join(siteDir, "swizzle-baseline/manifest.json"),
    JSON.stringify({
      components: [
        {
          component: "Foo",
          type: "eject",
          package: "theme-test",
          version: "1.0.0",
          files: ["Foo/index.tsx"],
        },
        {
          component: "Bar",
          type: "wrap",
          package: "theme-test",
          files: ["Bar.tsx"],
        },
      ],
    }),
  );
  write(
    path.join(siteDir, "swizzle-baseline/theme-test/Foo/index.tsx"),
    UPSTREAM_SOURCE,
  );

  // Onze versie: zonder licentieheader, met CRLF en een eigen aanpassing.
  const ours = UPSTREAM_SOURCE.replace(/^\/\*\*[\s\S]*?\*\/\n\n/, "")
    .replace("Foo</div>", "Foo, DON</div>")
    .replace(/\n/g, "\r\n");
  write(path.join(siteDir, "src/theme/Foo/index.tsx"), ours);
  write(path.join(siteDir, "src/theme/Bar.tsx"), "export {};\n");
  write(path.join(siteDir, "src/theme/INACTIVE_Baz/index.tsx"), "export {};\n");

  const ctx = {
    ...createContext(siteDir),
    resolvePackageDir: () => packageDir,
  };
  return { ctx, siteDir, packageDir };
}

const kinds = (findings) => findings.map((finding) => finding.kind).sort();

test("check reports nothing when upstream matches the baseline", (t) => {
  const { ctx } = createFixture(t);
  assert.deepEqual(check(ctx), []);
});

test("check ignores line ending differences", (t) => {
  const { ctx, packageDir } = createFixture(t);
  const upstream = path.join(packageDir, "src/theme/Foo/index.tsx");
  write(upstream, UPSTREAM_SOURCE.replace(/\n/g, "\r\n"));
  assert.deepEqual(check(ctx), []);
});

test("check reports an upstream change to an ejected file", (t) => {
  const { ctx, packageDir } = createFixture(t);
  write(
    path.join(packageDir, "src/theme/Foo/index.tsx"),
    UPSTREAM_SOURCE.replace('className="foo"', 'className="foo-v2"'),
  );
  assert.deepEqual(kinds(check(ctx)), ["changed"]);
});

test("check reports a renamed or removed upstream component", (t) => {
  const { ctx, packageDir } = createFixture(t);
  fs.rmSync(path.join(packageDir, "src/theme/Foo"), { recursive: true });
  fs.rmSync(path.join(packageDir, "src/theme/Bar"), { recursive: true });
  assert.deepEqual(kinds(check(ctx)), [
    "missing-component",
    "missing-component",
    "missing-upstream",
  ]);
});

test("check reports overrides missing from the manifest", (t) => {
  const { ctx, siteDir } = createFixture(t);
  write(path.join(siteDir, "src/theme/Qux/index.tsx"), "export {};\n");
  const findings = check(ctx);
  assert.deepEqual(kinds(findings), ["unregistered"]);
  assert.equal(findings[0].file, "Qux/index.tsx");
});

test("update merges upstream changes into our customised file", async (t) => {
  const { ctx, siteDir, packageDir } = createFixture(t);
  const upstream = UPSTREAM_SOURCE.replace(
    'import React from "react";',
    'import type { ReactNode } from "react";',
  );
  write(path.join(packageDir, "src/theme/Foo/index.tsx"), upstream);

  const { conflicts, remaining } = await update(ctx, null);

  assert.deepEqual(conflicts, []);
  assert.deepEqual(remaining, []);
  const merged = fs.readFileSync(
    path.join(siteDir, "src/theme/Foo/index.tsx"),
    "utf8",
  );
  assert.match(merged, /import type \{ ReactNode \} from "react";\r\n/);
  assert.match(merged, /Foo, DON<\/div>/);
  assert.doesNotMatch(merged, /Copyright/);
  assert.equal(
    fs.readFileSync(
      path.join(siteDir, "swizzle-baseline/theme-test/Foo/index.tsx"),
      "utf8",
    ),
    upstream,
  );
  const manifest = JSON.parse(
    fs.readFileSync(path.join(siteDir, "swizzle-baseline/manifest.json")),
  );
  assert.equal(manifest.components[0].version, "2.0.0");
});

test("update leaves conflict markers when both sides change a line", async (t) => {
  const { ctx, siteDir, packageDir } = createFixture(t);
  write(
    path.join(packageDir, "src/theme/Foo/index.tsx"),
    UPSTREAM_SOURCE.replace("Foo</div>", "Foo v2</div>"),
  );

  const { conflicts } = await update(ctx, null);

  assert.deepEqual(conflicts, [{ file: "Foo/index.tsx", count: 1 }]);
  const merged = fs.readFileSync(
    path.join(siteDir, "src/theme/Foo/index.tsx"),
    "utf8",
  );
  assert.match(merged, /<<<<<<< DON/);
  assert.match(merged, />>>>>>> theme-test@2\.0\.0/);
});
