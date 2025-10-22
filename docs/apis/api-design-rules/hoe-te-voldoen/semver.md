---
tags: [adr, api]
---

# /core/semver

Deze regel schrijft voor dat versionering van API's via Semantic Versioning
(`major.minor.patch` formaat) moet geschieden.

- Regel:
  [https://gitdocumentatie.logius.nl/publicatie/api/adr/2.0.2/#/core/semver](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.0.2/#/core/semver)

## Uitdrukken in OAS

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="yaml" label="YAML" default>
  ```yaml title="/openapi.yaml"
  openapi: 3.0.0
  info:
    title: API van developer.overheid.nl
    // highlight-start
    version: 1.0.0 # goed
    version: 1 # fout, minor en patch versie ontbreken
    // highlight-end
  ```
  </TabItem>
  <TabItem value="json" label="JSON" default>
  ```json title="/openapi.json"
  {
    "openapi": "3.0.0",
    "info": {
      // highlight-start
      "contact": {
        "name": "Dimitri",
        "email": "dimitri@geonovum.nl",
        "url": "https://www.google.com"
      }
      // highlight-end
    }
  }
  ```
  </TabItem>
</Tabs>
