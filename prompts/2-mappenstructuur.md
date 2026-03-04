# Prompt: Mappenstructuur herstructureren

> **Herbruikbaar:** nee — eenmalig **Commit:** nee — voer alleen wijzigingen
> door, commit niet

## Doel

De mappenstructuur van `docs/` herindelen naar 7 hoofdcategorieen met
consistente subcategorieen. Alle interne links, sidebars, navbar en redirects
bijwerken.

## Nieuwe structuur

```
docs/
├── api-ontwikkeling/          (was: apis/)
│   ├── standaarden/
│   │   ├── api-design-rules/  (was: apis/api-design-rules/, zonder linter/validator)
│   │   ├── openapi-specification/
│   │   └── cloudevents.md     (was: apis/architectuur/cloudevents.md)
│   ├── architectuur/
│   │   ├── eda.md
│   │   ├── webhooks.md
│   │   ├── problem-details.md         (was: apis/gedrag-en-implementatie/)
│   │   ├── gelijktijdigheid-met-optimistic-locking.md  (was: apis/gedrag-en-implementatie/)
│   │   └── retries-met-volledige-idempotency.md        (was: apis/gedrag-en-implementatie/)
│   ├── tutorials/
│   │   └── bouw-een-api/      (was: apis/tutorial-bouw-een-api/)
│   ├── tools/
│   │   ├── api-design-rules-linter.md     (was: apis/api-design-rules/)
│   │   ├── api-design-rules-validator.md  (was: apis/api-design-rules/)
│   │   ├── openapi-specification-generator.md  (was: apis/openapi-specification/)
│   │   └── wuppiefuzz.md      (was: apis/tools/)
│   └── rust/                  (was: programmeertalen/rust/)
├── front-end/                 (ongewijzigd qua locatie, behalve run-axe)
│   ├── tools/
│   │   ├── run-axe.mdx        (was: front-end/standaarden/digitoegankelijk/run-axe.md — is een tool, geen standaard)
│   │   └── gemeente-iconen.md
├── data/                      (ongewijzigd qua locatie)
├── security/                  (mapnaam blijft, intern herstructureren)
│   ├── authenticatie/         (was: security/standaarden/ — alleen auth-gerelateerd)
│   │   ├── digid.md
│   │   ├── eherkenning.md
│   │   ├── oauth.md
│   │   ├── oidc.md
│   │   ├── saml.md
│   │   └── pkioverheid.md
│   ├── wetgeving-en-beleid/   (was: security/standaarden/ — alleen wetgeving)
│   │   ├── bio.md
│   │   ├── eidas.md
│   │   ├── eudi-wallet.md
│   │   ├── nis1.md
│   │   └── nis2.mdx
│   ├── standaarden/
│   │   └── security-txt.md   (was: security/standaarden/ — is een standaard, geen tool)
│   └── tools/
│       └── openkat.md
├── devops/                    (was: infra/)
│   ├── standaarden/
│   │   ├── haven/
│   │   └── fsc/
│   └── tools/
│       ├── haven-compliancy-checker.md  (was: devops/standaarden/haven/)
│       ├── quality-time.md
│       └── fsc-policy-builder.md
├── open-source/               (ongewijzigd)
└── leidraad/                  (ongewijzigd)
```

## Verwijderde mappen

- `docs/programmeertalen/` — Rust content verplaatst naar
  `api-ontwikkeling/rust/`, index verwijderd
- `docs/apis/gedrag-en-implementatie/` — content verplaatst naar
  `api-ontwikkeling/architectuur/`
- `docs/security/standaarden/` — content verdeeld over `authenticatie/`,
  `wetgeving-en-beleid/`, `tools/`

## Git mv operaties

Gebruik `git mv` voor alle verplaatsingen zodat git-historie behouden blijft.
Doe dit per bestand/map. Voorbeelden:

