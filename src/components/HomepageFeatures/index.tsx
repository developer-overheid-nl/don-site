import clsx from 'clsx';
import Heading from '@theme/Heading';
import { Card } from "@rijkshuisstijl-community/components-react";
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image?: string;
  alt?: string;
  description: JSX.Element;
  link: string;
  label?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Kennisbank',
    image: '/img/boek-opengeslagen.svg',
    alt: '',
    description: (
      <>
        Tutorials, tools, code voorbeelden en meer. Alles wat je nodig hebt om aan de slag te gaan met software van en voor de overheid.
      </>
    ),
    link: '/kennisbank',
    label: 'Ga naar de kennisbank',
  },
  {
    title: 'Onze community',
    image: '/img/tekstballonnen-met-punten.svg',
    alt: '',
    description: (
      <>
        Hulp nodig? Ga in gesprek met ons team of andere developers die actief zijn in het publieke domein op ons Discourse forum.
      </>
    ),
    link: 'https://community.developer.overheid.nl/',
    label: 'Ga naar het forum',
  },
  {
    title: 'Vind een API',
    image: '/img/ict.svg',
    alt: '',
    description: (
      <>
        Bekijk welke API's van de overheid er allemaal zijn en kom er achter hoe je jouw oplossing hier op kan laten aansluiten.
      </>
    ),
    link: '/apis',
    label: 'Ga naar het API register',
  },
  {
    title: 'Vind een repository',
    image: '/img/computercode.svg',
    alt: '',
    description: (
      <>
        Vind, verbeter of hergebruik bestaande Open Source projecten van de overheid in het Open Source Software register.
      </>
    ),
    link: '/repositories',
    label: 'Ga naar het OSS register',
  },
];

function Feature({title, image, alt, description, link, label}: FeatureItem) {
  return (
    <Card href={link} heading={title} description={description} imageSrc={image} imageAlt={alt} linkLabel={label} />
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.row}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
