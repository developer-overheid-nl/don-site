---
sidebar_position: 1
title: "Stap 1: Ontwerp de API"
---

# Stap 1: Ontwerp de API

In deze stap ontwerpen we de OpenAPI specificatie voor onze Bier API. We
gebruiken de OAS Generator om een basis te genereren en breiden deze daarna uit.

## Wat je nodig hebt

Voordat je begint, zorg dat je het volgende hebt:

- [ ] Een teksteditor (VS Code met OpenAPI extensie aanbevolen)
- [ ] De [OAS Generator](https://oas-generator.developer.overheid.nl) open in je
      browser
- [ ] Basiskennis van YAML syntax

## Genereer de basis

1. Ga naar de [OAS Generator](https://oas-generator.developer.overheid.nl)

2. Vul de volgende gegevens in:

   | Veld          | Waarde                                         |
   | ------------- | ---------------------------------------------- |
   | API Naam      | Bier API                                       |
   | Versie        | 1.0.0                                          |
   | Beschrijving  | API voor het beheren van bieren en brouwerijen |
   | Contact email | api@example.com                                |

3. Klik op **Genereer** en download het bestand als `openapi.yaml`

Je hebt nu een basis die er ongeveer zo uitziet:

```yaml
openapi: 3.0.3
info:
  title: Bier API
  version: 1.0.0
  description: API voor het beheren van bieren en brouwerijen
  contact:
    email: api@example.com
servers:
  - url: https://api.example.com/v1
paths: {}
components:
  schemas: {}
```

## Voeg een schema toe

Voeg onder `components.schemas` het Bier schema toe:

```yaml
components:
  schemas:
    Bier:
      type: object
      required:
        - naam
        - stijl
        - alcoholpercentage
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
          description: Unieke identifier
        naam:
          type: string
          minLength: 1
          maxLength: 100
          example: "Heineken"
        stijl:
          type: string
          enum:
            - pilsner
            - ipa
            - stout
            - witbier
            - tripel
          example: "pilsner"
        alcoholpercentage:
          type: number
          format: float
          minimum: 0
          maximum: 20
          example: 5.0
        brouwerij:
          type: string
          example: "Heineken Nederland"
```

## Voeg endpoints toe

Voeg onder `paths` de endpoints toe:

```yaml
paths:
  /beers:
    get:
      summary: Haal alle bieren op
      operationId: getBeers
      tags:
        - Bieren
      parameters:
        - name: stijl
          in: query
          schema:
            type: string
          description: Filter op bierstijl
      responses:
        "200":
          description: Lijst van bieren
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Bier"
    post:
      summary: Voeg een nieuw bier toe
      operationId: createBeer
      tags:
        - Bieren
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Bier"
      responses:
        "201":
          description: Bier aangemaakt
          headers:
            Location:
              schema:
                type: string
              description: URL van het nieuwe bier
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Bier"

  /beers/{id}:
    get:
      summary: Haal een specifiek bier op
      operationId: getBeerById
      tags:
        - Bieren
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        "200":
          description: Het gevraagde bier
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Bier"
        "404":
          description: Bier niet gevonden
```

## Controleer je werk

Je volledige `openapi.yaml` zou er nu zo uit moeten zien:

```yaml
openapi: 3.0.3
info:
  title: Bier API
  version: 1.0.0
  description: API voor het beheren van bieren en brouwerijen
  contact:
    email: api@example.com
servers:
  - url: https://api.example.com/v1
paths:
  /beers:
    get:
      # ... (zoals hierboven)
    post:
      # ... (zoals hierboven)
  /beers/{id}:
    get:
      # ... (zoals hierboven)
components:
  schemas:
    Bier:
      # ... (zoals hierboven)
```

## Wat hebben we geleerd?

In deze stap heb je:

- De **OAS Generator** gebruikt om een basis OpenAPI specificatie te maken
- Een **schema** gedefinieerd met validatieregels (required, minLength, enum)
- **Endpoints** toegevoegd met de juiste HTTP methods en response codes
- De basis gelegd voor een API die voldoet aan de API Design Rules

---

**Volgende stap**

Je bent klaar voor de volgende stap waarin je de specificatie valideert tegen de
API Design Rules.

[Ga naar stap 2: Valideer tegen ADR →](./2-valideer-tegen-adr.md)
