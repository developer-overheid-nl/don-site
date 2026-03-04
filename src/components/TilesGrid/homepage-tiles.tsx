import type React from "react";
import IconApiInrichting from "@site/src/theme/icons/IconApiInrichting";
import IconComputer from "@site/src/theme/icons/IconComputer";
import IconKetting2Schakels from "@site/src/theme/icons/IconKetting2Schakels";
import IconCybersecurity from "@site/src/theme/icons/IconCybersecurity";
import IconDoosMetPijlenOpZijkantZijaanzicht from "@site/src/theme/icons/IconDoosMetPijlenOpZijkantZijaanzicht";
import IconComputercode from "@site/src/theme/icons/IconComputercode";
import IconDocumentMetGolvendeLijnenEnLint from "@site/src/theme/icons/IconDocumentMetGolvendeLijnenEnLint";
import IconIct from "@site/src/theme/icons/IconIct";
import Icon3BoekenAchterElkaar from "@site/src/theme/icons/Icon3BoekenAchterElkaar";
import IconKlembordMetVinkjesEnLijnen from "@site/src/theme/icons/IconKlembordMetVinkjesEnLijnen";
import IconNetwerk from "@site/src/theme/icons/IconNetwerk";
import IconManMetLaptop from "@site/src/theme/icons/IconManMetLaptop";

import { GridTile } from ".";

