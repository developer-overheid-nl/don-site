---
authors: [floris-deutekom]
tags: [api, api-design, asyncapi, eda]
description: |
  Developer.overheid.nl werkt samen met de werkgroep AsyncAPI aan het 
  onderzoeken van deze technologie, om te zien of het een nieuwe standaard 
  kan en moet worden voor asynchroon API ontwerp en documentatie. In deze 
  blog wordt het proces tot nu toe en de voorlopige bevindingen gedeeld, 
  als voorzet voor de grotere vragen waar we mee zitten.
---

# AsyncAPI: verkenning en eerste bevindingen

De afgelopen periode hebben we binnen developer.overheid.nl samen met de
Werkgroep AsyncAPI geëxperimenteerd met het toepassen van AsyncAPI in een aantal
concrete casussen. Niet zozeer om vast te stellen of het werkt, maar vooral om
te begrijpen waar het in de praktijk daadwerkelijk waarde toevoegt, en waar het
vooral extra werk introduceert zonder duidelijke meerwaarde. De technische
werkbaarheid van de specificatie is door diverse use cases aangetoond; de vraag
wanneer we het zouden moeten gebruiken is op dit moment dé kernvraag. Ik wil
jullie in een reeks aan blogposts graag meenemen in waar de werkgroep nu staat
m.b.t. AsyncAPI en hoe we de toekomst voor ons zien.

<!-- truncate -->

Om dit alles te gaan bevatten is door de werkgroep eerst aangenomen om wat use
cases te gaan aanpakken en gewoon te zien waar we tegenaan lopen wanneer
AsyncAPI als standaard as-is wordt gebruikt. Hiermee konden we tegelijk
technische affiniteit opdoen, iets van waarde opleveren voor partijen die
daadwerkelijk asynchrone API’s ontsluiten, en infromatie verzamelen voor het
beantwoorden van de grote vraag: “moet dit een nieuwe standaard worden as-is, of
is er een NLGov profiel nodig?” Met dit in het achterhoofd is een tweetal cases
opgepakt en zijn we de diepte ingedoken, met regelmatige besprekingen in de
werkgroep.

## AsyncAPI

