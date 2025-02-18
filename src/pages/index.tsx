import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <p className={styles.intro}>
          Informatie en tools van de <strong className={styles.intro__highlight}>overheid voor ontwikkelaars</strong> door 
          Kennisplatform API's, Digilab, DSO, Open source werken, BZK, Belastingdienst, Kadaster en andere overheidsorganisaties.
        </p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Ontwikkelaarsportaal voor de developer bij de overheid`}
      description="TODO: good meta description">
      <main>
        <HomepageHeader />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
