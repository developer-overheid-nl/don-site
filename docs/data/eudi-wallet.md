---
tags: [eu, edi, eudi, eidas, interoperability, security-by-design, privacy]
---

# Wallet

De herziene **eIDAS-verordening** (mei 2024) legt de basis voor een Europese Digitale Identiteit (EUDI). Deze verordening stelt hogere eisen aan veiligheid, betrouwbaarheid en gebruiksgemak. Daarmee krijgen burgers en bedrijven een nieuwe manier om hun identiteit online te bewijzen en gegevens te delen. De eerste wallets zijn eind 2026 beschikbaar.

## Wat is een EUDI-wallet?

Een **EUDI-wallet** is een digitale applicatie (meestal een mobiele app) waarmee burgers binnen Europa veilig kunnen:

- Zich online identificeren.  
- Persoonlijke gegevens uitwisselen (bijvoorbeeld naam, geboortedatum, diploma’s, rijbewijs).  
- Documenten digitaal ondertekenen.  

Uniek is dat je als gebruiker zelf bepaalt welke gegevens je deelt en met wie. Daarmee krijg je regie over je eigen data.

Gebruik van de wallet is **vrijwillig**. Huidige kanalen en inlogmiddelen blijven beschikbaar.

## Europese en Nederlandse context

- De wallet wordt in alle EU-landen erkend.  
- Publieke organisaties moeten wallets accepteren zodra ze beschikbaar zijn, private partijen een jaar later.  
- In Nederland wordt een **publieke NL-wallet** ontwikkeld die gratis beschikbaar komt en voldoet aan de eisen van inclusiviteit, toegankelijkheid en veiligheid.  
- Naast de publieke wallet kunnen in de toekomst ook private aanbieders toetreden, mits zij voldoen aan de eIDAS-eisen.  

De NL Wallet is gebaseerd op de EUDI-wallet en biedteen raamwerk voor een Europese Digitale Identiteit

Meer achtergrondinformatie: [OSS repository NL-wallet (BZK)](https://oss.developer.overheid.nl/repositories/minbzk-nl-wallet-9632).

## Voordelen voor burgers en bedrijven

- **Regie over gegevens**: alleen delen wat nodig is (bijv. leeftijd >18 i.p.v. volledige geboortedatum).  
- **Gebruiksgemak**: processen die nu vaak papier vereisen (contracten tekenen, auto huren) kunnen digitaal.  
- **Betrouwbaarheid**: gegevens komen uit officiële bronnen, wat fraude tegengaat.  

## Belangrijke begrippen

| Begrip | Uitleg |
|--------|--------|
| **PID (Person Identification Data)** | Kerngegevens van een burger (bijv. naam, geboortedatum). |
| **QEAA (Qualified Electronic Attestation of Attributes)** | Gekwalificeerde attesten van kenmerken, uitgegeven door erkende partijen. |
| **EAA (Electronic Attestation of Attributes)** | Niet-gekwalificeerde attesten, vaak door private partijen. |
| **PuB-EAA** | Attesten uitgegeven door of namens publieke authentieke bronnen. |
| **Relying Party (RP)** | Organisaties die de wallet gebruiken om identiteit of attributen te verifiëren. |
| **Wallet Provider** | De partij die de digitale wallet beschikbaar stelt. |
| **Conformity Assessment Body (CAB)** | Onafhankelijke instantie die wallets certificeert. |
| **Authentic Source** | Bronsystemen die officiële data leveren (bijv. BRP). |

Bron: [EUDI Architecture and Reference Framework](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/architecture-and-reference-framework-main/)

## API’s en protocollen binnen de EUDI-architectuur

De EUDI-wallet gebruikt standaarden en API’s om interoperabiliteit en veiligheid te garanderen. Hieronder een overzicht met directe verwijzingen naar de officiële specificaties:

| API / standaard | Toepassing | Officiële standaard / documentatie |
|-----------------|------------|-----------------------------------|
| **OpenID4VP** | Presentatie van verifiable credentials in (remote) data-uitwisselingen. | [OpenID4VP Draft](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) |
| **SD-JWT VC** | Mechanisme om selectief data te delen uit attesten. | [IETF SD-JWT VC Draft](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/) |
| **W3C Verifiable Credentials (VC)** | Standaard voor digitale bewijsstukken (credentials). | [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/) |
| **ISO/IEC 18013-5** | Mobiel rijbewijs (mDL) specificatie. | [ISO/IEC 18013-5:2021](https://www.iso.org/standard/69084.html) |
| **WebAuthn / Passkeys** | Ondersteuning voor pseudoniemen en sterke authenticatie. | [W3C WebAuthn](https://www.w3.org/TR/webauthn-2/) |
| **Proximity flows (NFC, QR)** | Voor fysiek nabije presentaties van data. | [ISO/IEC 18013-5 NFC & QR Specificaties](https://www.iso.org/standard/69084.html) |
| **Remote presentation flows** | Voor uitwisseling op afstand tussen wallet en dienstverlener. | [EUDI Architecture & Reference Framework](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/architecture-and-reference-framework-main/) |

Zie hoofdstukken 4 en 5 van het [EUDI-Architecture Framework](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/architecture-and-reference-framework-main/#4-high-level-architecture)

De W3C VC, ISO/IEC 18013-5, WebAuthn, Proximity flows zijn verplicht en vastgesteld, de overige standaarden (OpenID4VP, SD-JWT VC, Remote flows) zijn nog in ontwikkeling, maar gaan richting verplicht.  

Onderstaand model geeft een overzicht van de architectuur van het EUDI wallet ecosysteem:

![het EUDI wallet ecosysteem](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/media/Figure_2_High-Level_Architecture.jpg)

---

## Meer weten?

- [edi.pleio.nl](https://edi.pleio.nl) – informatie over de Nederlandse EDI-wallet.  
- [blsp.pleio.nl](https://blsp.pleio.nl) – Large Scale Pilots in Europa.  
- [OSS repository NL-wallet](https://oss.developer.overheid.nl/repositories/minbzk-nl-wallet-9632) – open source ontwikkeling van de Nederlandse wallet.
- [EUDI Architecture and Reference Framework](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/architecture-and-reference-framework-main/) - het Europese referentie en architectuur raamwerk.
