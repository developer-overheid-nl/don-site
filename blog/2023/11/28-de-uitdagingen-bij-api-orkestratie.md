---
authors: [joost-farla]
tags: [adr, orkestratie]
---

# De uitdagingen bij API orkestratie

Iedere gebruikerstoepassing heeft een specifieke informatiebehoefte, die in veel
gevallen meerdere databronnen overstijgt. Toepassingen moeten in dat geval in
staat zijn om op een betrouwbare manier gegevens van meerdere bronnen te
raadplegen en waar nodig met elkaar te combineren tot het gewenste
informatieproduct in de ‘taal’ van de gebruiker.

<!-- truncate -->

Technisch gezien betekent dit dat een inkomende gebruikersvraag vertaald zal
moeten worden naar alle benodigde API calls naar individuele bron API's. Deze
API calls dienen in de juiste volgorde (of gelijktijdig waar mogelijk) te worden
uitgevoerd en de resultaten zullen, zodra deze beschikbaar zijn, op de juiste
manier in elkaar geschoven moeten worden zodat het gewenste antwoord aan de
gebruiker kan worden geleverd. Dit proces noemen we API orkestratie.

Het toepassen van API orkestratie binnen een
[federatief datastelsel](https://realisatieibds.pleio.nl/cms/view/8852ee2a-a28a-4b91-9f3e-aab229bbe07f/federatief-datastelsel)
brengt veel uitdagingen met zich mee. In dit artikel worden een aantal vaak
voorkomende uitdagingen uitgelegd.

## Performance

Wanneer gegevens met elkaar worden gecombineerd, kan het aantal verzoeken
(requests) naar de verschillende bronnen snel oplopen. Stel je voor dat de ene
bron een lijst met personen oplevert, en dat je van ieder indidueel persoon de
bijbehorende adresgegevens uit een andere bron erbij wil voegen. Je hebt dan te
maken met het zogeheten "N+1 probleem". Dit is slechts 1 van de vele scenario's
waarbij het aantal verzoeken dusdanig hoog kan worden, dat het praktisch
onmogelijk is om een acceptabele performance te kunnen leveren.

Het is daarom van groot belang dat we standaarden in het leven gaan roepen, die
ervoor gaan zorgen dat het aantal verzoeken zo ver mogelijk kan worden
gereduceerd. Je kunt daarbij bijvoorbeeld denken aan het ondersteunen van
speciale toegangspatronen, zoals _batch bevragingen_ en _eager loading_. Ook zou
caching hier een belangrijke rol kunnen vervullen. De
[werkgroep orkestratie van het Kennisplatform API's](https://github.com/Geonovum/KP-APIs/blob/master/overleggen/Werkgroep%20API%20design%20rules/orkestratie.md)
werkt momenteel aan de totstandkoming van deze nieuwe standaarden.

## Interoperabiliteit

API orkestratie wordt vaak geimplementeerd door een generiek component, zoals
een orkestratie engine of een integratie platform. Wanneer iedere API zich nét
anders gedraagt, bijvoorbeeld bij het filteren/sorteren/pagineren, dan zou dit
veel complexiteit en zelfs maatwerk tot gevolg kunnen hebben. Om dit te
voorkomen hebben we breed gedragen standaarden nodig, zodat een dergelijke
oplossing bepaalde verwachtingen en aannames kan doen over de structuur van de
gegevens en het gedrag van de API. Dat vraagt echter meer dan de aspecten die
tot dusverre door de
[API design rules](https://gitdocumentatie.logius.nl/publicatie/api/adr/) worden
afgedekt. Ook hiervoor zal de eerder genoemde werkgroep de komende tijd proberen
stappen te zetten.

## Authenticatie en autorisatie

Tijdens het orkestratie-proces worden er diverse verzoeken uitgevoerd vanaf het
orkestratie component richting de diverse bron API's. Een dergelijk verzoek
wordt altijd uitgevoerd vanuit een bepaalde identiteit (bijv. een persoon of
organisatie) en een bepaalde scope en privileges. Dit is wezenlijk anders dan
wanneer een gebruiker direct vanuit de eigen identiteit direct met een bron API
interacteert, omdat er een extra schakel in de keten is toegevoegd. Afhankelijk
van de situatie vraagt dit speciale maatregelen om de veiligheid te waarborgen.

## Beschikbaarheid

Bij API orkestratie heb je een harde afhankelijkheid op de bronnen waarvan
gebruik wordt gemaakt. Onbeschikbaarheid of traagheid van 1 bron kan grote
impact hebben op de beschikbaarheid van het gehele product. Het is daarom van
groot belang dat bronnen hoge beschikbaarheidsgaranties af kunnen geven, en de
benodigde maatregelen hebben getroffen om dit waar te kunnen maken. Ondanks deze
garanties kan het in de praktijk altijd voorkomen dat bronsystemen falen of
onbereikbaar zijn. Het orkestratie-proces dient hier altijd op berekend te zijn,
wat bijvoorbeeld zou kunnen betekenen dat functionaliteit tijdelijk beperkt
wordt, maar wel gewoon beschikbaar blijft.

## Herkomst

Wanneer gegevens met elkaar worden gecombineerd, is voor de gebruiker niet
altijd meer duidelijk te zien wat de authentieke bron is geweest van deze
gegevens. Welk deel van de ontvangen gegevens zijn geleverd door welke bron, en
welke nabewerkingen / algoritmes zijn er eventueel nog toegepast? Om
transparantie en integriteit te kunnen waarborgen, is het van belang dat de
herkomst van gegevens op een gestandaardiseerde manier wordt vastgelegd, en
beschikbaar wordt gesteld.

## Conclusie

In dit artikel zijn een aantal uitdagingen beschreven die spelen wanneer API
orkestratie wordt toegepast. De komende tijd zullen we binnen dit thema meer
artikelen publiceren en daarbij per onderwerp dieper ingaan op de details en
mogelijke oplossingen en best practices. Ook vinden er momenteel
[beproevingen plaats op het Digilab](https://digilab.overheid.nl/projecten/imx-modelgedreven-orkestratie/)
rondom het onderwerp orkestratie, in het kader van het toekomstig Federatief
Data Stelsel (FDS).
