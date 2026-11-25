---
content_type: standaard
tags: [adr, api]
---

# /core/no-trailing-slash

Deze regel schrijft voor dat een path geen trailing slash mag bevatten, met
uitzondering van de root.

- Regel:
  https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/no-trailing-slash
- Linterregels: `path-keys-no-trailing-slash`, `nlgov:paths-no-trailing-slash`

## Uitdrukken in OAS

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="yaml" label="YAML" default>
  ```yaml title="/openapi.yaml"
  openapi: 3.1.0
  paths:
    // highlight-start
    /rijksmonumenten: # goed
    /rijksmonumenten/: # fout
    /: # goed, er wordt namelijk een uitzondering gemaakt voor de root
    // highlight-end
  ```
  </TabItem>
  <TabItem value="json" label="JSON">
  ```json title="/openapi.json"
  {
    "openapi": "3.1.0",
    "paths": {
      // highlight-start
      "/rijksmonumenten": {}, // goed
      "/rijksmonumenten/": {}, // fout
      "/": {} // goed, er wordt namelijk een uitzondering gemaakt voor root
      // highlight-end
    }
  }
  ```
  </TabItem>
</Tabs>
