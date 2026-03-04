---
tags: [adr, api]
---

# /core/doc-openapi-contact

Deze regel schrijft voor dat je contactinformatie in OAS moet opnemen voor
publieke API's. Het API register gebruikt deze informatie onder andere om
gebruikers in de gelegenheid te stellen om issues te melden en om aanbieders op
de hoogte te brengen van gesignaleerde problemen.

- Regel:
  https://logius-standaarden.github.io/API-Design-Rules/#/core/doc-openapi-contact
- Linter test:
  https://logius-standaarden.github.io/API-Design-Rules/#:~:text=%23%2Fcore%2Fdoc%2Dopenapi

## Uitdrukken in OAS

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="yaml" label="YAML">
  ```yaml title="/openapi.yaml"
  openapi: 3.0.0
  info:
    // highlight-start
    contact:
      name: Team Developer Overheid
      email: developer.overheid@geonovum.nl
      url: https://github.com/developer-overheid-nl
    // highlight-end
  ```
  </TabItem>
  <TabItem value="json" label="JSON">
  ```json title="/openapi.json"
  {
    "openapi": "3.0.0",
    "info": {
      // highlight-start
      "contact": {
        "name": "Team Developer Overheid",
        "email": "developer.overheid@geonovum.nl",
        "url": "https://github.com/developer-overheid-nl"
      }
      // highlight-end
    }
  }
  ```
  </TabItem>
</Tabs>
