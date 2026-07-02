---
content_type: tool
tags:
  - "open-source"
  - "git"
  - "informatiebeveiliging"
  - "community"
  - "monitoring"
title: "OpenKAT"
---

import { Link, Icon, Alert, Heading } from
"@rijkshuisstijl-community/components-react"; import Author from
'@theme/Blog/Components/Author';

<Alert type="info" className="mb-6">
  <Author 
    author={{
      name: "Bijdrage door: Jan Klopper",
      title: "Lead Developer OpenKAT",
      url: "https://github.com/underdarknl"
    }} 
  />
</Alert>

Oorspronkelijk ontwikkeld door MinVWS om de beveiligingsvraagtstukken rond het
Coronastelsel het hoofd te bieden bleek OpenKAT al snel ook voor andere doelen
bruikbaar.

OpenKAT is ontwikkeld om de (beveiligings-)status van informatiesystemen te
monitoren, analyseren en op te slaan. OpenKAT scant netwerken, analyseert
kwetsbaarheden en produceert toegankelijke rapportages. Het pakket integreert
tientallen van de meeste gebruikte beveiligings-tools in een modulair framework
dat bestaat uit verschillende smaken plugins.
OpenKAT raadpleegt externe databases en combineert informatie van al deze
bronnen tot feiten welke forensische geborgd en onderbouwdt zijn.
Met deze feiten in de hand, getoetst tegen (eigen) beleid maakt OpenKAT het
mogelijk grip te krijgen op zaken als Attack Surface, Security posture en de
daarbij behorende PDCA (Plan-Do-Check-Act) cycli.
Duidelijke rapporten voor verschillende doelgroepen en gebruikers dragen bij om
zowel op Cert, CISO of op de engineering afdeling inzicht te krijgen en houden
over problemen, en de daarbij behorende oplossingsrichtingen.

Enkele features op een rij:

* Multi-tennant, volledige gescheiden organisaties
* Schaalbaar (honderd organisaties, ieder met 20k of meer assets)
* Verschillende scan-levels, van alleen OSINT (Open Source Intelligence) tot directe aanvallen
* 50+ hoge kwaliteit scan tools
* Bi-temporal opslag (hoe zag mijn netwerk er toen uit?)
* Forensische borging, timestamping van handelingen en uitkomsten
* Losse verwerking van reeds opgeslagen bewijs
* Eigen business rules op basis van eigen beleid
* API koppelingen op elk vlak mogelijk

OpenKAT is gratis, Open Source en self-hosted beschikbaar. Daarnaast zijn er
verschillende organisaties die OpenKAT inzetten voor de eigen `achterban` of
vanuit commercieel perspectief een totaalpakket aanbieden.

De governance van het doorontwikkelen is door de community belegd wij Stichting
LibreKAT waarlangs gebruikers, bijdragers en uitbaters met elkaar de toekomstige
ontwikkelingen van de tool en aanverwanten digitale beveiligingsoplossingen
plannen en op zich nemen.

**[Naar de website van OpenKat](https://openkat.nl/)**
**[Naar de website van Librekat](https://librekat.nl/)**
