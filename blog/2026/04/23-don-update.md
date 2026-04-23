---
authors: [tom-ootes]
description:
  "Op 22 april hielden we een online update-sessie via Teams. We lichten toe wat
  er het afgelopen kwartaal veranderd is aan de kennisbank, de registersites, de
  API-infrastructuur en de tooling rondom standaarden."
tags:
  - developer.overheid.nl
  - open-source
  - api
draft: true
---

# Update developer.overheid.nl — april 2026

Op 22 april hielden we onze eerste online update-sessie. In de geest van open
source werken lieten we zien waar we mee bezig zijn, wat er is opgeleverd en wat
er aan zit te komen. Dit is een samenvatting voor degenen die niet bij konden
zijn.

<!-- truncate -->

:::success[**TL;DR**]

- De kennisbank heeft een nieuwe indeling: zoeken op tutorials, standaarden en
  tools.
- Registersites zijn herbouwd op Astro + NL Design System; er is een
  herbruikbaar template.
- Autorisatie gaat voortaan via Open Policy Agent in plaats van een
  APISIX-plugin.
- Nieuwe don-checker valideert API Design Rules vanuit de CLI, onafhankelijk van
  Spectral.
- We werken aan schemas.overheid.nl voor herbruikbare JSON-schema's en
  OAS-componenten.
- Er is een AI-skill om `publiccode.yml` automatisch te genereren.
- **Agenda**: FOST op 9 & 10 juni (Amsterdam) en een fysieke bijeenkomst op 17
  juni (Utrecht).

📺 Terugkijken kan hier:
[online update 22 april](https://stichtinggeonovum.sharepoint.com/:v:/s/Databijdebron/IQDpJ2awkdjDRo5E7UuZW9KbAZdZdi0cd3lVYcEKgxUbFf4?e=bWW20u)

:::

## Kennisbank

De kennisbank op de homepage heeft een nieuwe indeling gekregen. Naast de
bestaande thema's zijn er drie dwarsdoorsnedes toegevoegd:
**[tutorials](/kennisbank/tutorials)**, **[standaarden](/standaarden)** en
**[tools](/kennisbank/tools)**. Hiermee kun je direct op contenttype zoeken,
ongeacht het thema.

Ook zijn een aantal thema's hernoemd. Het meest zichtbaar: 'Infra' heet voortaan
'DevOps'. Tot slot is het proces voor het
[aandragen van artikelen](/contributing/kennisbank-artikel) verbeterd met
uitgebreidere tutorials en voorbeelden, zodat bijdragen makkelijker wordt.

## Registersites en nieuwe frontend

De registersites — waaronder het Open Source Register en het API Register — zijn
het afgelopen jaar volledig herbouwd op een nieuwe architectuur. De
belangrijkste keuzes:

- **Astro**: het framework dat zorgt voor structuur, routing en server-side
  rendering.
- **NL Design System**: we gebruiken de Rijkshuisstijl community-componenten,
  een React-bibliotheek gebaseerd op dit systeem.
- **Register Site Template**: beschikbaar op
  [GitHub](https://github.com/developer-overheid-nl/don-register-site), zodat
  andere organisaties (zoals DSO of RVO) hun eigen registersite in dezelfde
  stijl kunnen opzetten.

In het Open Source Register zijn nieuwe filters toegevoegd op basis van
`publiccode.yml`-data: softwaretype, ontwikkelstatus en onderhoudsstatus.

## API-infrastructuur en releasebeheer

Om hergebruik door derden te vergemakkelijken investeren we in strakker
versioneren en releasen. We gebruiken **Changesets** voor de frontend en
**Changie** voor de backend om consistente changelogs te genereren.

Op het gebied van autorisatie is de logica verplaatst van een custom
APISIX-plugin naar de **Open Policy Agent (OPA)**. Dit maakt de setup minder
afhankelijk van maatwerk en beter beheerbaar. Er zijn nu twee flows:

- **Trusted client**: gebruikt een bearer token voor lees- én schrijfrechten.
- **Untrusted flow**: gebruikt een `x-key` voor uitsluitend leesrechten.

De volgende stap is om de volledige routing als code in de infrastructuur onder
te brengen.

## De nieuwe don-checker

Er is een nieuwe
[**don-checker**](https://developer-overheid-nl.github.io/don-checker/#/adr-20)
geïntroduceerd die onafhankelijk van Spectral werkt en via de commandline
aanroepbaar is. Kenmerken:

- Ondersteuning voor zowel JSON als YAML.
- Validatie van meerdere versies van de API Design Rules.
- Resultaten gegroepeerd op severity-level: `error`, `warning`, `info` en
  `hint`, zodat duidelijk is wat prioriteit heeft.

## JSON Schema Register en OpenAPI 3.1

Met de komst van OpenAPI 3.1 verschuift de focus naar volledige ondersteuning
van JSON Schema. We werken aan een centraal register op **schemas.overheid.nl**
voor herbruikbare JSON-schema's en OAS-componenten zoals parameters en headers.

Binnen het Kennisplatform API's start een nieuwe werkgroep die zich buigt over
Schema Design Rules en de koppeling met semantiek via JSON-LD.

## AI Skill voor `publiccode.yml`

Voor het beschrijven van open-source projecten promoten en gebruiken we de
Europese standaard [`publiccode.yml`](https://yml.publiccode.tools/). De
voordelen van publiccode.yml zijn:

- Doordat we door heel Europa dezelfde metadata hanteren kunnen we projecten
  uitwisselen tussen verschillende catalogi van landen. Zo bestaan er
  bijvoorbeeld al een [Duitse](https://opencode.de/en/software), en een
  [Italiaanse ](https://developers.italia.it/it/search) op basis van
  publiccode.yml.
- Door je project te beschrijven in een bestandje in je repository sla je deze
  metadata agnostisch van je git-omgeving op. Als je dus later moet verhuizen
  met je project, hoef je de data niet meer handmatig over te zetten.
- De publiccode.yml dient als flag om aan te geven dat je project wellicht
  nuttig is voor andere organisaties uit de publieke sector.

Om het aanmaken een `publiccode.yml` te vergemakkelijken is er een AI-skill
ontwikkeld die automatisch een beschrijving en metadata genereert door
projectinformatie zoals de README te analyseren.

Deze skill is gebaseerd op de internationale standaard
[_Agent Skills_](https://agentskills.io/), hierdoor is hij compatibel met
[verschillende AI clients](https://agentskills.io/clients).

De skill is onderdeel van een nieuwe
[**AI Skills Marketplace**](https://oss.developer.overheid.nl/repositories/2d955435-f27d-4088-a7a2-816b601ba8fe),
waarmee overheidsorganisaties kennis over standaarden en werkwijzen direct in
hun AI-assistant kunnen laden.

## Save the date!

Er komen weer reuze interessante en gezellige events aan waarop je ons kan
ontmoeten:

- **9 & 10 juni** — FOST (voorheen API Days) in Amsterdam. Er worden gratis
  tickets beschikbaar gesteld. Houd hiervoor onze Mastodon in de gaten.
- **17 juni** — Developer.overheid.nl meetup in het Beatrixtheater in Utrecht,
  waar we de roadmap voor het tweede halfjaar van 2026 presenteren.

  Inschrijven en meer informatie vind je op op:
  https://opensourcewerken.nl/events/view/28756611-d38b-40c1-8f87-4ac8433831dd/developeroverheidnl-meetup

Vragen of feedback? Dat kan via de gebruikelijke kanalen of via een GitHub
issue.
