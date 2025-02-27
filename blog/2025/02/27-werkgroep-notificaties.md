---
authors: [kennisplatform-apis]
tags: [api, cloudevents]
---
# Werkgroep Notificaties

Het Kennisplatform API's gaat op woensdag 12 maart 2025 aan de slag met notificaties, dit patroon is geen REST API maar we merken wel dat dit onderwerp leeft (meeste stemmen bij laatste bijeenkomst kennisplatform APIs). We hebben nu al een standaard: Cloudevents. Die gaat over de inhoud van notificatieberichten. Maar nog drie onderwerpen staan open:

<!-- truncate -->

- Hoe beschrijf je een notificatie dienst (async API is een interessante standaard om hiervoor te bekijken) 
- via welk protocol verstuur je asynchrone berichten. Cloudevents laat dit vrij. Protocollen als webhooks, AMQP, MQTT, KAFKA, NATS, websockets  zijn allemaal mogelijk.
- Hoe kan je abonnementen regelen op asynchrone berichten?

Met deze werkgroep willen we kijken of we aanvullende standaarden nodig hebben naast cloud events en/of best practices om de drie openstaande punten in te vullen. We verwachten te komen tot een module notificaties als uitbreiding op de REST API design rules of juist een losstaande standaard. Heb jij hier een mening over? Denk je graag met ons mee? Meld je dan aan voor de werkgroep: [Aanmelden](https://www.formdesk.com/geonovum/notificeren)
