---
draft: true
authors: [sander-van-rijsoort]
tags:
  [toegankelijkheid, front-end, open-source, wcag, design-system, react]
description: |
  Een UI library is de goedkoopste plek om toegankelijkheid te regelen, maar
  components die los WCAG 2.1 AA halen leveren nog geen toegankelijke
  applicatie op. Over de vier patronen die daarbij telkens misgaan, hoe je ze
  in je library afdwingt in plaats van documenteert, en hoe je Storybook
  inzet als gate in plaats van als dashboard.
---

# Je UI library haalt de audit, je gebruikers lopen alsnog vast

Een UI library is de goedkoopste plek om toegankelijkheid te regelen. Bouw je button, je input en je dialog één keer goed, en elk team dat ze gebruikt krijgt dat er gratis bij.

Dat klopt ook. Alleen kom ik geregeld libraries tegen waarvan elk los component netjes WCAG 2.1 AA haalt, terwijl gebruikers in de applicatie alsnog stranden. Niet omdat er iets mis is met de components. Omdat toegankelijkheid vooral ontstaat op het niveau dat je library niet ziet: hoe teams dingen combineren, in welke volgorde het op de pagina staat, en wat er gebeurt zodra er iets misgaat.

Ik bouw dat soort libraries als freelance front-end developer, onder meer voor CZ en Ben.nl, waar meerdere teams op dezelfde basis verder moesten. De patronen hieronder komen uit dat werk.

<!-- truncate -->

## Waarom het bij ons zwaarder weegt

