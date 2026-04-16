# Developer Overheid NL website

Dit is de repository van de website
[developer.overheid.nl](https://developer.overheid.nl), de kennisbank,
communities en blog.  
De basis van de website is [Docusaurus](https://docusaurus.io), de artikelen
bestaan uit [Markdown](https://www.markdownguide.org/basic-syntax/)- (of MDX-)
bestanden, deze slaan we in deze repository op, waardoor we met versionering en
reviews kunnen werken.

## Help mee

Wil je bijdragen aan onze kennisbank, blog en of website. Op de pagina
[Bijdragen](https://developer.overheid.nl/contributing#hoe-je-kunt-bijdragen)
staan de verschillende manieren waarop je mee kan helpen.

### Contact

Neem contact op met ons via een bericht op ons
[Slack kanaal](https://codefornl.slack.com/archives/CFV4B3XE2) of stuur een
e-mail naar developer.overheid@geonovum.nl. Dan kijken we samen hoe we je
bijdrage kunnen vormgeven.

## Lokaal draaien van de website

We gebruiken [`pnpm`](https://pnpm.io/) om afhankelijkheden te installeren en de
website met Docusaurus te draaien. Zorg dat je dat eerst installeert, dat kan
bijvoorbeeld met `npm`.  
Daarna kan je de website lokaal draaien.

1. Draai `pnpm install` om te zorgen dat alle afhankelijkheden die Docusaurus
   nodig heeft beschikbaar zijn
1. Draai `pnpm run start` om te builden en Docusaurus te starten.

Daarna kan je de lokale versie van de site bekijken op
`http://localhost:3000/`.  
Maak je aanpassingen aan de design tokens, draai `pnpm run build` om de CSS te
builden.

## WCAG pnpm script

Het `pnpm run lint:wcag` script vereist extra dependencies die niet in de
`package.json` staan om het aantal dependencies beperkt te houden.

### Installatie dependencies

Voer eerst de stappen uit zoals beschreven in
`.github/workflows/check-wcag.yml`. Draai daarna:

```bash
pnpm run lint:wcag
```

## Publiceren blogpost

Om een blog te publiceren die in draft staat volg je de volgende stappen:

- Maak eventueel een nieuwe map aan als de huidige maand nog niet bestaat in
  `/blog/{year}/`.
- Verplaats de blogpost naar de map van de huidige maand.
- Verwijder de `draft: true` property uit het frontmatter van de blogpost.
- Draai `pnpm build` om te kijken of de markdown in orde is.

## Changelog

Nieuwe features, bugfixes en andere wijzigingen worden bijgehouden in de changelog. Hierin vermelden wat er veranderd, verbeterd of toegevoegd is.  
Via [Changesets] (`pnpm changeset`) kan er een changelog entry worden aangemaakt. De Changesets bot en workflow maakt automatisch een pull request aan die de verschillende changelog entries samenvoegt. Deze pull request kan worden gemerged voor elke release.

Ondanks dat er geen software package wordt gepubliceerd, gebruiken we de changelog om bij te houden wat er veranderd is in de website. De semver gebruikt in de changelog heeft geen technische betekenis, maar geeft aan of een verandering een nieuwe feature, bijvoorbeeld een nieuw blog, is (minor), een bugfix (patch) of een "breaking" change (major). Voorbeelden van een breaking change zijn bijvoorbeeld het verwijderen van een artikel of het aanpassen van de URL van een artikel.

### Hoe maak ik een changelog entry aan?

1. Draai `pnpm changeset` in de terminal.
2. Kies de type verandering (major, minor of patch).
3. Schrijf een korte beschrijving van de verandering.
4. Sla de changeset op, er wordt automatisch een markdown bestand aangemaakt in
   `.changeset/` met de informatie die je hebt ingevuld.

### Release nieuwe versie van de website

1. Merge de pull request van de Changesets bot.
2. Merge de pull request in de `don-infra` repository, zie de beschrijving hieronder.

## Deployen

De deployment van deze site verloopt via GitHub Actions en een aparte infra
repository.

### Benodigde variabelen en secrets

- Organization variable `INFRA_REPO`, bijvoorbeeld
  `developer-overheid-nl/don-infra`.
- Repository variable `KUSTOMIZE_PATH`, met als basispad bijvoorbeeld
  `apps/frontend/overlays/`.
- Secrets `RELEASE_PROCES_APP_ID` en `RELEASE_PROCES_APP_PRIVATE_KEY` voor het
  aanpassen van de infra repository.
- Secrets `PIWIK_PRO_ACCOUNT_ADDRESS` en `PIWIK_PRO_SITE_ID` voor de build.

### Deploy naar test

De testdeploy draait via `.github/workflows/deploy-test.yml`.

- De workflow draait op pushes naar branches behalve `main`.
- Alleen commits met `[deploy-test]` in de commit message worden echt
  gedeployed.
- Er wordt een image gebouwd en gepusht naar `ghcr.io/<owner>/<repo>` met tags
  `test` en de commit SHA.
- Daarna wordt in `INFRA_REPO` het bestand
  `${KUSTOMIZE_PATH}test/kustomization.yaml` bijgewerkt naar de nieuwe image tag
  en direct gecommit.

Voorbeeld commit message:

```text
feat: pas content aan [deploy-test]
```

### Deploy naar productie

De productiedeploy draait via `.github/workflows/deploy-prod.yml`.

- De workflow draait bij een push naar `main`.
- Er wordt in `INFRA_REPO` een release branch aangemaakt.
- In `${KUSTOMIZE_PATH}prod/kustomization.yaml` wordt de image tag bijgewerkt
  naar de commit SHA van deze repository.
- Daarna wordt automatisch een pull request in de infra repository geopend.
- De productie-uitrol gebeurt door die pull request te mergen.

### Contributies en deploy

Een contribution of pull request leidt niet automatisch tot een deployment.

- Een pull request triggert wel CI, waaronder de build en JSON-validatie.
- De build in `.github/workflows/build.yml` bouwt voor een pull request een
  Docker image als controle, maar pusht dat image niet naar GHCR en past de
  infra repository niet aan.
- Er is dus geen automatische preview-omgeving per pull request.
- Een testdeploy gebeurt pas na een push naar een branch in deze repository met
  `[deploy-test]` in de commit message.
- Die testdeploy gebruikt repository- en organization-variables en secrets om
  ook `INFRA_REPO` aan te passen. Daardoor is dit pad in de praktijk bedoeld
  voor maintainers of contributors met een branch in deze repository.

[Changesets]:https://github.com/changesets/changesets
