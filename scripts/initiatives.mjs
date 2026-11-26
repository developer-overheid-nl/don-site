/**
 * Ophalen en installeren van de documentatie van gehoste initiatieven.
 *
 * Elk initiatief in src/data/initiative-registry.json publiceert een delivery bundle op
 * een branch in zijn eigen repo. De vorm van die bundel ligt vast:
 *
 *   docs/<slug>/          markdown, _category_.json en eventuele assets
 *   static/img/<slug>/    optioneel; afbeeldingen die als /img/<slug>/... worden
 *                         gerefereerd
 *
 * Bij elke build halen we de nieuwste versie op. Breekt die de build, dan valt
 * alleen het initiatief dat de fout veroorzaakt terug op zijn snapshot in
 * initiatives-snapshot/<slug>/: de laatste versie die wel bouwde. Die snapshot
 * staat in de repo, omdat een bundelbranch kan worden gerewrite (dist-don van
 * MijnServices wordt bij elke sync geforcepusht) en een oude commit dan niet
 * meer op te halen is.
 *
 * De content gaat bewust niet via pnpm: een git-dependency verplaatsen kan pnpm
 * niet zonder ook andere dependencies opnieuw te resolven.
 */

import { execFile } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const PROJECT_ROOT = fileURLToPath(new URL("..", import.meta.url));

/** Contentroot van de docs-plugin met id "initiatieven". */
const CONTENT_ROOT = "initiatieven";
/** Gegenereerde staticDirectory; zie docusaurus.config.ts. */
const STATIC_ROOT = join(".initiatives", "static");
const SNAPSHOT_ROOT = "initiatives-snapshot";
const PROVENANCE_FILE = "provenance.json";
const FETCH_TIMEOUT_MS = 120_000;

export function readInitiatives(root = PROJECT_ROOT) {
  return JSON.parse(
    readFileSync(join(root, "src", "data", "initiative-registry.json"), "utf8"),
  );
}

export function snapshotDirectory(slug, root = PROJECT_ROOT) {
  return join(root, SNAPSHOT_ROOT, slug);
}

/** Commit van de snapshot, of null als er (nog) geen snapshot is. */
export function readSnapshotCommit(slug, root = PROJECT_ROOT) {
  const file = join(snapshotDirectory(slug, root), PROVENANCE_FILE);
  if (!existsSync(file)) {
    return null;
  }
  return JSON.parse(readFileSync(file, "utf8")).commit ?? null;
}

/**
 * Haalt de nieuwste bundel op met een shallow clone. Geeft de map en de commit
 * terug; gooit bij een netwerkfout of een bundel zonder docs/<slug>/.
 */
export async function fetchLatestBundle(initiative) {
  const { repository, branch } = initiative.source;
  const directory = mkdtempSync(
    join(tmpdir(), `initiative-${initiative.slug}-`),
  );
  const options = {
    timeout: FETCH_TIMEOUT_MS,
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
  };

  try {
    await execFileAsync(
      "git",
      [
        "clone",
        "--quiet",
        "--depth",
        "1",
        "--single-branch",
        "--branch",
        branch,
        `https://github.com/${repository}.git`,
        directory,
      ],
      options,
    );
    const { stdout } = await execFileAsync(
      "git",
      ["-C", directory, "rev-parse", "HEAD"],
      options,
    );

    if (!existsSync(join(directory, "docs", initiative.slug))) {
      throw new Error(
        `${repository}#${branch} bevat geen docs/${initiative.slug}/`,
      );
    }
    return { directory, commit: stdout.trim() };
  } catch (e) {
    rmSync(directory, { recursive: true, force: true });
    throw e;
  }
}

/**
 * Zet een bundel (opgehaald of snapshot) op de plek waar Docusaurus hem leest.
 * Markdown en afbeeldingen gaan altijd samen, zodat ze van dezelfde commit zijn.
 */
export function installBundle(
  { slug, bundleDirectory, origin, commit },
  root = PROJECT_ROOT,
) {
  const contentTarget = join(root, CONTENT_ROOT, slug);
  const staticTarget = join(root, STATIC_ROOT, "img", slug);
  rmSync(contentTarget, { recursive: true, force: true });
  rmSync(staticTarget, { recursive: true, force: true });

  cpSync(join(bundleDirectory, "docs", slug), contentTarget, {
    recursive: true,
  });
  const staticSource = join(bundleDirectory, "static", "img", slug);
  if (existsSync(staticSource)) {
    cpSync(staticSource, staticTarget, { recursive: true });
  }

  writeFileSync(
    join(contentTarget, ".provenance.json"),
    `${JSON.stringify({ origin, commit }, null, 2)}\n`,
    "utf8",
  );
}

