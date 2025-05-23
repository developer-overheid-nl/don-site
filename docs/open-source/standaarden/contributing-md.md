---
tags:
  - 'open-source'
---
# CONTRIBUTING.md

Een goede CONTRIBUTING.md helpt potentiële bijdragers om efficiënt en effectief bij te dragen aan een project.

## Wat neem je erin op?

### 1. Introductie

Een korte uitleg over het project en waarom bijdragen belangrijk zijn. Eventueel een verwijzing naar de doelstellingen of missie van het project.

### 2. Hoe je kunt bijdragen

- Bijdragen aan de code (bugfixes, nieuwe features, refactoring).
- Aandragen van issues (feature requests).
- Deelnemen aan discussies (op Mattermost, Github, Slack of een ander platform).
- Documentatie verbeteringen.
- Testen en bug reports indienen.
- Design, UX of accessibility verbeteringen.

### 3. Voordat je begint

Waar moet je rekening mee houden als je een bijdrage wilt doen? Verwijs naar de lijst met bestaande issues en leg uit hoe je een nieuwe issue opent. Geef aan of je eerst met de maintainers dient te overleggen voordat je een grote feature aandraagt.

### 4. Technische richtlijnen

- Code style: verwijzing naar linters, formattering, en naming conventions.
- Commit messages: bijvoorbeeld conventies zoals [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Pull requests: hoe je een PR indient.
- Reviewproces: hoe de feedbackloop werkt en wie reviews uitvoert.

### 5. Opzetten van de ontwikkelomgeving

- Hoe je het project lokaal installeert en draait.
- Vereisten zoals dependencies, SDK's, en buildtools.
- Eventuele scripts om het project snel op te zetten.
- Heb je documentatie voor het lokaal opzetten van het project in de `README.md`? Link hier dan vooral naartoe.

### 6. Tests en kwaliteitscontrole

- Hoe je tests draait en toevoegt.
- Code coverage en teststrategie (unit, integration, e2e).
- Continuous Integration: welke checks en pipelines draaien er?
- Zorg ervoor dat bijdragers zelf alle tests lokaal kunnen vinden en draaien.

### 7. Gedragscode

- Verwijzing naar een `CODE_OF_CONDUCT.md` (indien van toepassing).
- Noem de basisprincipes voor een inclusieve en respectvolle samenwerking.
- Geef aan met wie een deelnemer contact kan opnemen in het geval dat de gedragscode wordt geschonden.

### 8. Licentie en juridische zaken

- Vertel onder welke licentie bijdragen vallen.
- Welke implicaties heeft de licentie voor de developer?
- Of bijdragers een Contributor License Agreement (CLA) moeten tekenen.

### 9. Bestuur

Wie bepaalt welke bijdragen uiteindelijk wel en niet worden geaccepteerd? Verwijs eventueel naar de `GOVERNANCE.md`. Vermeld onder dit kopje ook wie er betaalt voor het beoordelen en verwerken van de bijdragen. Als meerdere organisaties bij het project betrokken zijn, neem ze dan op in een lijst en benoem hun rollen.

### 10. Contact en ondersteuning

- Hoe en waar je vragen stelt (bijv. Discord, Slack, GitHub Discussions).
- Wie je kunt benaderen voor hulp.
- Vermeld hier ook contactgegevens (bijv. e-mailadressen)
- Voeg hier ook links toe naar communicatiekanalen (Slack, Mattermost, Mastodon).

## Voorbeelden

- Zie de [contributing guidelines](https://docs.openkat.nl/guidelines/contributions.html) van OpenKAT.

<details>
  <summary>Voorbeeld: de `CONTRIBUTING.md` [OSPO-NL](https://github.com/ospo-nl):</summary>

```markdown showLineNumbers title="./CONTRIBUTING.md"
# Contributing Guide

> _Voor het maken van een eigen CONTRIBUTING kijk onderaan bij [Attribution](#attribution)_

Om te beginnen, hartelijk dank voor je interesse om bij te dragen aan dit OSPO-NL initiatief! Door
te delen in kennis en ervaring en samen te werken komen we tot 'best practices' en hulp om Open
Source projecten in Nederland goed te organiseren.

> **For non-Dutch native readers**: First off, thank you for your interest to contribute to this
> OSPO-NL initiative! By sharing knowledge and experiences and collaborate we'll be able to produce
> Best Practices and help to set up Open Source projects in The Netherlands. Because the gap between
> needs and knowledge in The Netherlands the content of this initiative will be mainly in Dutch.
>
> We are very sorry if this creates a feeling of not being inclusive ... which is of course against
> our [Code of Conduct](CODE_OF_CONDUCT.md); We would like to be as inclusive as possible!
>
> BUT to choose to write mainly in Dutch we will be more inclusive to the less equiped and Dutch
> native readers of our content and those are the primary focus of these practices. Nonetheless,
> much content is probably not managed here or produced inside these repositories but will be linked
> to or just translated summaries of content elsewhere.

Door deze richtlijnen te volgen, communiceer je dat je de tijd respecteert van de ontwikkelaars die
dit open source-project beheren en ontwikkelen. In ruil daarvoor moeten ze dat respect beantwoorden
bij het aanpakken van uw melding, het beoordelen van wijzigingen en het helpen afronden van uw pull
requests.

Houd een open geest! Het verbeteren van documentatie, melden van fouten, of bijdragen aandragen zijn
voorbeelden van nuttige bijdragen. Veel informatie is mogelijk al ergens beschikbaar, waarschijnlijk
in het Engels, en het verwijzen naar andere documentatie helpt ons allemaal. Helemaal als daar
samenvattingen (of volledige) vertalingen van in het Nederlands toegevoegd worden (daar of in dit
project)!

Mochten bijdragen niet voldoen aan deze richtlijnen dan houden wij ons de vrijheid om commentaren te
negeren en bijdragen te sluiten. Daarbij zullen wij verwijzen naar deze richtlijnen / Contributing
Guide.

> En als je het project leuk vindt, maar gewoon geen tijd hebt om bij te dragen, is dat prima. Er
> zijn andere eenvoudige manieren om het project te steunen en je waardering te tonen, waar we ook
> erg blij mee zijn:
>
> - Geef het project een ster
> - Tweet erover
> - Verwijs naar dit project in de readme van uw project
> - Noem het project op lokale meetups en vertel het aan je vrienden/collega's

## Basisregels

### Gedragscode

Dit project en iedereen die eraan deelneemt, wordt bestuurd door de [OSPO-NL
Gedragscode](CODE_OF_CONDUCT.md). Door deel te nemen, wordt van u verwacht dat u zich aan deze code
houdt. Gelieve onaanvaardbaar gedrag te melden volgens de
[Gedragscode#Handhaving](CODE_OF_CONDUCT.md#handhaving).

### Verwachtingen

Vrijwel alle content is beschreven in Markdown. Daarbij maken wij gebruik van MkDocs Material om
alle documentatie te publiceren. Bij gebruik van plaatjes is het fijn als de bron daarvan ook
onderdeel is van dit project ... en bij voorkeur in een open formaat. Dat betekent dat deze
aangepast en bijgewerkt kunnen worden zonder kosten te maken voor tools. Nogmaals: bij voorkeur.

- Zorg dat bijdragen cross-platform uitwisselbaar zijn: Windows, Mac, Linux.
- Zorg dat code en documentatie compleet is en voldoet aan de [styleguides](#styleguides).
- Maak issues aan voor elke grote wijziging en verbetering die je graag wilt maken. Bespreek de
  dingen transparant en vraag community feedback.
- Probeer bijdragen compact en klein te houden; dat draagt bij aan het behoud van overzicht en
  wijzigingen.
- Wees open naar nieuwe mensen en moedig nieuwe bijdragen aan van alle achtergronden.
- Issues behoren van een passend label te zijn voorzien:
  - `Bug` betekent een urgent probleem in de community of in de documentatie
  - `Enhancement` betekent een bijdrage voor uitbreiding
  - `Question` betekent een vraag

## Ik heb een vraag

> Als je een vraag wilt stellen, gaan we ervan uit dat je de beschikbare
> [documentatie](https://ospo-nl.github.io/kennisbank/) hebt gelezen.

Voordat je een vraag stelt, kun je het beste zoeken naar bestaande
[issues](https://github.com/ospo-nl/kennisbank/issues) die je kunnen helpen. Als u een geschikt
probleem hebt gevonden en nog steeds verduidelijking nodig heeft, kunt u uw vraag in dit nummer
schrijven. Het is ook raadzaam om eerst op internet naar antwoorden te zoeken.

Als je dan toch de behoefte voelt om een vraag te stellen en verduidelijking nodig hebt, raden we
het volgende aan:

- Open een [issue](https://github.com/ospo-nl/kennisbank/issues/new).
- Geef het issue een passend label (zie [verwachtingen](#verwachtingen)).
- Geef zoveel mogelijk context over waar je tegenaan loopt.
- Indien van toepassing: Lever technische afhankelijkheden die relevant lijken.

We zullen het probleem dan zo snel mogelijk in behandeling nemen.

## Ik wil bijdragen

> **Juridische mededeling**
>
> Wanneer u bijdraagt aan dit project, moet u ermee instemmen dat u 100% van de inhoud hebt
> geschreven, dat u over de benodigde rechten op de inhoud beschikt en dat de inhoud die u bijdraagt
> onder de projectlicentie mag worden geleverd.

### Issues melden

#### Voordat u een issue indient

Een goed issue zou er niet voor moeten zorgen dat anderen u moeten achtervolgen voor meer
informatie. Daarom vragen we u om dit zorgvuldig te onderzoeken, informatie te verzamelen en het
probleem in detail te beschrijven in uw melding.

- Zorg ervoor dat u de nieuwste versie gebruikt.
- Lees de [documentatie](https://ospo-nl.github.io/kennisbank/) aandachtig door en ontdek of de
  functionaliteit al wordt gedekt, misschien door een individuele configuratie.
- Voer een [zoekopdracht](https://github.com/ospo-nl/kennisbank/issues) uit om te zien of de
  verbetering al is voorgesteld. Als dit het geval is, voeg dan een opmerking toe aan de bestaande
  uitgave in plaats van een nieuwe te openen.

Voor dit moment is er alleen documentatie en zijn verdere voorbereidingen niet nodig. Mocht er ooit
tools en software componenten opgeleverd worden, dan is het van belang om de details daarvan ook
duidelijk te melden en te onderzoeken of het daadwerkelijk een probleem met die software is of dat
het wellicht toch een fout in uw omgeving is.

#### Hoe dien ik een goed issue in?

> U mag beveiligingsgerelateerde problemen, kwetsbaarheden of issues, inclusief gevoelige
> informatie, nooit melden aan de issue tracker of elders in het openbaar. In plaats daarvan moeten
> gevoelige bugs per e-mail naar <TODO> worden gestuurd.

We gebruiken GitHub-problemen om issue en fouten op te sporen. Als u een probleem met het project
tegenkomt:

- Open een [issue](https://github.com/ospo-nl/kennisbank/issues/new). (Omdat we op dit moment niet
  zeker weten of het een fout is of niet, vragen we je om nog niet over een fout te praten en het
  probleem niet te labelen.)
- Leg zo duidelijk mogelijk uit wat u verwacht of wens en geef suggesties voor invulling daarvan.
- Geef de informatie op die u in het vorige gedeelte hebt verzameld.

Zodra het is ingediend:

- Het projectteam zal het probleem dienovereenkomstig labelen.
- Een teamlid zal proberen het issue te begrijpen en op te volgen.

#### Meer hulp

Hier zijn een paar vriendelijke (maar Engelse) handleidingen voor meer hulp en achtergronden: [First
Timers Only](http://www.firsttimersonly.com/) en [Make A Pull Request](http://makeapullrequest.com/)

### Verbeteringen voorstellen

Deze sectie begeleidt u bij het indienen van een verbeteringssuggestie voor OSPO-NL, **inclusief
volledig nieuwe functies en kleine verbeteringen aan bestaande functionaliteit**. Door deze
richtlijnen te volgen, kunnen beheerders en de community uw suggestie begrijpen en gerelateerde
suggesties vinden.

#### Voordat u een verbetering indient

- Zorg ervoor dat u de nieuwste versie gebruikt.
- Lees de [documentatie](https://ospo-nl.github.io/kennisbank/) aandachtig door en ontdek of de
  functionaliteit al wordt gedekt, misschien door een individuele configuratie.
- Voer een [zoekopdracht](https://github.com/ospo-nl/kennisbank/issues) uit om te zien of de
  verbetering al is voorgesteld. Als dit het geval is, voeg dan een opmerking toe aan de bestaande
  uitgave in plaats van een nieuwe te openen.
- Ga na of uw idee past binnen de reikwijdte en doelstellingen van het project. Het is aan u om een
  sterk pleidooi te houden om de ontwikkelaars van het project te overtuigen van de voordelen van
  deze functie. Houd er rekening mee dat we functies willen die nuttig zijn voor de meerderheid van
  onze gebruikers en niet slechts voor een kleine subgroep. Als u zich slechts op een minderheid van
  gebruikers richt, overweeg dan om een bibliotheek met add-ons/plug-ins te schrijven.

#### Hoe dien ik een goede verbeteringssuggestie in?

Suggesties voor verbeteringen worden bijgehouden als [GitHub
issues](https://github.com/ospo-nl/kennisbank/issues).

- Gebruik een **duidelijke en beschrijvende titel** voor het probleem om de suggestie te
  identificeren.
- Geef een stapsgewijze beschrijving van de voorgestelde verbetering met zoveel mogelijk details.
- Beschrijf het huidige gedrag en leg uit welk gedrag je in plaats daarvan verwachtte te zien en
  waarom. Op dit punt kunt u ook zien welke alternatieven niet voor u werken.
- Misschien wilt u schermafbeeldingen en geanimeerde GIF's toevoegen die u helpen de stappen te
  demonstreren of aan te geven op welk onderdeel de suggestie betrekking heeft. U kunt deze tool
  gebruiken om GIF's op macOS en Windows op te nemen, en deze tool of deze tool op Linux.
- Leg uit waarom deze verbetering nuttig zou zijn voor de meeste gebruikers van OSPO-NL. Misschien
  wil je ook wijzen op de andere projecten die het beter hebben opgelost en die als inspiratie
  kunnen dienen.

## Review proces

Om wijzigingen goed te kunnen beheren, volgen en uit te leggen, volgen we een eenvoudig proces van
review en Pull Requests (PRs).

- Wijzigingen wordt nooit direct op de `main` branch gedaan, maar altijd in een 'feature' branch.
- Maak een Pull Request aan zodra je klaar bent. Of maak gelijk een Draft Pull Request aan nadat u
  uw feature branch hebt aangemaakt. Zodra uw wijzigingen klaar zijn voor review, wijzigt u uw Draft
  PR naar 'Ready for Review'.
- Een teamlid reviewt de wijzigingen in het Pull Request en geeft commentaar en/of goedkeuring
  (Approve).
- Na goedkeuring kan het Pull Request gemerged worden. Hiervoor wordt standaard 'Squash & Merge'
  gebruikt. In geval dat de PR door een teamlid is ingediend, reviewt een ander teamlid de PR maar
  wordt de merge overgelaten aan de auteur van de PR.
- Na de merge dienen bijbehorende issues bijgewerkt te worden zodat deze niet onnodig open blijven
  staan ofwel beantwoord worden.

## Styleguides

### Markdown

Alle documentatie moet 'machine-readable' zijn en tegelijk ook makkelijk leesbaar en onderhoudbaar
voor mensen. Daarom maken we gebruik van **Markdown**. Zie ook [GitHub
Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
en de algemene [Markdown handleiding](https://www.markdownguide.org/basic-syntax/) (EN) (of zelfs de
originele [documentatie](https://daringfireball.net/projects/markdown/syntax)). De documentatie van
het gebruikte [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/reference/) thema
benoemt de opmaak die extra wordt ondersteunt door het thema.

Alinea's worden op of binnen **100 karakters** afgekapt om versiebeheer per regel beheersbaar te
maken. Dit kan automatisch worden afgedwongen in tooling, bijv. [Rewrap in
VSCode](https://stkb.github.io/Rewrap/) (keyboard shortcut: `alt+Q`).

### Bestandsnamen

Alle bestandsnamen, zowel van bestanden (files) als van mappen (folders), komen terug in de URL van
de gepubliceerde documentatie ... en spaties zijn niet zo standaard voor URLs. Daarom worden er GEEN
spaties gebruikt in bestandsnamen. Deze worden vervangen door `_`, underscores. In het genereren van
de documentatie worden deze netjes vervangen door spaties zodat de layout er wel mooi en netjes uit
ziet! :muscle:

### Regeleinden
Er zijn meerdere manieren om regeleinden (Engels: line endings) te codificeren in bestanden. Voor
dit project horen die `LF` te zijn, zoals gebruikelijk voor de meeste projecten. Hiermee is
gegarandeerd dat op Linux, Windows en Mac OSX bestanden op dezelfde wijze worden gepresenteerd en
Pull Requests gemakkelijk zijn. Lokaal uitchecken met CRLF (in Windows) en commits met LF is
uiteraard toegestaan .. als het resultaat maar met LF in GitHub terecht komt :smile:

Zie ook [Blog: Mind the End of Your
Line](https://adaptivepatchwork.com/2012/03/01/mind-the-end-of-your-line/) en [GitHub Help on Line
Endings](https://docs.github.com/en/get-started/getting-started-with-git/configuring-git-to-handle-line-endings).

## Community

De OSPO-NL Community is nog in oprichting. Voor dit moment zijn er nog geen officiële kanalen en
samenwerkingsverbanden anders dan actief betrokken personen. Zie ook meer in de [over
ons](https://ospo-nl.github.io/kennisbank/Over_ons).

## Attribution

Een eigen CONTRIBUTING maken is niet echt moeilijk ... en toch ook weer wel. Inspiratie voor deze
variant komt van een
[template](https://github.com/nayafia/contributing-template/blob/HEAD/CONTRIBUTING-template.md) en
**contributing-gen**. [Genereer zelf](https://github.com/bttger/contributing-gen) (incl. CODE OF
CONDUCT) !
```

</details>

<details>
  <summary>Voorbeeld: de `CONTRIBUTING.md` van [developer.overheid.nl](https://github.com/developer-overheid-nl/don-site/blob/main/src/pages/contributing.md):</summary>

```markdown showLineNumbers title="./CONTRIBUTING.md"
# Bijdragerichtlijnen

:::info[Naar het artikel over CONTRIBUTING.md]
Raadpleeg [ons artikel over CONTRIBUTING.md](https://developer.overheid.nl/kennisbank/leidraad/open-source/standaarden/contributing-md) voor meer info over het zelf opstellen van bijdragerichtlijnen.
:::


## Introductie

Om te beginnen, hartelijk dank voor je interesse om bij te dragen aan ons gezamenlijke Developer Portal voor de hele Nederlandse overheid! Door onze ervaringen te delen, helpen we anderen om beter onderbouwde keuzes te maken. Omdat wij willen voorkomen dat we standaarden of projecten uit specifieke organisaties een voorkeursbehandeling geven, ontvangen we graag thema's en documentatie van zoveel mogelijk organisaties binnen de overheid.

## Dit portaal
Software bouwen voor de overheid brengt specifieke uitdagingen met zich mee. Dit portaal helpt je om te voldoen aan overheidspecifieke eisen, zoals securitystandaarden en toegankelijkheidsrichtlijnen. Daarnaast vind je hier informatie over beschikbare Open Source-projecten en hoe je deze kunt inzetten.

## Hoe je kunt bijdragen

Alle artikelen in onze kennisbank zijn geschreven in de `.md` of `.mdx` extensie en dus eenvoudig aan te passen.

Je kunt bijdragen op de volgende manieren:

- Draag een **artikelonderwerp aan**. Dien een [issue](https://github.com/developer-overheid-nl/don-site/issues/new) in met jouw idee.
- Zelf een **artikel bijdragen**. Dit doe je door een [fork aan te maken](https://github.com/developer-overheid-nl/don-site/fork) en deze vervolgens aan te bieden als [pull request](https://github.com/developer-overheid-nl/don-site/compare).
- Voeg een [**API**](https://apis.developer.overheid.nl/apis/toevoegen) toe aan ons API register.
- Voeg een [**gitaccount**](https://oss.developer.overheid.nl/toevoegen/repository) toe aan ons OSS register.
- Door vragen te stellen of je te **mengen in discussies** in ons [Slack kanaal](https://codefornl.slack.com/archives/CFV4B3XE2).
- **Bugs** te melden. Dien een [issue](https://github.com/developer-overheid-nl/don-site/issues/new) in.
- Door ideeën aan te dragen om ons design, UX of accessibility te verbeteren. Je doet dit door een [issue in te schieten](https://github.com/developer-overheid-nl/don-site/issues/new).


## Labels voor issues

Om issues beter te organiseren, gebruiken we labels. Voeg bij het indienen van een issue een passend label toe, zodat het sneller de juiste aandacht krijgt:

- `content` → Voor voorstellen of wijzigingen aan artikelen.
- `bug` → Voor het melden van fouten of problemen.
- `ux` → Voor ideeën en verbeteringen rondom design, gebruikerservaring en toegankelijkheid.
- `enhancement` → Voor het voorstellen van nieuwe features of verbeteringen aan bestaande functionaliteit.

Een volledig overzicht van beschikbare labels vind je in onze [GitHub repository](https://github.com/developer-overheid-nl/don-site/labels).

## Voordat je begint

Voor je aan de gang gaat zouden we je willen vragen de volgende punten af te vinken:

- Heeft iemand anders al eens een soortgelijk issue ingediend? Check dit in de [backlog](https://github.com/developer-overheid-nl/don-site/issues).
- Ben je van plan zelf een feature te bouwen? Neem dan om af te stemmen eerst contact met ons op via [Slack](https://codefornl.slack.com/archives/CFV4B3XE2) of [e-mail](mailto:developer.overheid@geonovum.nl).

## Coderichtlijnen
Op dit moment hanteren we in onze codebases (nog) geen strikte voorschriften mbt het opleveren van code. We gaan er vanuit dat als iets met zorg is gebouwd er goed is nagedacht over de opzet en de schrijfwijze. Mocht je vragen hebben over hoe je iets dient op te leveren dan kun je je vraag stellen in ons [Slackkanaal](https://codefornl.slack.com/archives/CFV4B3XE2).

## Aanbieden pull request
Wanneer je pull request wordt gemerged in de `main` branch, squashen we alle commits tot één commit met een passende naam. Je hoeft je dus niet druk te maken dat de namen van je commits allemaal even eloquent hoeven te zijn.

## Opzetten ontwikkelomgeving
Check onze [README.md](https://github.com/developer-overheid-nl/don-site/blob/main/README.md).

## Gedragscode
Check onze [CODE_OF_CONDUCT.md](https://github.com/developer-overheid-nl/don-site/blob/main/CODE_OF_CONDUCT.md).

## Juridisch
Dit project heeft een EUPL (European Union Public License) licentie. Dit betekent dat de volgende punten van toepassing zijn op je bijdrage:

1. Je bijdrage valt **automatisch onder de EUPL**.
        De EUPL bevat een copyleft-bepaling, wat betekent dat alle afgeleide werken ook onder de EUPL (of een compatibele licentie) moeten blijven.
        Dit voorkomt dat je bijdrage later wordt omgezet naar een gesloten, propriëtair product.

2. Je **behoudt** het **auteursrecht** op je code.
        Jij blijft juridisch eigenaar van je eigen bijdrage.
        Maar door bij te dragen, geef je anderen het recht om jouw code te gebruiken, wijzigen en verspreiden onder de voorwaarden van de EUPL.

3. Iedereen mag je code **gebruiken** en **aanpassen**.
        De EUPL staat toe dat anderen jouw code kopiëren, verspreiden en aanpassen, zolang ze zich aan de licentievoorwaarden houden.
        Dit betekent ook dat verbeteringen en aanpassingen aan jouw code weer terug kunnen vloeien in de community.

4. **Compatibiliteit** met andere licenties.
        De EUPL is compatibel met een aantal andere open source-licenties, zoals de GPL en de MPL. Dit betekent dat jouw code onder bepaalde voorwaarden ook in projecten met die licenties kan worden gebruikt.

5. Je hebt recht op **erkenning**.
        De licentie vereist dat jouw auteurschap erkend blijft. Anderen mogen je code dus niet zomaar zonder naamsvermelding overnemen.

Als je jezelf, nadat je een bijdrage hebt gedaan, wilt vereeuwigen in onze codebase nodigen we je uit om jezelf aan onze [AUTHORS.md](https://github.com/developer-overheid-nl/don-site/blob/main/AUTHORS.md) toe te voegen.

## Bestuur
Voor meer informatie over de financiering en organisatie van dit project, zie onze [GOVERNANCE.md](https://github.com/developer-overheid-nl/don-site/blob/main/GOVERNANCE.md).

## Contact
Check onze [README.md](https://github.com/developer-overheid-nl/don-site/blob/main/README.md#contact) onder het kopje contact.

```

</details>

## Externe links

- [Standaard voor Publieke Code /  Criterium 4: verwelkom bijdragers](https://codefor.nl/community-translations-standard/nl/criteria/welcome-contributors.html)
