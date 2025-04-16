import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageBlogposts from "../components/HomepageBlogposts";
import HomepageAgenda from "../components/HomepageAgenda";

import styles from "./index.module.css";
import { IconButton, TextInput } from "@rijkshuisstijl-community/components-react";
import IconZoekInline from "../theme/icons/IconZoekInline";
import { ThemeConfig } from "docusaurus-theme-search-typesense";

function Search() {
  return (
    <form action="/zoeken" method="get" className={styles.heroSearch}>
      <label className="visual-hidden" htmlFor="banner-search">Zoek in de Kennisbank, API- en OSS-register</label>
      <TextInput type="search" name="q" id="banner-search" className={styles.heroSearchInput} placeholder="Zoek in de Kennisbank, API- en OSS-register" />
      <IconButton label="Zoeken" type="submit" className={styles.heroSearchButton}>
        <IconZoekInline />
      </IconButton>
    </form>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { searchPagePath } = siteConfig.themeConfig.typesense as ThemeConfig['typesense'] || { searchPagePath: false };

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <script
        data-goatcounter="https://donv1.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      ></script>
      <div className="container">
        <p className={styles.intro}>
          Eén plek met informatie, bronnen, tools en code voorbeelden van de <strong className={styles.intro__highlight}>overheid voor developers</strong> over 
          privacy, security, toegankelijkheid, DevOps, infra, data, AI, standaarden, API's, Open Source en meer.
        </p>
        {
          searchPagePath ? <Search /> : null
        }
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Ontwikkelaarsportaal van de Nederlandse Overheid`}
      description="Eén plek met informatie, bronnen, tools en code voorbeelden van de overheid voor developers over privacy, security, toegankelijkheid, DevOps, infra, data, AI, standaarden, API's, Open Source en meer.">
      <main>
        <HomepageHeader />
        <HomepageFeatures />
        <div className="container">
          <div className={styles.twoColumns}>
            <HomepageBlogposts />
            <HomepageAgenda />
          </div>
        </div>
      </main>
    </Layout>
  );
}
