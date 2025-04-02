import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageBlogposts from "../components/HomepageBlogposts";
import HomepageAgenda from "../components/HomepageAgenda";

import styles from "./index.module.css";
import { IconButton, TextInput } from "@rijkshuisstijl-community/components-react";
import IconZoekInline from "../theme/icons/IconZoekInline";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <script
        data-goatcounter="https://donv1.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      ></script>
      <div className="container">
        <p className={styles.intro}>
          Informatie, bronnen en tools van de <strong className={styles.intro__highlight}>overheid voor ontwikkelaars</strong> door 
          Kennisplatform API's, Digilab, Opensourcewerken, Binnenlandse Zaken, Geonovum, Belastingdienst, Kadaster en andere overheidsinstanties.
        </p>
        <form action="/zoeken" method="get" className={styles.heroSearch}>
          <label className="visual-hidden" htmlFor="banner-search">Zoeken</label>
          <TextInput type="search" name="q" id="banner-search" className={styles.heroSearchInput} />
          <IconButton label="Zoeken" type="submit" className={styles.heroSearchButton}>
            <IconZoekInline />
          </IconButton>
        </form>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Ontwikkelaarsportaal van de Nederlandse Overheid`}
      description="Informatie, bronnen en tools van de overheid voor ontwikkelaars door Kennisplatform API\'s, Digilab, Opensourcewerken, Binnenlandse Zaken, Geonovum, Belastingdienst, Kadaster en andere overheidsinstanties.">
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
