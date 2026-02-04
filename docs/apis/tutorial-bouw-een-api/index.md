---
sidebar_position: 1
---

# Tutorial: Bouw een API

In deze tutorial leren we stap voor stap een API te ontwerpen en bouwen die
voldoet aan de API Design Rules (ADR). We gebruiken een design-first aanpak:
eerst ontwerpen we de API-specificatie, daarna genereren we de code.

## Wat gaan we bouwen?

We bouwen een **Bier API** om bieren, brouwerijen en bierstijlen te beheren. We
kiezen bewust voor een fictief onderwerp om verwarring met echte
overheidsdomeinen te voorkomen. Zo kunnen we ons volledig focussen op de
technische concepten zonder ons zorgen te maken over domeinspecifieke details.

## Wat hebben we nodig?

- Basiskennis van REST API's
- Een teksteditor
- Node.js (stap 5, optioneel)
- Java (stap 5, optioneel)

:::tip Achtergrondkennis

Meer weten over de standaarden die we in deze tutorial gebruiken? Lees dan:

- [OpenAPI Specification (OAS)](/kennisbank/apis/openapi-specification) - De
  standaard voor het beschrijven van REST API's
- [API Design Rules](/kennisbank/apis/api-design-rules) - De Nederlandse
  richtlijnen voor API-ontwerp

:::

## Stappen overzicht

1. [**Genereer boilerplate OAS**](./1-generate.md) - Maak een basis OpenAPI
   Specification met onze OAS Generator
2. [**Modelleer de schemas**](./2-schemas.md) - Breid de schemas uit voor onze
   specifieke usecase
3. [**Voeg functionaliteit toe**](./3-functionality.md) - Bijvoorbeeld query
   parameters voor filtering
4. [**Valideer de OAS**](./4-validate.md) - Check of de specificatie nog steeds
   voldoet aan de ADR
5. [**Genereer API code**](./5-codegen.md) - Genereer werkende API code

## Design-first

Deze tutorial volgt een design-first aanpak (ook wel "spec-first" genoemd). Dit
betekent dat we starten met het ontwerp van een OpenAPI Specification (OAS)
voordat we code schrijven. De voordelen hiervan zijn:

- We denken eerst na over de API-structuur voordat we gaan implementeren
- De specificatie dient als contract en documentatie
- We kunnen herbruikbare bouwblokken en tooling gebruiken
- Wijzigingen in het ontwerp zijn goedkoper dan wijzigingen in code

## Klaar om te beginnen?

[Start met stap 1: Genereer boilerplate OAS](./1-generate.md)
