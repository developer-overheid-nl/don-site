---
authors: [frank-niessink]
tags: [development, devops]
---

# Een les van ICTU: Do-Describe-Check-Act methode

Als je je ontwikkelproces wilt verbeteren zijn er veel standaarden en raamwerken
beschikbaar. Eén van de bekendere is de Plan-Do-Check-Act (PDCA) cyclus om
continue verbetering te realiseren:

- Tijdens de Plan-fase stel je verbeterdoelen en ontwerp je een nieuwe versie
  van je proces.
- Tijdens de Do-fase probeer je het nieuwe proces uit.
- Vervolgens evalueer je tijdens de Check-fase de resultaten van het nieuwe
  proces tegen de gestelde doelen.
- Als de nieuwe processen de gestelde doelen halen neem je die tijdens de
  Act-fase in gebruik.

Nu heb je een betere versie van je proces en kun je de cyclus opnieuw uitvoeren.
Tenminste, dat is het idee. In de praktijk van softwareontwikkeling is de
PDCA-cyclus nog niet zo eenvoudig uit te voeren. Het ontwerpen van een nieuw
proces leidt al snel tot big-design-up-front en wensdenken. Een enkel
softwareontwikkelproject kan lang duren waardoor resultaten lang op zich laten
wachten. Nieuwe processen implementeren is sowieso ingewikkeld. En, of een nieuw
proces werkt of niet is lastig te evalueren als je organisatie een diverse
portfolio aan applicaties en projecten heeft.

Er is echter een pragmatisch alternatief: Do-Describe-Check-Act.

<!-- truncate -->

## Do-Describe-Check-Act

### Intermezzo

