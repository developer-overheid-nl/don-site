---
title: "De drie lagen van API-toegang"
sidebar_position: 1
description: "Van onboarding tot runtime-controle: zo bouw je een gelaagde aanpak voor veilige API-toegang."
tags:
  - security
  - best-practice
  - access-control
---

# De drie lagen van API-toegang

Een robuuste toegangsstrategie voor API's bestaat uit meerdere lagen die elkaar versterken.
Deze pagina vertaalt de aanbevelingen uit de Geonovum-module _API Access Control_ naar de
DON-kennisbank, zodat ze direct toepasbaar zijn voor Nederlandse (semi)overheden.

![Drie toegangs-lagen voor API's](/img/security/api-access-layers.png)

## 1. Onboarding van organisaties en gebruikers

- **Doel**: zeker weten wie er achter een integratie zit.
- **Aanpak**: vraag organisaties en hun vertegenwoordigers om registratie & KYC (Know Your Customer).
- **Identiteitsmiddelen**: laat credentials uitgeven door de dienstverlener zelf of maak gebruik van
  vertrouwde identity providers, zoals PKIoverheid-certificaten of eIDAS-middelen.
- **Afspraken**: beschrijf wie verantwoordelijk is voor accordering en beheer van accounts, inclusief lifecycle-management.

## 2. Clientregistratie

- **Doel**: systemen en applicaties koppelen aan een vertrouwde organisatie/gebruikerscontext.
- **Registratiemodellen**:
  - _Open_: onbeheerd of dynamisch; geschikt voor laag-risico scenario's.
  - _Whitelist_: vooraf goedgekeurde clients.
  - _Expliciet_: per client een intake door een beheerder.
- **Standaarden**: gebruik waar mogelijk de OAuth 2.0 client registration-flows, zoals het
  [Client Credentials-flow](https://gitdocumentatie.logius.nl/publicatie/api/oauth/v1.1.0-rc.1/#use-case-client-credentials-flow)
  of het
  [Authorization Code-flow](https://gitdocumentatie.logius.nl/publicatie/api/oauth/v1.1.0-rc.1/#use-case-authorization-code-flow).
- **Beheer**: leg vast hoe client-secrets worden uitgedeeld, geroteerd en ingetrokken.

## 3. Runtime-toegang en handhaving

- **Tokenvalidatie**: laat een API-gateway of edge-service ieder verzoek voorzien van een geldigheidscheck op het access token.
- **Standaarden**: OAuth 2.0 / OpenID Connect, of SAML 2.0 wanneer federatieve authenticatie nodig is.
- **Contextafhankelijke policies**: combineer scopes, attributen en rate-limits om misuse te voorkomen.
- **Transparantie voor afnemers**: documenteer welke scopes of policies nodig zijn per endpoint.

### HTTPS (TLS) als randvoorwaarde

- Alle verkeer verloopt via HTTPS conform de [API Design Rules transportlaag](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/transport/tls).
- Volg de meest recente [TLS-richtlijnen van het NCSC](https://www.ncsc.nl/documenten/publicaties/2025/juni/01/ict-beveiligingsrichtlijnen-voor-transport-layer-security-2025-05).
- Gebruik certificaten van erkende Certificate Authorities (bijvoorbeeld PKIoverheid).

### Netwerksegmentatie

- Bescherm APIs via passende netwerkzones (internet, Diginetwerk, gesloten overheidsnetten).
- Leg vast welke netwerken vereist zijn per omgeving (dev/test/prod) en stem firewallbeleid daarop af.

---

**Bron**: Geonovum, [_API Access Control_](https://geonovum.github.io/KP-APIs/API-strategie-modules/access-control/), CC0.
