# Prompt: Content Type Frontmatter controleren en toevoegen

> **Herbruikbaar:** ja — kan periodiek gedraaid worden als kwaliteitscheck
> **Commit:** nee — voer alleen wijzigingen door, commit niet

## Doel

Elk document in `docs/` moet een `content_type` veld in de frontmatter hebben.
Dit veld wordt NIET als tag gebruikt, maar als apart frontmatter veld. Het wordt
gebruikt door de `plugins/content-type-index.js` plugin om cross-cutting
overzichtspagina's te genereren (alle standaarden, alle tools, etc.).

## Content Types

Er zijn 5 content types:

| Content Type   | Gebruik voor                                        |
| -------------- | --------------------------------------------------- |
| `standaard`    | Specificaties, protocollen, formaten, voorzieningen |
| `tool`         | Software, validators, editors, linters              |
| `tutorial`     | Stapsgewijze handleidingen                          |
| `architectuur` | Patronen, concepten, ontwerpbeslissingen            |
| `richtlijn`    | Leidraad content (principes en richtlijnen)         |

## Toewijzingsregels

Gebruik het **pad** van het bestand om het juiste content type te bepalen:

| Pad bevat              | Content Type   | Voorbeelden                                           |
| ---------------------- | -------------- | ----------------------------------------------------- |
| `leidraad/`            | `richtlijn`    | `docs/leidraad/security/richtlijn-*.md`               |
| `tools/`               | `tool`         | `docs/api-ontwikkeling/tools/wuppiefuzz.md`           |
| `tutorials/`           | `tutorial`     | `docs/api-ontwikkeling/tutorials/bouw-een-api/`       |
| `standaarden/`         | `standaard`    | `docs/api-ontwikkeling/standaarden/api-design-rules/` |
| `architectuur/`        | `architectuur` | `docs/api-ontwikkeling/architectuur/eda.md`           |
| `authenticatie/`       | `standaard`    | `docs/security/authenticatie/oauth.md`                |
| `wetgeving-en-beleid/` | `standaard`    | `docs/security/wetgeving-en-beleid/nis2.mdx`          |

### Uitzonderingen

- **Index-bestanden** (`index.md`, `index.mdx`): deze krijgen GEEN content_type,
  tenzij ze zelf inhoudelijk content bevatten (niet alleen een lijstje met
  links)
- **Bestanden direct in een hoofdcategorie** (bv. `docs/data/json-yaml.md`):
  bepaal het type op basis van de inhoud. Meestal `standaard` of `architectuur`.
- **Linked data bestanden** (`docs/data/linked-data/*.md`): zijn `standaard`
- **NL Design System** (`docs/front-end/nl-design-system/`): de index is geen
  content_type, de sub-pagina's zijn `tutorial` of `standaard` afhankelijk van
  inhoud
- **Formatting/linting** (`docs/front-end/formatting-linting.mdx`): is
  `tutorial`

## Frontmatter formaat

```yaml
---
content_type: standaard
tags:
  - informatiebeveiliging
  - oauth
---
```

Het `content_type` veld staat los van de `tags` array. Content types mogen NOOIT
als tag voorkomen.

## Stappen

1. Zoek alle `.md` en `.mdx` bestanden in `docs/` (exclusief de
   `docs/api-ontwikkeling/kennisbank-herstructurering/` map als die bestaat —
   dat is tijdelijke documentatie)
2. Lees per bestand de frontmatter
3. Controleer of `content_type` aanwezig is
4. Als het ontbreekt: bepaal het juiste type op basis van de padregels hierboven
   en voeg het toe
5. Als het al aanwezig is: controleer of het klopt met de padregels. Corrigeer
   als het niet klopt.
6. Rapporteer bestanden die je niet automatisch kunt toewijzen (bv. bestanden
   buiten de bekende paden)

## Verificatie

Draai na alle wijzigingen:

```bash
pnpm run build
```

De build moet slagen zonder fouten. Als er fouten zijn, fix ze.
