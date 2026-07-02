---
content_type: tutorial
tags:
  - "informatiebeveiliging"
title: "Stappenplan voor het veilig in gebruik nemen van HSTS"
---

## Doel

Dit stappenplan beschrijft hoe HTTP Strict Transport Security (HSTS) gefaseerd
en beheerst kan worden ingevoerd. Het doel is om het risico op verstoringen te
beperken, terwijl wordt toegewerkt naar een volledig conforme HSTS-configuratie.

Voor achtergrondinformatie over de werking, wettelijke verplichtingen en
inhoudelijke eisen van HSTS wordt verwezen naar het zusterartikel
[Standaard: HTTP Strict Transport Security](/kennisbank/security/standaarden/hsts).

Dit document richt zich op de praktische implementatie en kan tevens worden
gebruikt als handreiking bij het oplossen van een non-compliancy waarbij HSTS
ontbreekt of onjuist is geconfigureerd.

---

# Fase 1 – Inventarisatie

## Stap 1: Bepaal de scope

Inventariseer:

* Het hoofddomein.
* Alle bekende subdomeinen.
* Externe diensten die onder het domein gepubliceerd worden.
* CNAME-records die verwijzen naar externe leveranciers of cloudplatformen.

Documenteer expliciet welke DNS-namen onder het domein vallen.
Documenteer expliciet welke DNS-namen een http, of https dienst aanbieden.

let op, veel domein-ontdekkingstools gebruiken de Certificate transparancy logs
om te bepalen welke subdomeinen er bestaan. In deze lijst komen vanwege het
gebrek aan certificaten domeinen zonder https dus niet voor. DNS is de enige
valide en sluitende bron van alle subdomeinen die actief zijn.

### Controlepunt

Er bestaat een actueel overzicht van alle publieke DNS-namen waarvoor HSTS
uiteindelijk moet gelden. HSTS is alleen van toepassing op domeinen en
subdomeinen waarlangs http(s) diensten beschikbaar zijn. (al dan niet op
de standaard poorten 80 en 443).

---

## Stap 2: Controleer HTTPS-functionaliteit

Verifieer voor iedere geïnventariseerde DNS-naam:

* HTTPS is beschikbaar.
* Het TLS-certificaat geldig is.
* De certificaatketen correct wordt aangeboden.
* Moderne browsers geen certificaatwaarschuwingen tonen.
* HTTP-verkeer automatisch wordt doorgestuurd naar HTTPS.

### Controlepunt

Alle bekende websites en API's functioneren volledig via HTTPS.

---

## Stap 3: Controleer afhankelijkheden

Controleer of applicaties, scripts, API-clients en integraties:

* Geen expliciete HTTP-URL's gebruiken.
* Geen mixed-content problemen veroorzaken.
* Geen afhankelijkheid hebben van onbeveiligde verbindingen.

let op, oudere clients kennen soms problemen met certificate chains. Een
onbeveiligde verbinding functioneert dan wel, waar een beveiligde verbinding zal
blokkeren op een onbekende CA of signing chain.
Een inventarisatie van webserver logs rond user-agents kan helpen inzicht te
krijgen in het gebruik van bijvoorbeeld oudere android versies op bijvoorbeeld
smart-tv's.


### Controlepunt

Er zijn geen functionele afhankelijkheden van HTTP meer aanwezig.

---

# Fase 2 – Voorzichtige introductie

## Stap 4: Bepaal welke laag in het applicatie-landschap  HSTS headers zal
plaatsen

HSTS headers kunnen op verschillende plaatsen worden toegevoegd aan de HTTP
responses. Het is belangrijk dat deze headers maar 1 maal worden uitgestuurd, en
dat het beheer er van overzichtelijk blijft.
Veel applicatie-frameworks kennen opties om HSTS headers mee te sturen, maar het
is ook mogelijk deze verantwoordelijkheid bijvoorbeeld in een reverse proxy of
ander infrastructuur deel neer te leggen. Afhankelijk van gewenste uniformiteit
en beheersbaarheid zijn verschillende juiste routes denkbaar.

## Stap 5: Activeer HSTS met een korte geldigheidsduur

Begin met een beperkte max-age zodat een configuratiefout relatief snel kan
herstellen.

Voorbeeld:

```text
Strict-Transport-Security: max-age=300
```

Dit zorgt ervoor dat browsers het beleid slechts vijf minuten onthouden.

### Waarom?

Wanneer een probleem wordt ontdekt kan de header worden verwijderd of aangepast
zonder langdurige impact voor bezoekers.

### Controlepunt

De HSTS-header wordt correct meegestuurd op (alleen) HTTPS-responses.

---

## Stap 6: Monitor gedurende meerdere dagen

Controleer gedurende de observatieperiode:

* Beschikbaarheid van de website.
* Certificaatvernieuwingen.
* Meldingen van gebruikers.
* Monitoring en logging.
* Resultaten van scanners zoals Internet.nl of OpenKAT.

