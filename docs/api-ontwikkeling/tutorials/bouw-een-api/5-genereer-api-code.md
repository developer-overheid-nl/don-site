---
content_type: tutorial
tags:
  - api
  - openapi
  - oas
  - open-source
  - development
---

# 5. Genereer API code

Nu we een gevalideerde OpenAPI Specification hebben, kunnen we automatisch
servercode genereren. We gebruiken hiervoor
[OpenAPI Generator](https://openapi-generator.tech/), een populaire open-source
tool die code kan genereren in tientallen programmeertalen en frameworks.

## Voorbereiding

Zorg dat we de volgende zaken klaar hebben:

1. **Het OAS bestand** - Sla de OAS uit de Swagger Editor op als `openapi.json`
2. **Node.js** - Controleer met `node --version` dat Node.js 22+ geïnstalleerd
   is. Dit hebben we nodig voor de `npx` tooling en voor de NestJS-template.
   [Download Node.js](https://nodejs.org/)
3. **Java** - OpenAPI Generator is een Java applicatie. Controleer met
   `java --version` dat Java 11+ geïnstalleerd is.
   [Download Java](https://www.java.com/en/download/manual.jsp)
4. **Runtime voor je template** - Kies je later voor een Go-, Java-, Rust- of
   Python-template? Zorg dan ook dat die runtime lokaal beschikbaar is. De
   template-repository noemt de actuele minimale versies.

:::note npx

We gebruiken `npx` om tools uit te voeren zonder ze eerst globaal te
installeren. Met `npx` worden packages automatisch gedownload en uitgevoerd. De
eerste keer kan dit even duren, daarna worden ze gecached.

:::

## Bundlen

Onze OAS bevat `$ref` verwijzingen naar externe URL's, zoals
`https://static.developer.overheid.nl/adr/components.yaml` voor standaard
headers en error responses. Dit is handig omdat we zo herbruikbare
ADR-componenten kunnen gebruiken, maar de OpenAPI Generator kan niet overweg met
externe referenties.

We moeten de OAS daarom eerst bundlen. Dit betekent dat externe verwijzingen
worden opgehaald en als interne `$ref` verwijzingen in het document worden
opgenomen. Het resultaat is een zelfstandig bestand zonder externe
afhankelijkheden.

Dit doen we met [Redocly CLI](https://redocly.com/docs/cli/):

```bash
npx @redocly/cli bundle ./openapi.json --output openapi.bundled.json --ext json
```

Dit haalt externe referenties op en zet ze om naar interne `$ref` verwijzingen
binnen het document. Gebruik `openapi.bundled.json` als input voor de volgende
stappen.

Valideer de gebundelde OAS ook nog een keer voordat je code genereert:

```bash
npx @developer-overheid-nl/don-checker@latest validate \
  --ruleset adr-21 \
  --input openapi.bundled.json
```

:::tip Volledig platslaan

Sommige tools ondersteunen ook interne `$ref` verwijzingen niet. In dat geval
kunnen we de `--dereferenced` flag toevoegen om alles volledig plat te slaan:

```bash
npx @redocly/cli bundle ./openapi.json --output openapi.bundled.json --ext json --dereferenced
```

Het resultaat bevat dan geen enkele `$ref` meer; alle schemas zijn volledig
inline geplaatst.

:::

## Code genereren

### Stap 1: Clone de codegen templates

We hebben aangepaste templates gemaakt die beter aansluiten bij de ADR en de
design-first workflow. Clone de template-repository naar de werkdirectory:

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="SSH">
    ```bash
    git clone git@github.com:developer-overheid-nl/codegen-templates.git
    ```
  </TabItem>
  <TabItem value="HTTPS">
    ```bash
    git clone https://github.com/developer-overheid-nl/codegen-templates.git
    ```
  </TabItem>
  <TabItem value="GitHub CLI">
    ```bash
    gh repo clone developer-overheid-nl/codegen-templates
    ```
  </TabItem>
</Tabs>

### Stap 2: Kies een template

De repository bevat templates voor meerdere runtimes:

| Template                  | Generator                  | Runtime            | Gebruik wanneer                                                                             |
| ------------------------- | -------------------------- | ------------------ | ------------------------------------------------------------------------------------------- |
| `nodejs-express-server`   | `nodejs-express-server`    | Node.js + Express  | Je snel een eenvoudige JavaScript serverstub of mockserver wilt.                            |
| `nestjs-fastify`          | `typescript-nestjs-server` | NestJS + Fastify   | Je een TypeScript/NestJS basisapp met runtime-validatie, mock mode en problem-details wilt. |
| `go-gin-template`         | `go-gin-server`            | Go + Gin           | Je een compacte Go serverstub wilt die aansluit op bestaande DON Go-apps.                   |
| `java-spring-boot`        | `spring`                   | Java + Spring Boot | Je een Spring Boot-app met delegate interfaces, Bean Validation en problem-details wilt.    |
| `rust-axum-template`      | `rust-axum`                | Rust + Axum        | Je een Rust crate met Axum-router, API traits en request-validatie wilt.                    |
| `python-fastapi-template` | `python-fastapi`           | Python + FastAPI   | Je een FastAPI-app met Pydantic-validatie, routers per API-groep en problem-details wilt.   |

In deze tutorial gebruiken we `nestjs-fastify`. Die template genereert een
TypeScript-app met NestJS, Fastify, runtime-validatie op basis van de OAS, mock
mode en `application/problem+json` foutafhandeling. De Express-template is nog
steeds handig voor een eenvoudige JavaScript serverstub. De Go-, Java-, Rust- en
Python-templates zijn basisvarianten en moeten nog verder in echte
API-applicaties worden beproefd.

De gegenereerde code is **niet productiewaardig**. Zie het als een startpunt:
routes, validatie, basisfoutafhandeling en duidelijke plekken voor je eigen
businesslogica zijn al ingericht, maar security, autorisatie, logging,
databasetoegang, monitoring en tests moet je zelf toevoegen.

:::tip Andere generators

Op de
[OpenAPI Generator website](https://openapi-generator.tech/docs/generators) vind
je tientallen andere generators voor verschillende talen en frameworks. Die kun
je ook gebruiken, maar dan mis je de ADR-specifieke aanpassingen uit de
DON-templates.

:::

### Stap 3: Genereer de NestJS server

Voor deze tutorial genereren we een NestJS server met Fastify:

```bash
npx @openapitools/openapi-generator-cli generate \
  -i ./openapi.bundled.json \
  -g typescript-nestjs-server \
  -o ./generated-api-nestjs \
  -t ./codegen-templates/nestjs-fastify \
  -c ./codegen-templates/nestjs-fastify/generator-config.yaml \
  --skip-validate-spec \
  --additional-properties=npmName=bier-api-nestjs,npmVersion=1.0.0,nestVersion=11.0.0,rxjsVersion=7.8.2,tsVersion=5.9.3,nodeVersion=22.0.0
```

Kopieer daarna dezelfde gebundelde OAS naar de runtime-locatie van de
gegenereerde app:

```bash
cp ./openapi.bundled.json ./generated-api-nestjs/api/openapi.yaml
```

De runtime gebruikt dit bestand bij het starten. Door de gebundelde OAS te
kopiëren weet de gegenereerde app exact welk contract hij moet valideren en
publiceren.

| Parameter | Betekenis                                         |
| --------- | ------------------------------------------------- |
| `-i`      | Input: pad naar de OpenAPI Specification          |
| `-g`      | Generator: welke taal/framework (`typescript-nestjs-server`) |
| `-o`      | Output: map waar de code gegenereerd wordt        |
| `-t`      | Templates: pad naar de aangepaste template        |
| `-c`      | Configuratiebestand van de gekozen template       |

Gebruik een van deze commando's als je een andere template wilt proberen:

<Tabs>
  <TabItem value="express" label="Express">

    ```bash
    npx @openapitools/openapi-generator-cli generate \
      -i ./openapi.bundled.json \
      -g nodejs-express-server \
      -o ./generated-api-express \
      -t ./codegen-templates/nodejs-express-server \
      --additional-properties=projectName=bier-api-express
    ```

  </TabItem>
  <TabItem value="go" label="Go">

    ```bash
    npx @openapitools/openapi-generator-cli generate \
      -i ./openapi.bundled.json \
      -g go-gin-server \
      -o ./generated-api-go \
      -t ./codegen-templates/go-gin-template \
      -c ./codegen-templates/go-gin-template/generator-config.yaml \
      --additional-properties=packageName=api_client,apiPath=pkg/api_client,serverPort=1337 \
      --git-host github.com \
      --git-user-id jouw-organisatie \
      --git-repo-id bier-api-go
    ```

  </TabItem>
  <TabItem value="java" label="Java">

    ```bash
    npx @openapitools/openapi-generator-cli generate \
      -i ./openapi.bundled.json \
      -g spring \
      -o ./generated-api-java \
      -t ./codegen-templates/java-spring-boot \
      -c ./codegen-templates/java-spring-boot/generator-config.yaml \
      --additional-properties=groupId=nl.example,artifactId=bier-api-java,artifactVersion=1.0.0,basePackage=nl.example.bierapi,apiPackage=nl.example.bierapi.api,modelPackage=nl.example.bierapi.model
    ```

  </TabItem>
  <TabItem value="rust" label="Rust">

    ```bash
    npx @openapitools/openapi-generator-cli generate \
      -i ./openapi.bundled.json \
      -g rust-axum \
      -o ./generated-api-rust \
      -t ./codegen-templates/rust-axum-template \
      -c ./codegen-templates/rust-axum-template/generator-config.yaml \
      --additional-properties=packageName=bier-api-rust,packageVersion=1.0.0
    ```

  </TabItem>
  <TabItem value="python" label="Python">

    ```bash
    npx @openapitools/openapi-generator-cli generate \
      -i ./openapi.bundled.json \
      -g python-fastapi \
      -o ./generated-api-python \
      -t ./codegen-templates/python-fastapi-template \
      -c ./codegen-templates/python-fastapi-template/generator-config.yaml \
      --additional-properties=packageName=bier_api_python
    ```

  </TabItem>
</Tabs>

### Stap 4: Bekijk de gegenereerde structuur

Na het genereren met de NestJS-template hebben we onder andere deze
mapstructuur:

```
generated-api-nestjs/
├── api/                    # OpenAPI specificatie en abstracte API classes
│   ├── BierenApi.ts
│   ├── BierstijlenApi.ts
│   ├── BrouwerijenApi.ts
│   ├── index.ts
│   └── openapi.yaml
├── app/                    # NestJS module en bootstrap
│   ├── api-implementations.ts
│   ├── api.module.ts
│   └── index.ts
├── controllers/            # NestJS controllers
│   ├── BierenApi.controller.ts
│   ├── BierstijlenApi.controller.ts
│   ├── BrouwerijenApi.controller.ts
│   └── index.ts
├── decorators/             # Helpers voor headers en cookies
│   ├── cookies-decorator.ts
│   ├── headers-decorator.ts
│   └── index.ts
├── models/                 # Types op basis van de schemas
│   ├── bier.ts
│   ├── bierstijl.ts
│   ├── brouwerij-adres.ts
│   ├── brouwerij.ts
│   ├── create-brouwerij-400-response-invalid-params.ts
│   ├── create-brouwerij-400-response.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

:::tip Controllers vs implementaties

De gegenereerde code scheidt routing van implementatie:

- **Controllers** handelen HTTP requests af en roepen de abstracte API classes
  aan.
- **API classes** beschrijven welke methods je moet implementeren, bijvoorbeeld
  `listBrouwerijen`, `retrieveBier` en `createBier`.
- **Implementaties** koppel je later via `ApiModule.forRoot`.

Laat de gegenereerde controllers bij voorkeur ongemoeid. Voeg je eigen services
of providers toe en registreer die als implementatie van de gegenereerde API
classes.

:::

## Server starten

Voor het NestJS-voorbeeld uit deze tutorial gebruiken we `npm`.

### Stap 1: Installeer dependencies

```bash
cd generated-api-nestjs
npm run init-install
```

### Stap 2: Start de server met mock data

Voor deze tutorial starten we de server in mock-modus. Hiermee worden
automatisch voorbeeldresponses gegenereerd op basis van de `example` waarden in
de OAS:

```bash
PORT=8080 npm run dev-mock
```

De server draait nu op `http://localhost:8080`.

De `servers` URL in de OAS bevat `/v1`, maar de gegenereerde NestJS-routes
volgen de paden uit `paths`. Daarom testen we lokaal met `/brouwerijen` en niet
met `/v1/brouwerijen`.

Gebruik bij andere templates de startinstructies uit de gegenereerde README. In
grote lijnen zijn dit de commando's:

| Template                  | Starten                                                  | Mock mode            |
| ------------------------- | -------------------------------------------------------- | -------------------- |
| `nestjs-fastify`          | `npm run init-install` en daarna `npm run dev`           | `npm run dev-mock`   |
| `nodejs-express-server`   | `npm install` en daarna `npm start`                      | `npm run start-mock` |
| `go-gin-template`         | `go mod tidy` en daarna `go run .`                       | Niet standaard       |
| `java-spring-boot`        | `mvn spring-boot:run`                                    | Niet standaard       |
| `rust-axum-template`      | `cargo test` voor checks; implementeer daarna een `main` | Niet standaard       |
| `python-fastapi-template` | `pip install -r requirements.txt` en start met `uvicorn` | Niet standaard       |

### Stap 3: Test de API

Open een nieuwe terminal en test een endpoint:

```bash
curl http://localhost:8080/brouwerijen
```

We krijgen nu mock data terug gebaseerd op de voorbeeldwaarden die we aan de
schemas hebben toegevoegd:

```json
[
  {
    "id": "046b6c7f-0b8a-43b9-b35d-6489e6daee93",
    "naam": "Weizen Tripel",
    "grootte": "micro",
    "adres": {
      "straat": "Waldeck Pyrmontsingel",
      "huisnummer": 12,
      "postcode": "6521 BC",
      "plaats": "Nijmegen"
    }
  }
]
```

De gegenereerde server valideert ook automatisch de query parameters. Probeer de
filter die we in stap 3 hebben toegevoegd:

```bash
curl http://localhost:8080/brouwerijen?grootte=micro
```

Dit retourneert een geldige mock response. Maar als we een typfout maken:

```bash
curl http://localhost:8080/brouwerijen?grootte=klein
```

Dan krijgen we een `400 Bad Request` met een `problem+json` response:

```json
{
  "title": "Request validation failed",
  "status": 400,
  "errors": [
    {
      "in": "query",
      "location": "grootte",
      "code": "enum",
      "detail": "must be equal to one of the allowed values"
    }
  ]
}
```

De OAS fungeert dus niet alleen als documentatie, maar ook als validatielaag
voor de API.

:::tip Mock vs productie

De gegenereerde NestJS-server heeft twee modi:

- **`npm run dev-mock`** - Retourneert mock data op basis van de OAS
  voorbeelden. Request-validatie blijft actief.
- **`npm run dev`** - Start de server zonder mocking. Operaties zonder eigen
  implementatie geven standaard `501 application/problem+json` terug.

Met `OPENAPI_VALIDATE_RESPONSES=true npm run dev` kun je ook responses tegen de
OAS laten valideren. Zet dit pas aan wanneer je eigen implementaties responses
teruggeven die in het contract zijn beschreven.

:::

## Volgende stappen voor implementatie

De gegenereerde code is een werkend skelet. Om een volledige API te bouwen
moeten we:

1. **Database connectie toevoegen** - Bijvoorbeeld met PostgreSQL, MongoDB of
   SQLite
2. **API-implementaties toevoegen** - Implementeer de gegenereerde API classes
   en koppel ze via `ApiModule.forRoot`
3. **Authenticatie toevoegen** - Bijvoorbeeld met API keys of OAuth
4. **Error handling uitbreiden** - Voeg custom error responses toe
5. **Testen schrijven** - Unit tests en integration tests

## Samenvatting

In deze tutorial hebben we geleerd:

- Hoe we met de **OAS Generator** snel een basis OpenAPI Specification maken
- Hoe we **schemas** modelleren met properties, types en referenties
- Hoe we **query parameters** toevoegen voor filtering
- Hoe we de **DON Checker** gebruiken om te valideren tegen de API Design Rules
- Hoe we met **OpenAPI Generator** en DON-templates servercode genereren

We hebben nu alle kennis om een API te ontwerpen die voldoet aan de Nederlandse
overheidsstandaarden en om die specificatie om te zetten naar werkende code.

## Verder lezen

- [API Design Rules](/kennisbank/api-ontwikkeling/standaarden/api-design-rules) -
  Overzicht van de ADR op developer.overheid.nl
- [API Design Rules (ADR) specificatie](https://gitdocumentatie.logius.nl/publicatie/api/adr/) -
  De volledige ADR specificatie
- [OpenAPI Specification](/kennisbank/api-ontwikkeling/standaarden/openapi-specification) -
  Overzicht van OAS op developer.overheid.nl
- [OpenAPI Specification 3.0](https://spec.openapis.org/oas/v3.0.3) - Officiële
  OAS 3.0 documentatie
- [OpenAPI Generator](https://openapi-generator.tech/) - Documentatie en
  beschikbare generators
- [Codegen templates](https://github.com/developer-overheid-nl/codegen-templates) -
  DON-templates voor OpenAPI Generator
- [ADR Linter](/kennisbank/api-ontwikkeling/tools/api-design-rules-linter) -
  Valideer de OAS via CLI, IDE of CI/CD
