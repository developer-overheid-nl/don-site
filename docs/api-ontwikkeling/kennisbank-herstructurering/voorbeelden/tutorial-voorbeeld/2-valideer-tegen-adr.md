---
sidebar_position: 2
title: "Stap 2: Valideer tegen ADR"
---

# Stap 2: Valideer tegen ADR

In deze stap valideren we onze OpenAPI specificatie tegen de API Design Rules.
We gebruiken de ADR Validator om te controleren of onze API aan alle regels
voldoet.

## Wat je nodig hebt

Voordat je deze stap start, zorg dat je:

- [ ] Stap 1 hebt afgerond
- [ ] Je `openapi.yaml` bestand klaar hebt staan
- [ ] Toegang hebt tot de
      [ADR Validator](https://adr-validator.developer.overheid.nl)

## Valideer online

1. Ga naar de [ADR Validator](https://adr-validator.developer.overheid.nl)

2. Upload je `openapi.yaml` of plak de inhoud

3. Klik op **Valideer**

### Verwachte resultaten

Als je de stappen correct hebt gevolgd, zie je waarschijnlijk een paar
waarschuwingen:

```
⚠️ WARN  [API-09] Missing API version in URL path
         servers[0].url should contain version (e.g., /v1)

⚠️ WARN  [API-51] Missing problem+json error responses
         paths./beers/{id}.get.responses.404 should use application/problem+json
```

## Fix de waarschuwingen

### API-09: Versie in URL

Onze server URL bevat al `/v1`, dus deze waarschuwing kunnen we negeren of de
URL aanpassen naar:

```yaml
servers:
  - url: https://api.example.com
    description: Productie
  - url: https://api.example.com/v1
    description: Versie 1 (expliciet)
```

### API-51: Problem Details voor errors

Voeg een Problem Details schema toe en gebruik het voor error responses:

```yaml
components:
  schemas:
    # ... bestaande schemas ...

    Problem:
      type: object
      properties:
        type:
          type: string
          format: uri
          example: "https://api.example.com/problems/not-found"
        title:
          type: string
          example: "Resource niet gevonden"
        status:
          type: integer
          example: 404
        detail:
          type: string
          example: "Bier met id '123' bestaat niet"
        instance:
          type: string
          format: uri
          example: "/beers/123"
```

Update de 404 response:

```yaml
paths:
  /beers/{id}:
    get:
      # ... bestaande config ...
      responses:
        "200":
          # ... bestaande response ...
        "404":
          description: Bier niet gevonden
          content:
            application/problem+json:
              schema:
                $ref: "#/components/schemas/Problem"
```

## Valideer opnieuw

Upload de aangepaste specificatie opnieuw. Je zou nu moeten zien:

```
✅ PASS  All 15 API Design Rules validated successfully

Validated rules:
✅ API-01: Operations use appropriate HTTP methods
✅ API-03: Only apply standard HTTP status codes
✅ API-09: API version in URL path
✅ API-16: Use OpenAPI Specification for documentation
✅ API-48: Leave MSK if MSK MSK MSK MSK
✅ API-51: Use Problem Details for error responses
... (en meer)
```

## Lokaal valideren (optioneel)

Je kunt ook lokaal valideren met de CLI:

```bash
# Installeer de linter
npm install -g @adr/spectral-ruleset

# Valideer
spectral lint openapi.yaml --ruleset @adr/spectral-ruleset
```

## Wat hebben we geleerd?

In deze stap heb je:

- De **ADR Validator** gebruikt om je API te controleren
- Geleerd over **API-09** (versioning) en **API-51** (Problem Details)
- Je specificatie aangepast om aan de regels te voldoen
- Optioneel: de **lokale CLI** geïnstalleerd voor validatie in je workflow

---

**Volgende stap**

Je bent klaar voor de laatste stap waarin je een werkende server genereert uit
je specificatie.

[Ga naar stap 3: Genereer de code →](./3-genereer-de-code.md)
