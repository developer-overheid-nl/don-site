---
authors: [floris-deutekom]
tags: [api, api-design, eda, asyncapi, cloudevents]
description: |
  In deze laatste blogpost in een reeks van drie wordt een voorzichtige blik 
  vooruit geworpen op de implementatie van AsyncAPI. Daarin lijkt het gebruik 
  van Cloudevents een logische stap te zijn. Op hoogover niveau wordt er 
  gekeken naar de vragen welke gaten in AsyncAPI worden opgevuld Cloudevents,
  en wat het oplevert om die twee samen te gaan gebruiken.
---

# AsyncAPI + Cloudevents; implementatie van asynchrone oplossingen

In de voorgaande blogposts hebben we gekeken naar wat
[AsyncAPI](https://www.asyncapi.com/en) is, hoe het zich in de praktijk gedraagt
en in welke situaties het daadwerkelijk waarde toevoegt (of juist niet). Daarmee
staat er een grove leidraad voor wanneer AsyncAPI te implementeren, en is de
kernvraag van de werkgroep in zekere mate beantwoord. Dit is natuurlijk niet
voldoende. Los van dat de kernvraag van de werkgroep nog een lopende discussie
is lijkt het logische vervolg om te gaan kijken naar hoe dit alles daadwerkelijk
geïmplementeerd kan/moet worden. In deze blogpost heb ik gepoogd om vast een
stukje vooruit te kijken, met als kern de vraag: hoe zorg je ervoor dat events
niet alleen goed beschreven zijn, maar ook consistent en interoperabel worden
uitgewisseld tussen systemen?

<!-- truncate -->

## Cloudevents

Waar AsyncAPI zich richt op het beschrijven van berichtenstromen, biedt het niet
een gestandaardiseerde manier om events zelf vorm te geven. Het documenteert wel
wat er voor berichten over de lijn gaan, maar het definieert geen uniforme set
metadata, zoals type, bron, identificatie of tijdstip, die losstaat van de
inhoud van het bericht. Daarmee ontstaat een scheiding tussen wat een event is
en wat een event bevat. Deze scheiding onderkennen is één ding, hem goed kunnen
beschrijven is een tweede, en dit is waar Cloudevents om de hoek komt kijken.

In een
[eerdere blogpost](https://developer.overheid.nl/blog/2026/03/06/event-driven)
is al uitgebreid over Cloudevents gesproken in de context van Event-Driven
Architecture. Zie al wat volgt dan ook vooral als een vervolg op de AsyncAPI
mention die daar kort in voorkomt, en als een manier om de zaken uit de vorige
twee posts in deze reeks van een theoretische realisatie te voorzien.

Laat ik dan ook teruggrijpen naar een eerdere observatie: AsyncAPI maakt
expliciet wat er over de lijn gaat, maar laat veel ruimte in hoe dat er concreet
uitziet. Die flexibiliteit is krachtig en tevens deel van wat de specificatie zo
aantrekkelijk maakt, maar kan ook leiden tot variatie waar je die misschien niet
wil hebben. Twee teams kunnen hetzelfde soort event modelleren, maar toch
verschillende keuzes maken in metadata, naamgeving of contextinformatie. Binnen
één team of tussen twee nauw-verbonden teams is dat vaak nog te overzien, maar
op grotere schaal zal dit geheid uitlopen op problemen.

[CloudEvents](https://cloudevents.io/) vangt precies dat probleem af door een
minimale, duidelijke standaard neer te zetten voor event-metadata en het
beschrijven/definiëren van het event zelf. Opgenomen als
[NLgov profiel](/kennisbank/api-ontwikkeling/standaarden/cloudevents) en door
[Forum Standaardisatie](https://www.forumstandaardisatie.nl/open-standaarden/nl-gov-profile-cloudevents)
op de “pas toe, leg uit” lijst gezet, CloudEvents specifieert onder andere
uniforme naamgeving en metadata, afspraken over payloads en headers, notificatie
toepassingen ban de overheid en meer. Dit is precies wat AsyncAPI open laat.
Door Cloudevents als standaard te combineren met AsyncAPI ontstaat een gelaagd
model: AsyncAPI beschrijft de structuur, het gedrag en de context van
berichtenstromen, terwijl CloudEvents zorgt voor een consistente “envelop”
waarin die berichten worden verstuurd. Het resultaat is een combinatie waarin
zowel documentatie als implementatie beter op elkaar aansluiten.

## Toepasgebied

Wanneer zou dit nou echt tot zijn recht komen? Los van alle use-cases die in
eerdere posts besproken zijn kijk ik hier vooral naar situaties waarin
interoperabiliteit een belangrijke rol speelt. Binnen de Nederlandse overheid is
het koppelen met systemen van andere organisaties, of zelfs andere teams en
omgevingen binnen de eigen organisatie aan de orde van de dag. Systemen van
verschillende organisaties moeten met elkaar communiceren, vaak zonder dat er
sprake is van directe afstemming of gezamenlijke ontwikkeling. Teams binnen
grote landelijke organisaties lopen er ook tegenaan dat ze afhankelijk zijn van
de events die de wereld in gaan vanuit teams waar ze nooit direct mee in
aanraking komen. In zulke omgevingen is het niet voldoende dat iedereen
“ongeveer hetzelfde” doet; consistentie en voorspelbaarheid zijn randvoorwaarden
voor een goede dienstverlening.

### Notificaties

Een concreet voorbeeld hiervan is het uitwisselen van notificaties tussen
ketenpartners. Wanneer een gebeurtenis plaatsvindt, bijvoorbeeld een wijziging
in een registratie of de afronding van een processtap, kan die informatie
relevant zijn voor meerdere afnemers. Denk aan de notificatie dat er iets in de
kadastrale gegevens van een huizenblok gewijzigd gaat worden. Door zo’n
gebeurtenis als CloudEvent te versturen, voorzien van gestandaardiseerde
metadata en opgesteld volgens een NLgov standaard wordt het voor afnemers
eenvoudiger om events te routeren, filteren en verwerken. Ontwikkelaars en
architecten hoeven niet te wachten of te gissen naar hoe events eruit zien en
wat voor soorten gegevens erin komen te staan; ze kunnen het gewoon opzoeken en
afvangen. AsyncAPI kan in deze context gebruikt worden om vast te leggen welke
events bestaan, hoe de payload eruitziet en welke semantiek eraan verbonden is.
Daarmee heb je de combinatie te pakken van “wat is er allemaal” en “hoe ziet het
eruit”; oftewel, vorm en inhoud van de communicatie worden hiermee helder.

### Cross-team integraties

Een ander scenario waarin deze combinatie waarde toevoegt, is dat van cross-team
en cross-organisatie integraties. Denk aan het moment dat een team van de
Politie een event van een ander team binnen de Politie wil afnemen, of dat een
team bij de KMar datzelfde event ook ergens voor nodig heeft. Zoals eerder
beschreven ontstaat daar vaak een situatie waarin overzicht op de volledige
keten makkelijk te verliezen is, met als gevolg dat er meerdere waarheden gaan
ontstaan. Door CloudEvents te gebruiken als gemeenschappelijke basis voor
event-metadata, kunnen teams onafhankelijk van elkaar werken zonder dat ze
telkens opnieuw afspraken moeten maken over basiselementen zoals identificatie
of herkomst. AsyncAPI fungeert daarbij als de plek waar die events formeel
worden beschreven en gedeeld. Dit ondersteunt het idee van een “single source of
truth”, zonder dat het de autonomie van individuele teams beperkt.

### Auditing en replay

Ook in meer technische use cases, zoals auditing of event replay, biedt de
combinatie duidelijke voordelen. CloudEvents schrijft bijvoorbeeld voor dat elk
event een unieke identifier en timestamp bevat. Dat lijkt een detail, maar maakt
het aanzienlijk eenvoudiger om events later opnieuw te verwerken of te
analyseren. Voor organisaties die willen voldoen aan de transparantie principes
die ten grondslag liggen aan zaken als Wet Open Overheid is het goed na kunnen
gaan en aan kunnen tonen wat er met data gebeurt, wie wat initieert en waar
gegevens naartoe gaan van cruciaal belang. In combinatie met het relatief
makkelijke versiebeheer in AsyncAPI ontstaat zo een robuuste basis voor het
omgaan met historische data, zelfs wanneer schema’s in de loop der tijd
veranderen. Kortom, in het kader van auditing en transparantie is dit alles
zeker geen overbodige luxe binnen een complex bolwerk als de gehele Nederlandse
overheid.

## Hoe dit aan te pakken?

De vraag is dan hoe een implementatie van deze combinatie er in de praktijk uit
zou gaan zien. In de basis begint het met het vaststellen van een aantal
afspraken op organisatieniveau. AsyncAPI alleen bleek al baat te hebben bij
duidelijke keuzes rondom naamgeving, perspectief en tooling; met CloudEvents
komt daar een extra laag bij. Denk aan afspraken over welke attributen verplicht
zijn, hoe typen worden benoemd en hoe bronnen worden geïdentificeerd. Zonder die
afspraken bestaat het risico dat de standaard wel wordt gebruikt, maar niet op
een consistente manier. Hier is voor CloudEvents al een NLgov profiel voor
opgesteld en verplicht gesteld (“pas toe, leg uit”). AsyncAPI heeft deze nog
niet, omdat de discussie over het toepassingsgebied nog een lopende zaak is,
maar laten we er t.b.v. het uitdenken van een implementatie er even vanuit gaan
dat een dergelijke duiding wel komt.

Na het opstellen van afspraken en/of “leg uit’s” in de context van “pas toe, leg
uit” komt de modellering zelf. In AsyncAPI wordt vastgelegd welke events
bestaan, via welke Channels ze worden uitgewisseld en hoe de payload is
opgebouwd. Dit is een inhoudelijke klus die kennis van AsyncAPI vereist, maar
ook kennis van de daadwerkelijk te modelleren berichtenstroom. CloudEvents kan
daarin op verschillende manieren worden geïntegreerd, bijvoorbeeld door het als
basis te nemen voor de message-structuur of door expliciet te verwijzen naar de
CloudEvents-specificatie binnen de schema’s. Het belangrijkste is dat duidelijk
wordt gemaakt waar de grens ligt tussen generieke metadata en domeinspecifieke
inhoud.

Dan de technische implementatie. Voor producers betekent dit dat zij
verantwoordelijk zijn voor het correct opbouwen van CloudEvents, inclusief de
verplichte metadata. De exacte manier van implementatie is sterk afhankelijk van
de organisatie, maar in de kern zullen er techneuten aan de slag moeten gaan met
het opstellen van CloudEvents die aansluiten op wat er op hoger niveau is
afgesproken. Tegelijkertijd zullen eventuele consumers hun applicaties moeten
inrichten op de AsyncAPI documentatie en informatie over de CloudEvents van de
producer, in het vertrouwen dat dergelijke metadata altijd aanwezig en
consistent is. Middleware, zoals messaging-platforms of event brokers, kan
vervolgens gebruikmaken van die metadata voor routering, filtering of logging,
zonder dat kennis van de payload nodig is. Een voordeel hiervan is dat het
bijdraagt aan verdere ontkoppeling, omdat infrastructuur en businesslogica
minder van elkaar afhankelijk worden.

Wat de opvallende lezer vast allang heeft gemerkt is dat hier eigenlijk geen
nieuwe concepten worden geïntroduceerd, maar dat er slechts bestaande patronen
explicieter en consistenter worden gemaakt. Veel systemen gebruiken immers al
vormen van metadata in hun berichten; CloudEvents neemt de rol aan om daar
structuur in aan te brengen, en AsyncAPI pakt de rol op om de berichtenstromen
zichtbaar, beheersbaar en overdraagbaar te maken. Juist die combinatie van
standaardisatie en documentatie maakt het mogelijk om event-driven werken op
grotere schaal toe te passen zonder dat het verzandt in maatwerkafspraken.

## Kijkje naar de toekomst

Dit is, in een notendop, hoe een implementatie van Cloudevents met AsyncAPI
eruit zou kunnen zien. Het is natuurlijk een kijk naar de toekomst, en daardoor
zijn concrete voorbeelden binnen de Nederlandse overheid nog niet voorhanden. We
zijn echter
[niet de enigen](https://www.asyncapi.com/blog/asyncapi-cloud-events) die de
link tussen deze twee gezien heeft; binnen AsyncAPI is vanaf het begin al waarde
gezien in het combineren van Cloudevents en AsyncAPI.

De kaders die in eerdere posts geschetst zijn blijven overigens in dit alles van
toepassing. In kleine, gesloten systemen zal de meerwaarde beperkt zijn, en kan
de extra complexiteit moeilijk te rechtvaardigen zijn. In grotere, dynamische en
organisatie-overstijgende omgevingen ligt dat anders. Daar kan de combinatie van
AsyncAPI en CloudEvents een belangrijke rol spelen in het realiseren van
consistente, betrouwbare en toekomstbestendige communicatie. Daarmee vormt het
een logische volgende stap voor organisaties die niet alleen hun asynchrone
communicatie willen beschrijven, maar deze ook daadwerkelijk willen
standaardiseren en operationaliseren binnen een bredere event-driven
architectuur.

Met deze reeks aan blogposts heb ik geprobeerd een kijkje te geven in de keuken
van de werkgroep AsyncAPI, en ook vast wat vooruit te lopen op de zaken die daar
nu spelen. Mocht je na dit alles gelezen te hebben denken “dit klinkt
interessant”, “oh maar daar heb ik een interessante use case voor”, of misschien
iets als “maar dat weet ik veel beter”, schroom dan vooral niet om je aan te
melden voor de werkgroep!
