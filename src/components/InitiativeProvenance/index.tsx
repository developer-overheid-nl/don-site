import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";
import {
  findInitiativeForPath,
  type Initiative,
} from "@site/src/data/initiatives";

/**
 * Vermeldt op elke pagina van een gehost initiative wie de inhoud beheert.
 *
 * Bewust zonder ontkenning erachter: zodra de beherende organisatie er staat,
 * weet de lezer al bij wie hij moet zijn. De sectiedisclaimer op /initiatieven
 * en de meldpuntlinks onderaan elke pagina zeggen het bovendien al.
 *
 * Staat in de breadcrumb-laag en niet als losse strook onder de navbar. Twee
 * redenen: een strook die direct tegen een sticky navbar aansluit met dezelfde
 * achtergrond wordt bij het scrollen zichtbaar afgeknipt, en visueel hoorde hij
 * daardoor bij de navigatie terwijl hij inhoudelijk bij de pagina hoort.
 *
 * DocBreadcrumbs wordt gedeeld door DocItem en ApiItem, dus dit werkt ook op de
 * OpenAPI-referentiepagina's.
 */
export default function InitiativeProvenance() {
  const { siteConfig } = useDocusaurusContext();
  const { pathname } = useLocation();

  const initiative = findInitiativeForPath(
    pathname,
    (siteConfig.customFields.initiatives ?? []) as Initiative[],
  );
  if (!initiative) {
    return null;
  }

  return (
    <div className="initiative-provenance">
      <span className="initiative-provenance__name">{initiative.name}</span>{" "}
      <span>wordt beheerd door {initiative.owner}.</span>
    </div>
  );
}
