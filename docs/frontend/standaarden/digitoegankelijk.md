---
tags:
  - "wcag"
  - "accessibility"
  - "forum-standaardisatie"
  - "html"
---

# DigiToegankelijk

:::info[Verplichte standaard]

Deze standaard is [verplicht voor alle websites](https://www.digitoegankelijk.nl/wetgeving) van de overheid.

:::

Dit artikel heeft als doel om developers ondersteuning te bieden bij het implementeren van de standaard [DigiToegankelijk](https://www.forumstandaardisatie.nl/open-standaarden/digitoegankelijk-en-301-549-met-wcag-21) zoals vastgesteld door het Forum Standaardisatie.

Sinds 1 juli 2018 zijn overheidsorganisaties verplicht [zich te houden](https://www.forumstandaardisatie.nl/open-standaarden/digitoegankelijk-en-301-549-met-wcag-21) aan de [WCAG 2.1](https://www.w3.org/TR/WCAG21/) richtlijnen. Dit om te zorgen dat zoveel mogelijk Nederlandse burgers, ook mensen met een beperking gebruik kunnen maken van overheidsdiensten.

## Toegankelijkheid voor iedereen

Burgers kunnen bijvoorbeeld te maken hebben met **permanente functiebeperkingen**:

- slechthorendheid en doofheid
- lichtgevoeligheid, slechtziendheid en blindheid
- spraakbeperkingen
- motorische beperkingen
- cognitieve beperkingen

Naast permanente functiebeperkingen kunnen gebruikers ook te kampen hebben met:

- **Tijdelijke functiebeperkingen**, zoals een gebroken pols.
- **Situationele functiebeperkingen**, bijvoorbeeld fel zonlicht op een scherm of een gebruiker die een baby op de arm draagt.

De WCAG 2.1 bevat verschillende succescriteria die aansluiten bij de genoemde beperkingen. Deze succescriteria zorgen er bijvoorbeeld voor dat een kleurenblinde gebruiker alsnog begrijpt dat een bepaalde bewerking "gevaarlijk" kan zijn, terwijl deze niet kan zien dat de desbetreffende knop rood is.

De WCAG 2.1 dient toegepast te worden op:

- Websites, waaronder Single Page Applications (HTML, CSS, JS)
- Documenten (PDF, Word, Excel)
- Mobiele apps (zoals op iOS en Android)

## Drie WCAG-niveaus van naleving (A, AA, AAA)

De in totaal 78 successcriteria die zijn opgenomen in WCAG 2.1 zijn allemaal verbonden aan een conformiteits-niveau. De drie niveaus die WCAG onderscheidt, zijn:

- Niveau A (laagste niveau)
  - Makkelijkst toe te passen, meeste impact voor de gebruiker
  - Bevat 30 succescriteria van niveau A
  - Deze criteria zijn het gemakkelijkst om aan te voldoen en hebben minimale impact op de structuur en vormgeving van een website.
- Niveau AA
  - Bevat 20 succescriteria van niveau AA
  - Aan deze criteria is moeilijker te voldoen. Het stelt bijvoorbeeld hoge eisen aan het contrast tussen tekst en achtergrond. Ook eist het van je dat HTML-elementen die in-focus zijn een duidelijke actieve status hebben met bijvoorbeeld een border.
- Niveau AAA (hoogste niveau)
  - Bevat 28 succescriteria van niveau AAA
  - Niveau AAA stelt nog hogere eisen. Zo is het bijvoorbeeld verplicht videomateriaal aan te bieden met gebarentolk.

## Correct HTML-gebruik voor toegankelijkheid

Een goede stap richting een toegankelijke website is het correct toepassen van HTML-syntax. Door HTML-elementen te gebruiken waarvoor ze bedoeld zijn, wordt je webpagina automatisch beter leesbaar voor screenreaders. Bovendien maak je je eigen code leesbaarder en profiteer je van de standaardfunctionaliteiten die HTML biedt.

Wat je misschien niet direct zou verwachten, is dat HTML zelf ook een standaard is. Forum Standaardisatie [beveelt de Nederlandse overheid aan](https://www.forumstandaardisatie.nl/open-standaarden/html) om de HTML standaard te gebruiken zoals die door de standaardisatie-organisatie WHATWG is vastgelegd.

[WHATWG: The elements of HTML](https://html.spec.whatwg.org/multipage/#toc-semantics)

### Screenreader

Mensen die blind of slechtziend zijn kunnen gebruik maken van een screenreader om door websites en apps te navigeren en tekst, afbeeldingen en video's te consumeren. Voor gebruikers van screenreaders is het van belang dat de volgorde van de HTML-elementen op de pagina klopt met de visuele weergave van de pagina. Dit om te voorkomen dat gebruikers eerst langs heel veel irrelevante informatie moeten voor ze bij de content zijn waarnaar ze op zoek waren.

### Alt text

Om afbeeldingen toegankelijk te maken voor gebruikers met screenreaders is een beschrijving of "alt-text" nodig. De screenreader leest dan deze tekst voor als hij de afbeelding tegenkomt.

Een voorbeeld van een alt-text:

```html
<img
  src="domtoren.jpg"
  alt="Een foto van de Domtoren in Utrecht op een zonnige middag in de zomer"
/>
```

### Touch target size

Een makkelijke manier om de gebruiksvriendelijkheid van je website te verhogen is door de minimale "target size" te hanteren. Een target kan alles zijn waar een gebruiker op poogt te klikken, bijvoorbeeld een button of een link. De minimale size van dit element dient **24 × 24 pixels** te zijn. Gebruikers die moeite hebben met hun motoriek hebben hier profijt van, maar denk ook aan touchscreens.

### Kleurgebruik

Zorg ervoor dat kleur niet het enige visuele middel is om informatie over te brengen, een actie aan te geven, tot een reactie op te roepen of een visueel element te onderscheiden. Niet iedereen kan alle kleuren onderscheiden of kleurcontrast even goed opmerken.

## NL Design System

NL Design System is een community die zich bezighoudt met het gezamenlijk ontwikkelen van components met een hele hoge kwaliteitsstandaard als het gaat om toegankelijkheid. Het kan dus strategisch slim zijn om NL Design System te gaan gebruiken in jouw project, omdat je dan toegang hebt tot een hele rits aan componenten waarvan de toegankelijkheid al gewaarborgd is.

### Acceptatiecriteria per component uit NL Design System

Naast het direct gebruiken van components kan je ook per component opzoeken welke acceptatiecriteria erop van toepassing zijn. Een voorbeeld hiervan is het button component:
[Button documentatie NL Design System](https://nldesignsystem.nl/button)

### Alle acceptatiecriteria vertaald

Je kunt alle acceptatiecriteria van de WCAG 2.1 vinden in de documentatie van NL Design System. Deze criteria zijn aangevuld met voorbeelden zodat het makkelijker te begrijpen is hoe je precies aan een criterium kunt voldoen. De lijst van criteria vind je hier:
[WCAG criteria op NL Design System](https://nldesignsystem.nl/wcag/)

_Let op: het werk van NL Design System is work in progress, nog niet alle tekstjes zijn compleet. Het goede nieuws is dat jij kunt bijdragen aan het compleet maken van alle criteria, door bijvoorbeeld een [issue](https://github.com/nl-design-system/documentatie/issues) aan te dragen._

## Links

[Forum Standaardisatie: DigiToegankelijk](https://www.forumstandaardisatie.nl/open-standaarden/digitoegankelijk-en-301-549-met-wcag-21)<br/>
[DigiToegankelijk.nl](https://www.digitoegankelijk.nl/)<br/>
[Gebruikercentraal.nl](https://www.gebruikercentraal.nl/)<br/>

## Tools

### Axe DevTools

Axe DevTools is een browserplugin die voor zowel Chrome als Firefox beschikbaar is. Meer informatie over de plugin vind je hier:
[Axe DevTools](https://www.deque.com/axe/devtools)

### Playwright

Het end-to-end testing framework Playwright kan gebruikt worden om accessibility problemen op te sporen. Een link naar de documentatie vind je hier: [Playwright](https://playwright.dev/docs/accessibility-testing)

### Wave

Wave is een online tool die websites kan scannen op toegankelijkheidsproblemen: [Wave](https://wave.webaim.org/)

## Externe links

- [DigitaalToegankelijk.nl over de European Accessibility Act (2025)](https://digitaaltoegankelijk.nl/nieuws/european-accessibility-act-2025/)
