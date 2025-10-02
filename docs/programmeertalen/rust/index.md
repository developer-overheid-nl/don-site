---
title: "Rust"
tags: ["open-source"]
sidebar_position: 0
---

Rust heeft de afgelopen jaren aan populariteit gewonnen door zijn performance en
zijn moderne tooling/ ecosysteem.

Rust is een fijne taal omdat het helpt bugvrije software op te leveren. Ook is
het een expressieve taal met een uitgebreid typesystem waardoor je er complexe
concepten goed in kan vatten. De tooling om Rust heen is erg hulpvaardig en de
linter Clippy geeft handige tips voor het correct gebruik van Rust. Wel is het
een taal met een jong ecosysteem waardoor je soms specifieke functionaliteiten
binnen libraries mist.

## Voordelen

### 1. Snel en efficiënt

Omdat Rust een low-level taal is die gecompiled wordt, is het een zeer snelle en
efficiënte taal. Hierdoor is het bijzonder geschikt voor bijvoorbeeld:

- API's/microservices met veel requests in korte tijd
- Embedded systems waarbij de resources beperkt zijn
- Stukken software die op veel plekken snel moeten functioneren zoals drivers

### 2. Robuust

Rust biedt prestaties vergelijkbaar met C en C++, zonder de
beveiligingsrisico's. Dit maakt het geschikt voor high-performance toepassingen
zoals dataverwerking, netwerktoepassingen en embedded systems.

### 3. Fijne developer experience

Doordat er flink is geïnvesteerd in een aantal producten naast de
programmeertaal zelf is de developer experience goed. Ook heeft het Rust team er
voor gekozen om het ontwikkelen van deze tools zelf te doen, en het niet over te
laten aan third-party projecten. Daardoor werken ze extra goed en is er geen
onnodige concurrentie. Het volgt de filosofie van "batteries included".

## Nadelen

### 1. Jonge taal, minder libraries

Omdat Rust een jonge taal is zijn er minder packages voor handen dan
bijvoorbeeld in Python of in Java. Een voorbeeld hiervan noemt ook de Kiesraad
in het
[interview dat we met haar hielden](https://developer.overheid.nl/blog/2025/03/26/interview-kiesraad-rust#een-jonger-ecosysteem-betekent-minder-uitgebreide-libraries-voor-legacy-standaarden-bijvoorbeeld-xml).
In het interview komt naar voren dat de libraries die er zijn, niet altijd even
volwassen of uitgebouwd zijn. Ze noemen bijvoorbeeld de library `quick-xml` voor
het verwerken van XML en zeggen hierover:

"Je merkt dat de meest gebruikte XML library voor Rust (quick-xml) wel voldoet,
maar minder volwassen en uitgebreid is dan wat je in andere talen vindt.
Bijvoorbeeld in Java of .NET, die zijn ontwikkeld toen XML in opkomst was."

### 2. Steile learning curve

Omdat Rust een strikte taal is heeft het een relatief steile learning curve. Ook
bevat de taal een aantal fundamentele concepten die anders zijn dan in de andere
mainstream programmeertalen.

## Tools

### Cargo

Cargo is Rust's officiële build system en package manager, de centrale tool die
bijna alles rondom Rust development voor je afhandelt.

### Clippy

Clippy is de linter van Rust en geeft je suggesties hoe je je code netter kan
schrijven. Het geeft je dus ook advies hoe je je functie zou kunnen refactoren.

### Cargo test

Cargo test is het test-framework dat standaard mee komt met Rust.

## Toekomstbestendigheid

Rust heeft een actieve open-source gemeenschap en wordt ondersteund door de Rust
Foundation, met steun van grote tech bedrijven. De taal evolueert gecontroleerd
via een transparant RFC-proces, wat langetermijnstabiliteit garandeert.

## Use cases voor de overheid

Rust is bijzonder geschikt voor:

- **Web services en APIs**: veilige en snelle backend systemen
- **CLI tools en automation**: betrouwbare command-line applicaties
- **IoT en embedded systems**: veilige software voor smart city toepassingen
- **Network services**: firewalls, proxies en andere netwerkapplicaties
- **Data processing**: efficiënte verwerking van grote datasets

## Links

[Artikel: deze goede redenen heeft de Kiesraad om Rust te gebruiken](https://developer.overheid.nl/blog/2025/03/26/interview-kiesraad-rust)
