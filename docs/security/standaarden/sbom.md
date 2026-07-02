---
content_type: standaard
tags:
  - "informatiebeveiliging"
title: "SBOM uitgelegd: CycloneDX en SPDX"
---

## Wat is een SBOM?

Een **Software Bill of Materials (SBOM)** is een gestructureerde inventaris van
alle softwarecomponenten waaruit een applicatie, systeem of container bestaat.
Vergelijk het met een ingrediëntenlijst op een voedingsproduct: een SBOM laat
zien welke bibliotheken, frameworks, pakketten en afhankelijkheden zijn gebruikt
tijdens de ontwikkeling van software.

Een SBOM bevat doorgaans informatie zoals:

* Naam van de component
* Versie
* Leverancier of auteur
* Licentie-informatie
* Afhankelijkheden
* Unieke identificaties per component (zoals PURL of CPE)
* Hashes voor integriteitscontrole

Door deze informatie beschikbaar te maken ontstaat meer transparantie in de
software supply chain en kunnen organisaties sneller reageren op kwetsbaarheden
zoals Log4Shell of toekomstige supply-chain-aanvallen.

## Waarom is een SBOM belangrijk?

Software bestaat tegenwoordig grotendeels uit open-source componenten en externe
libraries. Vaak bevat een applicatie honderden of zelfs duizenden directe en
indirecte afhankelijkheden.

Een SBOM helpt organisaties bij:

### Kwetsbaarheden identificeren

Wanneer een nieuwe CVE wordt gepubliceerd, kan direct worden vastgesteld of een
kwetsbare component aanwezig is in de software.

### Compliance en audits

SBOM's ondersteunen compliance-eisen rondom softwareleveranciers, regelgeving en
interne governance. Steeds meer overheden en sectoren vragen om inzicht in
gebruikte softwarecomponenten.

### Licentiebeheer

Open-source componenten brengen verschillende licentievoorwaarden met zich mee.
Een SBOM maakt deze inzichtelijk en ondersteunt licentiecompliance.

### Software supply chain security

Een actuele SBOM maakt het mogelijk om risico's binnen de softwareketen beter te
beheersen en sneller incidenten te analyseren.

## De twee belangrijkste SBOM-standaarden

Binnen de industrie worden vooral twee standaarden gebruikt:

1. CycloneDX
2. SPDX

Beide zijn breed geaccepteerd, machineleesbaar en worden ondersteund door de
meeste moderne security- en DevSecOps-tools. Beide zijn ook voorgedragen aan
Forum Standaardisatie op opgenomen te worden op de 'Pas toe of leg uit' lijst.

---

## CycloneDX

