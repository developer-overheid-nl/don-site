---
draft: true
authors: [joost-farla]
tags:
  [
    api,
    api-design,
    graphql,
    rest,
    informatiebeveiliging,
    security-by-design,
    owasp,
  ]
description: |
  De kernbelofte van GraphQL is flexibiliteit: de client bepaalt welke data
  terugkomt en over- en underfetching verdwijnen. In deel 2 van deze serie
  kijken we naar de keerzijde van die belofte, zoals onvoorspelbare
  performance, een groter aanvalsoppervlak en lastige caching, en naar de
  maatregelen waarmee je een GraphQL-API beheersbaar houdt.
---

# GraphQL onder de loep (deel 2): flexibel bevragen, en wat dat kost

In het [eerste deel](/blog/draft/graphql-1-introductie) <!-- TODO: link
bijwerken na publicatie deel 1 --> van deze serie maakten we kennis met
GraphQL: een getypeerde querytaal waarmee de client exact bepaalt welke data
hij ontvangt. Die flexibiliteit is de meest genoemde reden om voor GraphQL
te kiezen. In dit deel zetten we eerst de voordelen op een rij en kijken we
daarna naar de keerzijde: wat betekent het voor de performance en beschikbaarheid van je API
als elke client willekeurige queries kan samenstellen? En vooral: hoe stel je
daar grenzen aan?

<!-- truncate -->

<!-- TODO bij publicatie: link van deel 1 omzetten naar de definitieve URL;
deel 3 en 4 pas linken zodra die delen verschenen zijn -->

:::info[GraphQL onder de loep]

Dit artikel is deel 2 van een vierdelige serie:

1. [Een kennismaking](/blog/draft/graphql-1-introductie)
2. Flexibel bevragen, en wat dat kost (dit deel)
3. Zes uitdagingen bij schema-ontwerp (volgt)
4. Wanneer wel, en wanneer niet? (volgt)

:::

:::success[TL;DR]

GraphQL lost over- en underfetching structureel op en geeft clientteams
autonomie: nieuwe schermen zonder nieuwe endpoints. De prijs: de server
verliest de controle over de zwaarte van requests, en de database is niet
langer te optimaliseren voor een vaste set toegangspatronen. Maatregelen
zoals depth limiting, cost analysis en persisted queries zijn daarom
basisinrichting, geen optionele extra's (aldus onder meer OWASP). En
caching, bij REST grotendeels door HTTP gefaciliteerd, organiseer je in
GraphQL zelf.

:::

## De voordelen

### Exact de benodigde data, in één roundtrip

Het voorbeeld uit deel 1 liet het al zien: waar een REST-client soms drie of
vier calls nodig heeft en per call te veel of te weinig data ontvangt, haalt
een GraphQL-client alles in één request op. Voor toepassingen met veel
schermvarianten, trage netwerken of mobiele clients is dat een reëel en
meetbaar voordeel.

### Autonomie voor clientteams

Minstens zo belangrijk is het organisatorische effect. In een REST-landschap
kan een nieuw scherm een backend-aanpassing vergen: een nieuw of aangepast
endpoint en afstemming over de representatie. Met GraphQL stelt het
frontend-team zelf een nieuwe query
samen op het bestaande schema. Bij organisaties met veel consumerende teams
(of externe afnemers met uiteenlopende behoeften) scheelt dat merkbaar in
doorlooptijd en afstemming.

### Een sterk getypeerd, zelfbeschrijvend contract

Het schema is een machineleesbaar contract. Daaruit volgt tooling die in het
REST-ecosysteem alleen met een zorgvuldig onderhouden
[OpenAPI](/kennisbank/api-ontwikkeling/standaarden/openapi-specification)-document
haalbaar is: automatische validatie van elke query tegen het schema,
codegeneratie voor clients in vrijwel elke taal, en interactieve verkenning
via introspectie.

### Evolueren zonder versies

REST-API's krijgen bij breaking changes doorgaans een
[nieuwe major versie](/kennisbank/api-ontwikkeling/standaarden/api-design-rules/hoe-te-voldoen/semver).
GraphQL kiest een ander model: velden worden gemarkeerd met `@deprecated` en
blijven bestaan zolang er clients zijn die ze gebruiken:

```graphql
type Api {
  titel: String!
  documentatieUrl: String @deprecated(reason: "Gebruik `specificatieUrl`.")
  specificatieUrl: String!
}
```

Omdat elke client expliciet benoemt welke velden hij opvraagt, kan de
aanbieder precies meten welke verouderde velden nog in gebruik zijn, en bij
wie. Dat maakt gerichte uitfasering mogelijk in plaats van een "big
bang"-migratie.

## De keerzijde: de server verliest voorspelbaarheid

