---
authors: [thomas-rooijakkers]
tags: [rest, api, security, security-by-design, validator, rust, tool, openapi, open-source, development, devops]
---

# WuppieFuzz: Coverage-Guided REST API Fuzzing voor veiligere digitale Overheidsdiensten
In een tijd waarin digitale overheidsdiensten steeds vaker via REST API’s communiceren, is het waarborgen van de veiligheid van deze interfaces cruciaal. **[WuppieFuzz](https://github.com/TNO-S3/WuppieFuzz)**, ontwikkeld door [TNO](https://tno.nl), is een open-source, coverage-guided fuzzer die specifiek is ontworpen voor het testen van REST API’s. Het doel: kwetsbaarheden en bugs opsporen voordat ze misbruikt kunnen worden, met een sterke focus op gebruiksvriendelijkheid, modulariteit en inzichtelijkheid.

![Logo of WuppieFuzz](./img/WuppieFuzz.svg)

<!-- truncate -->

# Hoe werkt WuppieFuzz?
WuppieFuzz is gebouwd bovenop het [LibAFL-framework](https://github.com/AFLplusplus/LibAFL) en ondersteunt drie testmodi:
- **Black box**: zonder kennis van de interne werking.
- **Grey box**: met beperkte kennis en observatie van gedrag.
- **White box**: met volledige toegang tot de broncode en interne structuur.

Op basis van een [OpenAPI-specificatie](/kennisbank/apis/openapi-specification) genereert WuppieFuzz automatisch zinvolle sequenties van HTTP-requests. Deze sequenties worden vervolgens gemuteerd om diepere logica en edge cases in de API te bereiken. De tool meet test coverage via response-codes en/of via instrumentatie van de backend (bijv. met `JaCoCo` voor Java of `coverage.py` voor Python).

## Waarom is WuppieFuzz Relevant voor de Overheid?
REST API’s vormen de ruggengraat van veel overheidsapplicaties. Denk aan systemen voor burgerzaken, vergunningverlening of gegevensuitwisseling tussen departementen. WuppieFuzz helpt ontwikkelaars en testers om:
- Automatisch kwetsbaarheden te detecteren.
- Complexe sequentiële bugs op te sporen.
- Afwijkingen van de API-specificatie te identificeren.

## Gebruiksgemak en Extensibiliteit
WuppieFuzz is ontworpen met de eindgebruiker in gedachten:
- Out-of-the-box configuratie.
- Modulaire opzet voor uitbreiding naar andere programmeertalen.
- Open source beschikbaarheid en vrij te gebruiken middels een Apache 2.0-licentie.

## Doe Mee: Word Contributor aan WuppieFuzz!
WuppieFuzz is een community-driven project. We nodigen ontwikkelaars, testers en security-specialisten uit om bij te dragen aan de verdere ontwikkeling van de tool. Of je nu wilt helpen met:
- Nieuwe mutatiestrategieën,
- Integratie met andere programmeertalen,
- Verbetering van het dashboard,
- Of documentatie en tutorials,

... jouw bijdrage is welkom!

Bekijk de repository op [https://github.com/TNO-S3/WuppieFuzz](https://github.com/TNO-S3/WuppieFuzz) en open een issue of pull request. Samen maken we REST API’s robuuster en veiliger.

## Conclusie
WuppieFuzz biedt een krachtige, toegankelijke en uitbreidbare oplossing voor het testen van REST API’s binnen overheidscontexten. Door gebruik te maken van coverage-guided fuzzing en slimme mutatiestrategieën, helpt het ontwikkelaars om robuuste, betrouwbare en veilige digitale diensten te bouwen.

Voor meer informatie, zie de [GitHub-repository](https://github.com/TNO-S3/WuppieFuzz).
