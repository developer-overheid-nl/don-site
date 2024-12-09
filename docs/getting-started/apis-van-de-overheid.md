---
tags:
  - 'api'
title: 'Gebruik API\'s van de overheid'
---

Overheidsorganisaties ontwikkelen veel [API's](https://nl.wikipedia.org/wiki/Application_programming_interface) om allerlei data snel en efficient te delen met andere overheidsorganisaties en andere partijen die met de overheid werken. In deze post leer je hoe je zelf deze API's kan gebruiken.

## Proces

### 1. Vind een API met de data die je nodig hebt

Voor dat je een API gaat zoeken, bepaal eerst welk probleem je probeert op te lossen en hoe bepaalde overheids data hier mee kan helpen. Vind dan een API die de gegevens levert die je nodig hebt. In ons [API register](https://developer.overheid.nl/apis) vind je een hoop API's van de overheid. Heb je een API gevonden, klik dan op de API specificatie om precies te zien wat deze API allemaal kan leveren.

### 2. Krijg toegang tot de API

Op een API detailpagina kan je zien hoe je toegang kan krijgen:

1. Kijk eerst naar `Gebruik`: als niet iedereen de API kan gebruiken dan moet je contact opnemen met de organisatie om toestemming te vragen.
2. Als de API `Kosten` heeft, moet je kosten betalen om de API te gebruiken. Bij de `Documentatie` van de API vind je hier meer informatie over.
3. Als de API `Authenticatie` vereist, moet je eerst een aanvraag maken voor een API authenticatie token die jou toegang geeft tot de API. Deze informatie kan je ook vinden bij de API `Documentatie`.

### 3. Gebruik de API

Nu kan je de API gaan gebruiken!

1. Op de API pagina vind je de URL van de verschillende omgevingen van de API. Gebruik de URL van de productie omgeving, omdat dat de meest betrouwbare is. Probeer vanaf je code een request te maken naar deze URL en check of de API werkt. De API werkt als je een HTTP response krijgt met een [HTTP 200 OK  status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200).
2. Lees de `Specificatie` om te leren hoe je de data kan krijgen die je nodig hebt. 
3. Maak requests als bescheven in de specificatie om de data te gebruiken in je applicatie.

## Voorbeeld

Voor een voorbeeld, zie de API pagina van [CBS Cijfers Open Data](https://developer.overheid.nl/apis/cbs-cijfers), en zie [Codevoorbeelden van het gebruik van CBS Open Data v4 in R en Python.](https://github.com/statistiekcbs/CBS-Open-Data-v4).

## Feedback

Je kan op elke API feedback geven! Om feedback te geven op een API klik je op `Naar community topic` op de detailpagina van de API.