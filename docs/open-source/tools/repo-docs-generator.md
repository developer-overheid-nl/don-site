---
title: "Repository Docs Generator"
description:
  "De Repository Docs Generator maakt in één keer de standaardbestanden voor een
  open source repository, zoals een README.md, SECURITY.md en publiccode.yml."
content_type: tool
tags: [open-source, publiccode-yml, license, changelog, cli]
---

# Repository Docs Generator

De Repository Docs Generator maakt de files voor je aan die een open source
project ten minste nodig heeft. Je vult één keer de gegevens van je project in,
en de generator maakt daar alle bestanden van.

De generator maakt de volgende bestanden:

| Bestand              | Functie                                                                                                  | Meer informatie                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `README.md`          | Legt uit wat het project doet en hoe je het installeert en gebruikt                                      | [README.md](../standaarden/readme-md)                                         |
| `CONTRIBUTING.md`    | Beschrijft hoe anderen kunnen bijdragen aan het project                                                  | [CONTRIBUTING.md](../standaarden/contributing-md)                             |
| `CODE_OF_CONDUCT.md` | Legt de gedragsregels van de community vast                                                              | [CODE_OF_CONDUCT.md](../standaarden/code-of-conduct-md)                       |
| `SECURITY.md`        | Vertelt je hoe je een kwetsbaarheid veilig meldt                                                         | [SECURITY.md](../standaarden/security)                                        |
| `LICENSE.md`         | Bepaalt onder welke voorwaarden anderen de code mogen gebruiken (standaard een EUPL licentie)            | [Open source software licenties](../tutorials/open-source-software-licenties) |
| `CHANGELOG.md`       | Houdt per versie bij wat er is veranderd                                                                 |                                                                               |
| `publiccode.yml`     | Beschrijft het project in een gestandaardiseerd formaat, zodat anderen het kunnen vinden en hergebruiken | [publiccode.yml](../standaarden/publiccode-yml)                               |

De bestanden zijn gebaseerd op de
[templates in de repository](https://github.com/developer-overheid-nl/repo-docs-generator/tree/main/templates)
van de generator. Pas de uitkomst daarna aan op je eigen project.

## Browser

Open de
[Repository Docs Generator](https://developer-overheid-nl.github.io/repo-docs-generator/#/README.md)
en vul de JSON aan de linkerkant in met de gegevens van je project. Aan de
rechterkant zie je het resultaat. Kies met de dropdown welk bestand je wilt zien
en kopieer de inhoud met de kopieerknop.

:::tip[Stap voor stap]

Volg de tutorial
[Repo inrichten met de generator (web-app)](../tutorials/repo-inrichten-generator-webapp)
voor een uitleg met screenshots.

:::

## CLI

De generator is ook via de command line te gebruiken. De CLI gebruikt dezelfde
templates en validatie als de web-app.

:::tip[Stap voor stap]

Volg de tutorial
[Repo inrichten met de generator (CLI)](../tutorials/repo-inrichten-generator-cli)
voor een uitleg van begin tot eind.

:::

### Voorbeelden

```sh
# Maak een voorbeeld input.json als startpunt
npx github:developer-overheid-nl/repo-docs-generator --init

# Genereer alle bestanden in de map ./generated
npx github:developer-overheid-nl/repo-docs-generator input.json -o ./generated

# Genereer alleen een README.md en SECURITY.md
npx github:developer-overheid-nl/repo-docs-generator input.json -t README.md -t SECURITY.md
```

Handige opties:

| Optie                   | Beschrijving                                            | Standaard    |
| ----------------------- | ------------------------------------------------------- | ------------ |
| `-o, --out <dir>`       | Map waarin de bestanden komen                           | `output`     |
| `-t, --template <name>` | Genereer alleen dit bestand; mag vaker voorkomen        | alle         |
| `-l, --list`            | Toon de beschikbare templates                           |              |
| `--init`                | Schrijf een voorbeeld input-bestand weg                 | `input.json` |
| `--force`               | Overschrijf een bestaand bestand bij `--init`           |              |
| `--skip-validation`     | Sla de controle van de input tegen het JSON-schema over |              |

De generator controleert de input tegen een JSON-schema
(`input_json_schema.json` in de repository). Een fout in je input zie je dus
meteen, en niet pas in de gegenereerde bestanden.

## Controleer je publiccode.yml

Controleer de gegenereerde `publiccode.yml` met de
[publiccode.yml checker](./publiccode-yml-checker) voordat je hem publiceert.

## Externe links

- [Repository Docs Generator](https://developer-overheid-nl.github.io/repo-docs-generator/#/README.md)
- [Repository Docs Generator op GitHub](https://github.com/developer-overheid-nl/repo-docs-generator)
