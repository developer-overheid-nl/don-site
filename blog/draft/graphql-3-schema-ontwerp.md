---
draft: true
authors: [joost-farla]
tags:
  [api, api-design, graphql, rest, interoperabiliteit, standaarden, geodata]
description: |
  De flexibiliteit van GraphQL verplaatst complexiteit van de client naar
  het schema. In deel 3 van deze serie behandelen we zes uitdagingen die je
  in de praktijk tegenkomt bij schema-ontwerp: paginering, het
  standaardisatie-misverstand, union types, custom scalars, autorisatie en
  content negotiation.
---

# GraphQL onder de loep (deel 3): zes uitdagingen bij schema-ontwerp

In [deel 2](/blog/draft/graphql-2-flexibiliteit-en-limieten) <!-- TODO: link
bijwerken na publicatie --> zagen we dat de flexibiliteit van GraphQL een
beheeropgave met zich meebrengt. In dit deel kijken we naar de ontwerpkant.
De rode draad: veel zaken die je in REST oplost met mechanismen van HTTP
(headers, statuscodes, media types, middleware op routes) moeten in GraphQL
expliciet gemodelleerd worden in het schema en de resolvers. Dat kan
allemaal, maar het maakt schema's en queries complexer dan de voorbeelden
uit deel 1 doen vermoeden. We behandelen zes uitdagingen die je in vrijwel
elk GraphQL-project van enige omvang tegenkomt.

<!-- truncate -->

<!-- TODO bij publicatie: links van deel 1 en 2 omzetten naar de definitieve
URL's; deel 4 pas linken zodra dat deel verschenen is -->

:::info[GraphQL onder de loep]

Dit artikel is deel 3 van een vierdelige serie:

1. [Een kennismaking](/blog/draft/graphql-1-introductie)
2. [Flexibel bevragen, en wat dat kost](/blog/draft/graphql-2-flexibiliteit-en-limieten)
3. Zes uitdagingen bij schema-ontwerp (dit deel)
4. Wanneer wel, en wanneer niet? (volgt)

:::

:::success[TL;DR]

GraphQL standaardiseert de querytaal, maar niet de conventies daarbovenop.
Dat merk je bij elk van de zes uitdagingen in dit deel:

1. Paginering vereist al snel Relay Connections: drie extra types per lijst.
2. Filtering en sortering werken in elk framework anders.
3. Union types leggen dispatch-werk bij de client, ook bij foutafhandeling.
4. Custom scalars zoals GeoJSON vergen libraries aan beide kanten.
5. Autorisatie verschuift van route- naar veldniveau.
6. Meerdere responseformaten aanbieden past slecht bij het model.

Geen van deze punten is onoplosbaar, maar je bouwt de oplossingen
grotendeels zelf.

:::

## 1. Paginering blaast het schema op

