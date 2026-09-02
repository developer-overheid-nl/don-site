---
tags:
  - "open-source"
  - "front-end"
  - "toegankelijkheid"
  - "manon"
title: "Manon"
---

> **Manon is een flexibel en toegankelijk design framework voor semantische HTML
> , gericht op herbruikbaarheid, eenvoud en duurzame front-end ontwikkeling.**
([oss.developer.overheid.nl][1])

**Direct naar Manon:** [https://minvws.github.io/nl-rdo-manon/](https://minvws.github.io/nl-rdo-manon/)

Moderne websites en applicaties worden steeds complexer. Frameworks, build
tooling, utility libraries en JavaScript-afhankelijkheden stapelen zich op,
terwijl veel functionaliteit eigenlijk al beschikbaar is in de browser zelf.

Manon kiest bewust voor een andere aanpak. Het framework is ontworpen rondom een
aantal eenvoudige uitgangspunten:

* Cleane, herbruikbare HTML.
* Zo min mogelijk styling in content.
* Herbruikbare backend-templates.
* Zo min mogelijk utility classes.
* Semantische HTML als basis.
* Toegankelijkheid (a11y) als uitgangspunt.
* Uitgebreide testbaarheid.
* Goede ondersteuning voor thematisering.
* Ondersteuning voor verschillende overheidshuisstijlen.
* Native HTML en CSS waar mogelijk.
* JavaScript alleen wanneer het daadwerkelijk nodig is.

Hierdoor ontstaat een front-end architectuur die eenvoudiger te onderhouden,
beter te testen en toegankelijker is voor eindgebruikers.

## Waarom Manon?

Veel front-end oplossingen verplaatsen logica naar JavaScript of abstraheren
standaard browserfunctionaliteit achter frameworks. Daardoor ontstaan vaak extra
afhankelijkheden, hogere onderhoudskosten en meer potentiële beveiligings-,
onderhouds- en complexiteits-risico's.

Manon vertrekt vanuit het tegenovergestelde principe:

1. Gebruik eerst native HTML.
2. Voeg CSS toe voor presentatie.
3. Gebruik JavaScript uitsluitend als aanvulling.

Semantische HTML levert namelijk direct voordelen op voor toegankelijkheid,
toetsenbordnavigatie, screenreaders en onderhoudbaarheid. Native HTML-elementen
bieden deze functionaliteit standaard zonder extra code. ([Usability & Digital Accessibility][2])

## Semantiek boven utility classes

Manon legt de nadruk op betekenisvolle HTML-structuren in plaats van grote
hoeveelheden utility classes.

Een component moet in eerste instantie begrijpelijk zijn door de gebruikte
HTML-elementen. Styling wordt vervolgens toegepast via component-specifieke CSS.

Voorbeelden van semantische elementen zijn:

* `<main>`
* `<nav>`
* `<header>`
* `<footer>`
* `<article>`
* `<section>`
* `<button>`
* `<fieldset>`

Door gebruik te maken van de juiste HTML-elementen wordt de interface beter
begrijpelijk voor browsers, screenreaders en ontwikkelaars. ([inclusiefdesign.ntr.nl][3])

Voordelen hiervan zijn:

* Leesbare templates.
* Minder afhankelijkheden.
* Betere toegankelijkheid.
* Eenvoudiger onderhoud.
* Langere levensduur van componenten.
* Betere samenwerking tussen teams.

## Toegankelijkheid als uitgangspunt

Toegankelijkheid is geen optionele toevoeging maar een integraal onderdeel van
de architectuur.

Componenten worden ontwikkeld met aandacht voor:

* Semantische HTML.
* Toetsenbordbediening.
* Screenreader-ondersteuning.
* Correcte focus-indicatie.
* Passende ARIA-attributen waar nodig.
* Correct gebruik van formulieren, tabellen en interactieve componenten.

Door zoveel mogelijk gebruik te maken van native HTML wordt een groot deel van
deze toegankelijkheid automatisch door de browser geleverd. ([Usability & Digital Accessibility][2])

## Herbruikbare backend-templates

Een belangrijk uitgangspunt van Manon is dat componenten niet gekoppeld zijn aan
één specifiek front-end of backend-framework.

Dezelfde componenten kunnen daardoor worden gebruikt in:

* Server-side rendering oplossingen.
* CMS-platformen.
* Statische websites.
* Moderne webapplicaties.
* Overheidsplatformen met verschillende technologiekeuzes.

Dit voorkomt dubbele implementaties en maakt componenten duurzaam inzetbaar.

## Thematisering en huisstijlen

Binnen de overheid bestaan verschillende huisstijlen, kleurpaletten en
vormgevingsrichtlijnen.

Manon ondersteunt daarom uitgebreide thematisering waarbij dezelfde
HTML-structuur kan worden gebruikt met verschillende visuele uitwerkingen.

Hierdoor wordt het mogelijk om:

* Componenten centraal te ontwikkelen.
* Huisstijlen lokaal toe te passen.
* Consistentie te vergroten.
* Onderhoudskosten te verlagen.

De HTML blijft daarbij ongewijzigd; alleen de presentatie verandert. ([semantic.rtlcss.com][4])

## Minder JavaScript, minder risico

JavaScript blijft een belangrijk hulpmiddel voor complexe interacties, maar
hoeft niet de basis van iedere component te vormen.

Manon probeert daarom zoveel mogelijk gebruik te maken van
browserfunctionaliteit die al beschikbaar is via HTML en CSS.

Deze aanpak helpt om:

* Dependency hell te voorkomen.
* Bundle sizes klein te houden.
* Onderhoud te vereenvoudigen.
* Prestatieproblemen te beperken.
* De attack surface van applicaties te verkleinen.

Ook vanuit toegankelijkheidsperspectief is terughoudend gebruik van JavaScript
vaak gunstig. ([MDN Web Docs][5])

## Testbaarheid en kwaliteit

Herbruikbare componenten zijn alleen waardevol wanneer kwaliteit aantoonbaar
geborgd wordt.

Daarom ligt binnen Manon veel nadruk op:

* Geautomatiseerde tests.
* Toegankelijkheidstests.
* Regressietests.
* Valide HTML.
* Herbruikbare templates.

Verbeteringen aan componenten komen hierdoor direct ten goede aan alle projecten
die dezelfde bouwstenen gebruiken.

## Wanneer kies je voor Manon?

Manon is een goede keuze wanneer je:

* Toegankelijke websites ontwikkelt.
* Semantische HTML centraal wilt stellen.
* Minder afhankelijk wilt zijn van JavaScript-frameworks.
* Herbruikbare backend-templates wilt gebruiken.
* Ondersteuning nodig hebt voor meerdere huisstijlen.
* Een duurzame front-end architectuur wilt opzetten.
* Onderhoudskosten op lange termijn wilt beperken.

## Links

* Documentatie: [https://minvws.github.io/nl-rdo-manon/](https://minvws.github.io/nl-rdo-manon/)
* GitHub: [https://github.com/minvws/nl-rdo-manon](https://github.com/minvws/nl-rdo-manon)

## Op de hoogte blijven

* Volg de ontwikkelingen via GitHub.
* Meld issues en toegankelijkheidsbevindingen.
* Draag verbeteringen bij aan componenten en documentatie.
* Deel ervaringen uit projecten zodat componenten verder kunnen worden verbeterd en hergebruikt.


[1]: https://oss.developer.overheid.nl/repositories/08565a08-716c-4fed-a1b3-648192fc87a2 "nl-rdo-manon | OSS-register"
[2]: https://usability.yale.edu/digital-accessibility/accessibility-resources/accessibility-articles/html "HTML | Usability & Digital Accessibility"
[3]: https://inclusiefdesign.ntr.nl/ontwikkelaar/basiskennis/semantische-html "Semantische HTML - Inclusief Design bij NTR"
[4]: https://semantic.rtlcss.com/usage/theming.html "Theming | Semantic UI"
[5]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/CSS_and_JavaScript "CSS and JavaScript accessibility best practices - Learn web development | MDN"
