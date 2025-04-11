---
tags:
  - "security"
  - "security-by-design"
  - "eherkenning"
  - "saml"
  
title: "eHerkenning"
---

**eHerkenning** is het zakelijke inlogmiddel waarmee organisaties veilig en betrouwbaar kunnen inloggen bij digitale overheidsdiensten. Het is de zakelijke tegenhanger van DigiD, maar speciaal ontworpen voor bedrijven, stichtingen en andere organisaties.

Met eHerkenning toon je aan namens welk bedrijf je handelt, wat belangrijk is voor zaken als belastingaangifte, subsidies aanvragen of het doorgeven van personeelsgegevens.

## Hoe werkt het?

eHerkenning is gebaseerd op een systeem van erkende **leveranciers** die authenticatiemiddelen uitgeven. Deze middelen zijn gekoppeld aan een **betrouwbaarheidsniveau** (EH1 t/m EH4+), afhankelijk van de gevoeligheid van de dienst waarmee wordt ingelogd.

De techniek achter eHerkenning is gebaseerd op **SAML 2.0**, net als DigiD. Daardoor is het goed integreerbaar in bestaande SSO- en federatieve login-oplossingen.

## Waarvoor wordt eHerkenning gebruikt?

Met eHerkenning log je in bij meer dan 500 diensten, waaronder:

- **Kamer van Koophandel (KvK)**
- **Belastingdienst**
- **UWV**
- **RVO**
- **Justis**

Als developer bouw je bijvoorbeeld integraties waarin een gebruiker namens een organisatie inlogt om gegevens aan te leveren of aanvragen te doen.

## Belangrijk voor developers

Bij implementatie van eHerkenning in jouw applicatie of dienst:

- Koppel je aan via een **makelaar** of **dienstverlener** die eHerkenning ondersteunt.
- Moet je jouw dienst registreren in het **machtigingenregister**.
- Werk je met **SAML-authenticatie** (en dus metadata, EntityID’s, AssertionConsumerServices, enz.).

Ook hier speelt privacy een rol: organisaties krijgen alleen de noodzakelijke attributen aangeleverd, zoals KvK-nummer, organisatie-identiteit en bevoegdheden.

## Betrouwbaarheidsniveaus

eHerkenning werkt met vier hoofd-niveaus (EH2 t/m EH4+):

- **EH2**: laag niveau (bv. aanvragen van milieu pas)
- **EH3**: standaard niveau (bv. loonaangifte via Belastingdienst)
- **EH4**: hoog niveau (juridisch bindende handelingen)
- **EH4+**: extra zekerheid (zoals voor bepaalde justitiediensten)

Het gevraagde niveau hangt af van de dienstverlener.

## Meer informatie

- Algemene info en registratie: [eHerkenning.nl](https://www.eherkenning.nl/)
