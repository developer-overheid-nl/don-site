---
content_type: standaard
tags: [adr, api, interoperabiliteit]
description: "Query parameters in een URI gebruiken lowerCamelCase en beginnen niet met een cijfer."
---

# /core/query-keys-camel-case

Een query key mag alleen letters en cijfers bevatten, waarbij elk woord na het
eerste met een hoofdletter begint. Het eerste teken is een kleine letter en mag
geen cijfer zijn. Dat is `lowerCamelCase`: `?aantalPerPagina=20`, niet
`?aantal-per-pagina=20` of `?AantalPerPagina=20`.

Let op het verschil met het pad: een **pad** is `kebab-case`, een **query key**
is `lowerCamelCase`. Dezelfde URI gebruikt dus beide conventies.

- Regel:
  https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/query-keys-camel-case
- Linterregels: `nlgov:query-keys-camel-case`

## Uitdrukken in OAS

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="yaml" label="YAML" default>
  ```yaml title="/openapi.yaml"
  openapi: 3.1.0
  paths:
    /open-source-projecten: # kebab-case in het pad
      get:
        parameters:
          // highlight-start
          - name: aantalPerPagina # goed, lowerCamelCase
            in: query
          - name: aantal-per-pagina # fout, kebab-case hoort niet in een query key
            in: query
          - name: AantalPerPagina # fout, UpperCamelCase
            in: query
          - name: 2eSorteerveld # fout, begint met een cijfer
            in: query
          // highlight-end
  ```
  </TabItem>
  <TabItem value="json" label="JSON">
  ```json title="/openapi.json"
  {
    "openapi": "3.1.0",
    "paths": {
      "/open-source-projecten": {
        "get": {
          "parameters": [{ "name": "aantalPerPagina", "in": "query" }]
        }
      }
    }
  }
  ```
  </TabItem>
</Tabs>
