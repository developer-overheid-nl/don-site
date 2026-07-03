---
content_type: standaard
tags:
  - "informatiebeveiliging"
title: "Security.txt"
---

De security.txt standaard zorgt ervoor dat ethische hackers laagdrempelig
kwetsbaarheden kunnen melden bij de eigenaar/ beheerder van een applicatie.

## Path

Het bestandje wordt op de volgende plek geplaatst:

`https://voorbeeld.nl/.well-known/security.txt`

n.b., Een oudere variant van de standaard plaatste de file direct in de root, 
dit is niet meer valide. Ook *moet* de file over https geserveerd worden.

## Genereren met een tool

Voor het genereren van een security.txt heeft
[securitytxt.org](https://securitytxt.org/) een aan te bevelen tool.

## Toepasbaar op websites en API's

De security.txt standaard geldt voor zowel websites als API's. Achter beide type
applicaties zitten levende codebases die kwetsbaarheden kunnen bevatten en die
onderhoud vergen.

## Doorverwijzen naar een centrale security.txt

Sommige organisaties hebben een centrale security.txt waarnaar alle diensten
doorverwijzen middels een 302 redirect. Een organisatie zoals het CBS (Centraal
Bureau voor de Statistiek) doet dit. Je vindt het security.txt bestand van het
CBS [hier](https://www.cbs.nl/.well-known/security.txt).

Het voordeel hiervan is dat er maar één security.txt up-to-date gehouden moet
worden. Een nadeel hiervan kan zijn dat het niet direct helder is welke afdeling
of welk persoon er verantwoordelijk is voor de dienst. Hier moet degene die in
contact wil komen met de beheerder dan achter komen via de het algemene
e-mailadres die in het centrale security.txt bestand staat.

## Contactinformatie

Het doel van een security.txt file is het aanbieden van Contactinformatie aan
beveiligingsonderzoekers zodat zij gevonden problemen tijdig, en veilig kunnen
melden bij de juiste personen zonder deze perongeluk te lekken.

Om deze reden is het belangrijk om de volgende zaken goed te valideren indien
van toepassing.
* Klopt het gebruikte emailadres, en wordt deze door de juiste personen gelezen?
* Klopt het web-formulier, en is deze ook benaderbaar als er problemen zijn met
de site zelf?
* Is er een veilige manier om ernstige kwetsbaarheden te melden, bijvoorbeeld
door met PGP encryptie te mailen?
* Bij doorverwijzingen naar andere domeinen or email-hosts is het van belang
regelmatig te valideren of deze nog wel geregistreerd zijn, danwel van de
verwachte eigenaar zijn.

## Meer informatie

Meer informatie over hoe je als organisatie om moet gaan met de security.txt
standaard vind je hier:
* [www.digitaltrustcenter.nl](https://www.digitaltrustcenter.nl/securitytxt)
* [RFC9116](https://datatracker.ietf.org/doc/html/rfc9116)
