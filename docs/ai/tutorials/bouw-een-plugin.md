---
content_type: tutorial
tags: [ai, skills, development]
title: "Bouw zelf een AI-plugin"
description: "Van een standaard die niemand opzoekt naar een plugin die je AI-assistent hem laat volgen."
---

# Bouw zelf een AI-plugin

Beheer je een standaard, richtlijn of werkwijze die vaak verkeerd wordt
toegepast? Dan is een plugin een manier om die kennis bij de ontwikkelaar te
krijgen op het moment dat hij code schrijft, in plaats van in een document dat
hij achteraf moet opzoeken.

In deze tutorial bouw je een werkende plugin met één skill, test je hem lokaal
en meld je hem aan voor de catalogus. Reken op ongeveer een uur.

Lees eerst
[Skills, plugins en marketplaces](../skills-plugins-en-marketplaces/index.md)
als die termen nog door elkaar lopen.

## Wat je nodig hebt

- Claude Code of Cursor, lokaal geïnstalleerd
- Een publieke repository met een opensourcelicentie
- De standaard of richtlijn die je wilt ontsluiten

## Stap 1: Bepaal wat de skill moet doen

Begin niet bij de tekst maar bij de fout. Welke vergissing maken mensen steeds
opnieuw?

Een goede skill beantwoordt een concrete vraag: "voldoet dit endpoint aan de API
Design Rules?" of "hoe schrijf ik een `publiccode.yml` voor dit project?" Een
skill die "alles over onze standaard" bevat, wordt nooit op het goede moment
ingezet, omdat de assistent niet kan bepalen wanneer hij relevant is.

Schrijf één zin op: _deze skill helpt bij X, en moet aanslaan wanneer iemand Y
vraagt._ Die zin wordt straks je `description`.

## Stap 2: Zet de structuur op

```text
mijn-plugin/
├── .plugin/
│   └── plugin.json
├── skills/
│   └── mijn-skill/
│       └── SKILL.md
├── README.md
├── DISCLAIMER.md
└── LICENSE
```

`.plugin/plugin.json` is de bron. De platformspecifieke varianten voor Claude
Code en Cursor worden daaruit gegenereerd, zodat je ze niet met de hand
synchroon hoeft te houden.

```json title=".plugin/plugin.json"
{
  "name": "mijn-plugin",
  "description": "Korte beschrijving van wat de plugin doet",
  "version": "1.0.0"
}
```

De `name` wordt de namespace van je skills: gebruikers roepen ze aan als
`/mijn-plugin:mijn-skill`. Kies kebab-case en iets dat uniek genoeg is.

## Stap 3: Schrijf de skill

```markdown title="skills/mijn-skill/SKILL.md"
---
name: mijn-skill
description: >-
  Controleert of een OpenAPI-beschrijving voldoet aan de API Design Rules.
  Gebruik bij vragen over API design rules, ADR, OAS-validatie of
  overheids-API's.
allowed-tools:
  - Read
  - Grep
---

## Wanneer je deze skill gebruikt

Als de gebruiker een OpenAPI-bestand laat zien en vraagt of het klopt, of
expliciet naar de API Design Rules verwijst.

## Wat je controleert

| Regel                     | Wat je nagaat                                 |
| ------------------------- | --------------------------------------------- |
| `/core/no-trailing-slash` | Paden eindigen niet op een slash              |
| `/core/http-methods`      | Alleen standaard HTTP-methods                 |
| `/core/uri-version`       | Major versie in de URI, voorafgegaan door `v` |

## Hoe je rapporteert

Noem per bevinding de regel, de plek in het bestand en wat er anders moet.
Zeg het ook expliciet als je niets hebt gevonden.
```

Vier dingen bepalen of een skill werkt:

**De `description` is het belangrijkst.** Die bepaalt of de assistent de skill
inzet. Zet er de woorden in waarmee mensen het onderwerp aanduiden, in het
Nederlands én het Engels, inclusief afkortingen.

**Schrijf instructies, geen encyclopedie.** De assistent moet iets kunnen dóen.
Tabellen, beslisbomen en codevoorbeelden werken beter dan lopende tekst.

**Houd het onder de 500 regels.** Langere referentie hoort in een apart bestand
in dezelfde map, dat de assistent erbij pakt als het nodig is.

**Beperk `allowed-tools`.** Geef alleen wat de skill nodig heeft. Een skill die
alleen leest, hoeft niet te kunnen schrijven.

## Stap 4: Test lokaal

```bash
claude --plugin-dir ./mijn-plugin
```

Stel nu vragen die de skill zouden moeten activeren, en vooral ook vragen die
dat níét zouden moeten doen. Die tweede categorie wordt vaak vergeten en is
precies waar het misgaat: een te ruime `description` zorgt dat de skill overal
aanslaat en de assistent afleidt.

Loopt het niet zoals verwacht, dan zit de oorzaak bijna altijd in de
`description`, niet in de inhoud.

## Stap 5: Voeg een disclaimer toe

Een skill is een samenvatting, geen standaard. Zet in `DISCLAIMER.md` wat de
plugin wel en niet is, en waar de officiële tekst staat. Voor opname in onze
catalogus is dat een voorwaarde.

Zie de [verantwoording](../skills-plugins-en-marketplaces/verantwoording.md)
voor de voorbehouden die wij hanteren.

## Stap 6: Meld hem aan

Voldoet je plugin aan de eisen, dan kun je hem aanmelden:

- een opensourcelicentie (EUPL-1.2, Apache-2.0, MIT of vergelijkbaar)
- een publieke repository
- een geldige `.plugin/plugin.json`
- minimaal één werkende skill, commando of agent
- Nederlandstalige of tweetalige documentatie
- een `DISCLAIMER.md`

Aanmelden gaat via de
[marketplace-repository](https://github.com/developer-overheid-nl/skills-marketplace).

Beschrijft je plugin een standaard met een eigen beheerorganisatie, dan
beoordeelt die beheerder hem. Pas daarna krijgt hij in de catalogus de status
goedgekeurd, met vermelding van die partij.

## Verder lezen

- [Beschikbare plugins](../skills-plugins-en-marketplaces/plugins.md): de
  catalogus met wat er al is
- [Handleiding plugin maken](https://github.com/developer-overheid-nl/skills-marketplace/blob/main/docs/plugin-maken.md)
- [AGENTS.md](../standaarden/agents-md.md): projectafspraken vastleggen zonder
  plugin
