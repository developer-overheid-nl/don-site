---
authors: [kennisplatform-apis]
tags: [api, api-design, adr, gouden-api, kennisplatform-apis, geodata, ogc]
description: |
  De BAG-API van het Kadaster begon als bijproduct van een dataplatform en
  groeide uit tot een van de meest gebruikte API's van de overheid.
  Productmanager Janette Storm vertelt hoe de focus verschoof van technische
  ontsluiting naar productgericht ontwikkelen, en wat andere
  overheidsorganisaties daarvan kunnen leren.
---

# De BAG-API: van technische ontsluiting naar productgericht ontwikkelen

Van een aanvraag voor een bouwvergunning tot de kaarten in je navigatiesysteem.
De Basisregistratie Adressen en Gebouwen (BAG) is een enorme publieke
gegevensbron die dagelijks meer dan tien miljoen keer wordt geraadpleegd. Dit
gebeurt onder andere via de BAG-API van het Kadaster, inmiddels een van de meest
gebruikte API's in het overheidsdomein.

<!-- truncate -->

De beschikbaarheid van publieke adres- en gebouwgegevens heeft door de jaren
heen een flinke evolutie doorlopen. Vóór de BAG had elke gemeente meerdere
adresregistraties en dat maakte gegevensuitwisseling lastig. Met de BAG kwam
daar verandering in: één centrale registratie, beheerd door het Kadaster en
onderhouden door gemeenten. Dit maakte de uitwisseling van deze gegevens al een
stuk eenvoudiger. Ook verschillende externe partijen gingen de BAG gebruiken,
zoals TomTom en Esri, een bekende softwareleverancier voor GIS (Geografische
Informatiesysteem). Met de komst van API's kwam het gebruik van de BAG in een
stroomversnelling.

## Verschillende wegen naar dezelfde data

Janette Storm, productmanager BAG bij het Kadaster, is al sinds de invoering van
de wet BAG in 2009 betrokken bij deze basisregistratie. De BAG werd in die tijd
vooral gebruikt via bestanden en via een voorloper van de huidige webapplicatie
BAG-Viewer. "Als je destijds een losse vraag wilde stellen, dan deed je dat in
de BAG-Viewer. Als je veel administratieve data wilde hebben, dan haalde je
gewoon het hele bestand op. Er zijn nog steeds gebruikers die dat elke maand
doen", vertelt Storm. Er was ook een zogeheten SOAP-webservice beschikbaar
waarmee je gegevens in XML-formaat kon opvragen, maar deze was volgens Storm
best bewerkelijk om te implementeren. Dit bleek beter te kunnen met API's.

## Een gouden toevalstreffer

Rond 2017 werkte het Kadaster aan een dataplatform op basis van linked data. De
BAG-API ontstond volgens Storm eigenlijk als bijproduct van dit project. Ze
vertelt hierover: "De techneuten gaven aan dat we de gegevens ook vrij makkelijk
via een API konden publiceren. Daar was interesse in, maar dan wilden we het ook
meteen goed doen: volgens de geldende API-standaarden, een goede manier van
publiceren en makkelijk toegankelijke specificaties."

Die aanpak bleek ontzettend succesvol. Binnen een paar maanden nadat de BAG-API
live ging, kreeg deze al net zoveel aanroepen als de SOAP-webservice, die op dat
moment al meer dan acht jaar in gebruik was. Geïnteresseerde eindgebruikers
wisten de API zelf te vinden en vroegen om aansluiting. Als bijzondere opsteker
won het Kadaster er in 2019 de Gouden API mee, de prijs voor de beste
overheids-API.

## Van bijproduct naar eindproduct

Vlak na de introductie van de API volgde een grote herziening van de BAG. Storm:
"Dat was ook het moment om te kijken welke dataproducten we moesten laten
bestaan, welke een upgrade moesten krijgen en wat we hetzelfde moesten houden.
De eerste reactie vanuit de gebruikers was dat ze alles wilden behouden én dat
er behoefte was aan een API." Het eerste wat opviel was dat veel gebruikers nog
niet wisten dat er al een API was. Voor Storm was dit het signaal om de BAG-API
van bijproduct naar een eindproduct te brengen en de oude SOAP-webservice niet
verder te ontwikkelen.

## Kijken met de bril van de eindgebruiker

