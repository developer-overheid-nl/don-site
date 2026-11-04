// Bewaakt de componenten in src/theme die we bij Docusaurus hebben geswizzeld.
//
// Voor elk geëjecte bestand staat in swizzle-baseline/ een ongewijzigde kopie
// van de upstream-versie waarvan het is afgeleid. `check` vergelijkt die
// baseline met de upstream-bron in node_modules; wijkt die af, dan is het
// component in een nieuwe versie veranderd. `update` voegt die wijzigingen met
// een 3-way merge (`git merge-file`) samen met onze aanpassingen.
//
// Gebruik:
//   node scripts/swizzle.js check            # standaard; exit 1 bij bevindingen
//   node scripts/swizzle.js update           # merge upstream en ververs baselines
//   node scripts/swizzle.js diff [component] # toon onze aanpassingen t.o.v. baseline

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { createRequire } = require("node:module");
const { spawnSync } = require("node:child_process");

const SITE_DIR = path.join(__dirname, "..");

// Paden in src/theme die geen override van een upstream component zijn.
const IGNORED_PATHS = [/^INACTIVE_/, /^icons\//];

const UPSTREAM_THEME_DIRS = {
  "@docusaurus/core": "lib/client/theme-fallback",
};
const DEFAULT_UPSTREAM_THEME_DIR = "src/theme";

const COMPONENT_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js"];

function createContext(siteDir = SITE_DIR) {
  const baselineDir = path.join(siteDir, "swizzle-baseline");
  return {
    siteDir,
    themeDir: path.join(siteDir, "src", "theme"),
    baselineDir,
    manifestPath: path.join(baselineDir, "manifest.json"),
    resolvePackageDir: (packageName) => resolvePackageDir(packageName, siteDir),
  };
}

// pnpm hoist theme-classic niet naar de root, dus zoeken we ook vanuit de preset.
function resolvePackageDir(packageName, siteDir) {
  const anchors = [path.join(siteDir, "package.json")];
  try {
    anchors.push(
      createRequire(anchors[0]).resolve(
        "@docusaurus/preset-classic/package.json",
      ),
    );
  } catch {
    // Zonder preset blijft alleen de root over.
  }

  for (const anchor of anchors) {
    const anchorRequire = createRequire(anchor);
    try {
      return path.dirname(anchorRequire.resolve(`${packageName}/package.json`));
    } catch {
      // `exports` kan `<package>/package.json` afschermen; probeer de main.
    }
    let entry;
    try {
      entry = anchorRequire.resolve(packageName);
    } catch {
      continue;
    }
    // Loop vanaf de main omhoog tot de package.json van dit package.
    for (let dir = path.dirname(entry); ; dir = path.dirname(dir)) {
      const manifest = path.join(dir, "package.json");
      if (
        fs.existsSync(manifest) &&
        JSON.parse(fs.readFileSync(manifest, "utf8")).name === packageName
      ) {
        return dir;
      }
      if (path.dirname(dir) === dir) break;
    }
  }
  throw new Error(`Package ${packageName} niet gevonden vanuit ${siteDir}`);
}

function upstreamThemeDir(ctx, packageName) {
  return path.join(
    ctx.resolvePackageDir(packageName),
    UPSTREAM_THEME_DIRS[packageName] ?? DEFAULT_UPSTREAM_THEME_DIR,
  );
}

function upstreamVersion(ctx, packageName) {
  const manifest = path.join(
    ctx.resolvePackageDir(packageName),
    "package.json",
  );
  return JSON.parse(fs.readFileSync(manifest, "utf8")).version;
}

function readManifest(ctx) {
  return JSON.parse(fs.readFileSync(ctx.manifestPath, "utf8"));
}

function writeManifest(ctx, manifest) {
  fs.writeFileSync(ctx.manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

function baselinePath(ctx, entry, file) {
  return path.join(ctx.baselineDir, entry.package, file);
}

// Werkkopieën kunnen CRLF hebben (core.autocrlf), node_modules heeft LF.
function readNormalized(file) {
  return fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
}

function componentExists(themeDir, component) {
  const base = path.join(themeDir, component);
  return (
    fs.existsSync(base) ||
    COMPONENT_EXTENSIONS.some((extension) => fs.existsSync(base + extension))
  );
}

function listFiles(dir, prefix = "") {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
    const relative = prefix ? `${prefix}/${dirent.name}` : dirent.name;
    return dirent.isDirectory()
      ? listFiles(path.join(dir, dirent.name), relative)
      : [relative];
  });
}

function check(ctx = createContext()) {
  const manifest = readManifest(ctx);
  const findings = [];
  const registered = new Set();

  for (const entry of manifest.components) {
    const themeDir = upstreamThemeDir(ctx, entry.package);
    const ownFiles = [...(entry.files ?? []), ...(entry.extraFiles ?? [])];
    ownFiles.forEach((file) => registered.add(file));

    if (!componentExists(themeDir, entry.component)) {
      findings.push({ kind: "missing-component", entry });
    }

    for (const file of ownFiles) {
      if (!fs.existsSync(path.join(ctx.themeDir, file))) {
        findings.push({ kind: "missing-file", entry, file });
      }
    }

    if (entry.type !== "eject") continue;

    for (const file of entry.files) {
      const upstream = path.join(themeDir, file);
      const baseline = baselinePath(ctx, entry, file);
      if (!fs.existsSync(upstream)) {
        findings.push({ kind: "missing-upstream", entry, file });
      } else if (!fs.existsSync(baseline)) {
        findings.push({ kind: "missing-baseline", entry, file, upstream });
      } else if (readNormalized(baseline) !== readNormalized(upstream)) {
        findings.push({ kind: "changed", entry, file, baseline, upstream });
      }
    }
  }

  for (const file of listFiles(ctx.themeDir)) {
    if (IGNORED_PATHS.some((pattern) => pattern.test(file))) continue;
    if (!registered.has(file)) findings.push({ kind: "unregistered", file });
  }

  return findings;
}

const FINDING_MESSAGES = {
  "missing-component": ({ entry }) =>
    `${entry.component}: bestaat niet meer in ${entry.package}. Hernoemd of verwijderd? Onze override wordt nu stilzwijgend genegeerd.`,
  "missing-file": ({ entry, file }) =>
    `${entry.component}: src/theme/${file} staat in het manifest maar bestaat niet.`,
  "missing-upstream": ({ entry, file }) =>
    `${entry.component}: ${file} bestaat niet meer in ${entry.package}.`,
  "missing-baseline": ({ entry, file }) =>
    `${entry.component}: geen baseline voor ${file}. Draai \`pnpm swizzle:update\`.`,
  changed: ({ entry, file }) =>
    `${entry.component}: ${file} is upstream gewijzigd sinds ${entry.package}@${entry.version}.`,
  unregistered: ({ file }) =>
    `src/theme/${file}: staat niet in swizzle-baseline/manifest.json.`,
};

function formatFinding(finding) {
  return FINDING_MESSAGES[finding.kind](finding);
}

function gitDiff(from, to) {
  spawnSync("git", ["--no-pager", "diff", "--no-index", "--", from, to], {
    stdio: "inherit",
  });
}

// Upstream gebruikt een andere Prettier-stijl dan wij (enkele quotes, geen
// bracket spacing). Zonder formatteren botst vrijwel elke upstream-wijziging
// met onze herformattering. Prettier is optioneel: zonder valt de merge terug
// op de ruwe bestanden.
function loadFormatter(siteDir) {
  let prettier;
  try {
    prettier = require(
      createRequire(path.join(siteDir, "package.json")).resolve("prettier"),
    );
  } catch {
    return null;
  }
  return async (source, filepath) => {
    try {
      const options = (await prettier.resolveConfig(filepath)) ?? {};
      return await prettier.format(source, { ...options, filepath });
    } catch {
      return source;
    }
  };
}

// De meeste ejects missen de licentieheader van upstream. Grenst een
// upstream-wijziging aan die header, dan geeft dat een conflict zonder inhoud.
const LICENSE_HEADER = /^\/\*\*\n \* Copyright \(c\) Facebook[\s\S]*?\*\/\n+/;

// 3-way merge van upstream-wijzigingen in ons bestand. Geeft het aantal
// conflicten terug; die staan daarna als conflict markers in het bestand.
async function mergeFile(ours, baseline, upstream, labels, format) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "swizzle-"));
  try {
    const keepHeader = LICENSE_HEADER.test(readNormalized(ours));
    const copies = [];
    for (const [index, file] of [ours, baseline, upstream].entries()) {
      const copy = path.join(tempDir, String(index));
      let source = readNormalized(file);
      if (!keepHeader) source = source.replace(LICENSE_HEADER, "");
      fs.writeFileSync(copy, format ? await format(source, ours) : source);
      copies.push(copy);
    }
    const result = spawnSync(
      "git",
      [
        "merge-file",
        "-p",
        ...labels.flatMap((label) => ["-L", label]),
        ...copies,
      ],
      { encoding: "utf8" },
    );
    if (result.status === null || result.status >= 128) {
      throw new Error(`git merge-file faalde voor ${ours}: ${result.stderr}`);
    }
    const crlf = fs.readFileSync(ours, "utf8").includes("\r\n");
    fs.writeFileSync(
      ours,
      crlf ? result.stdout.replace(/\n/g, "\r\n") : result.stdout,
    );
    return result.status;
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

async function update(
  ctx = createContext(),
  format = loadFormatter(ctx.siteDir),
) {
  const manifest = readManifest(ctx);
  const findings = check(ctx);
  const conflicts = [];

  for (const finding of findings) {
    const { entry, file } = finding;
    if (finding.kind === "changed") {
      const installed = upstreamVersion(ctx, entry.package);
      const count = await mergeFile(
        path.join(ctx.themeDir, file),
        finding.baseline,
        finding.upstream,
        [
          "DON",
          `${entry.package}@${entry.version}`,
          `${entry.package}@${installed}`,
        ],
        format,
      );
      if (count > 0) conflicts.push({ file, count });
    }
    if (finding.kind === "changed" || finding.kind === "missing-baseline") {
      const target = baselinePath(ctx, entry, file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, readNormalized(finding.upstream));
    }
  }

  // Elke baseline die nu gelijk is aan upstream hoort bij de geïnstalleerde versie.
  const remaining = check(ctx);
  for (const entry of manifest.components) {
    if (entry.type !== "eject") continue;
    const stale = remaining.some(
      (finding) => finding.entry?.component === entry.component,
    );
    if (!stale) entry.version = upstreamVersion(ctx, entry.package);
  }
  writeManifest(ctx, manifest);

  return { conflicts, remaining, formatted: Boolean(format) };
}

function diff(ctx = createContext(), component) {
  const manifest = readManifest(ctx);
  const entries = manifest.components.filter(
    (entry) =>
      entry.type === "eject" && (!component || entry.component === component),
  );
  if (entries.length === 0) {
    throw new Error(`Geen geëject component ${component} in het manifest`);
  }
  for (const entry of entries) {
    for (const file of entry.files) {
      gitDiff(baselinePath(ctx, entry, file), path.join(ctx.themeDir, file));
    }
  }
}

async function main([command = "check", ...args]) {
  const ctx = createContext();

  if (command === "check") {
    const findings = check(ctx);
    for (const finding of findings) {
      console.log(`✗ ${formatFinding(finding)}`);
      if (finding.kind === "changed")
        gitDiff(finding.baseline, finding.upstream);
    }
    if (findings.length > 0) {
      console.log(
        `\n${findings.length} bevinding(en). Zie AGENTS.md, "Docusaurus upgraden".`,
      );
      return 1;
    }
    console.log("✓ Alle geswizzelde componenten komen overeen met upstream.");
    return 0;
  }

  if (command === "update") {
    const { conflicts, remaining, formatted } = await update(ctx);
    if (!formatted) {
      console.log(
        "Prettier niet gevonden; merge zonder formatteren, verwacht meer conflicten.",
      );
    }
    for (const { file, count } of conflicts) {
      console.log(
        `! src/theme/${file}: ${count} conflict(en), los op en controleer.`,
      );
    }
    for (const finding of remaining) console.log(`✗ ${formatFinding(finding)}`);
    if (conflicts.length === 0 && remaining.length === 0) {
      console.log("✓ Baselines bijgewerkt, geen conflicten.");
    }
    return conflicts.length > 0 || remaining.length > 0 ? 1 : 0;
  }

  if (command === "diff") {
    diff(ctx, args[0]);
    return 0;
  }

  console.error(
    `Onbekend commando: ${command}. Gebruik check, update of diff.`,
  );
  return 2;
}

if (require.main === module) {
  main(process.argv.slice(2)).then((code) => {
    process.exitCode = code;
  });
}

module.exports = { check, update, createContext, formatFinding, mergeFile };
