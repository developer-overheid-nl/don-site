---
authors: [tim-van-der-lippe]
tags: [npm, javascript, nodejs, node_modules, techdebt]
draft: true
---
# Overweeg om `node_modules` in git repositories te zetten

In de meeste projecten is dit de perceptie: `node_modules` worden door package managers geinstalleerd en zijn dus geen source code die in een git repository thuis hoort.
Deze blog post probeert je aan het denken te zetten.
Niet om je te overtuigen dat het altijd een goed idee is om `node_modules` in git repositories te zetten, maar om te realiseren dat in sommige projecten het verstandig kan zijn.

<!-- truncate -->

:::success[**TL;DR**]

`node_modules` worden onbewust groot, met Gigabytes aan disk usage tot gevolg.
Grote projecten checken `node_modules` in hun git om continue te monitoren van de gevolgen van upgrades.
Met continue opschoonacties is het doenlijk om deze stap te nemen, wat voor langdurige (publieke) projecten erg waardevol is.

:::


## Wat zijn `node_modules`?

Voor degenen die geen frontend software development hebben gedaan, `node_modules` is een folder die JavaScript packages bevat die door andere developers in de [NPM registry](https://www.npmjs.com/) zijn gezet.

Er zijn heel veel packages op de NPM registry met een groot scala aan functionaliteit en diepgang.

Dit is inherent aan de JavaScript community, waar de programmeertaal van nature weinig "out-of-the-box" aanleverde.
Er is actief gepromoot om kleine packages te publiceren die een oplossing bieden voor een specifiek probleem.
Het heeft namelijk waarde als ieder package 1 specifiek probleem oplost en zich daar op focust.

Over tijd zagen we een trend: de `node_modules` folder in een regulier frontend project kan groot worden als gevolg van een gigantische dependency tree.
Dit omdat er vaak lagen op lagen van dependencies worden gebruikt om zo tot een groter geheel te komen.
Het is daarom gebruikelijk om Gigabytes aan disk space kwijt te zijn aan de `node_modules` van alle projecten waar je aan werkt.
Hier zijn al vaker memes van gemaakt, dus deze blog post zal over deze trend niet verder uitwijden.

![](https://i.redd.it/tfugj4n3l6ez.png)

*Meme van de grootte van een `node_modules` folder. Source: /r/programmerhumor on Reddit*

## Een groot aantal dependencies resulteert in complexiteit

Als we naar aspecten als security en dependency management kijken, dan zijn dat grote opgaven voor frontend projecten.

De hoeveelheid transitive dependencies die (al dan niet onbewust) in een software applicatie terecht komen is dusdanig groot, dat analyse van al die packages lastig is.

:::note

Een transitive dependency is een dependency van een dependency (recursief gedefinieerd).
Dit zijn dus alle dependencies die je in een project niet direct hebt gespecificeerd, maar die wel nodig zijn voor het geheel.

:::

Tegelijkertijd is de kans op "dependency rot" ook groter naarmate meer dependencies worden meegenomen.
De kans dat 1 van alle packages in een `node_modules` in het afgelopen jaar niets aan is veranderd is groot.
Dit zorgt ervoor dat als er een transitive dependency in een stilstaande dependency zit, en deze package niet wordt geupdate, het ook in alle `node_modules` van de afnemers zit.

Het is lastig om dit overzichtelijk te houden, wat in de praktijk resulteert in het vergeten of actief ontwijken van het updaten van problematische dependencies.

En dat is ook menselijk, want het kost simpelweg veel tijd en energie om hier constant bovenop te zitten.
Als de problemen dan een dermate grootte hebben dat het niet bij te benen is, dan haakt men af.
Dit zorgt dus inherent voor dat er meer stilstaande packages komen en het probleem verergert.

## Stilstand en tech debt

Deze stilstaande packages en resulterende tech debt zullen in elk project voorkomen, daar is ook niet per se iets verkeerds aan.
Er moeten prioriteiten worden gesteld en met een naderende deadline zullen er scherpe keuzes worden gemaakt.
Ik verwacht dan ook niet dat het schoonhouden van een dependency tree hoog op het prioriteitenlijstje zal staan.

Hier is wel een verschil in hoe in een private context en in de publieke sector mee om wordt gegaan.
Waar in een private context er gekeken wordt of een product nog levensvatbaar is, heeft een publieke sector projecten die een stuk langer lopen uit (wettelijke) noodzaak.
Als er een paar jaar later er dan vulnerabilities ergens in een transitive dependency tree zitten, kan dat lastiger worden voor deze langlopende projecten.
Daarom is het uitermate belangrijk om kritisch te kijken naar all dependencies in een langlopend project.

## Inzicht in `node_modules`

Tot nu toe hebben we het veel gehad over `node_modules` en de problemen, maar nog niks over waarom het dan in een git repository zou moeten worden gezet.

Het is geen doel op zich om het in een git repository te zetten, maar op basis van mijn eigen ervaring is het wel de makkelijkste manier om inzicht te verkrijgen.
Vaak is het probleem wel bekend bij developers, maar het moment dat er een `git add node_modules/` wordt gedaan zien developers pas echt hoe groot de schade is.

Dit heb ik zelf meegemaakt in enkele grote projecten, voornamelijk ook monorepositories waar er veel code bij elkaar op 1 plek staat.
Hierdoor is de kans op opeenhoping groot.
(Zelf ben ik een groot voorstander van monorepositories voor het overzicht, maar moet men zich wel bewust zijn van dit soort nadelen)

Zodra er een overzicht van de `node_modules/` is, worden vaak direct verbeteringen gespot.
Zaken als "we hebben 3 verschillende patch versions van dezelfde dependency" of "waarom trekt deze 1 package die we maar voor 1 regel code gebruiken er 500 extra mee".
Hierbij zijn commando's als `du -sh node_modules/* | sort -h` en `npm list <package>` cruciaal.
Het eerste commando geeft inzicht in welke folders de grootste zijn, de tweede de reden dat die package in de tree zit.
Vaak is het zo dat het grootste package niet een direct dependency is, maar ergens via-via binnen sluipt.

## Eenmalig versus continue audits

Deze schoonmaakacties zijn nodig, maar zijn vaak ook eenmalig.
Misschien denk je bij het lezen van deze post wel "Hm, laat ik dat eens even checken" en kan je mooie winst behalen.
Dat is uiteraard mooi (heel fijn zelfs!), maar in de toekomst is de kans dan groot dat het toch weer verslechtert en je terug bij af bent.

Hierom is continue monitoring vereist.
In alle pogingen die ik in mijn loopbaan heb gezien om deze monitoring tot stand te laten komen is er maar 1 die ik op de langetermijn succesvol heb zien verlopen: in je git zetten.
Git maakt het namelijk direct inzichtelijk, op het moment dat het verergert.
Het is regelmatig voorgekomen dat er een dependency versie werd opgehoogd, maar dat er onverwacht een grote hoeveelheid duplicatie tot stand kwam.
Dit omdat package management algoritmes niet simpel zijn en alle ins-en-outs weten hoe tot een optimale dependency tree te komen erg lastig is.

De waarde zit dus in het onverwachte: dat een package bump (of toevoeging) een onverwacht grote impact heeft.
Door dit direct inzichtelijk te maken kan er ook direct ingegrepen worden.
Het is dan oke om te zeggen "hm, laten we deze upgrade doen nadat we onze dependencies hebben opgeruimd".
(Uiteraard met uitzondering van urgente bumps vanwege vulnerabilities.)

## Chrome DevTools en zijn `node_modules`

Zelf heb ik aan [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) gewerkt, een van de grootste JavaScript applicaties in de wereld.
Naast dat het een van de grootste is, is het ook een langlopend project.
Het bestaat sinds 2008 en bevat nog steeds code geschreven in die tijd.
Hoewel het uit de private sector komt, heeft het wel met de problematiek te maken waar langdurige en waardevolle projecten tegen aan lopen.

Let wel: de versie van DevTools vandaag verschilt op grote lijnen weinig met de architectuur van de versie uit 2008.
Er zijn uiteraard veel verbeteringen en iteraties op het product gedaan, maar is er nooit een DevTools 2.0 geschreven.
Dat komt grotendeels omdat Chromium dat ook nooit heeft gehad.
Grote delen van de browser zijn stuk voor stuk herschreven, maar er heeft nooit een complete rewrite plaatsgevonden.

De `node_modules` van DevTools staan in git: [devtools-frontend/node_modules](https://github.com/ChromeDevTools/devtools-frontend/tree/d07984fe8ccf1d14a287af2776ed7395436ebf96/node_modules).
Ik raad ook zeker aan om de history van deze folder te bekijken en hoe er mee om wordt gegaan.
Toen ik aan het product werkte deed ik ongeveer een keer per maand een dependency bump van packages en nog steeds is dat (grotendeels) de gang van zaken.


Het toevoegen van de `node_modules` gaf ons direct inzicht in problematische packages en ik heb toen zelf met de open source community samengewerkt om packages kleiner te maken.

## Het verkleinen van ESLint

Op basis van analyse van DevTools opende ik een issue op de ESLint repository: [Reduce disk churn for ESLint upgrades](https://github.com/eslint/eslint/issues/14098).
Zoals je kan lezen is dit een uitgebreide analyse van dependencies geworden, ook al waren de initiele reacties terughoudend.
Dit had wel degelijk impact op andere afnemers, naast DevTools.
NodeJS checkt ook zelf `node_modules` in git en bij de ESLint upgrade werd deze significant kleiner: [Removing Lodash from ESLint removed 44k lines in NodeJS](https://github.com/nodejs/node/pull/38764).

Er was ook langdurige impact op de architectuur van ESLint.
In een nieuwe major version besloten de ESLint maintainers om verscheidene formatters in aparte NPM packages te stoppen: [Remove all formatters except stylish, html, json, and json-with-meta](https://github.com/eslint/eslint/issues/17524).
Deze formatters trokken namelijk onbewust veel dependencies met zich mee, waardoor ESLint een "knoop" in de dependency tree werd.

Dit is een voorbeeld van de "continue opschoning" waar ik het eerder over had.
We hebben ervoor gezorgd dat het niet bij een eenmalige schoonmaak bleef, maar een continue proces die zelfs tot architecturele verbeteringen leidde.

## "Mijn node_modules zijn te groot om in git te zetten"

Hoewel inzicht belangrijk is, moet het wel doenlijk zijn.
Als ik deze gedachtegang uitleg aan anderen, dan is de eerste reactie "interessant idee, maar dat gaat niet werken voor die van ons, want die is al zo groot".
In de praktijk klopt dat vaak, ze zijn ook erg groot en dat kan ik niet ontkennen.
Het is daarom ook een gewetensvraag: hoe groot moet het dan zijn voordat je het wel aandurft.

Vaak is het starten met analyseren het belangrijkste: run `du -sh node_modules/* | sort -h` plus `npm list <package>` en bekijk de huidige status.
Deze stappen geven de eerste concrete resultaten, waardoor je beter weet hoe je verder kan doorpakken.
Als je dit vaker aanpakt, dan zal je op een gegeven moment concluderen dat het doenlijk is.
Dit kan als het enkele honderden Megabytes is, git vindt dat geen probleem.

## Conclusie

Zorg er dan voor dat je frequent (ik raad maandelijks aan), packages up-to-date houdt.
Voor langdurige projecten is het nieuwste van het nieuwste namelijk niet altijd nodig en in mijn ervaring is maandelijks een goede termijn om het bij te benen.

Zie je bij een van die maandelijkse acties onverwacht grote impact?
Mooi, dan kan je gelijk ingrijpen.

<!-- 
@ LINKEDIN

Tag je collega die de hele tijd nieuwe deps toevoegt -->

