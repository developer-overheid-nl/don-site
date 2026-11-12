# @developer-overheid-nl/website

## 2.2.0

### Minor Changes

- 9d7bd9f: Add blogpost about nl-wallet app with the team behind it
- 22a8024: Add proposed decision on log management lifecycle scope to the Logboek Dataverwerkingen project decisions
- 73ee819: Add blogpost about the upgrade path from WCAG 2.2 to 3.0

### Patch Changes

- 4d7b6ae: Add diff syntax highlighting to code blocks, used in the OpenLint blogpost
- 3cfba95: Add a SECURITY.md and the full EUPL license text, and set Geonovum as copyright
  holder in REUSE.toml to match publiccode.yml
- c0487fd: Replace the image-size-next fork override with the patched upstream image-size
  release
- e84e852: Update @rijkshuisstijl-community packages to components-react 17 and
  design-tokens 18, and load component CSS from components-css
  
  - Replace the removed `variation="pink-background"` prop on `Blockquote` with
    `className="don-blockquote--pink"`
  - Set `headingLevel` on every `Card` so card titles fit the page heading outline
  - Keep the whole `Card` clickable, as it was before the upgrade
  - Document Card heading levels, colours and the pink quote in the contributor
    guides
- 5f03e7b: Test-deploys pushen hun image niet meer onder de commit-sha die productie deployt, zodat productie geen test-build met test-API en test-zoekindex meer kan krijgen.

## 2.1.0

### Minor Changes

- 3dbf696: Add an AI theme to the kennisbank covering AGENTS.md, the Model Context
  Protocol, llms.txt, skills and plugins, and three AI communities. The theme is
  called "Artificiële Intelligentie (AI)" in the menu, the sidebar and on the
  homepage, where its tile links to every page in the theme and reuses the icon of
  the AI button on articles.
- f2a4c80: Add events page listing upcoming and past events
- 988df91: Add article about tweakers developers summit 2026
- 9e7d8b4: Publish blog post about switching all developer.overheid.nl tooling from
  Spectral to OpenLint
- db51807: Add REUSE-standard to knowledge base
- a180b89: Update the API Design Rules pages to version 2.2 of the standard. Add how-to
  pages for the seven rules the linter checks that are new in 2.2: kebab-case path
  segments, lowerCamelCase query keys, the three date and time rules, problem
  details and invalid input. Extend the cheat sheet with sections on error
  handling and on date and time. Link to the specification without a version
  number, so every link opens the current version of the rule. Describe OAS 3.1 as
  the standard throughout the knowledge base and replace Spectral with OpenLint.
  Update the bouw-een-api tutorial to the current OAS Generator and DON Checker.

### Patch Changes

- 5568cf6: Document `community` as a content type for kennisbank articles. The site has
  supported it all along and fourteen articles use it, but neither the contributor
  guide nor AGENTS.md listed it, and both said the five documented values were the
  only ones allowed.
- 981cafb: Update the OAS Generator article with OAS 3.1 as default, filters, resource
  schemas, collection responses, strict input validation and the command line
- f40a28a: Add swizzle check that detects upstream changes to swizzled Docusaurus
  components and merges them on upgrade; add Prettier as a devDependency and
  remove an unused stylesheet import from PaginatorNavLink
- 4eb0002: Update docusaurus-theme-search-typesense to 0.27.0 and keep query strings in
  internal search result URLs
- dc940ec: Re-enable the link checker as a weekly check with a Slack report and fix broken links
- 0cecbc6: Document in the contributing guidelines that every pull request needs a
  changeset

## 2.0.0

### Major Changes

- 3319016: Add a tool article and a CLI tutorial for the Repository Docs Generator, move
  the web-app tutorial to
  /kennisbank/open-source/tutorials/repo-inrichten-generator-webapp

### Minor Changes

- 095b5ba: Publish blog post on developer sessions at the Design Systems Week 2026
- eac086b: Load the homepage agenda from the events API of the Tools API instead of a
  static JSON file

### Patch Changes

