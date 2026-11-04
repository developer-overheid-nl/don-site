---
content_type: tool
tags:
  - "oas"
  - "api"
---

# OAS Generator

:::info

Deze tool is enkel bedoeld om je op weg te helpen met het API design, inclusief
herbruikbare componenten en best practices van de
[API Design Rules](../standaarden/api-design-rules). Eventuele ontbrekende of foutieve
gegevens dienen handmatig toegevoegd of gewijzigd te worden.

:::

De [OAS Generator](https://developer-overheid-nl.github.io/oas-generator)
genereert een OAS _boilerplate_ op basis van minimale configuratie. De invoer
schrijf je in `YAML` of `JSON`. Het resultaat is een `YAML` of `JSON` template
wat gebruikt kan worden om het API design verder in te vullen. Standaard
genereert de tool OpenAPI 3.1. Hieronder een voorbeeldconfiguratie:

```json
{
  "title": "DON API v1",
  "description": "API of developer.overheid.nl (Developer Overheid NL).",
  "contact": {
    "name": "Team Developer Overheid NL",
    "email": "developer.overheid@geonovum.nl",
    "url": "https://developer.overheid.nl"
  },
  "resources": [
    {
      "name": "repository",
      "plural": "repositories",
      "readonly": false,
      "filters": ["owner_name", "status"]
    },
    {
      "name": "api",
      "plural": "apis",
      "readonly": true
    }
  ]
}
```

De invoer wordt streng gecontroleerd: properties die hieronder niet genoemd
staan, leveren een foutmelding op. Hieronder een overzicht:

| Property        | Type               | Verplicht | Omschrijving                                                                                             |
| --------------- | ------------------ | --------- | -------------------------------------------------------------------------------------------------------- |
| **oasVersion**  | `string`           | Nee       | OpenAPI-versie van het resultaat: `3.1` (standaard) of `3.0`.                                            |
| **title**       | `string`           | Ja        | Naam van de API                                                                                          |
| **description** | `string`           | Ja        | Omschrijving van de API                                                                                  |
| **contact**     | `ContactObject`    | Ja        | Object met contactgegevens van de API.                                                                   |
| **resources**   | `ResourceObject[]` | Ja        | Array van resources die de API onsluit. Op basis hiervan worden de paths, methods en models gegenereerd. |

## `ResourceObject`

| Property     | Type               | Verplicht | Omschrijving                                                                                       |
| ------------ | ------------------ | --------- | -------------------------------------------------------------------------------------------------- |
| **name**     | `string`           | Ja        | Naam (enkelvoud) van de resource. Juiste casing wordt automatisch gegenereerd.                     |
| **plural**   | `string`           | Ja        | Naam (meervoud) van de resource. Juiste casing wordt automatisch gegenereerd.                      |
| **readonly** | `boolean`          | Nee       | Indien `true` worden alleen `GET` methods gegenereerd, anders ook `PUT`, `POST` en `DELETE`.       |
| **filters**  | `string[]`         | Nee       | Filters op de collectie. Zie [Filters](#filters).                                                  |
| **schema**   | `object`, `string` | Nee       | JSON Schema van de resource, inline of als URL. Zie [Eigen schema](#eigen-schema). Niet bij OAS 3.0. |

### Filters

Elke filter wordt een optionele query parameter op de collectie, in
lowerCamelCase en met een standaardomschrijving. Zo levert `owner_name` op
`GET /repositories` de parameter `ownerName` op. Filters moeten uniek zijn. De
tool controleert niet of een filter ook voorkomt in het schema van de resource.

### Eigen schema

Zonder `schema` genereert de tool een schema met alleen een `id` property. Met
`schema` geef je zelf een JSON Schema mee:

- Een inline schema (`object`) komt onder `components/schemas` te staan.
- Bij een URL (`string`) verwijzen de operaties met een `$ref` rechtstreeks naar
  dat externe schema.

In de editor van de tool is zo'n URL onderstreept. Beweeg je er met de muis
overheen, dan zie je een voorvertoning van het schema. Met Cmd/Ctrl+klik open je
de URL in een nieuw tabblad. De voorvertoning werkt alleen als de server van het
schema dit toestaat (CORS).

```json
{
  "name": "repository",
  "plural": "repositories",
  "schema": "https://example.com/schemas/repository.json"
}
```

### Collecties

Een collectie (`GET /repositories`) geeft geen platte array terug, maar een
object met de resources onder de key `items`. Zo kun je de response later
uitbreiden, bijvoorbeeld met paginering, zonder breaking change. Het schema
daarvan heet `{Name}Collection`, bijvoorbeeld `RepositoryCollection`.

```json
{
  "items": [{ "id": "4f9c7a54-6c0a-4d4b-9d2e-0a1b2c3d4e5f" }]
}
```

## `ContactObject`

| Property  | Type     | Omschrijving                                                     |
| --------- | -------- | ---------------------------------------------------------------- |
| **name**  | `string` | Naam van de contactpersoon/afdeling die over de API gaat.        |
| **email** | `string` | E-mailadres van de contactpersoon/afdeling die over de API gaat. |
| **url**   | `string` | Website van de contactpersoon/afdeling die over de API gaat.     |

## Gebruik via de command line

De generator werkt ook zonder browser. Dit commando controleert de invoer en
schrijft de gegenereerde OAS weg. Op de command line is zowel de invoer als het
resultaat `JSON`:

```bash
npx github:developer-overheid-nl/oas-generator input.json -o openapi.json
```
