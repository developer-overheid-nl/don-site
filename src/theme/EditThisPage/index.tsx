import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import IconEdit from "@theme/Icon/Edit";
import { useLocation } from "@docusaurus/router";
import type { Props } from "@theme/EditThisPage";
import { ThemeClassNames } from "@docusaurus/theme-common";
import IconLamp from "../icons/IconLamp";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  findInitiativeForPath,
  type Initiative,
} from "@site/src/data/initiatives";

import styles from "./index.module.css";
import clsx from "clsx";

export default function EditThisPage({ editUrl }: Props): ReactNode {
  const { pathname } = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const isBlogPost = pathname.startsWith("/blog/");

  // Op een gehost initiatief gaan meldingen naar de eigenaar, niet naar ons.
  const initiative = findInitiativeForPath(
    pathname,
    (siteConfig.customFields.initiatives ?? []) as Initiative[],
  );
  const feedbackUrl =
    initiative?.issuesUrl ??
    "https://github.com/developer-overheid-nl/don-site/issues/new/choose";
  const feedbackLabel = initiative
    ? `Idee of correctie voor ${initiative.name}? Meld het bij ${initiative.owner}`
    : "Heb je nog andere ideeën of suggesties?";

  return (
    <div className={ThemeClassNames.common.editThisPage}>
      {isBlogPost ? (
        <>
          <span>
            <Link
              to="https://github.com/developer-overheid-nl/don-site/issues/new/choose"
              className={clsx([styles.callToActionLink])}
            >
              <IconLamp width="25px" height="25px" fill="#03679b" />
              <span>Heb jij ook een idee voor een blog?</span>
            </Link>
          </span>
        </>
      ) : (
        <>
          <div>
            <span>
              <Link to={editUrl} className={clsx([styles.callToActionLink])}>
                <IconEdit />
                <span>Iets aan dit artikel verbeteren?</span>
              </Link>
            </span>
          </div>
          <div>
            <span>
              <Link
                to={feedbackUrl}
                className={clsx([styles.callToActionLink])}
              >
                <IconLamp className="lampIcon" fill="#03679b" />
                <span>{feedbackLabel}</span>
              </Link>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