### Controlepunt

Er zijn geen incidenten of bereikbaarheidsproblemen geconstateerd.

---

# Fase 3 – Verhogen van de HSTS-duur

## Stap 7: Verhoog de max-age stapsgewijs

Verhoog de geldigheidsduur in meerdere stappen.

Voorbeeld:

1. 300 seconden
2. 1 dag (86400)
3. 1 week (604800)
4. 1 maand (2592000)
5. 1 jaar (31536000)

Voorbeeldconfiguratie:

```text
Strict-Transport-Security: max-age=31536000
```

### Controlepunt

De omgeving functioneert stabiel met een langdurige HSTS-configuratie.

---

# Fase 4 – Voorbereiding op includeSubDomains

## Stap 8: Valideer alle subdomeinen

Voordat `includeSubDomains` wordt gebruikt moet voor alle subdomeinen worden
vastgesteld dat HSTS volgens bovenstaand stappenplan correct functioneert.

Dit geldt ook voor:

* Historische subdomeinen.
* Vergeten testomgevingen.
* Legacy-applicaties.
* API's.
* Externe diensten achter CNAME-records.

### Belangrijk

Een veelvoorkomende fout is dat een extern gehost subdomein via een CNAME
verwijst naar een leverancier die geen HTTPS ondersteunt of een ongeldig
certificaat gebruikt. Zodra `includeSubDomains` actief wordt, kan dat subdomein
voor gebruikers onbereikbaar worden.

### Controlepunt

Alle bestaande subdomeinen voldoen aantoonbaar aan de HTTPS-eisen of zijn reeds
zelf van HSTS voorzien.

---

## Stap 9: Activeer includeSubDomains

Pas de configuratie aan naar:

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Monitor opnieuw gedurende een langere periode.

Aanbevolen observatieperiode:

* Minimaal enkele weken.
* Bij voorkeur meerdere maanden.

### Controlepunt

Er zijn geen bereikbaarheidsproblemen op hoofd- of subdomeinen.

---

# Fase 5 – Overweging van HSTS Preload

## Stap 10: Beoordeel of preload noodzakelijk is

HSTS preload is niet verplicht voor een veilige HSTS-configuratie.

Overweeg preload uitsluitend wanneer:

* HSTS reeds langere tijd stabiel functioneert.
* Alle subdomeinen permanent HTTPS ondersteunen.
* De organisatie begrijpt dat verwijdering uit de preload-lijst langdurig kan
duren.

### Controlepunt

Er is een bewuste beheerbeslissing genomen over preload waarin zowel de
beveiligingsvoordelen gewogen zijn tegen de nadelen.

---

## Stap 11: Activeer potentieel preload

[Voldoe eerst aan alle preload-voorwaarden.](https://hstspreload.org/#submission-requirements)

Voorbeeld:

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

Dien het domein vervolgens in voor opname in de preload-lijst.

[Aanmelden voor preload](https://hstspreload.org/)

### Waarschuwing

Na opname in browsers kan het maanden duren voordat een foutieve preload-configuratie volledig is teruggedraaid.

---

# Validatiechecklist

Gebruik onderstaande checklist voordat een implementatie als afgerond wordt beschouwd.

## HTTPS

* [ ] HTTPS werkt op het hoofddomein.
* [ ] HTTP wordt doorgestuurd naar HTTPS.
* [ ] Certificaten zijn geldig.
* [ ] Certificaatvernieuwing is ingericht.

## Inventarisatie

* [ ] Alle subdomeinen zijn geïnventariseerd.
* [ ] CNAME-records zijn beoordeeld.
* [ ] Externe leveranciers zijn gecontroleerd.

## HSTS

* [ ] HSTS is eerst met een korte max-age getest.
* [ ] Max-age is gefaseerd verhoogd.
* [ ] Monitoring heeft geen problemen aangetoond.

## includeSubDomains

* [ ] Alle subdomeinen ondersteunen HTTPS of bieden al HSTS aan.
* [ ] Legacy- en testomgevingen zijn gecontroleerd.
* [ ] Externe diensten achter CNAME-records zijn gevalideerd.

## Preload

* [ ] HSTS functioneert reeds langere tijd stabiel.
* [ ] De impact van preload is beoordeeld.
* [ ] Aan alle preload-voorwaarden wordt voldaan.

---

# Gebruik bij non-compliancy

Wanneer een audit of scan meldt dat HSTS ontbreekt of onvoldoende is geconfigureerd:

1. Controleer of HTTPS volledig functioneert.
2. Activeer HSTS met een korte max-age.
3. Valideer de werking.
4. Verhoog de max-age gefaseerd.
5. Onderzoek alle subdomeinen.
6. Activeer vervolgens `includeSubDomains`.
7. Overweeg preload pas nadat de configuratie langdurig stabiel heeft gefunctioneerd.

Hiermee wordt toegewerkt naar een volledig conforme implementatie met een beheerst risico op verstoringen.
