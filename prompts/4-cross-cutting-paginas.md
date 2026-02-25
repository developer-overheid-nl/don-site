# Prompt: Cross-cutting overzichtspagina's bouwen

> **Herbruikbaar:** nee — eenmalig **Commit:** nee — voer alleen wijzigingen
> door, commit niet **Afhankelijkheden:** prompt 1 (content_type frontmatter) en
> prompt 2 (mappenstructuur)

## Doel

Bouw een systeem waarmee bezoekers alle standaarden, tools of tutorials over de
hele kennisbank heen kunnen bekijken, ongeacht in welke categorie ze staan. Dit
vereist:

1. Een Docusaurus plugin die een index bouwt van alle docs met `content_type`
   frontmatter
2. Een React component dat deze index toont met filters en zoekfunctie
3. Vier overzichtspagina's: standaarden, tools, tutorials, alles

## Stap 1: Plugin — `plugins/content-type-index.js`

Maak een Docusaurus plugin die:

- Bij het laden alle `.md`/`.mdx` bestanden in `docs/` scant
- Per bestand de frontmatter leest (met gray-matter)
- Bestanden met een `content_type` veld indexeert
- De index beschikbaar maakt als global data via `contentData.setGlobalData()`

De plugin moet per bestand opslaan:

- `title` — uit frontmatter of eerste `# heading`
- `description` — uit frontmatter
- `contentType` — uit `content_type` frontmatter
- `tags` — uit frontmatter
- `category` — afgeleid van eerste map in het pad (bv. `api-ontwikkeling`,
  `security`)
- `url` — het Docusaurus-pad (met `/kennisbank/` prefix, numerieke prefixen
  gestript)

### Pad naar URL conversie

Docusaurus genereert URLs door:

- `.md`/`.mdx` extensie te verwijderen
- `index` bestanden te behandelen als de map zelf
- Numerieke prefixen in mapnamen te behouden (bv. `1-genereer-oas-boilerplate`
  blijft zo)

Maar let op: als een bestand een `slug` in de frontmatter heeft, gebruik die in
plaats daarvan.

Voeg de plugin toe aan `docusaurus.config.ts`:

```typescript
plugins: [
  "./plugins/content-type-index.js",
  // ... andere plugins
],
```

## Stap 2: Component — `src/components/ContentTypeOverview/`

Maak een React component `ContentTypeOverview` met:

### Props

- `contentType` (optioneel) — filter op een specifiek content type
- `showFilter` (optioneel, default false) — toon een dropdown om te filteren op
  content type

### Functionaliteit

- Haalt data op via `usePluginData("content-type-index")`
- Filtert op `contentType` als die prop is meegegeven
- Biedt een zoekbalk (zoekt op titel en beschrijving)
- Groepeert resultaten per categorie, alfabetisch gesorteerd (Nederlandse
  collation)
- Toont per item: titel (als link), beschrijving, content type badge, tags

### Categorie labels

| Category key       | Display label             |
| ------------------ | ------------------------- |
| `api-ontwikkeling` | API Ontwikkeling          |
| `front-end`        | Front-end                 |
| `data`             | Data & Interoperabiliteit |
| `security`         | Security                  |
| `devops`           | DevOps & Platform         |
| `open-source`      | Open Source               |
| `leidraad`         | Leidraad                  |

### Badge kleuren per content type

| Content type | Kleur/variant                 |
| ------------ | ----------------------------- |
| standaard    | blauw (`--ifm-color-primary`) |
| tool         | groen                         |
| tutorial     | oranje                        |
| architectuur | paars                         |
| richtlijn    | grijs                         |

Maak ook een `styles.module.css` met:

- Card grid layout (CSS Grid, `minmax(320px, 1fr)`)
- Badge styling per content type
- Zoekbalk styling

## Stap 3: Overzichtspagina's — `src/pages/kennisbank/`

Maak 4 pagina's:

### `src/pages/kennisbank/standaarden.tsx`

```tsx
import ContentTypeOverview from "@site/src/components/ContentTypeOverview";
import Layout from "@theme/Layout";

export default function Standaarden() {
  return (
    <Layout
      title="Alle Standaarden"
      description="Overzicht van alle standaarden in de kennisbank"
    >
      <main className="container margin-vert--lg">
        <h1>Alle Standaarden</h1>
        <p>Overzicht van alle standaarden, protocollen en specificaties.</p>
        <ContentTypeOverview contentType="standaard" />
      </main>
    </Layout>
  );
}
```

### `src/pages/kennisbank/tools.tsx`

Zelfde patroon, met `contentType="tool"`.

### `src/pages/kennisbank/tutorials.tsx`

Zelfde patroon, met `contentType="tutorial"`.

### `src/pages/kennisbank/alles.tsx`

Zelfde patroon, zonder `contentType` filter maar met `showFilter={true}`.

## Stap 4: Docs index aanpassen

Pas `docs/index.mdx` aan zodat het de `kennisbank` sidebar gebruikt:

```yaml
---
displayed_sidebar: kennisbank
---
```

Voeg een `<DocsOverview />` component toe of een `<DocCardList />` die de
hoofdcategorieen toont.

## Verificatie

```bash
pnpm run build
```

Controleer ook:

- Ga naar `/kennisbank/standaarden` — toont alle docs met
  `content_type: standaard`
- Ga naar `/kennisbank/tools` — toont alle docs met `content_type: tool`
- Ga naar `/kennisbank/tutorials` — toont alle docs met `content_type: tutorial`
- Ga naar `/kennisbank/alles` — toont alles met filter dropdown
- Zoekfunctie werkt op titel en beschrijving
- Resultaten zijn gegroepeerd per categorie
