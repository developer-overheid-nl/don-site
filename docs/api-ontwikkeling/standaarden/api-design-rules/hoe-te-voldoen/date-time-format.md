---
content_type: standaard
tags: [adr, api, interoperabiliteit]
description: "Datum-, tijd- en datumtijdvelden volgen RFC 9557 en ISO 8601-1, met een vast OpenAPI-format per soort veld."
---

# /core/date-time/format

Alle datum-, datumtijd- en tijdvelden in requests en responses volgen
[RFC 9557](https://www.rfc-editor.org/rfc/rfc9557.html) en ISO 8601-1. In de
OpenAPI-beschrijving krijgt zo'n veld altijd `"type": "string"` en een `format`
uit de tabel hieronder.

| Soort veld | ISO 8601     | OpenAPI-format           |
| ---------- | ------------ | ------------------------ |
| Datum      | full-date    | `"format": "date"`       |
| Datumtijd  | date-time    | `"format": "date-time"`  |
| Tijd       | partial-time | `"format": "time-local"` |

- Regel:
  https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/date-time/format
- Linterregels: `nlgov:specify-format-for-date-and-time`

Een integer met een epoch-waarde voldoet niet, ook niet als de omschrijving
uitlegt wat het betekent. De `format` is wat een client laat weten hoe hij het
veld moet lezen.

## Uitdrukken in OAS

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="yaml" label="YAML" default>
  ```yaml title="/openapi.yaml"
  openapi: 3.1.0
  components:
    schemas:
      Subsidieaanvraag:
        type: object
        properties:
          // highlight-start
          ingediendOp: # goed
            type: string
            format: date-time
          aanvraagdatum: # goed, tijd is niet relevant
            type: string
            format: date
          zittingstijd: # goed, alleen een kloktijd
            type: string
            format: time-local
          verwerktOp: # fout, een epoch-getal is geen string met format
            type: integer
          // highlight-end
  ```
  </TabItem>
  <TabItem value="json" label="JSON">
  ```json title="/openapi.json"
  {
    "openapi": "3.1.0",
    "components": {
      "schemas": {
        "Subsidieaanvraag": {
          "type": "object",
          "properties": {
            "ingediendOp": { "type": "string", "format": "date-time" },
            "aanvraagdatum": { "type": "string", "format": "date" },
            "zittingstijd": { "type": "string", "format": "time-local" }
          }
        }
      }
    }
  }
  ```
  </TabItem>
</Tabs>
