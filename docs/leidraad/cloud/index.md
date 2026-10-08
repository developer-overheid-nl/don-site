---
title: 5. Cloud-native softwareontwikkeling
sidebar_position: 5
tags: ["devops", "kubernetes", "msa"]
---

# Richtlijn: Cloud-native softwareontwikkeling

Cloud-native bouwen betekent dat je applicatie los staat van het platform waarop
ze draait. Dat maakt het eenvoudiger om services te verplaatsen, te vervangen of
toe te voegen. Voor de overheid is dat sinds 2026 meer dan een technische
voorkeur: het
[Rijksbrede Cloudbeleid 2026](https://www.tweedekamer.nl/downloads/document?id=2026D35295)
vraagt om een getoetst exitplan en raadt een generiek "cloud-tenzij"-beleid af,
en het kabinet werkt aan een soevereine overheidscloud. Deze richtlijn is de
uitwerking voor ontwikkelaars van NeRDS-richtlijn 5,
[Gebruik cloud verantwoord en blijf wendbaar](https://nederlandsedigitaledienst.github.io/NeRDS/richtlijnen/cloud/).

## Rationale: Waarom cloud-native softwareontwikkeling?

- **Wendbaarheid** - Een applicatie die los staat van het platform kun je
  verhuizen als de leverancier, het aanbod of het beleid verandert. Zonder die
  scheiding is een exitplan niet uitvoerbaar.

- **Onafhankelijkheid** - Minder vendor lock-in. Services kunnen gemakkelijk
  worden geïsoleerd en beheerd, en het is eenvoudiger om nieuwe diensten toe te
  voegen of bestaande te vervangen.

- **Schaalbaarheid** - Overheidssoftware moet vaak kunnen omgaan met fluctuaties
  in gebruik, zoals pieken tijdens belastingaangiftes of verkiezingen. De
  software kan worden opgeschaald zonder verlies van prestaties.

- **Betrouwbaarheid** - Betere beschikbaarheid van services, met gecontroleerde
  en gestandaardiseerde deploymentprocessen.

- **Kostenbeheersing** - Capaciteit volgt het werkelijke gebruik. Dat scheelt
  alleen geld als je de kosten ook bewaakt, want variabele kosten lopen
  ongemerkt op.

## Doelgroep: Wie zijn er betrokken bij cloud-native softwareontwikkeling?

De volgende doelgroepen kunnen met cloud-native aan de slag: developers, DevOps
engineers, platform engineers, architecten en security officers.

Developers bouwen applicaties volgens cloud-native principes zoals twelve-factor
app. DevOps engineers richten CI/CD pipelines in en automatiseren deployment.
Platform engineers bouwen en beheren het onderliggende platform (zoals
Kubernetes). Architecten ontwerpen de cloud-native architectuur en bepalen waar
een systeem mag draaien. Security officers zorgen dat beveiligingsmaatregelen
zijn geïntegreerd in de cloud-native omgeving.

## Implementatie: Hoe implementeer je cloud-native softwareontwikkeling?

### Methoden en technieken

#### Containerisatie

Verpak je applicaties in containers zodat ze consistent draaien op verschillende
omgevingen. Containers zorgen voor betere isolatie en resource-efficiëntie.

#### Infrastructure as Code

Beheer je infrastructuur met code (bijvoorbeeld OpenTofu of Ansible) zodat deze
reproduceerbaar en versioneerbaar is. Een omgeving die volledig in code staat,
bouw je elders opnieuw op.

#### Portabiliteit

Bouw op open source en open standaarden, en vermijd diensten die maar bij één
leverancier bestaan. Heb je zo'n dienst toch nodig, zet hem dan achter een eigen
interface, zodat je hem later kunt vervangen. Een applicatie die in containers
draait op een cluster dat aan de
[Haven-standaard](https://haven.commonground.nl/) voldoet, is te verplaatsen
naar een ander Haven-cluster.

#### Exit en herstel

Ontwerp vanaf het begin hoe je weg kunt. Het cloudbeleid vraagt bij materieel
cloudgebruik een exitplan voor twee scenario's: een geplande overstap en een
onverwachte uitval van de dienst. Bewaar een back-up buiten de cloudomgeving van
dezelfde leverancier en oefen het herstel.

#### Sleutels en secrets in eigen beheer

Versleutel data bij opslag en verzending en houd het sleutelbeheer voor
vertrouwelijke gegevens bij voorkeur in eigen hand. Bewaar wachtwoorden,
API-keys en certificaten buiten je code, bijvoorbeeld met OpenBao.

### Tools

#### Container orchestratie

Voor het beheren van containers in productie gebruik je een orchestratieplatform
zoals Kubernetes. [Fundament](https://docs.fundament.projects.digilab.network/),
het open source platform waarop de proef met de soevereine overheidscloud
draait, levert beheerde Kubernetes-clusters.

#### CI/CD platforms

Voor continue integratie en deployment gebruik je platforms zoals GitLab CI,
GitHub Actions, Jenkins of Azure DevOps.

### Gerelateerde richtlijnen

- [3. Werk open source](/kennisbank/leidraad/open-source/)
- [4. Gebruik open standaarden](/kennisbank/leidraad/open-standaarden/)
- [6. Beveilig systemen en data](/kennisbank/leidraad/security/)

### Succescriteria

Wanneer voldoe je aan deze richtlijn?

- Je applicaties zijn gecontaineriseerd en draaien op een container orchestratie
  platform.
- Je hebt geautomatiseerde CI/CD pipelines.
- Je weet welke diensten van je leverancier je gebruikt die elders niet bestaan.

Wanneer ben je echt goed bezig?

- Je gebruikt Infrastructure as Code voor het beheren van je infrastructuur.
- Je hebt monitoring en observability geïmplementeerd voor je cloud-native
  applicaties.
- Je hebt je exit geoefend: de applicatie draait aantoonbaar ook op een ander
  platform.
- Je past chaos engineering toe om de veerkracht van je systeem te testen.

## Wanneer is deze richtlijn van toepassing?

Deze richtlijn is met name van toepassing bij nieuwe applicaties of bij
modernisering van bestaande applicaties. Het is vooral relevant wanneer
schaalbaarheid, flexibiliteit en onafhankelijkheid belangrijke eisen zijn.

Werk je voor de Rijksoverheid en gebruik je een clouddienst van een externe
leverancier voor een kerntaak, dan gelden de regels van het cloudbeleid: een
risicobeoordeling, een getoetst exitplan en een melding aan CISO Rijk. Gemeenten
gebruiken de handreiking van de VNG.

## Bronnen

### Wet- en regelgeving

Geen bekend.

### Beleid

- [Herziening Rijksbreed Cloudbeleid 2026](https://www.tweedekamer.nl/kamerstukken/brieven_regering/detail?id=2026Z15738&did=2026D35294),
  Kamerbrief van 3 juli 2026, met het
  [beleidsdocument](https://www.tweedekamer.nl/downloads/document?id=2026D35295)
- [Verkenning soevereine overheidscloud](https://www.tweedekamer.nl/kamerstukken/brieven_regering/detail?id=2026Z15306&did=2026D34379),
  Kamerbrief van 1 juli 2026
- [Eisen aan gemeentelijke Cloudvoorzieningen](https://vng.nl/nieuws/nieuwe-handreiking-helpt-bij-inkoop-clouddiensten),
  handreiking van de VNG
- [NeRDS-richtlijn 5: Gebruik cloud verantwoord en blijf wendbaar](https://nederlandsedigitaledienst.github.io/NeRDS/richtlijnen/cloud/)

### Standaarden

- [Haven](https://haven.commonground.nl/), standaard voor platformonafhankelijke
  cloudhosting op Kubernetes
- [EU Cloud Sovereignty Framework](https://commission.europa.eu/document/09579818-64a6-4dd5-9577-446ab6219113_en),
  Europese soevereiniteitsniveaus voor clouddiensten

### Communities

- [Common Ground](/kennisbank/data/communities/common-ground)

### Literatuur

- [Fundament](https://docs.fundament.projects.digilab.network/), documentatie en
  architectuurbesluiten van het open source platform achter de proef met de
  soevereine overheidscloud
- [Het Ontwerp van de soevereine clouddienst](https://www.digitaleoverheid.nl/nieuws-nds/nds-cloud-mijlpaal-publicatie-van-het-ontwerp/),
  ter openbare review sinds 31 augustus 2026

### Bronnen op developer.overheid.nl

Geen bekend.
