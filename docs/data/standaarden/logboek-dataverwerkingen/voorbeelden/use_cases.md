## Use Cases

Dit hoofdstuk bevat voorbeelden van use cases, gebaseerd op praktijkscenario's uit workshops. Ze illustreren hoe de standaard Logboek Dataverwerkingen kan worden toegepast in samenwerkingen tussen organisaties. De voorbeelden zijn niet-normatief en dienen ter verduidelijking voor organisaties met vergelijkbare processen.

## Use Case 01: Moet de retentieperiode (bewaartermijn) van de logging in de logregel staan?

In **AVG artikel 30-1f** wordt de volgende maatregel benoemd:
*Elke verantwoordelijke en, in voorkomend geval, de vertegenwoordiger van de verantwoordelijke houdt een register van de verwerkingsactiviteiten die onder hun verantwoordelijkheid plaatsvinden. Dat register bevat alle volgende gegevens: indien mogelijk, de beoogde termijnen waarbinnen de verschillende categorieën van gegevens moeten worden gewist.*

De concrete datum waarop een dataverwerking moet worden gewist uit het logboek, kan bepaald worden door middel van het bewaartermijn in het register en de eindtijd waarop een dataverwerking is gelogd in het logboek. Daardoor is het onnodig om de concrete verwijderdatum van een dataverwerking te registreren in het logboek.

Wanneer een logregel verwijderd moet worden, is afhankelijk van de situatie van een organisatie en het beleid van bewaarperiodes:

* **Gelijke bewaartermijn:** Als het beleid is dat alle logregels dezelfde bewaartijd hebben, kan er bijvoorbeeld elke dag een batch draaien die kijkt naar de eindtijd van een logregel en berekent of deze verwijderd kan worden.
* **Verschillende bewaartermijnen:** Als er per activiteit een andere bewaartermijn geldt, moet dat duidelijk worden aangegeven in het *Register van Verwerkingsactiviteiten* per activiteit in het veld `envisagedTimeLimit`.

**Voorbeelden van waarden van het veld `envisagedTimeLimit`**:

* **Datum (Date) of Datum/Tijd (DateTime):** `2025-02-23T00:00:00`
* **Geheel getal (Integer):** `15` (dagen/maanden/jaren)
* **Tekst (String):** `"20 jaar na onherroepelijk worden besluit"`

Het belangrijkste is dat de organisatie duidelijk kan aantonen (*verantwoordingsplicht*) waarom een bepaalde bewaartermijn is gekozen en dat deze termijn in lijn is met de AVG. Dit betekent dat de keuze van het datatype minder cruciaal is dan de heldere vastlegging en naleving van de bewaartermijn zelf.

Concreet zou de logverwijderingssituatie er als volgt uit kunnen zien:
![logverwijderingssituatie Use Case 01](./media/UseCase01_afbeelding1.png)

**Scenario 1:**
Als het is toegestaan om een vaste retentieperiode voor alle logregels te hanteren, dan zou deze kunnen worden vastgelegd in de `envisedTimeLimit` in een profiel. Dagelijks wordt een batch gedraaid om te bepalen of een logregel mag worden verwijderd. Als `Huidige datum – envisedTimeLimit < end_time` dan mag de logregel worden verwijderd.

**Voorbeeld:**

* Huidige datum: 1-8-2025
* envisedTimeLimit: 6 maanden
* end_time: 1-1-2025

`1-8-2025 – 6 maanden = 1-2-2025`, de logregel mag dus verwijderd worden.

**Scenario 2:**
Als het **niet** is toegestaan om een vaste retentieperiode voor alle logregels te hanteren, dan moet deze worden vastgelegd in de `envisedTimeLimit` in het *Register van Verwerkingsactiviteiten* per activiteit.
De batch moet nu op basis van `dpl.core.processing_activity_id` de `envisedTimeLimit` opzoeken in het *Register van Verwerkingsactiviteiten* en bepalen of de logregel verwijderd mag worden.

<div class="note">

Let op:

