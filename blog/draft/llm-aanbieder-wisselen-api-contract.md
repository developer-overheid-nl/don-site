---
authors: [ailoot-ai]
description: "Test het gedrag van je eigen API voordat je de achterliggende LLM-aanbieder vervangt."
tags:
  - interoperabiliteit
  - privacy
  - llm
  - oas
draft: true
---

# Van LLM-aanbieder wisselen met een toetsbaar API-contract

Een gemeentelijk webteam wil een model kunnen vervangen zonder de koppeling met zijn loket opnieuw te bouwen. Stel dat het model een vraag over openingstijden routeert naar een pagina met de officiële tijden. Een verkeerd antwoord kan ertoe leiden dat iemand voor een dichte deur staat. Je kunt de overstap toetsen met synthetische vragen en een klein contract dat vastlegt wat de toepassing mag teruggeven.

<!-- truncate -->

*Technische gastbijdrage van Ailoot AI. Het voorbeeld gebruikt fictieve invoer. Bij het opstellen is AI gebruikt.*

## Leg het contract vast aan de kant van je toepassing

In dit voorbeeld accepteert je eigen API een korte tekst. Bij een geslaagde classificatie geeft de API één veld terug, `route`, met een van drie waarden. De toepassing gebruikt `openingstijden`, `contact` of `overig` om een route te kiezen. De pagina met openingstijden blijft de bron voor de tijden zelf. De adapter vertaalt de uitvoer van het model naar het afgesproken formaat.

Beschrijf het schema van dat antwoord en de foutgevallen in OpenAPI. Spreek af wat de adapter doet als een aanbieder een onbekende waarde of een extra veld terugstuurt. De [API Design Rules](https://developer.overheid.nl/kennisbank/api-ontwikkeling/standaarden/api-design-rules/) geven overheids-API's conventies voor onder meer beschrijving, versiebeheer en foutmeldingen. [OpenAPI en voorbeeld](https://developer.overheid.nl/kennisbank/api-ontwikkeling/tutorials/bouw-een-api/)

## Draai dezelfde proef met beide aanbieders

Onderstaand script gebruikt Bash, curl en jq. Geef het de basis-URL en een kortlevend token voor je testomgeving. Het script test het publieke contract van de toepassing. Laat het eenmaal draaien met de oude aanbieder en daarna met de kandidaat in de testomgeving. Houd de versie van de toepassing, de opbouw van de invoer en de verwachte categorie gelijk.

```bash
set -eu

body=$(mktemp)
trap 'rm -f "$body"' EXIT

status=$(curl --silent --show-error --fail --max-time 10 \
  --header "Authorization: Bearer ${SANDBOX_TOKEN:?}" \
  --header 'Content-Type: application/json' \
  --data-binary '{"text":"Wanneer is het loket in deze test geopend?"}' \
  --output "$body" --write-out '%{http_code}' \
  "${SANDBOX_URL%/}/v1/verzoeken/classificeren")

test "$status" = 200
jq --slurp --exit-status \
  'length == 1 and .[0] == {"route":"openingstijden"}' "$body" >/dev/null
```

Deze check stopt ook bij een HTTP 200 met een onbekende categorie, HTML of meerdere JSON-berichten. Test daarnaast het afgesproken foutpad: simuleer in de adapter een verlopen token, HTTP 429 en een leverancier die na verzending geen antwoord meer geeft. Controleer dat de toepassing in die gevallen de gebruiker naar de gewone navigatie stuurt. Stel automatische retries bij POST alleen in als je weet dat herhaling geen extra effect heeft of als je kunt vaststellen dat het eerste verzoek niet is uitgevoerd. [HTTP Semantics, paragraaf 9.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2)

## Maak de terugweg onderdeel van het experiment

Maak een kleine, genummerde set fictieve vragen voordat je de kandidaat test. Neem ook varianten met een spelfout, verschillende formuleringen en een onduidelijke vraag op. Leg per vraag vast welke categorieën aanvaardbaar zijn. Herhaal de set een paar keer, omdat modeluitvoer kan variëren. Beoordeel per modelversie hoeveel antwoorden in een geldige categorie vallen, hoeveel verzoeken mislukken en hoeveel tijd de toepassing nodig heeft. Houd contractfouten en classificatiefouten apart.

Spreek vóór de overstap af welke uitkomst tot terugdraaien leidt. Oefen in de testomgeving het terugzetten van de instelling en herhaal dezelfde set. Bewaar voor de vergelijking de test-ID, configuratieversie, status, categorie en responstijd. Voor deze proef zijn burgergegevens, volledige invoer en antwoordteksten in operationele logs overbodig. Met de twee testresultaten en de uitgevoerde terugweg kan het team onderbouwen of de overstap klaar is.
