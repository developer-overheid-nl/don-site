# Snapshots van initiatieven

Per initiatief de laatste versie van de delivery bundle waarmee de site
succesvol is gebouwd. `pnpm build` haalt altijd eerst de nieuwste versie op; als
die de build breekt, valt dat initiatief terug op de snapshot hier.

Werk deze map niet met de hand bij. De workflow `initiatives-snapshot.yml` draait
na elke groene build op `main` en opent een pull request zodra een initiatief een
nieuwere versie heeft die bouwt.

Per initiatief:

```
<slug>/
  docs/<slug>/          markdown zoals de partner hem levert
  static/img/<slug>/    afbeeldingen, als de bundel die heeft
  provenance.json       repository, branch en commit van deze versie
```

Is er voor een initiatief nog geen snapshot, dan faalt de build zodra de
nieuwste versie niet bouwt of niet op te halen is.
