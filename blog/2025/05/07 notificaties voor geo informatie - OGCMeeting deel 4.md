---
authors: [frank-terpstra]
tags: [ogc, notificaties, asyncapi, websub, geo]
---

# Notificaties voor geo informatie - OGC meeting deel 4

## Open Geospatial Consortium(OGC) meeting

De 131ste Open Geospatial Consortium(OGC)-Technical Committee(TC) meeting vond plaats van 3 tot 6 maart 2025 in Rome, Italië. Het was een evenement voor professionals in de GIS industrie om samen te werken aan de toekomst van Geo- standaarden en technologieën. 

<!-- truncate -->

Namens Geonovum waren Frank Terpstra en Linda van den Brink aanwezig en hebben zij verslag gedaan van de belangrijkste inzichten.  

## Notificaties 

Binnen het OGC is er groeiende aandacht voor notificaties. Tijdens deze bijeenkomst werden twee belangrijke mechanismen besproken: 

• PubSub: dit wordt ontwikkeld als algemenere aanpak van het PubSub-mechanisme dat in de Environmental Data Retrieval (EDR) API wordt gebruikt. Dit vindt plaats in een aparte PubSub SWG, waarbij de AsyncAPI-standaard (afkomstig uit dezelfde hoek als OAS) wordt toegepast. 

• Websub: dit wordt toegepast als extensie op SensorThings API, waarbij de W3C websub standaard wordt toegepast. 

De PubSub aanpak biedt flexibiliteit in het te gebruiken protocol voor notificaties (zoals MQTT, AMQP, webhooks, etc…). Voor de inhoud van de berichten wordt overwogen om de Cloudevents standaard te volgen, een standaard die ook binnen de Nederlandse overheid wordt gebruikt. PubSub wordt gezien als de grootste kanshebber om als algemeen notificatiemechanisme binnen OGC geadopteerd te worden.  

Websub heeft echter ook voordelen. In zijn toepassing op sensorthingsAPI biedt het bijna automatisch functionaliteit voor abonnementenbeheer. Dit betekent dat gebruikers eenvoudig kunnen specifiëren op basis van welke gebeurtenissen ze een notificatie willen ontvangen. Dat is te danken aan het feit dat de SensorThingsAPI gebaseerd is op OData, welke een zeer expressieve en krachtige querytaal kent. Hierdoor kan men eenvoudig aangeven dat notificaties gewenst zijn wanneer aaneen specifieke (OData) query wordt voldaan. Bij andere notificatie methodieken is dit een complex vraagstuk en vraagt dat vaak extra programmeerwerk.  

Momenteel werkt Websub binnen OGC-context alleen met de SensorThingsAPI en uitsluitend met webhooks als transportmechanisme. Het is ook nog niet duidelijk of Websub met AsyncAPI beschreven kan worden (een expert vermoedde van niet, maar verder onderzoek is nodig). De WebSub-extensie van de SensorThings API zal binnenkort in publieke consultatie gaan. 

## Meedenken? 

Geïntrigeerd, wil je graag meedenken over de beveiliging van APIs? Dat kan in de werkgroep notificaties (georganiseerd door kennisplatform APIs) 

Stuur een mail naar API@geonovum.nl en wij zorgen dat je bij de werkgroep wordt aangemeld.