---
authors: [dimitri-van-hees]
tags: [developer.overheid.nl, changelog, release]
---

# Nieuwe versie developer.overheid.nl

De vernieuwde versie van developer.overheid.nl is live! Met deze update zetten we een grote stap richting een centrale, open en toegankelijke plek voor softwareontwikkeling binnen de overheid. We zijn er nog niet, maar onder het mom van *release early, release often*, hebben we de eerste grote koerswijziging alvast doorgevoerd. In deze post leggen we uit wat we van plan zijn, waarom we dat gaan doen en hoe we dat gaan realiseren.

<!-- truncate -->

## Developer portal

De website developer.overheid.nl is - de domeinnaam verklapt het al - de *developer portal* van de Nederlandse overheid. Zo'n ontwikkelaarsportaal is simpelweg een vertrekpunt voor softwareontwikkelaars om op een zo'n *developer friendly* mogelijke manier met of aan software van een bepaalde organisatie te kunnen werken. Voor de meeste partijen gaat dit vaak niet verder dan enkele services, in de vorm van API's, en Software Development Kits (SDK's), maar in dit geval betreft het de gehele Nederlandse overheid.

## Eén centrale plek voor software development

Onze overheid bestaat uit talloze organisaties in verschillende bestuurslagen met verschillende IT afdelingen, communities, API's, Open Source Software, data, standaarden, enzovoorts. Voor zowel ontwikkelaars van leveranciers (bijvoorbeeld een internetbedrijf dat de website voor een gemeente maakt) als developers van de overheid zélf (bijvoorbeeld een ministerie dat middels een API data wil ontsluiten) is het vaak moeilijk om ondersteuning te vinden. Bijvoorbeeld voorbeelden over hoe je nu die ene standaard implementeert, of het al een keer eerder gedaan is, en of dat er wellicht tools zijn die je hierbij kunnen helpen. Met dit portaal maken we dit veel makkelijker. Iedereen die software ontwikkelt voor (of met) de overheid wordt bij het begin van een IT project vanuit developer.overheid.nl verder geholpen. Eérst door hergebruik te maken van al het moois dat er bij de overheid al is ontwikkeld, daarna door zélf met hulp van gedeelde kennis, tools en voorbeelden software te maken. En, volgens het "Open, tenzij" principe, het uiteraard weer te delen zodat het herbruikbaar is voor anderen.

## Don't reinvent the wheel

