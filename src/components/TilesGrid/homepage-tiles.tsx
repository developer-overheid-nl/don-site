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
import IconTekstballonnenMetPunten from "@site/src/theme/icons/IconTekstballonnenMetPunten";
import IconTekstballonMetPotlood from "@site/src/theme/icons/IconTekstballonMetPotlood";

import { GridTile } from ".";

const tiles: GridTile[] = [
  // — Hoofdcategorieën (rij 1-2) —
  {
    icon: <IconApiInrichting />,
    title: "API Ontwikkeling",
    description:
      "Design rules, OpenAPI, architectuurpatronen en tools voor het bouwen van API's die voldoen aan de standaarden.",
    link: "/kennisbank/api-ontwikkeling/",
  },
  {
    icon: <IconComputer />,
    title: "Front-end",
    description:
      "NL Design System, toegankelijkheid (WCAG) en tools voor het bouwen van inclusieve interfaces.",
    link: "/kennisbank/front-end/",
  },
  {
    icon: <IconKetting2Schakels />,
    title: "Data & Interoperabiliteit",
    description:
      "Linked data, datastandaarden en formaten voor uitwisselbaarheid tussen overheidssystemen.",
    link: "/kennisbank/data/",
  },
  {
    icon: <IconCybersecurity />,
    title: "Security",
    description:
      "Authenticatie, autorisatie en wetgeving: DigiD, OAuth, eIDAS, NIS2 en meer.",
    link: "/kennisbank/security/",
  },
  {
    icon: <IconDoosMetPijlenOpZijkantZijaanzicht />,
    title: "DevOps & Platform",
    description:
      "Kubernetes, deployment, monitoring en platformstandaarden zoals Haven en FSC.",
    link: "/kennisbank/devops/",
  },
  {
    icon: <IconComputercode />,
    title: "Open Source",
    description:
      "Licenties, repositories, publiccode.yml en community-richtlijnen voor open source bij de overheid.",
    link: "/kennisbank/open-source/",
  },

  // — Cross-cutting ingangen (rij 3) —
  {
    icon: <IconDocumentMetGolvendeLijnenEnLint />,
    title: "Alle Standaarden",
    description:
      "40+ standaarden voor interoperabiliteit, security en toegankelijkheid op één plek.",
    link: "/kennisbank/standaarden",
  },
  {
    icon: <IconIct />,
    title: "Alle Tools",
    description:
      "15+ tools voor ontwikkeling, validatie en monitoring van overheidssoftware.",
    link: "/kennisbank/tools",
  },
  {
    icon: <Icon3BoekenAchterElkaar />,
    title: "Alle Tutorials",
    description:
      "Stapsgewijze handleidingen om direct aan de slag te gaan met standaarden en tools.",
    link: "/kennisbank/tutorials",
  },

  // — NeRDS Leidraad + overig (rij 4+) —
  {
    icon: <IconKlembordMetVinkjesEnLijnen />,
    title: "NeRDS leidraad softwareontwikkeling",
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
  {
    icon: <IconTekstballonMetPotlood />,
    title: "Doe mee",
    description:
      "Dit project is continu in ontwikkeling. Ontbreekt er iets of zie je een fout? Of heb jij nog artikelen, tools of andere bronnen die je graag wilt delen? Laat het ons weten!",
    link: "/contributing",
  },
];

export default tiles;
