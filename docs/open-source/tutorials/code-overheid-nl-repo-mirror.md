---
content_type: tutorial
tags:
  - "open-source"
  - "git"
title: "Repositories mirroren op Code.overheid.nl"
---

Jullie github projecten *ook* op code.oveheid.nl hosten, hoe werkt dat?

Code.overheid.nl is de centrale plek van de rijksoverheid om open source code beschikbaar te stellen aan developers (binnen en buiten de overheid), journalisten en burgers.
De basis van deze website bestaat uit het softwarepakket Forgejo, forgejo is een zogenaamde GIT Forge. In en met een GIT kun je software ontwikkelen, issues beheren, en naturlijk ook Pull of Merge requests verwerken.
Omdat voor veel partijen een volledige overstap op Forgejo of een eigen forge een grote stap is, is het logisch om eerst de code puur en alleen 'gemirrored' beschikbaar te maken. Dit artikel legt uit hoe je dit instelt, en wat dit oplevert.

## Wat is een Forgejo Mirrored Repository?

Een Mirror is een spiegel, of kopie van een bestaande repository. Deze kopie niet direct bedoeld om actief werk te faciliteren, maar maakt wel de code, en eventueel issues, en andere bijbehorende zaken beschikbaar.

## Wat levert een mirror op code.overheid.nl op?

Forgejo, en daarmee code.overheid.nl kan automatisch periodiek alle aanpassingen uit een bestaande publieke Git forge (zoals github, gitlab of een andere forgejo omgeving) dupliceren naar code.overeid.nl.
Door deze geautomatiseerde synchronisatie is code wel altijd beschikbaar op een door de overheid zelf beheerd platform, maar heb je er weinig tot geen omkijken naar. 

## Hoe richt ik een Mirror naar code.overheid.nl in?

Allereerst heb je een code.overheid.nl account nodig. Deze kun je via de Single Sign on aanmaken, danwel via de link codeplatform@rijksoverheid.nl aanvragen als jouw organisatie nog geen account heeft.

Als je eenmaal ingelogd bent, en inderdaad lid bent van de juiste organisatie kun je in de rechter bovenhoek het menu "Create" gebruiken. Je treft twee keuze's aan, een nieuwe repository aanmaken op code.overheid.nl zelf, of een 
'Migration'. Deze Migration (hoewel de naam anders doet vermoeden) kan gebruikt worden als doorlopende Mirror of Kopie.

Na het klikken op Migation tref je een keuze-scherm met verschillende 'Forges' waar vanaf we kunnen kopieren. Voor dit artikel volgende we de route 'GitHub'.
Op de pagina 'Migrate from GitHub' vullen we een aantal velden in:

### Migrate / Clone from URL. 

Dis is de Url waarop je op Github de voorpagina van de repository ziet. 
Een voorbeeld is `https://github.com/SSC-ICT-Innovatie/nl-kat-coordination/`

### Access token

Op deze plek kun je (optioneel) een GitHub token invoeren. Als je deze invult zal de migratie / kopie sneller worden gemaakt, en is er minder kans op verstoring door 'rate-limiting' op GitHub voor de code.overheid.nl processen.
Een Token kun je maken in GitHub door Op de personal-access-tokens pagina (https://github.com/settings/personal-access-tokens) te klikken op 'Generate new token'.
Geef de Token een naam (code.overheid.nl sync), en vul de resterende velden in. 

* https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

### Migration Options

Kies 'this reposiroty' will be a Mirror. 
Kies eventueel Migrate LFS Files' als dit van toepassing is.
LFS Files zijn 'Extra grote bestanden' welke in git opgeschalen zouden kunnen zijn. Voor code projecten is dit doorgaans niet aan de orde, maar het kan dan ook geen kwaad dit wel te kiezen)

### Owner

Kies bij Owner de eigenaar, Kies hier de organisatie in code.overheid.nl waar het project thuishoort.

### Repository Name

Voer hier de zeflde naam in als in gebruik is bij de originele Forge. In ons voorbeeld is dat dus: nl-kat-coordination

Voer eventueel een mooie omschrijving in, en laat de repository op publiek staan. Het doel is immers publiceren.
Na het drukken op 'Migratie repository' zou de kopie binnen enkele minuten beschikbaar moeten komen op code.overheid.nl
