---
tags:
  - "api"
  - "msa"
title: "Standaardisering door middel van een API referentie implementatie"
---

In dit artikel leer je hoe je zelf deze API's kan gebruiken.

## Een API zoeken en er mee praten

### 1. Vind een API met de data die je nodig hebt

Voordat je een API gaat zoeken, bepaal eerst welk probleem je probeert op te lossen en hoe bepaalde overheidsdata hier mee kan helpen. Vervolgens ga je opzoek naar een API die de gegevens levert die je nodig hebt. In ons [API register](https://developer.overheid.nl/apis) vind je een hoop API's van de overheid. Heb je een API gevonden, klik dan op de API specificatie om precies te zien wat deze API allemaal kan leveren.

### 2. Krijg toegang tot de API

Op een API detailpagina kan je zien hoe je toegang kunt krijgen:

1. Kijk eerst naar **Gebruik**: als niet iedereen de API kan gebruiken dan moet je contact opnemen met de organisatie om toestemming te vragen.
2. Als de API **Kosten** heeft, moet je kosten betalen om de API te gebruiken. Bij de **Documentatie** van de API vind je hier meer informatie over.
3. Als de API **Authenticatie** vereist, moet je eerst een aanvraag maken voor een API authenticatie token die jou toegang geeft tot de API. Deze informatie kan je ook vinden bij de API **Documentatie**.

### 3. Gebruik de API

Nu kan je de API gaan gebruiken!

1. Op de API pagina vind je de URL van de verschillende omgevingen van de API. Gebruik de URL van de productie omgeving, omdat dat de meest betrouwbare is. Probeer vanaf je code een request te maken naar deze URL en check of de API werkt. De API werkt als je een HTTP response krijgt met een [HTTP Status: 200 OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200).
2. Lees de **Specificatie** om te leren hoe je de data kan krijgen die je nodig hebt.
3. Maak requests als beschreven in de specificatie om de data te gebruiken in je applicatie.

## Voorbeeld

Voor een voorbeeld, zie de API pagina van [CBS Cijfers Open Data](https://developer.overheid.nl/apis/cbs-cijfers), en zie [codevoorbeelden van het gebruik van CBS Open Data v4 in R en Python](https://github.com/statistiekcbs/CBS-Open-Data-v4).

## Feedback

Je kan op elke API feedback geven! Om feedback te geven op een API klik je op `Naar community topic` op de detailpagina van de API.
