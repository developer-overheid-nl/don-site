---
content_type: standaard
tags: [adr, api, interoperabiliteit]
description: "Een API accepteert elke tijdzone-offset in een datumtijd in een request en antwoordt bij voorkeur in UTC."
---

# /core/date-time/timezone

Een API **moet** elke tijdzone-offset accepteren in velden met een datumtijd in
een request. In een response **hoort** een datumtijd in UTC te staan, dus met
`Z` als offset.

Het verschil is bewust. Een client ergens anders in de wereld mag `+05:30`
sturen zonder dat de API hem afwijst; wat de API teruggeeft is één vorm, zodat
afnemers niet elk hun eigen conversie hoeven te doen.

- Regel:
  https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/date-time/timezone
- Linterregels: `nlgov:date-time-ensure-timezone`, `nlgov:time-without-timezone`

## Wat dit betekent voor je waarden

| Waarde                      | Oordeel                                         |
| --------------------------- | ----------------------------------------------- |
| `2026-10-08T09:00:00Z`      | Goed, UTC                                       |
| `2026-10-08T11:00:00+02:00` | Goed in een request, in een response liever UTC |
| `2026-10-08T09:00:00`       | Fout, geen offset                               |
| `1760000000`                | Fout, epoch in plaats van een datumtijd         |

Een veld met `"format": "time-local"` is de uitzondering: dat is per definitie
een kloktijd zonder zone. Gebruik dat alleen als de zone echt niet van
toepassing is, zoals een openingstijd.