Bij versie 2 van de BAG-API verschoof de focus van pure technische ontsluiting
naar een betere bruikbaarheid voor de eindgebruiker. Met haar achtergrond als
industrieel ontwerper weet Storm als geen ander dat bruikbaarheid de sleutel is
tot succes. "Een belangrijke stap was om te kijken welke informatie de
eindgebruiker daadwerkelijk nodig heeft. Wat we dus bijvoorbeeld bij versie 2
van de API hebben gedaan, is dat je niet alleen een adres kan opvragen, maar ook
de eigenschappen die bij dat adres horen. Dit was bij de eerste versie van de
API een hoop gepuzzel", vertelt Storm.

## Geen gepuzzel meer

Toen versie 2 van de BAG-API, de BAG API Individuele Bevragingen (IB), uitkwam,
nam het gebruik opnieuw een enorme vlucht. Ondanks dit nieuwe succes maakte niet
iedere gebruiker het meest efficiënte gebruik van de BAG-API. Storm noemt als
voorbeeld een ontwikkelaar die duizenden losse bevragingen deed voor
adresgegevens per pand, omdat hij niet wist dat er een efficiëntere,
samengestelde route bestond. Zulke pieken in het dataverkeer zijn voor het
Kadaster reden om contact op te nemen met gebruikers, en dat leverde een
interessant patroon op: veel van dit soort problemen bleken terug te voeren op
hoe de documentatie was opgebouwd. Veel gebruikers volgden die top-down, terwijl
de meest bruikbare functionaliteit onderaan stond. Storm: "Toen hebben we de
documentatie daarop aangepast. Nu staat de functionaliteit die het handigst is
om te gebruiken bovenaan. Deze functies werden toen al het meest gebruikt, en nu
nog steeds. 90% van de aanvragen is namelijk samengestelde informatie."

## De volgende stap

Het Kadaster staat op dit moment voor een verplichte technische wijziging in de
backend. Voor Storm reden om gelijk verder te kijken, want de tweede versie van
de API is inmiddels ook al meer dan vijf jaar oud. Voor versie 3 van de API gaat
het deze keer niet zozeer om ingrijpende wijzigingen. "We hebben heel lang
gezegd: we moeten het zo ontwerpen dat het product aansluit bij de vraag. Nu zeg
ik eigenlijk: dat lukt best wel goed, maar we willen de kans dat je de data echt
goed kan gebruiken nog groter maken", vertelt Storm. "Functioneel zal het
bijvoorbeeld makkelijker worden om ook de historie, historische informatie, op
te vragen. En dat alles zoveel mogelijk via hetzelfde endpoint gaat, zodat je
niet op iets anders hoeft aan te sluiten om aan deze gegevens te komen."

## Ook geografische data delen via API's

Naast de BAG-API IB werkt het Kadaster ook aan andere manieren om de BAG-data
via API's te ontsluiten. Dit jaar is bijvoorbeeld de BAG OGC Features API
gelanceerd. Deze API is gericht op bevragingen van de BAG door GIS-specialisten;
de geografische informatie staat centraal in plaats van de administratieve
gegevens van het object.

## Samenwerken aan betere overheids-API's

De ontwikkeling van de BAG-API staat niet op zichzelf. Samen met andere partijen
werkt het Kadaster in het
[Kennisplatform API's](/kennisbank/api-ontwikkeling/communities/kennisplatform-apis)
aan gezamenlijke standaarden voor overheids-API's, waaronder de
[API Design Rules](/kennisbank/api-ontwikkeling/standaarden/api-design-rules).
"We willen dat onze API-ontwikkeling afgestemd is met het kennisplatform, zodat
we allemaal dezelfde richting opgaan", vertelt Storm. Om deze aanpak te
stimuleren, reikt het kennisplatform elk jaar de Gouden API uit: de prijs voor
de beste overheids-API van dat jaar. Dit jaar ligt de focus op de implementatie
van diverse API's. Storm: "Als je kijkt naar de BAG-Viewer, dan is dat een goed
voorbeeld. Het is de implementatie van de BAG-API IB, de BAG OGC API's en
bijvoorbeeld ook de Terugmeldings-API." Het Kadaster laat hiermee zien dat het
niet alleen goede API's bouwt, maar ze ook zelf weet te combineren tot
waardevolle applicaties.

## Productgericht blijven ontwikkelen

In veel opzichten is de BAG-API een rolmodel geweest voor andere overheids-API's
en valt er veel te leren uit de aanpak van het Kadaster. Storm: "De focus van
technische ontsluiting naar productgericht ontwikkelen, is denk ik een stap die
op veel plekken in de overheid nog wel gemaakt moet worden. En door zichtbaar te
maken van wat goed werkt, kun je ook anderen inspireren en stimuleren."
