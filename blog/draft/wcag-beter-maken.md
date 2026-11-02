---
authors: [hidde-de-vries]
description:
  "WCAG is de meestgebruikte standaard voor digitale toegankelijkheid, en er wordt op dit moment gewerkt aan een volgende versie. Wat wordt er verbeterd en waarom? Hidde schrijft mee aan WCAG 3 en geeft in deze post antwoord op die vragen en meer."
image: ./img/mijn-preview-afbeelding.png
tags:
  - toegankelijkheid
draft: true
---

# Hoe we WCAG beter willen maken

[WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) is al vele jaren dé standaard voor digitale toegankelijkheid. Wereldwijd is wetgeving die toegankelijkheid vereist vaak wetgeving die naar “WCAG” verwijst, al is dat technisch gezien vaak vrijwillig of indirect. Doordat WCAG veel gebruikt wordt, horen we veel over wat er beter kan. Vanuit [Logius](https://logius.nl) werk ik als co-editor actief mee aan [WCAG 3](https://www.w3.org/TR/wcag-3.0/), waarin we proberen WCAG beter te maken.

<!-- truncate -->

## Wat is WCAG?

De meeste ontwikkelaars zullen bekend zijn met WCAG, de standaard voor digitale toegankelijkheid. Elke overheidswebsite- en app [moet er namelijk al jaren aan voldoen](https://wetten.overheid.nl/BWBR0040936/2018-07-01/). Veel teams houden hier al rekening mee zodra ze beginnen (dat is in ieder geval in mijn ervaring het efficiëntst: hoe eerder, hoe makkelijker).

WCAG beschrijft hoe je websites en apps toegankelijker kunt maken, specifiek voor mensen met een beperking, op vier vlakken. 

Toegankelijke producten voldoen volgens WCAG aan de “[vier principes](https://www.w3.org/WAI/WCAG22/Understanding/intro#understanding-the-four-principles-of-accessibility)”:

* waarneembaar: doordat ze met meerdere zintuigen kunnen worden gebruikt (denk aan geluid in video dat gebruikers kunnen horen, met ondertiteling die gebruikers kunnen zien);
* bedienbaar: ze werken zonder aannames te doen… je weet niet of iemand met een muis, touchpad of toetsenbord werkt, dus optimaliseer je voor alledrie;
* begrijpelijk: foutmeldingen zijn helder en taal is aangegeven;
* robuust: de content kan op verschillende manieren worden weergegeven en worden geïnterpreteerd door browsers en hulptechnologieën als screenreaders.

Binnen WCAG zijn de eisen verdeeld over deze vier groepen. Elke eis, een succescriterium, kan worden getest en er kan vastgesteld worden of een webpagina eraan voldoet. Er zijn in [WCAG 2.2](https://www.w3.org/TR/WCAG22/) in totaal 55 succescriteria waar overheidwebsites- en apps op worden getest, dit zijn in de standaard niveau A en AA.

## Wat is er mis met WCAG?

Op zich werkt testen met WCAG 2 goed: het geeft een goed beeld van wat er nog aan toegankelijkheid moet gebeuren, en hoe bruikbaar een website of app is voor mensen met een beperking.

Tegelijkertijd hebben we over de jaren ook wel geleerd dat er van alles beter kan. Ik neem je mee.

### Representatie

Toegankelijkheid draait om bruikbaarheid door mensen een beperking. Er zijn veel verschillende beperkingen, zoals visuele, auditieve, en cognitieve beperkingen. Wat Qwe veel horen over WCAG 2 is dat niet al deze groep even goed vertegenwoordigd zijn in de eisen.

Zo is er een groter deel eisen dat specifiek relevant is voor het wegnemen van beperkingen voor mensen die met een screenreader werken. Dit kan overigens grotendeels verklaard worden doordat het makkelijker testbaar te maken is: wat je toevoegt voor screenreaders is relatief makkelijk na te gaan, vergeleken met bijvoorbeeld hoe iets werkt voor iemand met ADHD.

### Innovatie

Soms wordt gezegd dat WCAG lastig met z'n tijd mee gaat, omdat technologie zich razendsnel ontwikkelt. Nu weet ik niet hoe terecht dit verwijt is: soms is innovatie een tijdelijke hype (neem [NFTs](https://en.wikipedia.org/wiki/Non-fungible_token#Issues_and_criticisms)), en bovendien is het [18-jaar oude](https://www.w3.org/TR/WCAG20/) WCAG 2 vandaag de dag nog verrassend goed bruikbaar. Juist doordat het bewust los van specifieke technologieën is geschreven. 

### Lastig uit te breiden

Het is relatief lastig om WCAG 2 uit te breiden, door de structuur: succescriteria vallen onder richtlijnen, richtlijnen onder principes, en dan zijn de criteria ook nog zo georganiseerd dat niveaus (A, AA en AAA) bij elkaar staan, en er een nummering is. 

### Invloed van andere systemen

Toegankelijkheid ligt niet altijd aan de website of app zelf, er zijn allerlei systemen die er specifieke invloed op kunnen hebben. Zo bepaalt een CMS regelmatig wat er aan output nodig is, hangt bruikbaarheid af van wat een screenreader kan, en zijn er browserfunctionaliteiten en plug-ins die toegankelijkheid kunnen verbeteren (of verminderen). In WCAG 2 wordt er relatief weinig rekenschap gegeven van dit soort invloeden van buiten. Voor CMS'en en browsers zijn er bovendien andere standaarden: [ATAG](https://www.w3.org/WAI/standards-guidelines/atag/) en [UAAG](https://www.w3.org/WAI/standards-guidelines/uaag/). 

### Gebruiksaanwijzing

Een laatste punt dat men wel eens over WCAG maakt is dat er te weinig duidelijke uitleg beschikbaar is. Er zijn zogenaamde [Understanding documenten](https://www.w3.org/WAI/WCAG22/Understanding/) en [Techniques](https://www.w3.org/WAI/WCAG22/Techniques/), maar die zijn vaak niet specifiek genoeg, en regelmatig omslachtig omschreven. Dit wordt geïllustreerd doordat veel organisaties ervoor kiezen eigen uitleg te maken: in Nederland heeft bijvoorbeeld NL Design System [uitleg en tests per WCAG-criterium](https://nldesignsystem.nl/wcag/), daarbuiten is er bijvoorbeeld [die van GOV.UK](https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag). 

## Hoe we WCAG beter maken

_Let op: deze sectie gaat over WCAG 3, en dat is nog niet uit, en nog erg in ontwikkeling._

Op dit moment werkt W3C aan een nieuwe versie van de richtlijnen: [WCAG 3](https://www.w3.org/TR/wcag3/). Logius is actief vertegenwoordigd in de [werkgroep](https://www.w3.org/groups/wg/ag), als [co-editor](https://www.w3.org/TR/wcag3/#:~:text=Logius) probeer ik te zorgen voor leesbaarheid, coherentie, en consensus over een deel van de richtlijnen. 

Er is een [publieke Working Draft](https://www.w3.org/TR/wcag-3.0/) die je kunt bekijken en waar je feedback op kunt geven. Let op, deze versie is nog niet klaar voor gebruik, WCAG 2 is nog vele jaren de standaard. 

Wat proberen we beter te maken, en hoe adresseren we de feedback op WCAG 2?

### Verbreding

Eén van de speerpunten van WCAG 3 is beter zorgen dat verschillende beperkingen zijn meegenomen. Eén van de manieren waarop we dat doen is door gebruik te maken van het Digital Accessibility Framework en functional performance statements. We hebben in kaart hoe mensen IT gebruiken, en wat ze daarvoor nodig hebben, en kunnen zo beter inschatten of alles voldoende is afgedekt door de opgenomen eisen. 

### Innovatie

Innovatie wordt in WCAG 3 makkelijker gemaakt door nog minder aannames te doen.  

Zo gaat WCAG 2 er bij veel eisen vanuit dat je iets op een webpagina doet, maar veel UIs bestaan tegenwoordig niet meer webpagina's: denk aan schermen in apps of ticketautomaten. In WCAG 3 zijn dit soort eisen er nu niet meer voor een ‘webpagina’, maar voor een ‘webpagina/view’. Dat klinkt misschien als iets heel kleins, maar het zorgt voor een stuk bredere toepasbaarheid, zoals op schermen  apps, en is iets meer toekomst-proof. 

### Integratie

We maken in WCAG 3 de eisen niet langer een beschrijving van wat je zou moeten doen, maar een beschrijving van wat het geval moet zijn. De eisen zijn opgeschreven als _outcomes_. Zo wordt het minder belangrijk of toegankelijkheid door de website of app zelf komt, of dat een bepaalde browser, CMS, of screenreader het faciliteert. Zolang dat maar “accessibility supported” gebeurt… dus met iets waar de meeste echte gebruikers daadwerkelijk mee werken. Denk aan een browser die zelf _focus outlines_ forceert… als een browser dit kan, en de browser veel gebruikt wordt, dan kan content die zelf niet zo'n _outline_ heeft toch als toegankelijk worden beschouwd (dit is een voorbeeld, er kunnen geen rechten worden ontleend etc). 

### Reorganisatie

Om WCAG makkelijker uitbreidbaar te maken, en een aantal andere problemen te adresseren, gaat de structuur op de schop. 

In WCAG 3 zijn er geen succescriteria meer, en is de structuur minder rigide. In plaats daarvan krijg je direct onder de richtlijnen zogenaamde _requirements_ (_core_ en _supplemental_) en daarnaast _assertions_ en _good practices_. 

De requirements zijn uitkomsten die testbaar zijn, een beetje als succescriteria nu. Assertions zijn een nieuw soort test: het zijn als het ware vooromschreven beweringen die je als organisatie kunt doen. Denk aan: “wij testen dagelijks met gebruikers” of “wij werken met SCRUM”. Als veel organisaties dit soort beweringen doen, worden ze makkelijker te vergelijken. Het zou ook kunnen dat overheden, grote bedrijven, of inkoopafdelingen gaan eisen dat bepaalde assertions worden gedaan door organisaties of teams. 

### Conformance

Een laatste aspect dat echt wat anders wordt in WCAG 3 is hoe _conformance_ werkt: dat is het mechanisme waarmee je vaststelt of iets voldoet aan een norm, in dit geval WCAG. Conformance omvat bijvoorbeeld aan welke eisen je minimaal moet voldoen om te kunnen zeggen dat je aan WCAG voldoet. In de laatste Working Draft is er een [nieuw conformance model](https://www.w3.org/TR/wcag3/#conformance) toegevoegd, waarop we op dit moment feedback vragen.

## Feedback is welkom

In deze post heb ik geprobeerd een beeld te geven van wat we in WCAG 3 proberen te verbeteren. Veel daarvan staat nog niet vast, en zal de komende jaren vorm krijgen.

Mocht je hier ideeën bij hebben of je feedback willen geven, weet me te vinden op de Code for NL Slack of via social media.
