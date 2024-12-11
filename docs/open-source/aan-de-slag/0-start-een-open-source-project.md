---
tags:
  - 'open-source'
title: 'Start een Open Source project'
---

Open source werken heeft [veel voordelen](https://community.developer.overheid.nl/t/de-kracht-van-open-source-hoe-jij-als-developer-beleidsmensen-overtuigt-van-open-source-werken/175/4). Maar hoe ziet de codebase van een gezond open source project er uit? En waar moet je nog meer rekening mee houden? Antwoorden daarop krijg je in dit artikel.

## Wat zijn de minimale eisen?
Om een Open Source project bruikbaar te maken heb je in ieder geval een aantal dingen nodig:

- Een [readme `(README.md)`](https://community.developer.overheid.nl/t/readme-md/386) 
- Een gedragscode `(CONTRIBUTING.md)`
- Een licentie `(LICENSE)`
- Een [`publiccode.yml`](https://community.developer.overheid.nl/docs?topic=311)

# Handige andere bronnen

## Project Launch Checklist
Als je er achter wilt komen of het haalbaar is om je project te open sourcen is de "[Project Launch Checklist](https://ospo-nl.github.io/kennisbank/best-practices/project-launch-checklist/#stap-4-technische-beoordeling)" van OSPO-NL een handig naslagwerk. Ook helpt dit document je bij het toegankelijk maken van jouw codebase voor eventuele contributers.

[wrap="button"][Naar OSPO-NL Project Launch Checklist](https://ospo-nl.github.io/kennisbank/best-practices/project-launch-checklist/)[/wrap]

## Standard for Public Code
Om meer te weten te komen over de dagelijkse processen rondom een open source codebase is de "Standard for Public Code" zeer geschikt. Deze vind je hier:
https://standard.publiccode.net/


## Opensource.guide
Dit project is gestart en wordt onderhouden door Github. Het is net zoals de Standard for Public Code opgericht om te helpen bij het succesvol open source maken van projecten. Je vindt hem hier:
https://opensource.guide/


# Project Launch Checklist

Gefeliciteerd! Je leest dit omdat je van plan bent om je project te open sourcen!

Deze checklist is gecreëerd om je te helpen om je eigen open source projecten te starten waar dit
strategische relevant is. Hiermee nemen we je mee in de zaken waar je rekening mee moet houden voor
dat je besluit een open source project te starten.

Vul voor jezelf deze checklist in en neem contact op met de OSPO om het te bespreken.

Deze checklist is bedoeld voor de grotere softwareprojecten. Voor kleine projecten van enkele
honderden regels code - zoals een klein scriptjes - voldoet een beperkte lijst van criteria.

Deze checklist afgeleid van de [Starting an Open Source
Project](https://www.linuxfoundation.org/resources/open-source-guides/starting-an-open-source-project)
lijst van de Linux Foundation. De [GitHub Default Community Health
Files](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)
is ook een goede bron van inspiratie.

## Stap 1: Overwegingen

1. Evalueer de mogelijkheden om lid te worden van een bestaand open source-project
2. Evalueer hoe reëel het is dat andere bedrijven willen mee ontwikkelen aan dit project

## Stap 2: Business strategie & plan

1. Bepaal en zet open source doelen voor je project
2. Stel vast wie je beoogde doelgroep is
3. Beargumenteer waarom het van toegevoegde waarde is voor onze organisatie om het te open sourcen
4. Bepaal welke deel van je project je wilt open sourcen (welke repositories, inclusief URLs)
5. Bepaal wie de kosten gaat dragen van voor maintainen van open source project (incl.
   infrastructuur, open source community support en open source activiteiten)
6. Zorg dat je minimaal 3 jaar commitment hebt om het project te maintainen
7. Stel vast of de OSPO & Enterprise Architecten akkoord zijn met je plan.

## Stap 3: Juridische beoordeling

1. Check of het open sourcen van je project impact heeft op het intellectueel eigendom van de
   organisatie
2. Bepaal onder welke open source licentie je de code wilt open sourcen. _Zie hiervoor
   [aanbevelingen over het kiezen van een licentie](./open-source-software-licenties.md)_
3. Zorg er voor dat je de gekozen open source-licenties goed begrijpt en volledige naleeft
4. Overweeg of je ook non-software outputs van de community verwacht, zo ja: bepaal onder welke open
   source licentie je dat wilt open sourcen. Dit kan een andere licentie zijn dan waaronder je code
   open sourced.
5. Bepaal je nog eventuele handelsmerk gerelateerde besluiten noodzakelijk zijn

## Stap 4: Technische beoordeling

1. Verwijder kritische afhankelijkheden met niet-publieke componenten.
2. Zorg voor een goede README.md met use-case voorbeelden. Zie [Make a
   Readme.com](https://www.makeareadme.com/)
3. Zorg voor een goede [CONTRIBUTING.md](../standaarden/contributing-md.md).
4. Zorg voor een [CODE_OF_CONDUCT.md](../standaarden/code-of-conduct-md.md).
5. Zorg voor een SUPPORT.md. Zie ons [eigen voorbeeld](../standaarden/support-md.md)
6. Verwijder interne opmerkingen en referenties
7. Zorg voor voldoende code kwaliteit
8. Zorg ervoor dat coding style is consistent
9. Update de copyright notities in de source code files
10. Voeg een licentie notitie in de source code files
11. Voeg voor een kopie licentie tekst (volgt uit [stap 3](#stap-3-juridische-beoordeling)) toe aan
    de root directory (LICENSE). Zie ons [eigen voorbeeld](../standaarden/license.md)

## Stap 5: Governance en processen

1. Zorg voor een [PROJECT_GOVERNANCE.md](../standaarden/project-governance-md.md) waarin de
   governance structuur beschreven is.
2. Bepaal wat de roadmap wordt
3. Zorg voor een code repository, bug reporting en code testing infrastructuur die toegankelijk is
   voor de community
4. Creëer ondersteunden communicatie kanalen, zoals mailing list en wiki

## Stap 6: Launch en maintain

1. Open het project en start met open source ontwikkel proces
2. Zorg dat het gebruik van [Developer Certificate or Origin (DCO)](../standaarden/dco-md.md) wordt afgedwongen.
3. Zorg er voor dat veranderingen aan de roadmap of governance helder gecommuniceerd worden.
4. Volg best practices zoveel mogelijk & behaal [OpenSSF ( formerly CII ) Best Practices
   badge](https://bestpractices.coreinfrastructure.org/en)

## Stap 7: Branding en marketing

1. Selecteer wie de rol van community advocate op zich neemt
2. Creëer marketing strategie om een actieve community te promoten
3. Zorg dat het project genoemd wordt op publieke pagina's van de organisatie
4. Moedig en organiseer face-to-face activiteiten voor community building
