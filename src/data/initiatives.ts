/**
 * Register van initiatieven die developer.overheid.nl huisvest.
 *
 * De gegevens staan in initiative-registry.json, zodat de site en de build-scripts
 * (scripts/initiatives.mjs) dezelfde lijst lezen. Een nieuw initiatief is een
 * regel in dat bestand plus een rij in de tabel op /initiatieven.
 *
 * Dit is de bron voor alles wat met eigenaarschap te maken heeft: de
 * eigenaarsregel op elke pagina, de twee links onderaan een artikel, en de
 * editUrl van de docs-plugin.
 *
 * developer.overheid.nl publiceert deze documentatie en beheert de inhoud niet.
 */

import initiativesData from "./initiative-registry.json";

export type Initiative = {
  /** Slug onder /initiatieven/. Bepaalt de route en de map met de content. */
  slug: string;
  name: string;
  owner: string;
  /**
   * Waar de delivery bundle staat: een branch met docs/<slug>/ en optioneel
   * static/img/<slug>/. De build haalt bij elke run de nieuwste versie op.
   */
  source: {
    repository: string;
    branch: string;
  };
  /** Basis-URL voor "Iets aan dit artikel verbeteren?". */
  editBaseUrl: string;
  /** Waar een lezer een idee of probleem meldt. */
  issuesUrl: string;
};

export const initiatives: readonly Initiative[] = initiativesData;

export const INITIATIVES_BASE_PATH = "/initiatieven";

/** Zoekt het initiatief waar een pad bij hoort, of null buiten de sectie. */
export function findInitiativeForPath(
  path: string,
  list: readonly Initiative[] = initiatives,
): Initiative | null {
  return (
    list.find((i) => path.startsWith(`${INITIATIVES_BASE_PATH}/${i.slug}`)) ??
    null
  );
}
