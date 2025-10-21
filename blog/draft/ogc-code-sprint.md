# OGC code sprint @ Rotterdam

Het [Open Geospatial Consortium](https://ogc.org) is een internationale standaardenorganisatie. Hier komen onder andere de OGC API standaarden vandaan: gestandaardiseerde REST APIs die ervoor zorgen dat geodata op een universele manier geserveerd en gebruikt kan worden. Het OGC is een mix van overheidsorganisaties, bedrijven en onderwijsorganisaties. Regelmatig organiseert het OGC code sprints: hackathons van drie dagen waarbij de OGC standaaren geimplementeerd worden en aan de hand daarvan de standaarden worden verbeterd en aangevuld. 

Geonovum en de gemeente Rotterdam hebben de OGC code sprint naar Nederland gehaald. Het is een fysiek evenement van 20 tot 2 oktober in Rotterdam, maar ook online doen mensen. Bezoekers van de code sprint komen vanuit de hele wereld, waaronder Japan, Peru, Canada en Europa. Het mooie eraan is dat de experts, die de OGC standaarden geschreven hebben, aanwezig zijn (fysiek of online) en je daardoor een  heel kort lijntje hebt naar de bedenken van een standaard. Als je een implementatie aan het maken bent en je loopt ergens tegenaan, een foutje of onduidelijkheid in de standaarden, dan kun je daar meteen hulp bij krijgen. Geonovum is al vaker naar OGC code sprints toegeweest, daar is onder andere de [ogc checker](https://github.com/Geonovum/ogc-checker/) uit geboren, een linter voor OGC standaarden. 

De eerste versie van de linter hadden we in drie dagen aan de praat. De standaard die we toen geimplementeerd hebben was geen OGC API maar [JSON-FG](https://github.com/opengeospatial/ogc-feat-geo-json/), een uitbreiding voor GeoJSON. Tijdens het maken ervan hebben we verschillende bugs en improvements voor de standaard gemeld, die inmiddels allemaal zijn opgelost en doorgevoerd in de standaard! Dit keer gaan we ook weer werken aan de linter, maar daarnaast ook aan een DCAT profiel voor OGC API Records en een implementatie van OGC API Joins. 

## Geonovum's Standards Checker - aka 'the Linter'
De Linter zoals we 'm altijd noemen is een tool waarmee je kan checken of een document voldoet aan de standaard. De linter heettte officieel 'OGC checker' en hebben we tijdens deze code sprint hernoemd naar 'Standards Checker', omdat we de core van de tool apart gaan neerzetten zodat het een framework wordt waarin je ook checks voor niet-OGC standaarden kunt implementeren. Deze gaat dan ook als de basis van de ADR checker dienen. 

De linter ondersteunt de volgende OGC standaarden: 
- JSON-FG
- OGC API Features part 1 + 2
- OGC API Records
- OGC API Processes v2 part 1

Tijdens de code sprint hebben we de JSON-FG implementatie geupdate naar de nieuwste versie van de standaard, die binnenkort als goedgekeurde standaard gepubliceerd wordt door OGC. Eerder ondersteunden we nog een oude consultatieversie, die op basis van onder andere feedback van ons nog best significant gewijzigd (verbeterd!) is. 

Verder hebben we, zoals gezegd, de code uitgesplitst naar twee aparte github projecten: eentje met de 'core', de kern van het checker framework, en een tweede met de rulesets voor OGC standaarden. 

Daarna hebben we aan de core een CLI interface toegevoegd. Tot nu toe draaide de checker alleen nog op github pages, maar met de komst van de CLI interface kan je de checker ook toevoegen aan je eigen ontwikkelomgeving. 

## DCAT in een OGC API 
OGC API Records is een gestandaardiseerde API voor dataset catalogi. Je kan er op een gestandaardiseerde manier metadata, oftewel datasetbeschrijvingen, mee serveren, en met een client daarin zoeken en metadata opvragen, en zo uitvinden waar en hoe je data uit een dataset kan verkrijgen. Elke datasetbeschrijving item is een metadata 'record', vandaar de naam van de API. Vergeleken met bv een OGC API Features endpoint zitten er in een record item meer (potentieel veel meer) beschrijvende elementen in over datasets. Alles wat je wilt weten om te kunnen beoordelen of een dataset geschikt is voor jouw use case, kun je erin vinden. 

Nu is in Europa overheidsland de belangrijkste standaard voor metadata de standaard DCAT. Deze standaard is gebaseerd op RDF en staat zeer uitgebreide beschrijvingen van datasets toe. Maar hoe gebruik je nu DCAT in combinatie met OGC API Records, een REST API? Dat dit niet heel eenvoudig is, was al ontdekt in het OGC Digital twin as a service testbed. Een record item in OGC API Records is in principe veel kleiner dan wat je in DCAT kan doen. Je kan via content negotiation specifiek om DCAT vragen, maar hiervoor moet je wel specifiek om het DCAT 'profile' vragen - een methode die nog niet altijd even gemakkelijk werkt. 

Genoeg uitdaging om ons tijdens deze code sprint op te storten! 

## OGC API Joins

## Wat gebeurt er verder allemaal

OGC API Records implementatie in GeoServer. Part 1 en 2 zitten er al in. Geonetwork 5. Ondersteunt al DCAT-AP. Zij ondersteunen ook al conneg by profile zo te zien. Er is ook een default profile voor elk format. 
