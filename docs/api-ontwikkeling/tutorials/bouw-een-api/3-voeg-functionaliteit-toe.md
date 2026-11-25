---
content_type: tutorial
tags:
  - api
  - openapi
  - oas
  - api-design
---

# 3. Voeg functionaliteit toe

Nu we de schemas hebben toegevoegd, kunnen we functionaliteit gaan toevoegen.
Voor onze API willen we brouwerijen kunnen filteren op `grootte`, zodat we een
overzicht kunnen krijgen van alle brouwerijen, alléén hobbybrouwerijen, alléén
microbrouwerijen of alléén grote brouwerijen. Dit gaan we doen door een
queryparameter `grootte` toe te voegen aan de `listBrouwerijen` operatie,
oftewel: `GET /brouwerijen`.

## Query parameter toevoegen

Voeg de volgende `parameters` array toe aan de `GET /brouwerijen` operatie in de
Swagger Editor. Omdat de operatie nu invoer accepteert die ongeldig kan zijn,
moet hij volgens de API Design Rules ook een
[`400` response](../../standaarden/api-design-rules/hoe-te-voldoen/error-handling-invalid-input.md)
kunnen teruggeven. Die voegen we daarom ook toe:

```json
"paths": {
  "/brouwerijen": {
    "get": {
      "operationId": "listBrouwerijen",
      "description": "Endpoint om alle brouwerijen op te halen. @TODO: Voeg hier eventueel extra informatie toe over het filteren, pagineren, etc.",
      "summary": "Alle brouwerijen ophalen",
      "tags": ["Brouwerijen"],
      //highlight-start
      "parameters": [
        {
          "name": "grootte",
          "in": "query",
          "required": false,
          "schema": {
            "type": "string",
            "enum": ["hobby", "micro", "groot"]
          }
        }
      ],
      //highlight-end
      "responses": {
        // de bestaande 200 response blijft staan
        //highlight-start
        "400": {
          "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/BadRequest"
        }
        //highlight-end
      }
    }
  }
}
```

