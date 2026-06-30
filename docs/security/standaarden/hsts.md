---
content_type: standaard
tags:
  - "informatiebeveiliging"
  - "websecurity"
title: "HTTP Strict Transport Security (HSTS)"
---

HTTP Strict Transport Security (HSTS) is een webstandaard waarmee een website
aan browsers kenbaar maakt dat deze uitsluitend via HTTPS benaderd mag worden.
Hierdoor wordt voorkomen dat bezoekers onbedoeld of door een aanval terechtkomen
op een onbeveiligde HTTP-verbinding.

HSTS vormt een belangrijke aanvullende beveiligingsmaatregel bovenop HTTPS en
beschermt tegen aanvallen waarbij een versleutelde verbinding wordt
teruggebracht naar of geinitieerd over een onbeveiligde verbinding
(ook wel *SSL stripping* genoemd).

## Configuratie

HSTS wordt geactiveerd door het meesturen van een HTTP-header:

```http
Strict-Transport-Security: max-age=31536000;
```

De mogelijke opties zijn:

* `max-age`: het aantal seconden dat de browser moet onthouden dat HTTPS
  verplicht is.
* `includeSubDomains`: zorgt ervoor dat de HSTS ook geldt voor alle
  subdomeinen.
* `preload`: optionele toevoeging voor opname in de HSTS preload-lijst van
  browsers.

Een veelgebruikte configuratie is:

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains;
```

## Voorwaarden voor gebruik

Voordat HSTS wordt ingeschakeld moet een applicatie volledig via HTTPS
functioneren.

Controleer daarom onder andere:

* Of alle pagina's en API-endpoints via HTTPS bereikbaar zijn.
* Of HTTP-verkeer automatisch wordt doorgestuurd naar HTTPS.
* Of certificaten correct zijn geconfigureerd en tijdig worden vernieuwd.
* Of alle subdomeinen HTTPS ondersteunen wanneer `includeSubDomains` wordt
  gebruikt.

Een onjuiste configuratie kan ertoe leiden dat gebruikers een website tijdelijk
niet meer kunnen bereiken.

## Toepasbaar op websites en API's

De HSTS-standaard geldt zowel voor websites als voor API's.

Iedere internettoepassing die via HTTP(S) bereikbaar is profiteert van het
afdwingen van versleutelde verbindingen. Dit voorkomt dat gevoelige gegevens,
zoals authenticatiegegevens, persoonsgegevens of API-tokens, via onbeveiligde
verbindingen worden verzonden.

## HSTS Preload

Normaal gesproken leert een browser pas dat een website HSTS gebruikt nadat de
website minimaal één keer via HTTPS bezocht is.

Om ook het allereerste bezoek te beschermen kunnen domeinen worden opgenomen in
de zogenaamde *HSTS preload list*. Deze lijst wordt standaard meegeleverd in
moderne browsers.

Voor opname gelden aanvullende eisen, waaronder:

* Een geldige HTTPS-configuratie.
* Een HSTS-header met een lange `max-age`, minimaal 1 jaar of 31536000 seconden.
* Het gebruik van `includeSubDomains`.
* Het gebruik van de `preload`-directive.

Opname in de preload-lijst vereist zorgvuldige afweging omdat het verwijderen
van een domein uit de lijst langdurig kan zijn.

## Wettelijke verplichting voor de Nederlandse overheid

Voor Nederlandse overheidsorganisaties is het gebruik van HTTPS en HSTS niet
alleen een best practice, maar sinds 1 juli 2023 ook een wettelijke
verplichting.

Deze verplichting volgt uit het *Besluit beveiligde verbinding met
overheidswebsites en -webapplicaties* onder de Wet digitale overheid. De
verplichting geldt voor publiek toegankelijke websites en webapplicaties van
onder meer:

* Het Rijk.
* Provincies.
* Gemeenten.
* Waterschappen.
* Organisaties binnen de (semi-)publieke sector.

Daarnaast staan HTTPS en HSTS op de lijst van verplichte open standaarden van
Forum Standaardisatie. De standaarden moeten worden toegepast op de communicatie
tussen clients en servers voor websites en webservices.

## Validatie

Het is raadzaam om doorlopend te controleren of HSTS correct is ingericht.

Enkele aandachtspunten:

* Wordt de HSTS-header daadwerkelijk meegestuurd?
* Is er maar 1 actieve HSTS header?
* Is de ingestelde `max-age` voldoende lang?
* Zijn certificaten geldig en actueel?
* Werken alle subdomeinen correct wanneer `includeSubDomains` is geconfigureerd?
* Blijft de configuratie correct functioneren na wijzigingen in hosting of
  infrastructuur?

## Testen

Voor het testen van HTTPS- en HSTS-configuraties kunnen onder andere de volgende
hulpmiddelen worden gebruikt:

* https://internet.nl/
* https://openkat.nl/
* Browser Developer Tools (Network-tab)

## Meer informatie

Meer informatie over HTTPS en HSTS is beschikbaar via:

* [Forum Standaardisatie – HTTPS en HSTS](https://www.forumstandaardisatie.nl/open-standaarden/https-en-hsts)
* [RFC 6797 - HTTP Strict Transport Security (HSTS)](https://www.rfc-editor.org/info/rfc6797/)
* [FAQ over verplichting](https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/wetgeving/wet-digitale-overheid-wdo/veelgestelde-vragen-verplichting-https-en-hsts-voor-overheidswebsites/)
* [NCSC ICT-beveiligingsrichtlijnen voor webapplicaties](https://www.ncsc.nl/webapplicaties/ict-beveiligingsrichtlijnen-webapplicaties)
* [Internet.nl](https://internet.nl)
* [Mozilla developer network HSTS informatie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security)
