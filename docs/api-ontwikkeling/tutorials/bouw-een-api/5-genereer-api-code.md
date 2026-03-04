---
content_type: tutorial
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
   is. [Download Node.js](https://nodejs.org/)
3. **Java** - OpenAPI Generator is een Java applicatie. Controleer met
   `java --version` dat Java 11+ geïnstalleerd is.
   [Download Java](https://www.java.com/en/download/manual.jsp)

:::note npx

We gebruiken `npx` om tools uit te voeren zonder ze eerst globaal te
installeren. Met `npx` worden packages automatisch gedownload en uitgevoerd. De
eerste keer kan dit even duren, daarna worden ze gecached.

:::

## Dereferencen

Onze OAS bevat `$ref` verwijzingen naar externe URL's, zoals
`https://static.developer.overheid.nl/adr/components.yaml` voor standaard
headers en error responses. Dit is handig omdat we zo herbruikbare
ADR-componenten kunnen gebruiken, maar de OpenAPI Generator kan niet overweg met
externe referenties.

We moeten de OAS daarom eerst "dereferencen" (ook wel "bundlen" genoemd). Dit
betekent dat alle externe verwijzingen worden opgehaald en inline in het
document worden geplaatst. Het resultaat is een volledig zelfstandige OAS.

Dit doen we met [Redocly CLI](https://redocly.com/docs/cli/):

```bash
npx @redocly/cli bundle ./openapi.json --output openapi.bundled.json --ext json
```

Dit haalt externe referenties op en zet ze om naar interne `$ref` verwijzingen
binnen het document. Gebruik `openapi.bundled.json` als input voor de volgende
stappen.

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

We hebben een aangepaste template gemaakt die beter aansluit bij de ADR. Clone
deze naar de werkdirectory:

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

:::note Beschikbare templates

Momenteel bieden we alleen een template voor **Express (Node.js)**. Deze
template is bedoeld om de tutorial te kunnen doorlopen en te demonstreren hoe
code generatie werkt. De gegenereerde code is **niet productiewaardig** en dient
als startpunt, niet als afgerond product.

Op de
[OpenAPI Generator website](https://openapi-generator.tech/docs/generators) vind
je tientallen andere generators voor verschillende talen en frameworks. Deze kun
je gebruiken zonder onze templates, maar dan mis je de ADR-specifieke
aanpassingen.

We zijn voornemens om meer ADR-specifieke templates toe te voegen voor populaire
frameworks. Hier zoeken we **contributors** voor! Heb je ervaring met een
bepaald framework en wil je bijdragen?
[Open een issue of pull request](https://github.com/developer-overheid-nl/codegen-templates)
op de repository.

:::

### Stap 2: Genereer de Express server

Voer het volgende commando uit om een Express server te genereren:

```bash
npx @openapitools/openapi-generator-cli generate \
  -i ./openapi.bundled.json \
  -g nodejs-express-server \
  -o ./api \
  -t ./codegen-templates/nodejs-express-server
```

| Parameter | Betekenis                                        |
| --------- | ------------------------------------------------ |
| `-i`      | Input: pad naar de OpenAPI Specification         |
| `-g`      | Generator: welke taal/framework (nodejs-express) |
| `-o`      | Output: map waar de code gegenereerd wordt       |
| `-t`      | Templates: pad naar de aangepaste templates      |

### Stap 3: Bekijk de gegenereerde structuur

Na het genereren hebben we de volgende mapstructuur:

```
api/
├── api/                    # OpenAPI specificatie
│   └── openapi.yaml
├── controllers/            # Route handlers
│   ├── BierenController.js
│   ├── BierstijlenController.js
│   └── BrouwerijenController.js
├── services/               # Business logic (hier implementeren we de logica)
│   ├── BierenService.js
│   ├── BierstijlenService.js
│   └── BrouwerijenService.js
├── utils/                  # Hulpfuncties
├── index.js                # Server entry point
├── package.json
└── README.md
```

:::tip Controllers vs Services

De gegenereerde code volgt het **Controller-Service pattern**:

- **Controllers** handelen HTTP requests af en roepen services aan
- **Services** bevatten de business logic - hier implementeren we de
  daadwerkelijke functionaliteit

We hoeven alleen de **Services** aan te passen. De controllers blijven
ongewijzigd.

:::

## Server starten

### Stap 1: Installeer dependencies

```bash
cd api
npm install
```

### Stap 2: Start de server met mock data

Voor deze tutorial starten we de server in mock-modus. Hiermee worden
automatisch voorbeeldresponses gegenereerd op basis van de `example` waarden in
de OAS:

```bash
npm run start-mock
```

De server draait nu op `http://localhost:8080`.

### Stap 3: Test de API

Open een nieuwe terminal en test een endpoint:

```bash
curl http://localhost:8080/v1/brouwerijen
```

We krijgen nu mock data terug gebaseerd op de voorbeeldwaarden die we in stap 2
aan de schemas hebben toegevoegd.

De gegenereerde server valideert ook automatisch de query parameters. Probeer de
filter die we in stap 3 hebben toegevoegd:

```bash
curl http://localhost:8080/v1/brouwerijen?grootte=micro
```

Dit retourneert een gefilterde array. Maar als we een typfout maken:

```bash
curl http://localhost:8080/v1/brouwerijen?grootte=klein
```

Dan krijgen we een `400 Bad Request` met een `problem+json` response:

```json
{
  "type": "https://httpstatuses.com/400",
  "title": "Bad Request",
  "status": 400,
  "detail": "request/query/grootte must be equal to one of the allowed values: hobby, micro, groot",
  "instance": "/v1/brouwerijen?grootte=klein",
  "invalidParams": [
    {
      "path": "/query/grootte",
      "message": "must be equal to one of the allowed values: hobby, micro, groot",
      "errorCode": "enum.openapi.validation"
    }
  ]
}
```

De OAS fungeert dus niet alleen als documentatie, maar ook als validatielaag
voor de API.

:::tip Mock vs productie

De gegenereerde server heeft twee modi:

- **`npm run start-mock`** - Retourneert mock data op basis van de OAS
  voorbeelden. Handig voor development en testen.
- **`npm start`** - Start de server zonder mocking. De services geven lege
  responses totdat we de business logic implementeren.

:::

## Volgende stappen voor implementatie

De gegenereerde code is een werkend skelet. Om een volledige API te bouwen
moeten we:

1. **Database connectie toevoegen** - Bijvoorbeeld met PostgreSQL, MongoDB of
   SQLite
2. **Services implementeren** - Vervang de mock-responses door echte database
   queries
3. **Authenticatie toevoegen** - Bijvoorbeeld met API keys of OAuth
4. **Error handling uitbreiden** - Voeg custom error responses toe
5. **Testen schrijven** - Unit tests en integration tests

## Samenvatting

In deze tutorial hebben we geleerd:

- Hoe we met de **OAS Generator** snel een basis OpenAPI Specification maken
- Hoe we **schemas** modelleren met properties, types en referenties
- Hoe we **query parameters** toevoegen voor filtering
- Hoe we de **OAS Checker** gebruiken om te valideren tegen de API Design Rules
- Hoe we met **OpenAPI Generator** een werkende Express server genereren

We hebben nu alle kennis om een API te ontwerpen die voldoet aan de Nederlandse
overheidsstandaarden en om die specificatie om te zetten naar werkende code.

## Verder lezen

- [API Design Rules](/kennisbank/api-ontwikkeling/standaarden/api-design-rules) - Overzicht van de ADR
  op developer.overheid.nl
- [API Design Rules (ADR) specificatie](https://gitdocumentatie.logius.nl/publicatie/api/adr/) -
  De volledige ADR specificatie
- [OpenAPI Specification](/kennisbank/api-ontwikkeling/standaarden/openapi-specification) - Overzicht
  van OAS op developer.overheid.nl
- [OpenAPI Specification 3.0](https://spec.openapis.org/oas/v3.0.3) - Officiële
  OAS 3.0 documentatie
- [OpenAPI Generator](https://openapi-generator.tech/) - Documentatie en
  beschikbare generators
- [ADR Linter](/kennisbank/api-ontwikkeling/tools/api-design-rules-linter) -
  Valideer de OAS via CLI, IDE of CI/CD
