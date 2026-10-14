---
content_type: standaard
tags: [ai, development]
title: "AGENTS.md"
description: "Een markdownbestand in de root van je repository dat AI-assistenten vertelt hoe ze met het project moeten werken."
---

# AGENTS.md

`AGENTS.md` is een markdownbestand in de root van een repository met instructies
voor AI-assistenten die aan het project werken. Waar `README.md` de mens uitlegt
wat het project is, legt `AGENTS.md` de assistent uit hoe hij zich hoort te
gedragen.

Het formaat wordt beheerd door de Agentic AI Foundation onder de Linux
Foundation en is ontstaan uit samenwerking tussen verschillende leveranciers van
ontwikkeltooling. Meer dan twintig tools lezen het bestand, waaronder Cursor,
Gemini CLI, GitHub Copilot, Claude Code, VS Code, Zed en Aider.

## Waarom het bestaat

Zonder zo'n bestand legt iedere ontwikkelaar in elke sessie opnieuw uit hoe je
de tests draait, welke conventies gelden en waar de assistent vanaf moet
blijven. Dat is herhaald werk, en het resultaat verschilt per persoon.

Met een bestand in de repository staan die afspraken op één plek, in
versiebeheer, zichtbaar voor het hele team, en gelden ze ongeacht wie er werkt.

## Wat erin hoort

Er zijn geen verplichte velden; het is gewone markdown. In de praktijk komen
deze onderdelen terug:

- **Wat het project is**, in een paar zinnen
- **Bouwen en testen**: de commando's, letterlijk
- **Conventies**: naamgeving, taal, bestandsstructuur
- **Wat je niet moet aanraken**: gegenereerde bestanden, vendor-mappen,
  migraties
- **Security**: wat nooit in de code hoort

Schrijf op wat een assistent niet uit de code kan afleiden. Dat het project
TypeScript gebruikt, ziet hij zelf. Dat jullie een `pnpm`-workspace hebben waar
`npm install` stuk op gaat, niet.

## Een voorbeeld

```markdown
# AGENTS.md

Docusaurus-site voor het ontwikkelaarsportaal van de Nederlandse overheid.

## Bouwen en testen

- Installeren: `pnpm install --frozen-lockfile`
- Lokaal draaien: `pnpm start`
- Volledige build: `pnpm build` (controleert ook interne links)
- Formatteren: `pnpm exec prettier --write .`

## Conventies

- Klantfacing tekst in het Nederlands, code en variabelen in het Engels
- Artikelen krijgen `content_type` in de frontmatter
- Interne links relatief, niet absoluut

## Niet aanraken

- `build/` en `.docusaurus/` zijn gegenereerd
- `pnpm-lock.yaml` alleen via pnpm zelf
```

## Nesten

Een `AGENTS.md` in een submap gaat voor op die in de root. In een monorepo kun
je zo per package aanvullende afspraken vastleggen zonder de root te vervuilen.

## Verhouding tot CLAUDE.md

`CLAUDE.md` is de variant van Claude Code en bestond eerder dan `AGENTS.md`. Ze
doen hetzelfde en hebben dezelfde vorm; het verschil is dat `AGENTS.md`
leveranciersneutraal is en breder wordt gelezen.

Voor een nieuw project is `AGENTS.md` de logische keuze: één bestand dat door de
meeste tools wordt begrepen. Heb je al een `CLAUDE.md`, dan is de eenvoudigste
route hem hernoemen. Wie beide wil ondersteunen, kan er een symlink van maken,
zodat de inhoud niet op twee plekken uiteen kan lopen.

## Aandachtspunten

Het bestand staat in versiebeheer en is openbaar zodra de repository dat is. Zet
er dus geen secrets of interne URL's in die niet naar buiten mogen.

Bedenk ook dat iedereen die naar de repository kan schrijven, de instructies van
de assistent kan aanpassen. Bij een project met externe bijdragers hoort een
wijziging in `AGENTS.md` net zo goed gereviewd te worden als een wijziging in de
code.

## Meer weten

- [agents.md](https://agents.md/): het formaat en voorbeelden
