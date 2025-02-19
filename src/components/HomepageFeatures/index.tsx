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
        Lees artikelen over diverse onderwerpen zoals ...
      </>
    ),
    link: '/docs',
    label: 'Lees onze artikelen',
  },
  {
    title: 'Onze community',
    image: '/img/tekstballonnen-met-punten.svg',
    alt: '',
    description: (
      <>
        Ga in gesprek met andere developers en vind hier getting started guides, tutorials en tools.
      </>
    ),
    link: 'https://community.developer.overheid.nl/',
    label: 'Ga naar de community',
  },
  {
    title: 'Vind een API',
    image: '/img/ict.svg',
    alt: '',
    description: (
      <>
        Bekijk welke API's er allemaal zijn en kom er achter hoe je jouw oplossing hier op kan laten aansluiten.
      </>
    ),
    link: '/apis',
    label: 'Zoek API\'s',
  },
  {
    title: 'Vind een repository',
    image: '/img/computercode.svg',
    alt: '',
    description: (
      <>
        Vind bestaande repositories om bij aan te haken en ontdek wat er binnen welke organisatie beschikbaar is.
      </>
    ),
    link: '/repositories',
    label: 'Zoek repositories',
  },
];

function Feature({title, image, description, link, label}: FeatureItem) {
  return (
    <Card href={link} heading={title} description={description} imageSrc={image} linkLabel={label} />
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
