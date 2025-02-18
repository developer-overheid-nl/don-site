---
slug: waarom-zijn-api-design-rules-zo-belangrijk
authors: [joost-farla]
tags: [adr, api-design]
date: 2023-09-20
---
# Waarom zijn API design rules zo belangrijk?

Al sinds 2020 staan de [REST API Design Rules](https://logius-standaarden.github.io/API-Design-Rules/) op de _pas-toe-of-leg-uit_ lijst van het Forum Standaardisatie, wat maakt dat deze verplicht zijn gesteld voor alle Nederlandse overheidsorganisaties. Deze design rules beschrijven een set regels waar een REST API aan zou moeten voldoen, met als doel meer uniformiteit aan te brengen in het informatielandschap van de overheid. In dit artikel geven we een aantal argumenten waarom API design rules zo waardevol zijn.

<!-- truncate -->

## Interoperabiliteit

Misschien wel de belangrijkste reden om de API design rules te volgen is interoperabiliteit. API's worden gebruikt om verschillende informatiesystemen met elkaar te laten communiceren, vaak over de grenzen van teams of organisaties heen. Door gemeenschappelijke conventies te volgen kunnen verschillende systemen, mogelijk van verschillende leveranciers, beter met elkaar communiceren omdat ze dezelfde verwachtingen hebben over de structuur en werking van de API. Dit leidt uiteindelijk tot minder maatwerk, hogere kwaliteit en betere samenwerking.

Stel je voor dat een gemeente een website en/of mobiele app wil introduceren om burgers real-time toegang te geven tot informatie over bussen, trams en treinen in een stad. Door het volgen van dezelfde conventies kunnen verschillende vervoerders op een consistente manier gegevens beschikbaar stellen, zodat deze kunnen worden samengebracht in dit systeem. Hiermee wordt voorkomen dat voor iedere vervoerder een compleet verschillende client-implementatie benodigd is, wat kostbaar en onnodig complex zou zijn.

## Voorspelbaarheid

Wanneer ontwikkelaars bekend zijn met bepaalde standaard conventies, kunnen ze gemakkelijker voorspellen hoe een API zal reageren op bepaalde verzoeken en hoe ze de API moeten gebruiken. Dit verlaagt de leercurve en vermindert de kans op fouten. Kortom: de API design rules maken het gedrag van een API voorspelbaarder en het gebruik hiermee laagdrempeliger.

## Herbruikbaarheid

Door de API design rules te implementeren wordt hergebruik van patronen en componenten bevorderd. Ontwikkelaars kunnen eerder opgedane kennis toepassen op nieuwe API's die dezelfde conventies volgen, waardoor de ontwikkeltijd wordt gereduceerd. Daarnaast kunnen componenten als herbruikbare bouwstenen worden ontwikkeld, zodat ze niet voor iedere API opnieuw moeten worden ontwikkeld. Deze bouwstenen zouden zelfs tussen organisaties kunnen worden gedeeld.

## Beheersbaarheid

Zodra een API verder wordt doorontwikkeld, wordt lifecycle management steeds belangrijker. De API design rules beschrijven standaard regels voor relevante aspecten, waaronder versionering en deprecation. Door deze regels te volgen kan een API op een beheersbare manier meegroeien met veranderende behoeften, zonder het risico om bestaande integraties te verstoren. Als een organisatie wijzigingen wil aanbrengen in een API, kan men dit zorgvuldig doen op een manier die geen ongewenste neveneffecten introduceert.

## Beveiliging

De API design rules stellen strikte voorwaarden aan het beveiligen van API’s, waardoor organisaties worden gestimuleerd om gegevens te beveiligen met passende beveiligingsmaatregelen. Door deze maatregelen op een gestandaardiseerde manier te implementeren, wordt het risico op menselijke fouten verminderd en wordt de beveiliging van API's versterkt. Ook kunnen de design rules ontwikkelaars helpen om zich te beschermen tegen veelvoorkomende kwetsbaarheden en risico's.

## Conclusie

De API design rules dragen op verschillende vlakken bij aan moderne software ontwikkeling. Wil je weten of jouw API ook voldoet aan de API Design Rules? Voeg dan je API toe op [developer.overheid.nl](https://developer.overheid.nl/apis) en laat (een deel van) de API design rules automatisch valideren!