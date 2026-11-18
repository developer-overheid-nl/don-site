---
content_type: standaard
tags: [api, api-design, eda, asyncapi]
title: "AsyncAPI"
---

# AsyncAPI

:::info[Status binnen de overheid]

AsyncAPI staat op dit moment niet op de lijst van standaarden zoals vastgelegd bij Forum Standaardisatie.
De inzet van AsyncAPI is daarmee een eigen afweging per organisatie, zonder verplichting
om die te verantwoorden, maar ook zonder vastgesteld kader: een NLGov-profiel of
toetsingskader voor AsyncAPIbestaat niet. Voor handreikingen over hoe deze afweging
te maken is er een reeks aan blogposts op developer.overheid.nl te vinden.
Ook is deelname aan de werkgroep AsyncAPI hier een manier voor; deelname
is vrijblijvend en meer dan welkom. Aanmelden hiervoor kan via <f.deutekom@geonovum.nl>

:::

[AsyncAPI](https://www.asyncapi.com/en) is een standaard voor het beschrijven van API's die zich specifiek toespitst op asynchrone API's en Event-Driven Architecture (EDA)
Het is een initiatief opgezet met als doel om het werk van OAS voort te zetten en de huidige staat van EDA te verbeteren. Het maakt dan ook gebruik van veel bekende structuren en taal die men kent van [OAS](/kennisbank/api-ontwikkeling/standaarden/openapi-specification/).

De meest recente versie is 3.1.0, welke [hier](https://www.asyncapi.com/docs/reference/specification/v3.1.0) in zijn volledigheid terug te vinden is.

## Kenmerken van AsyncAPI

Het meest voordehandliggende kenmerk is dat AsyncAPI een expliciete beschrijving levert van een Event contract in een "taal" welke onderdelen bevat die aansluiten op Event-Driven situaties. De onderdelen van een AsyncAPI document dienen een doel, waarvan sommigen bekend voor zullen komen voor wie bekend is met OAS:

- **Server**: waar leeft het geheel dat beschreven is
- **Channels**: beschrijving van de plek waar Events/berichten plaatsvinden
- **Messages**: structuur van Event berichten
- **Operations**: wat doet een applicatie met de beschreven Events/berichten
- **Schemas**: hoe moet de data eruit zien
- **Components**: herbruikbare fragmenten die in het document aangeroepen kunnen worden

Daarnaast zijn er nog een aantal andere noemenswaardige punten:

- **Protocol-agnostisch:** of men nou MQTT, AMQP, HTTP, WebSockets, Kafka of iets heel anders wil gebruiken, AsyncAPI ondervangt het allemaal
- **Multi-schema complementair:** hergebruik van bestaande schema's is zonder enige aanpassing mogelijk; de default is JSON-schema, maar Apache Avro, OpenAPI en meer zijn ook native ondersteund.
- **Machine-leesbaar:** door standaard geschreven te zijn in JSON of YAML is alles uit te lezen met de bijgeleverde tooling én bestaande development tools
- **Ingebouwde security & bestuurbaarheid:** naast manieren om authenticatie en autorisatie te documenteren (OAut2, SASL, X.509 certificaten e.a.) is het ook te integreren in linters om API-design regels af te dwingen

## Tooling e.a

Deze standaard voor het beschrijven van (asynchrone) API's gaat gepaard met een suite aan [tooling](https://www.asyncapi.com/tools) gericht op developer behoeften. Denk hierin aan:

- **[Studio](https://studio.asyncapi.com/):** vergelijkbaar met de welbekende Swagger Editor, valideert specificatie en stelt verbeteringen voor
- **Document Generator:** genereert mens-leesbare API documentatie op basis van AsyncAPI specificaties
- **Document Converter:** zet AsyncAPI specificaties om naar andere versies, of zet OAS specificaties om naar AsyncAPI (waar mogelijk)
- **Code Generator:** genereert code op basis van AsyncAPI documentatie en code templates, welke door de community bijgewerkt worden (of welke zelf opgesteld kunnen worden).

Veel van deze tooling is als lokale CLI tool te gebruiken, waardoor het te integreren is in allerhande CI/CD oplossingen en dus past in bestaande development workflows.

## Toepassingsgebied

Het toepassingsgebied van AsyncAPI binnen de Nederlandse Overheid is een lopende discussie, welke binnen de Werkgroep AsyncAPI wordt gevoerd. Dit is een groep aan experts vanuit alle hoeken van de Nederlandse overheid welke maandelijks bij elkaar komt.
AsyncAPI biedt bij uitstek middelen om asynchrone API's binnen een Event-Driven landschap te beschrijven, maar er is nog geen eenduidig "probleem" of casus binnen de Nederlandse Overheid welke hiermee opgelost lijkt te worden.
De werkgroep pakt geregeld casussen uit het veld op en legt ze onder de loep om dit verder uit te werken. Voor wie vast een handvat wil om de overweging te maken, neem de volgende punten in acht:

- AsyncAPI is een beschrijvingstandaard die machineleesbaar is, en daardoor prima in productie in te zetten voor asynchrone API documentatie
- AsyncAPI levert documentatie op die informatie bevat over Events, de plek waar die Events leven en hoe ze eruit zien
- AsyncAPI vertelt niks over event-metadata; hiervoor is een standaard als [CloudEvents](/kennisbank/api-ontwikkeling/standaarden/cloudevents) aangetoond als zeer complementair
- AsyncAPI levert meerwaarde bij het beschrijven van asynchrone, Event-Driven situaties waar veel onbekende afnemers in het spel zijn en er grote kans is op evolutie in het eventcontract
- Voordat men overgaat tot het gebruik van AsyncAPI, denk eerst na over eigenaarschap, discovery en distributie voordat men blind aanneemt dat AsyncAPI voor elke asynchrone situatie vereist is

AsyncAPI is geenszinds een vervanging van OAS, het is een aanvullende standaard die in sommige situaties betere documentatie op kan leveren. Veel casussen die we tot nu toe gezien hebben tonen aan dat het gebruik van beiden tot de beste uitkomst leidt, zolang er goede keuzes worden gemaakt over welke wanneer in te zetten. Voordat men AsyncAPI in de armen neemt loont het om eerst een helder beeld te schetsen van welke exacte voordelen het oplevert in de specifieke situatie waar men het voor overweegt.
