---
authors: [tom-ootes]
tags: [npm, javascript, typescript, nodejs]
draft: true
---
# Een goed JavaScript-project is een project met zo min mogelijk packages 

<!-- truncate -->
## Van React naar HTMX?
Toen ik begon bij https://developer.overheid.nl als front-end developer kreeg ik een boodschap die rauw op mn dak viel. De dienstdoende senior developer had besloten dat we de bestaande React front-end zouden refactoren naar een situatie waarbij een Django-app alle templates zou renderen. In de nieuwe situatie zouden we gebruik maken van HTMX om stukken van de HTML-pagina te refreshen.

In ons geval leidde het gebruik van HTMX in sommige gevallen tot situaties waarbij front-end functionaliteit in [Python code](https://gitlab.com/commonground/don/developer.overheid.nl/-/blob/main/web/templatetags/don_template_functions.py?ref_type=heads) geschreven moest worden. Dit voelde soms behoorlijk gekunsteld. Inmiddels is een groot deel van de developer community er wel over uit dat HTMX vooral erg geschikt is voor rapid-prototyping, en minder voor codebases die later in productie genomen moeten worden.

Afijn, dit artikel is geen deep-dive into HTMX, als je meer wilt weten verwijs ik je graag door naar [dit artikel van contentful](https://www.contentful.com/blog/htmx-react-use-cases/).

## De achterliggende reden: dependcy-moeheid
Waarom ik begon over onze refactor naar HTMX was vanwege de achterliggende reden: mijn collega-developer wilde vooral naar HTMX toe omdat hij slechte ervaringen had met het onderhouden van alle NPM-dependencies waar de React-codebase ondertussen afhankelijk van was.

En ik geef hem geen ongelijk. Onze package.json bevatte indertijd **`77 packages`**. Daaronder hingen weer **`1077 indirecte packages`**.

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

## NPM: veel kleine packages
Omdat het NPM ecosysteem rijk is aan kleine packages die 1 dingetje voor je oplossen loopt het aantal snel op. En achter elke package die je installeert bevindt zich ook weer een hele trits aan secundaire, tertiaire en ook soms quaternaire  packages. Op deze manier kan een eenvoudig project snel uitlopen tot een onderhoudsdebacle. 

## Een golf van versiebumps
Elke keer als er een vulnerability wordt gevonden in een onderlig gende dependency dienen de maintainers van de dependencies die deze dependency gebruiken hun package te updaten. Als jij deze package dan weer gebruikt levert dit jou weer een Dependabot-alert op. Zo zorgt een kwetsbaarheid voor een golf aan alerts tot bovenaan de chain. 