/** Legt een bundel vast als nieuwe snapshot: alleen de delen die we gebruiken. */
export function writeSnapshot(
  { initiative, bundleDirectory, commit },
  root = PROJECT_ROOT,
) {
  const { slug, source } = initiative;
  const target = snapshotDirectory(slug, root);
  rmSync(target, { recursive: true, force: true });

  cpSync(join(bundleDirectory, "docs", slug), join(target, "docs", slug), {
    recursive: true,
  });
  const staticSource = join(bundleDirectory, "static", "img", slug);
  if (existsSync(staticSource)) {
    cpSync(staticSource, join(target, "static", "img", slug), {
      recursive: true,
    });
  }

  writeFileSync(
    join(target, PROVENANCE_FILE),
    `${JSON.stringify({ ...source, commit }, null, 2)}\n`,
    "utf8",
  );
}

/** Zorgt dat de gegenereerde staticDirectory bestaat; Docusaurus verwacht hem. */
export function ensureStaticRoot(root = PROJECT_ROOT) {
  mkdirSync(join(root, STATIC_ROOT), { recursive: true });
}

/**
 * Regels waarin Docusaurus een fout meldt, met het bronbestand of de bronpagina
 * erin: MDX- en markdown-linkfouten, "Module not found" en "Broken link on
 * source page". Alleen deze regels tellen; plugins loggen bij een geslaagde stap
 * ook paden van initiatieven ("✓ Processed: initiatieven/<slug>/..."), en die
 * zeggen niets over de oorzaak.
 */
const ERROR_LINE = /error|broken link|can't resolve|couldn't be resolved/i;

/**
 * Welke van de opgegeven initiatieven de build-output als bron van een fout
 * noemt. Docusaurus vermeldt het bronbestand relatief of absoluut, of bij een
 * broken link de route van de bronpagina; alle drie bevatten
 * initiatieven/<slug>/.
 */
export function findFailingInitiatives(output, slugs) {
  const errorLines = output.split("\n").filter((line) => ERROR_LINE.test(line));
  return slugs.filter((slug) =>
    errorLines.some((line) => line.includes(`${CONTENT_ROOT}/${slug}/`)),
  );
}

export function warn(message) {
  const prefix = process.env.GITHUB_ACTIONS ? "::warning::" : "";
  console.warn(`${prefix}[initiatives] ${message}`);
}

/**
 * Kiest per initiatief een bron en bouwt tot het lukt.
 *
 * Eerst probeert hij alle nieuwste bundels. Faalt de build, dan gaan de
 * initiatieven die de output als oorzaak noemt terug naar hun snapshot. Noemt de
 * output er geen, dan gaan alle initiatieven met een snapshot terug. Faalt het
 * dan nog, of valt er niets meer terug te zetten, dan ligt het niet aan nieuwe
 * content en faalt de build.
 *
 * Elke herhaling zet minstens één initiatief terug, dus er zijn hooguit
 * (aantal initiatieven + 1) builds.
 *
 * De afhankelijkheden worden ingevoerd, zodat de keuzelogica zonder netwerk en
 * zonder Docusaurus te testen is. Geeft per slug de gebruikte bron terug.
 */
export async function buildWithFallback({
  initiatives,
  fetchLatest,
  snapshotCommit,
  install,
  runBuild,
  log = warn,
}) {
  const choices = new Map();

  for (const initiative of initiatives) {
    const { slug } = initiative;
    const commit = snapshotCommit(slug);
    const snapshot = commit ? { origin: "snapshot", commit } : null;
    try {
      const latest = await fetchLatest(initiative);
      choices.set(slug, { origin: "latest", ...latest, snapshot });
    } catch (e) {
      if (!snapshot) {
        throw new Error(
          `${slug}: ophalen mislukt en er is geen snapshot: ${e.message}`,
        );
      }
      log(
        `${slug}: ophalen mislukt (${e.message}); snapshot ${commit.slice(
          0,
          7,
        )} gebruikt.`,
      );
      choices.set(slug, { ...snapshot, snapshot });
    }
  }

  for (;;) {
    for (const [slug, choice] of choices) {
      install(slug, choice);
    }

    const { isSuccess, output } = await runBuild();
    if (isSuccess) {
      return choices;
    }

    const onLatest = [...choices]
      .filter(([, choice]) => choice.origin === "latest")
      .map(([slug]) => slug);
    const named = findFailingInitiatives(output, onLatest);
    const namedWithoutSnapshot = named.filter(
      (slug) => !choices.get(slug).snapshot,
    );
    if (namedWithoutSnapshot.length > 0) {
      throw new Error(
        `Build faalt op de nieuwste versie van ${namedWithoutSnapshot.join(
          ", ",
        )}, en daarvan is geen snapshot om op terug te vallen.`,
      );
    }

    const revertible = onLatest.filter((slug) => choices.get(slug).snapshot);
    const toRevert = named.length > 0 ? named : revertible;
    if (toRevert.length === 0) {
      throw new Error(
        "Build faalt, en niet op content van een initiatief dat nog terug kan naar zijn snapshot.",
      );
    }

    for (const slug of toRevert) {
      const choice = choices.get(slug);
      log(
        `${slug}: nieuwste versie ${choice.commit.slice(
          0,
          7,
        )} breekt de build; snapshot ${choice.snapshot.commit.slice(
          0,
          7,
        )} gebruikt.`,
      );
      choices.set(slug, { ...choice.snapshot, snapshot: choice.snapshot });
    }
  }
}
