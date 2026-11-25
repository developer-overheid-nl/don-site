---
content_type: standaard
tags: [adr, api, interoperabiliteit]
description: "Padsegmenten in een URI mogen alleen kleine letters, cijfers en koppeltekens bevatten."
---

# /core/path-segments-kebab-case

Padsegmenten in een URI mogen alleen kleine letters, cijfers en koppeltekens
bevatten, oftewel `kebab-case`. Een koppelteken scheidt woorden; het is geen
opvulling. Diacritische tekens worden genormaliseerd en speciale tekens vallen
weg: `/subsidie-aanvragen`, niet `/subsidieAanvragen` of `/subsidié_aanvragen`.

- Regel:
  https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/path-segments-kebab-case
- Linterregels: `nlgov:paths-kebab-case`

## Twee uitzonderingen

Een padvariabele houdt de notatie uit de OAS, dus `{organisatieId}` mag
`lowerCamelCase` zijn. De linter kijkt alleen naar de letterlijke segmenten.

Het laatste segment mag met een `_` beginnen. Dat is de conventie uit
[`/core/resource-operations`](https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/resource-operations)
voor een bewerking die geen resource is, zoals een zoekopdracht.

## Uitdrukken in OAS

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="yaml" label="YAML" default>
  ```yaml title="/openapi.yaml"
  openapi: 3.1.0
  paths:
    // highlight-start
    /open-source-projecten: # goed
    /openSourceProjecten: # fout, lowerCamelCase
    /open_source_projecten: # fout, snake_case
    /Open-Source-Projecten: # fout, Upper-Kebab-Case
    // highlight-end
    /organisaties/{organisatieId}/open-source-projecten: # goed, de variabele mag lowerCamelCase
    /organisaties/_zoek: # goed, bewerking met een underscore als laatste segment
  ```
  </TabItem>
  <TabItem value="json" label="JSON">
  ```json title="/openapi.json"
  {
    "openapi": "3.1.0",
    "paths": {
      "/open-source-projecten": {},
      "/organisaties/{organisatieId}/open-source-projecten": {},
      "/organisaties/_zoek": {}
    }
  }
  ```
  </TabItem>
</Tabs>
