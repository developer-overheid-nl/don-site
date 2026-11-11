---
content_type: standaard
tags:
  - "api"
  - "adr"
  - "rest"
sidebar_position: 0
---

# ADR Cheat Sheet

Het actuele en uitgebreide overzicht van de REST API Design Rules vind je in de
gepubliceerde standaard:
[NLGov REST API Design Rules](https://gitdocumentatie.logius.nl/publicatie/api/adr/).
Hieronder vind je een extract met de belangrijkste technische regels en best
practices om te gebruiken tijdens het ontwerpen van een API.

## Gebruik OpenAPI Specification

:::warning[Verplichte standaard]

Naast dat deze regels onderdeel zijn van de API Design Rules, is het gebruik van
de OpenAPI Specification ook een eigen verplichte standaard op de
pas-toe-leg-uit-lijst bij Forum Standaardisatie:
[https://www.forumstandaardisatie.nl/open-standaarden/openapi-specification](https://www.forumstandaardisatie.nl/open-standaarden/openapi-specification)

:::

- Bied een OpenAPI Specification aan waarin de API is gespecificeerd.
- Het document dient in `JSON` formaat beschikbaar te zijn.
- Het document dient op de standaardlocatie `openapi.json` achter de baseUrl van
  het endpoint te staan.
- Het document dient resolvable te zijn vanaf elk domein, dus zonder
  authenticatie en met de juiste CORS policy:
  - ✅**Goed**: `Access-Control-Allow-Origin: *`
  - ⛔️**Fout**: `Access-Control-Allow-Origin: https://developer.overheid.nl`

## Gebruik Nederlands

Voor zowel de documentatie als de interface zelf geldt dat de Nederlandse taal
leidend is, tenzij er al Engelse documentatie voorhanden is.

## Contactinformatie

Het OpenAPI document moet een geldig `contact` object bevatten:

- `name`: naam van het verantwoordelijke team/afdeling.
- `url`: nuttige URL om contact op te kunnen nemen, dus bijvoorbeeld een
  issuetracker in plaats van `www.ministerie.nl`.
- `email`: nuttig e-mailadres om contact op te kunnen nemen, dus bijvoorbeeld
  een team in plaats van `info@ministerie.nl`.

Voorbeeld van een geldig `info.contact` object:

```json
{
  "contact": {
    "name": "Gebouwen API beheerder",
    "url": "https://www.github.com/ministerie/gebouwen/issues",
    "email": "teamgebouwen@ministerie.nl"
  }
}
```

## Versioning

- Gebruik semantic versioning (`major.minor.patch`) voor de volledige API
  versie, bijv. `2.1.4`
- Geef bij elke response een `API-Version` header terug met daarin de volledige
  API versie, bijv. `API-Version: 2.1.4`
- De major version moet onderdeel zijn van het endpoint, prefixed met een `v`,
  bijv. `https://api.developer.overheid.nl/v1`. Dit dient ook in het `servers`
  object van de OpenAPI Specificatie zo opgenomen te zijn.

Voorbeeld van een geldig `info.servers` object:

```json
{
  "servers": [
    {
      "url": "https://api.example.com/v1",
      "description": "Productie omgeving"
    },
    {
      "url": "https://sandbox-api.example.com:8443/v1",
      "description": "Sandbox omgeving"
    }
  ]
}
```

## Response bodies

- Gebruik `application/json` voor response bodies.
- Gebruik `lowerCamelCase` voor properties, bijvoorbeeld `organisatieNaam`.
- Geef altijd een object terug, nooit een losse array. Bij een collectie staan
  de resources in de property `items`. Een object laat ruimte om later velden
  toe te voegen, zoals paginering, zonder dat dat een breaking change is.

✅**Goed**:

```json title="GET /rijksmonumenten"
{
  "items": [
    { "id": 12, "naam": "Domtoren" },
    { "id": 13, "naam": "Ridderzaal" }
  ]
}
```

⛔️**Fout**:

```json title="GET /rijksmonumenten"
[
  { "id": 12, "naam": "Domtoren" },
  { "id": 13, "naam": "Ridderzaal" }
]
```

## Foutafhandeling

Een 4xx- of 5xx-response gebruikt `application/problem+json` of
`application/problem+xml` en volgt
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html). Een eigen formaat zoals
`{ "error": "..." }` voldoet niet.

Verplicht zijn `status`, `title` en `detail`. De velden `type` en `instance`
mogen erbij.

```json title="voorbeeld van een 400-response"
{
  "status": 400,
  "title": "Ongeldige aanvraag",
  "detail": "Het veld aanvraagdatum heeft niet het formaat jjjj-mm-dd."
}
```

Ongeldige invoer levert een `400`, en bij voorkeur staan alle validatiefouten in
één antwoord in plaats van alleen de eerste. Zie
[Problem Details](../../architectuur/problem-details) voor de achtergrond en
[hoe te voldoen](./hoe-te-voldoen/error-handling-problem-details) voor de
OAS-uitwerking.

## Datum en tijd

Een datum-, tijd- of datumtijdveld is in de OAS altijd een `string` met een
`format`:

| Soort veld | OpenAPI-format           | Voorbeeld              |
| ---------- | ------------------------ | ---------------------- |
| Datum      | `"format": "date"`       | `2026-10-08`           |
| Datumtijd  | `"format": "date-time"`  | `2026-10-08T09:00:00Z` |
| Tijd       | `"format": "time-local"` | `09:00:00`             |

- Een datumtijd heeft een tijdzone-offset. Zonder offset is hij niet eenduidig.
- Een API accepteert elke offset in een request en antwoordt bij voorkeur in
  UTC.
- Is de oorspronkelijke tijdzone relevant voor gebruikers, publiceer de offset
  dan in een apart veld, bijvoorbeeld `+02:00`.
- Is het tijdstip niet relevant, gebruik dan `date` en niet `date-time`. Een
  geboortedatum als `date-time` verschuift een dag zodra iemand hem in een
  andere tijdzone leest.
- Een epoch-getal voldoet niet, ook niet met uitleg in de omschrijving.

## HTTP methods

| Method | Wanneer te gebruiken              | Voorbeeld                    | Omschrijving                               |
| ------ | --------------------------------- | ---------------------------- | ------------------------------------------ |
| GET    | Collectie ophalen                 | `GET /rijksmonumenten`       | Lijst van rijksmonumenten ophalen          |
| GET    | Resource ophalen                  | `GET /rijksmonumenten/12`    | Rijksmonument #12 ophalen                  |
| POST   | Nieuwe resource maken             | `POST /rijksmonumenten`      | Nieuw rijksmonument maken                  |
| PUT    | Resource in zijn geheel vervangen | `PUT /rijksmonumenten/12`    | Rijksmonument #12 in zijn geheel vervangen |
| PATCH  | Resource gedeeltelijk vervangen   | `PATCH /rijksmonumenten/12`  | Rijksmonument #12 gedeeltelijk vervangen   |
| DELETE | Resource verwijderen              | `DELETE /rijksmonumenten/12` | Rijksmonument #12 verwijderen              |

## Status codes

| Status code | Omschrijving                            | Wanneer te gebruiken                                                                                  |
| ----------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 200         | Ok                                      | GET, PUT, PATCH, DELETE, als de request succesvol is uitgevoerd                                       |
| 201         | Created                                 | POST, als nieuwe resource direct wordt teruggegeven                                                   |
| 202         | Accepted                                | Als de request een asynchrone response triggert, bijvoorbeeld een POST die niet direct verwerkt wordt |
| 400         | Bad request                             | Verplicht bij ongeldige invoer: syntaxfouten, ontbrekende of ongeldige query parameters               |
| 404         | Not found                               | Als de request URI niet gevonden wordt of een resource niet bestaat                                   |
| 406 / 415   | Not acceptable / Unsupported media type | Verplicht bij een onverwachte of ontbrekende `Content-Type`                                           |

## URI's

Let op dat een URI twee schrijfwijzen combineert: het pad is `kebab-case`, de
query keys zijn `lowerCamelCase`.

- Collecties in (Nederlands) meervoud.
  - ✅**Goed**: `https://api/v1/open-source-projecten`
- Child genest onder resource in (Nederlands) meervoud.
  - ✅**Goed**: `https://api/v1/organisaties/372/open-source-projecten`
- Padsegmenten bevatten alleen kleine letters, cijfers en koppeltekens.
  - ✅**Goed**: `https://api/v1/open-source-projecten`
  - ⛔️**Fout**: `https://api/v1/openSourceProjecten`
  - Een padvariabele houdt zijn OAS-notatie, dus `{organisatieId}` mag, en het
    laatste segment mag met een `_` beginnen voor een bewerking: `/_zoek`
- Query keys zijn `lowerCamelCase` en beginnen niet met een cijfer.
  - ✅**Goed**: `?aantalPerPagina=20`
  - ⛔️**Fout**: `?aantal-per-pagina=20`
- URI's mogen niet op een slash eindigen.
  - ✅**Goed**: `https://api/v1/open-source-projecten`
  - ⛔️**Fout**: `https://api/v1/open-source-projecten/`
- URI's mogen geen gevoelige informatie bevatten omdat dit bijv. in logs terecht
  kan komen.
  - ⛔️**Fout**: `https://api/v1/personen?bsn=123234345456`

## Tools

- [API Design Rules Checker](../../tools/api-design-rules-linter)
- [OpenAPI Spec generator](../../tools/openapi-specification-generator)
