import type React from "react";
// import IconIct from "@site/src/theme/icons/IconIct";
import IconComputercode from "@site/src/theme/icons/IconComputercode";
import IconDocumentMetGolvendeLijnenEnLint from "@site/src/theme/icons/IconDocumentMetGolvendeLijnenEnLint";
import IconKlembordMetVinkjesEnLijnen from "@site/src/theme/icons/IconKlembordMetVinkjesEnLijnen";
import IconComputer from "@site/src/theme/icons/IconComputer";
import IconManMetLaptop from "@site/src/theme/icons/IconManMetLaptop";
import IconCybersecurity from "@site/src/theme/icons/IconCybersecurity";
import IconTekstballonMetPotlood from "@site/src/theme/icons/IconTekstballonMetPotlood";
import IconTekstballonnenMetPunten from "@site/src/theme/icons/IconTekstballonnenMetPunten";
import IconNetwerk from "@site/src/theme/icons/IconNetwerk";

import { GridTile } from ".";

const tiles: GridTile[] = [
  {
    icon: <IconNetwerk />,
    title: "Techradar",
    description:
      "Bekijk onze techradar voor inzicht in de technologieën, tools en concepten die we verkennen, gebruiken of bewust vermijden. Zo houden we koers in een snel veranderend digitaal landschap.",
    link: "https://radar.thoughtworks.com/?documentId=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1mOX2791I5RL688muHsL7LDGqhRoKqUo5Vj3QrjMZXe8%2Fedit%3Fusp%3Dsharing",
    highlight: "beta",
    external: true,
  },
  {
    icon: <IconKlembordMetVinkjesEnLijnen />,
    title: "Leidraad voor software ontwikkeling",
    description:
      "Starten met een IT project voor de overheid? Deze lijst met principes en voorbeelden is een eerste aanzet tot overheidsbreed beleid voor development.",
    link: "/kennisbank/leidraad/",
  },
  {
    icon: <IconManMetLaptop />,
    title: "Implementatieondersteuning",
    description:
      "Heb je hulp nodig bij het ontwikkelen of aanbieden van API's? Ons implementatieondersteuningsteam staat voor je klaar!",
    link: "/implementatie-ondersteuning",
    highlight: "uitgelicht",
  },
  {
    icon: <IconTekstballonMetPotlood />,
    title: "Doe mee",
    description:
      "Dit project is continu in ontwikkeling. Ontbreekt er iets of zie je een fout? Of heb jij nog artikelen, tools of andere bronnen die je graag wilt delen? Laat het ons weten!",
    link: "/contributing",
  },
  // {
  //   icon: <IconIct />,
  //   title: 'Ontwikkel een API',
  //   description: 'Moet je een API bouwen die voldoet aan de standaarden van de NL API Strategie? Volg onze tutorial en ontwikkel stap-voor-stap een compliant API.',
  //   // description: [
  //   //   { link: '/kennisbank/apis/aan-de-slag/bouw-een-api', label: 'Bouw een API' },
  //   //   { link: '/kennisbank/apis/aan-de-slag/maak-een-oas', label: 'Maak een OpenAPI specificatie' },
  //   //   { link: '/kennisbank/apis/standaarden/problem-json', label: 'Problem JSON' },
  //   //   { link: 'https://apis.developer.overheid.nl/', external: true, label: 'API\'s van Nederlandse overheidsorganisaties'}
  //   // ],
  //   link: '/kennisbank/apis/aan-de-slag/bouw-een-api',
  //   highlight: 'tutorial',
  // },
  {
    icon: <IconComputercode />,
    title: "Open Source",
    description: [
      {
        link: "/blog/2025/03/17/hoe-overtuig-ik-mijn-manager",
        label: "Blog: Hoe overtuig ik mijn manager?",
      },
      {
        link: "/kennisbank/open-source/tutorials/os-checklist",
        label: "Project Launch Checklist",
      },
      {
        link: "/kennisbank/open-source/tutorials/open-source-software-licenties",
        label: "Een licentie kiezen",
      },
      {
        link: "/kennisbank/open-source/standaarden/readme-md",
        label: "README.md",
      },
      {
        link: "/kennisbank/open-source/standaarden/publiccode-yml",
        label: "Publiccode.yml",
      },
      {
        link: "https://oss.developer.overheid.nl/",
        external: true,
        label: "Open source software register",
      },
    ],
    link: "/kennisbank/open-source/",
  },
  {
    icon: <IconComputer />,
    title: "Aan de slag met NL Design System",
    description:
      "Wil je snel aan de slag met NL Design System? In deze handleiding laten we je zien hoe je het lokaal kunt opzetten en hoe je experimenteert met de beschikbare componenten.",
    // description: [
    //   { link: '/kennisbank/front-end/nl-design-system/', label: 'NL Design System' },
    //   { link: '/kennisbank/front-end/standaarden/digitoegankelijk', label: 'DigiToegankelijk' }
    // ],
    link: "/kennisbank/front-end/nl-design-system/aan-de-slag-met-nl-design-system",
    highlight: "tutorial",
  },
  {
    icon: <IconCybersecurity />,
    title: "Authenticatie en autorisatie",
    description: [
      { link: "/kennisbank/security/standaarden/digid", label: "DigiD" },
      {
        link: "/kennisbank/security/standaarden/eherkenning",
        label: "eHerkenning",
      },
      { link: "/kennisbank/security/standaarden/eidas", label: "eIDAS" },
      { link: "/kennisbank/security/standaarden/oauth", label: "OAuth 2.0" },
      {
        link: "/kennisbank/security/standaarden/pkioverheid",
        label: "PKIoverheid",
      },
      { link: "/kennisbank/security/standaarden/saml", label: "SAML" },
      {
        link: "/kennisbank/security/standaarden/oidc",
        label: "OpenID Connect (OIDC)",
      },
      {
        link: "/kennisbank/security/standaarden/bio",
        label: "Baseline Informatiebeveiliging Overheid (BIO)",
      },
      { link: "/kennisbank/security/standaarden/nis2", label: "NIS2" },
    ],
    link: "/kennisbank/security/standaarden/",
  },
  {
    icon: <IconDocumentMetGolvendeLijnenEnLint />,
    title: "API Design Rules",
    description: [
      {
        link: "/kennisbank/apis/api-design-rules/cheat-sheet",
        label: "ADR Cheat Sheet",
      },
      {
        link: "/kennisbank/apis/api-design-rules/api-design-rules-linter",
        label: "API Design Rules Linter",
      },
      {
        link: "/kennisbank/apis/api-design-rules/api-design-rules-validator",
        label: "API Design Rules Validator",
      },
      {
        link: "/kennisbank/apis/openapi-specification/openapi-specification-generator",
        label: "OpenAPI Spec Generator",
      },
      {
        link: "/blog/2023/09/20/waarom-zijn-api-design-rules-zo-belangrijk",
        label: "Blog: Waarom zijn API design rules zo belangrijk?",
      },
    ],
    link: "/kennisbank/apis/api-design-rules/",
  },
  {
    icon: <IconTekstballonnenMetPunten />,
    title: "Communities",
    description: [
      {
        link: "/communities/kennisplatform-apis",
        label: "Kennisplatform API's",
      },
      { link: "/communities/code-for-nl", label: "Code for NL" },
      { link: "/communities/digilab", label: "Digilab" },
      { link: "/communities/open-source-werken", label: "Opensourcewerken" },
      {
        link: "/communities/federatief-datastelsel",
        label: "Federatief Datastelsel",
      },
      { link: "/communities/gebruiker-centraal", label: "Gebruiker Centraal" },
    ],
    link: "/communities/",
  },
];

export default tiles;
