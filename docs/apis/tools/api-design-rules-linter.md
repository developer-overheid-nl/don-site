---
tags:
  - "adr"
  - "api"
title: "API Design Rules Linter"
---

api-design-rulesDe ADR Linter controleert of een OpenAPI Specificatie compliant is met de API Design Rules. De linter is gebaseerd op het Open Source project [Spectral](https://github.com/stoplightio/spectral).

## CLI

Als je Spectral geïnstalleerd hebt, kun je een OAS via de commandline op de volgende manier valideren:

```bash
$ spectral lint -r https://developer.overheid.nl/static/adr/ruleset.yaml $OAS_URL_OR_FILE
```

## IDE

Sommige IDEs ondersteunen Spectral via extensies of plugins. Eén daarvan is VSCode. Hieronder staat beschreven hoe je de ADR Linter kunt gebruiken met [de officiele Spectral extensie voor Visual Studio Code](https://github.com/stoplightio/vscode-spectral):

```bash
# Install the extension from the vscode marketplace
$ code --install-extension stoplight.spectral

# Download the ruleset to your project home
$ curl https://developer.overheid.nl/static/adr/ruleset.yaml > .spectral.yml

# Run the IDE
$ code
```

## Docker

```bash
$ docker run --rm --entrypoint=sh \
    -v $(pwd)/api:/locale stoplight/spectral:5.9.1 \
    -c "spectral lint -r https://developer.overheid.nl/static/adr/ruleset.yaml"
```
