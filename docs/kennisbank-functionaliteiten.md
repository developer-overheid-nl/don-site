# Kennisbank - Extra Functionaliteiten

Dit document beschrijft aanvullende functionaliteiten voor de kennisbank.

---

## 1. Metadata Tags Systeem

### Doel
Cross-cutting groepering van content onafhankelijk van de mappenstructuur. Vergelijkbaar met trefwoorden op Forum Standaardisatie.

### Implementatie
Elk document krijgt tags in de frontmatter:

```yaml
---
title: "OAuth 2.0"
content_type: standaard
tags:
  - informatiebeveiliging
  - authenticatie
  - api
---
```

### Voorgestelde Tag Vocabulaire

| Categorie | Tags |
|-----------|------|
| **Thema's** | `informatiebeveiliging`, `interoperabiliteit`, `toegankelijkheid`, `privacy`, `duurzaamheid` |
| **Technologie** | `api`, `linked-data`, `kubernetes`, `front-end` |
| **Doelgroep** | `developer`, `architect`, `beheerder` |
| **Status** | `verplicht`, `aanbevolen`, `in-ontwikkeling` |

### Tag Pagina's
Docusaurus genereert automatisch pagina's per tag:
- `/kennisbank/tags/informatiebeveiliging`
- `/kennisbank/tags/api`

---

## 2. Koppeling met Tech Radar

### Principe: Data bij de Bron
- Kennisbankartikelen zijn de **bron van waarheid**
- Tech Radar entries **linken** naar kennisbankartikelen
- Geen duplicatie van content

### Implementatie
Tech Radar items krijgen een `kennisbank_url` veld:

```yaml
# In techradar data
- name: "Rust"
  ring: "Adopt"
  quadrant: "Languages & Frameworks"
  kennisbank_url: "/kennisbank/api-ontwikkeling/standaarden/rust"
```

### Programmeertalen
Hoewel "Programmeertalen" als hoofdcategorie is opgeheven, blijven talen vindbaar via:
1. De Tech Radar (primaire ingang voor talen/frameworks)
2. Kennisbankartikelen onder relevante categorieën (Rust bij API Ontwikkeling)
3. Tags (`rust`, `python`, `java`)

---

## 3. Referentie-implementaties bij Standaarden

### Structuur
Grote standaarden met implementaties krijgen een eigen map:

```
standaarden/
└── logboek-dataverwerkingen/
    ├── index.md                    (de standaard)
    ├── implementaties/
    │   ├── index.md
    │   ├── go.md
    │   └── jakarta.md
    └── voorbeelden/
        ├── index.md
        └── verhuizing.md
```

### Kleine Standaarden
Standaarden zonder implementaties zijn één bestand:
```
standaarden/
├── oauth.md
├── dcat.md
└── logboek-dataverwerkingen/      (map met subpagina's)
```

---

## 4. Lege Subcategorieën

### Aanpak
- Toon lege subcategorieën in de sidebar
- Lege pagina's krijgen een "Draag bij" call-to-action:

```markdown
# Tools

Er zijn nog geen tools in deze categorie.

**Wil je bijdragen?**
[Voeg een artikel toe](link-naar-contributing)
```

### Configuratie
Via `sidebars.ts` met `sidebarItemsGenerator`.

---

## 5. "Alle Artikelen" Overzicht

### URL
`/kennisbank/alles`

### Features
- Alfabetische sortering (standaard)
- Sortering op datum (laatst bijgewerkt)
- Filtering op:
  - Content type (standaard, tool, tutorial, etc.)
  - Hoofdcategorie
  - Tags
- Zoeken binnen resultaten

### Implementatie
Custom React component met `usePluginData` hook.

---

## 6. Blog Integratie

### Tags
Blogs gebruiken dezelfde `tags.yml` als kennisbankartikelen.

### Gerelateerde Content
Automatisch tonen van gerelateerde artikelen op basis van gedeelde tags:

```
┌─────────────────────────────┐
│ Blog: "OAuth 2.1 is er!"    │
├─────────────────────────────┤
│ Gerelateerde artikelen:     │
│ • OAuth 2.0 (standaard)     │
│ • OIDC (standaard)          │
│ • DigiD (standaard)         │
└─────────────────────────────┘
```

### Implementatie
Component die artikelen filtert op overlappende tags.

---

## 7. Wetgeving en Beleid Structuur

### Aanpassing
"EU Wetgeving" wordt "Wetgeving en Beleid" met subgroepen:

```
security/
└── wetgeving-en-beleid/
    ├── index.md
    ├── eu/
    │   ├── eidas.md
    │   ├── nis2.md
    │   └── eudi-wallet.md
    └── nl/
        ├── bio.md
        └── wet-digitale-overheid.md
```

---

## 8. Toekomstige Verbeteringen

### Content Governance (AI-assisted)

| Functie | Beschrijving | Prioriteit |
|---------|--------------|------------|
| Link checker | Detecteer broken links in CI/CD | Hoog |
| Stale content alert | Artikelen niet bijgewerkt in >1 jaar | Midden |
| Consistentie linter | Check woordgebruik en terminologie | Laag |
| Auto-linking suggesties | Suggereer interne links bij schrijven | Laag |

### Eerste Stappen (zonder AI)
1. `last_updated` frontmatter veld toevoegen
2. Markdownlint in CI/CD
3. Link checker in CI/CD
4. Scheduled review reminders

---

## Implementatie Volgorde

| Fase | Functionaliteit | Inspanning |
|------|-----------------|------------|
| 1 | Structuur + content_type frontmatter | Groot |
| 2 | Cross-cutting pagina's (Alle Standaarden, etc.) | Middel |
| 3 | "Alle Artikelen" overzicht | Middel |
| 4 | Tag vocabulaire + tag pagina's | Klein |
| 5 | Blog integratie (gerelateerde content) | Klein |
| 6 | Tech Radar koppeling | Klein |
| 7 | Lege subcategorieën met CTA | Klein |
| 8 | Content governance tooling | Doorlopend |
