// By default, the classic theme does not provide any SearchBar implementation
// If you swizzled this, it is your responsibility to provide an implementation
// Tip: swizzle the SearchBar from the Algolia theme for inspiration:
// npm run swizzle @docusaurus/theme-search-algolia SearchBar

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import IconZoek from "./icons/IconZoek";
import { type ThemeConfig } from 'docusaurus-theme-search-typesense'

export default function SearchBar(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const { searchPagePath } = siteConfig.themeConfig.typesense as ThemeConfig['typesense'] || { searchPagePath: false };

  console.log( siteConfig.themeConfig.typesense, searchPagePath );

  // return <DocSearch {...(siteConfig.themeConfig.algolia as DocSearchProps)} />;
  return (
    <a href={`/${searchPagePath}`} className="navbar__link"><IconZoek width={24} height={24} /></a>
  );
}
