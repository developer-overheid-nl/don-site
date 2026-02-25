# Prompt: Content type sjablonen toepassen

> **Herbruikbaar:** ja — periodiek, bij nieuwe content of om bestaande te controleren
> **Commit:** nee — voer alleen wijzigingen door, commit niet
> **Afhankelijkheden:** prompt 1 (content_type frontmatter moet al toegekend zijn)

## Doel

Controleer alle artikelen in `docs/` die een `content_type` frontmatter hebben en
breng hun sectie-structuur (H2-koppen) in lijn met het bijbehorende sjabloon.
Bestaande inhoud wordt NOOIT verwijderd — alleen herordend, hernoemd of aangevuld.

## Sjablonen per content type

### Standaard

```markdown
## Hoe werkt het

Uitleg van het mechanisme, protocol of formaat.

## Toepassing in Nederland

Hoe wordt deze standaard toegepast binnen de Nederlandse overheid?

## Wanneer gebruik je dit

In welke situaties kies je voor deze standaard? Wanneer juist niet?

## Gerelateerde standaarden

Verwijzingen naar aanverwante standaarden of specificaties.

## Bronnen

Links naar specificaties, documentatie en relevante artikelen.
```

### Tool

```markdown
## Kenmerken

Belangrijkste eigenschappen en mogelijkheden van de tool.

## Hoe werkt het

Uitleg van de werking, architectuur of aanpak.

## Aan de slag

Korte instructies om te beginnen: installatie, configuratie, eerste gebruik.

## Waarom deze tool

Voordelen en onderscheidende kenmerken ten opzichte van alternatieven.

## Alternatieven

Andere tools die vergelijkbaar zijn, met korte toelichting.

## Bronnen

Links naar documentatie, repository en relevante artikelen.
```

### Tutorial (single-page)

```markdown
## Wat je gaat maken

Beschrijving van het eindresultaat.

## Vereisten

Wat heb je nodig voordat je begint? (software, kennis, accounts)

## Stappen

De stapsgewijze instructies. Gebruik H3-koppen (###) per stap.

## Resultaat

Wat heb je bereikt? Hoe controleer je dat het werkt?

## Bronnen

Links naar documentatie en verdiepende informatie.
```

### Tutorial (multi-page)

Multi-page tutorials bestaan uit een `index.md` en genummerde stap-bestanden.

**index.md:**

```markdown
## Wat je gaat maken

Beschrijving van het eindresultaat.

## Vereisten

Wat heb je nodig voordat je begint?

## Stappen

Overzicht van de stappen met links naar de deelpagina's.

## Bronnen

Links naar documentatie en verdiepende informatie.
```

**Stap-bestanden** (`1-eerste-stap.md`, `2-tweede-stap.md`, etc.):

```markdown
## Doel

Wat bereik je in deze stap?

## Instructies

De eigenlijke instructies. Gebruik H3-koppen (###) voor substappen.

## Resultaat

Wat heb je na deze stap? Hoe controleer je het?
```

Stap-bestanden bevatten navigatie-links onderaan:

```markdown
---

Vorige: [Stap N-1](./N-1-vorige-stap.md) | Volgende: [Stap N+1](./N+1-volgende-stap.md)
```

### Architectuur

```markdown
## Het probleem

Welk probleem lost dit patroon of concept op?

## De oplossing

Hoe werkt de oplossing op hoofdlijnen?

## Kernconcepten

De belangrijkste concepten en hun samenhang. Gebruik H3-koppen (###) per concept.

## Wanneer gebruik je dit

In welke situaties pas je dit patroon toe? Wanneer juist niet?

## Best practices

Concrete aanbevelingen voor implementatie.

## Gerelateerde patronen

Verwijzingen naar aanverwante architectuurpatronen of concepten.

## Bronnen

Links naar specificaties, documentatie en relevante artikelen.
```

### Richtlijn

Richtlijnen volgen het bestaande sjabloon in `docs/leidraad/richtlijnsjabloon-v1.md`.
Pas dit sjabloon NIET toe op bestanden in `docs/leidraad/` — die hebben hun eigen
structuur. Sla ze over.

## Regels voor herschrijven

1. **Voeg ontbrekende secties toe** met placeholder-tekst:
   ```markdown
   ## Bronnen

   <!-- TODO: vul aan -->
   ```

2. **Hernoem bestaande secties** die qua inhoud overeenkomen maar een andere kop
   hebben. Veelvoorkomende hernoemingen:

   | Huidige kop              | Wordt                    |
   | ------------------------ | ------------------------ |
   | Meer informatie          | Bronnen                  |
   | Referenties              | Bronnen                  |
   | Links                    | Bronnen                  |
   | Zie ook                  | Gerelateerde standaarden |
   | Gerelateerd              | Gerelateerde standaarden |
   | Gebruik                  | Wanneer gebruik je dit   |
   | Wanneer toepassen        | Wanneer gebruik je dit   |
   | Aan de slag / Quickstart | Aan de slag              |
   | Installatie              | Aan de slag              |
   | Introductie              | Hoe werkt het            |
   | Wat is ...               | Hoe werkt het            |
   | Vergelijking             | Alternatieven            |
   | Voordelen                | Waarom deze tool         |
   | Voorwaarden              | Vereisten                |
   | Prerequisites            | Vereisten                |

3. **Herorden secties** volgens de sjabloonvolgorde.

4. **Behoud alle bestaande inhoud** — verplaats tekst mee bij hernoeming of
   herordening, maar verwijder niets.

5. **Verwijder geen extra secties** — als een artikel secties heeft die niet in
   het sjabloon staan, laat ze staan aan het einde (voor de Bronnen-sectie).

## Stappen

1. Zoek alle `.md` en `.mdx` bestanden in `docs/` die een `content_type`
   frontmatter hebben
2. Sla over:
   - Index-bestanden (`index.md`, `index.mdx`)
   - Bestanden zonder `content_type`
   - Bestanden in `docs/leidraad/` (die volgen hun eigen sjabloon)
3. Lees per bestand de huidige H2-koppen (`## ...`)
4. Vergelijk met het sjabloon voor dat `content_type`
5. Als het bestand afwijkt:
   - Hernoem secties die overeenkomen (zie tabel hierboven)
   - Herorden secties volgens de sjabloonvolgorde
   - Voeg ontbrekende secties toe met `<!-- TODO: vul aan -->`
   - Laat extra secties staan voor de Bronnen-sectie
6. Rapporteer een samenvatting:
   - Welke bestanden zijn aangepast en wat is gewijzigd
   - Welke bestanden waren al correct
   - Welke bestanden zijn overgeslagen en waarom

## Verificatie

```bash
pnpm run build
```

De build moet slagen zonder fouten. Als er fouten zijn, fix ze.
