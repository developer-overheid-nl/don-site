---
title: "13.1. Geautomatiseerd testen"
tags: ["development"]
---

# Richtlijn: Ontwikkel duurzame software door te investeren in geautomatiseerde testen

Bij handmatige testen bedient een mens de applicatie en vergelijkt het werkelijke gedrag van een applicatie met het  verwachte gedrag. Bij geautomatiseerde testen voert een ander stuk software deze activiteiten uit. Deze software bestaat vaak uit een 'test runner' en 'test scripts'. De test scripts bedienen de applicatie (of stukjes daarvan) en vergelijken het werkelijke gedrag met het verwachte gedrag van de applicatie. De test runner voert de test scripts uit.

We onderscheiden test scripts die een hele applicatie bedienen en controleren en test scripts die een stukje van de applicatie testen. Die eersten heten vaak systeemtesten of componenttesten, de laatsten worden unittesten genoemd.

Bij het draaien van een test script wordt over het algemeen slechts een deel van applicatiecode uitgevoerd. Door een coveragetool te laten bijhouden welke coderegels en codepaden wel of niet worden uitgevoerd kan na het draaien van de test scripts een overzicht worden gemaakt van de testdekking. Zo'n overzicht laat zien welke regels code wel en welke niet zijn uitgevoerd ('geraakt') tijdens het testen en het laat bij control flow zien welke paden wel en niet zijn uitgevoerd.

Coderegels en -paden die niet zijn geraakt tijdens het draaien van de test scripts zijn dus feitelijk ongeteste functionaliteit. Met je team maak je afspraken over hoeveel ongeteste code acceptabel is voor je applicatie. Dit kan door af te spreken hoeveel regels ongeteste code acceptabel is, maar meestal gebeurt dat door af te spreken dat bijvoorbeeld maximaal 5% ongeteste code acceptabel is. Oftewel, dat de gewenste testdekking 95% is.

## Rationale: Waarom geautomatiseerd testen?

Geautomatiseerde testen bieden een aantal voordelen. Ten eerste zijn ze veel goedkoper om uit te voeren dan handmatige testen. Als je een test eenmaal hebt geautomatiseerd is het opnieuw uitvoeren van de test praktisch gratis. Daardoor kun je na een wijziging snel vaststellen of bestaande functionaliteit nog steeds werkt. Oftewel, of er geen regressies zijn opgetreden. En dat draagt bij aan het tweede voordeel: het wordt goedkoper en minder risicovol om wijzigingen uit te voeren. Wat weer bijdraagt aan de duurzaamheid van de software.

Je meet de testdekking om te bepalen of alle functionaliteit getest wordt door je test scripts. Door er bovendien een norm op te zetten dwing je jezelf de testdekking te verhogen als deze te laag is.

## Doelgroep: Wie zijn er betrokken bij geautomatiseerde testen?

De volgende doelgroepen kunnen met geautomatiseerde testen aan de slag: programmeurs en testers.

Programmeurs ontwikkelen unittesten om te controleren of de code die ze schrijven doet wat ze denken dat het zou moeten doen. Daarnaast meten ze de testdekking van de unittesten en verhogen de testdekking indien nodig.

Testers ontwikkelen component- en systeemtesten die controleren of de applicatie werkt zoals verwacht, meten de testdekking ervan en verhogen de testdekking indien nodig.

## Implementatie: Hoe implementeer je geautomatiseerde testen?

### Methoden en technieken

#### Test-driven development

Test-gedreven ontwikkelen is strikt genomen geen methode om tests te ontwikkelen, maar een aanpak om code te ontwikkelen, aan de hand van tests. Het idee is dat je in een kortcyclisch proces (denk minuten, niet uren) in stap 1 een test toevoegt aan je testset en de tests draait om te controleren dat de nieuwe test faalt; in stap 2 de eenvoudigste code toevoegt die de nieuwe en alle oude tests doet slagen en ten slotte in stap 3 de code netjes maakt die je in stap 2 hebt toegevoegd. Op deze manier ontstaat goed testbare code met een hoge testdekking. Test-driven development zoals door Beck beschreven in (1) richt zich vooral op unittesten.

#### Behavior-driven development

