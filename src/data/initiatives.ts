/**
 * Register van initiatieven die developer.overheid.nl huisvest.
 *
 * Dit is de bron voor alles wat met eigenaarschap te maken heeft: de
 * eigenaarsregel op elke pagina, de twee links onderaan een artikel, en de
 * editUrl van de docs-plugin.
 *
 * De tabel op /initiatieven en de lijst in scripts/fetch-initiatives.mjs worden
 * met de hand bijgehouden. Bij een handvol initiatieven is dat overzichtelijker
 * dan een gedeeld databestand; komt er een derde bij, controleer dan of die drie
 * plekken nog gelijk lopen.
 *
 * developer.overheid.nl publiceert deze documentatie en beheert de inhoud niet.
 */

export type Initiative = {
  /** Slug onder /initiatieven/. Bepaalt de route en de map met de content. */
  slug: string;
  name: string;
  owner: string;
  /** Basis-URL voor "Iets aan dit artikel verbeteren?". */
  editBaseUrl: string;
  /** Waar een lezer een idee of probleem meldt. */
  issuesUrl: string;
};

export const initiatives: Initiative[] = [
  {
    slug: "mijn-services",
    name: "MijnServices",
    owner: "VNG Realisatie",
    // De bron staat bij VNG. De branch dist-don bevat de gegenereerde bundel die
    // wij als dependency ophalen; bewerken gebeurt in main, waar de
    // auteursversie staat onder docs/mijn-services/.
    editBaseUrl:
      "https://github.com/VNG-Realisatie/mijn-services-documentatie/blob/main/docs/",
    issuesUrl:
      "https://github.com/VNG-Realisatie/mijn-services-documentatie/issues/new",
  },
];

export const INITIATIVES_BASE_PATH = "/initiatieven";

/** Zoekt het initiatief waar een pad bij hoort, of null buiten de sectie. */
export function findInitiativeForPath(
  path: string,
  list: Initiative[] = initiatives,
): Initiative | null {
  return (
    list.find((i) => path.startsWith(`${INITIATIVES_BASE_PATH}/${i.slug}`)) ??
    null
  );
}
