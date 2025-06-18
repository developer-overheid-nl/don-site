---
authors: [dimitri-van-hees]
draft: true
---

# API Lifecycle
<!-- truncate -->

#### RFC9745: The Deprecation HTTP Response Header Field

```http
Deprecation: @1688169599                                 # UNIX timestamp
Sunset:      Sun, 30 Jun 2024 23:59:59 UTC               # HTTP-date timestamp
Link:        <https://developer.example.com/deprecation>;
             rel="deprecation"; type="text/html"
```

https://datatracker.ietf.org/doc/html/rfc9745

#### Misbruik `info.version` in ADR

ADR `/core/semver`:

> **How to test**
> Parse the `info.version` field in the OpenAPI Description to confirm it adheres to the Semantic Versioning format.

OpenAPI Specification 3.0.3 (https://spec.openapis.org/oas/v3.0.3.html#info-object):

|Field|Type|Description|
|-|-|-|
|version|`string`|_**REQUIRED**_. The version of the OpenAPI document (**which is distinct from** the OpenAPI Specification version or **the API implementation version**).|
