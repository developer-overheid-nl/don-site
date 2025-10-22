---
authors: [tim-van-der-lippe]
tags: [api, adr, forum-standaardisatie, developer.overheid.nl, openapi]
---

# Status update API Design Rules

Op woensdagmiddag 26 maart 2025 kwam
[het Kennisplatform API's](/communities/kennisplatform-apis/) bijeen om de
laatste ontwikkelingen rond API's te bespreken. Hier presenteerde ik een update
over de
[API Design Rules](https://gitdocumentatie.logius.nl/publicatie/api/adr/) (ADR),
waarvan de 2.0 versie is ingediend bij het Forum Standaardisatie om op de
['Pas toe of leg uit'-lijst (PTOLU)](https://www.forumstandaardisatie.nl/open-standaarden/rest-api-design-rules)
te zetten. Tevens lichtte ik toe wat [Logius](https://www.logius.nl/) als
beheerder doet om de standaard verder te brengen en hoe wij toe werken naar een
2.1 versie. Hierbij is de symbiose tussen
[developer.overheid.nl](https://developer.overheid.nl), het Kennisplatform en de
ADR van belang voor een succesvolle toekomst.

<!-- truncate -->

:::success[**TL;DR**]

Logius werkt toe naar een 2.1 versie op basis van de input van API experts en
werkt hierbij samen met developer.overheid.nl en het Kennisplatform API's.
Wijzigingen worden behandeld in een technisch overleg, waarbij
beheerorganisaties het draagvlak borgen en extra tooling (zoals een linter)
aanleveren ter implementatieondersteuning. Alle genoemde partijen, tooling en
documenten zijn openbaar en input wordt zeer gewaardeerd, dus doe mee!

:::

## Scope van ADR 2.1

De scope van de 2.1 versie zal grotendeels de vergaarde feedback van het Forum
verwerken alsmede enkele ontwikkelingen rondom developer.overheid.nl (DON). De
focus is hier op het verder stimuleren van adoptie van de standaard, zodat API's
die door (overheids-)organisaties worden gebouwd bruikbaar zijn nu en in de
toekomst. Een van de voordelen van samenwerking tussen projecten zoals DON en
beheerders zoals Logius is een symbiosewerking waar praktijk en
toekomstbestendigheid bij elkaar komen. Twee voorbeelden van deze samenwerking
licht ik nu wat verder toe.

Data die DON vergaart uit het API register hebben wij als input gebruikt voor de
2.1 versie. Hierbij focussen we op het bereik van developers, door bijvoorbeeld
het
[`info.contact` veld te vereisen](https://github.com/Logius-standaarden/API-Design-Rules/pull/161)
in de OpenAPI specification. Dit contactveld kan door partijen zoals DON worden
gebruikt om automatisch checks uit te voeren en resultaten te delen met
beheerders. Tevens kunnen gebruikers van een API weten met welke partij zij te
maken hebben en hoe ze die kunnen bereiken.

Ook is er een analyse gedaan door [Joost Farla](/blog/authors/joost-farla) over
een mogelijk conflict tussen
[OData](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html)
en de API Design rules wat betreft het vereisen dat
[resources geen trailing slash hebben](https://gitdocumentatie.logius.nl/publicatie/api/adr/#/core/no-trailing-slash).
Gelukkig volgde uit Joost's analyse dat dit conflict niet aanwezig is, maar
hebben we zijn input meegenomen en hier
[een nieuwe design rule](https://github.com/Logius-standaarden/API-Design-Rules/pull/165/)
over geschreven. Deze regel lost daarnaast ook het probleem op dat developers
gingen twijfelen of een API bestond, omdat de `/` resource een 404 (of andere
error code) terug gaf.

## Technisch Overleg ter besluitvorming, Kennisplatform als input

De hier boven genoemde wijzigingen worden voorgelegd aan het Technisch Overleg
(TO) van de standaard, waar de besluitvorming plaats vindt. In het geval van het
`info.contact` veld is
[dit besluit al genomen](https://github.com/Logius-standaarden/Overleg/blob/main/API/2025-05-13/2025-02-04%20%20Verslag%20TO%20ADR%20API%20Design%20Rules.pdf)
en is de regel toegevoegd. De tweede wijziging (op het moment van schrijven)
wordt voorgelegd in het
[volgende TO op 13 mei](https://github.com/Logius-standaarden/Overleg/tree/main/API/2025-05-13).

Alle gebeurtenissen rond de standaard zijn openbaar en volgen uit input van open
communities zoals het Kennisplatform. Dit is belangrijk voor het borgen van
draagvlak in alle (overheids-)organisaties en andere partijen die standaarden
nuttig willen inzetten in hun werkzaamheden. Hoe meer input van verschillende
partijen, developers en andere belanghebbenden, hoe groter de waarde van de
gemaakte afspraken die vastgelegd zijn in de standaard.

Het Kennisplatform speelt hier een belangrijke rol in als input "vanuit het
werkveld". Op de gelinkte wijzigingen wordt er ook verwezen naar meerdere issues
uit
[de issue tracker van het Kennisplatform](https://github.com/Geonovum/KP-APIs/issues).

:::tip Heb je input, participeer!

Mocht je een goed idee hebben, een issue waar je tegenaan loopt of wil je in
contact komen met andere API beheerders? Neem dan deel aan het Kennisplatform
door bijvoorbeeld een issue aan te maken met je input. Deze input wordt
verzameld en bij voldoende draagvlak kan dat resulteren in wijzigingen aan de
standaard.

:::

## Meerwaarde van een beheerorganisatie

Beheerorganisaties zoals Logius en Geonovum zorgen ervoor dat standaarden
continu doorontwikkeld worden en uiteindelijk ook vastgesteld. Bij vaststelling
zijn belanghebbenden het eens over de standaard en kan die worden verplicht aan
overheidsorganisaties. Dit doen beheerorganisaties allemaal volgens het
[BOMOS-model](https://www.logius.nl/onze-dienstverlening/domeinen/infrastructuur/bomos).

Een van de aspecten van BOMOS is implementatieondersteuning, waar developers een
van de belangrijke doelgroepen zijn. Voor de ADR gaat Logius focussen op het
aanleveren van extra ondersteuning door middel van automatisering. Hiervoor is
de [Spectral](https://stoplight.io/open-source/spectral) linter (die origineel
door DON is gepubliceerd)
[geintegreerd in de standaard](https://github.com/Logius-standaarden/API-Design-Rules/pull/177)
zelf. Dit betekent dat Logius als beheerder ervoor zorgt dat API regels niet
alleen de juiste afspraken zijn, maar dat ze ook automatisch worden gecheckt.
Developers kunnen hierdoor op een laagdrempelige manier checken of zij voldoen
aan de standaard en eventuele problemen sneller oplossen.

Voor informatie over hoe de linter te gebruiken is in relevante systemen, bevat
[de DON kennisbank](/kennisbank/apis/api-design-rules/api-design-rules-linter)
voorbeelden voor veelgebruikte runtime en CI systemen. Hiermee is de symbiose
tussen DON en Logius ook zichtbaar: Logius zorgt ervoor dat wijzigingen
automatisch te verifieren zijn door een linter, DON heeft een kennisbank met
informatie hoe developers die direct in hun systemen kunnen integreren.

## Handige links om te participeren

Als dit allemaal leuk klinkt om in te participeren; dat kan dus! Alle genoemde
partijen, tooling en documenten zijn openbaar en input wordt zeer gewaardeerd.
Hierbij een samenvattend lijstje met links waar je terecht kan met input:

- [Kennisplatform API's issue tracker](https://github.com/Geonovum/KP-APIs/issues)
  voor samenwerking met API-experts
- [API Design Rules standaard](https://github.com/Logius-standaarden/API-Design-Rules/)
  voor het voorstellen van wijzigingen
- [Content op developer.overheid.nl](https://github.com/developer-overheid-nl/don-site)
  voor het uitbreiden van de Kennisbank