const tiles: GridTile[] = [
  // — Rij 1: Uitgelicht —
  {
    icon: <IconKlembordMetVinkjesEnLijnen />,
    title: "Leidraad softwareontwikkeling",
    description:
      "Starten met een IT project voor de overheid? Deze lijst met principes en voorbeelden is een eerste aanzet tot overheidsbreed beleid voor development.",
    link: "/kennisbank/leidraad/",
  },
  {
    icon: <IconNetwerk />,
    title: "Techradar",
    description:
      "Bekijk onze techradar voor inzicht in de technologieën, tools en concepten die we verkennen, gebruiken of bewust vermijden.",
    link: "https://radar.thoughtworks.com/?documentId=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1mOX2791I5RL688muHsL7LDGqhRoKqUo5Vj3QrjMZXe8%2Fedit%3Fusp%3Dsharing",
    highlight: "beta",
    external: true,
  },
  {
    icon: <IconManMetLaptop />,
    title: "Implementatieondersteuning",
    description:
      "Heb je hulp nodig bij het ontwikkelen of aanbieden van API's? Ons implementatieondersteuningsteam staat voor je klaar!",
    link: "/implementatie-ondersteuning",
    highlight: "uitgelicht",
  },

  // — Rij 2: Cross-cutting ingangen —
  {
    icon: <Icon3BoekenAchterElkaar />,
    title: "Tutorials",
    description: [
      {
        link: "/kennisbank/api-ontwikkeling/tutorials/bouw-een-api",
        label: "Bouw een API",
      },
      {
        link: "/kennisbank/front-end/nl-design-system/aan-de-slag-met-nl-design-system",
        label: "Aan de slag met NL Design System",
      },
      {
        link: "/kennisbank/open-source/tutorials/os-checklist",
        label: "Project Checklist",
      },
      {
        link: "/kennisbank/open-source/tutorials/open-source-software-licenties",
        label: "Licenties kiezen",
      },
      {
        link: "/kennisbank/open-source/tutorials/git-in-een-open-source-project",
        label: "Git workflow",
      },
      {
        link: "/kennisbank/open-source/tutorials/voeg-een-publiccode-yml-bestand-toe",
        label: "publiccode.yml toevoegen",
      },
      {
        link: "/kennisbank/open-source/tutorials/tutorial-repo-docs-generator",
        label: "Repo docs generator",
      },
    ],
    link: "/kennisbank/tutorials",
  },
  {
    icon: <IconDocumentMetGolvendeLijnenEnLint />,
    title: "Standaarden",
    description: [
      {
        link: "/kennisbank/api-ontwikkeling/standaarden/api-design-rules/cheat-sheet",
        label: "ADR Cheat Sheet",
      },
      {
        link: "/kennisbank/security/authenticatie/pkioverheid",
        label: "PKIoverheid",
      },
      {
        link: "/kennisbank/security/wetgeving-en-beleid/nis1",
        label: "NIS1",
      },
      {
        link: "/kennisbank/security/wetgeving-en-beleid/eudi-wallet",
        label: "EUDI Wallet",
      },
      {
        link: "/kennisbank/devops/standaarden/haven/haven-plus",
        label: "Haven+",
      },
      {
        link: "/kennisbank/open-source/standaarden/code-of-conduct-md",
        label: "CODE_OF_CONDUCT.md",
      },
      {
        link: "/kennisbank/open-source/standaarden/project-governance-md",
        label: "PROJECT_GOVERNANCE.md",
      },
      {
        link: "/kennisbank/security/standaarden/security-txt",
        label: "security.txt",
      },
    ],
    link: "/kennisbank/standaarden",
  },
  {
    icon: <IconIct />,
    title: "Tools",
    description: [
      {
        link: "/kennisbank/api-ontwikkeling/tools/api-design-rules-linter",
        label: "ADR Linter",
      },
      {
        link: "/kennisbank/api-ontwikkeling/tools/api-design-rules-validator",
        label: "ADR Validator",
      },
      {
        link: "/kennisbank/api-ontwikkeling/tools/openapi-specification-generator",
        label: "OAS Generator",
      },
      {
        link: "/kennisbank/open-source/tools/publiccode-yml-editor",
        label: "publiccode.yml editor",
      },
      {
        link: "/kennisbank/open-source/tools/publiccode-yml-parser",
        label: "publiccode.yml parser",
      },
    ],
    link: "/kennisbank/tools",
  },

  // — Rij 3-4: Themacategorieën —
  {
    icon: <IconApiInrichting />,
    title: "API Ontwikkeling",
    description: [
      {
        link: "/kennisbank/api-ontwikkeling/standaarden/api-design-rules",
        label: "API Design Rules",
      },
      {
        link: "/kennisbank/api-ontwikkeling/standaarden/openapi-specification",
        label: "OpenAPI Specification",
      },
      {
        link: "/kennisbank/api-ontwikkeling/standaarden/cloudevents",
        label: "CloudEvents",
      },
      {
        link: "/kennisbank/api-ontwikkeling/architectuur/eda",
        label: "Event Driven Architecture",
      },
      {
        link: "/kennisbank/api-ontwikkeling/architectuur/webhooks",
        label: "Webhooks",
      },
      {
        link: "/kennisbank/api-ontwikkeling/architectuur/problem-details",
        label: "Problem Details",
      },
      {
        link: "/kennisbank/api-ontwikkeling/architectuur/gelijktijdigheid-met-optimistic-locking",
        label: "Optimistic Locking",
      },
      {
        link: "/kennisbank/api-ontwikkeling/architectuur/retries-met-volledige-idempotency",
        label: "Idempotency",
      },
      {
        link: "/kennisbank/api-ontwikkeling/tools/wuppiefuzz",
        label: "WuppieFuzz",
      },
    ],
    link: "/kennisbank/api-ontwikkeling/",
  },
  {
    icon: <IconComputer />,
    title: "Front-end",
    description: [
      {
        link: "/kennisbank/front-end/standaarden/digitoegankelijk",
        label: "DigiToegankelijk (WCAG)",
      },
      {
        link: "/kennisbank/front-end/nl-design-system",
        label: "NL Design System",
      },
      {
        link: "/kennisbank/front-end/formatting-linting",
        label: "Formatting & Linting",
      },
      {
        link: "/kennisbank/front-end/maps-developers-amsterdam",
        label: "Maps Amsterdam",
      },
      {
        link: "/kennisbank/front-end/tools/gemeente-iconen",
        label: "Gemeente Iconen",
      },
      {
        link: "/kennisbank/front-end/tools/run-axe",
        label: "Axe checker",
      },
    ],
    link: "/kennisbank/front-end/",
  },
  {
    icon: <IconKetting2Schakels />,
    title: "Data & Interoperabiliteit",
    description: [
      {
        link: "/kennisbank/data/standaarden/logboek-dataverwerkingen",
        label: "Logboek Dataverwerkingen",
      },
      { link: "/kennisbank/data/linked-data/rdf", label: "RDF" },
      { link: "/kennisbank/data/linked-data/dcat", label: "DCAT" },
      { link: "/kennisbank/data/linked-data/shacl", label: "SHACL" },
      { link: "/kennisbank/data/linked-data/skos", label: "SKOS" },
      { link: "/kennisbank/data/linked-data/owl", label: "OWL" },
      { link: "/kennisbank/data/json-yaml", label: "JSON / YAML" },
    ],
    link: "/kennisbank/data/",
  },
  {
    icon: <IconCybersecurity />,
    title: "Security",
    description: [
      { link: "/kennisbank/security/authenticatie/oauth", label: "OAuth 2.0" },
      {
        link: "/kennisbank/security/authenticatie/oidc",
        label: "OpenID Connect",
      },
      { link: "/kennisbank/security/authenticatie/digid", label: "DigiD" },
      {
        link: "/kennisbank/security/authenticatie/eherkenning",
        label: "eHerkenning",
      },
      { link: "/kennisbank/security/authenticatie/saml", label: "SAML" },
      {
        link: "/kennisbank/security/wetgeving-en-beleid/nis2",
        label: "NIS2",
      },
      {
        link: "/kennisbank/security/wetgeving-en-beleid/eidas",
        label: "eIDAS",
      },
      {
        link: "/kennisbank/security/wetgeving-en-beleid/bio",
        label: "BIO",
      },
      { link: "/kennisbank/security/tools/openkat", label: "OpenKAT" },
    ],
    link: "/kennisbank/security/",
  },
  {
    icon: <IconDoosMetPijlenOpZijkantZijaanzicht />,
    title: "DevOps & Platform",
    description: [
      { link: "/kennisbank/devops/standaarden/haven", label: "Haven" },
      { link: "/kennisbank/devops/standaarden/fsc", label: "FSC" },
      {
        link: "/kennisbank/devops/tools/haven-compliancy-checker",
        label: "Haven Compliancy Checker",
      },
      {
        link: "/kennisbank/devops/tools/quality-time",
        label: "Quality-time",
      },
      {
        link: "/kennisbank/devops/tools/fsc-policy-builder",
        label: "FSC Policy Builder",
      },
    ],
    link: "/kennisbank/devops/",
  },
  {
    icon: <IconComputercode />,
    title: "Open Source",
    description: [
      {
        link: "/kennisbank/open-source/standaarden/publiccode-yml",
        label: "publiccode.yml",
      },
      {
        link: "/kennisbank/open-source/standaarden/standaard-voor-publieke-code",
        label: "Standaard voor Publieke Code",
      },
      {
        link: "/kennisbank/open-source/standaarden/readme-md",
        label: "README.md",
      },
      {
        link: "/kennisbank/open-source/standaarden/contributing-md",
        label: "CONTRIBUTING.md",
      },
      {
        link: "/kennisbank/open-source/standaarden/security",
        label: "SECURITY.md",
      },
    ],
    link: "/kennisbank/open-source/",
  },
];

export default tiles;
