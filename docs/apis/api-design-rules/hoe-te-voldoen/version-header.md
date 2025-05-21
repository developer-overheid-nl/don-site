---
tags: [adr, api]
---

# /core/version-header

Deze regel schrijft voor dat iedere API response een `API-Version` response header moet bevatten met daarin het volledige versienummer van de API.

- Regel: https://gitdocumentatie.logius.nl/publicatie/api/adr/2.0.2/#/core/version-header
- Linter test: https://logius-standaarden.github.io/API-Design-Rules/#:~:text=%23%2Fcore%2Fversion%2Dheader

## Uitdrukken in OAS

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="yaml" label="YAML">
  ```yaml title="/openapi.yaml"
  openapi: 3.0.0
  paths:
    /rijksmonumenten:
      get:
        responses:
          "200":
            headers:
              // highlight-start
              API-Version:
                description: Semver van de API
                schema:
                  type: string
                  example: 1.0.0
              // highlight-end
    /rijksmonumenten/1:
      get:
        responses:
          "200":
            headers:
              API-Version:
                // highlight-start
                # Tip: gebruik het standaard component van developer.overheid.nl
                $ref: "https://static.developer.overheid.nl/adr/components.yaml#/headers/API-Version"
                // highlight-end
  ```
  </TabItem>
  <TabItem value="json" label="JSON">
  ```json title="/openapi.json"
  {
    "openapi": "3.0.0",
    "paths": {
      "/rijksmonumenten": {
        "get": {
          "responses": {
            "200": {
              "headers": {
                // highlight-start
                "API-Version": {
                  "description": "Semver van de API",
                  "schema": {
                    "type": "string",
                    "example": "1.0.0"
                  }
                }
                // highlight-end
              }
            }
          }
        }
      },
      "/rijksmonumenten/1": {
        "get": {
          "responses": {
            "200": {
              "headers": {
                "API-Version": {
                  // highlight-start
                  // Tip: gebruik het standaard component van developer.overheid.nl
                  "$ref": "https://static.developer.overheid.nl/adr/components.yaml#/headers/API-Version"
                  // highlight-end
                }
              }
            }
          }
        }
      }
    }
  }
  ```
  </TabItem>
</Tabs>
