---
description:
  "Leer hoe je een publiccode.yml-bestand toevoegt aan je project, valideert
  met de don-checker en automatiseert in je CI/CD-pipeline of pre-commit
  hook."
content_type: tutorial
tags:
  - "open-source"
  - "publiccode-yml"
  - "vscode"
  - "json-schema"
sidebar_position: 1
---

# Publiccode.yml toevoegen

:::tip[**editor beschikbaar**]

Werk jij liever in een web-editor? Gebruik dan de web-app van
[onze checker](https://developer-overheid-nl.github.io/don-checker/#/publiccode/)

:::

`publiccode.yml` is een machine-leesbaar metadatabestand waarmee je open source
software identificeert en beschrijft.

## Waarom een publiccode.yml toevoegen?

### Groene "flag"

De belangrijkste reden om een publiccode.yml-bestand aan je project toe te
voegen, is om je project beter vindbaar te maken. Het publiccode.yml bestand
fungeert als een herkenbare flag voor open source softwarecatalogi, waarmee jouw
project wordt geïdentificeerd als een potentieel herbruikbaar stuk code.

### Machine-leesbare metadata

Door het publiccode.yml bestand in te vullen voorzie je je project van
machine-leesbare metadata. Deze meta-data kan ingelezen worden door Open Source
Software Catalogi om jou code zo nog beter vindbaar te maken.

Voor meer informatie, ga naar de
[pagina over de publiccode.yml standaard](../standaarden/publiccode-yml).

## Stappenplan

### 1. Voeg een publiccode.yml bestand toe

Voeg een bestand toe aan de root van je project met de filename:
`publiccode.yml`.

### 2. Kopieer ons voorbeeld

Kopieer ons voorbeeld op [deze pagina](../standaarden/publiccode-yml). En plak
deze in jouw `publiccode.yml`-bestand.

### 3. Pas het voorbeeld aan

Pas alle waarden aan met informatie over jouw project. Ben je op zoek naar
informatie over de properties van de standaard? Ga dan naar de
[documentatie van de standaard](https://yml.publiccode.tools/schema.core.html).

### 4. Valideer je publiccode.yml

Gebruik de [don-checker](https://github.com/developer-overheid-nl/don-checker)
om je bestand te valideren. De makkelijkste manier is via npx:

```shell
npx @developer-overheid-nl/don-checker@latest validate --standard publiccode --input ./publiccode.yml
```

Of installeer de tool globaal via npm:

```shell
npm install -g @developer-overheid-nl/don-checker@latest
don-checker validate --standard publiccode --input ./publiccode.yml
```

Bij een geldige publiccode.yml geeft de tool het volgende terug:

```
Ruleset: publiccode@0.7
Applied rulesets: https://yml.publiccode.tools/schema/0.7
Diagnostics: 0 (errors 0, warnings 0, info 0, hints 0)
No diagnostics.
```

### 5. (optioneel) - Voeg validatie toe aan je CI/CD-pipeline

Door de parser te draaien in je pipeline weet je zeker dat je `publiccode.yml`
altijd geldig is.

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="github" label="GitHub Actions">

```yaml
- name: Validate publiccode.yml
  run: npx @developer-overheid-nl/don-checker@latest validate --standard publiccode --input ./publiccode.yml
```

  </TabItem>
  <TabItem value="gitlab" label="GitLab CI">

```yaml
validate-publiccode:
  image: node:latest
  script:
    - npx @developer-overheid-nl/don-checker@latest validate --standard publiccode --input ./publiccode.yml
```

  </TabItem>
</Tabs>

### 6. (optioneel) - Voeg een pre-commit hook toe

Wil je nog eerder feedback, voordat je code zelfs maar gepusht wordt? Met een
pre-commit hook draai je de validatie automatisch bij elke commit. Dit kan
bijvoorbeeld met [Husky](https://typicode.github.io/husky/) of
[Lefthook](https://github.com/evilmartians/lefthook).

Voorbeeld met Husky:

```bash
npx husky init
```

Voeg de validatie toe aan `.husky/pre-commit`:

```bash
npx @developer-overheid-nl/don-checker@latest validate --standard publiccode --input ./publiccode.yml
```

## JSON Schema instellen in VSCode

VSCode kan automatisch inline tips geven over ontbrekende of onjuiste properties
als je de
[JSON Schema van publiccode.yml](https://json.schemastore.org/publiccode.json)
koppelt aan je bestand. Voeg het volgende toe aan je `.vscode/settings.json`:

```json
{
  "yaml.schemas": {
    "https://json.schemastore.org/publiccode.json": "publiccode.yml"
  }
}
```

Hiervoor heb je de
[YAML-extensie van Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)
nodig. Na het instellen krijg je direct feedback over welke properties ontbreken
of onjuist zijn ingevuld.

## Bronnen

- [Pagina over de publiccode.yml standaard](../standaarden/publiccode-yml)
- [Documentatie van de publiccode.yml standaard](https://yml.publiccode.tools/schema.core.html)
- [don-checker (CLI)](https://github.com/developer-overheid-nl/don-checker)
- [JSON Schema van publiccode.yml](https://json.schemastore.org/publiccode.json)
