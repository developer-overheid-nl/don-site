---
authors: [tom-ootes]
tags: [haven, kubernetes, common-ground, digitale-autonomie]
---
import { Blockquote } from "@rijkshuisstijl-community/components-react";

# Haven Plus: het team dat bouwt aan cloud-soevereiniteit

Werk jij in de publieke sector en ben je benieuwd hoe je concreet kan toewerken naar digitale soevereiniteit? In dit interview met **Pauline van Rotterdam** en **Sander van Thillo** van team [Haven](/kennisbank/infra/standaarden/haven) kom je er achter hoe je Haven+ gebruikt om minder afhankelijk te worden van Big Tech bedrijven als Microsoft (Azure) en Amazon (AWS) als het gaat om cloud-infra.

<!-- truncate -->

:::success[**TL;DR**]

- Met de Haven-standaard heeft de Nederlandse overheid een praktisch instrument als stap naar Digitale Autonomie.
- Door Kubernetes-clusters volgens de Haven-checks in te richten, wordt migratie naar Europese cloudproviders uiteindelijk eenvoudiger.
- Specifieke AWS/Azure services zoals `Object Storage` en `Databases` kunnen op termijn vervangen worden door open-source [Haven+](https://gitlab.com/commonground/haven/havenplus) alternatieven.
- Hoewel de transitie een cloud-native infrastructuur vereist, biedt Haven een duidelijk pad richting digitale zelfstandigheid.

:::

## Introductie

### **Pauline van Rotterdam**
 heeft sinds 2008 een carrière in de IT-Operations. Ze begon bij een hosting provider waar ze verschillende rollen vervulde en uiteindelijk solution-architect en projectmanager werd. Sinds 2016 raakte ze begeistert door Kubernetes en leidde ze de productontwikkeling van Managed Kubernetes bij de eerder genoemde hosting provider.

#### Technisch Product Owner
Nu werkt ze als technisch product owner bij de gemeente Utrecht, waar ze zich ontfermt over de infrastructuur voor Common Ground - specifiek de Haven-clusters. In haar rol combineert ze twee werelden: aan de ene kant het technische aspect waarin ze nadenkt over de randvoorwaarden die infrastructuur moet hebben, aan de andere kant is ze bezig met productmanagement. Dus met prioriteren en het scherp houden van de langetermijnvisie.

### Sander van Thillo
heeft een gemengde achtergrond die begon met een studie scheikunde, waar hij ook leerde programmeren. Na de beslissing om niet verder te gaan in de scheikunde, rolde hij de IT in. Deed daar verschillende dingen: van websites ontwikkelen tot applicatie developer. Hij maakte carrière bij KPN-Telfort als software architect en werd uiteindelijk zelfs enterprise architect.

#### Van developen naar DevOps en infra
De startup-wereld trok hem aan, waar hij als software developer begon. Na een periode als freelancer, waarin hij vooral in de commerciële wereld werkte - waaronder een grote cloud migratie bij Mollie - kwam hij via een goede vriend terecht bij team Haven.

#### DevOps engineer bij Haven
Nu heeft Sander een veelzijdige rol: hij werkt als DevOps-engineer aan de Common Ground clusters waar meerdere projecten op draaien, en is daarnaast platform-engineer van Digilab (de proeftuin van BZK). Namens beide teams werkt hij aan het Haven+ project.

---

## Van Utrecht naar landelijke standaard

Het verhaal van Haven Plus begint bij de gemeente Utrecht, die op het gebied van infrastructuur een voorsprong had opgebouwd ten opzichte van andere gemeenten. "Al die gemeenten kwamen bij ons aankloppen. Hoi gemeente Utrecht, hoe hebben jullie dat gedaan? Hoe doe je dat? Wat voor keuzes maak je erin? Waarom?" vertelt Pauline. 

Deze stroom van vragen, gecombineerd met de observatie dat andere gemeenten moeite hadden om goed uit de startblokken te komen, leidde tot het voorstel om bij Digilab een project te starten om de Utrecht-aanpak tot een landelijke standaard op te werken. Dit is het project dat uiteindelijk [Haven+](/kennisbank/infra/standaarden/haven/haven-plus) is geworden.

## Wat is Haven+?

Haven+ is de tussenlaag die het gat opvult tussen de basis-infrastructuur en de applicatie zelf.

Sander legt het helder uit: "Als jij een applicatie in de cloud wil hebben, dan is de onderste laag een Kubernetes cluster. Maar daartussen heb je nog heel veel services nodig wil je die applicatie kunnen neerzetten."

De Haven-standaard zorgt voor een compliant Kubernetes cluster, maar Haven Plus voegt daar essentiële services aan toe:

- **Observability stack**: logging, monitoring en metrics
- **Security**: certificaatmanagement, secret management, identity management
- **Networking**: DNS-beheer, ingress en traffic management
- **Data management**: database services en backup-oplossingen
- **Development tools**: release management en deployment automation

"Het is dus heel breed. Al deze services hebben hun eigen taak in een cluster, maar met Haven+ bepaal je dus ook hóé je deze zaken inregelt," benadrukt Pauline.

## Praktische voordelen

De voordelen van Haven+ manifesteren zich op verschillende niveaus:

**Voor gemeenten**: Delta 10, een bekende Common Ground leverancier, kan met de Haven-tooling binnen een paar dagen clusters optuigen. Dit hebben ze bijvoorbeeld gedaan bij een gemeente zoals Den Bosch. "En zelfs binnen één dag is het gewoon prima mogelijk neer te zetten," aldus Pauline.

**Voor leveranciers**: De standaard elimineert veel uitzoekwerk. "Er zit heel veel uitzoekwerk in. Platform specifieke dingen zitten er al in. Zo hoef je dat niet zelf een keertje uit te vinden," legt Sander uit.

**Voor applicatieteams**: Ontwikkelaars hoeven alleen maar na te denken over hun applicatie, niet over de onderliggende infrastructuur. "Want alle andere randvoorwaarden, die hoeven ze dan niet opnieuw zelf uit te vinden," benadrukt Sander.

## Nederlandse cloud-onafhankelijkheid

Een cruciaal aspect van Haven+ is het bieden van een exit-strategie van Amerikaanse hyperscalers. "Het is een volledige exit strategie," stelt Pauline. Door de extra abstractielaag verdwijnt de discussie over specifieke cloud-provider functionaliteiten. "We zitten in een agnostisch ecosysteem en eigen losse ecosysteem die je overal eigenlijk op kan plotten."

Er zijn al Nederlandse alternatieven beschikbaar. Previder is bijvoorbeeld Haven-compliant en staat in het lijstje met de grote hyperscalers als alternatief voor een compliant cluster in Nederland volgens Europese regelgeving. "Er staat niks in de weg om het niet te doen," concludeert Sander.

<Blockquote
  attribution=" — Pauline, Technisch Product Owner gemeente Utrecht"
  variation="pink-background">
"Het is een volledige exit strategie. Door die extra abstractielaag is de discussie weg van ja maar die cloud provider of hyperscaler biedt nog die functionaliteit. Dat hebben we allemaal niet nodig."
</Blockquote>

## Common Ground applicaties in productie

Haven Plus is geen theoretisch project - er draaien al diverse Common Ground applicaties op Haven-clusters:

- **OpenZaak**: De complete ZGW-stack (Zakengericht Werken)
- **Signalen**: Het bekende open source project voor meldingen
- **Open Formulieren**: Voor digitale formulieren
- **Atlas**: Geografische applicaties
- **G-Zac**: Zaakafhandel componenten

Bij gemeente Utrecht staat sinds Pauline's aankomst alles wat wordt onboard op een Haven-cluster. "Alles wat wij ontborden staat op een havencluster," bevestigt ze.

## Security en monitoring

Haven Plus neemt security serieus met een gelaagde aanpak:

**Container security**: Tools zoals Trivy voor container image scanning en runtime monitoring
**Intrusion detection**: Falco voor het detecteren van anomalieën in gebruik en verkeer
**Policy enforcement**: Automatische controles die voorkomen dat non-compliant containers überhaupt landen op het cluster

"Je gaat veel vaker inspecteren als je goed doet ga je op in de hele life cycle van een applicatie continu testen en monitoren," legt Pauline uit. Dit gebeurt tijdens ontwikkeling, release én tijdens de runtime van applicaties.

## Uitdagingen en toekomst

Het grootste knelpunt voor Haven Plus is momenteel tijd. "Het grootste probleem zit nu gewoon in tijd. Omdat we het er allemaal wel bij doen," erkent Pauline. Zowel zij als Sander hebben primair andere rollen en werken aan Haven Plus op best-effort basis.

Er zijn wel ontwikkelingen gaande binnen GDI (Generieke Digitale Infrastructuur) om het project mogelijk te adopteren, wat zou zorgen voor meer structurele financiering en resources.

Voor hosting providers zou het aanbieden van Haven-compliance geen grote stap zijn. "Voor de meeste providers zou het niet een hele grote stap zijn om daar ook te komen," stelt Pauline. Het team praat ook actief met de Dutch Cloud Community om deze stap te zetten.

## Conclusie

Haven Plus toont aan dat Nederlandse overheidsinstellingen niet afhankelijk hoeven te blijven van Amerikaanse hyperscalers. Door open source technologie, best practices uit de CNCF-community en Nederlandse innovatie te combineren, ontstaat een platform dat zowel vendor lock-in voorkomt als de snelheid van cloud-native development mogelijk maakt.

Het project illustreert hoe Common Ground principes in de praktijk kunnen werken: niet alleen voor applicaties, maar ook voor de onderliggende infrastructuur. Met bewezen implementaties bij gemeente Utrecht en groeiende adoptie door andere gemeenten, bewijst Haven Plus dat digitale soevereiniteit niet ten koste hoeft te gaan van technische excellentie.

"We pakken de best practices die er zijn, die we kennen vanuit de CNCF, plus de ervaring die we hebben van wat ook echt goed werkt," vat Sander de filosofie samen. Het resultaat is een platform dat Nederlandse gemeenten helpt om zelf de regie te houden over hun digitale infrastructuur.