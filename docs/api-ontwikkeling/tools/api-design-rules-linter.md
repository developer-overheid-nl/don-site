---
content_type: tool
tags: [adr, api]
---

# ADR Checker

De ADR Checker controleert of een OpenAPI Specificatie compliant is met de API
Design Rules. De checker is gebaseerd op de
[DON Checker](https://github.com/developer-overheid-nl/don-checker).

## Browser

Een OpenAPI Specificatie kan online getest worden via onze online ADR Checker:
[https://developer-overheid-nl.github.io/don-checker/#/adr](https://developer-overheid-nl.github.io/don-checker/#/adr)

### Resultaten interpreteren

De ADR Checker toont drie soorten meldingen:

| Type    | Betekenis                                                                  |
| ------- | -------------------------------------------------------------------------- |
| Error   | Moet opgelost worden - de OAS voldoet niet aan een verplichte ADR-regel.   |
| Warning | Aanbevolen om op te lossen - de OAS voldoet niet aan een aanbevolen regel. |
| Info    | Ter informatie - suggesties voor verbetering.                              |

## CLI

Je kunt een OAS via de commandline op de volgende manier valideren:

```sh
# From a local file (ADR, default version)
npx @developer-overheid-nl/don-checker@latest validate --standard adr --input ./openapi.json

# Pin a specific version
npx @developer-overheid-nl/don-checker@latest validate --standard adr --version 2.1.0 --input ./openapi.json

# From an external file (ADR, default version)
npx @developer-overheid-nl/don-checker@latest validate --standard adr \
  --input https://api.developer.overheid.nl/api-register/v1/openapi.json

# From stdin
cat openapi.json | npx @developer-overheid-nl/don-checker@latest validate --standard adr
```

## Docker

```bash
docker run --rm node:24-alpine \
  npx @developer-overheid-nl/don-checker@latest validate --standard adr \
    --input https://api.developer.overheid.nl/api-register/v1/openapi.json
```

## Git workflows

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

<Tabs groupId="git-workflow">
  <TabItem value="gitlab" label="GitLab CI">
    ```yaml title=".gitlab-ci.yml"
    adr-check:
      image: node:24
      stage: adr_check
      script:
        - npx @developer-overheid-nl/don-checker@latest validate --standard adr --input $OAS_URL_OR_FILE
      rules:
        - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
          when: always
        - when: manual
    ```
  </TabItem>
  <TabItem value="github" label="GitHub Actions" default>
  ```yaml title=".github/workflows/adr-check.yml"
  name: ADR check
  on:
    pull_request:
    workflow_dispatch:
  jobs:
    adr-check:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 24
        - name: Valideer OAS tegen de API Design Rules
          run: |
            npx @developer-overheid-nl/don-checker@latest validate \
              --standard adr --input ${{ env.OAS_URL_OR_FILE }}
          env:
            OAS_URL_OR_FILE: ./openapi.json
  ```
  </TabItem>
  
</Tabs>