Even het waarom, want dat verdwijnt makkelijk achter de checklist. [Digitoegankelijk](https://www.digitoegankelijk.nl/toegankelijkheid/wat-is-digitale-toegankelijkheid) rekent op 4,5 miljoen mensen in Nederland met een beperking of chronische ziekte. Dat is breder dan blind of doof: laaggeletterdheid, dyslexie, autisme, ADHD, motorische beperkingen. Daar bovenop komt iedereen die er tijdelijk of situationeel last van heeft, van een gebroken pols tot zonlicht op je scherm. Door vergrijzing wordt die groep groter, niet kleiner.

Maar het aantal is niet eens het sterkste argument. Dit wel: bij ons kunnen mensen niet weg.

Loopt iemand vast in een webshop, dan bestelt hij bij een ander. Loopt iemand vast in een aanvraag voor een uitkering, een vergunning of een bezwaar, dan is er geen alternatief. Geen tweede gemeente, geen andere Belastingdienst. Een ontoegankelijke dialog in een commerciële app kost omzet. Bij ons kost hij iemand de toegang tot iets waar hij gewoon recht op heeft, en vaak is dat precies iemand die die uitkering het hardst nodig heeft.

Daarom staat het ook in de wet en niet in een stijlgids.

## Wat je library wél in de hand heeft

De verplichting zelf is duidelijk genoeg. Je past [EN 301 549](https://www.forumstandaardisatie.nl/open-standaarden/digitoegankelijk-en-301-549-met-wcag-21) toe, in de praktijk WCAG 2.1 A en AA, en je publiceert een toegankelijkheidsverklaring. Sinds 1 juli 2023 staat dat in de Wet digitale overheid.

Wat die eis niet zegt, is waar je het moet halen. Een audit kijkt naar een applicatie, niet naar een library. Je kunt dus een prima getoetste set components hebben en alsnog een afkeuring krijgen, omdat de fout pas ontstond toen iemand ze aan elkaar knoopte.

Ruwweg zit het zo:

- **Het component zelf.** Contrast, keyboard, ARIA, focus states. Hier kun je alles dichttimmeren.
- **De samenstelling.** Heading-structuur, labels die aan het juiste veld hangen, error handling, volgorde. Deels af te dwingen, verder een kwestie van documenteren.
- **De content.** Alt-teksten, begrijpelijke taal, linkteksten die ergens op slaan. Hier kun je alleen faciliteren.

De meeste libraries stoppen bijna al hun energie in dat eerste punt en laten de rest aan de teams. Daar gaat het mis.

## Vier dingen die ik telkens terugzie

### De toegankelijke button die ontoegankelijk gebruikt wordt

Je button ondersteunt `aria-label`. Mooi. Maar een icon-only button zonder label is voor een screenreader een button zonder naam, en je library laat dat gewoon toe:

```tsx
<Button icon={<TrashIcon />} onClick={remove} />
```

Dit is het moment om streng te zijn. Als een variant zonder zichtbare tekst alleen werkt mét toegankelijke naam, maak er dan een type error van in plaats van een regel in je docs:

```ts
type ButtonProps =
  | { children: React.ReactNode; 'aria-label'?: string }
  | { children?: never; 'aria-label': string };
```

Nu compileert de foute variant niet meer. Dat werkt stukken beter dan een waarschuwing in Storybook die niemand leest op het moment dat het uitmaakt.

### Errors die er staan maar niet aankomen

Vrijwel elk formulier dat ik zie heeft labels. Een stuk minder formulieren koppelen hun error aan het veld, en dan is die melding voor een screenreader alleen te vinden als je er toevallig langsloopt.

De koppeling is het werk:

```tsx
<input
  id={id}
  aria-invalid={!!error}
  aria-describedby={[hintId, error && errorId].filter(Boolean).join(' ') || undefined}
/>
{error && <p id={errorId}>{error}</p>}
```

Belangrijker is wat er gebeurt ná een mislukte submit. Focus naar een samenvatting bovenaan, met links naar de velden die eronder vallen. Voor keyboard- en screenreadergebruikers is dat het verschil tussen een formulier dat werkt en een formulier dat je wegklikt. Bak het in je `Form`, dan hoeft niemand het per applicatie opnieuw te verzinnen.

### Focus die zoekraakt

Dialogs, dropdowns en toasts die verschijnen zonder dat de focus meegaat. Een klassieker. Visueel gebeurt er van alles, maar de focus staat nog op de button eronder. Sluit je de dialog, dan begin je vaak weer bovenaan de pagina.

Vier dingen horen in de library en niet in de keuzevrijheid van het gebruikende team: focus naar de dialog bij openen, focus terug naar de trigger bij sluiten, focus vasthouden zolang hij open is, en Escape die werkt.

### Contrast dat in je tokens klopt en in de app niet

Je tokens zijn getoetst. Alleen haalt `text-muted` op `surface-default` netjes AA, en op `surface-subtle` net niet. Je library kent de losse tokens, niet de combinatie waarin een team ze zet.

Prima te automatiseren. Reken de contrastratio's van alle toegestane combinaties door in een test en laat de build klappen op wat eronder duikt. Dan is het geen afspraak meer maar een regel.

## Wat geautomatiseerd testen oplevert

De moeite waard, en niet genoeg. De gangbare schatting is dat automatische a11y-checks ongeveer een derde van de WCAG-problemen vinden. Ze zijn goed in ontbrekende attributen en contrast, en per definitie blind voor de vraag of een alt-tekst iets zinnigs zegt of een heading-structuur ergens op slaat. Een pagina kan groen zijn in axe en alsnog niet te doen zijn.

Wat bij mij werkt:

- **In de library:** axe per story, via Storybook. Zie hieronder.
- **In CI:** contrasttests over je tokencombinaties, en linting op de patronen hierboven.
- **Met de hand:** de hele flow met alleen je keyboard, daarna met een screenreader.

Dat laatste is niet te vervangen en kost minder tijd dan mensen denken. Het is ook waar de bevindingen zitten die er echt toe doen. Een formulier kan elke geautomatiseerde check doorstaan en met de hand nog steeds niet te doen zijn, puur omdat de volgorde nergens op slaat.

## Storybook als gate, niet als dashboard

Bij een UI library is Storybook toch al de plek waar je components geïsoleerd bekijkt, en dat is precies de context waarin axe iets zinnigs kan zeggen. De setup is één commando:

```bash
npx storybook add @storybook/addon-a11y
```

Dat registreert de addon meteen, je hoeft niets in `main.ts` bij te werken. Vanaf dan zie je per story een a11y-panel met wat axe vindt, terwijl je aan het bouwen bent.

Handig, maar vrijblijvend. Een panel dat je kunt wegklikken verandert niemands gedrag op vrijdagmiddag. De stap die het verschil maakt is deze:

```ts
// .storybook/preview.ts
const preview: Preview = {
  parameters: {
    a11y: { test: 'error' },
  },
};

export default preview;
```

Met `test: 'error'` wordt een violation een falende test in plaats van een rood bolletje. Draai je `@storybook/addon-vitest` of de test-runner in CI, dan klapt je pipeline erop. Hetzelfde principe als die type error uit de eerste paragraaf: niet documenteren dat het moet, maar zorgen dat het niet anders kan.

### Invoeren zonder dat CI meteen roodgloeiend staat

Zet je dit aan op een bestaande library, dan heb je waarschijnlijk direct tientallen violations. De verleiding is dan om het weer uit te zetten. Beter is `test: 'todo'`, dat rapporteert zonder te falen:

```ts
// Legacy component, staat op de nominatie
export const OudeDataTabel: Story = {
  parameters: { a11y: { test: 'todo' } },
};
```

Zet 'm globaal op `error` en per component tijdelijk op `todo`. Dan is nieuw werk vanaf dag één dicht en heb je van je legacy een lijst in plaats van een gevoel. Wat je daarna doet is die `todo`'s één voor één opruimen.

### Regels uitzetten die niet over je component gaan

Sommige axe-regels slaan aan op dingen die een geïsoleerde story per definitie niet heeft. De `region`-regel wil bijvoorbeeld dat content binnen een landmark valt, en een losse button in Storybook zit nergens in. Dat is ruis, geen bevinding:

```ts
const preview: Preview = {
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'region', enabled: false }],
      },
      test: 'error',
    },
  },
};
```

Wees hier wel zuinig mee. Elke regel die je uitzet is een regel die je in de applicatie zelf alsnog moet toetsen, en die afweging hoort in een commit message thuis en niet stilletjes in je config.

## Documenteer gedrag, niet alleen props

Storybook-docs beschrijven meestal wat een component kan. Voor toegankelijkheid is interessanter wat het al voor je doet en wat jij nog moet regelen. Eén alinea per component:

> Deze dialog regelt focus, Escape en `aria-modal`. Jij levert een `aria-label` of een gekoppelde titel, en zorgt dat de inhoud een logische heading-structuur heeft.

Iemand met een deadline weet dan binnen vijf seconden waar zijn verantwoordelijkheid begint. Dat leest beter dan een algemene toegankelijkheidspagina die één keer wordt doorgenomen.

## Waar het op neerkomt

De components die ik voor CZ en Ben.nl bouwde werden toegankelijk opgeleverd en gedocumenteerd in Storybook. Achteraf zat de winst minder in de losse components dan in wat de library onmogelijk maakte: varianten die niet compileren zonder toegankelijke naam, dialogs die hun focus niet kwijt kunnen, kleurcombinaties die de build breken.

Diezelfde aanpak zit in [sander-ui](https://github.com/sanderyt/sander-ui), de library die ik open source onderhoud, mocht je willen zien hoe dit er in werkende code uitziet.

Een library maakt je applicatie niet toegankelijk. Hij verkleint wel flink hoeveel er per team nog fout kan gaan, en dat is precies wat je wilt als er tien teams op dezelfde basis bouwen.
