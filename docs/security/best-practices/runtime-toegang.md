---
title: "Runtime toegangscontrole en foutafhandeling"
sidebar_position: 2
description: "Richtlijnen voor tokengebruik, headers en foutcodes bij het afdwingen van API-toegang."
tags:
  - security
  - best-practice
  - access-control
---

# Runtime toegangscontrole en foutafhandeling

Tijdens runtime bepaalt de API of een verzoek daadwerkelijk mag worden uitgevoerd.
Onderstaande aanbevelingen helpen om tokens veilig te verwerken, consistente foutcodes terug te geven
en logging op orde te houden.

## Tokens als enige bron van waarheid

- **Stateless**: baseer autorisatie op het meegeleverde token, niet op serversessies.
- **Formaat**: pas waar mogelijk OAuth 2.0 of OpenID Connect toe; SAML 2.0 is een alternatief voor federatieve ketens.
- **Delegatie**: gebruik OAuth-scopes om rechten te begrenzen. Zie ook de
  [NL GOV Assurance-profielen](https://gitdocumentatie.logius.nl/publicatie/api/oauth/).

### Headers voor geautoriseerde en niet-geautoriseerde clients

| Scenario            | Headervoorbeeld                         | Toelichting                                         |
| ------------------- | --------------------------------------- | --------------------------------------------------- |
| Geautoriseerd       | `Authorization: Bearer <token>`         | OAuth 2.0 bearer token met scopes/claims.           |
| Niet-geautoriseerd  | `X-Api-Key: <api-key>`                  | Alleen gebruiken voor beperkt risico en read-only.  |

> Zet tokens nooit in queryparameters: webservers loggen deze vaak en vergroten zo het risico op datalekken.

## Foutafhandeling: 401, 403 of 404?

Geef zo min mogelijk informatie prijs, maar wees wel voorspelbaar voor legitieme afnemers:

- **401 Unauthorized**: authenticatiegegevens ontbreken of zijn ongeldig.
- **403 Forbidden**: authenticatie is in orde, maar autorisatie faalt (scope/claim/policy mismatch).
- **404 Not Found**: gebruik dit wanneer je het bestaan van een resource wilt verbergen voor niet-geautoriseerde clients.

Pas flowcharts toe (zie originele module) om te bepalen welke code past bij jouw situatie (implicit vs. explicit authentication).

## HTTPS en netwerkbeveiliging

- **TLS-only**: verplicht HTTPS voor alle endpoints, inclusief interne varianten.
- **Configuratie**: volg de [NCSC TLS-richtlijnen](https://www.ncsc.nl/documenten/publicaties/2025/juni/01/ict-beveiligingsrichtlijnen-voor-transport-layer-security-2025-05).
- **Netwerktoegang**: beperk toegang via segmentatie (bijvoorbeeld Diginetwerk of gesloten VPNs) waar passend.

## Logging en monitoring

- Log mislukte authenticaties inclusief redencodes (zonder tokens weg te schrijven).
- Monitor op verdachte patronen: veel 401/403-responses of afwijkende IP-ranges kunnen op brute force duiden.
- Zorg dat logging voldoet aan BIO2/NIS2-eisen en bewaartermijnen.

---

**Bron**: Geonovum, [_API Access Control_](https://geonovum.github.io/KP-APIs/API-strategie-modules/access-control/), CC0.
