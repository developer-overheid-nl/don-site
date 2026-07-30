---
description: "Spectral ligt onder vuur na jaren achterstallig onderhoud en een supply chain-incident in een dependency. Waarom we niet halsoverkop overstappen, en wat we wel doen."
authors: [dimitri-van-hees, joost-farla]
tags:
  - adr
  - oas
  - npm
  - informatiebeveiliging
  - open-source
  - standaarden
---

# Spectral onder vuur: waar wij staan

Spectral is een open source linter waarmee je regels voor API-documentatie
vastlegt in een ruleset en die vervolgens automatisch controleert. Die tool ligt
onder vuur. Er staan honderden issues en pull requests open, de VS Code-plugin
loopt achter, en half juli kwam daar een supply chain-incident in een van de
dependencies bovenop. Dat laatste was voor veel mensen de druppel. Omdat onze
eigen tooling op Spectral draait en de API Design Rules ermee beschreven zijn,
uitten veel mensen daar terecht hun zorgen over. Ons antwoord: we slopen
Spectral er niet halsoverkop uit, want er zit juist beweging in de richting die
we toch al op wilden. Hieronder leggen we uit waar we staan en wat we doen.

<!-- truncate -->

## Wat er is gebeurd

Op 14 juli werden twee kwaadaardige versies van `@asyncapi/specs` naar npm
gepubliceerd, via een gecompromitteerde branch in de repository van AsyncAPI. De
`latest`-tag wees korte tijd naar de besmette versie. De payload startte bij het
inladen van de package een achtergrondproces dat een remote access tool
downloadde, die vervolgens onder meer opgeslagen browserwachtwoorden, SSH-keys,
`GITHUB_TOKEN`, `NPM_TOKEN` en AWS-credentials wegsluisde. De details staan in
[issue 656 van asyncapi/spec-json-schemas](https://github.com/asyncapi/spec-json-schemas/issues/656).

Waarom dat ons raakt: `@stoplight/spectral-rulesets` heeft `@asyncapi/specs` als
dependency, met een caret-range. Wie in dat tijdvenster een schone install deed
van Spectral, haalde de besmette versie binnen. Onze eigen tooling gebruikt
Spectral onder de motorkap en de
[API Design Rules](/kennisbank/api-ontwikkeling/standaarden/api-design-rules)
zijn met een Spectral ruleset beschreven.

Eerst het goede nieuws. De aanval was niet gericht op Spectral en Stoplight is
hier net zo goed slachtoffer als iedereen verderop in de keten. De kwaadaardige
versies zijn inmiddels van npm verwijderd en `latest` wijst weer naar de laatste
schone versie. Een verse install van vandaag is veilig.

## De druppel, niet het begin

Het incident zelf is dus opgeruimd. De reactie erop niet. Op de
Spectral-repository is op 14 juli een issue geopend met de melding dat Spectral
gecompromitteerde dependencies binnenhaalde, en dat issue staat er twee weken
later nog steeds, onbeantwoord, terwijl er in de tussentijd wel een release is
gedaan. Bij een supply chain-incident is de snelheid waarmee een maintainer
reageert belangrijker dan de vraag of het incident zijn schuld was.

Dat past in een beeld dat al langer zichtbaar is. Kin Lane, die al jaren als de
_API Evangelist_ over dit vakgebied schrijft, onderbouwt het met cijfers in
[de blogpost waarin hij bekendmaakt dat hij Spectral heeft geforkt](https://apievangelist.com/2026/07/29/i-am-forking-spectral/):
241 openstaande issues, een terugval van 93 procent in het aantal gesloten
issues ten opzichte van de piek in 2021, en een oudste openstaande pull request
van vijf jaar geleden. Daar komt bij dat de VS Code-plugin al ruim een jaar niet
is bijgewerkt, en dat er install-time telemetrie in zit die weliswaar netjes
gedocumenteerd is en uit te zetten, maar die je in een overheids-CI liever
bewust dan per ongeluk aan hebt staan.

Wij lopen daar zelf ook tegenaan. Een goed voorbeeld is de `or`-functie in de
ADR-ruleset,
[waarover in november een vraag binnenkwam](https://github.com/developer-overheid-nl/don-site/issues/526).
Die ruleset gebruikt `function: or`, en dat is een ingebouwde functie die in
april 2025 aan Spectral is toegevoegd. De CLI kent hem en doet netjes wat er
staat. De VS Code-plugin draait op een Spectral-build van daarvoor en meldt dat
de functie niet bestaat. Dezelfde ruleset, dezelfde API, twee verschillende
uitkomsten. De melder was een paar uur kwijt aan het zoeken naar een fout die
niet in zijn API zat en ook niet in de ADR.

Het probleem is dus niet de regel. Het probleem is dat nergens is vastgelegd
welke functies bij welke versie van het rulesetformaat horen. Het formaat heeft
geen eigen versienummer: het is in de praktijk "wat de linter die je toevallig
draait accepteert". Voor één tool valt daarmee te leven. Voor een standaard op
de pas-toe-of-leg-uit-lijst, die door tientallen organisaties in verschillende
omgevingen wordt gedraaid, niet.

## Er zit beweging in

Dit is niet nieuw voor ons en we zijn er ook niet gisteren pas over gaan
nadenken. We hebben hier de afgelopen tijd meerdere gesprekken over gevoerd met
Kin en anderen in het veld, en wisten dus al dat er beweging aan zat te komen.
Wat er nu gebeurt maakt vooral zichtbaar wat er al langer speelde.

De kern van het betoog: Spectral is eigenlijk twee dingen in één. Het is een
specificatie voor hoe je regels over JSON- en YAML-documenten uitdrukt, en het
is een tool die die regels evalueert. Die twee zijn nooit gescheiden. Het
regelformaat leeft in de broncode van de linter en wordt mee geversioneerd met
die tool. Als de tool stilvalt, valt het formaat ook stil. En je regels zijn het
duurzame deel, niet de linter die ze toevallig uitvoert.

Kin's fork onder API Commons splitst die twee alsnog, in twee repositories:

- [Het rulesetformaat](https://github.com/api-commons/spectral-rules) als
  zelfstandige specificatie, met één portable JSON Schema (draft 2020-12) in
  plaats van vijf interne draft-07 meta-schema's die aan de runtime van de
  linter hangen.
- [De linter zelf](https://github.com/api-commons/spectral-cli) als onderhouden
  build van v6.16.2, met volledige commithistorie, zonder telemetrie, en met
  issues die openstaan voor reactie.

Hoe een en ander uiteindelijk gaat heten staat nog open, dus verwacht daar de
komende tijd nog wijzigingen.

Het formaat blijft gelijk en bestaande rulesets blijven werken. Het verschil zit
in het onderhoud: verbeteringen die nu blijven liggen kunnen er wel worden
opgepakt en uitgebracht. Precies daar liep het bij `or` op vast.

## Waarom niet gewoon vacuum?

De meest gestelde vervolgvraag was waarom we niet overstappen op
[vacuum](https://quobix.com/vacuum/). Dat is een goede tool en op dit moment
beter onderhouden dan Spectral. Toch is het voor ons op dit moment nog geen
vervanging, om drie redenen:

- Ten eerste is de compatibiliteit met het Spectral-rulesetformaat niet
  volledig. Dat formaat is precies wat wij willen behouden: de ADR zijn ermee
  beschreven, en dat geldt ook voor de rulesets die we voor OAS-,
  publiccode.yml- en JSON-FG-validatie hebben geschreven.

- Ten tweede is vacuum, hoe goed ook, in de praktijk een eenmansproject. Dan
  verplaatsen we het probleem alleen maar: we stappen weg bij een tool waar te
  weinig mensen naar omkijken, en komen uit bij een tool die van één persoon
  afhangt.

- Ten derde is vacuum geschreven in Go. Onze tooling moet ook in de browser en
  in editors kunnen draaien, en dat lukt met een gecompileerde binary niet. Een
  JavaScript-engine heeft dus onze sterke voorkeur. Dat Spectral trager is dan
  vacuum weegt daar niet tegenop: de codebase van Spectral is jarenlang
  organisch gegroeid en er valt nog genoeg aan te sleutelen voordat de taal de
  beperkende factor wordt.

## Wat we gaan doen

**Spectral blijft voorlopig in gebruik.** We updaten versies in onze tooling
niet zomaar en niet automatisch. Een update is bij ons een bewuste keuze, geen
bijproduct van een build. Dat lost het onderliggende onderhoudsprobleem niet op,
maar het haalt de acute onzekerheid eruit: een linter die je in CI draait op een
versie die je zelf hebt vastgesteld, tegen specificaties die je zelf beheert, is
een beheersbaar risico. Dit incident had iedereen kunnen raken die zijn
afhankelijkheden automatisch laat meebewegen, dus het is sowieso een goed moment
om te kijken hoe dat bij jou geregeld is.

**We gaan bijdragen aan het nieuwe project.** Het probleem dat Kin beschrijft,
hebben we samen met hem doorgenomen. Dat is ook precies waarom we het niet bij
toekijken laten: we helpen mee waar we kunnen, aan zowel de specificatie als de
linter. En we nodigen iedereen die met dit formaat werkt uit om hetzelfde te
doen. Hoe meer partijen meedoen, hoe minder dit afhangt van de goede wil van één
leverancier of één persoon.

**We helpen zoeken naar een plek om te landen.** Een fork is nog geen standaard.
De OpenAPI Initiative is een optie, al gaat Spectral verder dan OpenAPI alleen
en sluiten de statuten van de OAI tooling expliciet uit, wat lastig is als het
er juist om gaat de specificatie en de tool bij elkaar te houden. De Linux
Foundation is een optie. En een Europese publieke-sectorplek is dat ook: een
aanzienlijk deel van de meest geavanceerde toepassing van dit formaat zit bij
Europese overheidsprogramma's, en verschillende van die landen voeren nu
hetzelfde gesprek. Wij denken daarin mee.

Waar wij geen voorstander van zijn, is Spectral er halsoverkop uitslopen. Dat
zou betekenen dat de ADR herschreven moet worden in een formaat dat we niet in
de hand hebben, op basis van een incident dat inmiddels is ogelost, terwijl er
juist beweging zit in de richting die wij toejuichen.

## Wat je zelf kunt doen

Werk je met de ADR, gebruik dan de
[DON Checker](https://github.com/developer-overheid-nl/don-checker) in plaats
van Spectral rechtstreeks. Hoe je hem draait voor ADR staat beschreven op de
pagina over de
[ADR Checker](/kennisbank/api-ontwikkeling/tools/api-design-rules-linter) in
onze kennisbank. Deze tool draait via CLI of in de browser, en wij houden de
onderliggende linter en de rulesets bij. Je verplaatst je afhankelijkheid
daarmee naar een Nederlandse overheidsorganisatie, waarvan je mag verwachten dat
we open zijn en blijven. Mis je een regel, klopt er iets niet of loop je ergens
tegenaan, meld het dan gerust in de issues van die repository.

Gebruik je zelf het Spectral-rulesetformaat, laat dat dan even weten in
[de discussion bij API Commons](https://github.com/orgs/api-commons/discussions/28).
Het maakt zichtbaar wie er meekijkt, en dat is precies wat er tot nu toe ontbrak
in elk gesprek over waar dit formaat thuishoort.

Heb je vragen over wat dit betekent voor je eigen implementatie van de ADR of
voor je gebruik van onze validatietooling, neem dan contact op via
developer.overheid@geonovum.nl.