Behavior-driven development is een variant van Test-driven development waarbij de tests geen unittesten zijn maar systeemtesten. Testers schrijven deze tests in een domein-specifiek taal (domain specific language) zoals Gherkin. De testgevallen worden door de testrunner omgezet in geautomatiseerde acties en uitgevoerd in het te testen systeem. Hiervoor is veelal "glue" code nodig die door een programmeur wordt geschreven.

Een voorbeeld van testgevallen geschrven in Gherkin:

```
Feature: report
  Creating, editing, and removing reports

  Background: the user is logged in
    Given a logged-in user

  Scenario: add report
    When the user creates a report
    Then the report title is "New report"

  Scenario: delete report
    Given an existing report
    When the user deletes the report
    Then the report does not exist

  Scenario: copy report
    Given an existing report
    When the user copies the report
    Then the report overview contains 2 reports
```

#### Mutation testing

Mutation test tools draaien je testen herhaald, waarbij ze voor iedere run een kleine wijziging aanbrengen in je code (een "mutant") om te zien of je testen die verandering waarnemen. Hoe meer mutanten niet worden ontdekt, hoe lager de kwaliteit van je testset. En ook, hoe meer tests falen bij één kleine wijziging, hoe fragieler je testset.

### Tools

#### Test runners

Om tests te draaien gebruik je een testrunner. Hiervoor zijn teveel opties om op te noemen, maar denk aan JUnit voor Java unittests, pytest voor Python unittests, en Robot Framework voor component- en systeemtesten.

#### Testcoveragetool

Om testdekking te meten gebruik je een testcoveragetool. Hiervoor zijn teveel opties om op te noemen, maar denk aan JaCoCo voor Java code, coverage.py voor Python code, en Jest voor Javascript code.

#### Mutation testing tools

Voorbeelden van mutation testing tools zijn PIT voor Java en de JVM, Stryker voor Javascript, C# en Scala en mutmut voor Python.

### Gerelateerde richtlijnen

- Integreer de geautomatiseerde testen in de CI-pijplijn en laat falende tests en te lage testdekking de build falen.

### Succescriteria

Wanneer voldoe je aan deze richtlijn?

- Je testen raken een significant deel van de code van je applicatie.
- Je meet de testdekking van alle productiecode.
- Je hebt een minimale norm voor testdekking van regels code en control flow.
- Je testen doen zinvolle checks (asserts) en roepen niet alleen maar functionaliteit aan om zo een hoge dekking te krijgen.
- Kleine wijzigingen aan je applicatie laten een klein deel van de testen falen. Je wilt niet dat het veranderen van bijvoorbeeld het formaat van een attribuut van één entiteit leidt tot het falen van honderden testen.
- Je unittesten zijn échte unittesten en doen geen I/O zodat ze snel zijn. Ook hier is het weer lastig om generiek te definiëren wat significant is, maar denk aan minder dan een minuut. Hoe langer de doorlooptijd van je unittesten, hoe minder bruikbaar ze zijn als directe feedback bij het aanpassen van de software.

Wanneer ben je echt goed bezig?

- Je zet de norm voor testdekking van regels code en control flow op 100% en je configureert je testcoveragetool zodanig dat echt lastig te raken regels code niet worden meegeteld.
- Je meet ook de testdekking van de tests zelf om dode code in tests te ontdekken.
- Je gebruikt mutation testing om de kwaliteit van je testen te meten.
- Je combineert de coverage metingen van verschillende testsoorten in één coveragerapportage zodat je kunt zien of code die niet door de systeemtest wordt geraakt in ieder geval wel door de unittesten wordt geraakt.

## Wanneer is deze richtlijn van toepassing?

Bijna altijd. Er zijn maar weinig uitzonderingen. Een uitzondering zou het ontwikkelen van een prototype kunnen zijn, waarbij de investering in geautomatiseerde testen zich niet terugverdient.

## Bronnen

### Wetten

Geen bekend.

### Beleid

Geen bekend.

### Standaarden

- ISO/IEC/IEEE 29119 Software and systems engineering — Software testing series

### Communities

- [Test automation days](https://www.testautomationdays.com)

### Literatuur

- (1) Test Driven Development: By Example, Kent Beck, 2002.

### Bronnen op developer.overheid.nl

- ?
