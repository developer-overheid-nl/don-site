import IconTekstballonnenMetPunten from "@site/src/theme/icons/IconTekstballonnenMetPunten"; 
import IconIct from "@site/src/theme/icons/IconIct";
import IconComputercode from "@site/src/theme/icons/IconComputercode";
import IconDocumentMetGolvendeLijnenEnLint from "@site/src/theme/icons/IconDocumentMetGolvendeLijnenEnLint";
import IconKlembordMetVinkjesEnLijnen from "@site/src/theme/icons/IconKlembordMetVinkjesEnLijnen";
import IconComputer from "@site/src/theme/icons/IconComputer";
import IconManMetLaptop from "@site/src/theme/icons/IconManMetLaptop";
import IconCybersecurity from "@site/src/theme/icons/IconCybersecurity";

export default [
  {
    icon: <IconTekstballonnenMetPunten />,
    title: 'Doe mee',
    description: 'Dit project is continu in ontwikkeling. Ontbreekt er iets of zie je een fout? Of heb jij nog artikelen, tools of andere bronnen die je graag wilt delen? Laat het ons weten!',
    link: '/contributing',
  },
  {
    icon: <IconKlembordMetVinkjesEnLijnen />,
    title: 'Leidraad verantwoorde software ontwikkeling',
    description: 'Starten met een IT project voor de overheid? Deze lijst met principes en voorbeelden is een eerste aanzet tot overheidsbreed beleid voor development.',
    link: '/kennisbank/leidraad/',
  },
  {
    icon: <IconIct />,
    title: 'Aan de slag met API development',
    description: 'Moet je een API bouwen die voldoet aan de standaarden van de NL API Strategie? Volg onze tutorial en ontwikkel stap-voor-stap een compliant API.',
    // description: [
    //   { link: '/kennisbank/apis/aan-de-slag/bouw-een-api', label: 'Bouw een API' }, 
    //   { link: '/kennisbank/apis/aan-de-slag/maak-een-oas', label: 'Maak een OpenAPI specificatie' },
    //   { link: '/kennisbank/apis/standaarden/problem-json', label: 'Problem JSON' },
    //   { link: 'https://apis.developer.overheid.nl/', external: true, label: 'API\'s van Nederlandse overheidsorganisaties'}
    // ],
    link: '/kennisbank/apis/',
  },
  {
    icon: <IconManMetLaptop />,
    title: 'Implementatie-ondersteuning',
    description: 'Heb je hulp nodig bij het ontwikkelen of aanbieden van API\'s? Ons implementatie-ondersteuningsteam staat voor je klaar!',
    link: '/implementatie-ondersteuning',
  },
  {
    icon: <IconComputercode />,
    title: 'Aan de slag met Open Source',
    description: [
      { link: '/blog/2025/03/17/hoe-overtuig-ik-mijn-manager', label: 'Blog: Hoe overtuig ik mijn manager?' }, 
      { link: '/kennisbank/open-source/tutorials/os-checklist', label: 'Project Launch Checklist' },
      { link: '/kennisbank/open-source/tutorials/open-source-software-licenties', label: 'Een licentie kiezen' },
      { link: '/kennisbank/open-source/standaarden/readme-md', label: 'README.md' },
      { link: '/kennisbank/open-source/standaarden/publiccode-yml', label: 'Publiccode.yml' },
      { link: 'https://oss.developer.overheid.nl/', external: true, label: 'Open source software register'}
    ],
    link: '/kennisbank/open-source/',
  },
  {
    icon: <IconDocumentMetGolvendeLijnenEnLint />,
    title: 'Hoe voldoe ik aan de API Design Rules',
    description: [
      { link: '/kennisbank/apis/tools/api-design-rules-linter', label: 'API Design Rules Linter' }, 
      { link: '/kennisbank/apis/tools/api-design-rules-validator', label: 'API Design Rules Validator' },
      { link: '/kennisbank/apis/tools/open-api-spec-generator', label: 'OpenAPI Spec Generator' },
      { link: '/blog/2023/09/20/waarom-zijn-api-design-rules-zo-belangrijk', label: 'Blog: Waarom zijn API design rules zo belangrijk?' },
    ],
    link: '/kennisbank/apis/tools/',
  },
  {
    icon: <IconComputer />,
    title: 'Aan de slag met front-end',
    description: [
      { link: '/kennisbank/front-end/nl-design-system/', label: 'NL Design System' }, 
      { link: '/kennisbank/front-end/standaarden/digitoegankelijk', label: 'DigiToegankelijk' }
    ],
    link: '/kennisbank/front-end/',
  },
  {
    icon: <IconCybersecurity />,
    title: 'Security',
    description: [
      { link: '/kennisbank/security/standaarden/digid', label: 'DigiD' }, 
      { link: '/kennisbank/security/standaarden/eherkenning', label: 'eHerkenning' },
      { link: '/kennisbank/security/standaarden/eidas', label: 'eIDAS' },
      { link: '/kennisbank/security/standaarden/oauth', label: 'OAuth 2.0' },
      { link: '/kennisbank/security/standaarden/pkioverheid', label: 'PKIoverheid' },
    ],
    link: '/kennisbank/security/',
  },
];
