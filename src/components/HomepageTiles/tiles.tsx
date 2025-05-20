import IconTekstballonnenMetPunten from "@site/src/theme/icons/IconTekstballonnenMetPunten"; 
import IconIct from "@site/src/theme/icons/IconIct";
import IconComputercode from "@site/src/theme/icons/IconComputercode";
import IconDocumentMetGolvendeLijnenEnLint from "@site/src/theme/icons/IconDocumentMetGolvendeLijnenEnLint";
import IconKlembordMetVinkjesEnLijnen from "@site/src/theme/icons/IconKlembordMetVinkjesEnLijnen";
import IconComputer from "@site/src/theme/icons/IconComputer";
import IconManMetLaptop from "@site/src/theme/icons/IconManMetLaptop";
import IconLadeArchiefkast from "@site/src/theme/icons/IconLadeArchiefkast";

export default [
  {
    icon: <IconTekstballonnenMetPunten />,
    title: 'Doe mee',
    description: 'Lorum ipsum dolor sit amet',
    link: '/bijdragen',
  },
  {
    icon: <IconIct />,
    title: 'Aan de slag met API design',
    description: [
      { link: '/kennisbank/apis/aan-de-slag/bouw-een-api', label: 'Bouw een API' }, 
      { link: '/kennisbank/apis/aan-de-slag/maak-een-oas', label: 'Maak een OpenAPI specificatie' },
      { link: '/kennisbank/apis/standaarden/problem-json', label: 'Problem JSON' },
    ],
    link: '/api',
  },
  {
    icon: <IconComputercode />,
    title: 'Aan de slag met Open Source',
    description: 'Lorum ipsum dolor sit amet',
    link: '/bijdragen',
  },
  {
    icon: <IconDocumentMetGolvendeLijnenEnLint />,
    title: 'Hoe voldoe ik aan de API Design Rules',
    description: [
      { link: '/kennisbank/apis/tools/api-design-rules-linter', label: 'API Design Rules Linter' }, 
      { link: '/kennisbank/apis/tools/api-design-rules-validator', label: 'API Design Rules Validator' },
      { link: '/kennisbank/apis/tools/open-api-spec-generator', label: 'OpenAPI Spec Generator' },
    ],
    link: '/kennisbank/apis/tools',
  },
  {
    icon: <IconKlembordMetVinkjesEnLijnen />,
    title: 'Leidraad verantwoorde software ontwikkeling',
    description: 'Lijst met principes voor overheidsbreed beleid voor softwareontwikkeling',
    link: '/kennisbank/leidraad',
  },
  {
    icon: <IconManMetLaptop />,
    title: 'Implementatieondersteuning',
    description: 'Verkennen van standaarden, ondersteuning bij casussen, proces naar doelarchitectuur? Wij staan klaar met advies, praktische ondersteuning en support',
    link: '/implementatie-ondersteuning',
  },
  {
    icon: <IconComputer />,
    title: 'Aan de slag met front-end',
    description: [{ link: '/kennisbank/front-end/nl-design-system/', label: 'NL Design System' }, { link: '/kennisbank/front-end/standaarden/digitoegankelijk', label: 'DigiToegankelijk' }],
    link: '/kennisbank/front-end/',
  },
  {
    icon: <IconLadeArchiefkast />,
    title: 'TBD',
    description: 'Lorum ipsum dolor sit amet',
    link: '/api',
  },
];
