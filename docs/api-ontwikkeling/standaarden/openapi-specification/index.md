---
content_type: standaard
tags:
  - "oas"
  - "api"
---

# OpenAPI Specification (OAS)

:::info[Verplichte standaard]

Deze standaard is
[verplicht voor REST API's](https://www.forumstandaardisatie.nl/open-standaarden/openapi-specification)
van de overheid. De standaard is OAS 3.1; de status "pas toe of leg uit" geldt
voor deze versie per 1 januari 2027.

:::

Met OAS kunnen alle endpoints, responses en requests van een API gedetailleerd
beschreven worden in het machine-leesbare `YAML` of `JSON` formaat. De
[OAS Generator](../../tools/openapi-specification-generator.md) genereert op
basis van minimale configuratie een kant-en-klare OAS template die voldoet aan
de [REST API Design Rules](../api-design-rules).

OAS 3.1 is volledig verenigbaar met JSON Schema (draft 2020-12). Een schema dat
je eenmaal hebt beschreven, kun je daardoor met `$ref` hergebruiken in elke
API-beschrijving, ook als het ergens anders gepubliceerd staat.

OAS wordt beheerd door het [OpenAPI Initiative](https://www.openapis.org/). De
volledige documentatie over de specificatie is te vinden op:
[OpenAPI Specification 3.1](https://spec.openapis.org/oas/v3.1).
