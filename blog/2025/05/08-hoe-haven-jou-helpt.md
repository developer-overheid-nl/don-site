---
authors: [tom-ootes]
tags: [haven, kubernetes, common-ground]
---
# Met Haven wordt je écht Digitaal Autonoom, en kan je uiteindelijk zonder Amerikaanse cloudproviders
<!-- # Hoe Haven jou heel concreet helpt bij het bereiken van Digitale Autonomie, weg van Amerikaanse cloudproviders -->
<!-- # Word echt Digitaal Autonoom met de Haven-standaard -->
<!-- # Met de Haven Standaard word je écht Digitaal Autonoom: in de praktijk -->



Door alle perikelen die zich op het moment voltrekken in de Verenigde Staten staat het thema *Digitale Autonomie* ineens overal boven aan de agenda in overheids-it-land. Er wordt veel over gesproken, maar over hoe we precies onafhankelijk gaan worden lijkt nog geen consensus te bestaan.

Voor complexe problemen als deze is nooit een silver bullet.  Echter is er een project dat je helpt voorsorteren op de nooduitgang: de Kubernetes-standaard [Haven](https://haven.commonground.nl/). In dit artikel omschrijf ik welke rol ik voor Haven(+) zie als **oplossing** voor **Digitale Autonomie**.

<!-- truncate -->


Door alle perikelen die zich op het moment voltrekken in de Verenigde Staten staat het thema Digitale Autonomie ineens overal boven aan de agenda in overheids-it-land. Er wordt veel over gesproken maar over hoe we precies onafhankelijk gaan worden is nog geen consensus.

Voor complexe problemen als deze is nooit een silver bullet. Toch heb ik sinds ik aan developer.overheid.nl werk ontdekt dat er allerlei open source projecten en standaarden binnen onze overheid klaar staan om gebruikt te worden, die ons kunnen helpen bij het oplossen van dit vraagstuk. Mijn mening is dat deze praktische initiatieven die direct gebruikt kunnen worden in het IT-landschap van organisaties, niet genoeg aandacht krijgen te midden van al het gepraat.

Een van deze projecten is in mijn optiek Haven: een standaard die bestaat uit criteria voor het correct en secure opzetten van Kubernetes clusters. In dit artikel omschrijf ik hoe veel organisaties en bedrijven in de armen van hyperscalers zoals AWS, Azure en Google Cloud zijn gelopen en wat de nadelen daarvan zijn. Vervolgens schets ik welke rol ik voor Haven(+) zie als oplossing voor dit probleem.



:::success[**TL;DR**]

Logius werkt toe naar een 2.1 versie op basis van de input van API experts en werkt hierbij samen met developer.overheid.nl en het Kennisplatform API's.
Wijzigingen worden behandeld in een technisch overleg, waarbij beheerorganisaties het draagvlak borgen en extra tooling (zoals een linter) aanleveren ter implementatieondersteuning.
Alle genoemde partijen, tooling en documenten zijn openbaar en input wordt zeer gewaardeerd, dus doe mee!

:::

### De massale migratie naar Amerikaanse cloudproviders

Amerikaanse cloudproviders zijn het afgelopen decennium uitgegroeid tot extreem winstgevende bedrijven, waar inmiddels het grootste deel van het internet opdraait. De top 3 grootste public cloud service providers (Amazon Web Services, Microsoft en Google) hebben momenteel gezamenlijk meer dan 72% van de wereldwijde markt in handen.[^1]. In Nederland ontstond er dit jaar in de politiek gelukkig een nieuwe geluid op dit gebied. Zo nam de Tweede Kamer in maart acht moties aan 

![Haven](./img/stadskantoor_2.jpg)
*Stadskantoor in Utrecht, onder andere hier wordt de Haven-standaard ontwikkeld. Mede door de gemeente Utrecht. Foto door [Stefan van E](https://www.flickr.com/photos/stefanve/26230670274). [Licentie: Deed - Attribution 2.0 Generic - Creative Commons ](https://creativecommons.org/licenses/by/2.0/deed.en)*



### Dit nadeel bestond al: hyperscalers zijn snel duur als je veel opschaalt
Voordat er zorgen ontstonden over de omvang van de migratie naar de Amerikaanse cloud, waren er in principe ook al redenen om niet met deze "hyperscalers" in zee te gaan. Zo kunnen de kosten van dergelijke platforms op de lange termijn, wanneer er meer resources nodig zijn, flink uit de klauwen lopen.

### Makkelijk beschikbare resources: weinig reden tot optimalisatie infra/ software
Nog een interessante dynamiek hierbij is dat hyperscalers je erg goed kunnen helpen bij het sneller maken van software die eigenlijk inefficiënt is. Doordat deze platforms zo goed zijn in schalen is het een peulenschil om meer resources toe te wijzen aan een slecht geoptimaliseerde applicatie. Hierdoor zal deze toch weer iets beter gaan presteren. Op deze manier wordt het dus wel erg aantrekkelijk om een korte-termijn keuze te maken en dus niet te kiezen voor het verbeteren van software maar het op te lossen door er maar weer meer resources tegenaan te gooien. Het resultaat is makkelijk in te vullen; de kosten blijven oplopen.

### Waarom zijn Amerikaanse cloudproviders zo aantrekkelijk?
Amerikaanse cloudproviders zijn heel goed in één ding: het creëren van een hele goede developer experience. Ze hebben de afgelopen jaren veel geïnvesteerd in het ontwikkelen van services die dagelijkse problemen van developers op een effectieve manier oplossen. Daarnaast heeft de introductie van het pay-as-you-go prijsmodel de toegangsdrempel verlaagt om operationele uitgaven te verruilen voor directe kapitaaluitgaven. De meest populaire clouddiensten zijn op het moment:

**Basisdiensten:**

- Computing: AWS EC2, Azure VMs, Google Compute Engine
- Object storage: AWS S3, Azure Blob Storage, Google Cloud Storage
- Databases: AWS RDS/DynamoDB, Azure SQL/Cosmos DB, Google Cloud SQL

**Groeidiensten:**

- Serverless: AWS Lambda, Azure Functions, Google Cloud Functions
- Containers: AWS EKS/ECS, Azure Kubernetes Service, Google GKE
- AI/ML: AWS SageMaker, Azure ML, Google Vertex AI
- Data analytics: AWS Redshift, Azure Synapse, Google BigQuery



![Haven](./img/stadskantoor_4.jpg)
*Stadskantoor in Utrecht. Foto door [Eric de Redelijkheid](https://www.flickr.com/photos/ericdere/36957944765/). [Licentie: Deed - Attribution 2.0 Generic - Creative Commons ](https://creativecommons.org/licenses/by/2.0/deed.en)*

### Microsoft Azure/ AWS werden de defacto standaard
Door het brede scala aan services en de schaalbaarheid werden Azure en AWS extreem populaire cloudproviders. Doordat deze bedrijven vroeg zijn begonnen met het investeren in deze sector en er in Amerika makkelijk toegang was tot tech-talent hadden ze grote voordelen. Ook hadden deze bedrijven het voordeel dat kapitaal des tijds goedkoop voor handen was en maakten ze slim gebruik van ecosystemen van partner-bedrijven. 

Doordat Microsoft al jaren dé grote it-leverancier is voor de Nederlandse overheid, was de overstap op Microsoft Azure een logische. Echter rijst nu de vraag: is het handig om strategisch zo afhankelijk te zijn van een Amerikaans bedrijf? Het is bekend dat de Amerikaanse overheid mee mag kijken in de infrastructuur van Amerikaanse bedrijven als zij dat wil, ook als de servers daarvan op Europees grondgebied staan. Servers op Europees grondgebied zijn dus ook geen oplossing voor dit probleem.

### De Haven-criteria als handvatten voor de overstap naar Europese cloudproviders
Dan de oplossing voor dit problemen. Als je als organisatie toe beweegt naar een situatie waarin je er voor zorgt dat je Kubernetes clusters allemaal Haven-compliant zijn werk je toe naar een gestandaardiseerde situatie. Dit zorgt er voor dat het **makkelijker wordt** om vervolgens later de boel te migreren naar een **Europese cloudprovider**. Naar welke cloudproviders je precies allemaal kunt overstappen heeft het team van Haven netjes voor je [opgesomt in een lijstje](https://haven.commonground.nl/techniek/aan-de-slag).

### Maar dan heb ik toch nog geen vervanging van mijn mooie Azure/AWS services? Toch wel: met Haven+
Je hebt inderdaad niet direct vervanging voor je mooie glimmende Azure/AWS services. Maar je kan ze wel langzamerhand gaan vervangen door Open Source componenten die je zelf opzet. En het mooie is; een aantal van deze Open Source componenten heeft het Haven-team al voor je beschikbaar gemaakt in de vorm van een project genaamd [**Haven+**](https://gitlab.com/commonground/haven/havenplus).

Dit project bevat misschien nog niet alles wat je nodig hebt als organisatie, maar gelukkig staat niets je in de weg om mee te bouwen aan deze componenten met het Haven team!

![Haven](./img/stadskantoor_6.jpg)
*Stadskantoor in Utrecht. Foto door [Gerard Stolk](https://www.flickr.com/photos/gerardstolk/39472632000/). [Licentie: Deed - Attribution 2.0 Generic - Creative Commons ](https://creativecommons.org/licenses/by/2.0/deed.en)*

### Toegegeven vereiste: je hele infra moet cloud-native zijn
Dan is er nog wel middelgrote olifant in de kamer. Sommige organisaties zijn nog verre van cloud-native. Er zullen organisaties zijn die nog steeds met VPS'en werken, en een infrastructuur hebben die zich her en der verspreid over de organisatie bevindt. 

Feit is dat Kubernetes heden ten dage met goede redenen de marktstandaard is. Dit vanwege de goede schaalbaarheid en de grip op security die je erdoor kunt krijgen. Mij lijkt het dus sowieso slim om als organisatie te koersen op het omzetten van je infra naar cloud-native.

### Dankwoord

Ik wil graag een paar mensen bedanken die de tijd hebben genomen gesprekken met mij te voeren over dit onderwerp. Zo voerde ik een goed gesprek met **Dian van Heijningen** van **Wigo4it** over hun infrastructuur. Ook hield ik met **Pauline van Rotterdam (Technisch PO)** en **Sander van Thillo (Developer)** van het **Haven** team een interview. Dit interview zal hier later trouwens ook gepubliceerd worden.

## Handige links

* [Ons kennisbank artikel over Haven](/kennisbank/infra/standaarden/haven/)
* [Slack-kanaal van Haven](https://samenorganiseren.slack.com/archives/CGCPJE599)
* [Mattermost kanaal van Haven+](https://digilab.overheid.nl/chat/digilab/channels/havenplus)
* [Naar de lijst met checks van Haven](https://haven.commonground.nl/techniek/checks)


[^1]: Marktstudie Cloud Services: voortdurende consolidatie, aanhoudende groei (https://www.bdo.nl/nl-nl/actueel/marktstudie-cloud-services-voortdurende-consolidatie-aanhoudende-groei)
[^2]: https://ibestuur.nl/artikel/kamer-zet-inhaalspurt-digitale-autonomie-in/