---
description:
  "Genereer met de CLI van de Repository Docs Generator in een paar stappen een
  README.md, SECURITY.md, publiccode.yml en andere standaardbestanden voor je
  repository."
content_type: tutorial
tags: [open-source, publiccode-yml, license, changelog, cli, json-schema]
---

# Repo inrichten met generator (CLI)

Met de CLI van de [Repository Docs Generator](../tools/repo-docs-generator) maak
je vanaf de commandline de standaardbestanden voor je repository. De CLI
gebruikt dezelfde templates als de [web-app](./repo-inrichten-generator-webapp),
maar leest de gegevens lokaal uit een JSON-bestand. Dat bestand kun je inchecken
en bewaren om hem later opnieuw te gebruiken.

## Wat heb je nodig

- Node 18 of hoger

## 1. Maak een input-bestand

Ga naar de map van je project en maak een voorbeeldbestand aan:

```sh
npx github:developer-overheid-nl/repo-docs-generator --init
```

Dit maakt een `input.json` met voorbeeldgegevens. Bestaat dat bestand al, voeg
dan `--force` toe om het te overschrijven.

## 2. Vul je projectgegevens in

Vervang de voorbeeldgegevens in `input.json` door die van je eigen project. Een
deel van de velden ziet er zo uit:

```json title="input.json"
{
  "name": "Mijn project",
  "shortDescription": "Korte beschrijving van wat het project doet.",
  "developmentStatus": "beta",
  "mainCopyrightOwner": "Naam van je organisatie",
  "securityEmail": "security@example.nl",
  "url": "https://github.com/mijn-organisatie/mijn-project.git",
  "organisation": {
    "name": "Mijn organisatie",
    "url": "https://example.nl"
  }
}
```

De generator controleert het bestand tegen een JSON-schema. Ontbreekt er een
verplicht veld of klopt een waarde niet, dan zie je dat bij de volgende stap.

## 3. Genereer de bestanden

```sh
npx github:developer-overheid-nl/repo-docs-generator input.json -o ./generated
```

De bestanden komen in de map `generated`. Laat je `-o` weg, dan gebruikt de
generator de map `output`.

Wil je maar een paar bestanden? Vraag met `--list` op welke templates er zijn en
kies ze met `-t`:

```sh
npx github:developer-overheid-nl/repo-docs-generator --list
npx github:developer-overheid-nl/repo-docs-generator input.json -t README.md -t SECURITY.md
```

## 4. Controleer en pas de bestanden aan

Lees de gegenereerde bestanden door, vul ze aan waar nodig en verplaats ze naar
de root van je repository. Controleer de `publiccode.yml` met de
[publiccode.yml checker](../tools/publiccode-yml-checker):

```sh
npx @developer-overheid-nl/don-checker@latest validate --standard publiccode --input ./publiccode.yml
```

Alle opties van de CLI staan in het artikel over de
[Repository Docs Generator](../tools/repo-docs-generator#cli).

## Bronnen

- [Meer over de Repository Docs Generator](../tools/repo-docs-generator#cli)
- [Repository Docs Generator op GitHub](https://github.com/developer-overheid-nl/repo-docs-generator)
- [Repository Docs Generator web-app](https://developer-overheid-nl.github.io/repo-docs-generator/#/README.md)