- 08a24ea: Update the cloud guideline of the Leidraad for the 2026 government cloud policy:
  portability, exit planning and current policy sources

## 1.16.0

### Minor Changes

- 58cfad7: Add an AI button to kennisbank articles and blog posts, offering to copy or view
  the page as Markdown and to open it in Claude or ChatGPT
- 720a4f1: Replace developer-italia parser by don-checker in open-source chapter
- 4bea514: Generate an llms.txt index so language models can find the Markdown source of
  every kennisbank article and blog post
- 10dd94d: Add new restrictions to advertising in guest blogs

### Patch Changes

- ab11165: Expand AGENTS.md with the contributing rules, the four-layer tagging strategy,
  the changeset requirement and a no-em-dash style rule
- 1d93a86: Fix cards overflowing their grid columns and match their font sizes to the site
- 97df37f: Upgrade Changesets to v3 and pnpm to v10, update the changelog workflow, and move
  pnpm configuration into pnpm-workspace.yaml. Retain browser installer compatibility
  checks while removing hardcoded dependency-version and lockfile assertions.
- 45f0ec8: Include the main pages for Logboek Dataverwerkingen, API Design Rules, OpenAPI
  Specification, FSC, and Haven in search results. Also index blog posts whose
  filenames contain a single-digit day.
- a23d6d0: Fix speaker affiliation and project details in the NLDD blog post

## 1.15.0

### Minor Changes

- c350972: Add article about Nederlandse Digitale Dienst

## 1.14.0

### Minor Changes

- b33e7d3: Publish a blog post by Kennisplatform API's about the Kadaster
  BAG-API and the shift from technical data exposure to product-driven
  development

## 1.13.0

### Minor Changes

- 9b19e82: Update tutorial on adding publiccode.yml, refer to 0.7 version
- bd1ac4a: Move communities into the kennisbank themes as a Communities
  subcategory and remove Communities from the main menu
- 1f27f74: Refresh the agenda with developer-focused events through December
  2026, and drop events that have already taken place
- e8a8ca5: Publish GraphQL blog series part 3
- 22059ef: Publish GraphQL blog series part 4
- 79f8b68: Publish blog post about the Beslisboom Open Standaarden
- 53642d9: Create SBOM documentation with standards and compliance

### Patch Changes

- 6972416: Fix CVEs by patching browserslist to 4.28.8, updating the lockfile,
  and running pnpm audit at moderate level in CI
- 5652c9a: Update vulnerable transitive dependencies to patched versions,
  replace the Axe CLI with its WebDriver API, and complete the Cypress 16
  configuration migration.
- 6408e6b: Update dotenv, Algolia Search Helper, axe CLI and TypeScript,
  including the TypeScript 7 configuration migration.

## 1.12.0

### Minor Changes

- 69016c3: Publish GraphQL blog series part 2

### Patch Changes

- 10321dd: Update site dependencies to remediate known security vulnerabilities,
  run CI tooling on Node.js 24, and add a temporary compatibility override for
  the browser driver installer.

## 1.11.0

### Minor Changes

- af837b4: Publish blogpost about Spectral status

## 1.10.0

### Minor Changes

- 8ed99bd: Updated dead links in all knowledge base chapters. Fixed check-links
  github action. Disabled the check-links github action for now since it
  currently has too much errors.

### Patch Changes

- b1ff0c9: Voeg blogserie "GraphQL onder de loep" toe (vier delen, als draft)
  plus een kennisbankartikel over GraphQL en de tag `graphql`
- b1ff0c9: Publish GraphQL blog series part 1

## 1.9.0

### Minor Changes

- cf6b6c1: Updated information about the ADR Checker. Fixed syntax highlighting
  for `bash`.
- 10dbe2c: Update getting started artikel NL Design System
- 10dbe2c: - Deelhoofdstuk Design Systems onder Front-end hoofdstuk toegevoegd
  en NL Design System er naar toe verhuisd
  - NL Design System ge-update
  - Getting Started NL Design System ge-update
- 2359e6c: Enhance OpenKAT documentation with features and details

### Patch Changes

