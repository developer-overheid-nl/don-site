---
sidebar_position: 2
content_type: tool
tags: [ai, skills]
title: "Beschikbare plugins"
description: "De catalogus met AI-plugins voor de Nederlandse overheid, en hoe je ze installeert in Mistral Vibe, Claude Code, Cursor of GitHub Copilot."
---

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

# Beschikbare plugins

Wij houden een catalogus bij van plugins die relevant zijn voor de Nederlandse
overheid.

:::warning[Dit is een verkenning, geen vastgestelde standaard]

De plugins bevatten samenvattingen en interpretaties, niet de officiële
standaarden zelf. De teksten zijn deels met generatieve AI samengesteld en
kunnen onvolledig of onjuist zijn. Bij twijfel geldt de gepubliceerde versie van
de standaard bij de beheerorganisatie. Zie de
[verantwoording](./verantwoording.md).

:::

| Plugin                                | Waarvoor                                                                                                                                                           | Beheerd door                                             | Status                             | Bron                                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `standaarden`                         | Nederlandse overheidsstandaarden: API Design Rules, Digikoppeling, OAuth NL, FSC, Logboek Dataverwerkingen, CloudEvents, BOMOS, E-Government en publicatie-tooling | developer.overheid.nl                                    | Concept, nog niet goedgekeurd      | [skills-standaarden](https://github.com/developer-overheid-nl/skills-standaarden)                     |
| `internet`                            | Moderne internetstandaarden, getest via internet.nl: HTTPS, TLS, DNSSEC en verwante webstandaarden                                                                 | developer.overheid.nl                                    | Concept, nog niet goedgekeurd      | [skills-internet](https://github.com/developer-overheid-nl/skills-internet)                           |
| `geo`                                 | Nederlandse geo-standaarden, beheerd door Geonovum: OGC API services, metadata, informatiemodellen, INSPIRE en 3D                                                  | developer.overheid.nl                                    | Concept, nog niet goedgekeurd      | [skills-geo](https://github.com/developer-overheid-nl/skills-geo)                                     |
| `nerds`                               | De Nederlandse Richtlijn Digitale Systemen                                                                                                                         | Ministerie van Binnenlandse Zaken en Koninkrijksrelaties | Van derden, niet door ons getoetst | [NeRDS](https://github.com/MinBZK/NeRDS)                                                              |
| `zad-actions`                         | ZAD deployment: linting, releases, validatie van actions en het genereren van workflows                                                                            | Rijks ICT Gilde                                          | Van derden, niet door ons getoetst | [zad-actions](https://github.com/RijksICTGilde/zad-actions)                                           |
| `nldd-design-system`                  | Het NLDD Designsysteem: componenten opzoeken, bouwen, migreren en upgraden                                                                                         | Nederlandse Digitale Dienst                              | Van derden, niet door ons getoetst | [design-system](https://github.com/NederlandseDigitaleDienst/design-system)                           |
| `nldd-archi`                          | ArchiMate-modellen bewerken met de archi-CLI: model, views en presentaties                                                                                         | Nederlandse Digitale Dienst                              | Van derden, niet door ons getoetst | [ai-assisted-architecting](https://github.com/NederlandseDigitaleDienst/ai-assisted-architecting)     |
| `developer-overheid`                  | De kennisbank van developer.overheid.nl als skills                                                                                                                 | developer.overheid.nl                                    | Status nog niet vastgesteld        | [skills-developer-overheid-nl](https://github.com/developer-overheid-nl/skills-developer-overheid-nl) |
| `developer-overheid-open-source-repo` | Een repository open source maken, langs alle verplichte stappen                                                                                                    | developer.overheid.nl                                    | Status nog niet vastgesteld        | [skills-open-source-repo](https://github.com/developer-overheid-nl/skills-open-source-repo)           |

Deze tabel wordt met de hand bijgehouden. De actuele catalogus staat in
[skills-marketplace](https://github.com/developer-overheid-nl/skills-marketplace/blob/main/marketplace.json).

De statuskolom geeft door wat de beheerder van de onderliggende standaard van de
plugin vindt, niet wat wij ervan vinden. Een plugin krijgt pas de status
goedgekeurd nadat die beheerder hem heeft beoordeeld.

## Installeren

De skills volgen de [Agent Skills-specificatie](https://agents.md/), dus ze
werken in meer dan één assistent. De route verschilt per merk.

De eenvoudigste manier werkt overal hetzelfde: `gh skill install` uit de GitHub
CLI kent alle bekende assistenten en zet de skills op de plek waar jouw
assistent ze zoekt. Je hebt versie 2.90.0 of nieuwer nodig.

De repository per plugin staat in de tabel hierboven. De voorbeelden gebruiken
`skills-standaarden`.

<Tabs groupId="assistent" defaultValue="mistral">
<TabItem value="mistral" label="Mistral Vibe">

```bash
gh skill install developer-overheid-nl/skills-standaarden --agent mistral-vibe
```

Zonder GitHub CLI kan het ook met de hand: zet de map van een skill in
`.agents/skills/` in je project, of in `~/.agents/skills/` als je hem overal
wilt hebben. Vibe leest daarnaast `.vibe/skills/` en `~/.vibe/skills/`.

Vibe heeft geen marketplace-commando; skills worden gevonden op basis van waar
ze staan. In `config.toml` kun je met `enabled_skills` en `disabled_skills`
bepalen welke actief zijn.

</TabItem>
<TabItem value="claude" label="Claude Code">

Claude Code heeft een eigen marketplace. Voeg de catalogus één keer toe en
installeer daarna per onderwerp:

```bash
# 1. Voeg de catalogus toe
claude plugin marketplace add developer-overheid-nl/skills-marketplace

# 2. Installeer een plugin
claude plugin install standaarden@overheid-plugins
```

Losse skills installeren kan ook:

```bash
gh skill install developer-overheid-nl/skills-standaarden --agent claude-code
```

</TabItem>
<TabItem value="cursor" label="Cursor">

Ga naar **Dashboard → Settings → Plugins → Import** en gebruik de repository-URL
`developer-overheid-nl/skills-marketplace`. Zie de
[plugindocumentatie van Cursor](https://cursor.com/docs/plugins).

Losse skills installeren kan ook:

```bash
gh skill install developer-overheid-nl/skills-standaarden --agent cursor
```

</TabItem>
<TabItem value="copilot" label="GitHub Copilot">

```bash
gh skill install developer-overheid-nl/skills-standaarden --agent github-copilot
```

Standaard installeert dit op projectniveau, in `.github/skills/` in je
repository. Daarmee krijgen collega's ze mee via een gewone `git pull`. Wil je
ze alleen voor jezelf, gebruik dan `--scope user`; ze komen dan in
`~/.copilot/skills`.

Copilot leest skills in agent mode, in de CLI en in de cloud agent.

</TabItem>
</Tabs>

:::info[Waarom `gh skill` en niet per merk iets anders]

`gh skill install` ondersteunt 48 assistenten via `--agent`, waaronder alle vier
hierboven. Het commando zoekt de skills in de repository op en zet ze in de map
die dat merk gebruikt. Daarmee is één instructie genoeg voor bijna elk merk, ook
voor assistenten die hier niet staan.

De marketplace-route van Claude Code en Cursor blijft daarnaast bestaan. Die
installeert een hele plugin in één keer en houdt hem bijgewerkt; `gh skill`
installeert losse skills.

:::

## Meer weten

- [Verantwoording en voorbehouden](./verantwoording.md): wat je er wel en niet
  van mag verwachten
- [Bouw zelf een AI-plugin](../tutorials/bouw-een-plugin.md)