```bash
# Hoofdmap hernoemen
git mv docs/apis docs/api-ontwikkeling
git mv docs/infra docs/devops

# Binnen api-ontwikkeling herstructureren
git mv docs/api-ontwikkeling/api-design-rules/api-design-rules-linter.md docs/api-ontwikkeling/tools/
git mv docs/api-ontwikkeling/api-design-rules/api-design-rules-validator.md docs/api-ontwikkeling/tools/
# etc.

# Security opsplitsen
mkdir -p docs/security/authenticatie docs/security/wetgeving-en-beleid
git mv docs/security/standaarden/digid.md docs/security/authenticatie/
git mv docs/security/standaarden/oauth.md docs/security/authenticatie/
# etc.

# Programmeertalen integreren
git mv docs/programmeertalen/rust docs/api-ontwikkeling/rust
```

## Index-bestanden

Maak voor elke nieuwe submap een `index.md` aan met:

```yaml
---
title: "[Subcategorie naam]"
sidebar_label: "[Subcategorie naam]"
---
```

En een korte beschrijving van wat er in de map staat.

Benodigde nieuwe index-bestanden:

- `docs/api-ontwikkeling/standaarden/index.md`
- `docs/api-ontwikkeling/tutorials/index.md`
- `docs/security/authenticatie/index.md`
- `docs/security/wetgeving-en-beleid/index.md`

## Sidebars

Herschrijf `sidebars.ts` met één enkele sidebar `kennisbank`. Alle 7
themacategorieën staan direct op het hoogste niveau — geen "Kennisbank"-wrapper.
Hierdoor blijven alle thema's zichtbaar als je er één uitklapt:

```typescript
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  kennisbank: [
    {
      type: "category",
      label: "API Ontwikkeling",
      link: { type: "doc", id: "api-ontwikkeling/index" },
      items: [{ type: "autogenerated", dirName: "api-ontwikkeling" }],
    },
    {
      type: "category",
      label: "Front-end",
      link: { type: "doc", id: "front-end/index" },
      items: [{ type: "autogenerated", dirName: "front-end" }],
    },
    {
      type: "category",
      label: "Data & Interoperabiliteit",
      link: { type: "doc", id: "data/index" },
      items: [{ type: "autogenerated", dirName: "data" }],
    },
    {
      type: "category",
      label: "Open Source",
      link: { type: "doc", id: "open-source/index" },
      items: [{ type: "autogenerated", dirName: "open-source" }],
    },
    {
      type: "category",
      label: "DevOps & Platform",
      link: { type: "doc", id: "devops/index" },
      items: [{ type: "autogenerated", dirName: "devops" }],
    },
    {
      type: "category",
      label: "Security",
      link: { type: "doc", id: "security/index" },
      items: [{ type: "autogenerated", dirName: "security" }],
    },
    {
      type: "category",
      label: "Leidraad softwareontwikkeling",
      link: { type: "doc", id: "leidraad/index" },
      items: [{ type: "autogenerated", dirName: "leidraad" }],
    },
  ],
};

export default sidebars;
```

### `_category_.json` voor unieke translation keys

Omdat submappen als "Standaarden", "Tools" en "Tutorials" in meerdere
categorieën voorkomen, moet je `_category_.json` bestanden aanmaken met unieke
`key` attributen om Docusaurus translation key conflicten te voorkomen:

```
docs/<thema>/standaarden/_category_.json  →  { "label": "Standaarden", "key": "<thema>-standaarden" }
docs/<thema>/tools/_category_.json        →  { "label": "Tools", "key": "<thema>-tools" }
docs/<thema>/tutorials/_category_.json    →  { "label": "Tutorials", "key": "<thema>-tutorials" }
```

Maak deze aan voor alle submappen met dubbele namen (standaarden, tools,
tutorials) onder elke themacategorie.

## autoCollapseCategories

Voeg `autoCollapseCategories` toe aan `themeConfig` in `docusaurus.config.ts`
zodat bij het uitklappen van een themacategorie de andere automatisch
dichtklappen:

```typescript
// In themeConfig:
docs: {
  sidebar: {
    autoCollapseCategories: true,
  },
},
```

## sidebarItemsGenerator

Voeg aan de docs plugin in `docusaurus.config.ts` een `sidebarItemsGenerator`
toe die index-docs filtert (anders verschijnt de index als kind-item onder de
categorie):