Voor we beginnen moet ik wat bekennen: de Do-Describe-Check-Act cyclus is geen
bestaande verbeteraanpak. Het is een manier van werken die in de praktijk is
ontstaan bij ICTU, sinds 2017. Die manier van werken heeft geresulteerd in de
[ICTU Kwaliteitsaanpak Softwareontwikkeling](https://www.ictu.nl/artikelen/whitepaper-kwaliteitsaanpak-ictu-software-ontwikkeling/).
De inhoud ervan kun je vinden op
[GitHub](https://ictu.github.io/Kwaliteitsaanpak/).

Als je door die aanpak bladert zul je zien dat het behoorlijk omvangrijk is: een
beschrijving van de aanpak zelf, templates en self-assessment tools.
Ongetwijfeld zijn er onderdelen, templates bijvoorbeeld, die herbruikbaar zijn
in andere organisaties, maar veel is natuurlijk ICTU-specifiek. Bovendien zit
één van de meest waardevolle onderdelen van de aanpak nogal verstopt. En dat is
de manier waarop we bij ICTU het verbeterproces hebben aangepakt.

Do-Describe-Check-Act is een poging die verbeteraanpak zo te beschrijven dat het
herbruikbaar en toepasbaar wordt in jouw organisatie, zonder al te veel aannames
te doen over hoe je organisatie werkt en welke processen, tools en technologieën
je toepast.

_Here we go..._

### Do

De Do-Describe-Check-Act (DDCA) cyclus gaat er van uit dat je organisatie al
software ontwikkelt en neemt de huidige praktijk als uitgangspunt. Er zijn teams
die applicaties ontwikkelen en onderhouden en er zijn projecten met
projectleiders en budget. En bovendien, er zijn overeenkomsten tussen de
projecten en teams. Overeenkomsten in processen, bijvoorbeeld teams doen peer
reviews en passen Scrum toe. Overeenkomsten in tools, bijvoorbeeld iedereen
gebruikt GitLab voor continous integration. En overeenkomsten in toegepaste
technologie, bijvoorbeeld veel applicaties zijn geschreven in Java en hebben een
event-driven architectuur. Voor het gemak noem ik die processen, tools en
technologieën hier verder "werkwijzes".

### Describe

In de Describe-fase van de cyclus schrijf je op wat de belangrijkste werkwijzes
zijn die bijdragen aan goede resultaten én die je ook daadwerkelijk toepast.
Geen wensdenken dus, maar een beschrijving die overeenkomt met hoe teams,
projecten en/of afdelingen in je organisatie software ontwikkelen, onderhouden
en beheren. Voor het gemak gebruik ik verder alleen de term "team", maar
daarvoor mag je dus ook project of afdeling lezen.

Je beschrijft een werkwijze alleen als deze vaak wordt toegepast. Je kunt "vaak"
bijvoorbeeld definiëren als: minstens driekwart van de teams past de werkwijze
minstens driekwart van de tijd toe. Heeft team A als enige goede ervaringen met
Playwright? Leuk, maar dat is niet voldoende om op te schrijven. Passen alle
teams peer reviews toe, behalve team B want daarin werkt maar één ontwikkelaar?
Dan beschrijf je peer reviews wel als werkwijze. Aangenomen dat je vindt dat het
doen van peer reviews een goed idee is, uiteraard.

### Check

Tijdens de Check-fase vergelijk je de uitvoering met de beschrijving. Elk team
vergelijkt de eigen werkwijzen met de beschrijving die je in de Describe-fase
hebt gemaakt. Als er verschillen zijn tussen de beschreven werkwijzen en de
toegepaste werkwijzen noteert het team waarom dat verschil er is. Want, als een
werkwijze van een team afwijkt van de beschrijving, kan dat meerdere dingen
betekenen:

- De beschreven werkwijze is een goed idee en het team dat deze nog niet toepast
  gaat dat veranderen (tijdens de Act-fase).
- De beschreven werkwijze is _normaal gesproken_ een goed idee, maar niet voor
  dit specifieke team. Bijvoorbeeld, met maar één developer in een team zijn
  peer reviews niet zinvol toe te passen. In dat geval is de werkwijze peer
  reviews niet van toepassing. Blijkt een werkwijze voor veel teams niet van
  toepassing te zijn, dan kan je beter de beschrijving aanpassen en de werkwijze
  weglaten.
- De beschreven werkwijze is verouderd, blijkt in de praktijk toch niet goed te
  werken, of het team gebruikt een betere werkwijze. In dat geval moet misschien
  de beschrijving worden aangepast. Zeker als meerdere teams ook zijn
  overgestapt op een betere werkwijze of dat willen doen.

Teams kunnen op elk moment zo'n check uitvoeren, maar minstens één keer per jaar
doen alle teams dat op hetzelfde moment zodat je patronen kunt zien in de
toepassing van werkwijzes over teams heen.

### Act

Tijdens de Act-fase verbeteren de teams hun werkwijzes en/of pas je de
beschrijving van werkwijzes aan, afhankelijk van de uitkomsten van de
Check-fase.

Na verloop van tijd doe je weer opnieuw een Check. Zo verbetert langzaam maar
zeker je proces.

## Waarom werkt Do-Describe-Check-Act?

Het prettige aan DDCA is dat je een beschijving hebt van de praktijk die nooit
veel afwijkt. Onze ervaring bij ICTU is dat projecten meestal 85%-95% van de
werkwijzes hanteren. En dat betekent dat je beschrijving geen "stip op de
horizon" is, maar klopt met hoe teams daadwerkelijk werken. De beschrijving is
dus vooral "beschrijvend" en alleen in tweede instantie "voorschrijvend". Teams
kunnen uitleggen waarom ze werkwijzes niet of niet geheel toepassen.

Verbetering komt langs twee routes tot stand: via nieuwe werkwijzes die
projecten zijn gaan toepassen die dan via de Check-fase in de beschrijving
landen. Daarnaast kunnen werkwijzes wettelijk verplicht worden en op die manier
in de beschrijving terecht komen. Denk aan het toepassen van de Webrichtlijnen
of het uitvoeren van DPIA's.

Er zijn uiteraard wel wat randvoorwaarden om DDCA goed te laten werken. Je hebt
iemand nodig die de beschrijving maakt, onderhoudt en deelt met alle teams. En
die de jaarlijkse gezamenlijke check organiseert. Daarnaast moet in elk team
iemand, bijvoorbeeld een kwaliteitsmanager, de check uitvoeren en terugkoppelen
aan de beheerder van de beschrijving. En teams moeten natuurlijk tijd vrijmaken
voor het implementeren van verbeteringen.

## Hoe ziet de beschrijving er uit?

Wat je opneemt in de beschrijving van het ontwikkelproces hangt af van je
organisatie. Ik zou zo eenvoudig mogelijk beginnen. Stel dat je Scrum gebruikt,
verwijs dan naar de Scrumguide. Als de beschrijving van een werkwijze té compact
is kom je daar vanzelf achter tijdens een Check en kan je de beschrijving op
basis van feedback uit de teams aanpassen. Handig is wel om kort op te nemen
waarom een bepaalde werkwijze een goed idee is (de rationale) zodat dat voor
iedereen duidelijk is. Als een werkwijze uit een aantal onderdelen bestaat,
nummer die dan apart zodat teams ze in de Check apart kunnen scoren, zoals in
het voorbeeld hieronder.

Een (ingekort) voorbeeld uit de beschrijving van ICTU is:

> **Het project gebruikt een continuous delivery pipeline om het product te
> bouwen, testen en op te leveren** Er is een geautomatiseerde continuous
> delivery pipeline die aantoonbaar correct werkt en de software bouwt,
> installeert in de testomgevingen, test op functionele en niet-functionele
> eigenschappen en oplevert, al dan niet inclusief installatie in de
> productieomgeving. De geautomatiseerde continuous delivery pipeline voert ten
> minste de volgende activiteiten uit:
>
> 1. Bouw van de software,
> 1. Unit tests,
> 1. Regressietests,
> 1. Beveiligingstests,
> 1. Performancetests,
> 1. Toegankelijkheidstests,
> 1. Broncodekwaliteitscontroles,
> 1. Installatie van de software in test, acceptatie en/of productieomgevingen,
> 1. Oplevering van het totale product, dus inclusief alle deliverables, in de
>    vorm zoals bruikbaar voor en afgesproken met de opdrachtgevende
>    organisatie.

> _Rationale_: Software incrementeel opleveren vereist dat de software frequent
> gebouwd, getest en opgeleverd kan worden. Om dit efficiënt en foutvrij te
> doen, dient het proces van bouwen, testen en opleveren geautomatiseerd te
> zijn; een continuous delivery pipeline faciliteert dit.

## Hoe doe je een check tegen de beschrijving?

Zie de check vooral als een self-assessment, niet als een audit of ander soort
controle. Bij DDCA gaan we ervan uit dat teams zelf het beste weten welke
werkwijzen van toepassing zijn in hun context. En dat als ze afwijken van de
beschrijving ze daar een goede reden voor hebben.

Een pragmatische manier om de check uit te voeren is alle werkwijzen op een
rijtje te zetten in een tabel en vervolgens per werkwijze te noteren:

- Past het team de werkwijze helemaal, deels of niet toe?
- Is de werkwijze van toepassing in de context van het project of team?
- Welke actie(s) wil het team nemen in geval van een verschil tussen
  beschrijving en uitvoering?

Bij een gezamenlijke check legt de organisator van de check alle scores van de
projecten naast elkaar en analyseert de patronen over teams heen. Daarbij kun je
kijken naar:

- Welke werkwijzes worden vaak niet of niet helemaal toegepast? Dit kan
  bijvoorbeeld wijzen op werkwijzes waar developers meer kennis of ondersteuning
  nodig hebben.
- Welke werkwijzes worden vaak als niet van toepassing aangemerkt? Dit kan
  bijvoorbeeld wijzen op werkwijzes die niet (meer) relevant zijn voor je
  organisatie.
- Zijn er groepen van teams die dezelfde werkwijzes niet of niet geheel
  toepassen? Dit kan bijvoorbeeld wijzen op (nieuwe) technologie of tools waar
  nog geen goede werkwijzes voor zijn.

Door bovendien de checks te vergelijken met voorgaande jaren kun je mogelijk ook
nog trends ontdekken en daarop inspelen.

## Beschrijf ik Do-Describe-Check-Act ook als werkwijze?

Ja, dat is zeker een goed idee. Op die manier leg je vast hoe jouw organisatie
DDCA toepast en kun je de verbeteraanpak zelf ook verbeteren.

## Conclusie

Het Do-Describe-Check-Act model is een raamwerk dat je als organisatie kan
helpen om je ontwikkelproces te verbeteren. Doordat je in verschillende fases
werkt kan je op een overzichtelijke manier informatie inwinnen over hoe teams
precies werken en wat de bestaande best-practices zijn. Vervolgens kan je de
resultaten vergelijken om te kijken wat wel en wat niet werkt. 
In tegenstelling tot de Plan-Do-Check-Act cyclus neemt 
Do-Describe-Check-Act je huidige werkwijze als uitgangspunt 
zodat je die incrementeel en iteratief kunt verbeteren.
