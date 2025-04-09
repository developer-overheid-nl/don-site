---
authors: [martin-van-der-plas]
tags: [data, api, fds, tfv, oauth,]
draft: true
---
# Waarom is data delen zo'n uitdaging?

Als burger word je regelmatig gevraagd om jouw persoonlijke data te delen. Denk aan je naam en e-mailadres bij digitale dienstverlening, of je adres en geboortedatum bij het aanvragen van een product of dienst, denk aan online winkels of financiële dienstverleners.

In het verleden vulde je deze gegevens handmatig in op een (digitaal) formulier, en moest de ontvanger vertrouwen op de juistheid ervan. Andersom moest jij als burger erop vertrouwen dat de ontvangende partij zorgvuldig omging met jouw data.

De kern van het delen van data is daarom ook vertrouwen en vertrouwen is nu eenmaal niet zo eenvoudig als delen. Gelukkig zijn er inmiddels veel technieken en patronen die digitaal vertrouwen mogelijk maken.

<!-- truncate -->

## Welke standaarden, stelsels en technieken zijn er voor vertrouwen

### 🔐 PKIOverheid

PKIOverheid is de publieke infrastructuur voor digitale certificaten van de Nederlandse overheid. Deze certificaten worden gebruikt voor veilige communicatie (zoals HTTPS), digitale handtekeningen en authenticatie van systemen.

**Waarvoor wordt het gebruikt?**

Voor het beveiligen van websites (SSL/TLS), ondertekenen van documenten en authenticatie tussen organisaties en diensten.

