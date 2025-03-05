# Developer Overheid NL website

Dit is de repository van de website [developer.overheid.nl](https://developer.overheid.nl), de kennisbank, communities en blog.  
De basis van de website is [Docusaurus](https://docusaurus.io), de artikelen bestaan uit [Markdown](https://www.markdownguide.org/basic-syntax/)- (of MDX-) bestanden, deze slaan we in deze repository op, waardoor we met versionering en reviews kunnen werken.

## Help mee

Wil je bijdragen aan onze kennisbank, blog en of website. Op de pagina [Bijdragen](https://developer.overheid.nl/contributing#hoe-kun-je-bijdragen) staan de verschillende manieren waarop je mee kan helpen.

### Contact

Neem contact op met ons via een bericht op ons [Slack kanaal](https://codefornl.slack.com/archives/CFV4B3XE2) of stuur een e-mail naar developer.overheid@geonovum.nl. Dan kijken we samen hoe we je bijdrage kunnen vormgeven.

## Lokaal draaien van de website

We gebruiken [`pnpm`](https://pnpm.io/) om afhankelijkheden te installeren en de website met Docusaurus te draaien. Zorg dat je dat eerst installeert, dat kan bijvoorbeeld met `npm`.  
Daarna kan je de website lokaal draaien.

1. Draai `pnpm install` om te zorgen dat alle afhankelijkheden die Docusaurus nodig heeft beschikbaar zijn
1. Draai `pnpm run build` om de CSS te builden (dit hoeft alleen de eerste keer)
1. Draai `pnpm run start` om Docusaurus te starten.

Daarna kan je de lokale versie van de site bekijken op `http://localhost:3000/`. 
