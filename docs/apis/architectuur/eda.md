---
tags: [adr, api, eda]
---

# Event Driven Architecture

De digitale samenleving vraagt om snelheid en actualiteit. Burgers willen live informatie, bedrijven verwachten actuele datasets en IoT-toepassingen hebben directe feedback nodig. Polling – telkens opnieuw vragen of er nieuws is – is inefficiënt. Event-Driven Architecture (EDA) biedt hier een alternatief: de server pusht events zodra er iets verandert.

## Van Polling naar Event-Driven

Het traditionele model is vergelijkbaar met steeds opnieuw opvragen van je banksaldo. Vaak krijg je hetzelfde antwoord en dit leidt tot:

- Hoge latency – updates komen altijd later.
- Verspilling van resources – veel nutteloze calls.
- Strakke koppeling – server en client zijn afhankelijk van elkaar.

Met event-driven API’s wordt data gepusht zodra er een event plaatsvindt. "Je salaris betaald, je banksaldo is nu 12345,67" Dit levert drie belangrijke voordelen op:

1. Real-time responsiviteit – updates verschijnen direct.
2. Schaalbaarheid en veerkracht – services kunnen los van elkaar functioneren en schalen.
3. Agiliteit – nieuwe functionaliteit kan eenvoudig inhaken op bestaande events.

## Communicatiepatronen

Afhankelijk van je use case kies je een real-time patroon:

- Webhooks – voor server-to-server notificaties, zoals een betaalprovider die een webshop informeert.
- WebSockets – voor bi-directionele communicatie, geschikt voor chats of games.
- Server-Sent Events (SSE) – voor éénrichtingsverkeer, zoals nieuwsfeeds of sportuitslagen.

## Best Practices voor ontwerp

Een goed ontworpen event-driven API kent dezelfde discipline als een REST-API:

- Gebruik rijke payloads zodat consumers niet hoeven na te vragen.
- pas de cloudevents standaard toe op basis van het NL profiel.
- Ontwerp een duidelijke event-taxonomie met logische naamgeving.
- Houd rekening met idempotentie voor dubbele events.
- Voorzie in subscription mechanismen en foutafhandeling.

## De rol van de API Gateway

Een moderne API-gateway is onmisbaar bij event-driven API’s denk aan:

- Protocoltranslatie – vertaal bijvoorbeeld WebSockets naar Kafka.
- Beveiliging – handhaaf standaarden als OAuth 2.0 en JWT ook op event-stromen.
- Observability – verzamel monitoring en logging centraal.

De trend gaat richting event-native API management: REST, gRPC en event-stromen vanuit één platform beheren. Dat biedt consistentie en een betere developer experience.

## Tot slot

De stap naar event-driven API’s is een strategische keuze om schaalbare, veerkrachtige en real-time applicaties te bouwen. Ontwerp met best practices, maak gebruik van een moderne gateway en ontwerp niet alleen voor het request, maar voor het nu.

Werk je bij een overheid en wil je experimenteren met event-driven API’s? Deel je ervaringen via developer.overheid.nl of neem deel aan het [Kennisplatform API's](https://developer.overheid.nl/communities/kennisplatform-apis/) en deel onderling ervaringe rond de NL API Strategie en eventoriëntatie. Samen maken we API’s slimmer, robuuster en toekomstbestendig.
