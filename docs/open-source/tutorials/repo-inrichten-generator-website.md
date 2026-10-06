---
content_type: tutorial
tags: [open-source, publiccode-yml, license, changelog, cli]
---

# Repo inrichten met generator (website)

Met de
[Repository Docs Generator](https://developer-overheid-nl.github.io/repo-docs-generator/#/README.md)
kun je een repository voorzien van de juiste bestanden.

De generator genereert de volgende files:

- `SECURITY.md`
- `LICENCE.md`
- `README.md`
- `CODE_OF_CONDUCT.md`
- `CHANGELOG.md`
- `publiccode.yml`

## 1. Vul de JSON in

Ga naar de
[generator](https://developer-overheid-nl.github.io/repo-docs-generator) en vul
de JSON aan de linkerkant in.

## 2. Kopieer de inhoud van de bestanden

Kopieer de inhoud van de rechter editor door middel van deze knop aan de
rechterkant van het scherm:

![Screenshot van de Repository Docs Generator met de kopieerknop](./img/screenshot-copy-button.png)

Selecteer verschillende templates via deze dropdown:

![Screenshot van de Repository Docs Generator met dropdown menu voor template selectie](./img/screenshot-repo-generator.png)

## 3. Pas de inhoud aan

Pas de inhoud van de bestanden aan naar wat van toepassing is op jouw project.

Wil je je `publiccode.yml` nog checken op errors? Gebruik dan de
[publiccode-checker](https://developer-overheid-nl.github.io/don-checker/#/publiccode).

## Bronnen

- [Meer over de Repository Docs Generator](../tools/repo-docs-generator#cli)
- [GitHub van de repo-docs-generator](https://github.com/developer-overheid-nl/repo-docs-generator).
- [Publiccode-checker](./publiccode-yml-checker)
