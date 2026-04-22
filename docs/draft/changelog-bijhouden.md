---
content_type: tutorial
tags: 
  - "changelog"
title: "Changelog bijhouden"
draft: true
---

De meeste software is nooit echt af en zullen er in de loop van de tijd meerdere versies van je applicatie, library, website of API bestaan.
In [git] wordt per `commit` een log bijgehouden van welke bestanden er gewijzigd zijn met een stukje commentaar erbij. Nu denk je misschien dat is een mooie manier voor een "changelog", maar in git commits staat vaak veel ruis, denk aan merge commits, documentatie-aanpassingen en onduidelijke commentaren. Hierin zie je de "evolutie" van de code.

Het doel van een changelog is het documenteren van noemenswaardige aanpassingen, vaak over meerdere commits. Het is voor de eindgebruiker.

## Hoe maak je een goede changelog?

Zoals op [Keep a changelog] in de richtlijnen staat:

- Changelogs zijn voor mensen, niet voor machines.

Een (eind)gebruiker moet in de changelog kunnen zien wat de wijzigingen zijn, zijn er *deprecations*, is er iets vervallen, zijn er bugs gefixt, etc. Dit zijn de vragen die ze hebben.
Ook als je geen software hebt die "geconsumeerd" wordt zoals een library of design system kan het handig zijn om een changelog bij te houden, met bijvoorbeeld de nieuwe features van je website.

- Geef aan of je [Semantic Versioning] gebruikt.

Het wordt aangeraden om SemVer te gebruiken, de meeste ontwikkelaars kennen het en ook niet-ontwikkelaars zullen het tegen zijn gekomen.
Als je een andere manier van versionering gebruikt, geef dit aan in je Changelog.  

...

## Zijn er manieren om dit te automatiseren?

Er zijn verschillende tools om changelogs bij te houden. Sommige tools gebruiken hiervoor de git commit comments, maar zoals hierboven al aangegeven is het beter om *dedicated* changelogs bij te houden.  
Andere tools helpen je per commit een change-bestandje aan te maken en die later bij de release samen te voegen in de changelog. We zullen er hier een paar behandelen.

### Changesets

[Changesets] is een NPM-package, [Github App](https://github.com/apps/changeset-bot) en [-Action](https://github.com/changesets/changesets/action) voor je workflows.

Je installeert de package in je project met

```bash
npx @changesets/cli init
```

```bash
yarn add -D @changesets/cli && yarn changeset init
```

```bash
pnpx @changesets/cli init
```

Werk je in Github dan is het aan te raden om de Github App te installeren in je repository. Deze bot checkt elke Pull Request (PR) en kijkt of er een change-bestand in de PR zit en plaatst een comment hierover.

:::tip Spreek met je team af hoe je aangeeft dat er geen change gelogd hoeft te worden, bij developer.overheid.nl zetten we een 👍🏻 op de comment als het "okay" is dat er geen changeset is:::

De Github Action zorgt ervoor dat Changesets een PR aanmaakt en bijhoudt om de release te doen. De standaard naam is "Version Packages", deze is aan te passen in de `.changeset/config.json`

### Changie

[git]: https://git-scm.com/
[Keep a changelog]: https://keepachangelog.com/nl/1.1.0/
[Semantic Versioning]: https://semver.org/lang/nl/
[Changesets]: https://github.com/changesets/changesets
