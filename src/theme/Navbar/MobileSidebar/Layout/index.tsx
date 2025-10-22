import React, { version, forwardRef, type ReactNode } from "react";
import clsx from "clsx";
import { useNavbarSecondaryMenu } from "@docusaurus/theme-common/internal";
import { ThemeClassNames } from "@docusaurus/theme-common";
import type { Props } from "@theme/Navbar/MobileSidebar/Layout";

// TODO Docusaurus v4: remove temporary inert workaround
//  See https://github.com/facebook/react/issues/17157
//  See https://github.com/radix-ui/themes/pull/509
function inertProps(inert: boolean) {
  const isBeforeReact19 = parseInt(version!.split(".")[0]!, 10) < 19;
  if (isBeforeReact19) {
    return { inert: inert ? "" : undefined };
  }
  return { inert };
}

function NavbarMobileSidebarPanel({
  children,
  inert,
}: {
  children: ReactNode;
  inert: boolean;
}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.panel,
        "navbar-sidebar__item menu",
      )}
      {...inertProps(inert)}
    >
      {children}
    </div>
  );
}

export default forwardRef(function NavbarMobileSidebarLayout(
  { header, primaryMenu, secondaryMenu }: Props,
  ref: any,
): ReactNode {
  const { shown: secondaryMenuShown } = useNavbarSecondaryMenu();
  const mobileSidebar = useNavbarSecondaryMenu();
  return (
    <div
      className="navbar-sidebar__overlay"
      onClick={() => mobileSidebar.toggle()}
    >
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.mobileSidebar.container,
          "navbar-sidebar",
        )}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        {header}
        <div
          className={clsx("navbar-sidebar__items", {
            "navbar-sidebar__items--show-secondary": secondaryMenuShown,
          })}
        >
          <NavbarMobileSidebarPanel inert={secondaryMenuShown}>
            {primaryMenu}
          </NavbarMobileSidebarPanel>
          <NavbarMobileSidebarPanel inert={!secondaryMenuShown}>
            {secondaryMenu}
          </NavbarMobileSidebarPanel>
        </div>
      </div>
    </div>
  );
});
