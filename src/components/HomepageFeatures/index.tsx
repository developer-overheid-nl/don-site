import clsx from 'clsx';
import Heading from '@theme/Heading';
import { Card } from "@rijkshuisstijl-community/components-react";
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image?: string;
  description: JSX.Element;
  link: string;
  label?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Onze community',
    image: '/img/tekstballonnen-met-punten.svg',
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
    // <div className={clsx('col col--4')}>
    //   <div className="text--center">
    //     <Svg className={styles.featureSvg} role="img" />
    //   </div>
    //   <div className="text--center padding-horiz--md">
    //     <Heading as="h3">{title}</Heading>
    //     <p>{description}</p>
    //   </div>
    // </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row row--align-stretch">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
