---
sidebar_position: 3
title: "Stap 3: Genereer de code"
---

# Stap 3: Genereer de code

In deze laatste stap genereren we een werkende server uit onze OpenAPI
specificatie. We gebruiken OpenAPI Generator om server stubs te maken in Node.js
of Java.

## Wat je nodig hebt

Voordat je deze stap start, zorg dat je:

- [ ] Alle voorgaande stappen hebt afgerond
- [ ] Je gevalideerde `openapi.yaml` klaar hebt staan
- [ ] Node.js 18+ OF Java 17+ geïnstalleerd hebt

## Kies je taal

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="node" label="Node.js" default>

### Node.js met Express

```bash
# Installeer OpenAPI Generator
npm install -g @openapitools/openapi-generator-cli

# Genereer de server
openapi-generator-cli generate \
  -i openapi.yaml \
  -g nodejs-express-server \
  -o bier-api-nodejs
```

Start de server:

```bash
cd bier-api-nodejs
npm install
npm start
```

De API draait nu op `http://localhost:8080`.

</TabItem>
<TabItem value="java" label="Java">

### Java met Spring Boot

```bash
# Installeer OpenAPI Generator
npm install -g @openapitools/openapi-generator-cli

# Genereer de server
openapi-generator-cli generate \
  -i openapi.yaml \
  -g spring \
  -o bier-api-java \
  --additional-properties=useSpringBoot3=true
```

Start de server:

```bash
cd bier-api-java
./mvnw spring-boot:run
```

De API draait nu op `http://localhost:8080`.

</TabItem>
</Tabs>

## Test de API

Open een nieuwe terminal en test de endpoints:

```bash
# Haal alle bieren op (lege lijst)
curl http://localhost:8080/v1/beers

# Voeg een bier toe
curl -X POST http://localhost:8080/v1/beers \
  -H "Content-Type: application/json" \
  -d '{
    "naam": "Hertog Jan",
    "stijl": "pilsner",
    "alcoholpercentage": 5.1,
    "brouwerij": "Hertog Jan Brouwerij"
  }'

# Haal het bier op
curl http://localhost:8080/v1/beers/{id}
```

## Implementeer de logica

De gegenereerde code bevat stub-implementaties. Je moet de business logic nog
toevoegen.

**Node.js voorbeeld** (`services/BierenService.js`):

```javascript
// Simpele in-memory storage
const beers = new Map();

const getBeers = ({ stijl }) => {
  let result = Array.from(beers.values());

  if (stijl) {
    result = result.filter((b) => b.stijl === stijl);
  }

  return result;
};

const createBeer = ({ body }) => {
  const id = crypto.randomUUID();
  const beer = { id, ...body };
  beers.set(id, beer);
  return beer;
};

const getBeerById = ({ id }) => {
  const beer = beers.get(id);
  if (!beer) {
    throw { status: 404, message: "Bier niet gevonden" };
  }
  return beer;
};
```

## Bekijk de documentatie

OpenAPI Generator maakt ook automatisch documentatie:

- **Swagger UI**: `http://localhost:8080/api-docs`
- **ReDoc**: Installeer apart of gebruik online viewer

## Wat hebben we geleerd?

In deze stap heb je:

- **OpenAPI Generator** gebruikt om server code te genereren
- Een werkende **API server** opgestart
- De API **getest** met curl
- Gezien hoe je de **business logic** implementeert
- Automatisch gegenereerde **documentatie** bekeken

---

## Tutorial afgerond!

Gefeliciteerd! Je hebt de tutorial afgerond. Je hebt nu:

- Een **OpenAPI specificatie** ontworpen volgens design-first principes
- De specificatie **gevalideerd** tegen de API Design Rules
- Een **werkende server** gegenereerd uit de specificatie
- Geleerd hoe deze tools je workflow kunnen versnellen

### Volgende stappen

- [API Design Rules Cheat Sheet](/kennisbank/api-ontwikkeling/standaarden/api-design-rules/cheat-sheet) -
  Snelle referentie
- [Problem Details](/kennisbank/api-ontwikkeling/architectuur/problem-details) - Verdieping
  in error handling
- [WuppieFuzz](/kennisbank/api-ontwikkeling/tools/wuppiefuzz) - Test je API op security
  issues

### Feedback

Heb je feedback over deze tutorial?
[Laat het ons weten](https://github.com/developer-overheid-nl/don-site/issues).
