---
content_type: standaard
tags: [adr, api, interoperabiliteit]
description: "Is het tijdsdeel niet relevant, gebruik dan format date in plaats van date-time."
---

# /core/date-time/date-omit-time-portion

Is het tijdsdeel niet relevant, dan gebruik je `"format": "date"` en niet
`"format": "date-time"`.

Dat lijkt een detail en is het niet. Een geboortedatum of een aanvraagdatum als
`date-time` dwingt iedereen die hem leest tot een keuze over het tijdstip, en
dat tijdstip is verzonnen. `1990-03-14T00:00:00Z` wordt in een andere tijdzone
een dag eerder of later, en dan verschuift de geboortedatum.

- Regel:
  https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/date-time/date-omit-time-portion
- Linterregels: `nlgov:use-date-instead-of-datetime`

## Hoe je kiest

Vraag je af of een afnemer iets met het tijdstip doet. Is het antwoord nee, dan
is `date` de juiste keuze.

| Veld              | Format      | Waarom                                      |
| ----------------- | ----------- | ------------------------------------------- |
| `geboortedatum`   | `date`      | Het tijdstip bestaat niet in de registratie |
| `aanvraagdatum`   | `date`      | De dag is wat de wet erover zegt            |
| `ingediendOp`     | `date-time` | Het moment telt voor een termijn            |
| `laatstGewijzigd` | `date-time` | Een afnemer synchroniseert hierop           |
