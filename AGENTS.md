# AGENTS.md

Instructies voor AI-assistenten die aan deze repository werken. Wat hier staat
geldt naast de bijdragersrichtlijnen voor mensen; bij twijfel is
`src/pages/contributing/` leidend.

## Wat dit project is

De Docusaurus-site achter
[developer.overheid.nl](https://developer.overheid.nl), het ontwikkelaarsportaal
van de Nederlandse overheid. De inhoud bestaat uit een kennisbank (`docs/`), een
blog (`blog/`) en een aantal losse pagina's (`src/pages/`).

## Bouwen en testen

```bash
pnpm install          # pnpm, geen npm of yarn
pnpm start            # lokaal draaien met live reload
pnpm build            # volledige build; controleert ook interne links
pnpm test             # node --test op scripts/*.test.js
pnpm exec prettier --write <pad>
```

Draai `pnpm build` voordat je een wijziging aflevert. De build faalt op kapotte
interne links en op tags die niet in `tags.yml` staan; dat zijn de twee fouten
die het vaakst pas in CI opvallen.

Formatteer met Prettier en beperk je tot de bestanden die je hebt gewijzigd.
`pnpm exec prettier --write scripts` herformatteert ook bestanden waar je niets
aan hebt gedaan, en dat vervuilt de diff.

## Schrijfwijze

**Geen em-dashes.** Gebruik geen `—` in tekst die op de site komt, ook niet in
koppen, tabellen of frontmatter. Herschrijf de zin, of gebruik een komma, een
dubbele punt of een haakje. Dit geldt voor markdown, voor strings in componenten
en voor teksten in JSON- en YAML-bestanden.

Klantgerichte tekst is Nederlands. Technisch jargon blijft Engels binnen een
Nederlandse zin: schrijf flag, gate, edge case, race condition, timeout.

Identifiers in code zijn Engels, zonder uitzondering: bestandsnamen, variabelen,
functies, types, CSS-klassen en JSON-sleutels. Comments, strings en documentatie
volgen hun eigen regel en blijven waar nodig Nederlands. Een Engelse constante
met een Nederlandse waarde is prima wanneer die waarde een publieke URL is.

## Kennisbankartikelen

Lees eerst `/contributing/kennisbank-artikel`
(`src/pages/contributing/kennisbank-artikel.mdx`). Samengevat:

Artikelen staan in `docs/<thema>/`, in een subcategorie per content type. Elk
artikel begint met frontmatter waarin `description` **verplicht** is; die wordt
gebruikt in de RSS-feed en als meta-beschrijving. Een `image` is optioneel maar
aanbevolen voor het delen op sociale media.

### Content type

Het veld `content_type` bepaalt in welke overzichten een artikel verschijnt.

| Waarde         | Gebruik voor                                        |
| -------------- | --------------------------------------------------- |
| `standaard`    | Specificaties, protocollen, formaten, voorzieningen |
| `tool`         | Software, validators, editors, linters              |
| `tutorial`     | Stapsgewijze handleidingen                          |
| `architectuur` | Patronen, concepten, ontwerpbeslissingen            |
| `richtlijn`    | Leidraad content (principes en richtlijnen)         |

`content_type` staat los van de tags. Deze waarden mogen **nooit** als tag
voorkomen.

### Taggingstrategie

Vier lagen, waarvan alleen de tweede verplicht is.

**Laag 1, content type.** Geen tag, maar een apart frontmatter-veld. Zie
hierboven.

**Laag 2, thema-tags.** Verplicht, minimaal 1 en maximaal 3 per artikel. De
zeven thema's zijn `informatiebeveiliging`, `interoperabiliteit`,
`toegankelijkheid`, `privacy`, `infrastructuur`, `front-end` en `open-source`.

**Laag 3, onderwerp-tags.** Optioneel, maximaal 5. Specifieke technologieën,
standaarden of concepten, bijvoorbeeld `oauth`, `kubernetes`, `dcat`, `wcag`.

**Laag 4, organisatie-tags.** Optioneel. Bijvoorbeeld `forum-standaardisatie`,
`kennisplatform-apis`, `vng`, `common-ground`.

Regels die de build afdwingt:

- Maximaal **8 tags** in totaal per artikel.
- Elke tag moet in `tags.yml` staan. Een onbekende tag laat de build falen.
- Voeg een tag alleen toe aan `tags.yml` als hij herbruikbaar is. Eenmalige tags
  horen er niet in.

## Blogposts

Zie `/contributing/gastblog-schrijven`. Posts staan in
`blog/<jaar>/<maand>/<dag>-<slug>.md`. De frontmatter bevat `authors` met een
sleutel uit `blog/authors.yml`, plus `tags` uit diezelfde `tags.yml`. Zet
`<!-- truncate -->` na de openingsalinea, zodat het blogoverzicht een bruikbaar
excerpt toont.

Voeg ook een changeset toe; zie hieronder.

## Changesets

**Elke pull request heeft een changeset nodig**, ook een die alleen content
toevoegt. Zonder changeset komt de wijziging niet in de changelog en krijgt de
site geen versiebump.

Schrijf het bestand niet met de hand, maar laat de tool het aanmaken:

```bash
pnpm changeset add --empty     # maakt .changeset/<gegenereerde-naam>.md
```

Vul daarna de frontmatter en de samenvatting in. `pnpm changeset` zonder
`--empty` vraagt alles interactief; dat werkt niet in een niet-interactieve
sessie, omdat de samenvattingsprompt op invoer blijft wachten.

Welke bump je kiest:

- `major` voor een breaking change: een artikel verwijderen of de URL van een
  bestaand artikel wijzigen.
- `minor` voor nieuwe content of nieuwe functionaliteit: een artikel, een
  blogpost, een thema, een component.
- `patch` voor correcties, dependency-updates, tooling en documentatie voor
  bijdragers die de site zelf niet verandert.

De semver heeft hier geen technische betekenis; er wordt geen package
gepubliceerd. Hij dient om te kunnen zien wat er aan de site is veranderd.

De changelog is Engels, ook al is de site Nederlands. Schrijf de regel in de
gebiedende wijs zoals de bestaande changesets: "Add", "Publish", "Fix",
"Update".

## Git

Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.
Branchnamen volgen hetzelfde patroon, bijvoorbeeld `content/bag-api-blogpost` of
`fix/audit-dependencies`.

Pull requests worden bij het mergen gesquasht tot één commit, dus losse
commitberichten hoeven niet perfect te zijn.

Push niet naar `main`. Werk altijd op een branch en open een pull request.

## Waar je vanaf blijft

- `build/` en `.docusaurus/` zijn gegenereerd.
- `pnpm-lock.yaml` alleen via pnpm zelf, nooit met de hand.
- `patches/` bevat patch-bestanden die bij `pnpm.patchedDependencies` horen.
- Gooi geen bestaande tests weg om een nieuwe te laten slagen.

Voeg geen dependencies toe zonder dat te overleggen. Let er daarbij op dat
`pnpm` peer dependencies standaard automatisch installeert: dat een build slaagt
zonder een declaratie betekent niet dat het package overbodig is. Toets dat met
`pnpm install --config.auto-install-peers=false`.
