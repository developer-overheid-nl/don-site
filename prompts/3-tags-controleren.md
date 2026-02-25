# Prompt: Tags controleren en fixen

> **Herbruikbaar:** ja — kan periodiek gedraaid worden als kwaliteitscheck
> **Commit:** nee — voer alleen wijzigingen door, commit niet

## Doel

Controleer en fix de tags in alle docs, blogposts en communities. Zorg dat ze voldoen aan de 4-laagse tagging strategie.

## Tagging Strategie (4 lagen)

### Laag 1: Content Type (GEEN tag)

Content type is een apart frontmatter veld (`content_type`), NIET een tag. De volgende waarden mogen NOOIT als tag voorkomen:

- `standaard`
- `tool`
- `tutorial`
- `architectuur`
- `richtlijn`

### Laag 2: Thema Tags (verplicht, 1-3 per artikel)

Brede thematische tags. Elk artikel moet **minimaal 1, maximaal 3** thema-tags hebben.

| Tag                      | Beschrijving                               | Voorbeelden                            |
| ------------------------ | ------------------------------------------ | -------------------------------------- |
| `informatiebeveiliging`  | Security, authenticatie, encryptie         | OAuth, DigiD, OpenKAT                  |
| `interoperabiliteit`     | Data-uitwisseling, API's, standaarden      | API Design Rules, DCAT, FSC            |
| `toegankelijkheid`       | WCAG, inclusiviteit, UX                    | DigiToegankelijk, NL Design System     |
| `privacy`                | AVG, gegevensbescherming, logging          | Logboek Dataverwerkingen, BSN          |
| `infrastructuur`         | Kubernetes, deployment, cloud              | Haven, Quality-time                    |
| `front-end`              | UI, design systems, libraries              | NL Design System, React               |
| `open-source`            | Licenties, community, governance           | Publiccode.yml, CONTRIBUTING.md        |

### Laag 3: Onderwerp Tags (optioneel, 0-5 per artikel)

Specifieke technologieen, standaarden of concepten. Voorbeelden:
- Protocollen: `oauth`, `oidc`, `saml`, `mtls`
- Formaten: `json`, `yaml`, `rdf`, `dcat`
- Technologieen: `kubernetes`, `docker`, `react`, `rust`
- Standaarden: `adr`, `oas`, `wcag`, `haven`
- Tools: `wuppiefuzz`, `openkat`, `axe`

### Laag 4: Organisatie Tags (optioneel)

- `forum-standaardisatie`
- `kennisplatform-apis`
- `vng`
- `common-ground`

## Verboden tags

De volgende tags zijn verwijderd of hernoemd en mogen NIET meer voorkomen:

| Verboden tag         | Vervanging              | Reden                          |
| -------------------- | ----------------------- | ------------------------------ |
| `security`           | `informatiebeveiliging` | Afstemming Forum Standaardisatie |
| `api-design`         | `interoperabiliteit`    | Te specifiek als thema-tag     |
| `accessibility`      | `toegankelijkheid`      | Nederlandse naamgeving         |
| `infra`              | `infrastructuur`        | Voluit geschreven              |
| `interoperability`   | `interoperabiliteit`    | Nederlandse naamgeving         |
| `security-by-design` | `informatiebeveiliging` | Samengevoegd                   |
| `tutorial`           | *(verwijderen)*         | Is een content type            |
| `tool`               | *(verwijderen)*         | Is een content type            |
| `architectuur`       | *(verwijderen)*         | Is een content type            |

## Regels samengevat

1. **Minimaal 1 thema-tag** (laag 2) per artikel
2. **Maximaal 3 thema-tags** per artikel
3. **Maximaal 8 tags totaal** per artikel
4. **Geen content types als tag** (`tutorial`, `tool`, `architectuur`, `standaard`, `richtlijn`)
5. **Geen verboden/hernoemde tags** (zie tabel hierboven)
6. **Alle tags moeten bestaan in `tags.yml`** — Docusaurus geeft een fout bij onbekende tags (`onInlineTags: "throw"`)

## Stappen

### Stap 1: Controleer `tags.yml`

Lees `tags.yml` en controleer:
- Geen verboden tags aanwezig (verwijder ze als ze er nog staan)
- Alle 7 thema-tags zijn gedefinieerd met beschrijving
- Verwijder tags die content types zijn (`tutorial`, `tool`, `architectuur`) als ze er staan

### Stap 2: Scan alle bestanden

Scan alle `.md` en `.mdx` bestanden in:
- `docs/`
- `blog/`
- `communities/`

### Stap 3: Fix verboden tags

Voor elk bestand met verboden tags:
- Vervang hernoemde tags volgens de tabel hierboven
- Verwijder tags die content types zijn (`tutorial`, `tool`, `architectuur`)
- Verwijder duplicaten die door hernoeming ontstaan

### Stap 4: Controleer thema-tags

Voor elk bestand zonder thema-tag, bepaal de juiste op basis van de categorie:

| Pad begint met      | Standaard thema-tag        |
| ------------------- | -------------------------- |
| `docs/api-ontwikkeling/` | `interoperabiliteit`  |
| `docs/front-end/`   | `front-end` of `toegankelijkheid` |
| `docs/data/`        | `interoperabiliteit`       |
| `docs/security/authenticatie/` | `informatiebeveiliging` |
| `docs/security/wetgeving-en-beleid/` | `informatiebeveiliging` + `wetgeving` |
| `docs/security/tools/` | `informatiebeveiliging` |
| `docs/devops/`      | `infrastructuur`           |
| `docs/open-source/` | `open-source`              |
| `docs/leidraad/`    | *(beoordeel per bestand)*  |

Voor blogposts en communities: beoordeel op basis van de inhoud.

### Stap 5: Rapporteer

Maak een lijst van bestanden die handmatige beoordeling nodig hebben:
- Bestanden zonder thema-tag die je niet automatisch kunt toewijzen
- Bestanden met meer dan 8 tags
- Bestanden met meer dan 3 thema-tags

## Verificatie

```bash
pnpm run build
```

De build moet slagen. Let specifiek op tag-gerelateerde fouten:
- `onInlineTags: "throw"` betekent dat elke tag in frontmatter moet bestaan in `tags.yml`