```typescript
sidebarItemsGenerator: async function ({
  defaultSidebarItemsGenerator,
  ...args
}) {
  const items = await defaultSidebarItemsGenerator(args);
  return items.filter(
    (item) => !(item.type === "doc" && item.id.endsWith("/index")),
  );
},
```

## Navbar

Pas de navbar dropdown aan in `docusaurus.config.ts` →
`themeConfig.navbar.items`:

```typescript
{
  label: "Kennisbank",
  position: "left",
  to: "/kennisbank",
  items: [
    { label: "API Ontwikkeling", to: "/kennisbank/api-ontwikkeling" },
    { label: "Front-end", to: "/kennisbank/front-end" },
    { label: "Data & Interoperabiliteit", to: "/kennisbank/data" },
    { label: "Open Source", to: "/kennisbank/open-source" },
    { label: "DevOps & Platform", to: "/kennisbank/devops" },
    { label: "Security", to: "/kennisbank/security" },
    { label: "Leidraad softwareontwikkeling", to: "/kennisbank/leidraad" },
    { type: "html", value: '<hr style="margin: 0.3rem 0;">' },
    { label: "Alle Standaarden", to: "/kennisbank/standaarden" },
    { label: "Alle Tools", to: "/kennisbank/tools" },
    { label: "Alle Tutorials", to: "/kennisbank/tutorials" },
    { label: "Alle Artikelen", to: "/kennisbank/alles" },
  ],
},
```

## Interne links fixen

Na het verplaatsen van bestanden moeten alle interne links gefixt worden. Zoek
in ALLE bestanden (`docs/`, `blog/`, `communities/`) naar links met de oude
paden en vervang ze:

| Oud pad                                         | Nieuw pad                                              |
| ----------------------------------------------- | ------------------------------------------------------ |
| `/kennisbank/apis/`                             | `/kennisbank/api-ontwikkeling/`                        |
| `/kennisbank/infra/`                            | `/kennisbank/devops/`                                  |
| `/kennisbank/programmeertalen/`                 | `/kennisbank/api-ontwikkeling/`                        |
| `/kennisbank/security/standaarden/digid`        | `/kennisbank/security/authenticatie/digid`             |
| `/kennisbank/security/standaarden/eherkenning`  | `/kennisbank/security/authenticatie/eherkenning`       |
| `/kennisbank/security/standaarden/oauth`        | `/kennisbank/security/authenticatie/oauth`             |
| `/kennisbank/security/standaarden/oidc`         | `/kennisbank/security/authenticatie/oidc`              |
| `/kennisbank/security/standaarden/saml`         | `/kennisbank/security/authenticatie/saml`              |
| `/kennisbank/security/standaarden/pkioverheid`  | `/kennisbank/security/authenticatie/pkioverheid`       |
| `/kennisbank/security/standaarden/eidas`        | `/kennisbank/security/wetgeving-en-beleid/eidas`       |
| `/kennisbank/security/standaarden/eudi-wallet`  | `/kennisbank/security/wetgeving-en-beleid/eudi-wallet` |
| `/kennisbank/security/standaarden/nis1`         | `/kennisbank/security/wetgeving-en-beleid/nis1`        |
| `/kennisbank/security/standaarden/nis2`         | `/kennisbank/security/wetgeving-en-beleid/nis2`        |
| `/kennisbank/security/standaarden/bio`          | `/kennisbank/security/wetgeving-en-beleid/bio`         |
| `/kennisbank/security/standaarden/security-txt` | `/kennisbank/security/standaarden/security-txt`        |

Zoek ook naar relatieve links (bv. `../apis/`, `../../infra/`) en fix die.

## Redirects

Genereer een `redirects.csv` bestand met alle oude → nieuwe URL-mappings.
Formaat:

```csv
from,to
/kennisbank/apis/,/kennisbank/api-ontwikkeling/
/kennisbank/infra/,/kennisbank/devops/
/kennisbank/programmeertalen/,/kennisbank/api-ontwikkeling/
```

Voeg alle individuele pagina-redirects toe voor verplaatste bestanden.

## Verificatie

```bash
pnpm run build
```

De build moet slagen. Let specifiek op:

- `onBrokenLinks: "throw"` — elke kapotte link breekt de build
- Controleer steekproefsgewijs of oude URL's correct redirecten
