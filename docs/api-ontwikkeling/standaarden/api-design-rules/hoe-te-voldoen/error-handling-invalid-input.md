---
content_type: standaard
tags: [adr, api, interoperabiliteit]
description: "Een request met ongeldige invoer levert een 400, en het antwoord noemt bij voorkeur alle validatiefouten tegelijk."
---

# /core/error-handling/invalid-input

Een request met ongeldige invoer **moet** een `400 Bad Request` opleveren.
Daaronder vallen syntaxfouten en ontbrekende of ongeldige query parameters.

- Regel:
  https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/error-handling/invalid-input
- Linterregels: `nlgov:problem-invalid-input`

## Alle fouten tegelijk

Een aanverwante regel,
[`/core/error-handling/all-errors`](https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/error-handling/all-errors),
zegt dat een 400 bij voorkeur **alle** schemavalidatiefouten bevat en niet
alleen de eerste. De linter controleert dit niet: of een API bij drie fouten
drie meldingen teruggeeft, is niet uit de OAS te lezen.

Voor wie het invult: een afnemer die per ronde één fout terugkrijgt, heeft drie
rondes nodig om een formulier goed te krijgen. Dat is precies de reden voor deze
regel.

## Uitdrukken in OAS

Een `400` is geen response die je weg kunt laten omdat hij vanzelfsprekend is.
Zet hem expliciet in de OAS, met `application/problem+json` conform
[`/core/error-handling/problem-details`](./error-handling-problem-details).

```yaml title="/openapi.yaml"
openapi: 3.1.0
paths:
  /subsidieaanvragen:
    post:
      responses:
        "201":
          description: Aanvraag aangemaakt
        // highlight-start
        "400":
          description: Ongeldige aanvraag
          content:
            application/problem+json:
              schema:
                $ref: "https://static.developer.overheid.nl/schemas/adr/2.2/ProblemDetails.schema.json"
        // highlight-end
```
