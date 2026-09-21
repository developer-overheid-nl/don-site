---
title: "Dependencies bijhouden"
tags: ["development"]
---

# Richtlijn: Dependencies bijhouden 

Als je software ontwikkelt zul je vaak gebruik maken van third party dependencies. Denk aan Python modules die niet in de standaard library zitten maar die je via de Python Package Index gebruikt of Javascript modules die je via npm installeert. Welke versie van een dependency je gebruikt specificeer je in een bestand, bijvoorbeeld `pyproject.toml` in het geval van Python of `package.json` bij JavaScript. Als je een applicatie ontwikkelt specificeer je de versie van de dependencies zo precies mogelijk zodat je build herhaalbaar is.

Als er een nieuwe versie van een dependency uitkomt is het overstappen op de nieuwe versie dus een bewuste keuze. Je bepaalt regelmatig of er nieuwe versies zijn en wanneer je overstapt op de nieuwe versie.

## Rationale: Waarom dependencies bijhouden?

Er zijn meerdere redenen om dependencies bij te houden. De eerste is veiligheid: als een nieuwe versie van een dependency een oplossing voor een beveiligingsprobleem bevat kan dat een reden zijn om de dependency bij te werken. Uiteraard hoeft jouw software niet automatisch kwetsbaar te zijn als een gebruikte dependency een beveiligingsprobleem bevat, maar dat vereist dan wel analyse om dat vast te stellen. Je moet dan afwegen wat minder werk is: analyseren of je eigen software kwetsbaar is en of de kwetsbaarheid de moeite waard is om te fixen versus het bijwerken van de dependency.

Een tweede reden is de kwaliteit van de nieuwe versie: biedt de nieuwe versie betere performance? Lost de nieuwe versie bugs op waar je nu nog omheen werkt? Dat kunnen redenen zijn om te upgraden.

Een derde reden is nieuwe functionaliteit: biedt de nieuwe versies features waar je op zit te wachten? 

En tenslotte, zelfs als geen van de bovenstaande redenen opgaat kan het goed zijn om de versie bij te werken, simpelweg om het risico van het *niet* bijwerken te mitigeren. Als je een tijd niet bijwerkt en dan in één keer meerdere versies vooruit moet is het risico op problemen groter. Zeker als je dan ook nog meerdere dependencies tegelijk bijwerkt. Werkt er dan iets niet, dan is het meer werk om uit te zoeken aan welke versiebump van welke dependency het ligt.

Zijn er ook redenen om niet (direct) een dependency bij te werken? Zeker, het kan zinvol zijn even te wachten met het bijwerken van een dependency om te zien of er geen nieuwe bugs in de nieuwe versie zitten, zeker bij major versies. En om te zien of de nieuwe versie geen supply chain attack bevat.

## Doelgroep: Wie zijn er betrokken bij het overdragen van softwarw?

De volgende doelgroepen kunnen met het bijhouden van dependencies aan de slag:
developers werken de dependencies bij, 
kwaliteitsmanagers monitoren of dependencies up-to-date zijn.

## Implementatie: Hoe houd je dependencies bij?

### Methoden en technieken

Een techniek om de kans op supply chain attacks te verminderen is het gebruik van een cooldown periode. Zie de documentatie van de bots. 

### Tools

#### Audit

Je gebruikt tools om te onderzoeken of er bekende kwetsbaarheden zitten in de dependencies die je gebruikt of om zien of er nieuwe versies zijn. Denk aan `npm audit`, `npm outdated`, `uv tree --outdated`, Bandit.

#### Bots

Er zijn verschillende bots die automatisch een pull request kunnen maken en een CI-pijplijn kunnen starten als er een nieuwe versie van een dependency. Je ziet dan direct of alle tests slagen met de nieuwe versie van de dependency. Voorbeelden zijn Dependabot en Renovatebot.

### Gerelateerde richtlijnen

Nog geen.

### Succescriteria

Wanneer voldoe je aan deze richtlijn?

- Als je dependencies regelmatig bijwerkt
- Als je security updates direct bijwerkt

Wanneer ben je echt goed bezig?

- Als je een bot hebt die automatisch een PR aanmaakt en je CI/CD-pijplijn start als er updates zijn
- Als je een cooldown periode hebt geconfigureerd zodat je minder kwetsbaar bent voor supply chain attacks

## Wanneer is deze richtlijn van toepassing?

Als je software gebruik maakt van third-party dependencies.

## Bronnen

### Wetten

Geen bekend.

### Beleid

Geen bekend.

### Standaarden

Geen bekend.

### Communities

Geen bekend.

### Literatuur

Geen bekend.

### Bronnen op developer.overheid.nl

- [Overweeg om node_modules in git repositories te zetten](https://developer.overheid.nl/blog/2025/09/16/overweeg-node-modules-in-te-checken#een-groot-aantal-dependencies-resulteert-in-complexiteit)