[CycloneDX](https://cyclonedx.org?utm_source=chatgpt.com) is een open standaard
die wordt beheerd door de OWASP Foundation en specifiek is ontwikkeld voor
software supply chain security.

### Kenmerken van CycloneDX

* Sterke focus op beveiliging
* Ondersteuning voor kwetsbaarheidsinformatie
* Ondersteuning voor VEX (Vulnerability Exploitability eXchange)
* Geschikt voor applicaties, containers, SaaS-diensten en infrastructuur
* Compact en efficiënt formaat
* Beschikbaar in JSON, XML en andere serialisaties

### Wanneer kies je CycloneDX?

CycloneDX is vaak de voorkeurskeuze wanneer:

* Security monitoring centraal staat
* Vulnerability management wordt geautomatiseerd
* Integratie met DevSecOps-processen gewenst is
* SBOM's onderdeel zijn van CI/CD-pipelines

### Voorbeeld (vereenvoudigd)

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.6",
  "components": [
    {
      "type": "library",
      "name": "log4j-core",
      "version": "2.17.1"
    }
  ]
}
```

---

## SPDX

**SPDX (Software Package Data Exchange)** is een standaard die oorspronkelijk
door de Linux Foundation werd ontwikkeld en tegenwoordig een internationale
ISO-standaard is (ISO/IEC 5962).

### Kenmerken van SPDX

* Zeer uitgebreide licentie-informatie
* Sterke focus op compliance en governance
* Breed geaccepteerd binnen open-source ecosystemen
* Ondersteuning voor software-, document- en relatiegegevens
* Beschikbaar in JSON, YAML, RDF en andere formaten

### Wanneer kies je SPDX?

SPDX is vaak de beste keuze wanneer:

* Licentiebeheer belangrijk is
* Open-source compliance centraal staat
* Juridische of auditvereisten leidend zijn
* Samenwerking plaatsvindt met partijen die SPDX verplicht stellen

### Voorbeeld (vereenvoudigd)

```json
{
  "spdxVersion": "SPDX-2.3",
  "packages": [
    {
      "name": "log4j-core",
      "versionInfo": "2.17.1",
      "licenseConcluded": "Apache-2.0"
    }
  ]
}
```

---

## CycloneDX versus SPDX

| Onderwerp            | CycloneDX                         | SPDX                           |
| -------------------- | --------------------------------- | ------------------------------ |
| Beheer               | OWASP                             | Linux Foundation / ISO         |
| Hoofddoel            | Security en supply chain risico's | Licentie- en compliancebeheer  |
| Kwetsbaarheden       | Uitgebreide ondersteuning         | Beperkte focus                 |
| VEX-ondersteuning    | Sterk geïntegreerd                | Mogelijk, maar minder centraal |
| Licentiebeheer       | Goed                              | Uitstekend                     |
| Gebruik in DevSecOps | Zeer populair                     | Populair                       |
| ISO-standaard        | ECMA-424                          | ISO/IEC 5962                   |

In de praktijk ondersteunen veel toolingplatformen beide standaarden en is
conversie vaak mogelijk. De keuze hangt daarom meestal af van het primaire doel:
security of compliance.

## SBOM in de praktijk

Een moderne DevSecOps-pijplijn genereert automatisch een SBOM tijdens het
buildproces. Veelgebruikte tools zijn onder andere:

* Syft
* Trivy
* Dependency-Track
* OWASP Dependency-Check
* GitHub Advanced Security
* GitLab Security Scanning

De gegenereerde SBOM kan vervolgens worden gebruikt voor:

* Vulnerability scanning
* Compliance controles
* Leveranciersbeoordelingen
* Incident response
* Software audits

## SBOM, NIS2 en de Cyber Resilience Act (CRA)

De adoptie van SBOM's wordt niet alleen gedreven door security best practices,
maar ook steeds meer door Europese wet- en regelgeving. Zowel de
**NIS2-richtlijn** (in Nederland geïmplementeerd via de Cyberbeveiligingswet)
als de **Cyber Resilience Act (CRA)** leggen organisaties en leveranciers
verantwoordelijkheden op rondom software supply chain security, risicobeheer en
kwetsbaarhedenmanagement.

### NIS2 en de Cyberbeveiligingswet

NIS2 verplicht essentiële en belangrijke organisaties om passende maatregelen te
nemen voor het beheersen van cyberrisico's binnen hun gehele toeleveringsketen.
Daarbij hoort ook het verkrijgen van inzicht in de gebruikte softwarecomponenten
, leveranciers en afhankelijkheden die onderdeel zijn van bedrijfskritische
systemen. Organisaties moeten kunnen aantonen dat zij risico's identificeren,
beoordelen en beheersen, inclusief risico's die voortkomen uit software van
derden en open-source componenten.

Hoewel NIS2 niet expliciet voorschrijft dat een SBOM verplicht is, vormt een
actuele SBOM een belangrijk hulpmiddel om invulling te geven aan deze
verplichtingen. Een SBOM maakt immers inzichtelijk welke componenten aanwezig
zijn, welke leveranciers betrokken zijn en welke systemen mogelijk geraakt
worden wanneer nieuwe kwetsbaarheden worden gepubliceerd.

### Cyber Resilience Act (CRA)

De Cyber Resilience Act gaat een stap verder en stelt expliciete eisen aan
fabrikanten en leveranciers van producten met digitale elementen. Als onderdeel
van de technische documentatie moeten producenten een overzicht bijhouden van de
softwarecomponenten waaruit hun producten zijn opgebouwd. De CRA noemt daarbij
expliciet het gebruik van een machineleesbare Software Bill of Materials (SBOM)
als middel om softwarecomponenten en afhankelijkheden vast te leggen.

De CRA vereist dat:

* Softwarecomponenten en afhankelijkheden worden gedocumenteerd.
* Een SBOM wordt opgesteld in een gangbaar machineleesbaar formaat.
* Deze informatie actueel wordt gehouden gedurende de ondersteuningsperiode van 
het product.
* De documentatie beschikbaar kan worden gesteld aan toezichthouders wanneer
daarom wordt gevraagd.

In de praktijk worden **CycloneDX** en **SPDX** beschouwd als de dominante
standaarden om aan deze verplichtingen invulling te geven. Beide formaten worden
breed ondersteund door tooling en maken het mogelijk om softwarecomponenten,
leveranciers, versies, licenties en afhankelijkheden gestructureerd vast te
leggen.

## Bestaande inkoopvoorwaarden.

Onder andere de Nederlandse vereniging van gemeenten vraagt in de
inkoopvoorwaarden Sboms al uit bij software.

### Van compliance naar risicobeheersing

Hoewel regelgeving vaak de aanleiding vormt voor het implementeren van
SBOM-processen, ligt de grootste waarde in het verbeteren van risicobeheersing.
Wanneer een nieuwe kwetsbaarheid wordt gepubliceerd, kan een organisatie met een
actuele SBOM direct bepalen welke producten, applicaties of diensten geraakt
worden. Dit versnelt incidentrespons, ondersteunt compliance-verplichtingen en
verhoogt de weerbaarheid van de gehele softwareketen.


## Conclusie

Een SBOM is inmiddels een essentieel onderdeel van moderne softwareontwikkeling
en software supply chain security. Het biedt inzicht in de gebruikte componenten
, ondersteunt compliance en versnelt de reactie op beveiligingsincidenten.

Voor organisaties die zich vooral richten op kwetsbaarheden, risicoanalyse en
DevSecOps is **CycloneDX** vaak de meest logische keuze. Voor organisaties
waarbij licentiebeheer, audits en juridische compliance centraal staan, biedt
**SPDX** de meest uitgebreide mogelijkheden.

In veel omgevingen worden beide standaarden naast elkaar gebruikt om zowel
security- als compliance-doelstellingen te ondersteunen.

Met de komst van NIS2, de Cyberbeveiligingswet en de Cyber Resilience Act
verschuift de SBOM bovendien van een security best practice naar een belangrijk
onderdeel van aantoonbare compliance en software supply chain governance.
