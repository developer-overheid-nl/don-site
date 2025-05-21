# /core/http-methods

Deze regel schrijft voor dat alleen de standaard HTTP methods `GET`, `POST`, `PATCH`, `PUT`, `DELETE`, `HEAD`, `TRACE` en `OPTIONS` toegestaan zijn.

- Regel: https://gitdocumentatie.logius.nl/publicatie/api/adr/2.0.2/#/core/http-methods
- Linter test: https://logius-standaarden.github.io/API-Design-Rules/#:~:text=%23%2Fcore%2Fhttp%2Dmethods

## Uitdrukken in OAS

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="yaml" label="YAML">
  ```yaml title="/openapi.yaml"
  openapi: 3.0.0
  paths:
    /rijksmonumenten:
      get: # lijst van rijksmonumenten ophalen
      post: # nieuw rijksmonument maken
    // highlight-start
    /rijksmonumenten/_zoek: # speciale operatie, prefixed met een underscore
      post: # uitzondering voor speciale operaties
    // highlight-end
    /rijksmonumenten/12:
      get: # rijksmonument 12 ophalen
      put: # rijksmonument 12 in zijn geheel vervangen
      patch: # rijksmonument 12 gedeeltelijk vervangen
      delete: # rijksmonument 12 verwijderen
      // highlight-next-line
      propfind: # fout, dit is geen standaard http method
  ```
  </TabItem>
  <TabItem value="json" label="JSON">
  ```json title="/openapi.json"
  {
    "openapi": "3.0.0",
    "paths": {
      "/rijksmonumenten": {
        "get": {}, // lijst van rijksmonumenten ophalen
        "post": {} // nieuw rijksmonument maken
      },
      // highlight-start
      "/rijksmonumenten/_zoek": { // speciale operatie, prefixed met een underscore
        "post": {} // uitzondering voor speciale operaties
      },
      // highlight-end
      "/rijksmonumenten/12": {
        "get": {}, // rijksmonument 12 ophalen
        "put": {}, // rijksmonument 12 in zijn geheel vervangen
        "patch": {}, // rijksmonument 12 gedeeltelijk vervangen
        "delete": {}, // rijksmonument 12 verwijderen
        // highlight-next-line
        "propfind": {} // fout, dit is geen standaard http method
      }
    }
  }
  ```
  </TabItem>
</Tabs>
