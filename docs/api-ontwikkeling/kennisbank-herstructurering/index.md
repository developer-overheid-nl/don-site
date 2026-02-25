---
sidebar_position: 99
---

# Kennisbank Herstructurering

Dit is de planning voor de herstructurering van de kennisbank. Deze documenten zijn tijdelijk hier geplaatst voor de sprint demo.

## Documenten

| Document | Beschrijving |
|----------|--------------|
| [Structuur](./structuur.md) | Nieuwe hoofdcategorieën, subcategorieën en URL mapping |
| [Content Type Templates](./content-type-templates.md) | Sjablonen voor standaard, tool, tutorial, architectuur |
| [Tagging Strategie](./tagging.md) | Gelaagde tagging aanpak met thema's en onderwerpen |
| [Extra Functionaliteiten](./functionaliteiten.md) | Tech Radar koppeling, blog integratie, governance |
| [Voorbeelden](./voorbeelden/) | Ingevulde templates om te zien hoe het eruit ziet |

## Samenvatting

### Nieuwe Structuur (6 categorieën)

```
Kennisbank
├── API Ontwikkeling              (was: API's)
├── Front-end Ontwikkeling        (was: Front-end)
├── Data & Interoperabiliteit     (was: Data)
├── Security                      (was: Security, nu breder)
├── DevOps & Platform             (was: Infra)
├── Open Source                   (ongewijzigd)
└── NeRDS Leidraad               (ongewijzigd)
```

### Content Types (5)

| Type | Gebruik |
|------|---------|
| `standaard` | OAuth, DCAT, ADR |
| `tool` | WuppieFuzz, OpenKAT |
| `tutorial` | Bouw een API |
| `architectuur` | EDA, Webhooks |
| `richtlijn` | NeRDS principes |

### Tagging (4 lagen)

1. **Content Type** - verplicht frontmatter veld
2. **Thema Tags** - verplicht, 1-3 tags (informatiebeveiliging, interoperabiliteit, etc.)
3. **Onderwerp Tags** - optioneel, 0-5 tags (oauth, kubernetes, etc.)
4. **Organisatie Tags** - optioneel (forum-standaardisatie, vng, etc.)
