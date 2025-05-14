---
authors: [frank-terpstra]
tags: [provenance, ldv, geo, ogc, ai, seo, llm, security, oauth, openapi, oidc, notificaties, asyncapi, websub]
---
 
# Verslag Open Geospatial Consortium (OGC) meeting

De 131ste [Open Geospatial Consortium](https://www.ogc.org/) (OGC) - Technical Committee (TC) meeting vond plaats van 3 tot 6 maart 2025 in Rome, Italië. Het was een evenement voor professionals in de GIS industrie om samen te werken aan de toekomst van Geo- standaarden en technologieën. Namens Geonovum waren Frank Terpstra en Linda van den Brink aanwezig en hebben zij verslag gedaan van de belangrijkste inzichten.

<!-- truncate -->

## Integrity Provenance & Trust

Integrity, Provenance & Trust (IPT) is een belangrijk speerpunt van OGC dit jaar en zal in alle TC meetings prominent naar voren komen. Tijdens de future directions sessie stond IPT centraal. Namens Geonovum hebben wij de standaard voor transparantie in besluitvorming (Logboek Dataverwerkingen) gepresenteerd en hoe we deze toepassen op Geoinformatie.

In deze sessie werd bevestigd dat de W3C Prov-o standaard (en met name de bijbehorende ontologie) voor Provenance de grote gemene deler is. Voor de concrete vastlegging van provenance kiest ieder een eigen format, dat vaak wel naar Prov-o te mappen is. Een ander gedeeld inzicht was dat men zorgvuldig moet overwegen welke informatie vastgelegd en gedeeld wordt en dat dit niet te uitgebreid moet zijn.

De overige presentaties gingen sterk in op de technology om tot trust te komen (signing, encryptie, blockchain). Heel duidelijk is dat dit veld sterk in ontwikkeling is en dat veel initiatieven zich nog in de conceptuele of planningsfase bevinden. Het feit dat Geonovum een PoC uitvoert met daadwerkelijke software en echte data, geeft aan dat Geonovum hierin een voorloperspositie inneemt.

## Optimaliseren voor generatieve AI is het nieuwe SEO

Een opvallende ontwikkeling was de demonstratie van Steve Liang van Sensorup. Hij liet zien hoe verrassend goed Large Language models (LLMs) in staat zijn code te genereren op basis van standaarden. Met een korte prompt kon hij werkende code produceren die sensordata op een kaart visualiseerde, complete met de gewenste filters. Zijn analyse wees uit dat dit voor zijn standaard (Sensorthings API) zo effectief was doordat deze de OData-standaard (ontwikkeld door Microsoft) volgt. Daarnaast vermoedde hij dat de sterke ondersteuning voor OData in modellen van OpenAI (mede gefinancierd door Microsoft) hieraan bijdraagt. Tevens stelde hij dat de kwaliteit van de gegenereerde code toeneemt, naarmate er meer trainingdata aanwezig is. Dat is zeker het geval voor OData en REST API's. Concluderend is het optimaliseren van standaarden voor LLM's de nieuwe vorm van search engine optimization (SEO) en iets waar we voor adoptie en implementatieondersteuning van standaarden serieus rekening mee moeten houden. Tools die programmeurs al gebruiken en onbewust zorgen voor naleving van standaarden zijn immers beter dan validators en linters die hen assisteren.

## Beveiliging van Geo API's

Zorgen dat de beveiligings mechanismen van een API machine leesbaar interoperabel geadverteerd zijn is niet eenvoudig. OpenAPI specificatie is heel summier in de beveiligingsmetadata die je er kwijt kan. Daarom is de nieuwe Standards Working Group (SWG) OGC Common Security, in Rome van start gegaan. Frank Terpstra van Geonovum is één van de voorzitters. De SWG richt zich op de beveiliging van de nieuwe OGC API's. In de eerste bijeenkomst is geconcludeerd dat, anders dan in het verleden, de beveiliging van OGC API's direct kan aansluiten op generieke IT-beveiligingsstandaarden.

De SWG zal geen normatieve standaarden binnen het geodomein ontwikkelen voor een generiek IT-onderwerp. Het doel is om best practices of profielen op te stellen die verwijzen naar bestaande generieke IT-standaarden en die laten zien hoe je deze kunt toepassen. Als eerste wordt gekeken naar mechanismen om binnen een API te kunnen ontdekken welke security maatregelen er van kracht zijn (discovery). Tijdens de eerste bijeenkomst van de SWG is onderzocht hoe openEO en STAC (twee geo-frameworks) de bestaande generieke IT-standaarden (OpenAPI specification/OAS) uitbreiden voor dit discovery-proces. De komende tijd zal de SWG inventariseren welke best practices al beschikbaar zijn bij onder andere de IETF en sectoren als Defensie, Zorg en Financiën. Er wordt daarbij gekeken of de well-known text aanpak zoals die er is voor mechanismen als [OAuth](/kennisbank/security/standaarden/oauth) en [OpenIDconnect](/kennisbank/security/standaarden/oidc) kunnen worden hergebruikt daar waar de mogelijkheden van OAS alleen te beperkt zijn.

## Notificaties voor geo informatie

Binnen het OGC is er groeiende aandacht voor notificaties. Tijdens deze bijeenkomst werden twee belangrijke mechanismen besproken:

- PubSub: dit wordt ontwikkeld als algemenere aanpak van het PubSub-mechanisme dat in de Environmental Data Retrieval (EDR) API wordt gebruikt. Dit vindt plaats in een aparte PubSub SWG, waarbij de AsyncAPI-standaard (afkomstig uit dezelfde hoek als OAS) wordt toegepast.
- Websub: dit wordt toegepast als extensie op SensorThings API, waarbij de W3C websub standaard wordt toegepast.

De PubSub aanpak biedt flexibiliteit in het te gebruiken protocol voor notificaties (zoals MQTT, AMQP, webhooks, etc.). Voor de inhoud van de berichten wordt overwogen om de Cloudevents standaard te volgen, een standaard die ook binnen de Nederlandse overheid wordt gebruikt. PubSub wordt gezien als de grootste kanshebber om als algemeen notificatiemechanisme binnen OGC geadopteerd te worden.

Websub heeft echter ook voordelen. In zijn toepassing op sensorthingsAPI biedt het bijna automatisch functionaliteit voor abonnementenbeheer. Dit betekent dat gebruikers eenvoudig kunnen specifiëren op basis van welke gebeurtenissen ze een notificatie willen ontvangen. Dat is te danken aan het feit dat de SensorThingsAPI gebaseerd is op OData, welke een zeer expressieve en krachtige querytaal kent. Hierdoor kan men eenvoudig aangeven dat notificaties gewenst zijn wanneer aaneen specifieke (OData) query wordt voldaan. Bij andere notificatie methodieken is dit een complex vraagstuk en vraagt dat vaak extra programmeerwerk.

Momenteel werkt Websub binnen OGC-context alleen met de SensorThingsAPI en uitsluitend met webhooks als transportmechanisme. Het is ook nog niet duidelijk of Websub met AsyncAPI beschreven kan worden (een expert vermoedde van niet, maar verder onderzoek is nodig). De WebSub-extensie van de SensorThings API zal binnenkort in publieke consultatie gaan.

## Meedenken?

Geïntrigeerd over deze onderwerpen, en wil je graag meedenken over de beveiliging van API's of notificaties? Dat kan in de werkgroepen beveiliging en notificaties (georganiseerd door [Kennisplatform API's](/communities/kennisplatform-apis/)). Wil je meedenken over Provenance? Dat kan in de werkgroep Data lineage (georganiseerd door bureau MIDO).

Stuur een mail naar [API@geonovum.nl](mailto:api@geonovum.nl) en wij zorgen dat je bij de werkgroep wordt aangemeld.