Bij een REST-API kent de aanbieder elk endpoint en kan die per endpoint
redeneren over de kosten: welke database-queries, hoeveel data, welke
cache-strategie. Bij GraphQL bestaat "het endpoint" niet meer: elke client
stelt zijn eigen bevraging samen. De consequentie: de zwaarte van een request
wordt bepaald door de client, niet door de aanbieder.

### Het N+1-probleem

Resolvers werken per veld. Een naïeve implementatie van ons voorbeeldschema:

```js
const resolvers = {
  Query: {
    organisaties: () => db.organisaties.findAll(),
  },
  Organisatie: {
    // wordt aangeroepen voor élke organisatie in het resultaat
    apis: (organisatie) => db.apis.findByOrganisatie(organisatie.id),
  },
};
```

Een query naar 100 organisaties met hun API's leidt zo tot 1 + 100
database-queries. Hetzelfde patroon geldt voor autorisatie: een
toegangscheck die per object wordt uitgevoerd, herhaalt zich in diezelfde
query net zo makkelijk honderd keer. Dit *N+1-probleem* is beheersbaar,
bijvoorbeeld met
batching via een [DataLoader](https://github.com/graphql/dataloader), maar
het lost zichzelf niet op en is, zoals hieronder blijkt, ook niet gratis.
Zonder maatregelen blijft het vaak onopgemerkt tot er productielast op
staat.

### Een database die zijn bevragingen niet kent

Achter het N+1-probleem gaat een structureler vraagstuk schuil. Bij een
REST-API is het aantal toegangspatronen eindig: per endpoint schrijf of
genereer je de bijbehorende database-queries, ontwerp je de juiste indexen
en kun je desnoods een toegesneden read model inrichten. De database wordt,
kortom, geoptimaliseerd voor bekende bevragingen.

Bij GraphQL is de bevragingsruimte open. Elke nieuwe query die een
clientteam samenstelt, kan een pad door de graaf volgen waarvoor geen index
of geoptimaliseerde query bestaat; de autonomie die hierboven een voordeel
was, is hier de bron van onvoorspelbaarheid. Optimalisatie wordt daarmee
reactief in
plaats van proactief: je monitort welke operaties traag zijn en bouwt
achteraf indexen bij, telkens opnieuw wanneer clients hun queries wijzigen.
Ook capaciteitsplanning wordt lastiger, omdat de databasebelasting kan
verschuiven met elke client-release, zonder dat er aan de API zelf iets
verandert.

Batching via een DataLoader verzacht dit maar gedeeltelijk. Het voorkomt
dubbele en herhaalde fetches, maar levert per nestingniveau een aparte
`WHERE id IN (...)`-query op, geen join; de queryplanner van de database
kan dus niet doen waar hij goed in is. Frameworks als Hasura en PostGraphile
kiezen daarom een andere route en vertalen een GraphQL-query naar één
SQL-statement. Dat is efficiënt, maar koppelt het schema aan het framework
en vaak ook aan de databasestructuur; op die vorm van coupling komen we in
deel 3 terug.

Kleinere kostenposten stapelen zich daarbovenop: efficiënte
cursor-paginering vereist passende indexen, en een veld als `totalCount`
kan per opgevraagde pagina een dure count-query betekenen. En ook hier
bieden de maatregelen die verderop aan bod komen verlichting: wie kiest
voor persisted queries, maakt de set bevragingen weer eindig, en daarmee
gericht te optimaliseren.

### Geneste queries en het aanvalsoppervlak

Omdat ons schema circulaire relaties bevat (een organisatie heeft API's, een
API heeft een organisatie), is dit een geldige query:

```graphql
{
  apis {
    organisatie {
      apis {
        organisatie {
          apis {
            organisatie {
              apis { titel }
            }
          }
        }
      }
    }
  }
}
```

Elke extra nesting vermenigvuldigt het aantal op te halen records. Een paar
regels querytekst kan zo miljoenen databaserijen raken. Wat voor een
legitieme client een vergissing is, is voor een kwaadwillende een goedkope
denial-of-service-aanval: de
[OWASP GraphQL Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html)
noemt dit als een van de grootste risico's van GraphQL-API's.

## Limieten stellen

Het goede nieuws: dit terrein is inmiddels volwassen. De gangbare
maatregelen, grofweg oplopend in geavanceerdheid:

**Depth en amount limiting.** Begrens de maximale nestingsdiepte van queries
en het maximale aantal op te vragen items per lijst. Eenvoudig te
implementeren (vrijwel elke GraphQL-server ondersteunt validatieregels) en
een effectieve eerste verdedigingslinie, hier met de library
`graphql-depth-limit`:

```js
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(6)],
});
```

**Verplichte paginering.** Sta geen onbegrensde lijsten toe: geef elk
lijstveld een verplicht `first`-argument met een maximum. Hoe je paginering
in het schema modelleert, komt in deel 3 uitgebreid aan bod.

**Query cost analysis.** Ken elk veld een gewicht toe en bereken vóór
uitvoering de totale kosten van een query; boven een drempel wordt de query
geweigerd. IBM ontwikkelde hiervoor een
[draft-specificatie met `@cost`- en `@listSize`-directives](https://ibm.github.io/graphql-specs/cost-spec.html),
waarop onder andere
[Apollo's Demand Control](https://www.apollographql.com/docs/graphos/routing/security/demand-control)
voortbouwt:

```graphql
type Query {
  apis(first: Int! = 20): [Api!]! @listSize(slicingArguments: ["first"])
}

type Api {
  gerelateerdeApis: [Api!]! @cost(weight: "5")
}
```

**Rate limiting op kosten in plaats van op requests.** Eén GraphQL-request
kan het werk van honderd REST-requests doen; een klassieke limiet op
"requests per minuut" zegt dus weinig. Dat verschijnsel is overigens niet
uniek voor GraphQL: ook REST-requests verschillen onderling sterk in
kosten. GraphQL maakt het alleen eerder en explicieter zichtbaar.
[Shopify beschrijft openlijk](https://shopify.engineering/rate-limiting-graphql-apis-calculating-query-complexity)
hoe het afnemers een kostenbudget per tijdseenheid geeft, berekend uit de
complexiteit van hun queries; GitHub hanteert een
[vergelijkbaar puntensysteem](https://docs.github.com/en/graphql/overview/rate-limits-and-node-limits-for-the-graphql-api)
voor zijn GraphQL-API.

**Persisted queries / trusted documents.** De meest vergaande maatregel:
sta alleen queries toe die vooraf zijn geregistreerd. Clients sturen niet
langer querytekst mee, maar een identifier van een bekend, goedgekeurd
document, bijvoorbeeld een SHA-256-hash (de benoemde operaties uit deel 1
lenen zich daar precies voor):

```json
{
  "documentId": "8e2f9b41…",
  "variables": { "id": "min-bzk" }
}
```

Er loopt een
[RFC om dit te standaardiseren](https://github.com/graphql/graphql-over-http/blob/main/rfcs/PersistedOperations.md)
als onderdeel van de GraphQL over HTTP-specificatie. De observatie die
daarbij hoort: wie alleen nog vooraf geregistreerde queries toestaat, heeft
de facto weer een eindige set endpoints gecreëerd. Dat is een interessante
relativering van de flexibiliteitsbelofte, al blijft het voordeel bestaan
dat clientteams die "endpoints" zelf definiëren zonder backend-wijziging.

**Operationele basishygiëne.** Timeouts op queryniveau, limieten op
request-batching, en introspectie uitschakelen (of afschermen) in productie
voor API's die niet publiek bedoeld zijn: allemaal terug te vinden in de
eerdergenoemde OWASP Cheat Sheet.

## Caching: wat HTTP aan REST meegeeft

Er is nog een tweede prijs, en die is minder direct zichtbaar. Een REST-API
kan voor caching grotendeels leunen op het web zelf: elke resource heeft een
unieke URL, `GET`-responses zijn met standaard HTTP-headers
(`Cache-Control`, `ETag`) cachebaar, en elke CDN, proxy of browser kan
daarmee overweg, mits de aanbieder die headers correct zet.

GraphQL-verkeer loopt daarentegen vrijwel altijd als `POST` naar één
endpoint. Voor een cache is elk request daarmee uniek en oncachebaar; de
[eigen documentatie van graphql.org](https://graphql.org/learn/caching/)
erkent dat het URL-mechanisme waarop HTTP-caching leunt, in GraphQL
ontbreekt. De gangbare mitigaties:

- `GET` gebruiken voor query-operaties, met de query in de URL (begrensd
  door URL-lengtelimieten);
- persisted queries combineren met `GET`: een korte hash in de URL maakt
  responses wél CDN-cachebaar;
- caching verplaatsen naar de client (genormaliseerde caches zoals die van
  Apollo Client of Relay) of naar de server (per-veld caching in resolvers).

Het kán dus allemaal, maar waar caching bij REST een eigenschap van het
platform is, is het bij GraphQL een bouwopgave. Voor API's die leunen op
CDN-caching, zoals veelbevraagde open-data-API's, weegt dit verschil zwaar.

## De balans

De flexibiliteit van GraphQL is geen gratis eigenschap, maar een verschuiving
van verantwoordelijkheid: van ontwerptijd (de aanbieder ontwerpt endpoints)
naar runtime (de aanbieder bewaakt wat clients samenstellen). Wie GraphQL
serieus inzet, plant depth limiting, cost analysis, monitoring per operatie
en een cachingstrategie daarom in als onderdeel van de basisinrichting, niet
als optimalisatie achteraf.

In deel 3 <!-- TODO: linken zodra deel 3 is gepubliceerd --> verleggen we de
blik van runtime naar ontwerptijd: wat komt
er kijken bij het ontwerpen van een goed GraphQL-schema, en waarom blijkt dat
in de praktijk lastiger dan de voorbeelden doen vermoeden?
