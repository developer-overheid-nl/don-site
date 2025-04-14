---
title: "Haven"
sidebar_position: 0
tags:
    - "kubernetes"
    - "infra"
    - "containerization"
    - "helm"
    - "docker"
---

Haven is een standaard voor platform-onafhankelijke cloud hosting. Het is een project dat is ontstaan vanuit de wens van Nederlandse gemeenten om op een uniforme manier hun Kubernetes cloud hosting te organiseren. Het project is onderdeel van de Common Ground architectuurvisie. Common Ground is een initiatief van de Vereniging van Nederlandse Gemeenten (VNG) waarin samengewerkt wordt aan principes voor een toekomstbestendige digitale architectuur.

## Voordelen

### Stimuleert hergebruik
Haven maakt het makkelijker voor gemeentes om open source applicaties van elkaar her te gebruiken. Van demo- tot productieomgevingen, alles is sneller uit te rollen.

### Makkelijk Haven compliant applicaties uitrollen
Applicaties die zijn aangemerkt als "geschikt voor Haven" kunnen makkelijk op Haven Compliant Clusters worden uitgerold. Dit bevordert de samenwerking tussen organisaties omdat ze makkelijker elkaars projecten kunnen hergebruiken.

Voorbeelden van applicaties die geschikt zijn voor Haven:
- [Signalen](https://github.com/signalen)
- [Generiek Zaakafhandelcomponent](https://github.com/generiekzaakafhandelcomponent) 
- [Keycloak](https://github.com/keycloak/keycloak)

### Correct gebruik van Kubernetes
De learning curve van Kubernetes is behoorlijk stijl. De Haven standaard zorgt ervoor dat je belangrijke principes volgt. Voorbeelden hiervan zijn het verzamelen van metrics maar ook dat je een recente versie van Kubernetes draait.

### Duidelijkheid voor leveranciers
Bij aanbestedingen is duidelijkheid cruciaal. Wanneer een gemeentelijke inkoper om een "Haven Compliant" applicatie of cluster vraagt, weet de leverancier precies wat er opgeleverd moet worden, wat leidt tot efficiëntere offertes en betere afstemming.

### Voorkomen van vendor lock-in
Omdat Haven open source is kan elke leverancier die daar oren naar heeft een Haven Compliant Kubernetes Cluster opleveren. 

### Haven is een levende standaard
Haven is een standaard die door verschillenden gemeentes en leveranciers van gemeentes in de praktijk wordt gebruikt. Veel Leveranciers geven aan dat ze blij zijn met de Haven standaard omdat het ze duidelijkheid geeft bij de communicatie met gemeenten. 

## Zorgt Haven ervoor dat ik pijnloos van AWS naar Azure kan overstappen?

## Haven Plus

## Hoe maak ik mijn applicatie geschikt voor een Haven Cluster?
De voorwaarden voor een project om op een Haven Cluster te kunnen draaien zijn:

- De opzet moet containerized zijn (bijvoorbeeld met Docker)
- Het project moet Helm charts bevatten
- Er moet een endpoint beschikbaar zijn voor metrics
- De app moeten kunnen schalen naar meerdere replica's

Op dit moment is er nog geen tooling of validator die checkt of je applicatie voldoet aan de voorwaarden om te draaien op een Haven Cluster.

## Haven Compliancy Checker
Deze CLI Tool stelt je in staat om pro-actief je Kubernetes cluster Haven Compliant te houden.

- [Meer info over Haven Comliancy Checker](./haven-compliancy-checker)

![Sreenshot FSC Policy Builder](./img/schermafbeelding-compliancy-checker.png)

## Welke organisaties zijn er al Haven compliant?

- [WIGO4IT](https://www.wigo4it.nl/)
- [Gemeente Utrecht](https://utrecht.nl)

## Links
- [Haven compliancy bij Wigo4it](https://www.wigo4it.nl/nieuws/haven-compliancy-bij-wigo4it/)