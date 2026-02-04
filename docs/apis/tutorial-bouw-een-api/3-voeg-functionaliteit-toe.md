# 3. Voeg functionaliteit toe

Nu we de schemas hebben toegevoegd, kunnen we functionaliteit gaan toevoegen.
Voor onze API willen we brouwerijen kunnen filteren op `grootte`, zodat we een
overzicht kunnen krijgen van alle brouwerijen, alléén hobbybrouwerijen, alléén
microbrouwerijen of alléén grote brouwerijen. Dit gaan we doen door een
queryparameter `grootte` toe te voegen aan de `listBrouwerijen` operatie,
oftewel: `GET /brouwerijen`.

## Query parameter toevoegen

Voeg de volgende `parameters` array toe aan de `GET /brouwerijen` operatie in de
Swagger Editor:

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
      ]
      //highlight-end
    }
  }
}
```

<details>
  <summary>De spec zou er op dit moment zo uit moeten zien</summary>

```json
{
  "openapi": "3.0.2",
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
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/API-Version"
              },
              "Link": {
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/Link"
              }
            },
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Brouwerij"
                  }
                }
              }
            }
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
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/API-Version"
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
            "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/responses/400"
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
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/API-Version"
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
            "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/responses/404"
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
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/API-Version"
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
            "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/responses/400"
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
            "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/responses/204"
          },
          "404": {
            "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/responses/404"
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
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/API-Version"
              },
              "Link": {
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/Link"
              }
            },
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Bier"
                  }
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
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/API-Version"
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
            "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/responses/400"
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
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/API-Version"
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
            "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/responses/404"
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
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/API-Version"
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
            "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/responses/400"
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
            "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/responses/204"
          },
          "404": {
            "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/responses/404"
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
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/API-Version"
              },
              "Link": {
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/Link"
              }
            },
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Bierstijl"
                  }
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
                "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/API-Version"
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
            "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/responses/404"
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
            "example": "046b6c7f-0b8a-43b9-b35d-6489e6daee93"
          },
          "naam": {
            "type": "string",
            "description": "Naam",
            "example": "Weizen Tripel"
          },
          "grootte": {
            "type": "string",
            "enum": ["hobby", "micro", "groot"],
            "description": "Grootte brouwerij (hobby/micro/groot)",
            "example": "micro"
          },
          "adres": {
            "description": "Adres",
            "properties": {
              "straat": {
                "type": "string",
                "description": "Straatnaam",
                "example": "Waldeck Pyrmontsingel"
              },
              "huisnummer": {
                "type": "number",
                "description": "Huisnummer",
                "example": 12
              },
              "postcode": {
                "type": "string",
                "description": "Postcode",
                "example": "6521 BC"
              },
              "plaats": {
                "type": "string",
                "description": "Plaats",
                "example": "Nijmegen"
              }
            },
            "required": ["straat", "huisnummer", "postcode", "plaats"]
          }
        },
        "required": ["id", "naam", "grootte"]
      },
      "Bier": {
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "Unieke identifier",
            "example": "046b6c7f-0b8a-43b9-b35d-6489e6daee92"
          },
          "naam": {
            "type": "string",
            "description": "Naam",
            "example": "Weizen Tripel"
          },
          "alcoholPercentage": {
            "type": "number",
            "format": "double",
            "description": "Alcoholpercentage",
            "example": 7.6
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
      "Bierstijl": {
        "description": "Bierstijl",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "Unieke identifier",
            "example": "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
          },
          "naam": {
            "type": "string",
            "description": "Naam",
            "example": "Quadrupel"
          }
        },
        "required": ["id", "naam"]
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

:::

## Wat hebben we geleerd?

- Hoe we **query parameters** toevoegen aan een operatie
- Hoe we een **enum** gebruiken om toegestane waarden te beperken
- Hoe **filtering** kan werken in een API

## Volgende stap

De OAS is nu functioneel compleet. Voordat we code gaan genereren, is het
belangrijk om te valideren of onze specificatie nog steeds voldoet aan de API
Design Rules.

[Ga naar stap 4: Valideer de OAS](./4-valideer-oas.md)
