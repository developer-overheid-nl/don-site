---
content_type: tutorial
tags:
  - "open-source"
  - "publiccode-yml"
  - "vscode"
  - "json-schema"
sidebar_position: 1
---

# Voeg een publiccode.yml toe aan je project

:::tip[**publiccode.yml editor beschikbaar**]

Werk jij liever in een web-editor? Dan kan je gebruik maken van de
[Publiccode.yml Editor](https://publiccode-editor.developers.italia.it/?lang=nl)

:::

In deze tutorial leggen we uit hoe je een `publiccode.yml`-bestand kan toevoegen
aan je project.

## Waarom een publiccode.yml toevoegen aan je project?

### Groene "flag"

De belangrijkste reden om een publiccode.yml-bestand aan je project toe te
voegen, is om je project beter vindbaar te maken. Dit bestand fungeert als een
herkenbare flag voor open source softwarecatalogi, waarmee jouw project wordt
geïdentificeerd als een potentieel herbruikbaar stuk code.

### Machine-leesbare metadata

Door het publiccode.yml bestand in te vullen voorzie je je project van
machine-leesbare metadata. Deze meta-data kan ingelezen worden door Open Source
Software Catalogi om jou code zo nog beter vindbaar te maken.

Voor meer informatie, ga naar de
[pagina over de publiccode.yml standaard](../standaarden/publiccode-yml).

## Stappenplan

### Stap 1 - Voeg een publiccode.yml bestand toe

Voeg een bestand toe aan de root van je project met de filename:
`publiccode.yml`.

### Stap 2 - Kopieer ons voorbeeld

Kopieer ons voorbeeld op [deze pagina](../standaarden/publiccode-yml). En plak
deze in jouw `publiccode.yml`-bestand.

### Stap 3 - Pas het voorbeeld aan

Pas alle waarden aan met informatie over jouw project. Ben je opzoek naar
informatie over de properties van de standard? Ga dan naar de
[documentatie van de standaard](https://yml.publiccode.tools/schema.core.html).

### Stap 4 - Valideer je publiccode.yml

Gebruik de [publiccode-parser](../tools/publiccode-yml-parser) om je bestand te
valideren. De makkelijkste manier is via Docker:

```shell
cat publiccode.yml | docker run -i italia/publiccode-parser-go /dev/stdin
```

Of installeer de tool lokaal via Go:

```shell
go install github.com/italia/publiccode-parser-go/v5/publiccode-parser@latest
publiccode-parser publiccode.yml
```

:::warning[**Go bin-map nog niet in je PATH?**]

Als het commando `publiccode-parser` niet gevonden wordt, voeg dan de Go bin-map
toe aan je PATH:

```shell
echo 'export PATH=$PATH:$(go env GOPATH)/bin' >> ~/.bashrc
source ~/.bashrc
```

:::

Bij een geldig bestand geeft de tool exit code `0` terug. Fouten worden
weergegeven met de locatie in het bestand en een uitleg.

### Stap 5 (optioneel) - Voeg validatie toe aan je CI/CD-pipeline

Door de parser te draaien in je pipeline weet je zeker dat je `publiccode.yml`
altijd geldig is.

**GitHub Actions**

```yaml
- name: Validate publiccode.yml
  run: cat publiccode.yml | docker run -i italia/publiccode-parser-go /dev/stdin
```

**GitLab CI**

```yaml
validate-publiccode:
  image: docker:latest
  services:
    - docker:dind
  script:
    - cat publiccode.yml | docker run -i italia/publiccode-parser-go /dev/stdin
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
