#!/usr/bin/env node
/**
 * `pnpm start`: zet voor elk initiatief de nieuwste content klaar voor de dev
 * server. Lukt ophalen niet, dan de snapshot; is die er ook niet, dan blijft de
 * vorige versie staan.
 *
 * Hier wordt niet gebouwd, dus of de nieuwste content de build breekt, merk je
 * pas bij `pnpm build`. Die valt dan terug op de snapshot; zie build-site.mjs.
 */

import { rmSync } from "node:fs";
import {
  ensureStaticRoot,
  fetchLatestBundle,
  installBundle,
  readInitiatives,
  readSnapshotCommit,
  snapshotDirectory,
  warn,
} from "./initiatives.mjs";

ensureStaticRoot();

for (const initiative of readInitiatives()) {
  const { slug } = initiative;
  try {
    const { directory, commit } = await fetchLatestBundle(initiative);
    installBundle({
      slug,
      bundleDirectory: directory,
      origin: "latest",
      commit,
    });
    rmSync(directory, { recursive: true, force: true });
    console.log(`[initiatives] ${slug}: nieuwste versie ${commit.slice(0, 7)}`);
  } catch (e) {
    const commit = readSnapshotCommit(slug);
    if (!commit) {
      warn(
        `${slug}: ophalen mislukt (${e.message}); vorige versie blijft staan.`,
      );
      continue;
    }
    installBundle({
      slug,
      bundleDirectory: snapshotDirectory(slug),
      origin: "snapshot",
      commit,
    });
    warn(
      `${slug}: ophalen mislukt (${e.message}); snapshot ${commit.slice(
        0,
        7,
      )} gebruikt.`,
    );
  }
}