<details>
  <summary>De spec zou er op dit moment zo uit moeten zien</summary>

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Bier API",
    "description": "API over bier om te demonstreren hoe je eenvoudig een API kunt ontwikkelen.",
    "version": "1.0.0",
    "contact": {
      "name": "Team developer.overheid.nl",
      "email": "developer.overheid@geonovum.nl",
      "url": "https://github.com/orgs/developer-overheid-nl/discussions"
    }
  },
  "servers": [
    {
      "url": "@TODO: Add server URL"
    }
  ],
  "tags": [
    {
      "name": "Brouwerijen",
      "description": "Alle API operaties die bij brouwerijen horen."
    },
    {
      "name": "Bieren",
      "description": "Alle API operaties die bij bieren horen."
    },
    {
      "name": "Bierstijlen",
      "description": "Alle API operaties die bij bierstijlen horen."
    }
  ],
  "paths": {
    "/brouwerijen": {
      "get": {
        "operationId": "listBrouwerijen",
        "description": "Endpoint om alle brouwerijen op te halen. @TODO: Voeg hier eventueel extra informatie toe over het filteren, pagineren, etc.",
        "summary": "Alle brouwerijen ophalen",
        "tags": ["Brouwerijen"],
        "parameters": [
          {
            "name": "grootte",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "enum": ["hobby", "micro", "groot"]
            }
          }
        ],
        "responses": {
          "200": {
            "headers": {
              "API-Version": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/API-Version"
              },
              "Link": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/Link"
              }
            },
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BrouwerijCollection"
                }
              }
            }
          },
          "400": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/BadRequest"
          }
        }
      },
      "post": {
        "operationId": "createBrouwerij",
        "description": "Nieuwe brouwerij aanmaken",
        "summary": "Nieuwe brouwerij aanmaken",
        "tags": ["Brouwerijen"],
        "responses": {
          "201": {
            "headers": {
              "API-Version": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/API-Version"
              }
            },
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Brouwerij"
                }
              }
            }
          },
          "400": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/BadRequest"
          }
        }
      }
    },
    "/brouwerijen/{id}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/id"
        }
      ],
      "get": {
        "operationId": "retrieveBrouwerij",
        "description": "Brouwerij ophalen",
        "summary": "Brouwerij ophalen",
        "tags": ["Brouwerijen"],
        "responses": {
          "200": {
            "headers": {
              "API-Version": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/API-Version"
              }
            },
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Brouwerij"
                }
              }
            }
          },
          "404": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/NotFound"
          }
        }
      },
      "put": {
        "operationId": "editBrouwerij",
        "description": "Brouwerij wijzigen",
        "summary": "Brouwerij wijzigen",
        "tags": ["Brouwerijen"],
        "responses": {
          "200": {
            "headers": {
              "API-Version": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/API-Version"
              }
            },
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Brouwerij"
                }
              }
            }
          },
          "400": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/BadRequest"
          },
          "404": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/NotFound"
          }
        }
      },
      "delete": {
        "operationId": "removeBrouwerij",
        "description": "Brouwerij verwijderen",
        "summary": "Brouwerij verwijderen",
        "tags": ["Brouwerijen"],
        "responses": {
          "204": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/NoContent"
          },
          "404": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/NotFound"
          }
        }
      }
    },
    "/bieren": {
      "get": {
        "operationId": "listBieren",
        "description": "Endpoint om alle bieren op te halen. @TODO: Voeg hier eventueel extra informatie toe over het filteren, pagineren, etc.",
        "summary": "Alle bieren ophalen",
        "tags": ["Bieren"],
        "responses": {
          "200": {
            "headers": {
              "API-Version": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/API-Version"
              },
              "Link": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/Link"
              }
            },
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BierCollection"
                }
              }
            }
          }
        }
      },
      "post": {
        "operationId": "createBier",
        "description": "Nieuwe bier aanmaken",
        "summary": "Nieuwe bier aanmaken",
        "tags": ["Bieren"],
        "responses": {
          "201": {
            "headers": {
              "API-Version": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/API-Version"
              }
            },
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Bier"
                }
              }
            }
          },
          "400": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/BadRequest"
          }
        }
      }
    },
    "/bieren/{id}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/id"
        }
      ],
      "get": {
        "operationId": "retrieveBier",
        "description": "Bier ophalen",
        "summary": "Bier ophalen",
        "tags": ["Bieren"],
        "responses": {
          "200": {
            "headers": {
              "API-Version": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/API-Version"
              }
            },
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Bier"
                }
              }
            }
          },
          "404": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/NotFound"
          }
        }
      },
      "put": {
        "operationId": "editBier",
        "description": "Bier wijzigen",
        "summary": "Bier wijzigen",
        "tags": ["Bieren"],
        "responses": {
          "200": {
            "headers": {
              "API-Version": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/API-Version"
              }
            },
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Bier"
                }
              }
            }
          },
          "400": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/BadRequest"
          },
          "404": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/NotFound"
          }
        }
      },
      "delete": {
        "operationId": "removeBier",
        "description": "Bier verwijderen",
        "summary": "Bier verwijderen",
        "tags": ["Bieren"],
        "responses": {
          "204": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/NoContent"
          },
          "404": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/NotFound"
          }
        }
      }
    },
    "/bierstijlen": {
      "get": {
        "operationId": "listBierstijlen",
        "description": "Endpoint om alle bierstijlen op te halen. @TODO: Voeg hier eventueel extra informatie toe over het filteren, pagineren, etc.",
        "summary": "Alle bierstijlen ophalen",
        "tags": ["Bierstijlen"],
        "responses": {
          "200": {
            "headers": {
              "API-Version": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/API-Version"
              },
              "Link": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/Link"
              }
            },
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BierstijlCollection"
                }
              }
            }
          }
        }
      }
    },
    "/bierstijlen/{id}": {
      "parameters": [
        {
          "$ref": "#/components/parameters/id"
        }
      ],
      "get": {
        "operationId": "retrieveBierstijl",
        "description": "Bierstijl ophalen",
        "summary": "Bierstijl ophalen",
        "tags": ["Bierstijlen"],
        "responses": {
          "200": {
            "headers": {
              "API-Version": {
                "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/headers/API-Version"
              }
            },
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Bierstijl"
                }
              }
            }
          },
          "404": {
            "$ref": "https://static.developer.overheid.nl/openapi-components/adr/2.2/common.yaml#/components/responses/NotFound"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Brouwerij": {
        "description": "Brouwerij",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "Unieke identifier",
            "examples": ["046b6c7f-0b8a-43b9-b35d-6489e6daee93"]
          },
          "naam": {
            "type": "string",
            "description": "Naam",
            "examples": ["Brouwtoren"]
          },
          "grootte": {
            "type": "string",
            "enum": ["hobby", "micro", "groot"],
            "description": "Grootte brouwerij (hobby/micro/groot)",
            "examples": ["micro"]
          },
          "adres": {
            "$ref": "#/components/schemas/Adres"
          }
        },
        "required": ["id", "naam", "grootte"]
      },
      "BrouwerijCollection": {
        "type": "object",
        "required": ["items"],
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Brouwerij"
            }
          }
        }
      },
      "Adres": {
        "description": "Adres",
        "properties": {
          "straat": {
            "type": "string",
            "description": "Straatnaam",
            "examples": ["Waldeck Pyrmontsingel"]
          },
          "huisnummer": {
            "type": "number",
            "description": "Huisnummer",
            "examples": [12]
          },
          "postcode": {
            "type": "string",
            "description": "Postcode",
            "examples": ["6521 BC"]
          },
          "plaats": {
            "type": "string",
            "description": "Plaats",
            "examples": ["Nijmegen"]
          }
        },
        "required": ["straat", "huisnummer", "postcode", "plaats"]
      },
      "Bier": {
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "Unieke identifier",
            "examples": ["046b6c7f-0b8a-43b9-b35d-6489e6daee92"]
          },
          "naam": {
            "type": "string",
            "description": "Naam",
            "examples": ["Weizen Tripel"]
          },
          "alcoholPercentage": {
            "type": "number",
            "format": "double",
            "description": "Alcoholpercentage",
            "examples": [7.6]
          },
          "bierstijl": {
            "$ref": "#/components/schemas/Bierstijl"
          },
          "brouwerij": {
            "$ref": "#/components/schemas/Brouwerij"
          }
        },
        "required": ["id", "naam", "alcoholPercentage", "bierstijl"]
      },
      "BierCollection": {
        "type": "object",
        "required": ["items"],
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Bier"
            }
          }
        }
      },
      "Bierstijl": {
        "description": "Bierstijl",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "Unieke identifier",
            "examples": ["046b6c7f-0b8a-43b9-b35d-6489e6daee91"]
          },
          "naam": {
            "type": "string",
            "description": "Naam",
            "examples": ["Quadrupel"]
          }
        },
        "required": ["id", "naam"]
      },
      "BierstijlCollection": {
        "type": "object",
        "required": ["items"],
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Bierstijl"
            }
          }
        }
      }
    },
    "parameters": {
      "id": {
        "name": "id",
        "in": "path",
        "description": "id",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    }
  }
}
```

</details>

Met deze query parameter kan een API-consumer nu de volgende requests doen:

| Request                          | Resultaat                |
| -------------------------------- | ------------------------ |
| `GET /brouwerijen`               | Alle brouwerijen         |
| `GET /brouwerijen?grootte=hobby` | Alleen hobbybrouwerijen  |
| `GET /brouwerijen?grootte=micro` | Alleen microbrouwerijen  |
| `GET /brouwerijen?grootte=groot` | Alleen grote brouwerijen |

:::tip Meer filteropties

We kunnen op dezelfde manier meer query parameters toevoegen. Denk aan:

- Filteren op plaats: `?plaats=Nijmegen`
- Paginering: `?page=1&limit=10`

Weet je vooraf al op welke velden je wilt filteren? Dan kan de
[OAS Generator](../../tools/openapi-specification-generator.md) de query
parameters met `filters` per resource ook meteen voor je aanmaken. Een `enum` of
de `400` response voeg je daarna zelf toe.

:::

## Wat hebben we geleerd?

- Hoe we **query parameters** toevoegen aan een operatie
- Hoe we een **enum** gebruiken om toegestane waarden te beperken
- Hoe **filtering** kan werken in een API
- Waarom een operatie met parameters ook een **`400` response** nodig heeft

## Volgende stap

De OAS is nu functioneel compleet. Voordat we code gaan genereren, is het
belangrijk om te valideren of onze specificatie nog steeds voldoet aan de API
Design Rules.

[Ga naar stap 4: Valideer de OAS](./4-valideer-oas.md)
