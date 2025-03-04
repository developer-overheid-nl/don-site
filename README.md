# Developer Overheid NL website

Dit is de repository van de website [developer.overheid.nl](https://developer.overheid.nl), de kennisbank, communities en blog.  
De basis van de website is [Docusaurus](https://docusaurus.io), de artikelen bestaan uit [Markdown](https://www.markdownguide.org/basic-syntax/)- (of MDX-) bestanden, deze slaan we in deze repository op, waardoor we met versionering en reviews kunnen werken.

## Help mee

Wil je bijdragen aan onze kennisbank, blog en of website. Als je dat in Markdown kan doen is dat voor ons het allerhandigst. Hieronder een aantal manieren waarop bijdragen voorgesteld kunnen worden.

### Maak een Gist en stuur hem ons op

In GitHub kun je gemakkelijk een los Markdown bestand maken met [Gist](https://gist.github.com/), mits je een GitHub account hebt. Heb je een document dat je wil bijdragen, stuur ons dan een linkje naar die gist.

### Met een pull request

1. Maak een fork van [deze repository](https://github.com/developer-overheid-nl/don-site) door rechts bovenin op de `fork` knop te drukken
2. Draai deze fork lokaal zoals hieronder beschreven
3. Voeg documentatie toe, of verbeter bestaande documentatie
4. Commit je verbeteringen en push ze naar je fork 
5. Maak een pull request naar onze documentatie repository. 

### Op een andere manier

Neem contact op met ons via een bericht op ons [forum](https://community.developer.overheid.nl/) of stuur een e-mail naar developer.overheid@geonovum.nl. Dan kijken we samen hoe we je bijdrage kunnen vormgeven.

## Lokaal draaien van de website

We gebruiken [`pnpm`](https://pnpm.io/) om afhankelijkheden te installeren en de website met Docusaurus te draaien. Zorg dat je dat eerst installeert, dat kan bijvoorbeeld met `npm`.  
Daarna kan je de website lokaal draaien.

1. Draai `pnpm install` om te zorgen dat alle afhankelijkheden die Docusaurus nodig heeft beschikbaar zijn
1. Draai `pnpm run build` om de CSS te builden (dit hoeft alleen de eerste keer)
1. Draai `pnpm run start` om Docusaurus te starten.

Daarna kan je de lokale versie van de site bekijken op `http://localhost:3000/`. 