* De standaard Logboek Dataverwerkingen schrijft **niet** voor hoe het mechanisme van het verwijderen van logregels zou moeten werken. Het ontwerp en de architectuur moeten door de organisatie zelf bepaald worden.  
* De standaard Logboek Dataverwerkingen schrijft **niet** voor wat de retentietijd is voor activiteiten. Het is de taak van de organisatie om te bepalen (op basis van de wettelijke basis) wat de bewaartijd is van een logregel.  
* Het veld `envisedTimeLimit` in het Register van Verwerkingsactiviteiten moet **altijd** worden ingevuld, ook al is de bewaartijd voor alle activiteiten hetzelfde.

</div>

## Use Case 02: Wordt er een vlag gelogd in de logregel, zodat ik weet dat de gegevens in deze logregel niet getoond mogen worden in het geval van inzageverzoek?

Nee, in het Logboek Verwerkingsgegevens worden geen vlaggen gelogd waardoor kan worden gezien dat de gegevens niet getoond mogen worden aan een burger. Het is aan de organisatie om procedures op te stellen om te regelen dat in specifieke gevallen data niet getoond mag worden aan een burger.

## Use Case 03: Berichten versturen naar de burger vanuit een overheidsinstantie via een intermediaire organisatie

### Procesbeschrijving Use Case 03

1. Een overheidsinstantie stuurt mededelende berichten in batchvorm naar een centrale verwerkingsdienst.
2. De centrale verwerkingsdienst (intermediair) verwerkt de batch en maakt hier individuele bestanden van. Deze individuele bestanden worden verstuurd naar Logius.
3. Logius verstuurt het individueel bestand naar de juiste inbox van de burger in MijnOverheid.

![intermediairsituatie_UseCase03](./media/UseCase03_afbeelding1.png)

### Logging

1. Voor zowel de verwerking van de batch als het verzenden van de (individuele) berichten wordt een logregel aangemaakt (in beide gevallen komt een BSN ‘tevoorschijn’).
2. De `trace_id` wordt aangeleverd door de overheidsinstantie, er wordt door de centrale verwerkingsdienst (intermediair) geen aparte `trace_id` aangemaakt noch wordt er een `foreign_trace_id` gelogd.
3. De centrale verwerkingsdienst (intermediair) heeft een eigen Register van Verwerkingsactiviteiten (via `dpl.core.processing_activity_id`).
4. De allereerste logregel geldt als ‘kapstok’, alle logregels daarna refereren naar de `span_id` van deze allereerste logregel via `parent_span_id`.
5. Elk individueel BSN krijgt een eigen logregel.

| Veld                     | Logregel 1                                      | Logregel 2                                      |
|--------------------------|------------------------------------------------|------------------------------------------------|
| trace_id                | bc9126aaae813fd491ee10bf870db292               | bc9126aaae813fd491ee10bf870db292               |
| span_id                 | b2e339a595246e01                                | 414514cf1d40d6b2                                |
| parent_span_id          | NA                                             | b2e339a595246e01                                |
| name                    | VerwerkBatch                                   | VerzendBericht                                 |
| start_time              | 2024-07-29 10:16:49.690                        | 2024-07-29 10:16:49.690                        |
| end_time                | 2024-07-29 10:16:49.723                        | 2024-07-29 10:16:49.723                        |
| status_code             | OK                                             | OK                                             |
| resource.name           | BatchVerwerking                                | ZendDienst                                     |
| resource.version        | 1.0                                            | 2.1                                            |
| attributeKey1           | dpl.core.processing_activity_id                | dpl.core.processing_activity_id                |
| attributeValue1         | 11x2ec2a-0774-3541-9b16                         | 12f2ec2a-0cc4-3541-9ae6                         |
| attributeKey2           | dpl.core.data_subject_id                       | dpl.core.data_subject_id                       |
| attributeValue2         | 13j2ec27-0cc4-3541-9av6                         | 19u2dd2a-0cb7-3541-9ae6-217                     |
| attributeKey3           | dpl.core.data_subject_id_type                  | dpl.core.data_subject_id_type                  |
| attributeValue3         | BSN                                    | BSN                                  |
| attributeKey4           | dpl.core.foreign_operation.span_id             | dpl.core.foreign_operation.span_id             |
| attributeValue4         | 8ccfd3c567c51d68937c263e00a352be               | 8ccfd3c567c51d68937c263e00a352be               |

