import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageBlogposts from "../components/HomepageBlogposts";
import HomepageAgenda from "../components/HomepageAgenda";

import styles from "./index.module.css";
import {
  IconButton,
  TextInput,
} from "@rijkshuisstijl-community/components-react";
import IconZoekInline from "../theme/icons/IconZoekInline";
import { ThemeConfig } from "docusaurus-theme-search-typesense";

import HomepageTiles from "../components/TilesGrid/homepage-tiles";
import TilesGrid from "../components/TilesGrid";
import { useEffect, useState } from "react";

function Search() {
  const [hasInput, setHasInput] = useState(false);
  return (
    <>
      <form action="/zoeken" method="get" className={styles.heroSearch}>
        <TextInput
          type="search"
          name="q"
          id="banner-search"
          className={styles.heroSearchInput}
          placeholder="Zoek in de Kennisbank, API- en OSS-register"
          aria-label="Zoek in de Kennisbank, API- en OSS-register"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setHasInput(!!e.target.value)
          }
        />
        {/* @ts-ignore RHC component bug `label` not in type */}
        <IconButton
          label="Zoeken"
          type="submit"
          className={styles.heroSearchButton}
        >
          <IconZoekInline />
        </IconButton>
      </form>
      {hasInput && (
        <label
          htmlFor="banner-search"
          aria-label="Zoek in de Kennisbank, API- en OSS-register"
        >
          Zoek in de Kennisbank, API- en OSS-register
        </label>
      )}
    </>
  );
}

function HomepageHeader(): React.JSX.Element {
  useEffect(() => {
    const skipLink = document.querySelector(
      'a[href="#__docusaurus_skipToContent_fallback"]',
    );
    if (!skipLink) {
      return;
    }
    const handleSkipClick = (event: MouseEvent) => {
      event.preventDefault();
      const searchInput = document.getElementById(
        "banner-search",
      ) as HTMLInputElement;
      if (searchInput) {
        searchInput.scrollIntoView({ behavior: "smooth", block: "start" });
        // Focus the search input after scrolling
        // Using setTimeout to ensure the scroll has completed before focusing
        // This is a nessessary workaround for safari
        setTimeout(() => {
          searchInput.focus();
        }, 0);
      }
    };
    skipLink.addEventListener("click", handleSkipClick);
    return () => {
      skipLink.removeEventListener("click", handleSkipClick);
    };
  }, []);

  const { siteConfig } = useDocusaurusContext();
  const { searchPagePath } = (siteConfig.themeConfig
    .typesense as ThemeConfig["typesense"]) || { searchPagePath: false };

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <p className={styles.intro}>
          Eén plek met informatie, bronnen, tools en codevoorbeelden van
          de&nbsp;
          <strong className={styles.intro__highlight}>
            overheid voor developers
          </strong>{" "}
          over privacy, security, toegankelijkheid, DevOps, infra, data, AI,
          standaarden, API's, Open Source en meer.
        </p>
        {searchPagePath ? <Search /> : null}
      </div>
    </header>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title={`Ontwikkelaarsportaal van de Nederlandse Overheid`}
      description="Eén plek met informatie, bronnen, tools en codevoorbeelden van de overheid voor developers over privacy, security, toegankelijkheid, DevOps, infra, data, AI, standaarden, API's, Open Source en meer."
    >
      <main>
        <HomepageHeader />
        <section className="container">
          <TilesGrid tiles={HomepageTiles} paddingY={true} />
        </section>
        {/* <HomepageFeatures /> */}
        <div className="container container--full">
          <div className={styles.twoColumns}>
            <HomepageBlogposts />
            <HomepageAgenda />
          </div>
        </div>
      </main>
    </Layout>
  );
}
