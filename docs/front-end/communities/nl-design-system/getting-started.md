---
tags:
  - "open-source"
  - "front-end"
  - "accessibility"
  - "nl-design-system"
title: "Getting Started: NL Design System"
---

# Getting Started

Wil je snel aan de slag met NL Design System? In deze handleiding laten we je zien hoe je het lokaal kunt opzetten en hoe je experimenteert met de beschikbare componenten.

## 📌 Benodigdheden

- [Node @ v22.13.1](https://nodejs.org/en/download)

Zorg ervoor dat je de juiste versie van Node.js hebt geïnstalleerd:
```sh
node -v
# Verwachte output: v22.13.1
```

Heb je een andere versie? Download de juiste via [Node.js](https://nodejs.org/en/download).

## Aan de slag

### 🚀 Stap 1: Installeer Vite

```sh
npm install -g vite@6.1.0
```

Maak vervolgens een nieuwe React-app met Vite:

```shs
npm create vite@6.1.0 nl-design-system-playground -- --template react
```

### 📦 Stap 2: Installeer dependencies

Ga naar je nieuwe projectmap en installeer de benodigde pakketten:

```sh
cd nl-design-system-playground
npm install
```
Voeg vervolgens de benodigde NL Design System libraries toe:

```sh
npm install --save-dev @rijkshuisstijl-community/components-react
npm install --save-dev @rijkshuisstijl-community/design-tokens
npm install --save-dev @rijkshuisstijl-community/font
```

### 🎨 Stap 3: Importeer het thema en de componenten

Open `App.jsx` en voeg de volgende imports toe:

```js
import '@rijkshuisstijl-community/design-tokens/dist/index.css'; // importeer het theme.
import '@rijkshuisstijl-community/font/src/index.mjs'; // font importeren.
import '@rijkshuisstijl-community/components-css/dist/index.css'; // importeer de CSS van de components.
```

### 🛠️ Stap 4: Voeg je eerste componenten toe

Gebruik een paar standaardcomponenten om te zien hoe het werkt. Voeg deze code toe aan `App.jsx`:

```js
import { Button, Card, Alert, Checkbox, Blockquote } from "@rijkshuisstijl-community/components-react";
```

Vervang de huidige template voor een wrapper met daarin het button component.

```html
return (
  <div className="rhc-theme">
    <Button>Klik hier!</Button>
    <Button appearance="primary-action-button">Of hier!</Button>

    <br/><br/>

    <Card
      appearance="default"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      heading="Standaard Card"
      href="#"
      imageAlt="Placeholder"
      imageSrc="https://rijkshuisstijl-community.vercel.app/placeholder.jpg"
      linkLabel="Lees meer"
      metaData="Metadata"
      title="Card Title"
    />

    <br/>

    <Alert
      heading="Succes!"
      textContent="Je hebt succesvol een component toegevoegd."
      type="ok"
    />

    <br/>

    <Checkbox checked value="Re-use rather than reinvent" aria-label="Reuse checkbox"/>

    <br/><br/>

    <Blockquote attribution="— Aaron Swartz" variation="pink-background">
      “Be curious. Read widely. Try new things. What people call intelligence just boils down to curiosity.”
    </Blockquote>
  </div>
);
```

### 🎨 Stap 5: Verwijder de boilerplate CSS

Comment twee regels uit om de standaard-styling van Vite uit te schakelen.

In `main.jsx`:

```jsx
// import './index.css'
```

In `App.jsx`:
```js
// import './App.css'
```

### ▶️ Stap 6: Start de development server

Draai je project lokaal met:

```sh
npm run dev
```

Je zou nu een werkende interface moeten zien in je browser.


## 🔍 Bekijk meer componenten

Meer componenten vind je in de [Storybook omgeving](https://rijkshuisstijl-community.vercel.app) van de Rijkshuisstijl Community van NL-Design-System.

## 🤝 Bijdragen

De componenten van Rijkshuisstijl Community zijn open source, als je wilt meedoen zijn de volgende links handig.

- **_Bug gevonden of code bekijken?_** Bezoek
  de [GitHub repository](https://github.com/nl-design-system/rijkshuisstijl-community). 
- **_Benieuwd naar onze voortgang?_** Bekijk de huidige werkzaamheden op
  het [Sprint Board](https://github.com/orgs/nl-design-system/projects/59).
- **_Blijf in contact met de community!_** Word lid van de [Code for NL Slack](https://praatmee.codefor.nl/) en join het
  `#nl-design-system` kanaal om samen te werken met de community.
