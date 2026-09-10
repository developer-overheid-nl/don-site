import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useSidebarBreadcrumbs } from "@docusaurus/plugin-content-docs/client";
import { useHomePageRoute } from "@docusaurus/theme-common/internal";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import HomeBreadcrumbItem from "@theme/DocBreadcrumbs/Items/Home";
import DocBreadcrumbsStructuredData from "@theme/DocBreadcrumbs/StructuredData";
import InitiativeProvenance from "@site/src/components/InitiativeProvenance";

import styles from "./styles.module.css";

/**
 * Overgenomen van @docusaurus/theme-classic, met één toevoeging: tussen Home en
 * het pad uit de sidebar komt de sectie zelf te staan.
 *
 * Zonder die toevoeging leest het kruimelpad als Home › API Ontwikkeling › …,
 * terwijl de bezoeker in de kennisbank zit. De sectie staat bewust niet als
 * item in de sidebar, want dat label staat al in het hoofdmenu; het kruimelpad
 * is de plek waar het wél hoort.
 */
const SECTIONS = [
  { path: "/kennisbank", label: "Kennisbank" },
  { path: "/initiatieven", label: "Initiatieven" },
];

function BreadcrumbsItemLink({
  children,
  href,
  isLast,
}: {
  children: React.ReactNode;
  href?: string;
  isLast: boolean;
}) {
  const className = "breadcrumbs__link";
  if (isLast) {
    return <span className={className}>{children}</span>;
  }
  return href ? (
    <Link className={className} href={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

function BreadcrumbsItem({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <li
      className={clsx("breadcrumbs__item", {
        "breadcrumbs__item--active": active,
      })}
    >
      {children}
    </li>
  );
}

export default function DocBreadcrumbs(): React.JSX.Element | null {
  const sidebarBreadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();
  const { pathname } = useLocation();

  if (!sidebarBreadcrumbs) {
    return null;
  }

  // Op de ingang van de sectie is er geen pad uit de sidebar; dan is de sectie
  // zelf het laatste, actieve item.
  const section = SECTIONS.find((s) => pathname.startsWith(s.path));
  const breadcrumbs = section
    ? [
        { type: "link" as const, label: section.label, href: section.path },
        ...sidebarBreadcrumbs,
      ]
    : sidebarBreadcrumbs;

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
          styles.breadcrumbsContainer,
        )}
        aria-label={translate({
          id: "theme.docs.breadcrumbs.navAriaLabel",
          message: "Breadcrumbs",
          description: "The ARIA label for the breadcrumbs",
        })}
      >
        <InitiativeProvenance />
        <ul className="breadcrumbs">
          {homePageRoute && <HomeBreadcrumbItem />}
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            const href =
              item.type === "category" &&
              "linkUnlisted" in item &&
              item.linkUnlisted
                ? undefined
                : item.href;
            return (
              <BreadcrumbsItem key={idx} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
