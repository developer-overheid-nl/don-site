---
tags:
  - "front-end"
  - "accessibility"
  - "axe"
---

# Axe accessibility checker

[Axe](https://www.deque.com/axe/) is een veelgebruikte accessibility checker die de WCAG guidelines (grotendeels) automatisch kan checken

## Integratie met DevTools

Axe DevTools is een browserplugin die voor zowel Chrome als Firefox beschikbaar is. Meer informatie over de plugin vind je hier:
[Axe DevTools](https://www.deque.com/axe/devtools)

## Integratie met GitHub Actions

```yaml
jobs:
  wcag:
    name: WCAG
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
        # Installeer de Axe CLI inclusief het installeren van de browser manager
      - run: npm install @axe-core/cli browser-driver-manager -g
        # Installeer Chrome. Kan ook een andere browser zijn
      - run: npx browser-driver-manager install chrome
        # Vereist om een apart proces te runnen voor het serveren van files. Dat
        # kan niet in dezelfde job. De HTTP server wordt ook netjes opgeruimd als
        # deze job klaar is
      - name: Serve Files
        uses: Eun/http-server-action@v1
        with:
          content-types: |
            {
              "css": "text/css",
              "html": "text/html",
              "ico": "image/x-icon",
              "jpeg": "image/jpeg",
              "jpg": "image/jpeg",
              "js": "text/javascript",
              "json": "application/json",
              "png": "image/png",
              "svg": "image/svg+xml",
              "txt": "text/plain",
              "xml": "text/xml"
            }
        # Het daadwerkelijk runnen van Axe. Hier wijst het naar `localhost:8080` wat
        # de files servert middels de HTTP server. Hier is `/index.html` geopend, maar
        # dit kan je veranderen door elke andere pagina die je wilt gebruiken.
        #
        # Tevens worden de AA WCAG guidelines gebruikt. Voor striktere checks kan ook
        # de "wcag2aaa" tag worden gebruikt. De volledige lijst is beschikbaar op:
        # https://www.deque.com/axe/core-documentation/api-documentation/#axecore-tags
      - run: axe http://localhost:8080/index.html --exit --tags wcag2aa
```