Op deze manier voorkomen we dat mensen het wiel opnieuw gaan uitvinden. Voorbeeld: of je nu software ontwikkelt voor volksgezondheid of cultuur, de manier van communiceren tussen een API en een client blijft (in veruit de meeste gevallen) hetzelfde. Veel van dit soort zaken zijn te standaardiseren en vastgelegd bij [Forum Standaardisatie](https://www.forumstandaardisatie.nl), maar niet voor alles is dit even makkelijk. Bovendien moet je de benodigde standaarden dan ook nog vinden, implementeren en valideren. Ook hier helpt developer.overheid.nl bij; is het niet met tools zoals linters of validators, dan wel via de community waar je in contact gebracht wordt met andere developers en communities die je waarschijnlijk verder kunnen helpen.

## Kennisbank

De belangrijkste nieuwe feature is de kennisbank. Op het moment van schrijven is ons team druk bezig met het verzamelen en schrijven van documentatie over standaarden, tools, best practices, tutorials en andere onderwerpen die te maken hebben met IT ontwikkeling bij de overheid. Een hele klus, want ook wij weten niet precies hoe het gehele IT landschap van de overheid eruit ziet.

Daarom kunnen we jouw hulp goed gebruiken. Immers: hoe meer input, hoe sneller de kennisbank groeit. Heb jij dus nog artikelen, tools, ervaringen of andere bronnen die je graag wilt delen? Laat het ons weten! Of draag direct bij via GitHub. De hele kennisbank is gebaseerd op markdown en volledig Open Source, waardoor iedereen met een GitHub account eenvoudig kan bijdragen aan het verbeteren van de inhoud van de kennisbank. Dit beperkt zich overigens niet tot de kennisbank; het hele project is open source en gebaseerd op markdown. Meer informatie over hoe je kunt bijdragen vind je in [dit artikel](https://developer.overheid.nl/contributing).

:::tip Help mee!

Heb jij nog artikelen, tools, ervaringen of andere bronnen die je graag wilt delen? Laat het ons weten! Je kunt ook direct bijdragen via GitHub. [Lees hier op welke manieren je ons kunt helpen](https://developer.overheid.nl/contributing).

:::

## Practice what you preach

Als overheidsbreed ontwikkelaarsportaal moeten we natuurlijk het goede voorbeeld geven. Dat betekent onder andere dat we aan alle standaarden willen voldoen, volledig Open Source willen werken en best practices willen volgen. Hieronder de belangrijkste uitgangspunten voor alle nieuwe ontwikkelingen.

### Front-end op basis van NL Design System

Voor de front-end componenten stappen we volledig over op [NL Design System](https://nldesignsystem.nl/). Hiermee maken we optimaal gebruik van bestaande componenten en worden eventuele nieuwe componenten teruggegeven aan de community voor hergebruik door andere partijen.

### Open Source

Alle doorontwikkeling van developer.overheid.nl zullen we volledig open en transparant doen. Hiervoor willen we zowel de filosofie als werkwijze van NL Design System gaan gebruiken. Zo zullen we bijvoorbeeld publieke sprint reviews via Slack gaan doen en periodieke online *heartbeats* organiseren waarin we de laatste stand van zaken bespreken.

### API first

In het kader van de [NL API Strategie](https://docs.geostandaarden.nl/api/API-Strategie/) gaan we volledig *API first* (niet te verwarren met [design first](https://developer.overheid.nl/blog/2024/03/27/design-first-code-first)) werken. Dit betekent dat alle content via API's ontsloten wordt, zodat verschillende front-ends eenvoudig geïmplementeerd kunnen worden. Daarnaast maken we in onze codebase onderscheid tussen de Kennisbank, API register en Open Source Software (OSS) register, zodat deze als losse projecten beheerd kunnen worden. Bovendien maakt dit het eenvoudiger voor organisaties om enkel het API register of OSS register te hergebruiken en bij te dragen aan de codebase.

## Known issues

Zoals gezegd hebben we besloten om alvast te releasen wat we al hebben. Misschien zie je dat niet vaak in de publieke sector, maar het is wel de beste manier om de vaart erin te houden. Dit betekent ook dat er een aantal zaken nog moeten gebeuren waarvan we reeds op de hoogte zijn:

- Content; momenteel missen er nog vele onderwerpen in de kennisbank. Voel je daarom vooral vrij om bij te dragen! En mocht je nou geen tijd of zin hebben om een heel artikel te schrijven, dan nemen wij graag een interview af om het vervolgens zelf te schrijven. Uiteraard met een eervolle vermelding.
- Homepage; bepaalde features als aankomende events en laatste blogposts die je wellicht zou verwachten op de homepage zijn nog niet geïmplementeerd. Houd onze roadmap en blog in de gaten voor de laatste updates, zodat je meteen weet wanneer er nieuwe features beschikbaar zijn.
- Toegankelijkheid; op dit moment voldoet nog niet alles aan de WCAG toegankelijkheidseisen. Hier wordt momenteel hard aan gewerkt zodat we zo snel mogelijk voldoen.
- API en OSS register; we gaan dezelfde NL Design System componenten gebruiken om de front-ends van de registers te vervangen zodat deze dezelfde styling krijgen als developer.overheid.nl. Tevens worden beide registers voorzien van een nieuwe API om integratie met externe bronnen mogelijk te maken.
- Slack en GitHub; op dit moment zijn verreweg de meeste mensen uit onze doelgroep nog te bereiken via Slack en GitHub. Omdat dit project deels afhankelijk is van de participatie van derden hebben we ervoor gekozen om (in ieder geval voorlopig) aan te haken bij de [Code4NL Slack](https://codefornl.slack.com/archives/CFV4B3XE2) en gebruik te maken van GitHub.

## Roadmap

Op korte termijn zullen we ons vooral bezighouden met het toevoegen van content en het verhelpen van de hierboven genoemde *known issues*. Een gedetailleerde roadmap is te volgen via ons GitHub project: [https://github.com/orgs/developer-overheid-nl/projects/9/views/4](https://github.com/orgs/developer-overheid-nl/projects/9/views/4). Daarnaast staan er verschillende ideeën op ons netvlies, maar die verdienen allemaal hun eigen blogpost. Hieronder alvast een voorproefje.

### Techradar

Naarmate we meer content verzamelen, des te meer inzicht we krijgen in het IT landschap van de Nederlandse overheid. Dit inzicht is uitstekend te visualiseren middels een *techradar*.

### Verbeteringen API register

Vanuit het [Kennisplatform API's](https://apigov.nl) en [Logius](https://logius.nl), de beheerder van de [API Design Rules](https://developer.overheid.nl/kennisbank/apis/standaarden/rest-api-design-rules), zijn suggesties voor de verbetering van het API register gedaan. Zo gaan we de aanleverprocedure aanpassen zodat ook organisaties die niet in het [Register van Overheidsorganisaties](https://organisaties.overheid.nl/) staan API's kunnen toevoegen, de *developer experience* verbeteren door te kijken welke API tooling we nog meer kunnen integreren en de [ADR validator](https://developer.overheid.nl/kennisbank/apis/tools/api-design-rules-validator) met bijbehorende statistieken uitbreiden. Ook API lifecycle informatie zoals welke versie de actuele is moet via het API register inzichtelijk worden.

### Europees OSS register

Verschillende Europese lidstaten zijn momenteel bezig met het optuigen van OSS registers, die allemaal aansluiting moeten vinden met het centrale register van de Europese Commissie. Wij zijn in gesprek met onder andere onze Franse en Italiaanse collega's om te zorgen dat we optimaal hergebruik kunnen maken van elkaars software. Hierbij zal de Standaard voor Publieke Code een grote rol spelen en is de kans aanwezig dat de daaruit voortgekomen standaard [`publiccode.yml`](https://developer.overheid.nl/kennisbank/leidraad/open-source/standaarden/publiccode-yml) verplicht wordt voor Europese Open Source projecten.

### Schema register

Samen met Logius en [Geonovum](https://www.geonovum.nl) kijken we of we op basis van de [Stelselcatalogus](https://www.stelselcatalogus.nl/) JSON Schema's kunnen genereren ten behoeve van hergebruik in bijvoorbeeld OpenAPI documenten. Versionering, bereikbaarheid en vindbaarheid van deze schema's zijn zaken die mogelijkerwijs plaats kunnen vinden via bijvoorbeeld `schemas.developer.overheid.nl`. Ook eventuele transformaties naar OpenAPI 3.0.x schemas zouden hier plaats kunnen vinden, alsmede het publiceren van andere schema's die niet afkomstig zijn uit de Stelselcatalogus.

## Help en denk mee

Met deze nieuwe versie van developer.overheid.nl zetten we een belangrijke stap richting een toegankelijker en beter georganiseerd ontwikkelaarsportaal voor de hele Nederlandse overheid. Maar we zijn er nog niet! Jouw feedback en bijdragen helpen ons enorm om dit platform verder te verbeteren. Heb je ideeën, tools, of kennis die je wilt delen? Sluit je aan via [GitHub](https://github.com/orgs/developer-overheid-nl), [Mastodon](https://social.overheid.nl/@developer) of de [Code4NL Slack](https://codefornl.slack.com/archives/CFV4B3XE2) en help mee om softwareontwikkeling met en voor de overheid slimmer en efficiënter te maken!
