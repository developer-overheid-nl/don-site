---
authors: [tom-ootes]
tags: [digid, ux, oas, data-bij-de-bron, common-ground, build-for-failure, msa]
toc_max_heading_level: 2
---

import { Blockquote } from "@rijkshuisstijl-community/components-react";

# Vorderingenoverzicht Rijk: één overzicht met betalingsverplichtingen dankzij de Common Ground principes

Het team van Vorderingenoverzicht Rijk kreeg een interessante opdracht toen ze
werd gevraagd een dienst te ontwikkelen waarin burgers hun openstaande
betalingsverplichtingen bij de overheid kunnen inzien. Vanaf de start van het
project is de architectuur vormgegeven in lijn met het principe **Data bij de
Bron**. In dit geval betekent dat, dat burgers met de app van
Vorderingenoverzicht Rijk bij (nu nog) acht verschillende overheidsorganisaties
data kunnen ophalen over hun financiële situatie. Omdat de data rechtstreeks uit
de bron komt, wordt data nergens anders opgeslagen of verwerkt.

Ook werkt het team volledig volgens de **Common Ground** principes, dat het
opknippen van functionaliteit in component-gebaseerde applicaties voorschrijft.
In dit artikel lees je hoe deze principes het team helpen om succesvol hun doel
te bereiken.

<!-- truncate -->

:::info[TL;DR]

- Vorderingenoverzicht Rijk gebruikt het vijf-lagenmodel van Common Ground om
  haar ecosysteem op te knippen in herbruikbare gestandaardiseerde componenten.
- Dit zorgt ervoor dat bronorganisaties deze componenten makkelijk kunnen
  hergebruiken, en hun data kunnen ontsluiten naar de app.
- Gebruikersonderzoek is een belangrijke pijler binnen het project, dit zorgt
  dat er echt waarde voor de burger wordt gecreëerd.

:::

## Timen Olthof, Architect

Timen begon na zijn studies Filosofie en Computerwetenschappen als software
engineer en werkte voor onder andere Citibank, New York Pizza, Gemeente
Amsterdam, Alliander en nu Centraal Justitieel Incassobureau (CJIB).

Een belangrijke stap in zijn carrière was de overstap naar Common Ground toen
die informatiekundige visie nog in de kinderschoenen stond. Common Ground is een
initiatief van gemeenten en de Vereniging van Nederlandse Gemeenten (VNG) waarin
gewerkt wordt aan een toekomstbestendige architectuur. In deze fase nam hij
verschillende rollen op zich:

- Kennishouder/ Adviseur Common Ground voor verschillende teams van gemeenten en
  leveranciers
- IT-strateeg voor Common Ground

Wat ook leuk is om te weten is dat hij aan de wieg stond van
developer.overheid.nl, het mooie platform waar je dit artikel nu op leest!

## Kiske de Leest, Projectleider

Kiske begon zijn carrière bij Unisource, een dochteronderneming van KPN, als
projectleider in WAN-projecten. Vanuit zijn rol in de telecommunicatiehoek
maakte hij de overstap naar het domein van webdevelopment. Na het invullen van
verschillende rollen in dit domein besloot hij als zelfstandig ondernemer aan de
slag te gaan. Hij werkte onder andere aan projecten in de (farmaceutische) zorg.
Vervolgens vervulde Kiske bij VNG Realisatie de rol van projectleider bij het
project De Blauwe Knop, waar een basis werd gelegd voor het huidige project
Vorderingenoverzicht Rijk.

![Timen en Kiske](./img/timen_en_kiske.png) _Timen Olthof (links) en Kiske de
Leest (rechts)_

## Introductie

**Tom**: Kunnen jullie uitleggen waar het project Vorderingenoverzicht Rijk over
gaat?

**Kiske**: Het Vorderingenoverzicht Rijk is ontstaan vanuit een prototype dat we
eerder hadden gemaakt voor een schuldenoverzicht (project Blauwe Knop[^1]). Dat
sloot perfect aan bij het programma "Clustering Rijksincasso", waarin meerdere
publieke dienstverleners samenwerken. Bij dat programma wordt gekeken hoe we een
stap naar voren kunnen maken in de manier waarop de overheid incasso's richting
burgers vormgeeft. We realiseren ons dat een burger maar één afloscapaciteit
heeft en dat de burger de overheid als één geheel ziet. De burger moet ook als
zodanig benaderd worden - niet elke week verschillende overheidsinstanties op de
stoep. Om schuldenproblematiek te voorkomen en op te lossen, heb je een
overzicht nodig van waar je als burger staat. Dat is waar ons project voor
zorgt.

