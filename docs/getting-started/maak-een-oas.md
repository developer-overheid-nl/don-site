---
tags:
  - 'api'
  - 'open-api-specification'
title: 'Maak een OpenAPI specificatie'
---


Een OpenAPI Specificatie (OAS) is een [YAML](https://yaml.org/spec/) of [JSON](https://www.forumstandaardisatie.nl/open-standaarden/json) bestand met de eigenschappen van de data die een REST API als input accepteert en als output teruggeeft. Een OpenAPI Specificatie beschrijft niet hoe een API geïmplementeerd is, en heeft dus geen binding met specifieke programmeertalen.

## Waarom  een OpenAPI specificatie maken

Een OpenAPI Specificatie is nuttig voor ontwikkelaars en gebruikers van een API:

- Voor ontwikkelaars versnelt de OpenAPI Specificatie het ontwikkelproces: de OpenAPI Specificatie kan een API worden ontworpen voordat deze wordt geprogrammeerd, kunnen niet-developers bijdragen aan het ontwerp van een API, en biedt developers duidelijke eisen voor het programmeren van een API. 
- Voor gebruikers dient de OpenAPI Specificatie als documentatie, en een complete en duidelijke documentatie is belangrijk voor het succesvol en eenvoudig gebruik van een API. En omdat de OpenAPI Specificatie gebruikt wordt voor zowel het programmeren als het gebruik van een API, garandeer je dat de API precies werkt als beschreven in de documentatie.

## Hoe maak je een OpenAPI Specificatie

[quote="aziz.errafay.fin, post:1, topic:173, category:8"]
Ik loop bij het implementeren van die API Design rules tegen het volgende aan :
Onze API wordt via Azure Api Management ( APIM ) ontsloten.
APIM ondersteunt alleen de gangbare HTTP Verbs :
GET,POST,PUT,DELETE,HEAD,OPTIONS,PATCH,TRACE
[/quote]

### Vervolg
Genereer clients en documentatie met tools als: https://openapi-generator.tech/

> work in progress