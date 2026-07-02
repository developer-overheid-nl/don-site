---
authors: [matthijs-hovestad]
tags:
  - api
  - openapi
  - api-design
  - codegen
  - adr
  - developer.overheid.nl
  - open-source
description: |
  Met de codegen templates van developer.overheid.nl kun je vanuit een
  gevalideerde OpenAPI-specificatie een startbare API-applicatie genereren in
  meerdere programmeertalen. Dat maakt design-first werken concreter: eerst het
  contract goed krijgen, daarna sneller naar werkende code.
---

# Van OpenAPI-specificatie naar startbare API-app

Een goede API begint niet bij de controller, maar bij het contract. In de
[Bouw een API-tutorial](/kennisbank/api-ontwikkeling/tutorials/bouw-een-api)
laten we zien hoe je vanuit een gevalideerde OpenAPI Specification servercode
genereert. Tot nu toe lag de nadruk daar vooral op een Express-template als
demonstratie. Inmiddels hebben we de template-repository uitgebreid met meer
runtimes en programmeertalen.

Dat klinkt misschien als een kleine toolingstap, maar het raakt een praktisch
probleem dat veel teams herkennen: hoe kom je van een nette OAS naar een
applicatie die dezelfde afspraken ook echt afdwingt?

<!-- truncate -->

Dit artikel zoomt bewust in op één concrete stap: codegeneratie na het
ontwerpen en valideren van je API-contract. Niet de hele toolingketen, maar de
vraag wat er gebeurt zodra je OAS klaar is en je team met implementeren wil
beginnen.

## Waarom templates?

OpenAPI Generator kan code genereren voor tientallen talen en frameworks. Dat is
handig, maar de standaard output is generiek. Voor een API bij de Nederlandse
overheid wil je juist dat de gegenereerde applicatie aansluit op de manier
waarop we API's ontwerpen:

- de OpenAPI-specificatie is het contract;
- request-validatie gebeurt op basis van dat contract;
- foutmeldingen gebruiken `application/problem+json`;
- de gegenereerde code heeft duidelijke plekken voor businesslogica;
- de oorspronkelijke OAS blijft gepubliceerd bij de applicatie;
- de output is geschikt als startpunt voor implementatie, niet als losstaande
  eindoplossing.