Elk lijstveld heeft paginering nodig; dat leerde deel 2 al. De de-facto
standaard hiervoor is de
[GraphQL Cursor Connections-specificatie](https://relay.dev/graphql/connections.htm)
uit Facebooks Relay-framework, aanbevolen in de
[officiële GraphQL-documentatie](https://graphql.org/learn/pagination/).
Kijk wat er met ons schema uit deel 1 gebeurt:

```graphql
# Vóór: eenvoudig, maar onbegrensd
type Organisatie {
  apis: [Api!]!
}

# Ná: Relay Cursor Connections
type Organisatie {
  apis(first: Int, after: String): ApiConnection!
}

type ApiConnection {
  edges: [ApiEdge!]!
  pageInfo: PageInfo!
}

type ApiEdge {
  node: Api!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}
```

Drie extra types voor één lijstveld (en dan is `PageInfo` hier nog
vereenvoudigd: de spec vereist ook `hasPreviousPage` en `startCursor`), en
elke query wordt navenant dieper:

```graphql
{
  organisatie(id: "min-bzk") {
    apis(first: 20, after: "Y3Vyc29yOjIw") {
      edges {
        node { titel versie }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
}
```

Ter vergelijking: in REST is hetzelfde doorgaans twee queryparameters
(`?page=2&per_page=20` of een cursor) en een `Link`-header. Ook dat is geen
universeel gegeven (er bestaan page-, offset- en cursorvarianten, en
profielen zoals de ADR bestaan juist om die keuze uniform te maken), maar
het verschil zit in wáár de complexiteit landt: bij REST in parameters en
headers, bij GraphQL in de structuur van schema en query. De
Connections-structuur heeft goede redenen (stabiele cursors, metadata per
resultaat), maar het patroon herhaalt zich voor élk lijstveld, en wie
totalen of facetten toevoegt, ziet de envelope verder groeien.

## 2. Het standaardisatie-misverstand

Een hardnekkig misverstand is dat GraphQL zaken als filtering, sortering en
zoeken "standaard oplost". Het tegendeel is waar: de specificatie
standaardiseert de *taal* (syntax, typesysteem, executie), maar vrijwel geen
*conventies* daarbovenop. De Cursor Connections-spec uit de vorige paragraaf
is zo'n beetje de enige breed gedragen conventie, en zelfs die is formeel
geen onderdeel van de GraphQL-specificatie.

Filtering en sortering zijn daardoor in elk framework anders vormgegeven.
Dezelfde vraag (actieve API's waarvan de titel "register" bevat, alfabetisch
gesorteerd) in twee populaire servers:

```graphql
# Hasura
{
  apis(
    where: { status: { _eq: "actief" }, titel: { _ilike: "%register%" } }
    order_by: { titel: asc }
  ) { titel }
}
```

```graphql
# HotChocolate (.NET)
{
  apis(
    where: { status: { eq: "actief" }, titel: { contains: "register" } }
    order: [{ titel: ASC }]
  ) { titel }
}
```

Vergelijkbare maar nét andere dialecten bestaan voor
[PostGraphile](https://www.graphile.org/postgraphile/filtering/),
Prisma-gebaseerde servers en andere frameworks. Wie, zoals in deel 2
beschreven, voor zo'n framework kiest vanwege de efficiënte vertaling naar
SQL, neemt het dialect op de koop toe: de serverkeuze werkt direct door in
het publieke contract van de API. Voor één project is dat overkomelijk,
maar in een landschap waarin API's van verschillende organisaties op elkaar
moeten aansluiten, zoals binnen de overheid, zijn kennis en tooling zo niet
zonder meer overdraagbaar. REST kent dit gat overigens van zichzelf ook; de
[REST API Design Rules](/kennisbank/api-ontwikkeling/standaarden/api-design-rules)
zijn er juist om zulke conventies vast te leggen. Een vergelijkbaar
afsprakenkader bestaat voor GraphQL nog niet.

## 3. Union types en foutafhandeling

Sommige velden kunnen meerdere types opleveren. Denk aan een zoekfunctie
over het register die zowel API's als organisaties vindt; in GraphQL
modelleer je dat met een *union*:

```graphql
union ZoekResultaat = Api | Organisatie

type Query {
  zoek(term: String!): [ZoekResultaat!]!
}
```

De client moet vervolgens per mogelijk type een *inline fragment* schrijven
en op het metaveld `__typename` dispatchen:

```graphql
{
  zoek(term: "adressen") {
    __typename
    ... on Api { titel versie }
    ... on Organisatie { naam }
  }
}
```

Dat werkt, maar de rekening ligt bij de client: elke afnemer, in elke taal,
moet dit dispatch-patroon implementeren. In REST blijft hetzelfde probleem
doorgaans buiten het contract: aparte endpoints per resourcetype, of een
expliciet typeveld in de response.

Foutafhandeling maakt het verschil het scherpst zichtbaar.
GraphQL-responses komen vrijwel altijd terug met HTTP-status `200 OK`, ook
als er iets misging; fouten staan in een aparte, generieke en ongetypeerde
`errors`-lijst in de body. Voor "niet gevonden" volstaat een nullable veld
(zoals `organisatie` in deel 1), maar voor verwachte foutsituaties die zelf
informatie dragen, wordt ditzelfde union-mechanisme ingezet: het patroon
[*errors as data*](https://www.apollographql.com/docs/graphos/schema-design/guides/errors-as-data-explained),
geïntroduceerd door Sasha Solomon in
["200 OK! Error Handling in GraphQL"](https://sachee.medium.com/200-ok-error-handling-in-graphql-7ec869aec9bc),
met dezelfde dispatch-plicht voor de client als gevolg. REST gebruikt
hiervoor statuscodes met een
[`application/problem+json`](/kennisbank/api-ontwikkeling/architectuur/problem-details)-body:
gestandaardiseerd (RFC 9457) en zonder extra schemawerk.

## 4. Custom scalars: coupling aan beide kanten

Het typesysteem van GraphQL kent standaard vijf scalars: `Int`, `Float`,
`String`, `Boolean` en `ID`. Een datumtype ontbreekt bijvoorbeeld. Voor
alles daarbuiten definieer je *custom scalars*, en daar wringt het. Een
scalar is voor de GraphQL-runtime een black box: het schema zegt niets over
de structuur, dus serialisatie en validatie moeten aan de server- én
clientkant met dezelfde afspraken (en meestal: dezelfde library) worden
geïmplementeerd. Daarmee ontstaat coupling buiten het typesysteem om.

Geodata maakt het probleem goed zichtbaar. Een GeoJSON-geometrie is in
standaardtypes praktisch niet uit te drukken: coördinaten van een polygon
zijn lijsten van lijsten van lijsten, en GraphQL kent geen generieke
JSON-structuren. De praktijk is daarom vrijwel altijd een custom scalar die
een JSON-blob doorlaat:

```graphql
scalar GeoJSON
  @specifiedBy(url: "https://datatracker.ietf.org/doc/html/rfc7946")

type Gebouw { id: ID! geometrie: GeoJSON! }
```

Voor dit veld, waar structuur juist belangrijk is, valt de typering dus
weg. Er is beweging: `@specifiedBy` verwijst naar een externe specificatie,
de [graphql-scalars-library](https://the-guild.dev/graphql/scalars) biedt
kant-en-klare scalars (waaronder GeoJSON) en de GraphQL Foundation host een
[register van scalar-specificaties](https://scalars.graphql.org/). Maar dat
zijn community-conventies, geen onderdeel van de standaard.

## 5. Autorisatie verschuift naar veld-niveau

In REST valt autorisatie vaak samen met de resource en de route,
bijvoorbeeld met [OAuth 2.0](/kennisbank/security/authenticatie/oauth)-scopes
per endpoint. Eén regel in een middleware of
[API-gateway](/kennisbank/security/tutorials/apisix-opa-keycloak) dekt een
heel endpoint:

```text
GET /apis/{id}           → publiek
GET /apis/{id}/notities  → alleen rol BEHEERDER
```

In GraphQL bestaat die route niet: elk veld is bereikbaar via willekeurig
veel paden door de graaf, via `api(id: ...)`, via
`organisatie { apis { ... } }` of via een zoekresultaat. Autorisatie moet
daarom worden gehandhaafd per veld of object, niet per request. Gangbare
patronen zijn checks in resolvers en schema-directives zoals `@auth`:

```graphql
type Api {
  interneNotities: String @auth(requires: BEHEERDER)
}
```

Daarnaast beveelt de
[officiële documentatie](https://graphql.org/learn/authorization/) aan de
autorisatielogica volledig in de businesslaag onder de resolvers te leggen,
zodat de GraphQL-laag zelf geen regels bevat die je kunt vergeten.

De uitdaging zit bovendien ook in de context: hetzelfde veld kan
afhankelijk van het pad andere regels vragen. Het e-mailadres van een
contactpersoon mag bijvoorbeeld zichtbaar zijn voor de eigen beheerder,
maar niet in een zoekresultaat. Een gangbaar ontwerpadvies is daarom per
context een eigen type te ontwerpen in plaats van types te hergebruiken.
Dat werkt, maar laat het schema opnieuw groeien; het terugkerende thema van
dit deel.

Dat dit foutgevoelig terrein is, laat de praktijk zien: in november 2025
publiceerde Apollo
[twee security advisories](https://github.com/apollographql/federation/security/advisories/GHSA-mx7m-j9xf-62hw)
waarbij de compositielogica van federated schema's field-level access
control liet omzeilen, onder andere via interface-types. Niet uit
onzorgvuldigheid, maar omdat autorisatie per veld over een graaf intrinsiek
meer randgevallen kent dan per route, zeker als die graaf over meerdere
services is verdeeld.

## 6. Content negotiation past niet in het model

REST kent een gestandaardiseerd mechanisme om dezelfde resource in meerdere
formaten aan te bieden: content negotiation via de `Accept`-header.

```http
GET /gebouwen/0363100012345678 HTTP/1.1
Accept: application/geo+json
```

Dezelfde URL kan zo plain JSON, GeoJSON, XML of bijvoorbeeld een
[Verifiable Credential](/kennisbank/security/wetgeving-en-beleid/eudi-wallet)
opleveren, zonder dat het API-ontwerp verandert. GraphQL kent dit
mechanisme niet: er is één responsevorm, gedicteerd door het schema.
Alternatieve representaties moeten dus *in het schema zelf* worden
gemodelleerd, als extra velden (`gebouw { alsGeoJSON }`), aparte queries of
custom scalars. Zo sijpelen formaatdetails door in wat een conceptueel
datamodel zou moeten zijn, en groeit het schema met elk extra formaat. Voor
API's waar meerdere representaties een kernvereiste zijn, zoals geo-API's
of API's die verifieerbare gegevens uitgeven, is dit een serieuze beperking
van het model.

## De balans

Geen van deze zes uitdagingen is een showstopper, en voor elk bestaat een
werkbaar patroon. Maar samen tekenen ze een consistent beeld: GraphQL geeft
je een krachtig, generiek bevragingsmodel en vraagt in ruil daarvoor dat je
conventies die REST van HTTP en van standaarden als de ADR cadeau krijgt,
zelf ontwerpt, bouwt en bewaakt. Daarmee is de vraag niet óf GraphQL werkt
(dat doet het aantoonbaar, ook op grote schaal), maar wanneer de baten
tegen deze kosten opwegen. Dat is het onderwerp van deel 4
<!-- TODO: linken zodra deel 4 is gepubliceerd -->, het slot van deze serie.
