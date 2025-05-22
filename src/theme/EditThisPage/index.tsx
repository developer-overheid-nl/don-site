import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import IconEdit from "@theme/Icon/Edit";
import { useLocation } from "@docusaurus/router";
import type { Props } from "@theme/EditThisPage";
import { ThemeClassNames } from "@docusaurus/theme-common";
import IconLamp from "../icons/IconLamp";

import styles from "./index.module.css";
import clsx from "clsx";

export default function EditThisPage({ editUrl }: Props): ReactNode {
  const { pathname } = useLocation();
  const isBlogPost = pathname.startsWith("/blog/");

  return (
    <div className={ThemeClassNames.common.editThisPage}>
      {isBlogPost ? (
        <>
          <span>
            <Link to="https://github.com/developer-overheid-nl/don-site/issues/new/choose"  className={ clsx([styles.callToActionLink])}>
              <IconLamp width="25px" height="25px" fill="#03679b" />
              <span>Heb jij ook een idee voor een blog?</span>
            </Link>
          </span>
        </>
      ) : (
        <>
          <div>
            <span>
              <Link to={editUrl}  className={ clsx([styles.callToActionLink])}>
                <IconEdit />
                <span>Iets aan dit artikel verbeteren?</span>
              </Link>
            </span>
          </div>
          <div>
            <span>
              <Link to="https://github.com/developer-overheid-nl/don-site/issues/new/choose"  className={ clsx([styles.callToActionLink])}>
                <IconLamp className="lampIcon" fill="#03679b" />
                <span>Heb je nog andere ideeën of suggesties?</span>
              </Link>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
