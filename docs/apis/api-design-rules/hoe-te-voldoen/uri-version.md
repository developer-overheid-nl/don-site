---
tags: [adr, api]
---

# /core/uri-version

Deze regel schrijft voor dat de major versie, voorafgegaan door de letter `v`,
opgenomen moet zijn in de URI van het endpoint. In OAS mag deze niet
gespecificeerd worden op `path` niveau; dit zou impliceren dat er binnen
hetzelfde endpoint meerdere (major versies van) API's beschikbaar zijn, terwijl
elke API vergezeld moet worden van een eigen `/openapi.json`.

- Regel:
  https://gitdocumentatie.logius.nl/publicatie/api/adr/2.0.2/#/core/uri-version
- Linter test:
  https://logius-standaarden.github.io/API-Design-Rules/#:~:text=%23%2Fcore%2Furi%2Dversion

## Uitdrukken in OAS

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="yaml" label="YAML" default>
  ```yaml title="/openapi.yaml"
  openapi: 3.0.0
  servers:
    // highlight-start
    - url: "https://api.developer.overheid.nl/v1" # goed
    - url: "https://api.developer.overheid.nl" # fout, het major versie nummer ontbreekt in het endpoint
    // highlight-end
  paths:
    // highlight-start
    /rijksmonumenten: # goed
    /v1/rijksmonumenten: # fout, het major versie nummer mag niet in het path zitten
    // highlight-end
  ```
  </TabItem>
  <TabItem value="json" label="JSON" default>
  ```json title="/openapi.json"
  {
  "openapi": "3.0.0",
  "servers": [
    // highlight-start
    {
      "url": "https://api.developer.overheid.nl/v1" // goed
    },
    {
      "url": "https://api.developer.overheid.nl" // fout, het major versie nummer ontbreekt in het endpoint
    }
    // highlight-end
  ],
  "paths": {
    // highlight-start
    "/rijksmonumenten": {}, // goed
    "/v1/rijksmonumenten": {} // fout, het major versie nummer mag niet in het path zitten
    // highlight-end
  }
}
  ```
  </TabItem>
</Tabs>
