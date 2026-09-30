---
title: "Publiccode.yml checker"
description:
  "De publiccode.yml checker controleert of een publiccode.yml valide is volgens
  de publiccode.yml standaard."
content_type: tool
tags: [open-source, publiccode-yml, publiccode, validator, cli, ci/cd]
---

# Publiccode.yml checker

De publiccode.yml checker controleert of een publiccode.yml valide is volgens de
[publiccode.yml standaard](../standaarden/publiccode-yml). De checker is
onderdeel van de
[developer.overheid.nl checker (don-checker)](https://github.com/developer-overheid-nl/don-checker),
die ook OpenAPI-specificaties controleert op de
[API Design Rules](../../api-ontwikkeling/tools/api-design-rules-linter.md).

## Browser

Een publiccode.yml kan getest worden via onze
[online publiccode.yml checker](https://developer-overheid-nl.github.io/don-checker/#/publiccode).

## CLI

Je kunt een publiccode.yml via de commandline op de volgende manier valideren:

```sh
# Vanuit een lokaal bestand (standaard de nieuwste versie, 0.7)
npx @developer-overheid-nl/don-checker@latest validate --standard publiccode --input ./publiccode.yml

# Een specifieke versie van de standaard kiezen (0.5 of 0.7)
npx @developer-overheid-nl/don-checker@latest validate --standard publiccode --version 0.5 --input ./publiccode.yml

# Vanuit een extern bestand
npx @developer-overheid-nl/don-checker@latest validate --standard publiccode \
  --input https://raw.githubusercontent.com/developer-overheid-nl/don-site/main/publiccode.yml

# Vanuit stdin
cat publiccode.yml | npx @developer-overheid-nl/don-checker@latest validate --standard publiccode
```

Handige opties:

| Optie               | Beschrijving                                        | Standaard |
| ------------------- | --------------------------------------------------- | --------- |
| `--version <id>`    | Versie van de standaard: `0.5` of `0.7`             | `0.7`     |
| `--format <fmt>`    | Uitvoer als `table` of `json`                       | `table`   |
| `--fail-on <level>` | Wanneer de checker faalt: `none`, `warn` of `error` | `error`   |

De checker stopt met exitcode `0` als de publiccode.yml valide is en met `1` als
de validatie faalt.

## Docker

```bash
docker run --rm -v "$PWD:/work" -w /work node:24-alpine \
  npx @developer-overheid-nl/don-checker@latest validate --standard publiccode \
    --input ./publiccode.yml
```

## Git workflows

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

<Tabs groupId="git-workflow">
  <TabItem value="gitlab" label="GitLab CI">
    ```yaml title=".gitlab-ci.yml"
    publiccode-check:
      image: node:24
      stage: test
      script:
        - npx @developer-overheid-nl/don-checker@latest validate --standard publiccode --input ./publiccode.yml
      rules:
        - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
          when: always
        - when: manual
    ```
  </TabItem>
  <TabItem value="github" label="GitHub Actions" default>
  ```yaml title=".github/workflows/publiccode-check.yml"
  name: publiccode.yml check
  on:
    pull_request:
    workflow_dispatch:
  jobs:
    publiccode-check:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 24
        - name: Valideer publiccode.yml
          run: |
            npx @developer-overheid-nl/don-checker@latest validate \
              --standard publiccode --input ./publiccode.yml
  ```
  </TabItem>
  <TabItem value="forgejo" label="Forgejo Actions">
  ```yaml title=".forgejo/workflows/publiccode-check.yml"
  name: publiccode.yml check
  on:
    pull_request:
    workflow_dispatch:
  jobs:
    publiccode-check:
      # Gebruik het label van je eigen Forgejo runner
      runs-on: docker
      container:
        image: node:24
      steps:
        - uses: https://data.forgejo.org/actions/checkout@v4
        - name: Valideer publiccode.yml
          run: |
            npx @developer-overheid-nl/don-checker@latest validate \
              --standard publiccode --input ./publiccode.yml
  ```
  </TabItem>

</Tabs>

## Externe links

- [developer.overheid.nl checker op GitHub](https://github.com/developer-overheid-nl/don-checker)
- [Online publiccode.yml checker](https://developer-overheid-nl.github.io/don-checker/#/publiccode)
