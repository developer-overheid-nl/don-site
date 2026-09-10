#!/usr/bin/env node
/**
 * Zet de documentatie van gehoste initiatieven op de plek waar Docusaurus hem
 * verwacht.
 *
 * De partner beheert de content zelf en publiceert een delivery bundle op een
 * eigen branch. Die staat in package.json als dependency, dus pnpm doet het
 * ophalen, het cachen en het vastleggen van de commit in de lockfile. Bijwerken
 * is `pnpm update <package>`, wat een zichtbare wijziging in de lockfile geeft.
 *
 * Dit script kopieert alleen nog uit node_modules naar de contentmap. Dat
 * kopieren is niet te vermijden: de bundel gebruikt in zijn _category_.json ids
 * met het voorvoegsel van de slug, dus de contentroot moet de ouder van die map
 * zijn. Een symlink of een plugin die rechtstreeks in node_modules leest levert
 * ids op die niet oplossen.
 *
 * Afbeeldingen worden niet gekopieerd; die komen via staticDirectories in
 * docusaurus.config.ts rechtstreeks uit het package.
 *
 * Draait via `pnpm build` en `pnpm start`; die roepen het expliciet aan, omdat
 * pnpm de npm-conventie `prebuild` niet vanzelf uitvoert.
 */

import { execFileSync } from "node:child_process";
import { cpSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = fileURLToPath(new URL("..", import.meta.url));

/**
 * Welke dependency de documentatie van welk initiatief levert.
 *
 * Bewust hier en niet in een gedeeld databestand: een Node-script kan geen
 * TypeScript importeren, en bij een handvol initiatieven is twee keer met de
 * hand bijhouden overzichtelijker dan een derde bestand ertussen. De
 * eigenaarsgegevens voor de site staan in src/data/initiatives.ts.
 */
const initiatives = [{ slug: "mijn-services", package: "mijn-services-docs" }];

/**
 * Vraagt pnpm welke commit er is geinstalleerd. Via `pnpm list` en niet door de
 * lockfile te lezen: dat is een ondersteunde interface en geen bestandsformaat
 * dat onder ons kan veranderen.
 */
function resolvedCommits() {
  try {
    const output = execFileSync("pnpm", ["list", "--json", "--depth", "0"], {
      cwd: PROJECT_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const parsed = JSON.parse(output);
    const dependencies =
      (Array.isArray(parsed) ? parsed[0] : parsed).dependencies ?? {};
    return new Map(
      Object.entries(dependencies).map(([name, info]) => [
        name,
        info.resolved?.match(/tar\.gz\/([0-9a-f]{40})/)?.[1] ?? null,
      ]),
    );
  } catch {
    return new Map();
  }
}

const commits = resolvedCommits();
let failures = 0;

for (const { slug, package: packageName } of initiatives) {
  const source = join(PROJECT_ROOT, "node_modules", packageName, "docs", slug);
  const target = join(PROJECT_ROOT, "initiatieven", slug);

  if (!existsSync(source)) {
    if (existsSync(target)) {
      console.warn(
        `[initiatives] ${slug}: ${packageName} niet geinstalleerd; vorige versie blijft staan.`,
      );
    } else {
      console.error(
        `[initiatives] ${slug}: ${packageName} niet geinstalleerd. Draai eerst 'pnpm install'.`,
      );
      failures += 1;
    }
    continue;
  }

  rmSync(target, { recursive: true, force: true });
  cpSync(source, target, { recursive: true });

  const commit = commits.get(packageName) ?? null;
  writeFileSync(
    join(target, ".provenance.json"),
    `${JSON.stringify({ package: packageName, commit }, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `[initiatives] ${slug}: uit ${packageName}${
      commit ? ` (${commit.slice(0, 7)})` : ""
    }`,
  );
}

if (failures > 0) {
  process.exit(1);
}
