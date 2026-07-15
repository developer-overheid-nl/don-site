---
draft: true
authors: [joost-farla]
tags: [api, api-design, graphql, rest]
description: |
  GraphQL komt regelmatig voorbij in gesprekken over API's binnen de
  overheid, maar wat is het eigenlijk precies? In het eerste deel van deze
  vierdelige serie maken we kennis met de bouwstenen van GraphQL en laten we
  zien waarom het geen "betere REST" is, maar een fundamenteel ander model
  voor het ontsluiten van data.
---

# GraphQL onder de loep (deel 1): een kennismaking

In gesprekken over API's binnen de overheid komt GraphQL regelmatig voorbij.
Sommige organisaties experimenteren ermee, grote internationale platformen
zoals GitHub en Shopify bieden er publieke API's mee aan, en tegelijkertijd
is het binnen de Nederlandse overheid nog nauwelijks zichtbaar: het
[API-register](/blog/2025/06/18/het-nieuwe-api-register)
op deze site is bewust REST-only, en de
[REST API Design Rules](/kennisbank/api-ontwikkeling/standaarden/api-design-rules)
(ADR) zijn, de naam zegt het al, geschreven voor REST.

Reden genoeg om GraphQL eens grondig onder de loep te nemen. In een serie van
vier blogposts verkennen we wat GraphQL is, wat het oplost, welke uitdagingen
het met zich meebrengt en, als kernvraag, wanneer je het wel en wanneer je
het beter niet kunt gebruiken. We schrijven deze serie vanuit een neutrale
blik: er is geen goed of fout, wel een afweging die je bewust wilt maken.

<!-- truncate -->

:::success[TL;DR]

GraphQL is een getypeerde querytaal en runtime voor API's: de client
beschrijft exact welke data hij nodig heeft en krijgt precies dat terug, via
één endpoint. Dat is een fundamenteel ander model dan REST, dat draait om
resources en de semantiek van HTTP. Dit paradigmaverschil verklaart zowel de
voordelen als vrijwel alle uitdagingen die in de volgende delen van deze
serie aan bod komen.

:::

## Wat is GraphQL?

