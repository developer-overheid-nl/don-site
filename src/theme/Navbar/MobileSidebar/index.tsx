import React, { type ReactNode } from "react";
import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import NavbarMobileSidebarLayout from "@theme/Navbar/MobileSidebar/Layout";
import NavbarMobileSidebarHeader from "@theme/Navbar/MobileSidebar/Header";
import NavbarMobileSidebarPrimaryMenu from "@theme/Navbar/MobileSidebar/PrimaryMenu";
import NavbarMobileSidebarSecondaryMenu from "@theme/Navbar/MobileSidebar/SecondaryMenu";
import { FocusTrap } from "focus-trap-react";

export default function NavbarMobileSidebar(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  useLockBodyScroll(mobileSidebar.shown);

  if (!mobileSidebar.shouldRender) {
    return null;
  }

  return (
    mobileSidebar.shown && (
      <FocusTrap>
        <NavbarMobileSidebarLayout
          aria-role="navigation"
          header={<NavbarMobileSidebarHeader />}
          primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
          secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
        />
      </FocusTrap>
    )
  );
}
