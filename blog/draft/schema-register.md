---
description:
  "Het Schema-register van developer.overheid.nl is live. Je vindt er JSON
  Schema's om te hergebruiken, met per schema een health-score, de dependencies
  en een gebundelde versie. Het register is nog in bèta, want hoe een goed
  schema eruitziet, spreken we samen af in de nieuwe werkgroep Schema Design
  Rules."
authors: [dimitri-van-hees]
tags:
  - json-schema
  - openapi
  - oas
  - api-design
  - kennisplatform-apis
  - standaarden
draft: true
---

# Het Schema-register is live

Wie een API bouwt, beschrijft de gegevens die erdoorheen gaan. Een adres, een
organisatie, een foutmelding: binnen de overheid zijn die al talloze keren
gemodelleerd, en bijna altijd net even anders. Daar willen we vanaf. Sinds begin
november staat het [Schema-register](https://schemas.developer.overheid.nl)
live, de plek waar je herbruikbare JSON Schema's van de overheid vindt. Het
register is nog in bèta, omdat de afspraken over hoe een goed schema eruitziet
nog gemaakt moeten worden. Dat doen we samen, in de nieuwe werkgroep Schema
Design Rules van het Kennisplatform API's.

<!-- truncate -->

:::success[TL;DR]

- Het Schema-register op
  [schemas.developer.overheid.nl](https://schemas.developer.overheid.nl) is
  live, in bèta. Per schema zie je een health-score, de dependencies en een
  gebundelde versie.
- Een `$ref` naar het register is prima tijdens het ontwerpen, maar kopieer of
  bundel het schema voordat je het in productie gebruikt. URL's en versionering
  liggen nog niet vast.
- Per 1 januari 2027 is OpenAPI 3.1 de verplichte standaard. Daarmee wordt JSON
  Schema 2020-12 volledig ondersteund en is hergebruik van schema's tussen API's
  eindelijk technisch mogelijk.
- JSON Schema is er niet alleen voor API's, maar ook voor berichten, validators,
  generators en AI. Juist als je AI inzet, wil je tools in de loop houden, en
  een schema is zo'n tool.
- De werkgroep Schema Design Rules stelt afspraken op voor JSON Schema, naast de
  API Design Rules. De discussie loopt op
  [GitHub](https://github.com/Geonovum/KP-APIs/issues?q=label%3A%22WG%3A%20Schema%20design%20rules%22),
  en iedereen kan meedoen.
- Een schema toevoegen doe je met een pull request.

:::

## Waarom een Schema-register?

Het idee is niet nieuw. Toen we in maart 2025
[de nieuwe versie van developer.overheid.nl](/blog/2025/03/13/nieuwe-versie-developer-overheid-nl)
aankondigden, noemden we `schemas.developer.overheid.nl` al als mogelijke plek
voor herbruikbare schema's. Een paar maanden later, in onze blogpost over
[OpenAPI 3.1](/blog/2025/07/10/openapi-31-in-zicht), schreven we dat er naast de
API Design Rules waarschijnlijk ook "JSON Schema Design Rules" moesten komen, en
dat we daarvoor goed zouden kijken naar het schema-register van de Britse DVLA.
Het register staat er nu, en aan de regels wordt gewerkt.

Dat het juist nu komt, heeft alles te maken met OpenAPI 3.1. Per 1 januari 2027
is dat de verplichte standaard voor API's van de overheid. Waar OAS 3.0 nog een
eigen dialect van JSON Schema gebruikte, ondersteunt 3.1 JSON Schema 2020-12
volledig. Daardoor kun je vanuit je OpenAPI-document met een `$ref` verwijzen
naar een schema dat iemand anders al heeft gemaakt, en kun je alle tooling
gebruiken die er voor JSON Schema bestaat. Dat maakt een register zinvol: één
plek waar die schema's te vinden, te beoordelen en te hergebruiken zijn.

## Meer dan API's

JSON Schema is veel meer dan het `schema`-veld in een OpenAPI-document. Dezelfde
schema's beschrijven berichten in [AsyncAPI](https://www.asyncapi.com) en de
gegevens in een
[CloudEvent](/kennisbank/api-ontwikkeling/standaarden/cloudevents). Validators
toetsen er gegevens mee, en generators maken er TypeScript-types, classes,
formulieren en documentatie van. Overal waar gegevens tussen systemen worden
uitgewisseld, kan een JSON Schema vastleggen hoe die eruitzien. Een schema uit
het register is dus niet alleen bruikbaar voor wie een API bouwt.

In het huidige AI-tijdperk wordt dat alleen maar belangrijker. In
[Tools in the loop](/blog/2026/07/2/tools-in-the-loop) schreven we dat je naast
de mens ook de _tools_ in de loop moet houden: generators die het zware werk
doen en validators die de regels bewaken. Een JSON Schema is precies zo'n vaste
set regels. Een taalmodel genereert plausibel ogende code en data, maar of die
klopt, beantwoordt een validator met een schema, niet het model. En een agent
die een API bouwt, hoeft een adres of een organisatie niet zelf te verzinnen als
hij in het register kan vinden wat er al is. Dat scheelt hallucinaties, en het
scheelt tokens.

Dat werkt alleen als schema's eenduidig zijn. Een schema zonder `title` of
`description` begrijpt een agent net zo slecht als een mens, en elke
inconsistentie in een schema komt terug in alles wat je ermee genereert. Daarom
zijn "geschikt voor AI" en "productieklaar" twee van de toetsstenen voor de
Schema Design Rules.

## Wat je in het register vindt

Het register draait op [Sourcemeta One](https://one.sourcemeta.com), met een
eigen front-end in de stijl van developer.overheid.nl. Je kunt zoeken op titel
en filteren op type en JSON Schema-dialect. Per schema zie je:

- de beschrijving en een tabel met alle eigenschappen, inclusief type, of ze
  verplicht zijn en het `format`
- het schema zelf, ook als gebundelde versie waarin alle verwijzingen zijn
  opgenomen, en een link om het te openen in de JSON Schema Viewer
- de dependencies, in twee richtingen: naar welke schema's dit schema verwijst,
  en welke schema's naar dit schema verwijzen
- een health-score, met de gevonden issues en per issue een JSON pointer naar de
  plek in het schema

Neem het schema `Organisation`, dat een overheidsorganisatie aanduidt met haar
[TOOI](https://standaarden.overheid.nl/tooi)-identifier. In het register zie je
direct dat de schema's `Api` en `Repository` ernaar verwijzen. Pas je
`Organisation` aan, dan weet je dus ook welke schema's daar last van kunnen
hebben.

Het register begint met twee collecties: de schema's uit de API Design Rules,
zoals Problem Details, en herbruikbare schema's van developer.overheid.nl zelf,
zoals `Organisation`, `Api` en `Repository`.

## Health: hoe gezond is een schema?

Elk schema krijgt in het register een health-score, uitgedrukt in een
percentage. Daaronder staan de gevonden health issues, elk met een JSON pointer
naar de plek in het schema waar het om gaat. Zo zie je niet alleen dát er iets
schort, maar ook precies waar. Op het moment van schrijven vindt het register
onder meer:

- **Geen `examples` op het hoogste niveau.** Bijna elk schema in het register
  heeft dit issue. Zonder voorbeeld moet een mens, of een agent, raden hoe
  geldige gegevens eruitzien.
- **Een `description` die eindigt met een punt.** De regel gaat ervan uit dat
  een gebruikersinterface zelf bepaalt hoe de tekst wordt getoond, en dan zit
  een punt in de weg.
- **`type` naast `enum`.** Als de toegestane waarden al vastliggen, volgt het
  type daaruit. Het schema `API Lifecycle` doet dat bijvoorbeeld bij `status`.
- **Een `$ref` verpakt in een `allOf`.** Dat was alleen nodig in draft 7 en
  ouder. Sinds 2020-12 mag een `$ref` gewoon naast andere keywords staan, zoals
  verderop bij de Polygon. `Problem Details for Bad Request` krijgt dit issue.

Deze regels komen op dit moment uit de ingebouwde set van Sourcemeta One. Dat is
een goed startpunt, maar het zijn niet de afspraken van de overheid. Over
sommige regels zullen we het eens zijn, over andere niet, en welke regels er
gelden, bepaalt de werkgroep. Zodra de Schema Design Rules er zijn en in een
ruleset staan, kunnen we de score daarop gaan baseren, zoals de ADR-score in het
[API-register](https://apis.developer.overheid.nl) laat zien in hoeverre een API
aan de API Design Rules voldoet. Dan zegt de health-score niet alleen of een
schema technisch netjes is, maar ook of het voldoet aan wat we binnen de
overheid hebben afgesproken.

## Bèta: kopieer voordat je in productie gaat

Op elke pagina van het register staat een melding:

> Het Schema-register is in beta: kopieer een schema voordat je het in productie
> gebruikt.

URL's, bestandsnamen en versionering worden onderdeel van de Schema Design
Rules, en die zijn nog niet vastgesteld. Een `$ref` naar het register is daarom
nog niet stabiel. Tijdens het ontwerpen kun je er gerust naar verwijzen, maar
haal het schema binnen of bundel het voordat je het in productie gebruikt.

## Hoe ziet het er nu uit?

Om te zien waar we staan, hebben we op een testomgeving een experiment gedaan.
Uit alle API's in het [API-register](https://apis.developer.overheid.nl) hebben
we elk schema geëxtraheerd, ook de geneste en inline schema's. Dat is niet hoe
we het register willen vullen, maar het werkt wel als spiegel. Wat we zagen:

- veel schema's zonder `title` of `description`, waardoor niet duidelijk is wat
  ze voorstellen
- foutmeldingsschema's in talloze varianten, terwijl
  [Problem Details](https://www.rfc-editor.org/rfc/rfc9457) er één keer zou
  moeten zijn
- `examples` die niet kloppen met het type, zoals een getal bij `type: string`
- veel schema's met dezelfde structuur, maar andere annotaties

Dat laatste is een mooi voorbeeld van waar afspraken helpen. Een GeoJSON Polygon
voor de contour van een gebouw en die voor een postcodegebied hebben precies
dezelfde structuur. Alleen de `description` en de `examples` verschillen, en dus
staan ze er als losse schema's in. Sinds OpenAPI 3.1 mogen annotaties naast een
`$ref` staan, zodat je de structuur kunt hergebruiken en de betekenis per plek
beschrijft:

```json
{
  "contour": {
    "$ref": "./Polygon.schema.json",
    "description": "De contour van het gebouw."
  }
}
```

Zonder afspraken krijg je tientallen manieren om een adres te modelleren, en
schrijft elke afnemer eigen code om ze om te zetten. Een schema dat je niet
begrijpt, hergebruik je niet, en een AI-agent ook niet. Een register vol
varianten is geen register, maar een archief.

## Schema Design Rules

Daarom is er een nieuwe werkgroep van het
[Kennisplatform API's](/kennisbank/api-ontwikkeling/communities/kennisplatform-apis/):
de werkgroep Schema Design Rules. De kick-off was op 28 oktober bij Geonovum,
met deelnemers van Geonovum, Gemeente Amsterdam, VNG en Logius.

De verhouding met de API Design Rules is eenvoudig. De ADR gaan over URL-paden,
queryparameters en het gedrag van een API. De Schema Design Rules gaan over wat
er in de request- en response-bodies, berichten en andere gegevensstructuren
staat. De ADR kunnen zeggen "gebruik JSON Schema", de Schema Design Rules zeggen
hoe. En omdat JSON Schema veel breder wordt gebruikt dan alleen in OpenAPI,
bijvoorbeeld in AsyncAPI, validators, generators en bij AI, verdient dat een
eigen set afspraken.

We beginnen klein, met een versie 0.1 met concrete regels. We werken zoals bij
de ADR: één issue per onderwerp, elk issue begint met een concreet voorstel, en
de regels worden uitgewerkt in rulesets die we met
[OpenLint](/blog/2026/11/04/openlint-vervangt-spectral) kunnen toetsen. Het
register en de regels staan daarbij los van elkaar. Een regel moet ook buiten
het register te onderbouwen zijn.

Er staan al issues klaar. Een paar onderwerpen hebben al een concreet voorstel,
zoals een verplichte
[`title` en `description`](https://github.com/Geonovum/KP-APIs/issues/687),
[examples die valideren](https://github.com/Geonovum/KP-APIs/issues/689) tegen
het schema en
[externe `$ref`s die resolven](https://github.com/Geonovum/KP-APIs/issues/691).
Andere onderwerpen zijn lastiger, zoals
[versionering](https://github.com/Geonovum/KP-APIs/issues/692),
[custom extensions en annotaties](https://github.com/Geonovum/KP-APIs/issues/693)
en
[veldnamen en property casing](https://github.com/Geonovum/KP-APIs/issues/699).

## Een schema toevoegen

Heb je een schema dat anderen kunnen hergebruiken? Voeg het toe met een pull
request op
[developer-overheid-nl/don-static](https://github.com/developer-overheid-nl/don-static/tree/main/assets/schemas).
Geef het een bestandsnaam als `<Naam>.schema.json`, en zorg in ieder geval voor
een `$schema`, een `$id`, een `title` en een `description`. Vermeld in de pull
request bij welke organisatie het schema hoort en wie het beheert. De
[README](https://github.com/developer-overheid-nl/don-static/tree/main/assets/schemas)
beschrijft de huidige werkwijze. Ook die is nog geen standaard, maar een
startpunt voor de werkgroep.

We zoeken daarnaast schema's om de regels aan te toetsen. We kijken nu onder
meer naar Problem Details, CloudEvents, de basisregistraties, de schema's van
VNG en geoschema's van PDOK, Geonovum, OGC en Kadaster. Heb je schema's uit een
ander domein, ook als ze nu nog onderdeel zijn van een OpenAPI-document, dan
horen we dat graag. Hoe breder de toetsset, hoe beter de regels.

## Doe mee

- Denk mee over de Schema Design Rules in de
  [issues op GitHub](https://github.com/Geonovum/KP-APIs/issues?q=label%3A%22WG%3A%20Schema%20design%20rules%22),
  of maak zelf een issue aan.
- Wil je aansluiten bij de werkgroep of op de hoogte blijven? Mail naar
  [api@geonovum.nl](mailto:api@geonovum.nl).
- Vragen of ideeën over het register zelf? Mail naar
  [developer.overheid@geonovum.nl](mailto:developer.overheid@geonovum.nl) of
  laat het weten in
  [#developer-overheid.nl](https://codefornl.slack.com/archives/CFV4B3XE2) op de
  Slack van Code for NL.
