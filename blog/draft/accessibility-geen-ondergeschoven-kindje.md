---
draft: true
authors: [sander-van-rijsoort]
tags: [toegankelijkheid, wcag, front-end, axe, react, nl-design-system]
description: |
  Veel front-end developers kijken pas aan het eind van een project naar
  toegankelijkheid. Waarom dat zonde is, wat de wet van overheidswebsites
  vraagt en hoe je al tijdens het bouwen test met Storybook en axe.
---

# Waarom accessibility (a11y) geen ondergeschoven kindje mag zijn

Veel front-end developers controleren accessibility pas in de eindfase van een project. Zonde, want de impact op het eindproduct is veel groter dan de meeste developers beseffen.

<!-- truncate -->

## Wat betekent accessibility eigenlijk?

Accessibility (toegankelijkheid) betekent dat producten, diensten en omgevingen zo zijn ontworpen dat iedereen ze zelfstandig kan gebruiken, ook mensen met een beperking. Online gaat het om websites, apps en software die werken voor iedereen, of je nu slecht ziet, slecht hoort, moeite hebt met bewegen of informatie anders verwerkt. De afkorting a11y komt van de a, de elf letters daartussen en de y.

## Voor wie is accessibility belangrijk?

Bij de overheid draaien veel webapplicaties die dagelijks door miljoenen Nederlanders worden gebruikt. Denk aan MijnOverheid, de Belastingdienst, DUO en het CJIB. Volgens [DigiToegankelijk](https://www.digitoegankelijk.nl/toegankelijkheid/wat-is-digitale-toegankelijkheid) hebben 4,5 miljoen mensen in Nederland een beperking of chronische ziekte. Dat is een veel bredere groep dan alleen mensen die blind of doof zijn. Het gaat ook om mensen met dyslexie, autisme, ADHD of een motorische beperking. En dan zijn er nog ongeveer [2,5 miljoen laaggeletterde Nederlanders](https://www.lezenenschrijven.nl/voor-gemeenten/feiten-en-cijfers) die vastlopen op een ingewikkeld formulier.

Veel van deze mensen gebruiken een website anders dan jij waarschijnlijk doet. Iemand die blind is, gebruikt bijvoorbeeld een screenreader die de pagina voorleest. Die kan alleen voorlezen wat er in de code staat. Heeft een knop met alleen een icoon geen toegankelijke naam, dan hoort die gebruiker niet meer dan "knop" en moet die maar raden wat de knop doet.

Of neem iemand die door een motorische beperking geen muis kan gebruiken, maar wel een toetsenbord. Opent zo iemand een modal die alleen met de muis te sluiten is, dan zit die gebruiker vast en kan nergens meer heen. In WCAG heet dat een toetsenbordval.

Voor de overheid is toegankelijkheid ook nog eens wettelijk verplicht. Sinds 1 juli 2023 valt het Besluit digitale toegankelijkheid overheid onder de [Wet digitale overheid](https://www.digitoegankelijk.nl/wetgeving). Daarvoor heette het nog het Tijdelijk besluit. Overheidswebsites en -apps moeten voldoen aan de Europese norm EN 301 549, wat in de praktijk neerkomt op WCAG 2.1 niveau A en AA. Daarnaast moet elke overheidsorganisatie een toegankelijkheidsverklaring publiceren.

En het blijft niet bij de overheid. Sinds 28 juni 2025 geldt de European Accessibility Act (EAA), in Nederland ingevoerd via de Implementatiewet toegankelijkheidsvoorschriften producten en diensten. Sindsdien moeten ook webshops, banken, vervoerders en e-books toegankelijk zijn, en ook daar is WCAG 2.1 AA in de praktijk de lat. De ACM houdt toezicht, voor banken en verzekeraars is dat de AFM. De kans dat je volgende project onder toegankelijkheidswetgeving valt is dus een stuk groter dan een paar jaar geleden, ook als je niet voor de overheid werkt.

## Hoe test je de toegankelijkheid van je webapplicatie?

Een ontbrekend label los je in een minuut op als je nog aan het component werkt. Vind je het pas bij de audit, dan is het een ticket voor de volgende sprint. Ik begin daarom het liefst in Storybook. Daar bouw je een component toch al los van de rest van de applicatie, met een story voor elke state.

### De a11y-addon

Met `@storybook/addon-a11y` krijgt elke story een extra tabblad "Accessibility". Onder de motorkap draait axe-core, dezelfde engine die Lighthouse en axe DevTools gebruiken. Per story zie je welke regels slagen, welke falen en wat je zelf nog moet controleren. Denk aan formuliervelden zonder label, te weinig kleurcontrast, een `<img>` zonder alt-tekst of een knop zonder toegankelijke naam. Omdat je stories alle varianten van een component bevatten (disabled, loading, error, met en zonder icoon), test je meteen alle states en niet alleen het happy path.

Je kunt per story of per component regels uitzetten via `parameters.a11y`, bijvoorbeeld als een contrastregel geen zin heeft op een puur decoratief element. Doe dat spaarzaam en met een reden erbij, anders wordt het een manier om rood weg te klikken.

### Checks in je CI

Een tabblad dat je alleen ziet als je het toevallig openklikt, vergeet je snel. Met de Vitest-addon van Storybook draaien dezelfde axe-checks als test over al je stories. Let wel op: de test faalt alleen als je `parameters.a11y.test` op `'error'` zet. Staat hij op `'todo'`, dan krijg je alleen waarschuwingen. Staat het goed, dan breekt een component met toegankelijkheidsfouten de build en wordt accessibility vanzelf onderdeel van je definition of done.

### Andere tools

- `eslint-plugin-jsx-a11y` waarschuwt al in je editor, bijvoorbeeld bij een `onClick` op een `<div>`, een `<img>` zonder alt of een `<a>` zonder href. Die is specifiek voor React. Voor Vue en Angular bestaan vergelijkbare plugins.
- `jest-axe` of `vitest-axe` voor unit tests op gerenderde componenten.
- `@axe-core/playwright` voor complete pagina's. Daar komen je componenten samen en kun je ook focusvolgorde en landmarks testen.
- Lighthouse of axe DevTools in de browser voor een snelle check van een live pagina.

### Wat geen tool voor je test

Geautomatiseerde tools vinden grofweg een derde tot de helft van de problemen. Een tool ziet niet of je een modal met Escape kunt sluiten, of de focus daarna teruggaat naar de knop die hem opende, of dat een screenreader de pagina in een logische volgorde voorleest. Dat merk je pas als je het zelf probeert:

- Leg je muis weg en loop de flow door met Tab, Shift+Tab, Enter, spatiebalk en Escape. Zie je altijd waar je bent? Kom je overal? Kom je ook weer terug?
- Zet een screenreader aan: VoiceOver op macOS (Cmd+F5) of NVDA op Windows (gratis). Luister of elke knop, link en foutmelding iets zinnigs zegt.
- Zoom in naar 200% en kijk of de layout overeind blijft en er niks wegvalt.

## Hoe weet je of iedereen je site kan gebruiken?

Helemaal zeker weten kan niet. Wel is er een meetlat waar iedereen mee werkt: de Web Content Accessibility Guidelines (WCAG) van het W3C. WCAG is opgebouwd rond vier principes, in het Engels afgekort als POUR:

1. **Waarneembaar (Perceivable)**: informatie moet op meer dan één manier waar te nemen zijn. Alt-teksten bij afbeeldingen, ondertiteling bij video, voldoende contrast.
2. **Bedienbaar (Operable)**: alles moet met het toetsenbord te bedienen zijn, gebruikers krijgen genoeg tijd en nergens zit een toetsenbordval.
3. **Begrijpelijk (Understandable)**: leesbare taal, voorspelbaar gedrag en foutmeldingen die vertellen hoe je het oplost.
4. **Robuust (Robust)**: geldige HTML en correcte ARIA, zodat hulpsoftware je pagina nu en in de toekomst goed kan lezen.

Elk succescriterium heeft een niveau: A (minimum), AA (de wettelijke norm in Nederland en de EU) en AAA (het hoogste niveau, niet overal haalbaar). Richt je op AA.

WCAG 2.2 kwam uit in oktober 2023. Die versie voegt onder meer criteria toe voor grotere klikdoelen, focus die niet achter een sticky header verdwijnt en inlogschermen waar plakken en wachtwoordmanagers gewoon moeten werken. In september 2026 is ook [EN 301 549 v4.1.1](https://accessible-eu-centre.ec.europa.eu/content-corner/news/european-accessibility-standard-en-301-549-has-been-updated-2026-09-07_en) verschenen, die naar WCAG 2.2 verwijst. Wettelijk blijft 2.1 de norm tot de Europese Commissie de nieuwe versie officieel aanwijst, maar de richting is duidelijk. Bouw je nu iets nieuws, ga dan meteen uit van 2.2.

Wat in de praktijk goed werkt:

- **Begin met semantische HTML.** Een `<button>` heeft alle toegankelijkheid al ingebouwd. Een `<div role="button">` moet je helemaal zelf nabouwen, inclusief focus en toetsenbordbediening. Een groot deel van WCAG los je al op door het juiste element te kiezen, nog voordat je aan ARIA toekomt. Hetzelfde geldt voor het `<dialog>`-element. Open je die met `showModal()`, dan krijg je focusbeheer, sluiten met Escape en een onbereikbare achtergrond er gratis bij, met veel minder code dan een zelfgebouwde modal. Daarmee is de gebruiker uit het voorbeeld hierboven ook meteen geholpen.
- **Zorg dat je component library het goed doet.** Als je Button, Input, Modal en Dropdown toegankelijk zijn, erft elke pagina dat. Test die componenten daarom het zwaarst, bijvoorbeeld in Storybook zoals hierboven. Werk je voor de overheid, kijk dan ook eens naar [NL Design System](https://nldesignsystem.nl), waar overheidsorganisaties samen aan toegankelijke componenten werken.
- **Automatisch in CI, handmatig per feature.** Automatische checks als vangnet, en bij elke nieuwe flow een korte ronde met toetsenbord en screenreader als vast onderdeel van de review.
- **Laat het af en toe extern toetsen.** Een WCAG-audit door een gespecialiseerd bureau (bijvoorbeeld volgens de WCAG-EM-methode) kijkt met andere ogen dan het team dat het gebouwd heeft. Voor overheidsorganisaties is zo'n onderzoek ook de basis voor de verplichte toegankelijkheidsverklaring.
- **Test met echte gebruikers.** Ga eens naast iemand zitten die dagelijks met een screenreader of schakelbediening werkt. Wat jij als developer logisch vindt, werkt in de praktijk vaak heel anders.

## Tot slot

Accessibility is een kwaliteitseis, net als performance en security. Neem je het vanaf het begin mee, dan kost het nauwelijks extra. Met semantische HTML en een goed geteste component library ben je al een heel eind. Wacht je ermee tot de laatste week, dan wordt het een dure klus.

Bij de overheid weegt dat nog zwaarder. Werkt een webshop niet, dan ga je naar een andere. Een andere Belastingdienst is er niet. Lukt het iemand niet om online aangifte te doen, dan moet diegene bellen, langskomen of een ander om hulp vragen. Dan is diegene precies de zelfstandigheid kwijt waar het bij toegankelijkheid om draait.
