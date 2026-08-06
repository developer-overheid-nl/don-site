---

authors: [joost-farla]
tags:
  [api, api-design, graphql, rest, interoperabiliteit, standaarden, geodata]
image: /img/graphql-onder-de-loep.jpg
description: |
  De flexibiliteit van GraphQL verplaatst complexiteit van de client naar
  het schema. In deel 3 van deze serie behandelen we zes uitdagingen die je
  in de praktijk tegenkomt bij schema-ontwerp: paginering, het
  standaardisatie-misverstand, union types, custom scalars, autorisatie en
  content negotiation.
---

# GraphQL onder de loep (deel 3): zes uitdagingen bij schema-ontwerp

![GraphQL onder de loep](/img/graphql-onder-de-loep.jpg)

In [deel 2](/blog/2026/08/05/graphql-2-flexibiliteit-en-limieten) zagen we dat
de flexibiliteit van GraphQL een beheeropgave met zich meebrengt. In dit deel
kijken we naar de ontwerpkant. De rode draad: veel zaken die je in REST oplost
met mechanismen van HTTP (headers, statuscodes, media types, middleware op
routes) moeten in GraphQL expliciet gemodelleerd worden in het schema en de
resolvers. Dat maakt schema's en queries complexer dan de voorbeelden uit deel 1
doen vermoeden. We behandelen zes uitdagingen die je in vrijwel elk
GraphQL-project van enige omvang tegenkomt.

<!-- truncate -->

<!-- TODO bij publicatie: deel 4 linken zodra dat deel verschenen is -->

:::info[GraphQL onder de loep]

Dit artikel is deel 3 van een vierdelige serie:

1. [Een kennismaking](/blog/2026/07/30/graphql-1-introductie)
2. [Flexibel bevragen, en wat dat kost](/blog/2026/08/05/graphql-2-flexibiliteit-en-limieten)
3. Zes uitdagingen bij schema-ontwerp (dit deel)
4. Wanneer wel, en wanneer niet? (volgt)

:::

:::success[TL;DR]

GraphQL standaardiseert de querytaal, maar niet de conventies daarbovenop. Dat
merk je bij elk van de zes uitdagingen in dit deel:

1. Paginering vereist al snel Cursor Connections: drie extra types per lijst.
2. Filtering en sortering werken in elk framework anders.
3. Union types leggen dispatch-werk bij de client, ook bij foutafhandeling.
4. Custom scalars zoals GeoJSON vergen libraries aan beide kanten.
5. Autorisatie verliest het route-anker: per veld, per operatie, of beide.
6. Meerdere responseformaten aanbieden past slecht bij het model.

De oplossingen bouw je grotendeels zelf.

:::

## 1. Paginering laat het schema groeien