Maar eerst even wat achtergrond en introductie voor wie nog niet bekend is met
AsyncAPI. In het kort, AsyncAPI is een open source set aan standaarden tools
voor ontwikkelen en documenteren van asynchrone API’s en
[Event-Driven Architecture](https://developer.overheid.nl/blog/2026/03/06/event-driven)
in zijn algemeen. Het is tevens een voortborduursel op het werk van
[OpenAPI Initiative](https://www.openapis.org/), waarin door een toegeweid team
van experts wordt gepoogd om een nieuwe standaard te bouwen voor asynchrone
API’s binnen de context van Event-Driven Architecture. AsyncAPI is hierin geen
runtime tool, het is voor documentatie, contract en standaardisatie voor
Event-Driven systemen. Het helpt bij begrijpen wat er over de lijn gaat, waar
die berichten leven, welke afspraken er gemaakt worden tussen partijen, en het
automatiseren van documentatie, code en validatie. Dit is van toegevoegde waarde
in asynchrone use cases; voor synchrone is OAS meer dan toereikend, ongeacht wat
AsyncAPI op hun voorpagina heeft staan.

Op dit moment wordt er in een werkgroep van diverse experts gewerkt om AsyncAPI
te vertalen naar de Nederlandse digitale overheid. Deze groep richt zich erop om
een breed gedragen kennisplatform te bouwen, waar de volgende aandachtspunten op
de voorgrond staan:

1. Uitzoeken hoe de standaard in elkaar zit; wat kun je ermee, hoe werkt het,
   welke tools zijn er? Etc.
2. Uitwerken waar de standaard wel en niet voor geschikt is
3. Specifieke use cases van ondersteuning voorzien in het uitwerken van hun
   implementatie van een asynchrone API keten, om daarmee ook punt 1 en 2 verder
   uit te werken.

De eerste observatie in de groep, op basis van hoe AsyncAPI zich op hun eigen
website presenteert, is dat AsyncAPI vaak wordt gepositioneerd als de asynchrone
tegenhanger van OpenAPI. Die vergelijking bleek in de praktijk niet dusdanig
strak op te gaan. Waar OpenAPI draait om request-response interacties tussen
bekende partijen, richt AsyncAPI zich op events, berichtenstromen en
ontkoppeling. Dat verschil lijkt op papier misschien klein, maar werkt door in
vrijwel elke keuze die je maakt: van hoe je documentatie structureert tot hoe je
verantwoordelijkheden in een keten interpreteert. OAS zou wel degelijk voor
asynchrone situaties gebruikt kunnen worden; PubSub webhooks worden bijvoorbeeld
gewoon ondersteund in OAS.

## Vingers aan de knoppen

Om beter grip op de nuances te krijgen hebben we bestaande een reeks
API-specificaties waarin al sprake was van asynchrone communicatie omgezet naar
een AsyncAPI documentatie; zie
[hier](https://studio.asyncapi.com/?share=d36cdf7f-1b42-4ac9-98a9-3194912fbfa0)
en
[hier](https://studio.asyncapi.com/?share=2cf00f8e-6aea-484c-b213-47d7cea70fd2)
voor links naar een aantal resultaten. In eerste instantie is er puur een 1-op-1
conversie gemaakt, met als doel om te zien hoe ver we kwamen zonder het
onderliggende ontwerp aan te passen. Wat daarbij opviel is dat die conversie
verrassend goed te doen is. Handmatige conversie van een relatief simpele API
aan de hand van de
[specificatie](https://www.asyncapi.com/docs/reference/specification/v3.1.0) was
een goede eerste stap om de spec beter te leren kennen, maar kostte wel tijd.
Desondanks bleek het relatief eenvoudig om Endpoints en Hostnames te vertalen
naar Channels, Payloads naar Messages en bestaande schema’s grotendeels te
hergebruiken. De beschikbare [tooling](https://www.asyncapi.com/docs/tools)
helpt hier aanzienlijk bij; validatie, documentgeneratie en zelfs
conversiefunctionaliteit maken het mogelijk om vrij snel tot een werkbare
specificatie te komen.

In het uitvoeren van deze “simpele” conversie werd er een belangrijk punt
zichtbaar. Een succesvolle conversie betekent namelijk niet automatisch dat je
ook een betere of meer passende beschrijving hebt gemaakt van je systeem. In
veel gevallen bleek de AsyncAPI-specificatie in essentie hetzelfde te
beschrijven als de oorspronkelijke OpenAPI-variant, alleen in een ander formaat.
Ja, het is nu in een documentatievorm die specifiek is toegespitst op asynchroon
verkeer, maar de vraag blijft of het wel nodig is. Ja, de berichtenstroom was
explicieter gemaakt, maar de onderliggende architectuur bleef ongewijzigd.
Daarmee ontstaat een situatie waarin je wel asynchrone documentatie hebt, maar
nog geen Event-Driven ontwerp. Kortom, we kunnen nog een stap verder.

Voor één van de casussen hebben we dus precies dit gedaan; in plaats van een
simpele conversie is er een volledig Event-Driven documentatie in AsyncAPI
opgeschreven. Waar de 1-op-1 conversie nog sterk leunde op bestaande endpoints
en interactiepatronen dwong het herontwerp ons om fundamenteel anders te kijken
naar het systeem. De 1-op-1 conversie was een goede eerste stap in dit proces;
doordat alles al naar AsyncAPI vertaald was konden bepaalde zaken zoals
Channels, Operations, Messages e.a. makkelijk overgenomen worden. Het resultaat
is een ontwerp waarin Events werden leidend in plaats van Calls, meerdere
Consumers konden onafhankelijk op dezelfde gebeurtenis reageren en de keten van
acties werd losgekoppeld in plaats van expliciet georkestreerd. In die context
kwam AsyncAPI veel beter tot zijn recht, omdat het precies datgene beschrijft
waar het voor bedoeld is: het gedrag en de structuur van berichten in een
ontkoppeld landschap. Voor de geïnteresseerden,
[hier](https://studio.asyncapi.com/?share=6148b38e-94f7-4dc0-9f6f-10b75b5f1a02)
is een link naar een EDA-versie van de inventaris API hier eerder gelinkt.

Deze stap vereiste uiteraard beduidend meer werk dan een 1-op-1 conversie. Waar
de tooling goed ondersteunt bij het omzetten en valideren van specificaties,
laat het de daadwerkelijke architectuurkeuzes volledig bij de gebruiker. Het
herinterpreteren van bestaande documentatie naar een Event-Driven model vraagt
om inhoudelijke keuzes, afstemming tussen betrokken partijen en een goed begrip
van de implicaties van ontkoppeling. Met andere woorden: AsyncAPI faciliteert,
maar dwingt niets af; dit is één van de schoonheden van de specificatie.

## Tooling

Ook op het gebied van tooling kwamen interessante observaties naar voren. Over
het algemeen is de volwassenheid hoog; validatie werkt betrouwbaar, documentatie
is snel te genereren en codegeneratie biedt duidelijke voordelen in termen van
consistentie en snelheid. Er zijn diverse
[templates](https://www.asyncapi.com/docs/tools/generator/template) voor
allerlei soorten code en applicaties beschikbaar “out of the box”, met ruimte om
zelf je eigen templates te ontwikkelen en beheren. Er zit hier op dit moment wel
een sterke externe afhankelijkheid in; denk hierin aan de black-box nature van
de default templates, versies van tooling en het gekozen perspectief binnen de
specificatie. In één geval bleek bijvoorbeeld dat om een bepaald type code te
generen de documentatie naar een lagere versie gebracht moest worden, maar dat
daardoor ook het perspectief van de API documentatie zou wijzigen, namelijk van
producer naar consumer. Dit was al eerder een vraag binnen de werkgroep: vanuit
welk perspectief moet men AsyncAPI lezen? Het staat in de specificatie
aangegeven (3.x en hoger schrijven vanuit de producer, alles daaronder vanuit
consumer), maar dit wordt niet meteen duidelijk uit een API document zelf.
Dergelijke afhankelijkheden en mogelijkheden tot foute interpretatie maken het
des te belangrijker dat er een gebruikstandaard wordt opgesteld, het zij binnen
een organisatie danwel binnen de gehele context van de Nederlanse Overheid.

## Toepasbaarheid en Toekomst

Uit deze voorbeelden en degenen die door anderen in de werkgroep zijn
aangedragen zijn we naast beter begrip van de technische werking ook een stuk
wijzer geworden over de toepasbaarheid van AsyncAPI. In omgevingen waarin
meerdere systemen onafhankelijk van elkaar events publiceren en consumeren, en
waarin niet altijd vooraf bekend is wie welke informatie gebruikt, helpt een
expliciet contract enorm om overzicht te creëren. Zeker wanneer berichten
complex zijn of regelmatig veranderen biedt de combinatie van duidelijke
schema’s en tooling voor validatie en generatie een stevige basis om fouten en
misinterpretaties te voorkomen. Hetzelfde geldt voor bredere Event-Driven
landschappen, waarin inzicht in de keten en de impact van wijzigingen cruciaal
is om het geheel beheersbaar te houden.

Daar tegenover staan situaties waarin die meerwaarde een stuk minder evident is.
In eenvoudige koppelingen tussen twee systemen, zeker wanneer beide onder
dezelfde verantwoordelijkheid vallen, voegt het expliciet modelleren van events
en contracten vaak weinig toe. Hetzelfde geldt voor kleine, eenduidige berichten
of omgevingen waarin nauwelijks sprake is van verandering over tijd. In dat
soort gevallen kan de overhead van uitgebreide specificaties en bijbehorende
tooling zwaarder wegen dan de voordelen die het oplevert. Sterker nog, wanneer
documentatie niet actief wordt bijgehouden, kan het zelfs een risico vormen
doordat het een vertekend beeld geeft van de werkelijkheid.

De belangrijkste les die uit deze exercitie naar voren komt, is dan ook dat
AsyncAPI vooral gezien moet worden als een middel, en niet als een doel op zich.
Het is een krachtig instrument om asynchrone communicatie inzichtelijk te maken,
te standaardiseren en deels te automatiseren, maar het vervangt geen
architectuurkeuzes, geen governance en geen samenwerking tussen teams. Of het
daadwerkelijk waarde toevoegt, hangt sterk af van de context waarin het wordt
toegepast en de mate waarin organisaties bereid zijn om de bijbehorende
werkwijze te omarmen. Dit is echter een onderwerp en-sich, en dus spaar ik die
op voor de volgende blogpost!
