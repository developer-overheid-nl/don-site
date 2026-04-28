---
authors: [floris-deutekom]
tags: [api, api-design, asyncapi, eda]
description: |
  De grote vraag binnen de werkgroep AsyncAPI is op dit moment in welke
  gevallen AsyncAPI nou wel en niet van toegevoegde waarde is. Hoewel 
  de exacte details nog ter discussie staan zijn er al wel een aantal 
  voorlopige conclusies te trekken. In deze blogpost nemen we je mee 
  in deze conclusies en kijken we naar de mitsen en de maren in de 
  algemene regels die zich nu vormgeven.
---

# AsyncAPI: Wanneer wel? Wanneer niet?

In een eerdere blogpost zijn de eerste bevindingen van de werkgroep
[AsyncAPI](https://www.asyncapi.com/en) gedeeld na het uitwerken van een tweetal
use cases waarin asynchrone API’s van [OAS](https://www.openapis.org/) naar
AsyncAPI werden omgezet. Daarbij werd duidelijk dat AsyncAPI op zichzelf geen
wondermiddel is, maar vooral een krachtig instrument dat helpt om asynchrone
communicatie inzichtelijk en beheersbaar te maken. De overkoepelende vraag is
nog echter niet behandeld: wanneer gaan we het dan wel, en wanneer niet
gebruiken? In deze blog ga ik dieper in op de situaties waarin AsyncAPI wel
geschikt lijkt, en in welke situaties het van weinig toegevoegde waarde lijkt te
zijn.

<!-- truncate -->

## Toegevoegde waarde van AsyncAPI

Daar horen een paar disclaimers bij. Bovenal moet duidelijk zijn dat dit gaat om
een work-in-progress; de discussie over welke use cases passend zijn voor het
gebruik van AsyncAPI is in volle gang. Zie dit dan ook echt als een voorlopige
observatie, en niet als een definitieve aanbeveling. Daarnaast wil ik ook echt
nogmaals iets benoemen dat in de eerdere post ook gedeeld is: niet elke
asynchrone interactie vraagt om een uitgebreide specificatie, en niet elk
systeem wordt beter van extra documentatie en tooling. In plaats van een harde
scheiding op basis van techniek lijkt het nu meer dat het onderscheid gemaakt
wordt door de complexiteit van het landschap, de mate van ontkoppeling en de
dynamiek van verandering. Met die algemene punten gezegd hebbende, laten we gaan
kijken naar hoe de splitsing er op dit moment uit lijkt te zien, te beginnen met
de “happy flow”, de gevallen waarin AsyncAPI aan de orde is en echt iets
toevoegt.

### Onbekende afnemers

Een van de meest kenmerkende situaties waarin dit het geval is, is die waarin je
niet (meer) precies weet wie je afnemers zijn. In traditionele, synchrone API’s
is dat doorgaans helder: een client roept een endpoint aan en verwacht een
antwoord. Die relatie is expliciet en vaak ook beheersbaar. In asynchrone
omgevingen vervaagt dat beeld. Een systeem publiceert een event, maar heeft geen
volledig zicht op wie dat event consumeert, laat staan wat ermee gebeurt. Juist
daar helpt AsyncAPI om een contract neer te zetten dat losstaat van individuele
afnemers. Niet door te beschrijven wie er luistert, maar door vast te leggen wat
er over de lijn gaat en onder welke voorwaarden. Dat lijkt een subtiel verschil,
maar maakt in de praktijk het onderscheid tussen impliciete afhankelijkheden en
expliciete afspraken.

### 1-op-N communicatie

Die dynamiek wordt nog duidelijker in situaties waarin communicatie niet langer
één-op-één is, maar één-op-veel. In OpenAPI wordt in dergelijke gevallen al snel
vereist dat je dit op basis van webhooks oplost, of dat je een grote hoeveelheid
endpoints gaat modelleren (en elke keer weer nieuwe bij moet definiëren als er
iets wijzigt). Er zijn zeker gevallen waarin dit prima is of zelfs de voorkeur
heeft (zie verderop), maar het neemt niet weg dat wanneer de situatie opschaalt
AsyncAPI native ondersteuning biedt voor “1 event -> multiple consumers”; je
hoeft niks te forceren, het is ervoor gemaakt. Een enkel event kan door meerdere
systemen worden opgepakt, ieder met een eigen interpretatie en vervolgactie.
Door die gebeurtenis centraal te beschrijven, ontstaat er een gedeeld
referentiepunt zonder dat je de onderlinge relaties hoeft dicht te timmeren. Het
gevolg is een vorm van ontkoppeling die niet alleen technisch, maar ook
organisatorisch ruimte biedt.

### Ontkoppelde request-response flows

Een derde categorie waarin AsyncAPI zich nadrukkelijk bewijst, is die waarin
timing geen vaste rol speelt. Dit is in wezen de primaire use-case waar AsyncAPI
voor is opgetuigd, namelijk een asynchrone flow. In een request-response model
zit er per definitie een directe relatie tussen vraag en antwoord; de één wacht
op de ander. In asynchrone ketens ligt dat anders. Een event kan worden
gepubliceerd zonder dat er direct een reactie volgt, en eventuele vervolgstappen
kunnen verspreid in de tijd plaatsvinden. Door die loskoppeling expliciet te
maken in de documentatie, voorkom je dat impliciete aannames ontstaan over
volgorde of responstijden. AsyncAPI sluit hier goed op aan en is er ook gewoon
voor gemaakt; het legt de nadruk op het event zelf en niet op de interactie
eromheen.

### Complexe/grote landschappen

Hier zit een meerwaarde in die groter wordt naarmate ketens langer en complexer
worden. In grotere landschappen, waarin meerdere systemen events publiceren en
consumeren en waarin geen enkele partij het volledige overzicht heeft is het
risico sterk aanwezig dat er geen eenduidig overzicht meer beschikbaar is en
afhankelijkheden uit beeld verdwijnen. Kleine wijzigingen kunnen onverwachte
effecten hebben, simpelweg omdat niet duidelijk is wie er allemaal geraakt
wordt. In dat soort omgevingen fungeert AsyncAPI als een soort verkeerskaart:
wellicht niet volledig tot in alle details, maar wel voldoende om inzicht te
geven in de belangrijkste stromen en afhankelijkheden. Het maakt zichtbaar welke
events bestaan, hoe ze zijn opgebouwd en waar mogelijke breekpunten zitten. Dat
helpt teams niet alleen om hun eigen werk beter te begrijpen, maar ook om
bewuster om te gaan met veranderingen.

### Veranderlijk landschap

Die veranderlijkheid verdient ook de aandacht in deze context. In systemen
waarin berichten regelmatig evolueren, zoals uitbreidingen van payloads, nieuwe
versies van API’s of aanpassingen in structuur, wordt het risico op
misinterpretatie snel groter. Zonder expliciet contract is het dan lastig om te
bepalen wat wel en niet een breaking change is, en waar compatibiliteit
gewaarborgd moet blijven. AsyncAPI biedt hier houvast door schema’s en versies
expliciet vast te leggen, waardoor wijzigingen niet alleen zichtbaar, maar ook
toetsbaar worden. In combinatie met automatiseerbare tooling voor validatie en
codegeneratie ontstaat zo een mechanisme dat helpt om veranderingen
gecontroleerd door te voeren. Door wijzigingen expliciet te maken krijg je grip
op versiebeheer en worden breaking changes zichtbaar in zowel inhoud als
locatie. AsyncAPI’s strakke documentatie van wat een sender/receiver echt nodig
heeft voorkomt eens temeer dat men stilletjes elkaars systemen breekt.

### Complexe/grote berichten

Los van alle landschap-eigenschappen is er ook op gebied van de berichten zelf
een reden om AsyncAPI in gebruik te gaan nemen voor asynchrone API documentatie.
Naarmate payloads groter en gelaagder worden, neemt de kans toe dat
verschillende partijen dezelfde data op een andere manier interpreteren. Zeker
in asynchrone communicatie, waar directe feedback ontbreekt, kan dat leiden tot
fouten die pas laat aan het licht komen. Door de structuur en betekenis van
berichten expliciet te documenteren, verklein je die interpretatieruimte.
AsyncAPI dwingt je niet om die stap te zetten, maar faciliteert het wel op een
manier die goed aansluit bij bestaande ontwikkelpraktijken. Ook hierin is de
automatiseerbare tooling van toegevoegde waarde; de beheerlast van het bijhouden
en valideren van alle versies + het opstellen van passende code kan met een druk
op de knop per versie uitgevoerd worden (mits je dit hebt ingericht natuurlijk,
maar dat spreekt voor zich).

### Event-Driven omgevingen

Al deze kenmerken komen samen in omgevingen waarin
[Event-Driven Architecture](https://developer.overheid.nl/blog/2026/03/06/event-driven)
de norm is. Denk aan Kafka, RabbitMQ, PubSub en meer; zodra events fungeren als
primaire vorm van communicatie, en messaging-platform protocollen de
onderliggende infrastructuur vormen, ligt het gebruik van AsyncAPI voor de hand.
Niet omdat het moet, maar omdat het aansluit bij de manier waarop het systeem is
opgebouwd. Het biedt een gemeenschappelijke taal om events te beschrijven, los
van het specifieke protocol of de implementatie, en maakt het mogelijk om
documentatie, tooling en ontwikkeling beter op elkaar af te stemmen in een
specificatie die gemaakt is om deze type zaken te beschrijven.

## OAS als betere optie

Kortom, AsyncAPI biedt een hoop mogelijkheden. Het is echter zeker niet
alomvattend, ongeacht wat er op de [Roadmap](https://www.asyncapi.com/roadmap)
pagina staat. Uit onze eigen onderzoeken en use cases is duidelijk gebleken dat
er situaties zijn waarin de toegevoegde waarde beperkt blijft. Om het verschil
goed te duiden wil ik deze ook in enige mate van detail toelichten.

### Simpele integraties; 1-op-1 koppelingen

De eerste en misschien meest voor de hand liggende situatie is die van
eenvoudige, 1-op-1 koppelingen tussen twee systemen. Wanneer zowel de producer
als de consumer bekend en onder controle zijn van hetzelfde team, of wanneer de
lijnen tussen producer en consumer zeer kort zijn is de noodzaak voor een
uitgebreid contract vaak klein. De betrokken partijen hebben direct contact,
wijzigingen kunnen afgestemd worden en de kans op onverwachte afhankelijkheden
is gering. Naast een minimale noodzaak om het wél te doen is er ook een
duidelijke reden om het niet te doen. Het introduceren van een uitgebreide
specificatie en al het werk dat nodig is om dit op te stellen en bij te gaan
houden gaat dan leiden tot extra beheerlast zonder dat daar een concreet
voordeel tegenover staat.

### Simpele/kleine berichten

Een vergelijkbaar beeld ontstaat bij kleine of eenduidige berichten; denk aan
simpele status berichten als een `{ "status": "ok" }`. Wanneer de inhoud beperkt
is en er weinig ruimte is voor interpretatie, voegt het modelleren van
uitgebreide schema’s weinig toe. Het risico dat AsyncAPI hier probeert te
ondervangen, namelijk misinterpretatie van complexe data in een uitgebreide en
ontkoppelde keten, is simpelweg niet aanwezig. De investering in documentatie en
tooling weegt dan al snel zwaarder dan de potentiële winst. Een goed voorbeeld
hiervan is de situatie bij de RVIG zoals voorgedragen in de werkgroep. Zij
hebben een simpele asynchrone API implementatie en is ook op onderzoek gegaan om
te kijken of AsyncAPI hier een toevoeging kan zijn. Het gaat hier om een heel
klein bericht in een omgeving die niet heel veel verkeer ziet. Hun conclusie was
dat het opbouwen van AsyncAPI documentatie, het definiëren van Operations,
Messages, Channels e.a. niets opleverde wat niet makkelijker met een asynchrone
PubSub-based API in OAS documentatie te behalen viel. Ook liepen ze er tegenaan
dat het definiëren van Channels vragen opwierp waar geen sluitend antwoord op
bleek; richt je een Channel op per gebeurtenistype? Per persoon? Per abonnee? In
alle gevallen ben je eigenlijk enorme bergen aan beheerlast aan het scheppen.
Kortom, AsyncAPI was/is hier niet de uitkomst.

### Low-use omgevingen

Dan een klein maar toch noemenswaardig vervolg op het vorige punt, waarin we
kijken naar de context waarin systemen opereren. In omgevingen waarin berichten
weinig voorkomen of nauwelijks impact hebben, is de noodzaak voor strakke
contracten beperkt. Denk aan je “nice-to-haves”, non-critical events die tevens
zelden voorkomen en waar het de organisatie “niks” kost als het fout gaat of
verkeerd geinterpreteerd wordt. In zo’n situatie is het zeer aan te raden om
voor een lichtere aanpak te kiezen dan een volledige AsyncAPI straat opbouwen.

### Statische omgevingen

In het verlengde daarvan lijkt AsyncAPI ook minder geschikt voor situaties die
weinig tot niet veranderen over tijd. Zonder iteraties, uitbreidingen, nieuwe
versies of in zijn geheel een noodzaak op aanhoudende governance is de
meerwaarde van uitgebreide contractbeschrijving kleiner. Pak daar de toegevoegde
beheerlast bij en je bent net als eerder meer werk aan het doen aan beheer
opstellen dan dat het je uit handen neemt. Hoewel het van toegevoegde waarde kan
zijn om dit wel te doen als de rest van de organisatie alles op deze wijze
documenteert is AsyncAPI waarschijnlijk teveel gevraagd in use cases waarin niks
gaat veranderen. Dan zouden een paar simpele regels documentatie voldoende
kunnen zijn.

### Onvolwassen organisaties

Het moet toch ook genoemd worden: misschien wel de meest onderschatte factor is
de organisatie zelf. AsyncAPI veronderstelt een bepaalde mate van volwassenheid
in het omgaan met documentatie en contracten. Als specificaties niet worden
bijgehouden, als er geen duidelijk eigenaarschap is of als afspraken niet worden
nageleefd, verliest de documentatie snel zijn waarde. In het slechtste geval
ontstaat er een situatie waarin de specificatie een verouderd of onjuist beeld
geeft van de werkelijkheid, met alle risico’s van dien. In die zin geldt hier
een eenvoudige maar belangrijke regel: slechte AsyncAPI is erger dan geen
AsyncAPI. Dit geldt uiteraard voor elke standaard, maar het moet toch benoemd
worden dat AsyncAPI hier echt geen uitzondering op is.

## Voorlopige conclusie

Alles bij elkaar zijn we tot nu toe op een genuanceerd beeld uitgekomen.
AsyncAPI lijkt bijzonder krachtig in complexe, dynamische en ontkoppelde
omgevingen waarin events een centrale rol spelen en waarin meerdere partijen
onafhankelijk van elkaar opereren. In die context helpt het om structuur aan te
brengen, afspraken expliciet te documenteren en veranderingen beheersbaar te
maken. Tegelijkertijd is het geen vanzelfsprekende keuze voor elke vorm van
communicatie, asynchroon of anderszins. Juist door kritisch te kijken naar de
aard van het probleem en de context waarin het zich voordoet, kun je bepalen of
de inzet van AsyncAPI daadwerkelijk bijdraagt aan een betere oplossing. We zijn
nog niet zover, maar het begint er wel op te lijken dat een NLgov profiel op den
duur van toegevoegde waarde gaat zijn voor deze standaard.

Hopelijk heeft deze uiteenzetting geholpen met wat inzicht verkrijgen in wanneer
AsyncAPI een oplossing kan zijn. Het kan echter goed zijn dat dit nog te
abstract voelt, en dat men graag wil weten hoe een echte implementatie er nou
uit zou komen te zien. Zoals al gezegd is dit alles nog een work-in-progress,
maar dat neemt niet weg dat we vast een beetje vooruit kunnen kijken. In de
laatste blogpost in deze reeks neem ik jullie mee in de combinatie van AsyncAPI
met Cloudevents, om eens een schets te maken van hoe dit alles in zijn werk zou
gaan als we het echt gaan gebruiken.