!["Twee screenshots van de Vorderingenoverzicht Rijk applicatie"](./img/app_summary.png)

## Common Ground principes

**Tom**: Jullie passen de Common Ground filosofie toe in jullie project. Hoe
helpt dit de bronorganisaties?

**Timen**: Ten eerste passen we de Nederlandse API-strategie toe. Daarin staat
niet alleen hoe organisaties onderling gegevens kunnen uitwisselen, maar ook hoe
burgers direct informatie kunnen opvragen bij organisaties via APIs. Wij geven
invulling aan dat stukje door API's voor burgers te maken. Dit creëert een heel
ander juridisch en maatschappelijk speelveld. Hierdoor worden allerlei
juridische obstakels weggenomen. Op het moment dat burgers zelf om die gegevens
vragen, is het een no-brainer dit te verstrekken voor bronorganisaties; dat doen
ze immers ook als je een papieren brief stuurt. Bij VNG heb ik een tijd aan de
standaard die nu FSC heet gewerkt. Daarmee kunnen organisaties onderling
digitaal veilig zaken doen. Toen we aan dit project begonnen, was duidelijk dat
voor burgers net zoiets nodig is: hoe kunnen zij veilig API's aanroepen bij
organisaties? We hebben toen een soort FSC voor burgers gemaakt: Blauwe Knop
Connect. Deze hebben we steeds doorontwikkeld op basis van gebruikersfeedback,
en onlangs hebben we de architectuur en specificaties van deze standaard
[gepubliceerd](https://vorijk.nl/standaard/), een mooie mijlpaal.

### Component-gebaseerde architectuur voor hergebruik

**Timen**: Het tweede belangrijke principe is component-gebaseerd werken. We
hebben vanaf het begin alle onderdelen die nodig zijn om het geheel te laten
werken als losse componenten gebouwd. We hebben daarom heel veel kleine
repositories op
[oss.developer.overheid.nl](https://oss.developer.overheid.nl/repositories?q=vorderingenoverzicht)
staan, die allemaal een klein stukje van de puzzel zijn. Die componenten hebben
we als referentie-implementaties open source beschikbaar gesteld. Organisaties
hebben dan de keuze: ze kunnen al onze referentie-implementaties gebruiken, maar
ook kiezen om bepaalde delen zelf te bouwen of te integreren met software die ze
misschien al hebben, zoals een database-systeem of een stukje UI in hun
medewerkersportaal. Tussen al die componenten hebben we standaarden:
OpenAPI-specificaties. Je definieert voor elk component: dit is de vraag die je
kan stellen en dit is het antwoord dat eruit moet komen. Of je nu alles wilt
herbouwen of stukjes wilt hergebruiken, je kunt het gewoon plug-and-play aan
elkaar zetten, en elke organisatie kan hierin zijn eigen afwegingen maken, en
toch de gezamenlijke standaarden ondersteunen.

### Common Ground vijf-lagenmodel

**Tom**: In het vijf-lagenmodel heeft elke component zijn eigen
verantwoordelijkheid. Liepen jullie tegen dingen aan in de praktijk bij het
implementeren hiervan?

**Timen**: Het is inderdaad lastig om de waarde hiervan te zien bij de eerste
commit. "Waarom zou ik vijf losse services maken in plaats van één?" is een
vraag die ik vaak kreeg. Laat me een voorbeeld geven: je hebt een beheeromgeving
(**interactielaag**) voor medewerkers met knoppen voor bepaalde functies, zoals
het bewerken van bepaalde data of een proces in gang zetten. Die functionaliteit
zit niet in de UI maar wordt via een API aangeroepen bij wat we de
**proceslaag** noemen. Je zou kunnen zeggen: die component maakt direct
verbinding met een database en schrijft het weg. Maar wij hebben in lijn met de
principes van Common Ground toen gekozen: maak ook direct een aparte
**servicelaag**, een aparte service die de data ontsluit, en daaronder een
**datalaag** die het opslaat. In die datalaag bevindt zich veelal de database.

### Flexibel inzetbare componenten voor bronhouders

Dat klinkt als overkill, zeker bij de eerste commit. Maar wat we in de praktijk
zien is dat wanneer je met dat hele stapeltje functionaliteit naar een
organisatie gaat, je door deze opzet de mogelijkheid biedt om te selecteren
welke delen ze willen gebruiken. In onze demo-omgeving gebruiken we PostgreSQL,
maar misschien heeft een organisatie al een Oracle-database die ze niet willen
vervangen. Dan kunnen ze in hun Oracle-implementatie dezelfde service-interfaces
implementeren, en dan werkt dat procescomponent nog steeds met een heel ander
databasesysteem. Deze werkwijze betaalt zich uit in project Vorderingenoverzicht
Rijk, waarin veel partijen uiteindelijk deze componenten in één of andere vorm
nodig hebben. Vanuit developers-oogpunt kan het bovendien ook helpen om
complexiteit te verminderen: het opsplitsen van verantwoordelijkheden in
meerdere componenten voorkomt bijvoorbeeld dat je database-specifieke
implementaties in je proceslogica opneemt.

- [Naar de componenten in de architectuur van Vorderingenoverzicht Rijk](https://vorijk.nl/docs/architectuur/componenten/)

```mermaid
flowchart TD;
    Interactielaag<-->Proceslaag;
    Proceslaag<-->Connectiviteit;
    Connectiviteit<-->Servicelaag;
    Servicelaag<-->Datalaag;
```

Diagram: de vijf-lagen architectuur van Common Ground.

<!-- !["De vijf-lagen architectuur van Common Ground."](./img/vijflagen.png) -->

## Decentralisatie en bronbevraging

**Kiske**: Wat ik vooral heb geleerd van dit project, is dat je vanuit de
principes van Common Ground heel mooie dingen kunt doen met het belang van de
burger in gedachten. Aan de achterkant kun je zaken goed organiseren op basis
van die principes. Aan de voorkant kun je zorgen dat je de rechtspositie van de
burger in acht neemt. Het voornaamste aspect is in ons geval de rechtstreekse
bronbevraging door de burger. Alle verwerking vindt plaats bij de burger en bij
de bron. En verder nergens. Dat is een fraaie belofte, en je merkt dat dat voor
de bronorganisaties steeds belangrijker wordt.

<br/>

<Blockquote
  attribution="— Timen Olthof"
  variation="pink-background"
>
De 5-lagen architectuur betaalt zich uit in dit project, waarin veel partijen uiteindelijk deze componenten in één of andere vorm nodig hebben.
</Blockquote>

<br/>

## Build for Failure

**Timen**: We ontwikkelen ook "for failure". In plaats van te zeggen dat
iedereen alles up moet hebben om het geheel te laten werken, hebben we het
omgedraaid: als één organisatie niet werkt, dan werken alle andere nog wel. Je
hebt daardoor minder last van fouten. Als het ergens fout gaat, is het heel
duidelijk waar het fout gaat. Als organisatie ben je zelf verantwoordelijk voor
je eigen component en omdat je dit onafhankelijk van andere organisaties kunt
doen, kun je het ook zelf weer oplossen.

!["Het gedecentraliseerd ophalen van data door de app"](./img/app_decentralized.png)

## Datamodel op basis van behoefte gebruiker

**Timen**: Het datamodel van de data die in onze app zit (wat moet je nog
betalen, wanneer heb je dingen betaald, wat zijn vervaldatums, etc.) is
losgekoppeld van de APIs die het verstrekken. We ontwerpen het model vanuit wat
de burger nodig heeft, en niet vanuit wat er wordt opgeslagen. Het maakt ons
niet zoveel uit hoe een organisatie de data in zijn interne systeem heeft staan.
We kijken alleen naar wat er uit moet komen als een burger wil zien wat er
betaald is en wat nog betaald moet worden. Daarbij volgen we de wet en maken we
ruimte voor uitvoeringskeuzes. Ons model dwingt niet af hoe uitvoering
plaatsvindt, maar enkel om daar de burger consistent over te informeren.

- Bekijk hier het
  ["datamodel"](https://vorijk.nl/docs/financiele-verplichtingen/document_types/financial_claims_information_document/)
  voor de financiële data in het Vorderingenoverzicht Rijk.

## Belangrijk voor de samenwerking: community-building

**Tom**: Jullie hebben veel bronorganisaties waarmee jullie samenwerken. Welke
rituelen en processen zijn jullie met hen doorgegaan om iteratief de componenten
te verbeteren?

**Kiske**: Een belangrijk aspect was dat we een aantal partijen hebben kunnen
bewegen om samen aan de slag te gaan met realiseren, in plaats van eerst een
heel traditioneel watervalproject op te zetten. CJIB is bijvoorbeeld relatief
snel aan de slag gegaan met het implementeren van componenten. Door gewoon te
doen en open met elkaar te communiceren over wat wel en niet werkt, kom je samen
verder. We hebben een digitale samenwerkingsomgeving (bij Digilab), waardoor het
makkelijk is voor partijen om laagdrempelig feedback te geven en vragen te
stellen. Ons team kan dan die feedback weer gebruiken om het product, het
stelsel en de standaarden verder te verbeteren.

!["Werkwijze VORijk"](./img/vorijk_werkwijze.png)

### Thema-dagen ter inpsiratie

**Timen**: Naast de digitale omgeving moet je ook echt een community bouwen en
investeren in het activeren van iedereen. We organiseren dagen met thema's zoals
tech-inspiratie of gebruiksonderzoek. We hebben ook een demo-omgeving waar we
zelf alles doen wat organisaties moeten doen als ze onze standaardcomponenten
hergebruiken ('eat your own dogfood'). De eerste organisatie die de componenten
opstart, vindt bovendien altijd wel iets wat bij hen net anders is. Dan pakken
we dat op en verbeteren we het product weer.

### Bronhouders helpen elkaar onderling

Op onze evenementen houden we vaak ook een "open space", waarbij we aan de
deelnemers vragen: jullie zijn hier naartoe gekomen, dus jullie hebben vast
dingen waar je het over wil hebben, vragen of zorgen. Het frappante is dat je
dan ziet dat er echt een community ontstaat: er ontstaat een open gesprek waar
partijen ook elkaar helpen: "Wij lopen hier tegenaan", "Oh, daar hadden wij deze
oplossing voor", "Heb je daar al eens naar gekeken?".

## Gebruikersgerichte ontwikkeling: de burger als middelpunt van het project

**Kiske**: Dit is veruit het gaafste project dat ik in 25 jaar heb gedaan, omdat
er zoveel dingen samenkomen. De gebruikersgerichte manier van werken, het
technische innovatieve stuk, en vooral het maatschappelijke karakter - de impact
die we samen hebben. De burger zit echt midden in ons project. We hebben niet
voor niets een fulltime gebruikersonderzoeker aan boord die vanaf dag één op pad
is om te kijken hoe we het overzicht zo kunnen maken, dat de gebruiker er ook
echt iets aan heeft. Hoe doet iemand dit nu? Met welke paperassen komt iemand
aanzetten als hij bij een financieel steunpunt komt? Wat zijn de stappen die
iemand wil doorlopen om grip te krijgen op zijn of haar financiën? Of als je die
grip (deels) hebt, hoe behoud of verstevig je die? En hoe kunnen wij iets maken
wat daar zo goed mogelijk bij aansluit? We kijken niet alleen achteraf of wat we
hebben gemaakt gebruikt kan worden, maar ook aan de voorkant: hoe doe je dit nu
en kunnen wij iets maken wat daarbij aansluit?

<br/>

<Blockquote
  attribution="— Kiske de Leest"
  variation="pink-background"
>
Dit is veruit het gaafste project dat ik in 25 jaar heb gedaan, omdat er zoveel dingen samenkomen. De gebruikersgerichte manier van werken, het technische innovatieve stuk, en vooral het maatschappelijke karakter - de impact die we samen hebben.
</Blockquote>

## Conclusie

Door het **vijf-lagenmodel** van Common Ground te gebruiken slaagt
Vorderingenoverzicht Rijk er in haar ecosysteem op te knippen in kleine
herbruikbare componenten. Deze componenten zijn bruikbaar voor de
bronhouderogranisaties die het team mee moet krijgen om een bruikbare app voor
burgers op te kunnen leveren.

Daarnaast investeert het team veel tijd en energie aan **gebruikersonderzoek**
waardoor het goed zicht heeft op waar de doelgroep behoefte aan heeft. Dit zorgt
voor een grote positieve maatschappelijke impact en daardoor geeft het veel
voldoening om voor het project te werken.

[^1]:
    De naam van het project Blauwe Knop, en ook van de standaard Blauwe Knop
    Connect die eruit is ontstaan, is ontleend aan een vergelijkbaar initiatief
    dat al meer dan 10 jaar geleden in de VS ontstond,
    [Blue Button](https://en.wikipedia.org/wiki/Blue_Button), waarbij mensen
    toegang konden krijgen tot hun eigen gegevens.
