---
slug: design-first-of-code-first-api-ontwikkeling
authors: [joost-farla]
tags: [openapi, adr, api-design]
date: 2024-03-27
---
# Design-first of code-first API ontwikkeling?

Als je gaat starten met het ontwikkelen van een API zijn er verschillende manieren om dit aan te pakken. In de praktijk zie je grofweg 2 verschillende methoden: "design-first" en "code-first". In dit artikelen leggen we uit wat de verschillen zijn en waarom de "design-first" aanpak wat ons betreft de voorkeur heeft.

<!-- truncate -->

## De verschillen

De **design-first aanpak** begint met het definiëren van de API specificatie voordat er code wordt geschreven. Dit betekent dat eerst wordt vastgesteld hoe de structuur van de API precies is opgebouwd (welke resources, operaties, etc), vaak beschreven in een API-beschrijvingstaal zoals de [OpenAPI Specification](https://spec.openapis.org/oas/latest.html). Ontwikkelaars kunnen vervolgens de API implementeren, waarbij exact deze specificatie wordt gevolgd.

Bij de **code-first aanpak** begint het ontwikkelingsproces met het schrijven van de daadwerkelijke code voor de API functionaliteit. Ontwikkelaars implementeren de functionaliteit zonder vooraf een ontwerp te maken. Mogelijk wordt vanuit de code, al dan niet geautomatiseerd, een API specificatie afgeleid/gegenereerd.

## Onafhankelijk van implementatie

Een belangrijk aspect bij het ontwikkelen van API's is het voorkomen van een vendor- of technology lockin. Als organisatie wil je de flexibiliteit hebben om te kunnen wisselen van leverancier, of om de overstap te maken naar andere ontwikkeltools (bijv. een andere programmeertaal, framework of database) of naar een nieuwere versie van reeds gebruikte tools. Ook wil je de vrijheid hebben om technische wijzigen door te kunnen voeren (bijvoorbeeld de optimalisatie van een database schema), zonder impact voor bestaande afnemers.

Een kwalitatief en duurzaam API ontwerp is daarbij van groot belang. Idealiter is het ontwerp van een API volledig onafhankelijk van de implementatie, waardoor het API design volledig in stand kan worden gehouden bij het wijzigen of vervangen van (onderdelen van) de onderliggende implementatie. Hierdoor hoeft er geen impact voor bestaande afnemers/integraties te zijn.

De design-first aanpak maakt het makkelijker om na te denken over een API ontwerp, los van de implementatie. Het API design kan zelfstandig worden opgesteld, en kan een eigen QA-proces doorlopen om te voldoen aan bepaalde requirements en standaarden. Het API design hoeft zelfs niet eens door een ontwikkelaar worden opgesteld, al is een technische achtergrond hierbij wel vereist.

Bij de code-first aanpak ben je afhankelijker van het ontwikkelplatform en de frameworks/libraries die zijn gebruikt, waardoor de kans bestaat dat er implementatie-specifieke elementen in het API ontwerp belanden. Ook kan de flexibiliteit in het design worden beperkt, door ontbrekende capabilities van de gebruikte tools.

## Iteratief ontwikkelen

Sinds de introductie van universele API-standaarden, zoals de OpenAPI Specification (voorheen Swagger), zijn er enorm veel open-source tools ontwikkeld die een positieve bijdragen kunnen leveren aan het ontwikkelproces.

Een goed voorbeeld hiervan is het creëren van een "mock-API". Er zijn veel standaard tools beschikbaar die een mock-API kunnen genereren op basis van enkel de API specificatie. Een mock-API is een gesimuleerde versie van een API, die gebruikt kan worden tijdens het ontwikkel- en testproces. Deze API gedraagt zich precies volgens de specificatie, maar levert enkel fake responses met (vaak automatisch gegenereerde) testdata.

Het doel van een mock-API is om de functionaliteit van een echte API na te bootsen, zodat afnemers al kunnen werken met de API zonder daarbij te hoeven wachten op de echte implementatie. Dit maakt een iteratieve werkwijze mogelijk, waardoor de time-to-market kan worden versneld. Ook kan de mock-API gebruikt worden om, al voorafgaand aan de implementatie, ervaringen op te doen met het API design, waardoor mogelijke knelpunten of fouten al in de designfase worden gesignaleerd. Dit voorkomt kostbaar rework/refactoring later in het ontwikkelproces.

## API documentatie

Door al in een vroeg stadium na te denken over de structuur van de API, wordt je gedwongen om de API al vanaf de start goed en compleet te specificeren. Het is daarbij altijd verstandig om standaard conventies te hanteren, zodat er consistentie ontstaat over de hele API heen. De [NL API Design Rules](https://logius-standaarden.github.io/API-Design-Rules/) kunnen daarbij helpen.

Uiteindelijk komt de compleetheid en nauwkeurigheid van de API specificatie ten goede aan de kwaliteit van de API documentatie, waardoor afnemers sneller in staat zijn om de API te gaan gebruiken. In de open-source wereld bestaan ook hiervoor veel tools, bijv. om API documentatie te genereren vanuit de OpenAPI specificatie of om client libraries / SDK's te genereren.

## Samengevat

Design-first legt de nadruk op het vooraf definiëren van het API ontwerp voordat de implementatie begint, terwijl code-first begint met het bouwen van de functionaliteit en het ontwerp ontstaat tijdens het ontwikkelingsproces. De design-first aanpak voorkomt een implementatie-specifiek API ontwerp, kan helpen in het stroomlijnen van het ontwikkelproces en levert een positieve bijdrage aan de kwaliteit van API documentatie.