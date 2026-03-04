# Prompt: Homepage tiles herschrijven

> **Herbruikbaar:** nee — eenmalig
> **Commit:** nee — voer alleen wijzigingen door, commit niet
> **Afhankelijkheden:** prompt 2 (mappenstructuur) en prompt 4 (cross-cutting pagina's)

## Doel

Herschrijf `src/components/TilesGrid/homepage-tiles.tsx` zodat de homepage de nieuwe kennisbank-structuur weerspiegelt. Alle tiles (behalve de eerste 3) gebruiken link-lists naar onderliggende artikelen. Geen enkele link mag dubbel voorkomen over alle tiles heen.

## Tile-indeling

De tiles worden in deze volgorde getoond:

### Rij 1: Uitgelicht (3 tiles, met tekst)

| Tile                          | Icoon                            | Beschrijving                                                                                                                                          | Link                           | Extra                                 |
| ----------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------- |
| Leidraad softwareontwikkeling | `IconKlembordMetVinkjesEnLijnen` | Starten met een IT project voor de overheid? Deze lijst met principes en voorbeelden is een eerste aanzet tot overheidsbreed beleid voor development. | `/kennisbank/leidraad/`        |                                       |
| Techradar                     | `IconNetwerk`                    | Bekijk onze techradar voor inzicht in de technologieen, tools en concepten die we verkennen, gebruiken of bewust vermijden.                           | *(Thoughtworks radar URL)*     | `highlight: "beta"`, `external: true` |
| Implementatieondersteuning    | `IconManMetLaptop`               | Heb je hulp nodig bij het ontwikkelen of aanbieden van API's? Ons implementatieondersteuningsteam staat voor je klaar!                                | `/implementatie-ondersteuning` | `highlight: "uitgelicht"`             |

### Rij 2: Cross-cutting ingangen (3 tiles, met link-lists)

Links in deze tiles mogen NIET voorkomen in de thema-tiles eronder.

**Tutorials** (`Icon3BoekenAchterElkaar`, link: `/kennisbank/tutorials`)

- Bouw een API → `/kennisbank/api-ontwikkeling/tutorials/bouw-een-api`
- Aan de slag met NL Design System → `/kennisbank/front-end/nl-design-system/aan-de-slag-met-nl-design-system`
- Project Checklist → `/kennisbank/open-source/tutorials/os-checklist`
- Licenties kiezen → `/kennisbank/open-source/tutorials/open-source-software-licenties`
- Git workflow → `/kennisbank/open-source/tutorials/git-in-een-open-source-project`
- publiccode.yml toevoegen → `/kennisbank/open-source/tutorials/voeg-een-publiccode-yml-bestand-toe`
- Repo docs generator → `/kennisbank/open-source/tutorials/tutorial-repo-docs-generator`

**Standaarden** (`IconDocumentMetGolvendeLijnenEnLint`, link: `/kennisbank/standaarden`)

- ADR Cheat Sheet → `/kennisbank/api-ontwikkeling/standaarden/api-design-rules/cheat-sheet`
- PKIoverheid → `/kennisbank/security/authenticatie/pkioverheid`
- NIS1 → `/kennisbank/security/wetgeving-en-beleid/nis1`
- EUDI Wallet → `/kennisbank/security/wetgeving-en-beleid/eudi-wallet`
- Haven+ → `/kennisbank/devops/standaarden/haven/haven-plus`
- CODE_OF_CONDUCT.md → `/kennisbank/open-source/standaarden/code-of-conduct-md`
- PROJECT_GOVERNANCE.md → `/kennisbank/open-source/standaarden/project-governance-md`
- security.txt → `/kennisbank/security/standaarden/security-txt`

**Tools** (`IconIct`, link: `/kennisbank/tools`)

- ADR Linter → `/kennisbank/api-ontwikkeling/tools/api-design-rules-linter`
- ADR Validator → `/kennisbank/api-ontwikkeling/tools/api-design-rules-validator`
- OAS Generator → `/kennisbank/api-ontwikkeling/tools/openapi-specification-generator`
- publiccode.yml editor → `/kennisbank/open-source/tools/publiccode-yml-editor`
- publiccode.yml parser → `/kennisbank/open-source/tools/publiccode-yml-parser`

### Rij 3-4: Themacategorieen (6 tiles, met link-lists, ~3 regels per tile)

**API Ontwikkeling** (`IconApiInrichting`, link: `/kennisbank/api-ontwikkeling/`)

- API Design Rules → `/kennisbank/api-ontwikkeling/standaarden/api-design-rules`
- OpenAPI Specification → `/kennisbank/api-ontwikkeling/standaarden/openapi-specification`
- CloudEvents → `/kennisbank/api-ontwikkeling/standaarden/cloudevents`
- Event Driven Architecture → `/kennisbank/api-ontwikkeling/architectuur/eda`
- Webhooks → `/kennisbank/api-ontwikkeling/architectuur/webhooks`
- Problem Details → `/kennisbank/api-ontwikkeling/architectuur/problem-details`
- Optimistic Locking → `/kennisbank/api-ontwikkeling/architectuur/gelijktijdigheid-met-optimistic-locking`
- Idempotency → `/kennisbank/api-ontwikkeling/architectuur/retries-met-volledige-idempotency`
- WuppieFuzz → `/kennisbank/api-ontwikkeling/tools/wuppiefuzz`

**Front-end** (`IconComputer`, link: `/kennisbank/front-end/`)

- DigiToegankelijk (WCAG) → `/kennisbank/front-end/standaarden/digitoegankelijk`
- NL Design System → `/kennisbank/front-end/nl-design-system`
- Formatting & Linting → `/kennisbank/front-end/formatting-linting`
- Maps Amsterdam → `/kennisbank/front-end/maps-developers-amsterdam`
- Gemeente Iconen → `/kennisbank/front-end/tools/gemeente-iconen`
- Axe checker → `/kennisbank/front-end/tools/run-axe`

**Data & Interoperabiliteit** (`IconKetting2Schakels`, link: `/kennisbank/data/`)

- Logboek Dataverwerkingen → `/kennisbank/data/standaarden/logboek-dataverwerkingen`
- RDF → `/kennisbank/data/linked-data/rdf`
- DCAT → `/kennisbank/data/linked-data/dcat`
- SHACL → `/kennisbank/data/linked-data/shacl`
- SKOS → `/kennisbank/data/linked-data/skos`
- OWL → `/kennisbank/data/linked-data/owl`
- JSON / YAML → `/kennisbank/data/json-yaml`

**Security** (`IconCybersecurity`, link: `/kennisbank/security/`)

- OAuth 2.0 → `/kennisbank/security/authenticatie/oauth`
- OpenID Connect → `/kennisbank/security/authenticatie/oidc`
- DigiD → `/kennisbank/security/authenticatie/digid`
- eHerkenning → `/kennisbank/security/authenticatie/eherkenning`
- SAML → `/kennisbank/security/authenticatie/saml`
- NIS2 → `/kennisbank/security/wetgeving-en-beleid/nis2`
- eIDAS → `/kennisbank/security/wetgeving-en-beleid/eidas`
- BIO → `/kennisbank/security/wetgeving-en-beleid/bio`
- OpenKAT → `/kennisbank/security/tools/openkat`

**DevOps & Platform** (`IconDoosMetPijlenOpZijkantZijaanzicht`, link: `/kennisbank/devops/`)

- Haven → `/kennisbank/devops/standaarden/haven`
- FSC → `/kennisbank/devops/standaarden/fsc`
- Haven Compliancy Checker → `/kennisbank/devops/tools/haven-compliancy-checker`
- Quality-time → `/kennisbank/devops/tools/quality-time`
- FSC Policy Builder → `/kennisbank/devops/tools/fsc-policy-builder`

**Open Source** (`IconComputercode`, link: `/kennisbank/open-source/`)

- publiccode.yml → `/kennisbank/open-source/standaarden/publiccode-yml`
- Standaard voor Publieke Code → `/kennisbank/open-source/standaarden/standaard-voor-publieke-code`
- README.md → `/kennisbank/open-source/standaarden/readme-md`
- CONTRIBUTING.md → `/kennisbank/open-source/standaarden/contributing-md`
- SECURITY.md → `/kennisbank/open-source/standaarden/security`

## Techradar URL

```
https://radar.thoughtworks.com/?documentId=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1mOX2791I5RL688muHsL7LDGqhRoKqUo5Vj3QrjMZXe8%2Fedit%3Fusp%3Dsharing
```

## Bekende issues

### clipPath-conflict in `IconKetting2Schakels`

Het SVG-icoon `src/theme/icons/IconKetting2Schakels.tsx` bevat `clipPath` elementen met generieke id's (`clippath`, `clippath-1`) die conflicteren met andere iconen op dezelfde pagina. Hierdoor wordt het icoon onzichtbaar.

**Fix:** hernoemd de id's naar unieke waarden (`ketting2-cp`, `ketting2-cp-1`) en pas de `url(#...)` referenties in hetzelfde bestand aan.

## Icon imports

Alle iconen worden geimporteerd vanuit `@site/src/theme/icons/`:

```typescript
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
```

## GridTile type

Het `GridTile` type wordt geimporteerd uit de `TilesGrid` component:

```typescript
import { GridTile } from ".";
```

De `description` property accepteert:

- `string` — voor gewone tekst
- `{link: string, label: string, external?: boolean}[]` — voor een link-list (links gescheiden door komma's, afgesloten met `…`)

## Stappen

1. Lees het huidige `src/components/TilesGrid/homepage-tiles.tsx`
2. Lees het `GridTile` type uit `src/components/TilesGrid/index.tsx`
3. Fix het clipPath-conflict in `src/theme/icons/IconKetting2Schakels.tsx`
4. Herschrijf `homepage-tiles.tsx` volgens de specificatie hierboven
5. Zorg dat alle links kloppen met de nieuwe mappenstructuur
6. Zorg dat geen enkele link dubbel voorkomt

## Verificatie

```bash
pnpm run build
```

Controleer visueel (als mogelijk):

- Rij 1: Leidraad (tekst), Techradar (tekst, beta badge), Implementatieondersteuning (tekst, uitgelicht badge)
- Rij 2: Tutorials (link-list), Standaarden (link-list), Tools (link-list)
- Rij 3-4: 6 themacategorieen met link-lists (~3 regels per card)
- Geen dubbele links
- Geen Communities of Doe mee tiles
- Data & Interoperabiliteit icoon (ketting) is zichtbaar