**Meer informatie:**  [PKIOverheid bij Logius](https://www.logius.nl/diensten/pkioverheid)

### 🔑 DigiD

DigiD is het digitale identificatiesysteem waarmee burgers kunnen inloggen bij overheidsdiensten in Nederland. Het koppelt een identiteit aan een authenticatiemiddel zoals een wachtwoord, app of ID-check.

**Waarvoor wordt het gebruikt?**

Toegang tot onder andere Belastingdienst, DUO, gemeenten en zorginstellingen.

**Meer informatie:**  [DigiD voor professionals (Logius)](https://www.logius.nl/diensten/digid)

### 🧾 eHerkenning

eHerkenning is het zakelijke inlogmiddel voor bedrijven om veilig toegang te krijgen tot digitale overheidsdiensten. Het werkt vergelijkbaar met DigiD, maar is bedoeld voor organisaties.

**Waarvoor wordt het gebruikt?**

Inloggen bij KvK, Belastingdienst, UWV en meer.

**Meer informatie:** [eHerkenning (eherkenning.nl)](https://www.eherkenning.nl/)

### 🌍 eIDAS (electronic IDentification, Authentication and trust Services)

eIDAS is een Europese verordening die zorgt voor grensoverschrijdende herkenning van elektronische identiteiten en vertrouwensdiensten, zoals digitale handtekeningen.

**Waarvoor wordt het gebruikt?**

Om met een nationaal inlogmiddel ook in andere EU-landen te kunnen inloggen op overheidsdiensten.

**Meer informatie:** [eIDAS bij de Europese Commissie](https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation)

### 🛡 SAML (Security Assertion Markup Language)

SAML is een XML-gebaseerde standaard voor federatieve authenticatie. Het maakt het mogelijk dat een gebruiker zich één keer aanmeldt (Single Sign-On) en toegang krijgt tot meerdere diensten.

**Waarvoor wordt het gebruikt?**

Bijvoorbeeld bij eHerkenning of enterprise identiteitsfederaties.

**Meer informatie:** [SAML bij OASIS (standaardisatie-orgaan)](https://docs.oasis-open.org/security/saml/v2.0/)

### 🔓 OAuth 2.0 (Open Authorization)

OAuth 2.0 is een open standaard voor autorisatie. Hiermee kunnen applicaties toegang krijgen tot gegevens van een gebruiker, zonder dat het wachtwoord gedeeld hoeft te worden.

**Waarvoor wordt het gebruikt?**

Voor toegang tot API’s zoals bij MijnOverheid of eHerkenning, vaak in combinatie met toegangstokens (JWT's).

**Meer informatie:** [OAuth 2.0 bij IETF (RFC 6749)](https://datatracker.ietf.org/doc/html/rfc6749)

### 🔐 OIDC (OpenID Connect)

OpenID Connect is een identity layer bovenop OAuth 2.0. Het voegt identificatie en authenticatie toe aan OAuth, maakt het mogelijk om gebruikersinformatie (claims) op te vragen, en het laat gebruikers veilig inloggen bij applicaties met behulp van een externe identiteitsprovider.

**Waarvoor wordt het gebruikt?**

Voor Single Sign-On en federatieve login in moderne webapplicaties.

**Meer informatie:** [OpenID Connect specificatie](https://openid.net/connect/)

## Verschillende invalshoeken

Ongetwijfeld zijn er meer invalshoeken te bedenken maar voor de leesbaarheid en het overzicht beperken we ons tot de drie belangrijkste partijen bij het delen van data:

### **1. De burger of eigenaar;**

Het belang van de burger staat voorop, deze is immers waar de overheid voor werkt. Het is dan ook van belang dat de burger een vertrouwde gebruikersinterface wordt aangeboden bijvoorbeeld [mijnoverheid.nl](https://mijnoverheid.nl) of de ["mijn gegevens app"](https://apps.apple.com/nl/app/mijngegevens/id1504052262?l=en-GB) en dat de burger veilig kan inloggen met DigiD of eIDAS. In essentie is de burger vaak ook de **resource owner** en het betreft zijn/haar persoonsgegevens zoals een geboortedatum of diploma die worden gedeeld. In specifieke gevallen kan dit echter ook een burger zijn die namens een organisatie handelt en uit naam van die organisatie bijvoorbeeld de KvK data deelt met een andere organisatie.

### **2. De marktpartij of afnemer;**

Kern van het delen van data is vaak het verkrijgen van een product of dienst van een marktpartij. Naast registratie en / of betaling is het aanleveren van aanvullende data een steeds belangrijker aspect. Denk bijvoorbeeld aan het aanleveren van financiële data bij het aanvragen van een hypotheek. Wanneer de marktpartij de data van een authentieke bron kan verkrijgen en er op kan vertrouwen dat de data correct zijn is dit een grote meerwaarde voor zowel de marktpartij als de burger. Uiteraard dient een marktpartij zich eerst te registreren voordat hij toestemming krijgt tot deelname aan een stelsel van datadelers. Ook dient de marktpartij een bewijs te verkrijgen van de burger dat deze toestemming verleent. bijvoorbeeld in de vorm van een **token** (JWT).

### **3. De bronhouder of aanbieder;**

Feit is dat de bron van de data niet bij de burger of eigenaar staat maar dat de data die gedeeld dienen te worden veelal staan in een [basisregistratie](https://data.overheid.nl/datasets?facet_classification%5B0%5D=basis_register&sort=popularity%20desc) of andere dataset bij 1 van de meer dan 1600 [organisaties.](https://data.overheid.nl/community/organisaties) Voor het ontsluiten van de data dient de bronhouder erop te kunnen vertrouwen dat de burger instemt met het delen van de data en dat de marktpartij instemt met de voorwaarden waaronder de data worden gedeeld.

> Kortom, in de meest eenvoudige situatie zijn altijd al minimaal 3 partijen nodig die ieder op zich moeten kunnen vertrouwen op de technische voorzieningen die bij de 2 andere partijen in gebruik zijn.

## Ondersteunende voorzieningen

Naast de voor de hand liggende voorzieningen als een database bij de bronhouder en een applicatie bij de marktpartij zijn er ook specifieke technische voorzieningen die goed passen in deze context van datadelen.

Enkele algemene en bestaande inlog voorzieningen zoals DigiD, eHerkenning en eIDAS zijn hierboven al benoemd. Burgers kunnen gebruik maken van bijvoorbeeld DigiD om zich te identificeren en authenticeren. Marktpartijen kunnen gebruik maken van eHerkenning om zich te identificeren en authenticeren wanneer ze zich registreren als client applicatie en instemmen met de voorwaarden van het stelsel.

De uitdaging is om deze verschillende technieken en voorzieningen onderling te laten samenwerken zonder technisch grootschalige veranderingen door te hoeven voeren. De oplossing is in mijn optiek de inzet van [API's](https://developer.overheid.nl/kennisbank/apis/) en [Open Authorization](https://logius-standaarden.github.io/OAuth-NL-profiel/) in combinatie met bestaande inlog voorzieningen.

### Identity Providers en Trust Service Providers

Deze inlog voorzieningen fungeren als IdP ([Identity Provider](https://en.wikipedia.org/wiki/Identity_provider)) voor de burgers en bedrijven. Bronhouders identificeren en authenticeren zich in de regel met een PKOverheid certificaat uitgegeven door een TSP ([Trust Service Provider](https://www.logius.nl/domeinen/toegang/pkioverheid/wat-een-pkioverheidcertificaat)).

### Open Authorization

Open Authorization ofwel OAuth 2.0 biedt uitkomst om verschillende technische voorzieningen te verbinden en het vertrouwen in stand te houden. Hiertoe dient de IdP van de burger naast een SAML token ook een OAuth acces token uit te geven of er wordt een voorziening ingezet die [token exchange](https://www.rfc-editor.org/rfc/rfc8693.html) faciliteert (vaak een standaard functie van de AS ofwel de Authorization Server). Als alternatief kan de marktpartij ook een [Device Authorization Grant](https://www.rfc-editor.org/rfc/rfc8628.html) vragen door middel van het tonen van een QR code. Zo kan de gebruiker eenmalig toestemming geven voor het delen van een dataset.

### Authorization Server

De plaats en eigenaar van de Authorization Server (AS) doet er in technische zin niet zozeer toe, belangrijkste is dat deze voorziening door alle partijen wordt vertrouwd. Net zoals je de uitgever van certificaten dient te vertrouwen als je certificaten gebruikt is dit ook het geval bij de uitgifte van tokens door de AS. Praktisch gezien wordt dit vertrouwen vastgesteld door:

- De marktpartij die zijn client applicatie registreert bij de AS middels de [client registration](https://gitdocumentatie.logius.nl/publicatie/api/oauth/#client-registration) zoals uitgewerkt in de NLGov OAuth standaard.
- De burger kan dan middels de [interactie flow](https://gitdocumentatie.logius.nl/publicatie/api/oauth/#use-case-authorization-code-flow) zoals beschreven in de NLGov OAuth standaard met marktpartij en bronhouder interacteren door het uitwisselen van tokens.

### API Gateway

Behalve een dataset en een API is het ook gebruikelijk een API Gateway in te zetten voor het controleren van de toegang tot de API. Op basis van een vooraf gedefinieerde policy bepaalt de API Gateway of requests voldoen aan de voorwaarden en worden doorgelaten naar de API. De Gateway fungeert dan als zogenaamd Policy Enforcement Point ofwel PeP. Daarnaast kunnen er nog veel meer functies door de API Gateway worden ingevuld. Dit is uitgebreid beschreven in [de architectuur van de NL API Strategie](https://docs.geostandaarden.nl/api/API-Strategie-architectuur/#api-security-architectuur).

### Front-end

Voor velen wellicht een open deur maar het vertrouwen van de burger in de werking van een dergelijk data delen stelsel is een betrouwbare en intuitieve interface met heldere stappen en duidelijk en herkenbaar proces. Om dit te faciliteren zijn onder andere het [NL Design System](https://developer.overheid.nl/kennisbank/frontend/nl-design-system/) en [DigiToegankelijk](https://developer.overheid.nl/kennisbank/frontend/standaarden/digitoegankelijk) beschikbaar.

### Registry

Vaak onderbelicht maar cruciaal voor het vertrouwen en de onderhoudbaarheid van een stelsel is de centrale registry waar geverifieerde aanbieders en afnemers geregistreerd worden waar nieuwe partijen zich kunnen oriënteren en registreren. Denk hierbij bijvoorbeeld aan [het API Register op Developer.overheid.nl](https://apis.developer.overheid.nl/apis) of het [CPA register van Digikoppeling](https://cparegister.minvenj.nl/).

### Logging en verantwoording

Verantwoording afleggen is belangrijk voor het instandhouden van het vertrouwen wat nodig is voor het kunnen delen van data. Om verantwoording af te kunnen leggen is (meta)data nodig, hoogstwaarschijnlijk in de vorm van logging. Dit is mede de reden dat een project is gestart om te komen tot een logging standaard. De Logboek Data Verwerkingen (LDV) standaard is gebaseerd op technieken als [OpenTelemetry](https://opentelemetry.io/) en [W3C Trace](https://w3c.github.io/trace-context/). Meer informatie over de ontwikkeling van de standaard en de concepten zijn beschikbaar op [de github omgeving van Logius](https://github.com/search?q=topic%3Alogboek+org%3ALogius-standaarden+fork%3Atrue&type=repositories)

## Praktijkvoorbeelden

### Logius Delen van MijnGegevens

Voor organisaties die niet mogen aansluiten op DigiD, maar voor de uitvoering van een wettelijke taak of toets wel gebruik moeten maken van authentieke gegevens die de overheid over burgers registreert, kan er aangesloten worden op de functionaliteit Delen van MijnGegevens via MijnOverheid. Pas na expliciete toestemming van de burger kunnen specifieke gegevens voor een specifiek doel gedeeld worden.
**Meer informatie:** [Logius](https://www.logius.nl/domeinen/interactie/mijnoverheid/documentatie/api-documentatie-delen-van-mijngegevens)

### Vorderingenoverzicht Rijk

Het verzamelen van gegevens over actuele betalingsverplichtingen is voor burgers die in schuldhulpverlening terecht komen een grote drempel. Met het project Vorderingenoverzicht Rijk leveren we een bijdrage aan het verlagen van die drempel, zodat problemen met betalingen en schulden sneller kunnen worden opgelost of worden voorkomen. Het is daarom onze missie om burgers in staat te stellen gemakkelijk een overzicht van hun financiële verplichtingen aan overheidsorganisaties te verkrijgen.
**Meer informatie:** [VO Rijk](https://www.vorijk.nl/docs/introductie)

### Inkomen Ouders

DUO vraagt het inkomen van uw ouders automatisch op bij de Belastingdienst. Als uw ouders aangifte doen, gebruiken we hun verzamelinkomen.
**Meer informatie:** [DUO](https://duo.nl/particulier/aanvullende-beurs-of-toelage/inkomen-ouders.jsp)

## Conclusie: De uitdaging zit in afspraken en onderling vertrouwen

Hoewel de technologische basis voor het veilig en betrouwbaar delen van data inmiddels stevig staat, met standaarden als **OAuth 2.0**, **OIDC**,**SAML**, en voorzieningen zoals **DigiD**, **eHerkenning** en **PKIOverheid** – ligt de werkelijke uitdaging elders. Het succes van datadelen is vooral afhankelijk van **onderling vertrouwen** en **duidelijke afspraken** tussen de betrokken partijen.

Er zijn al veel technische bouwstenen beschikbaar:

- **API’s en API Gateways** maken veilige en gecontroleerde toegang tot gegevens mogelijk.
- **Identity Providers (IdP)** en **Authorization Servers (AS)** zorgen voor betrouwbare identificatie en autorisatie.
- **Registries en logging** brengen transparantie en controle in het stelsel.

Maar deze onderdelen moeten wel **samenwerken in een ecosysteem** waar:

- De burger controle en overzicht ervaart,
- De afnemer zeker weet dat data authentiek is,
- En de bronhouder verzekerd is van rechtmatige toegang.

Daarom is het zaak dat niet alleen technisch wordt geïnvesteerd, maar ook in **afsprakenstelsels, gebruiksvriendelijke interfaces en governance**. Alleen dan kunnen we van data delen een breed gedragen, veilig en schaalbaar fundament maken voor publieke en private dienstverlening.

### 📚 Verder lezen

- [NL API Strategie - Architectuur](https://docs.geostandaarden.nl/api/API-Strategie-architectuur/)
- [NLGov OAuth](https://gitdocumentatie.logius.nl/publicatie/api/oauth/)
- [NLGov OpenID Connect](https://gitdocumentatie.logius.nl/publicatie/api/oidc/)
- [API Register](https://developer.overheid.nl/)
- [OpenID Connect](https://openid.net/connect/)
- [Logius Standaarden op GitHub](https://github.com/Logius-standaarden)

Wij horen graag tegen welke uitdagingen jij nog meer oploopt bij gesprekken over het delen van data!