<div class="note">

Als het bericht 1 op 1 zou worden doorgestuurd, zou één logregel kunnen volstaan (geen persoonsgegevens zichtbaar).

</div>

## Use Case 04: Service Bericht Mededeling vanuit een overheidsinstantie naar een dienstverlener via een intermediair

### Procesbeschrijving Use Case 04

1. Een overheidsinstantie stuurt mededelende berichten in batchvorm naar een centrale verwerkingsdienst (intermediair).
2. De centrale verwerkingsdienst verwerkt batch en maakt hier individuele files van. De individuele files worden verstuurd naar een portaaldienst (bijv. Digipoort).
3. De portaaldienst verstuurt de individuele file naar de juiste dienstverlener.

![intermediairsituatie_UseCase04](./media/UseCase04_afbeelding1.png)

<div class="note">

Als er geen HTTP protocol wordt gebruikt, moet er  op een bepaalde manier toch headerinformatie worden verzonden.

</div>

## Use Case 05: Persoonsgebeurtenisberichten via een intermediair

### Procesbeschrijving Use Case 05

1. Een werkgeversdienst zendt individuele berichten naar een overheidsinstantie met betrekking tot personen met een werkverleden.
2. De overheidsinstantie bundelt persoonsgebeurtenisberichten in een batch en zendt deze naar een centrale verwerkingsdienst (intermediair).
3. De centrale verwerkingsdienst verwerkt de batch en maakt hier individuele files van en zendt deze naar het juiste EU-land.

![intermediairsituatie_UseCase05](./media/UseCase05_afbeelding1.png)

Het proces kan ook andersom:

1. EU-land komt een persoonsgebeurtenisbericht (bijvoorbeeld van een persoon in het buitenland) en zendt deze naar de centrale verwerkingsdienst.
2. De centrale verwerkingsdienst bundelt persoonsgebeurtenisberichten van diverse EU-landen en stuurt deze als batch naar de overheidsinstantie.
3. De overheidsinstantie stuurt de batch door naar de werkgeversdienst.

<div class="note">

* De organisatie die als centrale verwerkingsdienst acteert zou een `trace_id` aan moeten maken op het moment dat er een bericht vanuit een EU-land komt.
* De overheidsinstantie in deze afbeelding is verantwoordelijke ook al komt het initiële bericht vanuit de werkgeversdienst.
* Niet elke organisatie geeft een acknowledgement terug.

</div>

## Use Case 06: Register van Niet-Ingezetenen (RNI)

### Procesbeschrijving Use Case 06

1. Een overheidsinstantie/werkgeversdienst/uitkeringsinstantie/zorginstantie stuurt aanpassing ten aanzien van RNI naar een centrale verwerkingsdienst.
2. De centrale verwerkingsdienst stuurt aanpassing naar de RVIG (Rijksdienst voor identiteitsgegevens). In dit voorbeeld maakt de centrale verwerkingsdienst alleen individuele berichten indien aanpassingen in batchvorm zijn aangeleverd.
3. De RVIG voert de aanpassing uit in de RNI.

![intermediairsituatie_UseCase06](./media/UseCase06_afbeelding1.png)

## Use Case 07: Statistische Informatie via een intermediair

### Procesbeschrijving Use Case 07

1. Een werkgeversdienst verstuurt statistische informatie over burgers bedoeld voor zowel een overheidsinstantie als het CBS (twee aparte berichten) in batch via een centrale verwerkingsdienst (intermediair).
2. De centrale verwerkingsdienst verwerkt de batch en stuurt individuele berichten naar zowel de overheidsinstantie als het CBS.
3. Het CBS anonimiseert de aangeleverde data.

![intermediairsituatie_UseCase07](./media/UseCase07_afbeelding1.png)

<div class="note">

Het CBS moet de verwerking loggen van verwerkingen persoonsgegevens om persoonsgegevens te anonimiseren.

</div>
