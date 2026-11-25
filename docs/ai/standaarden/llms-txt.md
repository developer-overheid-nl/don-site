---
content_type: standaard
tags: [ai, llms-txt]
title: "llms.txt"
description: "Een bestand in de root van je site dat taalmodellen de weg wijst naar de inhoud die ertoe doet."
---

# llms.txt

`llms.txt` is een markdownbestand in de root van een website dat taalmodellen
vertelt welke inhoud er is en waar die staat. Het is een voorstel van
[llmstxt.org](https://llmstxt.org) en geen vastgestelde standaard, maar het
wordt inmiddels breed toegepast in technische documentatie.

Het idee lijkt op `robots.txt` en `sitemap.xml`, met een ander doel.
`robots.txt` zegt wat een crawler niet mag; `llms.txt` zegt wat de moeite waard
is en waar de schone versie staat.

## Het probleem dat het oplost

Een HTML-pagina bevat navigatie, koppen, scripts en opmaak. Voor een lezer is
dat prettig; voor een taalmodel is het ruis die contextvenster kost. Een model
dat een pagina van jouw site verwerkt, leest liever de markdown waaruit die
pagina is gemaakt.

`llms.txt` is de wegwijzer naar die schone versie.

## Het formaat

Gewone markdown, met een vaste structuur:

```markdown
# Naam van de site

> Eén zin die zegt wat dit is.

Eventueel wat aanvullende toelichting, bijvoorbeeld over hoe de bronbestanden
te bereiken zijn.

## Onderwerp

- [Titel van een pagina](https://example.org/pagina.md): korte omschrijving
- [Nog een pagina](https://example.org/andere.md): korte omschrijving

## Optional

- [Minder belangrijke pagina](https://example.org/extra.md)
```

De sectie `Optional` heeft een bijzondere betekenis: wat daar staat mag worden
overgeslagen als de ruimte beperkt is. De rest is de kern.

Naast `llms.txt` bestaat de conventie `llms-full.txt`, waarin de volledige tekst
van de site in één bestand staat. Dat is een kopie, met het bijbehorende risico
dat hij verouderd raakt.

## Hoe je het maakt

Genereer het bestand bij de build in plaats van het met de hand bij te houden.
Een index die je handmatig onderhoudt, loopt achter zodra iemand vergeet hem bij
te werken, en dan wijs je modellen naar pagina's die niet meer bestaan.

Praktische aanpak:

1. Zorg dat de markdown-bron van elke pagina bereikbaar is, bijvoorbeeld op
   dezelfde URL met `.md` erachter
2. Loop bij de build je content door en schrijf per pagina een regel met titel,
   URL en omschrijving
3. Groepeer op de indeling die je site zelf gebruikt
4. Verwijs naar de markdown-bron, niet naar de HTML-pagina

Op deze site werkt het zo: elk artikel is ook bereikbaar met `.md` achter de
URL, en `/llms.txt` verwijst daarnaar.

## Waarom dit past bij open overheid

Overheidsinformatie hoort vindbaar en herbruikbaar te zijn. Dat gold al voor
mensen en zoekmachines; taalmodellen zijn een nieuwe categorie afnemers die je
met weinig moeite goed kunt bedienen.

Er is ook een inhoudelijk argument. Als jouw uitleg van een standaard slecht
vindbaar is, vult een model het gat met wat het elders heeft gelezen. Een
duidelijke index vergroot de kans dat er uit de juiste bron wordt geput.

## Meer weten

- [llmstxt.org](https://llmstxt.org): het voorstel en de specificatie
