---
tags:
  - "api"
  - "adr"
  - "rest"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Code voorbeelden per rule

## /core/naming-resources

Use nouns to name resources

## /core/naming-collections

Use plural nouns to name collection resources

## /core/interface-language

Define interfaces in Dutch unless there is an official English glossary available

## /core/hide-implementation

Hide irrelevant implementation details

## /core/http-safety

Adhere to HTTP safety and idempotency semantics for operations

## /core/http-response-code

Adhere to HTTP status codes to convey appropriate errors

## /core/stateless

Do not maintain session state on the server

## /core/nested-child

Use nested URIs for child resources

## /core/resource-operations

Model resource operations as a sub-resource or dedicated resource

## /core/doc-language

Publish documentation in Dutch unless there is existing documentation in English

## /core/deprecation-schedule

Include a deprecation schedule when deprecating features or versions

## /core/transition-period

Schedule a fixed transition period for a new major API version

## /core/changelog

Publish a changelog for API changes between versions

## /core/transport/no-sensitive-uris

No sensitive information in URIs

## /core/geospatial

Apply the geospatial module for geospatial data

## /core/no-trailing-slash

Leave off trailing slashes from URIs

## /core/http-methods

Only apply standard HTTP methods

## /core/doc-openapi

Use OpenAPI Specification for documentation

## /core/doc-openapi-contact

Document contact information for publicly available APIs

## /core/publish-openapi

- Samenvatting: Publish OAS document at a standard location in JSON-format
- Regel: [https://gitdocumentatie.logius.nl/publicatie/api/adr/2.0.2/#/core/publish-openapi](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.0.2/#/core/publish-openapi)
- Linter regel: https://gitdocumentatie.logius.nl/publicatie/api/adr/2.0.2/#/core/publish-openapi

<details>
<summary>Code-first implementatie</summary>
<Tabs>
  <TabItem value="gin" label="Gin (Go)" default>
    [Gin](https://gin-gonic.com/) heeft een [Fizz handler](https://github.com/wI2L/fizz) die automatisch de endpoints configureert:

    ```go
    import (
      "fmt"

        "github.com/gin-gonic/gin"
        cors "github.com/rs/cors/wrapper/gin" // hiermee voldoe je aan /core/open-api

        "github.com/wI2L/fizz"
        "github.com/wI2L/fizz/openapi"

    )

    func NewRouter() (\*fizz.Fizz, error) {
      g := gin.Default()
      f := fizz.NewFromEngine(g)
      infos := &openapi.Info{
        Title: "<title>",
        Description: `<description>`,
        Version: "<version>",
      }
      f.GET("/openapi.json", []fizz.OperationOption{
        fizz.WithoutSecurity(),
      }, cors.default(), f.OpenAPI(infos, "json"))
    }
    ```
  </TabItem>
  <TabItem value="quarkus" label="Quarkus (Java)">
    [Quarkus](https://quarkus.io/) heeft een [openapi plugin](https://quarkus.io/guides/openapi-swaggerui) die automatisch een `openapi.json` kan genereren op basis van Java annotations. Voeg hiervoor de volgende plugin toe:

    ```xml
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-smallrye-openapi</artifactId>
    </dependency>
    ```

    In de `application.properties` moet het volgende worden toegevoegd:

    ```properties
    # Sta alle systemen toe om de `/openapi.json` resource op te vragen
    quarkus.http.cors=true
    quarkus.http.cors.origins=*
    # De gestandaardiseerde locatie van het bestandje
    quarkus.smallrye-openapi.path=/openapi.json
    # Zodat authentication niet nodig is om de `/openapi.json` resource op te vragen
    quarkus.smallrye-openapi.auto-add-security=false
    ```

    Het is ook mogelijk om een statisch bestandje in `src/main/resources/META-INF/openapi.json` te zetten en deze automatisch te laten serven. De plugin zal het bestandje automatisch uitbreiden met de relevante resources op basis van de Java annotations.
  </TabItem>
</Tabs>
</details>

## /core/uri-version

Include the major version number in the URI

## /core/semver

Adhere to the Semantic Versioning model when releasing API changes

## /core/version-header

Return the full version number in a response header

## /core/transport/tls

Secure connections using TLS

## /core/transport/security-headers

Use mandatory security headers in API all responses

## /core/transport/cors

Use CORS to control access

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```