- 5152064: Update pc.yml standaard pagina naar 0.7
- c6f28ba: Update the API code generation tutorial to use the NestJS Fastify
  template as the main example.
- 3cd1456: Groepeer Dependabot-updates voor Docusaurus en Rijkshuisstijl in
  aparte pull requests.
- 6ff092d: Publish codegen blogpost
- 9c33e26: Docusaurus geupgradet naar versie 3.10.1; DocCard opnieuw geswizzeld
  voor onze custom iconen en downstream fixes toegepast.

## 1.8.1

### Patch Changes

- f87e8ff: Voeg een kennisbankartikel toe over API-authenticatie met APISIX, OPA
  en Keycloak.

## 1.8.0

### Minor Changes

- 50d6a1f: Publish blogpost "Tools in de loop"
- 7aca0d3: Enhance security.txt with contact validation details
- 6b7eee8: Add HSTS documentation with configuration details

## 1.7.0

### Minor Changes

- 3debea8: Voeg artikel toe over CIO-Dag 2026 van Jan Klopper
- 0113c1c: Update 18-asyncapi-3-implementatie-met-cloudevents.md 3de blogpost
  AsyncAPI

### Patch Changes

- 3581f0c: Fix typos and content on about page

## 1.6.0

### Minor Changes

- 41734f3: Voeg artikel toe over onze tweede meetup

## 1.5.0

### Minor Changes

- 135240c: Voeg het common ground event toe
- 91664a9: Voeg een artikel toe over de beslisboom-tool van Forum
  Standaardisatie

  Voeg een property toe aan de Prettier config zodat markdown

  Voeg een paragraaf toe aan de tutorial "Hoe draag ik een kennisbank-artikel
  aan?" over de "Toon en stijl" van artikelen.

- 3590954: Artikel toegevoegd over Changelogs bijhouden met voorbeelden van de
  tools Changesets en Changie.
- 4f1716e: Blogpost over nieuwe Stelselcatalogus toegevoegd.
- 3f8409d: Publiceer tweede blog Floris Async API

### Patch Changes

- 1a83dd9: Moved Async blogpost 3 to 06 folder for publishing
- f253339: TL;DR + kopjes toegevoegd aan blog Floris
- 939df0b: Improve Typesense search across Developer Overheid

  Updated the search page to query multiple Typesense collections, including the
  API register, OSS register, and the new Developer Overheid content
  collections. Search results are grouped by source, use collection-specific
  ranking fields where needed, and link API/OSS results to their public domains.

  Also added Markdown indexing for generated Docusaurus content so standards,
  tutorials, tools, architecture, guidelines, blog posts, and communities can be
  pushed to Typesense after build.

- 2406d39: Offline halen blog Floris
- 316f86f: Verander links die verwezen naar de publiccode-checker, deze is
  deprecated
- 741173c: fix: add wrappers to pages to apply markdown
- 2c02f77: Update 05-asyncapi-2-use-cases.md - truncate verplaatst
- 40bac4e: Pas het voorbeeld van pc.yml aan bij de key
  "localisation.availableLanguages"

## 1.4.1

### Patch Changes

- de5b5d1: Voeg Johan toe als spreker aan het event van 17 juni

## 1.4.0

### Minor Changes

- 90d5762: Publiceer een blogpost over ons event op 17 juni

## 1.3.0

### Minor Changes

- f737426: Voegt een artikel toe van Tim van der Lippe over de zachte kant van
  standaarden.

## 1.2.0

### Minor Changes

- f942436: Add blogpost about code.overheid.nl

## 1.1.0

### Minor Changes

- 9a13d10: Artikel over onze eerste online update toegevoegd op 23 april 2026.

## 1.0.0

### Major Changes

- 3fd250f: # Eerste release met Changelog

  Er zijn natuurlijk al veel releases en veranderingen geweest voor het
  bijhouden van deze changelog. Deze zijn gedaan zonder verandering van het
  versienummer, vandaar dat dit release 1.0.0 wordt.

  Meer informatie over het bijhouden van de changelog staat in onze
  [README.md](./README.md#changelog).
