---
authors: [linda-van-den-brink]
tags: []
draft: true
---

# OGC code sprint @ Rotterdam

Het [Open Geospatial Consortium](https://ogc.org) is een internationale standaardenorganisatie. Hier komen onder andere de OGC API standaarden vandaan: gestandaardiseerde REST APIs die ervoor zorgen dat geodata op een universele manier geserveerd en gebruikt kan worden. Regelmatig organiseert het OGC code sprints: hackathons van drie dagen waar standaarden-experts en ontwikkelaars de OGC standaarden implementeren in software. De OGC standaarden die geimplementeerd worden zijn dan meestal nog in draft; wel stabiel, maar nog niet officieel goedgekeurd. Op basis van de feedback van ontwikkelaars kunnen OGC standaarden-experts dan ook meteen de standaarden verbeteren en aanvullen. Zo wordt het ontwikkelen van standaarden net iets meer agile. 

<!-- truncate -->

Geonovum en de gemeente Rotterdam hebben de OGC code sprint naar Nederland gehaald. Het is een fysiek evenement van 20 tot en met 22 oktober in Rotterdam, maar ook online doen mensen mee. Bezoekers van de code sprint komen vanuit de hele wereld, waaronder Japan, Canada en Europa. Het mooie eraan is dat de experts, die de OGC standaarden geschreven hebben, aanwezig zijn (fysiek of online) en je daardoor een  heel kort lijntje hebt naar de bedenker van een standaard. Als je een implementatie aan het maken bent en je loopt ergens tegenaan, zoals een foutje of onduidelijkheid in de standaarden, dan kun je daar meteen hulp bij krijgen. Vaak leidt dit ook meteen tot een oplossing in de standaard zelf. Ook ideeën voor improvements op standaarden worden vaak geboren tijdens OGC code sprints en daarna doorontwikkeld tot een nieuwe uitbreiding van een van de OGC standaarden.  

Geonovum is al vaker naar OGC code sprints toegeweest, daar is onder andere de [ogc checker](https://github.com/Geonovum/ogc-checker/) uit geboren, een linter voor OGC standaarden. Dit keer gaan we ook weer werken aan de linter, maar daarnaast ook aan een DCAT profiel voor OGC API Records en een implementatie van OGC API Joins.

## Geonovum's Standards Checker - aka 'the Linter'
De eerste versie van de linter hadden we destijds in drie dagen aan de praat. De standaard die we toen geimplementeerd hebben was [JSON-FG](https://github.com/opengeospatial/ogc-feat-geo-json/), een uitbreiding voor GeoJSON. De Linter zoals we 'm altijd noemen is een tool waarmee je kan checken of een JSON document voldoet aan de standaard. De linter heettte officieel 'OGC checker' en hebben we tijdens deze code sprint hernoemd naar 'Standards Checker', omdat we de core van de tool hebben losgetrokken van het deel dat checks voor specifieke standaarden implementeert. Daardoor is het een framework geworden waarin je ook checks voor niet-OGC standaarden kunt implementeren. Het plan is om de linter nu ook als de basis van de ADR checker te gaan gebruiken. 

De linter ondersteunt nu de volgende OGC standaarden: 
- JSON-FG
- OGC API Features [part 1](https://docs.ogc.org/is/17-069r3/17-069r3.html) + [part 2](https://docs.ogc.org/is/18-058/18-058.html)
- OGC API Records [part 1](https://docs.ogc.org/is/20-004r1/20-004r1.html)
- OGC API Processes [v2 part 1](https://docs.ogc.org/DRAFTS/18-062r3.html)

Tijdens de code sprint hebben we de JSON-FG implementatie geupdate naar de nieuwste versie van de standaard, die binnenkort als goedgekeurde standaard gepubliceerd wordt door OGC. Eerder ondersteunden we nog een oude consultatieversie, die op basis van onder andere feedback van ons nog best significant gewijzigd (verbeterd!) is. 

Verder hebben we, zoals gezegd, de code uitgesplitst naar twee aparte github projecten: eentje met de 'core', de kern van het checker framework, en een tweede met de rulesets voor OGC standaarden. 

Daarna hebben we aan de core een CLI interface toegevoegd. Tot nu toe draaide de checker alleen nog als web interface, waarbij je het te testen bestand of via url of in ene online tekstveld kan opgeven. Met de komst van de CLI interface kan je de checker ook vanaf de command line aanroepen en met je eigen ontwikkelomgeving integreren. 

## DCAT in een OGC API 
Mijn Geonovum collega Niels was op de code sprint aanwezig om uit te zoeken hoe je de metadatastandaard DCAT kan gebruiken in combinatie met OGC API Records. OGC API Records is een gestandaardiseerde API voor dataset catalogi. Je kan er op een gestandaardiseerde manier metadata, oftewel datasetbeschrijvingen, mee serveren, en met een client daarin zoeken, zien wat er allemaal beschikbaar is en informatie over een dataset opvragen. Elke datasetbeschrijving item is een metadata 'record', vandaar de naam van de API. Vergeleken met bijvoorbeeld een OGC API Features endpoint zitten er in een record item meer (potentieel veel meer) beschrijvende elementen over een dataset. Alles wat je wilt weten om te kunnen beoordelen of een dataset geschikt is voor jouw use case, kun je erin vinden. 

Nu is in Europa overheidsland de belangrijkste standaard om datasets te beschrijven de standaard DCAT. Deze standaard is gebaseerd op RDF en staat zeer uitgebreide beschrijvingen van datasets toe. Maar hoe gebruik je nu DCAT in combinatie met OGC API Records, een REST API waar je normaal gesproken JSON payloads in verwacht? Dit is niet heel eenvoudig. Een record item in OGC API Records is veel beperkter dan wat je in DCAT kan doen. Je kan via content negotiation specifiek om DCAT vragen, maar hiervoor moet je wel specifiek om het DCAT 'profile' vragen - een methode die nog niet altijd even gemakkelijk werkt. 

Genoeg uitdaging om ons tijdens deze code sprint op te storten! 

## OGC API Joins
Een andere collega, Pieter, was er ook en stortte zich op een nieuweling in de OGC API familie: OGC API Joins. Met deze API kun je administratieve, tabulaire data aan geo-data kan koppelen. Deze standaard is bijvoorbeeld interessant om statistische gegevens, zoals gegevens van het CBS, te koppelen aan gebieden (wijken, buurten, enz) in Nederland. Alle gegevens die je in een CSV bestand kunt stoppen, en op een URL beschikbaar stelt, kun je met deze API gemakkelijk koppelen aan geo-objecten zoals je die bijvoorbeeld bij PDOK kunt vinden. 

Het koppelen gebeurt door het matchen  van overeenkomstige gegevens die zowel in de tabulaire data (CSV of GeoJSON) als in de geo-data aanwezig zijn. Zo krijg je een ‘join’: de API combineert beide datasets op basis van het overeenkomstige gegeven. Denk bijvoorbeeld aan een gemeentecode.

OGC API Joins is momenteel in publieke consultatie en dus is de tijd rijp om een implementatie te maken. Nu kunnen opgespoorde fouten nog meteen gemeld en opgelost worden. Pieter maakt de implementatie samen met ontwikkelaar Sander die we voor de gelegenheid mee hebbne genomen en met hulp van een van de schrijvers van de standaard. Aan het eind van de eerste dag meldde Pieter trots dat het aantal issues in de github repo, waar de standaard wordt beheerd, door zijn toedoen verdubbeld zijn, van 5 naar 10! En na dag twee waren er nog eens 5 issues bijgekomen. Gelukkig niet alleen issues maar ook het begin van een werkende OGC API Joins applicatie in pygeoapi. Alle endpoints waren inmiddels geïmplementeerd. Als ik Sander begrijp nog best wel met ingrijpende wijzigingen in de draft standaard. 

## Wat gebeurt er verder allemaal

OGC API Records implementatie in GeoServer. Part 1 en 2 zitten er al in. Geonetwork 5. Ondersteunt al DCAT-AP. Zij ondersteunen ook al conneg by profile zo te zien. Er is ook een default profile voor elk format. 
