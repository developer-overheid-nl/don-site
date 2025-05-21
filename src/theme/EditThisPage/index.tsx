import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import IconEdit from "@theme/Icon/Edit";
import { useLocation } from "@docusaurus/router";
import type { Props } from "@theme/EditThisPage";
import { ThemeClassNames } from "@docusaurus/theme-common";
import IconLamp from "../icons/IconLamp";

export default function EditThisPage({ editUrl }: Props): ReactNode {
  const { pathname } = useLocation();
  const isBlogPost = pathname.startsWith("/blog/");

  return (
    <div className={ThemeClassNames.common.editThisPage}>
      {isBlogPost ? (
        <>
          <span>
            <Link to="https://github.com/developer-overheid-nl/don-site/issues/new/choose">
              <IconEdit />
              Heb jij ook een idee voor een blog?
            </Link>
          </span>
        </>
      ) : (
        <>
          <div>
            <span>
              <Link to={editUrl}>
                <IconEdit />
                Iets van dit artikel verbeteren?
              </Link>
            </span>
          </div>
          <div>
            <span>
              <Link to="https://github.com/developer-overheid-nl/don-site/issues/new/choose">
                <IconLamp width="25px" height="25px" fill="#03679b"/>
                Heb je nog andere ideeën of suggesties?
              </Link>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
