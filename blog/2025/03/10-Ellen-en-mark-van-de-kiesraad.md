---
authors: [tom-ootes]
tags: [rust, kiesraad]
draft: true
image: ./img/ellen_mark_landscape.jpg
date: 2025-03-18
---
# Deze goede redenen heeft de Kiesraad om Rust te gebruiken

Toen ik kennis maakte met het project [Abacus](https://github.com/kiesraad/abacus) van De Kiesraad was ik direct nieuwsgierig naar hoe de programmeertaal Rust ze bevalt en waarom het goed werkt voor hun project. Daarom toog ik naar Den Haag, waar De Kiesraad huist, om Mark Janssen en Ellen van Leeuwen van Abacus hier eens over uit te vragen.

![Mark Janssen (links) en Ellen van Leeuwen (rechts)](./img/ellen_mark_landscape.jpg)
*Mark Janssen: Lead Developer (links) en Ellen van Leeuwen: Software Developer (rechts)*

<!-- truncate -->

## Hoe heb jij ooit kennisgemaakt met Rust?
Mark: "In 2021 leerde ik de taal kennen toen ik met een hobbyproject bezig was om mijn slimme meter thuis uit te lezen, ik kende het op zich al langer, uit blogposts en van [hackernews](https://news.ycombinator.com/) bijvoorbeeld maar ik had er nog nooit iets mee gedaan. Dit projectje was een goed excuus om het eens een keer te proberen. Daarna heb ik er ook de [Advent of Code](https://adventofcode.com/) mee gedaan, om er wat dieper in te duiken. Dat bleek wel pittig, om met een nieuwe taal uitdagende puzzels op te lossen dus ik weet niet of ik dit iedereen zou aanraden, maar het was wel heel leuk en zo ben ik het ook meer gaan gebruiken. Uiteindelijk dus ook voor wat grotere projecten, en nu ook dus bij de Kiesraad."

Ellen: "Ik kwam er ooit mee in aanraking tijdens mijn studie. Ik had in 2015 een studiegenoot die tijdens het vak compilerbouw besloot om niet een framework te gebruiken om de compiler te bouwen. Maar om het helemaal from scratch in rust te bouwen. Des tijds dacht ik, bij hem zit een steekje los. Daarna kwam ik er pas weer mee in aanraking bij de kiesraad. 
In mijn vorige baan gebruikten we Python, JavaScript. Maar programmeren in Rust is natuurlijk compleet anders. Omdat ik wel van een uitdaging houd leek het me leuk om iets nieuws te leren. En ik hoorde dat Rust heel nette error logging heeft.
Dat vond ik wel een heel groot pluspunt.

### Rustlings in Rustrover
Tijdens mijn eerste maand ben ik begonnen met de standaard Rust oefenomgeving: [Rustlings](https://blog.jetbrains.com/education/2019/12/19/rustlings-course-adaptation/). Deze kan je helemaal doorlopen in [RustRover](https://www.jetbrains.com/rust/). Zo heb ik langzaamaan meer en meer features van de taal leren kennen. Daarnaast leerde ik natuurlijk veel mijn collega's.

## Over Abacus
[Abacus](https://github.com/kiesraad/abacus) is een applicatie voor het vaststellen van verkiezingsuitslagen. Binnen het proces van de Nederlandse verkiezingsuitslagen is het papieren proces leidend. Dit betekent dat stemmen niet allen op papier gebeurt, maar ook het optellen van de stemmen in het stembureau. Vervolgens worden per gemeente alle optellingen van de stembureaus ingevoerd in Abacus.

### Niet in de cloud maar op lokale computers, compilen naar een executable een voordeel van Rust
Elke gemeente draait zijn eigen instantie van Abacus. Abacus draait dus niet in de cloud. De reden hiervoor is dat we het systeem volledig "air-gapped" willen houden. Alle data blijft dus lokaal. Dat is waar Rust mooi om de hoek kijken. Rust stelt je namelijk in staat code gemakkelijk te compilen naar een native executable voor je operating system (in overheidsland veelal Windows) zonder dat je verdere dependencies nodig hebt. Een bekende onhandige dependency die voor veel legacy software nodig is, is de "Java virtual machine". 

### Stemmen tellen via een lokaal netwerk
Binnen een gemeente heb je tijdens het tellen een aantal laptops of computers waar mensen dan de uitslagen op intypen. Afhankelijk van hoe groot de gemeente is heb je meer of minder computers. Er wordt een lokaal netwerkje opgezet met één server en een aantal invoerstations waar mensen de papieren optelling in over typen. Het handige is dat mensen het eigenhandig kunnen installeren en hebben verder niets nodig behalve de executable die wij ze geven.


![Een plaatje met daarin het logo van Rust met daarnaast de tekst "The Rust Programming Language"](./img/abacus.png)

## Hoe verschilt Rust ten opzichte van andere talen?
Mark: "Ik heb hiervoor heel veel in Go geprogrammeerd en daarvoor veel Java en wat Python. Dit heeft er toe geleid dat ik een voorkeur voor statisch getypeerde talen heb gekregen. Statisch getypeerde talen kunnen je goed helpen omdat ze meer bugs door je compiler afvangen. Java kan dat al best goed. Maar Python is hierin weer helemaal niet strict. In zo'n taal ben je meer afhankelijk van een goede testcoverage om erachter te komen dat je code geen bugs bevat."

### Statische typechecking
Go is ook een taal met statische typechecking, maar toen ik er mee begon was deze nog wat basic. Rust heeft een heel uitgebreid typesystem, veel uitgebreider dan bijvoorbeeld Java.
Een uitgebreid typesystem geeft je de flexibiliteit om dingen door de compiler af te laten vangen waar dat met andere talen echt moeilijker is.


> Een uitgebreid typesystem geeft je de flexibiliteit om dingen door de compiler af te laten vangen waar dat met andere talen echt moeilijker is.
>
> — Mark Janssen, De Kiesraad

### Aan Ellen: welke verschillen zie je ten opzichte van Python?

Ellen: "Rust heeft veen handige concept zoals iterators en dat soort dingen. Ik moest deze concepten dus allemaal leren kennen. Je hebt dus niet alleen maar, for loops en while loops, maar ook andere soorten iterators. Om het goed te leren ga ik vaak met een van de Rust-experts in ons team zitten om naar een Pull Request te kijken en dan mijn code wat meer Rust-achtig te maken. Zodat ik gewoon wat meer de echte native Rust dingen leer en ga gebruiken. 

### De compiler: eerder bugs aan het licht
Een voordeel aan Rust wat mij betreft is dat je compile-time type-errors krijgt. Dit voorkomt bugs en over het algemeen kom je er heel snel achter als er een bug in je code zit. Natuurlijk moet je alles goed afdichten met tests. 

Natuurlijk is het een steilere learning curve om Rust te leren dan meer losely typed programeertalen. Maar na het bijna een jaar te hebben gebruikt kan ik zeggen: het is een fijne taal om mee te werken. Het is gewoon minder bug prone dan andere talen.

![Een plaatje met daarin het logo van Rust met daarnaast de tekst "The Rust Programming Language"](./img/rust.png)

## Jullie zetten de wet direct om in code: is Rust daar specifiek geschikt voor?

Mark: "Ik denk niet dat Rust specifiek extra geschikt is voor deze use-case maar het heeft er wel wat goed eigenschappen voor. Zo is het een expressieve taal waardoor je dingen als de wet wel op een goede manier kan vatten. Ook denk ik dat een goed leesbare taal is dus dat is goed voor de transparantie van de software."

## Is dat iets waar jullie mee bezig zijn; onze code moet transparant zijn voor mensen van buitenaf?
Zeker: we leveren alle features goed gedocumenteerd op en denken goed na over goed opgesplitste, behapbare functies. Wat we heel leuk vinden is dat je dan soms hulp krijgt. Zo hebben we een feature die zorgt voor de zetelverdeling in de tweede kamer. Onze collega's van de [tweede golf](https://tweedegolf.nl/en) (Rust-bureau uit Nijmegen) zijn toen deze feature in gedoken en zo testen ze eigenlijk gewoon gratis onze code. Zulke samenwerkingen zijn heel erg leuk.

## Hoe is julie ervaring met Cargo; de Package Manager van Rust?

Ja, [Cargo](https://github.com/rust-lang/cargo) werkt erg goed. Het feit dat de package manager wordt meegeleverd met de taal heeft veel voordelen. Het is fijn dat het team achter de programmeertaal één officiële packagemanager aanbiedt, zo concentreren zich alle open source bijdrages ook in één package-manager. 

Cargo ondersteunt het pinnen van dependencies. Hierbij wordt er ook een hash is gegenereerd die garandeert dat als je de dependencies opnieuw installeert, je dezelfde dependency binnenhaalt die je hebt vastgezet. Deze hashes worden 


[19:24–19:37] In het ecosystem zijn er ook heel veel best wel volwassen libraries, bijvoorbeeld onze HTTP library of onze HTTP framework eigenlijk moet je het zeggen, dat is heel volwassen.
[19:38–19:56] En we hebben heel veel mooie andere libraries zoals typst voor het maken van pdf-bestanden. Een soort van alternatief voor later. Dat is ook in rust geschreven. Dat gebruiken we om pdf-bestanden te maken. Uitslagen van de gemeente
[19:56–20:17] worden dan als pdf-bestand ook beschikbaar gemaakt. Dat rinderen we daarmee. Dat is heel fijn. Rust is volgens mij in 2012 voor de eerste uitgekomen.
[20:22–20:40] Als je het over XML hebt, daar is bijvoorbeeld nog best wel een beetje een gat in de beschikbare libraries. En we hebben XML nodig omdat de Lexa Markup Language, De Nederlandse standaard voor het publiceren van verkiezingsuitslagen.
[20:43–21:04] En voor het uitzustelen van verkiezingsgegevens. Dat is een XML-formaat. En daar merk je dat de library die er is, die voldoet. Maar het is minder volwassen en minder uitgebreid dan wat je in andere talen vindt. Dus een taal als Java of als.NET. Die helemaal in die XML-boom zijn ontwikkeld. Ja, precies. Hele andere tijd. Daar is dat super uitgebreid. Het, helemaal in de taal ingebakken.
[21:05–21:19] Helemaal, ja weet je, dat zijn misschien zelfs wel de referentie implementaties van sommige XML stukken van een XSD bijvoorbeeld. Ja, dat heb je in Rust niet en dat is dus veel minder volwassen. Ja, heb je toen ook wel dingen terug
[21:19–21:35] gecontribueerd of? Hebben we nog niet nodig gehad. Het zijn ook wel dingen dat je dan, dat het echt veel werk is om te maken. Dus ik snap heel goed dat mensen dat nog niet gedaan hebben. Het was volwassen genoeg dat we niet
[21:35–21:52] tegen bugs aan liepen. Waar bijvoorbeeld gewoon code generation vanuit een schema dat bestond niet eigenlijk, bestaat niet echt. Dus dat gebruiken we dan niet. Het is dan meer handwerk om dat bij elkaar te zoeken. Hoe bedoel je dan die code generation vanuit de schema?
[21:52–22:09] als je een xml schema hebt kan je in bijvoorbeeld in java kan je java klassen helemaal genereren vanuit die xml schema's nou ja dat is hoe iedereen dat gebruikt ja en ook hoe die hoe die standaard is opgebouwd is niet is niet
[22:09–22:22] echt ontworpen om zeg maar als mens zeg maar lekker een barstertje voor te schrijven, want het is van heel groot en uitgebreid. Dus ja, je wil het liefst dat genereren, maar uiteindelijk, omdat die generators niet bestaan,
[22:23–22:37] zijn we het met de hand aan het doen. En dat is wel iets meer werk, maar ik denk wel minder werk dan een parser schrijven, die dan generiek werkt voor een enorme standaard die een XML schema is. Ja, dat wordt dan een beetje zo'n bizarre sidequest, lijkt me niet.
[22:37–22:49] Ja, het is een beetje alsof je je eigen compiler gaat schrijven door uit te spreken, omdat je je eigen dialect van een bepaalde taal wilt schrijven. Zo groot zijn we helaas ook weer niet. Of nou, laten we helaas maar weg.
[22:49–23:03] Zo groot zijn we niet. We hebben niet de luxe om al dat soort sidequests er maar uit te lopen. Nee, maar wel een interessante match met een project die inderdaad dan te maken heeft met een kiesraad die van oudsher iets met XML doet.
[23:03–23:17] Iets wat al lang loopt. Dat is wel logisch dat je daar dan tegenaan loopt. Ja, kijken. Ja, dan kunnen we denk ik door naar de volgende. Dus wat voor projecten zouden jullie ook
[23:17–23:37] wat voor projecten zouden jullie aanraden om ook over te gaan op rust? Dus wat voor profiel zou je dan Ik denk sowieso projecten waar iets als portability of waar je iets embedded wil doen of iets
[23:37–23:56] wat portable moet zijn of als je iets op een mobiel of meerdere OS'en wil kunnen draaien bijvoorbeeld dan is Rust heel geschikt. Daar is het denk ik een soort heel erg afhangt van, heb je mensen met ervaring, heb je mensen
[23:57–24:14] die het leuk vinden, wat voor match is er? En tegelijkertijd ook gewoon, zijn er daadwerkelijk wel libraries voor alles wat je gaat doen? Moet je bijvoorbeeld integreren in een XML heavy ecosysteem, moet je allemaal soap calls
[24:14–24:30] gaan doen? Misschien is het dan niet de beste keuze, want daar zijn libraries gewoon wat minder volwassen voor. Voor andere projecten is het juist wel weer heel fijn en heb je wel goede libraries die heel volwassen zijn.
[24:33–24:49] Nee, dat is een heel duidelijk profiel van de taal, dat HTP vast heel goed werkt, maar zo'n paar dingen niet, want het is gewoon een jonge taal. eigenlijk ook vast de voor het ecosysteem jonger en wat minder
[24:49–25:05] daar toch iets minder enterprise zeg maar dus al die soort standaarden die alleen maar in de grote enterprise gebruikt worden tegenwoordig zoals een zoop ja überhaupt dingen met xml is wat meer dan binnen de overheid denk ik wel reëel heel veel organisatie ja denk dat
[25:05–25:19] je dat je daar wel een casus te pakken het als je de heel veel van dat soort werk aan doen bent dat moet je misschien even twee keer nadenken voordat je rust gaat gebruiken. Voor heel andere dingen is het juist een heel fijne taal en is het heel fijn om te gebruiken
[25:19–25:36] en heel productief. Ja, weet je, je zei ook inderdaad, je noemde al het eerste punt van iets wat portable moet zijn en je zei ook ik ben het in de embedded wereld tegengekomen. Is het dan ook heel goed in die systeem-schililachtige dingen
[25:39–25:52] dus systeem API het kan heel low level je kan het echt gebruiken als alternatief voor C om heel low level te programmeren tot en met een hele krappe microcontroller waar je weinig geheugen hebt
[25:52–26:03] dat kan je ook gewoon rustig gebruiken maar je kan het ook gebruiken voor een grotere applicatie die web API gebaseerd werkt.
[26:04–26:19] Meer koppelingen heeft. Het schaalt wel van heel klein tot best groot. Het is niet dat het alleen maar in die systeemprogrammeer hoek zit, of system programming om het in het Engels te zeggen.
[26:19–26:32] Maar je merkt wel dat daar heel veel gebruik op zit, dat het toch in die hoek dat daar de het ecosysteem zich wat meer op focust. Ik vind dat totaal als geheel dat niet beperkt is tot die hoek.
[26:35–26:48] En je hebt heel veel gebruik eromheen, waar mensen ook UI-complete koeiapplicaties maken in Rust en zo. Dus mensen doen het wel normaal, maar dat is minder volwassen. Ja, maar daar dacht ik ook aan. Je hebt heel veel die elektron-apps en zo.
[26:49–27:02] Ja, je hebt mensen die ook daar, die dat in Rust bouwen. Je hebt Z bijvoorbeeld, ZED, dat is een editor die in Rust gemaakt is. Die doen volgens mij ook gewoon hun eigen UI-rendering enzo in Rust.
[27:03–27:24] En dat is dan heel snel, dus dat is een groot voordeel. Ja. Dus het is zeker heel versatile. Maar wat ik zeg, je zal denk ik in het ecosysteem bepaalde gaten zien als je niches hebt waar het ecosysteem het minder op aansluit.

# Wat voor IDE en  gebruiken jullie er nu omheen? Leuk, misschien jij eerst? Ik gebruik Rust Rover, dus dat is van JetBrains. Dus echt een Rust dedicated IDE. Maar die ook

[27:46–27:54] Ik gebruik Rust Rover, dus dat is van JetBrains. Dus echt een Rust dedicated IDE. Maar die ook
[27:54–28:06] wel TypeScript ondersteunt. Gelukkig. Dus je kan gewoon alles in één IDE programmeren. En zoals ik al zei, daar zit dus die tutorial inge... tutorial, ja die
[28:06–28:17] Rust link zit daar ingebakken. Dus dat is echt heel maakt het relatief laagdrempelig om te beginnen ja is alle dan heb je gewoon al documentatie alles eromheen heb je in je IDI zit was ik het zou moeten switchen
[28:17–28:30] tussen de web page met documentatie en dan de uitleggen en je leert je IDI gebruiken precies dat is wel slecht ja direct in die dingetjes die je leert je shortcuts enzo want hoe was dat rust links is dat
[28:30–28:47] vond je dat leuk of hoe zag dat er uit ja Ja, nou, dat is al even geleden. Volgens mij vond ik het wel leuk om te doen. Ik heb er denk ik twee weken een beetje, ja redelijk, nee niet redelijk fulltime, vier dagen in de week, maar aan besteed. Het was volgens mij ongeveer klaar. En ja, als ik me even terugdenk,
[28:47–29:01] dan vond ik het volgens mij wel leuk om te doen. En is dat wel een goede intro. Je hebt natuurlijk lang nog niet alles behandeld, maar goed, daar kom je gaandeweg wel achter wat er nog aan, dat is die functionele componenten enzo, wat je daarmee
[29:02–29:18] nog wat meer kan leren. Dus ja, dus ja, Rustover vind ik zelf top. Wordt ook heel actief geüpdate en dat soort dingen. Werkt gewoon goed. Ja, cool. Ja, die heb ik. En qua tooling,
[29:18–29:31] hebben jullie dan, ja ik kom zelf een beetje uit Python en JavaScript wereld, dus dan heb je een linter en die ga je dan eenmaal instellen met z'n allen. Ja. In Rust heb je ook een linter ingebouwd.
[29:33–29:47] Die heet Clippy. Naar de assistant van Word, zeg maar. Die kan je ook, zeg maar, even pedantisch instellen dat die, zeg maar, gaat klagen over allemaal dingen die je doet. Is er ook zo'n icoontje die dan...
[29:47–30:01] Nee, dat niet. Wel netjes in je terminal. Je hebt op deze regel, misschien wil je dit doen. Dus ook echt suggesties van hoe je dingen beter kan doen. Dat is zo handig oprecht. Dat is echt wel een van de grote voordelen van Rust.
[30:01–30:19] Dat het hele goede suggestieve error messages en linter messages heeft. Ja, precies. Ik ben het mee eens inderdaad. Het is een heel vriendelijke taal. Veel vriendelijker dan, als je embedded ofzo doet, C, dan ja, dat blerf er op, byte 100,
[30:19–30:32] ziet er maar uit. Ja, nou ja, JavaScript is ook... Het kan soms ook wel. Het kan soms echt drama zijn om JavaScript op te vinden, maar ik regel die nou eigenlijk bedoeld. Ja, en in Rust is dat echt,
[30:32–30:44] echt veel beter. Dus dat is wel, dat maakt het voor mij ook wel, ik denk van ja ik ga toch wel voor deze stap. Ik had ook weer gewoon een Python baan kunnen zoeken. Maar ik dacht van nee laten we gewoon voor iets heel anders gaan.
[30:44–30:56] En dit is dan wel een van de voordelen ervan van het heeft wel een aardige learning curve, maar je wordt ook een beetje geholpen. Dat is ook misschien precies. Ja, dus het is niet dat je echt, ik wil altijd zeggen een jaar bezig bent om te leren. 
[30:56–31:12] Weet je, ik kan nu wel zeggen ik weet redelijk wat ik aan het doen ben. En na minder dan een jaar. Dus. Oh ja. ben en na minder dan een jaar. Het kan altijd beter, ik bedoel ik leer nog steeds. Dat heeft iedereen denk ik. Ja, ik ben eigenlijk volledig
[31:14–31:31] gesponsord voor die zetelverdeling. Dat is een aardig project, laat ik het zo zeggen. Gelukkig met veel hulp, maar dat maakt het ook wel meteen uitdagend om te doen. Mijn eerste rust, verantwoordelijkheid was de validatie regels implementeren.
[31:31–31:44] Dat is ook wel een hele goeie om meteen rust te leren. Want ja, dat leer je meteen wel omgaan met wat we allemaal aan input gebouwd hadden en hoe je dat dan checkt of dat ook echt is zoals we dat willen.[31:44–31:52] Zoals het zou moeten zijn eigenlijk. Dus dat was wel heel leuk om intro into rust te doen. 

## Clippy: een behulpzame linter
[31:52–32:01] Verder qua tooling, rust specifiek niet zo veel denk ik. We gebruiken GitHub en GitHub
[32:04–32:17] Action. GitHub for Issues en voor project management en code hosting en GitHub Action for CI en daar doen we natuurlijk ook de blinting en dat soort dingen, compileren, testen, etcetera.
[32:18–32:29] We hebben voor de frontend natuurlijk allemaal tooling, maar ik weet niet of je daar ook op in wilt gaan. Nee, dat is ook van mij. Dan gaan we het helemaal onthetable bespreken. Ja, precies. Dat is de scope. Ik denk dat er dan een interview om te lezen.
[32:29–32:41] Dit, dit, dit. En ik kwam net op Clippy en ik merkte ook van dit is echt de sweet spot van dit willen mensen weten. Blijkbaar is er ook, krijg je ook suggesties, dus niet alleen maar AdWords, maar ook zo van
[32:41–32:53] je hebt dit gedaan. Maar zou je het niet op die manier doen? Dus je wordt echt wel een beetje opgevoed. Zoals ik het zo hoor. Dat klinkt heel top. Ook omdat we blijven leren.
[32:53–33:06] Dat zie ik als een groot voordeel. Clippy is trouwens ook ingebouwd in Rustrover. Dus tijdens het coden krijg je al underlines. Dan hover je erover heen.
[33:06–33:19] Je kan het ook automatisch laten fixen. Of in ieder geval gaat hij dan zeggen, dit klopt niet. Dus voordat je zelfs maar clippy handmatig gaat runnen, geeft hij over het algemeen al weer waar je dingen fout hebt, waarschijnlijk fout hebt. Dat maakt het heel veel makkelijker.
[33:19–33:32] Je hebt ook een beetje, er zit ook al wat autocomplete en dat soort dingen ingebouwd om, dus tijdens het code is dat gewoon echt ideaal. Ja, ja. We moeten even kijken of jullie niet allemaal reclame voor rest erover hebben.
[33:32–33:43] Ik weet niet of het, nee maar het is natuurlijk gewoon de praktijk hier. Ik kan het wat korter, je hoeft het niet zo uitgebreid op te zetten. Het is in ieder geval gratis, dat wel. Lustrover is voor nu nog gratis. Ja, voor non-commercial. Ja, nou ja.

## Cargo Test Framework
[33:43–34:05] Maar ik denk dat de meeste IDEs of andere dingen... Nog even naar tooling. Cargo test framework wordt gebruikt, is ook Cargo Test. Dus dat is ook ingebouwd in de taal, waar je bij andere talen nog wel JUnit of PyTest ofzo nodig hebt, is dat ook in Rust ingebouwd of meegeleverd.
[34:05–34:18] Met cargo, dus dat is dan wel de project management tool die bij Rust wordt. Ja, en hoe bevalt dat? Het heet cargo test?
[34:18–34:36] Cargo test, ja. Werkt goed denk ik. Ik zou het klar. Ja. Het gaat prima. Ja. Het voordeel is dat iedereen dat dan ook eigenlijk wel gebruikt. Ja. Dus het is te standaard. Je hoeft niet
[34:38–34:51] keuze bij mij. Ja, je hebt ook niet dat hele community zo vier projecten allemaal aan het contribueren. Nee, precies. Iedereen gebruikt dit. Er zijn wel een paar crates, geloof ik.
[34:51–35:03] Ja, je hebt andere runners die dan, we gebruiken ook Next Test, die dan XML rapportjes kan maken die in onze Code Coverage Tool komen. Dat soort dingen heb je dan wel weer.
[35:03–35:15] Maar de tests zelf zijn hetzelfde, dus dat scheelt dan. Waarbij dat in andere talen soms, weet je, dan heb je tests en die schrijven dan voor PyTest en dan werkt het niet echt met iets anders.
[35:16–35:30] Ja, PyTest is een library en dan weet je te standen echt wel of het is in Python. En niet Unitest. Zijn trouwens de van Tweede Golf, gebruiken zij ook allemaal Rust over of gebruiken ze een andere IDE? Nee, ze gebruiken... VSCode misschien?

## Vscode & Rust-analyzer
[35:31–35:48] VSCode met Rust extension. Ah ja. Wat is het? Rust Analyzer denk ik. Heet die zo? Even kijken. Ja, Rustanalyzer denk ik wat heet die zo rustanalyzer en andere mensen gebruiken vim met rustanalyzer
[35:48–36:00] maar rustanalyzer is inderdaad dus een plugin plugin voor VS Code maar ook de language server dus die kun je ook met vim gebruiken
[36:00–36:11] de extensie heet zo maar de language server ook ja dus die werkt, zeg maar, cross editor. En dat zou je ook, dat is ook gewoon een goede aanbeveling qua, ja, kan ik ook gewoon bijzetten
[36:11–36:24] in het interview van, ja, dat ik mensen een beetje kunnen kieken. Verschillende opties, ja. Ja, ik gebruik ook VS Code, dus het is makkelijk om even dat te installeren en dan. Ja, dus dan is Rust Analyzer de plugin en dan krijg je eigenlijk heel veel van die soort
[36:24–36:36] dingen die je in Rust Drawer heeft, krijg je ook. Ja. En al die hints en types, code completion, renaming, refactoring, dingetjes die je kan

# ZED
[36:36–36:36] 
[36:37–36:50] doen, die zitten er ook allemaal in. Ja. Wat het heel erg nieuwsvol maakt, ja. Ja. Nice. Ja, je hebt nog Zed als andere editor die ook open source, die in Rust gebouwd is.
[36:50–37:04] Oh ja. Zed zijn er? Ja, Zed. Dat is best een coole editor. ZED zei je? Ja, ZED. Dat is best een coole editor. Volop in ontwikkeling. Wel al echt in productie of nog een beetje beta?
[37:05–37:17] Waarschijnlijk een soort eternal beta. Eternal beta. Voorlopig weet je wel. Ze zijn heel hard aan het ontwikkelen. Ik weet niet welke versie het ondersteunen. Ik heb best wel...
[37:17–37:34] Geen 1.0. Nee, oké. Geen 1.0, dus ik denk dat je het dan... Het staat geen beta, maar het is ook geen 1.0. Maar ja, goede inzichten wel over de taal en over het project. Dus dat is heel fijn.
[37:34–37:56] Ik ga denk ik... Ja, ik denk dat we er wel... Of hebben jullie nog dingen dat jullie denken, dit is wel leuk om ook nog te vertellen? Nee, ik denk dat je het meeste wel benoemd hebt. Ja. Of het voorbijgekomen is. We moeten nog een foto maken in de zomerzaal. Want we zijn ook al een beetje aan het einde van ons uur.
[37:56–38:10] En ik had met liefde nog langer gesproken, maar ik heb gewoon zo weer een meet-up. Ja, en misschien ook, want wij hebben ook die meet-ups. Dus ik zal jullie daar ook voor blijven uitnodigen. Dat is in Utrecht en dat is vrij toegankelijk.
[38:10–38:21] Dus als je ook met je team daar wil zitten, zeg dan we gaan even een keer met de kiesgaard daar met de kus aan. Ja, dat kan wel leuk zijn om een keertje te doen. Ja, toevallig zijn er twee van onze teamleden die wonen in Utrecht. Dus
[38:21–38:34] voor hen is het helemaal... Ja, en ook als je in Nijmegen woont, is Utrecht een stuk dichterbij dan Den Haag, inderdaad. Dus ik ben van de collega's die uit Nijmegen komen, want de Tweede Golf zit daar. Ja. Nijmegen in de omgeving
[38:34–38:41] moet ik zeggen. Maar laten we inderdaad even een foto maken. Ja, tof. Dan... Maar laten we in dat even foto maken. Ja, tof. Dan...


## Conclusie
- ✅ Rust geeft de mogelijkheid om makkelijk executables (.exe etc.) to compilen zonder andere dependencies
- ✅ Rust heeft een uitgebreid typesystem waardoor het errors vroegtijdig door de compiler worden afgevangen

## Verder lezen
- [Onderbouwing van De Kiesraad voor keuze van Rust](https://github.com/kiesraad/abacus/blob/main/documentatie/softwarearchitectuur/overwegingen-talen-en-frameworks.md#gemaakte-keuze-backend-rust)
- [Github van de Kiesraad](https://github.com/kiesraad/)