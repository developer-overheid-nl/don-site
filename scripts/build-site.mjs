#!/usr/bin/env node
/**
 * `pnpm build`: bouwt de site met de nieuwste content van elk initiatief, en valt
 * per initiatief terug op zijn snapshot als die content de build breekt. Zie
 * scripts/initiatives.mjs.
 *
 * Met --update-snapshot worden de initiatieven die met hun nieuwste versie
 * succesvol zijn gebouwd daarna als snapshot vastgelegd. Dat doet de workflow
 * initiatives-snapshot.yml, die er een pull request van maakt. Lokaal laat je
 * die flag weg, zodat een build geen wijzigingen in de repo achterlaat.
 *
 * Overige argumenten gaan door naar `docusaurus build`.
 */

import { spawn } from "node:child_process";
import { rmSync } from "node:fs";
import {
  PROJECT_ROOT,
  buildWithFallback,
  ensureStaticRoot,
  fetchLatestBundle,
  installBundle,
  readInitiatives,
  readSnapshotCommit,
  snapshotDirectory,
  writeSnapshot,
} from "./initiatives.mjs";

const UPDATE_SNAPSHOT_FLAG = "--update-snapshot";
const cliArguments = process.argv.slice(2);
const shouldUpdateSnapshot = cliArguments.includes(UPDATE_SNAPSHOT_FLAG);
const docusaurusArguments = cliArguments.filter(
  (argument) => argument !== UPDATE_SNAPSHOT_FLAG,
);

/** Draait `docusaurus build`, toont de output live en bewaart hem voor analyse. */
function runDocusaurusBuild() {
  return new Promise((resolve) => {
    const chunks = [];
    const child = spawn(
      "pnpm",
      ["exec", "docusaurus", "build", ...docusaurusArguments],
      { cwd: PROJECT_ROOT, stdio: ["ignore", "pipe", "pipe"] },
    );
    child.stdout.on("data", (chunk) => {
      process.stdout.write(chunk);
      chunks.push(chunk);
    });
    child.stderr.on("data", (chunk) => {
      process.stderr.write(chunk);
      chunks.push(chunk);
    });
    child.on("close", (code) => {
      resolve({
        isSuccess: code === 0,
        output: Buffer.concat(chunks).toString("utf8"),
      });
    });
  });
}

const initiatives = readInitiatives();
const fetchedDirectories = [];
ensureStaticRoot();

try {
  const choices = await buildWithFallback({
    initiatives,
    fetchLatest: async (initiative) => {
      const bundle = await fetchLatestBundle(initiative);
      fetchedDirectories.push(bundle.directory);
      return bundle;
    },
    snapshotCommit: (slug) => readSnapshotCommit(slug),
    install: (slug, choice) =>
      installBundle({
        slug,
        bundleDirectory:
          choice.origin === "latest"
            ? choice.directory
            : snapshotDirectory(slug),
        origin: choice.origin,
        commit: choice.commit,
      }),
    runBuild: runDocusaurusBuild,
  });

  for (const initiative of initiatives) {
    const choice = choices.get(initiative.slug);
    console.log(
      `[initiatives] ${initiative.slug}: gebouwd met ${
        choice.origin
      } ${choice.commit.slice(0, 7)}`,
    );
    if (
      shouldUpdateSnapshot &&
      choice.origin === "latest" &&
      choice.commit !== choice.snapshot?.commit
    ) {
      writeSnapshot({
        initiative,
        bundleDirectory: choice.directory,
        commit: choice.commit,
      });
      console.log(
        `[initiatives] ${
          initiative.slug
        }: snapshot bijgewerkt naar ${choice.commit.slice(0, 7)}`,
      );
    }
  }
} catch (e) {
  console.error(`[initiatives] ${e.message}`);
  process.exitCode = 1;
} finally {
  for (const directory of fetchedDirectories) {
    rmSync(directory, { recursive: true, force: true });
  }
}