[GraphQL](https://graphql.org/) is een querytaal voor API's, gecombineerd met
een runtime die deze queries uitvoert tegen een sterk getypeerd schema. Het
is in 2012 ontwikkeld bij Facebook, dat worstelde met de datavoorziening van
zijn mobiele apps, en in 2015 open source gemaakt. Sinds eind 2018 wordt de
specificatie beheerd door de onafhankelijke
[GraphQL Foundation](https://graphql.org/foundation/), onderdeel van de Linux
Foundation.

De specificatie kent een laag releasetempo: in september 2025
verscheen de
[September 2025 Edition](https://graphql.org/blog/2025-09-08-september-edition/),
de eerste nieuwe editie sinds oktober 2021. Die bracht onder andere
`@oneOf`-inputtypes en ruimere mogelijkheden voor het markeren van verouderde
schema-onderdelen met `@deprecated`.

## De bouwstenen

### Het schema

Het hart van elke GraphQL-API is het schema, geschreven in de Schema
Definition Language (SDL). Het schema beschrijft welke types er bestaan, hoe
ze samenhangen en welke queries mogelijk zijn. Een sterk vereenvoudigd
voorbeeld, losjes gebaseerd op het API-register:

```graphql
type Organisatie {
  id: ID!
  naam: String!
  apis: [Api!]!
}

type Api {
  id: ID!
  titel: String!
  versie: String!
  organisatie: Organisatie!
}

type Query {
  organisatie(id: ID!): Organisatie
  organisaties: [Organisatie!]!
  apis: [Api!]!
}
```

Het uitroepteken markeert verplichte (non-nullable) velden. Let op de
relaties: een `Organisatie` heeft `apis`, en een `Api` verwijst terug naar
zijn `organisatie`. Het schema vormt zo een *graaf* van samenhangende types;
vandaar de naam.

### Queries

De client stelt een query samen die qua vorm het gewenste antwoord spiegelt:

```graphql
{
  organisatie(id: "min-bzk") {
    naam
    apis {
      titel
      versie
    }
  }
}
```

De server antwoordt met exact de gevraagde velden, niets meer en niets
minder:

```json
{
  "data": {
    "organisatie": {
      "naam": "Ministerie van BZK",
      "apis": [
        { "titel": "Adressenregister API", "versie": "2.1.0" },
        { "titel": "Organisaties API", "versie": "1.0.3" }
      ]
    }
  }
}
```

### Variabelen

In de praktijk schrijven clients geen letterlijke waarden in de query, maar
benoemde operaties met variabelen:

```graphql
query ApisVanOrganisatie($id: ID!) {
  organisatie(id: $id) {
    naam
    apis {
      titel
    }
  }
}
```

```json
{ "id": "min-bzk" }
```

De query wordt daarmee een herbruikbaar, valideerbaar document dat los van
de invoer bestaat. Onthoud deze vorm: in deel 2 zien we dat zulke benoemde
documenten de basis vormen voor beheersmaatregelen zoals persisted queries.

### Mutations en subscriptions

Schrijfoperaties heten *mutations*. Ze zijn in het schema expliciet
gescheiden van queries en geven, net als queries, precies de gevraagde
velden terug:

```graphql
mutation {
  registreerApi(
    input: { titel: "Vergunningen API", organisatieId: "gm0363" }
  ) {
    id
    titel
  }
}
```

Daarnaast kent GraphQL *subscriptions*: de server pusht wijzigingen naar de
client zodra die zich voordoen, een patroon dat aansluit bij
[event-driven architectuur](/kennisbank/api-ontwikkeling/architectuur/eda).
In de rest van deze serie richten we ons op het bevragen van data; het
ontwerp van mutations en subscriptions laten we verder buiten beschouwing.

### Resolvers

Aan de serverkant wordt elk veld ingevuld door een *resolver*: een functie
die weet hoe de waarde van dat ene veld opgehaald moet worden. Hoe de data
achter de schermen is opgeslagen (één database, meerdere services, een
externe API) is voor de client onzichtbaar. Dat maakt GraphQL ook geschikt
als *orkestratielaag*: een schema dat gegevens uit meerdere bestaande API's
combineert en in samenhang bevraagbaar maakt, zonder die bronnen te
vervangen. Op dat patroon komen we in deel 4 terug.

### Introspectie

Een GraphQL-API is zelfbeschrijvend: via een standaard introspectie-query kan
elke client het volledige schema opvragen. Daarop bouwt een rijk ecosysteem
van tooling, zoals interactieve verkenners (GraphiQL), automatische
documentatie en codegeneratie voor clients.

## Dezelfde vraag in REST

Hoe zou de bovenstaande informatiebehoefte er met een klassieke REST-API
uitzien? Waarschijnlijk ongeveer zo:

```http
GET /organisaties/min-bzk
GET /organisaties/min-bzk/apis
```

De eerste call levert de volledige organisatie-representatie op, inclusief
adresgegevens, contactinformatie en andere velden die we in dit scenario niet
nodig hebben. Dat heet *overfetching*. Levert de tweede call alleen
samenvattingen op, dan is per API mogelijk nog een extra call nodig voor de
details: *underfetching*, met meerdere roundtrips tot gevolg.

Dit is het probleem waarvoor GraphQL is ontworpen. In één request, in één
roundtrip, precies de benodigde data, ongeacht hoeveel types de vraag raakt.
Voor Facebook, met trage mobiele netwerken en schermen die data uit
tientallen bronnen combineren, was dat de bestaansreden.

Daarmee is niet gezegd dat REST dit probleem niet kán oplossen: denk aan
zorgvuldig ontworpen resources, `fields`- of `expand`-parameters, of een
specifiek op een scherm toegesneden endpoint. Het verschil is dat GraphQL
deze flexibiliteit *generiek* biedt, terwijl je haar in REST per geval
ontwerpt. Op die afweging komen we in deel 2 uitgebreid terug.

## Een ander paradigma, geen betere REST

Het is verleidelijk GraphQL te zien als "REST, maar dan handiger". Dat doet
beide tekort. Het verschil wordt zichtbaar zodra je naar het HTTP-verkeer
kijkt. Een minimale variant van de benoemde operatie uit de paragraaf over
variabelen gaat zo over de lijn:

```http
POST /graphql HTTP/1.1
Content-Type: application/json

{
  "query": "query Naam($id: ID!) { organisatie(id: $id) { naam } }",
  "variables": { "id": "min-bzk" }
}
```

Eén endpoint, vrijwel altijd `POST`, en de eigenlijke vraag zit in de body. Voor het
netwerk is elk GraphQL-request identiek; wat er gevraagd wordt, is alleen
zichtbaar voor wie de body parseert. Zet de twee modellen naast elkaar:

- **REST** modelleert *resources* en leunt op de semantiek van HTTP:
  werkwoorden (`GET`, `POST`, `PUT`, `DELETE`), statuscodes, unieke URI's per
  resource, cache-headers en content negotiation. Het netwerk "begrijpt" een
  REST-API: een cache, proxy of loadbalancer kan zinvol reageren op wat er
  langskomt.
- **GraphQL** modelleert een *typegraaf* en gebruikt HTTP vooral als
  transport. Vrijwel al het verkeer gaat via één endpoint (meestal
  `POST /graphql`), antwoorden komen doorgaans terug met status `200 OK`,
  ook als er iets misging, en fouten staan als data in de responsebody.

In onze eerdere blogpost over
[OpenAPI 3.1](/blog/2025/07/10/openapi-31-in-zicht)
constateerden we dit al: GraphQL gebruikt HTTP wel als protocol, maar volgt
niet het HTTP-model waarop specificaties als
[OpenAPI](/kennisbank/api-ontwikkeling/standaarden/openapi-specification)
zijn gebaseerd.
Illustratief voor deze verhouding: de
[GraphQL over HTTP-specificatie](https://graphql.github.io/graphql-over-http/),
die vastlegt hoe GraphQL-verkeer over HTTP hoort te lopen, is op het moment
van schrijven (medio 2026) een working draft. Hoe GraphQL zich tot HTTP
verhoudt, is dus ook binnen de
GraphQL-gemeenschap nog niet volledig uitgekristalliseerd.

Dit paradigmaverschil is de rode draad van deze serie. Vrijwel elk voordeel
én vrijwel elke uitdaging van GraphQL is erop terug te voeren: wat je wint
aan flexibiliteit in de bevraging, moet je elders opnieuw organiseren. Denk
aan caching, autorisatie en beheersing van de belasting.

## De rest van deze serie

<!-- TODO: bij publicatie van deel 2, 3 en 4 hier telkens de link naar het
verschenen deel toevoegen -->

In de komende delen gaan we de diepte in:

- **Deel 2** behandelt de kernbelofte van GraphQL (flexibel bevragen als
  oplossing voor over- en underfetching) en de prijs die daar tegenover
  staat: onvoorspelbare performance en een groter aanvalsoppervlak, en hoe je
  daar limieten aan stelt.
- **Deel 3** duikt in de praktijk van schema-ontwerp: paginering, filtering,
  union types, custom scalars, autorisatie en content negotiation.
- **Deel 4** brengt alles samen in een afwegingskader: wanneer is GraphQL een
  logische keuze, en wanneer ben je met REST beter af, zeker binnen de
  context van de Nederlandse overheid en de ADR.

Een compacte referentie over GraphQL, met de status binnen de overheid en
de belangrijkste specificaties, staat in de
[kennisbank](/kennisbank/api-ontwikkeling/standaarden/graphql).