Elk lijstveld heeft paginering nodig; dat leerde deel 2 al. De de-facto
standaard hiervoor is de
[GraphQL Cursor Connections-specificatie](https://relay.dev/graphql/connections.htm)
uit Facebooks Relay-framework, aanbevolen in de
[officiële GraphQL-documentatie](https://graphql.org/learn/pagination/). Kijk
wat er met ons schema uit deel 1 gebeurt:

```graphql
# Vóór: eenvoudig, maar onbegrensd
type Organisatie {
  apis: [Api!]!
}

# Ná: Cursor Connections
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
vereenvoudigd: de spec vereist ook `hasPreviousPage` en `startCursor`), en elke
query wordt navenant dieper:

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
universeel gegeven (er bestaan page-, offset- en cursorvarianten, en profielen
zoals de ADR bestaan juist om die keuze uniform te maken), maar het verschil zit
in wáár de complexiteit landt: bij REST in parameters en headers, bij GraphQL in
de structuur van schema en query. De Connections-structuur heeft goede redenen
(stabiele cursors, metadata per resultaat), maar het patroon herhaalt zich voor
élk lijstveld, en wie totalen of facetten toevoegt, ziet de envelope verder
groeien.

## 2. Het standaardisatie-misverstand

Een hardnekkig misverstand is dat GraphQL zaken als filtering, sortering en
zoeken "standaard oplost". In werkelijkheid standaardiseert de specificatie de
_taal_ (syntax, typesysteem, executie), maar vrijwel geen _conventies_
daarbovenop. De Cursor Connections-spec uit de vorige paragraaf is vrijwel de
enige breed gedragen conventie, en zelfs die is formeel geen onderdeel van de
GraphQL-specificatie.

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
Prisma-gebaseerde servers en andere frameworks. Wie, zoals in deel 2 beschreven,
voor zo'n framework kiest vanwege de efficiënte vertaling naar SQL, neemt het
dialect op de koop toe: de serverkeuze werkt direct door in het publieke
contract van de API. Voor één project is dat overkomelijk, maar in een landschap
waarin API's van verschillende organisaties op elkaar moeten aansluiten, zoals
binnen de overheid, zijn kennis en tooling zo niet zonder meer overdraagbaar.
Ook in REST komen zulke conventies niet uit de standaard zelf; daarvoor bestaan
profielen als de
[REST API Design Rules](/kennisbank/api-ontwikkeling/standaarden/api-design-rules).
Een vergelijkbaar afsprakenkader bestaat voor GraphQL nog niet.

## 3. Union types en foutafhandeling

Sommige velden kunnen meerdere types opleveren. Denk aan een zoekfunctie over
het register die zowel API's als organisaties vindt; in GraphQL modelleer je dat
met een _union_:

```graphql
union ZoekResultaat = Api | Organisatie

type Query {
  zoek(term: String!): [ZoekResultaat!]!
}
```

De client moet vervolgens per mogelijk type een _inline fragment_ schrijven en
op het metaveld `__typename` dispatchen:

```graphql
{
  zoek(term: "adressen") {
    __typename
    ... on Api { titel versie }
    ... on Organisatie { naam }
  }
}
```

Dat werkt, maar het dispatch-werk ligt bij de client: elke afnemer, in elke
taal, moet dit patroon implementeren. In REST blijft hetzelfde probleem
doorgaans buiten het contract: aparte endpoints per resourcetype, of een
expliciet typeveld in de response.

Foutafhandeling maakt het verschil het scherpst zichtbaar. GraphQL-responses
komen vrijwel altijd terug met HTTP-status `200 OK`, ook als er iets misging;
fouten staan in een aparte, generieke en ongetypeerde `errors`-lijst in de body.
Voor "niet gevonden" volstaat een nullable veld (zoals `organisatie` in deel 1),
maar voor verwachte foutsituaties die zelf informatie dragen, wordt ditzelfde
union-mechanisme ingezet: het patroon
[_errors as data_](https://www.apollographql.com/docs/graphos/schema-design/guides/errors-as-data-explained),
geïntroduceerd door Sasha Solomon in
["200 OK! Error Handling in GraphQL"](https://sachee.medium.com/200-ok-error-handling-in-graphql-7ec869aec9bc),
met dezelfde dispatch-plicht voor de client als gevolg. REST gebruikt hiervoor
statuscodes met een
[`application/problem+json`](/kennisbank/api-ontwikkeling/architectuur/problem-details)-body:
gestandaardiseerd (RFC 9457) en zonder extra schemawerk.

## 4. Custom scalars: coupling aan beide kanten

Het typesysteem van GraphQL kent standaard vijf scalars: `Int`, `Float`,
`String`, `Boolean` en `ID`. Een datumtype ontbreekt bijvoorbeeld. Voor alles
daarbuiten definieer je _custom scalars_, en daar wringt het. Een scalar is voor
de GraphQL-runtime een black box: het schema zegt niets over de structuur, dus
serialisatie en validatie moeten aan de server- én clientkant met dezelfde
afspraken (en meestal: dezelfde library) worden geïmplementeerd. Daarmee
ontstaat coupling buiten het typesysteem om.

Geodata maakt het probleem goed zichtbaar. Een GeoJSON-geometrie is in
standaardtypes praktisch niet uit te drukken: coördinaten van een polygon zijn
lijsten van lijsten van lijsten, en GraphQL kent geen generieke JSON-structuren.
De praktijk is daarom vrijwel altijd een custom scalar die een JSON-blob
doorlaat:

```graphql
scalar GeoJSON
  @specifiedBy(url: "https://datatracker.ietf.org/doc/html/rfc7946")

type Gebouw { id: ID! geometrie: GeoJSON! }
```

Voor dit veld, waar structuur juist belangrijk is, valt de typering dus weg. Er
bestaan hulpmiddelen: `@specifiedBy` verwijst naar een externe specificatie, de
[graphql-scalars-library](https://the-guild.dev/graphql/scalars) biedt
kant-en-klare scalars (waaronder GeoJSON) en de GraphQL Foundation host een
[register van scalar-specificaties](https://scalars.graphql.org/). Ze maken de
afspraak vindbaar en het werk kleiner, maar de coupling blijft: `@specifiedBy`
is een verwijzing voor ontwikkelaars en geen instructie die de runtime uitvoert,
en server en client hebben nog steeds elk een implementatie nodig die dezelfde
interpretatie volgt. Wijken server en client in library of versie van elkaar af,
dan keurt het schema de waarde alsnog goed en komt de fout pas boven bij het
interpreteren van de data.

## 5. Autorisatie verliest zijn ankerpunt

In REST valt autorisatie vaak samen met de resource en de route, bijvoorbeeld
met [OAuth 2.0](/kennisbank/security/authenticatie/oauth)-scopes per endpoint.
Eén regel in een middleware of
[API-gateway](/kennisbank/security/tutorials/apisix-opa-keycloak) dekt een heel
endpoint:

```text
GET /apis/{id}           → publiek
GET /apis/{id}/notities  → alleen rol BEHEERDER
```

In GraphQL bestaat die route niet: elk veld is bereikbaar via willekeurig veel
paden door de graph, via `api(id: ...)`, via `organisatie { apis { ... } }` of
via een zoekresultaat. Het ankerpunt waaraan je een regel ophangt, kies je dus
zelf: het veld of de operatie.

**Per veld.** Gangbaar zijn checks in resolvers en schema-directives zoals
`@auth`:

```graphql
type Api {
  interneNotities: String @auth(requires: BEHEERDER)
}
```

De specificatie kent zo'n directive niet. Autorisatie komt in GraphQL zelf
helemaal niet voor, dus elke server en gateway kiest een eigen vorm. Wat er wel
is, is advies: de
[officiële documentatie](https://graphql.org/learn/authorization/) raadt aan de
logica onder de resolvers in de businesslaag te leggen, zodat de GraphQL-laag
zelf geen regels bevat die je kunt vergeten. Lastig blijft de context, want
hetzelfde veld kan per pad andere regels vragen: een e-mailadres dat de eigen
beheerder mag zien, hoort niet in een zoekresultaat. Een eigen type per context
lost dat op en laat het schema opnieuw groeien. En foutgevoelig is het: in
november 2025 publiceerde Apollo
[twee security advisories](https://github.com/apollographql/federation/security/advisories/GHSA-mx7m-j9xf-62hw)
waarbij de compositielogica van federated schema's field-level access control
liet omzeilen. Autorisatie per veld over een graph kent intrinsiek meer edge
cases dan per route, zeker als die graph over meerdere services is verdeeld.

**Per operatie.** Wie met persisted queries werkt (deel 2), heeft weer een
eindige, benoemde set operaties en kan rechten per document toekennen,
functioneel gelijk aan scopes per endpoint. De handhaving schuift daarmee naar
voren, naar een toets vóór executie, en omdat een vast document ook het pad
vastlegt, wordt het e-mailadres uit het voorbeeld hierboven vooraf toetsbaar.
Ook hier is de vorm niet gestandaardiseerd: de persisted operations-RFC uit deel
2 is nog een voorstel.

Geen van beide ankers dekt de gegevens zelf. Een document `organisatie(id: $id)`
legt vast welke vorm een afnemer mag opvragen, niet welke organisaties hij mag
zien. Staat de identificatie in een variabele, dan kan een policy enforcement
point die aan een centraal policy decision point voorleggen, net als bij een
pad-parameter in REST. Komen de objecten pas uit de traversal, zoals bij een
lijst of een geneste relatie, dan valt er vóór executie niets te beoordelen. De
praktijk is dus een combinatie die je zelf ontwerpt: het grofmazige deel aan de
voordeur, het gegevensafhankelijke deel onder de resolvers.

## 6. Content negotiation past niet in het model

REST kent een gestandaardiseerd mechanisme om dezelfde resource in meerdere
formaten aan te bieden: content negotiation via de `Accept`-header.

```http
GET /gebouwen/0363100012345678 HTTP/1.1
Accept: application/geo+json
```

Dezelfde URL kan zo plain JSON, GeoJSON, XML of bijvoorbeeld een
[Verifiable Credential](/kennisbank/security/wetgeving-en-beleid/eudi-wallet)
opleveren, zonder dat het API-ontwerp verandert. GraphQL kent dit mechanisme
niet: er is één responsevorm, gedicteerd door het schema. Alternatieve
representaties moeten dus _in het schema zelf_ worden gemodelleerd, als extra
velden (`gebouw { alsGeoJSON }`), aparte queries of custom scalars. Zo sijpelen
formaatdetails door in wat een representatie-onafhankelijk datamodel zou moeten
zijn, en groeit het schema met elk extra formaat. Voor API's waar meerdere
representaties een kernvereiste zijn, zoals geo-API's of API's die verifieerbare
gegevens uitgeven, is dit een serieuze beperking van het model.

## De balans

Geen van deze zes uitdagingen is een showstopper, en voor elk bestaat een
werkbaar patroon. Maar samen tekenen ze een consistent beeld: GraphQL geeft je
een krachtig, generiek bevragingsmodel en vraagt in ruil daarvoor dat je
conventies die REST van HTTP en van standaarden als de ADR cadeau krijgt, zelf
ontwerpt, bouwt en bewaakt. Daarmee is de vraag niet óf GraphQL werkt (dat doet
het aantoonbaar, ook op grote schaal), maar wanneer die opgave in verhouding
staat tot wat het oplevert. Dat is het onderwerp van deel 4, het slot van deze
serie.

<!-- TODO: deel 4 linken zodra dat is gepubliceerd -->