Daarvoor gebruiken we de
[codegen-templates repository](https://github.com/developer-overheid-nl/codegen-templates).
Die bevat aangepaste templates bovenop OpenAPI Generator. Je gebruikt dus nog
steeds de bekende generator, maar met projecttemplates die beter passen bij de
design-first workflow op developer.overheid.nl.

## Wat kun je ermee?

De basisflow is hetzelfde als in de tutorial:

1. Maak of onderhoud je OpenAPI-specificatie.
2. Valideer die specificatie met de DON Checker of ADR-ruleset.
3. Bundel externe `$ref`s, zodat de generator een zelfstandig bestand krijgt.
4. Genereer een applicatie met een template.
5. Implementeer de businesslogica op de daarvoor bedoelde plekken.

Bijvoorbeeld:

```sh
npx @redocly/cli bundle ./openapi.json \
  --output openapi.bundled.json \
  --ext json

npx @developer-overheid-nl/don-checker@latest validate \
  --ruleset adr-21 \
  --input openapi.bundled.json

git clone https://github.com/developer-overheid-nl/codegen-templates.git
```

Daarna kies je de runtime die past bij je team of applicatie.

## Beschikbare templates

Op dit moment bevat de repository templates voor:

| Template                  | Runtime            | Waarvoor handig                                                                                |
| ------------------------- | ------------------ | ---------------------------------------------------------------------------------------------- |
| `nodejs-express-server`   | Node.js + Express  | Een eenvoudige serverstub of mockserver, vergelijkbaar met de tutorial.                        |
| `nestjs-fastify`          | NestJS + Fastify   | Een TypeScript-app met abstracte API classes, runtime-validatie, mock mode en problem-details. |
| `go-gin-template`         | Go + Gin           | Een compacte Go serverstub met interfaces per API-groep.                                       |
| `java-spring-boot`        | Java + Spring Boot | Een Spring Boot-app met delegate interfaces, Bean Validation en problem-details.               |
| `rust-axum-template`      | Rust + Axum        | Een Rust crate met Axum-router, API traits en request-validatie.                               |
| `python-fastapi-template` | Python + FastAPI   | Een FastAPI-app met Pydantic-validatie, routers per API-groep en problem-details.              |

De Node.js- en NestJS-templates zijn het meest uitgewerkt. De Go-, Java-, Rust-
en Python-templates zijn toegevoegd als basisvarianten en moeten nog verder in
echte API-applicaties worden beproefd.

## Wat levert de gegenereerde code op?

De templates genereren geen complete productieapplicatie. Ze geven je een
startpunt waarin het saaie en foutgevoelige werk al is gedaan.

Denk aan:

- routes die overeenkomen met de paden uit je OAS;
- modellen/types op basis van de schemas;
- request-validatie voor parameters en bodies;
- controllers, services, delegates, traits of base classes waar je eigen code
  aan koppelt;
- standaardresponses voor ontbrekende implementaties;
- publicatie van het broncontract of runtime OpenAPI-document, bijvoorbeeld via
  `/openapi.yaml` of `/openapi.json`.

De belangrijkste winst zit in de scheiding tussen contract en implementatie. De
OAS bepaalt welke operatie bestaat, welke parameters geldig zijn en welke
schemas over de lijn gaan. De gegenereerde code volgt dat contract. Je team kan
zich daarna richten op de domeinlogica: databases, autorisatie, integraties,
logging, monitoring en testen.

## Een voorbeeld: NestJS of FastAPI

Voor een NestJS-app ziet genereren er bijvoorbeeld zo uit:

```sh
npx @openapitools/openapi-generator-cli generate \
  -i openapi.bundled.json \
  -g typescript-nestjs-server \
  -o ./generated-api-nestjs \
  -t ./codegen-templates/nestjs-fastify \
  -c ./codegen-templates/nestjs-fastify/generator-config.yaml \
  --skip-validate-spec \
  --additional-properties=npmName=generated-api-nestjs,npmVersion=1.0.0,nestVersion=11.0.0,rxjsVersion=7.8.2,tsVersion=5.9.3,nodeVersion=22.0.0
```

De template maakt abstracte API classes en controllers. Je koppelt je eigen
implementaties via de gegenereerde module. Ontbreekt een implementatie, dan
krijg je standaard een `501 application/problem+json` response. Dat is handig in
de ontwikkeling: je ziet direct welke operatie nog geen echte invulling heeft.

Voor Python/FastAPI is het patroon vergelijkbaar:

```sh
npx @openapitools/openapi-generator-cli generate \
  -i openapi.bundled.json \
  -g python-fastapi \
  -o ./generated-api-python \
  -t ./codegen-templates/python-fastapi-template \
  -c ./codegen-templates/python-fastapi-template/generator-config.yaml \
  --additional-properties=packageName=generated_api_python,packageVersion=1.0.0,serverPort=1337
```

FastAPI en Pydantic verzorgen de request-validatie. De template zet
validatiefouten om naar `400 application/problem+json` en maakt per API-groep
base classes waar je implementatie van kan erven.

## Waarom is dit handig?

Codegeneratie wordt soms gezien als iets dat vooral boilerplate bespaart. Dat
doet het ook, maar voor API-ontwikkeling is het belangrijker dat het de
werkwijze expliciet maakt.

Als je eerst code schrijft en daarna documentatie genereert, ontstaat er snel
discussie over wat leidend is. Is de controller de waarheid? De documentatie?
Een test? Een wiki? Bij design-first is de OAS de afspraak. De templates helpen
om die afspraak niet alleen te publiceren, maar ook te gebruiken in de
applicatie zelf.

Dat heeft een paar voordelen:

- reviewers kunnen eerst het contract beoordelen voordat er implementatiedetails
  bijkomen;
- frontend- en backendteams kunnen eerder parallel werken;
- mockservers en gegenereerde stubs maken testen eerder mogelijk;
- afwijkingen van de API Design Rules worden eerder gevonden;
- teams kunnen in verschillende talen werken zonder de API-werkwijze telkens
  opnieuw uit te vinden.

Voor overheidsorganisaties is dat extra relevant. API's worden vaak door andere
organisaties gebruikt, soms jaren nadat het oorspronkelijke team alweer
veranderd is. Een duidelijk contract en voorspelbare foutafhandeling maken zo'n
API beter beheerbaar.

## Geen magie, wel een betere start

De templates nemen niet alles over. Je moet nog steeds nadenken over security,
autorisatie, logging, performance, datamodellering en beheer. Je moet ook de
gegenereerde code testen in je eigen stack. Zeker de nieuwere templates vragen
nog praktijkervaring en bijdragen uit projecten.

Maar ze verlagen wel de drempel om goed te beginnen. In plaats van een leeg
frameworkproject krijg je een applicatie die al weet welke operaties bestaan,
welke input geldig is en waar je de implementatie moet plaatsen.

## Meedoen

De templates zijn open source. Gebruik ze, probeer ze uit op een bestaande OAS
en open vooral issues of pull requests als je iets mist of verbetert.

<Link href="https://github.com/developer-overheid-nl/codegen-templates">
  Bekijk de codegen templates op GitHub
  <Icon icon="pijl-naar-rechts" />
</Link>

<br/>

<Link href="/kennisbank/api-ontwikkeling/tutorials/bouw-een-api/genereer-api-code">
  Lees de tutorial over API-code genereren
  <Icon icon="pijl-naar-rechts" />
</Link>
