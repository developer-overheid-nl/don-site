---
authors: [tom-ootes]
tags: [npm, javascript, typescript, nodejs, pnpm, dependabot, htmx]
draft: true
---
# Voorkom JavaScript-moeheid: minimaliseer het aantal NPM packages

Binnen modern web-development zijn er veel processen waarbij we NPM-packages gebruiken. De meest herkenbare verschijningsvormen van NPM-packages zijn libraries en frameworks, maar in de afgelopen jaren is het scala behoorlijk uitgebreid.

In veel codebases zie je ook: linters , test-engines, type-definitions en CLI-tools. Deze groei is verklaarbaar maar zorgt wel voor een **stijging van het aantal dependencies** binnen projecten. En dat zorgt weer voor problemen als: de welbekende **dependency-hell**, grote hoeveelheden **onderhoudswerk** en **trage transpile-processen**.

In deze post duiken we wat dieper in het NPM-ecosysteem en lees je hoe je bovenstaande problemen kunt voorkomen.

<!-- truncate -->

:::success[**TL;DR**]

Het minimaliseren van het aantal [NPM](https://www.npmjs.com/)-packages is een effectief middel om je dagelijkse develop-werkzaamheden beheersbaar te houden. Door bewust om te gaan met dependencies voorkom je dat je project evolueert naar een onderhoudsnachtmerrie met kwetsbaarheden en conflicterende versies.

Door projecten op te knippen in kleinere projecten, native API's te gebruiken, en frequent bestaande projecten te updaten kan complexiteit worden voorkomen. Met tools zoals PNPM en [Dependabot](https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide) kun je de dependencies die je wél nodig hebt beter beheren.

:::


## Van React naar HTMX?
Toen ik  als front-end developer begon bij developer.overheid.nl moest ik even wennen aan een bepaalde technische keuze. Er was namelijk besloten dat we de bestaande React front-end zouden refactoren naar een situatie waarbij een Django-app alle templates zou renderen. In de nieuwe situatie zouden we gebruik maken van HTMX om stukken van de HTML-pagina te refreshen om zo interactiviteit te realiseren.

## Geen silver bullet
In onze casus leidde het gebruik van HTMX in sommige gevallen tot situaties waarbij front-end logica in [Python code](https://gitlab.com/commonground/don/developer.overheid.nl/-/blob/main/web/templatetags/don_template_functions.py?ref_type=heads) geschreven moest worden. Dit voelde soms behoorlijk gekunsteld. Inmiddels is een groot deel van de developer-community er wel over uit dat HTMX vooral erg geschikt is voor rapid-prototyping, en minder voor codebases die later in productie genomen moeten worden.

Afijn, dit artikel is geen deep-dive into HTMX, als je meer wilt weten verwijs ik je graag door naar [dit artikel van contentful](https://www.contentful.com/blog/htmx-react-use-cases/).

## JavaScript fatigue
Waarom ik dit artikel begon met het verhaal over onze refactor naar HTMX was vanwege de achterliggende reden: mijn collega-developer wilde vooral naar HTMX toe omdat hij slechte ervaringen had met het onderhouden van alle NPM-dependencies waar de React-codebase ondertussen afhankelijk van was. Dit had geleid tot een serieus geval van Javascript-moeheid, in onze sector ook wel "JavaScript fatigue" genoemd. En ik geef hem geen ongelijk.

Onze package.json bevatte indertijd **`77 packages`**. Daaronder hingen weer **`1077 indirecte packages`**.

<details>
  <summary>Onze `package.json` destijds</summary>

```json showLineNumbers title="package.json"
{
  "name": "ui",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@commonground/design-system": "21.2.0",
    "@fontsource/source-sans-pro": "4.5.11",
    "@types/jest": "29.4.0",
    "@types/node": "17.0.21",
    "@types/react-dom": "17.0.18",
    "@types/react-helmet": "6.1.6",
    "change-case": "4.1.2",
    "clsx": "1.2.1",
    "debounce": "1.2.1",
    "formik": "2.2.9",
    "highcharts": "10.3.3",
    "highcharts-react-official": "3.1.0",
    "history": "5.3.0",
    "http": "0.0.1-security",
    "javascript-time-ago": "2.5.9",
    "js-cookie": "3.0.1",
    "moment": "2.29.4",
    "moment-timezone": "0.5.40",
    "query-string": "7.1.3",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-helmet": "6.1.0",
    "react-query": "3.39.3",
    "react-router-dom": "6.8.0",
    "react-select": "5.7.0",
    "react-select-async-paginate": "0.7.2",
    "redoc": "2.0.0",
    "sass": "1.58.0",
    "styled-components": "5.3.6",
    "typescript": "4.9.5",
    "url": "0.11.0",
    "usehooks-ts": "2.9.1",
    "util": "0.12.5",
    "yup": "0.32.11"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "5.16.5",
    "@testing-library/react": "12.1.5",
    "@testing-library/react-hooks": "8.0.1",
    "@testing-library/user-event": "14.4.3",
    "@types/enzyme": "3.10.12",
    "@types/react": "17.0.53",
    "@types/react-router-dom": "5.3.3",
    "@types/styled-components": "5.1.26",
    "@wojtekmaj/enzyme-adapter-react-17": "0.8.0",
    "buffer": "6.0.3",
    "crypto-browserify": "3.12.0",
    "enzyme": "3.11.0",
    "eslint-config-prettier": "8.6.0",
    "eslint-config-react": "1.1.7",
    "eslint-plugin-better-styled-components": "1.1.2",
    "eslint-plugin-header": "3.1.1",
    "eslint-plugin-import": "2.27.5",
    "eslint-plugin-jsx-a11y": "6.7.1",
    "eslint-plugin-node": "11.1.0",
    "eslint-plugin-prettier": "4.2.1",
    "eslint-plugin-promise": "6.1.1",
    "eslint-plugin-react": "7.32.2",
    "eslint-plugin-security": "1.7.1",
    "eslint-plugin-standard": "4.1.0",
    "https-browserify": "1.0.0",
    "os-browserify": "0.3.0",
    "path-browserify": "1.0.1",
    "postcss-flexbugs-fixes": "5.0.2",
    "postcss-normalize": "10.0.1",
    "postcss-preset-env": "8.0.1",
    "prettier": "2.8.3",
    "process": "0.11.10",
    "react-app-rewired": "2.2.1",
    "react-scripts": "5.0.1",
    "react-test-renderer": "17.0.2",
    "stream-browserify": "3.0.0",
    "stream-http": "3.2.0",
    "stylelint": "14.16.1",
    "stylelint-config-prettier": "9.0.4",
    "stylelint-config-standard-scss": "6.1.0",
    "stylelint-order": "6.0.1",
    "stylelint-selector-bem-pattern": "2.1.1",
    "webpack": "5.75.0"
  },
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "npm run lint:js && react-app-rewired test",
    "test:coverage": "npm run test -- --coverage",
    "test:coverage:changed": "npm run test:coverage -- --changedSince=origin/main",
    "eject": "react-scripts eject",
    "tsc": "tsc",
    "lint": "npm run tsc --noEmit && npm run lint:js",
    "lint:js": "eslint \"src/**/*.{ts,tsx}\" \"src/**/*.{js,jsx}\"",
    "lint:fix": "npm run lint:js -- --fix",
    "lint:css": "stylelint --allow-empty-input '**/*.{css,scss}'"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "proxy": "http://127.0.0.1:8000"
}

```

</details>

## Veel packages, veel gedoe
Een codebase met veel packages heeft allerlei nadelen die je misschien niet direct in je achterhoofd hebt als je het installeert. Op dat moment wil je "alleen maar even iets oplossen". En dat terwijl je met elke package een afhankelijkheid creëert.

## Het left-pad incident
Het meest dramatische voorbeeld om deze afhankelijkheid te illustreren is het [left-pad incident](https://en.wikipedia.org/wiki/Npm_left-pad_incident). Duizenden prominente NPM packages waren naar aanleiding van dit voorval niet meer te installeren omdat een developer had besloten zijn package `left-pad` te verwijderen. Dit voorval legde de kwetsbaarheid van het JavaScript ecosysteem goed bloot omdat één actor op zichzelf in staat was zand in de raderen van de machine te strooien.

## NPM: veel kleine packages
Omdat het NPM ecosysteem rijk is aan kleine packages die één dingetje voor je oplossen, loopt het aantal snel op. Achter elke package die je installeert bevindt zich weer een hele trits aan secundaire, tertiaire en soms ook quaternaire packages. Op deze manier kan een eenvoudig project snel uitlopen tot een onderhoudsdebacle.

## 🌊 Een golf van versiebumps
Elke keer als er een vulnerability wordt gevonden in een onderliggende dependency dienen de maintainers van de dependencies die deze dependency gebruiken hun package te updaten. Als jij deze package dan weer gebruikt levert dit jou weer een Dependabot-alert op. Zo zorgt een kwetsbaarheid voor een golf aan alerts tot bovenaan de chain.

## Alle nadelen

### 🔒 Security risico's
Elke dependency introduceert potentiële kwetsbaarheden. Meer packages betekent een groter aanvalsoppervlak. Misschien denk je: "ach, het draait in de browser, wat kan er mis gaan?". Maar bedenk dan dat jouw development omgeving en build pipeline ook interessante doelwitten kunnen zijn voor aanvallers. Aanvallen die kunnen plaatsvinden zijn:
- Environment variables stelen (API keys, secrets)
- Source code modificeren of backdoors injecteren
- Lokale bestanden lezen en verzenden
- Je ontwikkelomgeving compromitteren

### 👹 Dependency hell
Conflicterende versies, broken updates, en onderhoudsproblemen stapelen zich op. Ik zal niet de enige zijn met de ervaring dat een oud JavaScript project niet meer te installeren is, laat staan te upgraden. 
Packages kunnen deprecated raken of incompatibel worden met elkaar, wat je project onbruikbaar maakt.

### 🐘 Bundle size
Elke package die je importeert vergroot je bundle size. Hoe groter je bundle size, hoe langer het duurt deze te downloaden en te parsen, en de user de pagina voor z'n neus heeft.

### 🤖 Onderhoudslast
Updates, security patches, en bijbehorende compatibiliteit-checks kosten tijd. In het NPM-ecosysteem waar veel packages afhankelijk zijn van andere packages heb je hier nog extra veel mee te maken.

### ⛓️‍💥 Externe Afhankelijkheid
Met elke package ben je afhankelijk van de maintainers voor onderhoud, en de beschikbaarheid van de package. Denk nogmaals aan het left-pad incident.

## Hoe kan het beter?

### ✂️ Knip projecten op
Sommige web-apps zijn op te knippen in kleinere codebases die een specifiek doel hebben. Bij developer.overheid.nl hebben we dit bijvoorbeeld gedaan met onze [OAS generator](https://github.com/developer-overheid-nl/oas-generator). Dit project was eerst onderdeel van een grotere codebase, maar door deze los te knippen zijn we wendbaarder geworden. Het is nu bijvoorbeeld makkelijker om deze codebase uit te faseren mocht het nodig zijn.

### 📂 Meerdere package.json-bestanden
Door meerdere package.json-bestanden in één repository te hanteren ontstaan er verschillende apps en voorkom je onnodige complexiteit.

Een mooi voorbeeld van een project dat precies dit doet is de [NL-Design-System implementatie](https://github.com/nl-design-system/utrecht) van Gemeente Utrecht. Binnen dit project vind je [meerdere packages](https://github.com/nl-design-system/utrecht/tree/main/packages) die allemaal hun eigen functie hebben.

### 💭 Wees bewust
Wees je bewust van de gevolgen die het kan hebben als je een NPM-package installeert. Elke package dient up-to-date te blijven en voegt complexiteit toe aan de codebase.

### 🔩 Schrijf simpele functies zelf
Als de functionaliteit die je zoekt niet al te complex is, is het het overwegen waard om zelf een functie toe te voegen.

### 🧰 Gebruik browser-native API's 
Sommige libraries lossen een probleem op dat tegenwoordig al ingebakken zit in de browser of in de programmeertaal [NodeJS](https://nodejs.org/). Voorbeelden hiervan zijn `Intl.DateTimeFormat` ipv `date-fns` of `Fetch API` ipv `axios`.

### 📆 Verwerk updates geregeld
Door op een gezette tijd, bijvoorbeeld elke maand, tijd vrij te maken om bestaande codebases up te daten voorkom je problemen. Door de updates steeds in kleine stapjes uit te voeren is de kans kleiner dat libraries met elkaar in de clinch komen te liggen en zijn bugs die optreden makkelijker herleidbaar.

### 🔍 Evalueer packages
Voor je een package installeert is het belangrijk te evalueren of deze wel gezond is. Dingen waar je op kan letten: 
- Er zijn regelmatig releases
- Issues worden beantwoord en opgelost
- Er zijn meer dan 1 actieve contributers
- De documentatie is in orde
- Er zijn de nodige tests aanwezig
- Er wordt een heldere changelog bijgehouden
- Groeiende/stabiele download statistieken

Door het project te evalueren voorkom je dat je later met een dependency te maken hebt die niet meer onderhouden wordt.

## Tools

### 🤖 Dependabot
Dependabot is een tool die codebases kan scannen en pull requests inschiet als hij een library vindt die achterloopt qua versionering. Dependabot is inmiddels geïntegreerd in GitHub en per repository apart aan te zetten. Mocht je niet vast willen zitten aan functionaliteit van GitHub kan je ook self-hosted gaan met behulp van [Dependabot CLI](https://github.com/dependabot/example-cli-usage/?tab=readme-ov-file).

### 📋 PNPM
[PNPM](https://pnpm.io) is een package-manager met een aantal features die kunnen voorkomen dat je in een dependency-hell terecht komt. Deze features zijn:
- 🚫 Voorkomt "phantom dependencies" (packages die je gebruikt maar niet geïnstalleerd hebt)
- 📦 Elke package heeft alleen toegang tot eigen dependencies
- 🔒 Dwingt expliciete dependency declaraties af
- ⚡ Snelle installs

## NPM-minimalisme betrachten, is kwalitatieve software bouwen
De keuze voor HTMX bij developer.overheid.nl was misschien niet de ideale oplossing, maar het onderliggende probleem - JavaScript fatigue door een grote hoeveelheid dependencies - is reëel en herkenbaar. Door het aantal dependencies te beperken tot wat je werkelijk nodig hebt, creëer je ruimte om je te focussen op wat echt telt: het bouwen van waardevolle features.

Het minimaliseren van het aantal [NPM](https://www.npmjs.com/)-packages is een effectief middel om je dagelijkse develop-werkzaamheden beheersbaar te houden. Door bewust om te gaan met dependencies voorkom je dat je project evolueert naar een onderhoudsnachtmerrie met kwetsbaarheden en conflicterende versies.

Door projecten op te knippen in kleinere projecten, native API's te gebruiken, en frequent bestaande projecten te updaten kan complexiteit worden voorkomen. Met tools zoals PNPM en [Dependabot](https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide) kun je de dependencies die je wél nodig hebt beter beheren.

<!-- 
@ LINKEDIN
Tag je collega die de hele tijd nieuwe deps installeert -->