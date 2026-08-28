---
content_type: architectuur
tags:
  - api
  - rest
---

# Paginering van collecties

Paginering (of _pagineren_) is een patroon om een collectie binnen een REST API
(bijvoorbeeld `/documenten`) in delen op te halen. Dit is geschikt voor het
browsen of batchgewijs verwerken van grote hoeveelheden data. Of paginering
bruikbaar is, hangt af van de benodigde garanties voor de consumer.

De meest gangbare varianten zijn **offset-based** en **cursor-based** (ook wel
key-based).

## Offset-based paginering

De consumer geeft een absoluut startpunt op:

```http
GET /items?page=2
GET /items?offset=20&limit=10
```

De implementatie is eenvoudig en maakt willekeurige paginatoegang (random
access) en parallel opvragen mogelijk. Twee nadelen: offset-based paginering is
[traag bij grote datasets](https://www.postgresql.org/docs/current/queries-limit.html)
(de database moet voorgaande rijen ophalen en overslaan), en gevoelig voor
**page skew** — muteert de collectie tijdens het pagineren, dan verschuiven
items over pagina's en ziet de consumer items dubbel of mist ze.

Geschikt voor kleine of stabiele collecties waar random access gewenst is en een
incidenteel gemist of dubbel item acceptabel is. Voor grote of snel muterende
collecties is cursor-based paginering de betere keuze.

## Cursor-based paginering

De consumer navigeert door een lijst op basis van een referentie (de cursor)
naar de volgende of vorige pagina:

```http
GET /items?limit=25
GET /items?cursor=Q12afE81mx7kLp&limit=25
```

De eerste aanroep heeft geen cursor; de API geeft de eerste pagina terug. De API
geeft in het antwoord het actuele deel uit de dataset én de cursor voor de
volgende stap. Gebruik hiervoor een ondoorzichtige cursor (opaque pointer),
zodat consumers geen aannames doen over de interne sortering:

```json
{
  "items": [...],
  "next_cursor": "A8762JBHW2i7us"
}
```

Een goede cursor vereist een oplopend, sequentieel id — zoals een
[UUIDv7](https://www.rfc-editor.org/rfc/rfc9562#name-uuid-version-7) — of een
combinatie van een (publicatie)datum en uniek id als stabiele, indexeerbare
sorteersleutel. Cursor-based paginering is efficiënt bij grote datasets en
robuuster tegen page skew, en past goed bij _infinite scroll_ en
batchverwerking. Het biedt echter geen willekeurige paginatoegang en een totaal
aantal resultaten is niet vanzelfsprekend beschikbaar; als de consumer dit nodig
heeft, is offset-based eenvoudiger.

## Paginering vs. dataconsistentie

Beide methodes zijn **ongeschikt** als dataconsistentie gewenst is: paginering
is geen mechanisme voor synchronisatie van collecties. Muteert de collectie
tijdens of tussen requests? Dan kun je paginering alléén inzetten als een
incidenteel gemist of dubbel item acceptabel is (bijv. bij niet-persistente
weergave of browsen).

Voor strikte synchronisatie waarbij elke wijziging betrouwbaar moet doorkomen,
is een apart synchronisatiepatroon nodig.

| Eigenschap                       | Offset-based                 | Cursor-based / key-based        |
| -------------------------------- | ---------------------------- | ------------------------------- |
| Willekeurige toegang             | Ja                           | Nee                             |
| Totaal aantal resultaten         | Ja                           | Niet vanzelfsprekend            |
| Schaalbaarheid                   | Beperkt bij grote collecties | Goed                            |
| Gedrag bij mutaties              | Gevoelig voor page skew      | Robuuster tussen pagina's       |
| Sorteervolgorde                  | Vrij kiesbaar                | Vaste, stabiele sleutel vereist |
| Implementatiecomplexiteit        | Laag                         | Hoger                           |
| Toevoeging aan bestaand endpoint | Non-breaking mogelijk        | Mogelijk, maar niet eenvoudig   |

## Voorbeeld in OpenAPI

```yaml
paths:
  /items:
    get:
      summary: Haal een pagina van items op
      parameters:
        - name: cursor
          in: query
          required: false
          description:
            Ondoorzichtige verwijzing naar de huidige positie in de dataset
            (opaque pointer). Weglaten geeft de eerste pagina terug. De waarde
            mag niet geïnterpreteerd of zelf samengesteld worden door de
            consumer.
          schema:
            type: string
        - name: limit
          in: query
          required: false
          description:
            Maximum aantal items per pagina. De API hanteert een eigen default
            en maximum; een lagere waarde is altijd mogelijk.
          schema:
            type: integer
            minimum: 1
      responses:
        "200":
          description: Pagina van items
          content:
            application/json:
              schema:
                type: object
                required:
                  - items
                  - next_cursor
                properties:
                  items:
                    type: array
                    items:
                      $ref: "#/components/schemas/Item"
                  next_cursor:
                    type: string
                    nullable: true
                    description:
                      Cursor voor de volgende pagina. Null als er geen volgende
                      pagina meer is.
```

## Referenties

- [Swiss Federal Administration API Guidelines — Pagination](https://github.com/swiss/api-guidelines/blob/main/README.md#12-rest-design---pagination)
