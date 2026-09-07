# Automatisch testen van OpenAPI Specification in je CI/CD

Wanneer je wil voldoen aan een API standaard, is het waardevol om dit automatisch te testen. 
Als deze API al beschreven is als OpenAPI spec, dan is dit gelukkig vrij eenvoudig om te doen.
Met tools als [Schemathesis](https://schemathesis.io/) kan je direct in je CI/CD pipeline testen of je de endpoints goed hebt geïmplementeerd.
Hier volgen 3 voorbeelden van hoe je dit kan doen, met Docker, Github Actions en GitLab CI.

## Docker

```sh
docker run --rm schemathesis/schemathesis run https://raw.githubusercontent.com/VNG-Realisatie/gemma-zaken/refs/heads/master/api_specs/v1/autorisaties/openapi.yaml \
# Jouw API URL
--url https://localhost:8080/api/v1
```

## Github Actions

```yaml
name: API Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: schemathesis/action@v2
        with:
          # API schema adres, hier ZGW als voorbeeld
          schema: 'https://raw.githubusercontent.com/VNG-Realisatie/gemma-zaken/refs/heads/master/api_specs/v1/autorisaties/openapi.yaml'
          # Jouw API URL
          base-url: 'https://localhost:8080/api/v1'
          # Zie alle overige opties:
          # https://github.com/schemathesis/action?tab=readme-ov-file#configuration
```

## GitLab CI

```yaml
stages:
  - test

api-tests:
  stage: test
  image:
    name: schemathesis/schemathesis:stable
    entrypoint: ["https://localhost:8080/api/v1"]
  services:
    - name: your-api:latest
      alias: api
  variables:
    API_TOKEN: "jouw-geheime-token"
  script:
    - >
      schemathesis run http://api:8080/openapi.json
      --header "Authorization: Bearer $API_TOKEN"
      --wait-for-schema 60
      --report junit
  artifacts:
    when: always
    reports:
      junit: schemathesis-report/junit.xml
    paths:
      - schemathesis-report/
```
