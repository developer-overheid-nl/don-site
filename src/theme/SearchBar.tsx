// By default, the classic theme does not provide any SearchBar implementation
// If you swizzled this, it is your responsibility to provide an implementation
// Tip: swizzle the SearchBar from the Algolia theme for inspiration:
// npm run swizzle @docusaurus/theme-search-algolia SearchBar

import clsx from "clsx"; 
import SearchBarOriginal from '@theme-original/SearchBar';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import IconZoek from "./icons/IconZoek";
import { type ThemeConfig } from 'docusaurus-theme-search-typesense'
import styles from "./searchBar.module.css";

export default function SearchBar(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const { searchPagePath } = siteConfig.themeConfig.typesense as ThemeConfig['typesense'] || { searchPagePath: false };

  return (
    searchPagePath ? 
      <a href={`/${searchPagePath}`} className={ clsx(["navbar__link", "navbar__icon-link", styles.searchLink]) }><IconZoek width={24} height={24} /></a>
    : 
      <SearchBarOriginal />
  );
}
