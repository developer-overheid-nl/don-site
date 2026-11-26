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

## Verwijzen naar het NCSC

Voor domeinen van de Rijksoverheid is er nog een centrale optie: het Nationaal
Cyber Security Centrum (NCSC). Het NCSC is het centrale meldpunt voor
kwetsbaarheden en incidenten bij de Rijksoverheid. Volgens de
[security.txt van het NCSC](https://www.ncsc.nl/.well-known/security.txt) mogen
domeinen van de Rijksoverheid daarom met een 302 redirect naar dat bestand
verwijzen.
[Rijksoverheid.nl](https://www.rijksoverheid.nl/.well-known/security.txt) doet
dit bijvoorbeeld.

Let daarbij op het volgende:

- Dit geldt alleen voor domeinen van de Rijksoverheid. Andere overheden en
  organisaties nemen een eigen contactadres op. Voor hen is het NCSC alleen een
  intermediair, als een melder bij de eigenaar zelf geen adequate reactie krijgt
  (zie [kwetsbaarheid melden](https://www.ncsc.nl/contact/kwetsbaarheid-melden)
  bij het NCSC).
- Het is een mogelijkheid, geen verplichting. Een organisatie met een eigen
  CVD-proces, zoals de Belastingdienst, publiceert een eigen security.txt.
- Gebruik een 302 redirect, zoals het NCSC aangeeft, en geen kopie van het
  bestand. Dan blijven de velden, zoals de vervaldatum (`Expires`), actueel
  zonder dat je zelf iets hoeft bij te werken.
- Net als bij een eigen centrale security.txt moet een melding daarna nog bij
  het team komen dat de dienst beheert. Zorg dat bekend is wie dat is.

## Productie-, test- en demo-omgevingen

Een security.txt geldt alleen voor het domein waarop het staat, niet voor
subdomeinen of het bovenliggende domein
([RFC 9116, sectie 3.1](https://www.rfc-editor.org/rfc/rfc9116#section-3.1)).
Staat de productieomgeving op `www.voorbeeld.nl` en een demo op
`demo.voorbeeld.nl`, dan heeft de demo dus een eigen security.txt of een
redirect nodig.

Test-, acceptatie- en demo-omgevingen worden makkelijk vergeten, terwijl ze voor
een aanvaller interessant kunnen zijn: er draait soms een andere versie, of er
staan debugopties aan. Ook kan de beheerder verschillen; een demo wordt
bijvoorbeeld door een leverancier beheerd.

- Zet op elke publiek bereikbare omgeving een security.txt, of een redirect naar
  het centrale bestand.
- Controleer of het contactadres ook voor die omgeving klopt. Beheert een
  leverancier de omgeving, spreek dan af wie meldingen afhandelt.
- Behandel je meldingen over een test- of demo-omgeving anders, beschrijf dat
  dan in het beleid waarnaar het veld `Policy` verwijst.

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

## Open source code op GitHub

Een security.txt is bedoeld voor websites en API's. Publiceer je ook de
broncode, dan zoeken melders in de repository naar een
[SECURITY.md](../../open-source/standaarden/security.mdx).

Op GitHub kun je daarnaast
[private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/working-with-repository-security-advisories/configuring-private-vulnerability-reporting-for-a-repository)
aanzetten. Een melder ziet dan bij de security advisories van de repository een
knop **Report a vulnerability** en meldt de kwetsbaarheid vertrouwelijk: alleen
de beheerders van de repository zien de melding. Je zet het aan in de
instellingen van de repository, onder **Advanced Security**, of voor alle
repositories tegelijk op het niveau van de organisatie.

Een voorbeeld is de
[SECURITY.md van Wies](https://github.com/RijksICTGilde/wies/blob/main/SECURITY.md),
uit de GitHub-organisatie van het Rijks ICT Gilde. Die noemt drie routes:

- een e-mailadres van het team;
- vertrouwelijk melden via GitHub, voor wie een GitHub-account heeft;
- het NCSC, als het team niet reageert.

Gebruik in de SECURITY.md dezelfde contactgegevens als in de security.txt van de
dienst. Dan komen melders via beide routes bij hetzelfde team uit.

## Meer informatie

Meer informatie over hoe je als organisatie om moet gaan met de security.txt
standaard vind je hier:
* [www.digitaltrustcenter.nl](https://www.digitaltrustcenter.nl/securitytxt)
* [RFC9116](https://datatracker.ietf.org/doc/html/rfc9116)
