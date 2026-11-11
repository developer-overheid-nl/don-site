---
content_type: standaard
tags: [adr, api, interoperabiliteit]
description: "Een 4xx- of 5xx-response gebruikt application/problem+json of application/problem+xml, met minimaal status, title en detail."
---

# /core/error-handling/problem-details

Een foutresponse met een 4xx- of 5xx-statuscode gebruikt
`application/problem+json` of `application/problem+xml` als `Content-Type`, en
de body volgt de structuur uit
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html). De velden `status`,
`title` en `detail` **moeten** aanwezig zijn.

Een eigen foutformaat, zoals `{ "error": "..." }`, voldoet niet.

- Regel:
  https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/error-handling/problem-details
- Linterregels: `nlgov:use-problem-schema`, `nlgov:problem-schema-members`

Zie ook de achtergrond bij
[Problem Details](../../../architectuur/problem-details).

## De verplichte velden

| Veld     | Wat erin staat                                                |
| -------- | ------------------------------------------------------------- |
| `status` | De HTTP-statuscode, als getal, gelijk aan die van de response |
| `title`  | Een korte, vaste omschrijving van het soort fout              |
| `detail` | Wat er in dit geval misging, leesbaar voor een mens           |

`type` en `instance` uit RFC 9457 mogen erbij, maar zijn niet verplicht.

## Uitdrukken in OAS

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="yaml" label="YAML" default>
  ```yaml title="/openapi.yaml"
  openapi: 3.1.0
  paths:
    /subsidieaanvragen:
      post:
        responses:
          "400":
            description: Ongeldige aanvraag
            content:
              // highlight-start
              application/problem+json: # goed
                schema:
                  $ref: "https://static.developer.overheid.nl/schemas/adr/2.2/ProblemDetails.schema.json"
              application/json: # fout, een foutresponse hoort problem+json te zijn
                schema:
                  $ref: "#/components/schemas/EigenFout"
              // highlight-end
  ```
  </TabItem>
  <TabItem value="json" label="JSON">
  ```json title="voorbeeld van een response body"
  {
    "status": 400,
    "title": "Ongeldige aanvraag",
    "detail": "Het veld aanvraagdatum heeft niet het formaat jjjj-mm-dd."
  }
  ```
  </TabItem>
</Tabs>
