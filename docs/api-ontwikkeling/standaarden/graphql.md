---
content_type: standaard
tags: [api, api-design, graphql, rest]
title: "GraphQL"
---

# GraphQL

<!-- TODO: link naar de blogserie toevoegen zodra de delen zijn
gepubliceerd -->

:::info[Status binnen de overheid]

Voor publieke overheids-API's gelden de
[REST API Design Rules](/kennisbank/api-ontwikkeling/standaarden/api-design-rules)
en de
[OpenAPI Specification](/kennisbank/api-ontwikkeling/standaarden/openapi-specification)
als 'pas toe of leg uit'-standaarden. De inzet van GraphQL is een eigen
afweging per organisatie. Een uitgebreide afweging, inclusief de voor- en
nadelen ten opzichte van REST, staat in de vierdelige blogserie "GraphQL
onder de loep" op deze site.

:::

[GraphQL](https://graphql.org/) is een querytaal voor API's, gecombineerd
met een runtime die queries uitvoert tegen een sterk getypeerd schema. De
client beschrijft per request exact welke velden hij nodig heeft en krijgt
precies die data terug, via één endpoint. GraphQL is in 2012 ontwikkeld bij
Facebook, in 2015 open source gemaakt en wordt sinds eind 2018 beheerd door
de [GraphQL Foundation](https://graphql.org/foundation/), onderdeel van de
Linux Foundation. De actuele versie van de specificatie is de
[September 2025 Edition](https://spec.graphql.org/September2025/), de
eerste nieuwe editie sinds oktober 2021.

## Hoe het werkt

Het hart van een GraphQL-API is het schema, geschreven in de Schema
Definition Language (SDL). Clients stellen daar queries op samen die qua
vorm het antwoord spiegelen:

```graphql
type Api {
  id: ID!
  titel: String!
  versie: String!
}

type Query {
  api(id: ID!): Api
}
```

```graphql
query Api($id: ID!) {
  api(id: $id) {
    titel
    versie
  }
}
```

Naast queries (lezen) kent GraphQL mutations (schrijven) en subscriptions
(server-push bij wijzigingen).

## Kenmerken

- **Sterk getypeerd contract.** Het schema beschrijft alle types, velden en
  operaties en is via introspectie machineleesbaar op te vragen. Daarop
  bouwt een ecosysteem van tooling: interactieve verkenners,
  documentatiegeneratoren en codegeneratie voor clients.
- **Client-gestuurde selectie.** De client bepaalt per request welke velden
  de response bevat. GraphQL is ontworpen om zowel over- als underfetching
  te voorkomen, oorspronkelijk voor mobiele toepassingen met uiteenlopende
  schermen en beperkte bandbreedte.
- **Eén endpoint over HTTP.** Al het verkeer loopt doorgaans via één
  endpoint. Het transportgedrag wordt beschreven in de
  [GraphQL over HTTP-specificatie](https://graphql.github.io/graphql-over-http/),
  op het moment van schrijven (medio 2026) een working draft.
- **Evolutie via deprecation.** Velden worden met `@deprecated` gemarkeerd
  en op basis van gemeten gebruik uitgefaseerd, in plaats van via
  API-versies.

## Aanvullende specificaties en conventies

- [GraphQL Cursor Connections](https://relay.dev/graphql/connections.htm):
  de gangbare conventie voor paginering.
- [Persisted operations-RFC](https://github.com/graphql/graphql-over-http/blob/main/rfcs/PersistedOperations.md):
  standaardisatie van vooraf geregistreerde queries.
- [Cost directives](https://ibm.github.io/graphql-specs/cost-spec.html)
  (IBM, draft): een gedeelde taal voor querykosten.
- [Composite Schemas-werkgroep](https://github.com/graphql/composite-schemas-spec):
  leveranciersneutrale federatie van schema's.
- [Register van scalar-specificaties](https://scalars.graphql.org/): custom
  scalars, te refereren via de `@specifiedBy`-directive.

## Meer informatie

- [GraphQL-specificatie](https://spec.graphql.org/)
- [Officiële documentatie en tutorials](https://graphql.org/learn/)
- [GraphQL Foundation](https://graphql.org/foundation/)
- [OWASP GraphQL Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html)
  met beveiligingsrichtlijnen
- [Kennisplatform API's: de verhouding tussen de ADR en alternatieven zoals GraphQL](https://github.com/Geonovum/KP-APIs/issues/537)
