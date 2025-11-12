---
authors: [jan-vlug]
tags:
  [
    git,
    foss,
    open-source,
    digitale-soevereiniteit,
    digitale-autonomie,
    github,
    gitlab,
    forgejo,
  ]
description: |
  De Nederlandse overheid publiceert een deel van haar broncode als vrije
  opensource software. Om software te beheren is een versiebeheersysteem nodig.
  Hiermee kun je veranderingen in de broncode traceren en beheren. Een
  versiebeheersysteem faciliteert ook het samenwerken tussen verschillende
  software-ontwikkelaars. Een gedistribueerd versiebeheersysteem maakt het
  mogelijk dat ontwikkelaars op verschillende locaties toch kunnen samenwerken
  aan één softwareproduct. Het _de facto_ versiebeheersysteem voor software is
  Git.
---

# Aanbeveling voor de Git-werkplaats van de overheid

De Nederlandse overheid
[publiceert een deel van haar broncode](https://oss.developer.overheid.nl/repositories)
als
[vrije opensource software](https://fsfe.org/freesoftware/freesoftware.nl.html).
Om software te beheren is een versiebeheersysteem nodig. Hiermee kun je
veranderingen in de broncode traceren en beheren. Een versiebeheersysteem
faciliteert ook het samenwerken tussen verschillende software-ontwikkelaars. Een
gedistribueerd versiebeheersysteem maakt het mogelijk dat ontwikkelaars op
verschillende locaties toch kunnen samenwerken aan één softwareproduct. Het _de
facto_ versiebeheersysteem voor software is [Git](https://git-scm.com/). Git is
vrije opensource software. Voor een interessante en leerzame introductie in Git
zie
[deze presentatie](https://github.com/user-attachments/files/23299017/presentatie-git.pdf).

Er zijn online platforms die werken met Git, en die daaromheen toegevoegde
functionaliteit bieden om software-development en project-management met Git te
ondersteunen. Ik gebruik hieronder de term
[Git-forge](<https://en.wikipedia.org/wiki/Forge_(software)>) (Git-werkplaats)
om zulke platforms aan te duiden. GitLab, Forgejo en GitHub zijn allemaal
Git-forges.

In deze blog ga ik in op een aantal aspecten van verschillende Git-forges, om zo
de beste keuze voor een Git-forge voor de overheid te kunnen maken.

<!-- truncate -->

:::info[Relevant vanwege code.overheid.nl]

Dit artikel is extra relevant omdat het Ministerie van Binnenlandse Zaken op dit
moment bezig is met het opzetten van een code.overheid.nl instance. Volg deze
blog of [Mastodon](https://social.overheid.nl/@developer) voor meer info
hierover.

:::

## De huidige situatie

Op dit moment wordt vrije opensource software van de overheid onder andere
gehost op GitHub en GitLab. Externe Git-forges die niet onder het beheer van de
overheid vallen. GitHub zelf is bovendien bedrijfseigen (_proprietary_), niet
vrije, niet-opensource software. GitLab _Free_ heeft een open source licentie,
maar de _Enterprise Edition_ heeft een
[source-available licentie](https://handbook.gitlab.com/handbook/marketing/brand-and-product-marketing/product-and-solution-marketing/tiers/#overview)
en is geen vrije software.

De vraag rijst wáár de Nederlandse overheid het best haar vrije opensource
software kan publiceren?

## Waarom GitHub afvalt

[GitHub](https://github.com/) valt af omdat
[GitHub, als niet vrije, niet-opensource software](https://sfconservancy.org/GiveUpGitHub/)
niet in overeenstemming is met
[de lijn](https://open.overheid.nl/documenten/ronl-d468e28d-dfbc-43fe-92cc-77b7f861096e/pdf)
dat bij gelijke geschiktheid open source de voorkeur geniet.

Bovendien is het hosten van broncode een kritiek onderdeel van de infrastructuur
voor de Nederlandse overheid. De overheid kan zich niet veroorloven dat er
gerommeld zou kunnen worden met code of binaries in repositories die mensen
direct kunnen uitvoeren. De overheid moet zeker weten dat deze binaries integer
tot stand zijn gekomen. Daarom is het belangrijk de volledige beschikking the
hebben over een Git-forge.

Daarnaast is er de dreiging dat het platform inzet wordt voor diplomatieke
doeleinden zoals het geval was bij de
[hoofdaanklager van het Internationaal Strafhof (ICC)](https://www.computable.nl/2025/05/16/microsoft-blokkeert-e-mail-hoofdaanklager-internationaal-strafhof/).

## De twee overgebleven kandidaten: GitLab en Forgejo

Twee andere Git-forges zijn [GitLab](https://gitlab.com/) en
[Forgejo](https://forgejo.org/) (spreek uit als
[/forˈd͡ʒe.jo/](https://forgejo.org/static/forgejo.mp4)).

## Het probleem met GitLab

GitLab heeft een [_open core_](https://en.wikipedia.org/wiki/Open-core_model) _/
non-free enterprise functionality model_. Er is een opensource editie en er is
een niet-vrije editie. Dat is een risico. Gebruikers van de niet-vrije GitLab
_Enterprise Edition_ functionaliteit hebben een
[vendor lock-in](https://nl.wikipedia.org/wiki/Vendor_lock-in) bij GitLab. Het
is niet mogelijk de code naar eigen voorkeur aan te passen en vrij te gebruiken.

## Het graduele pad naar vendor lock-in

Organisaties beginnen vaak met de gratis en vrije GitLab _Community Edition_
(die wél vrije opensource is). Maar naarmate een organisatie groeit en meer
geavanceerde functionaliteit nodig heeft, wordt ze vaak verleid of gedwongen
over te stappen naar GitLab _Enterprise Edition_ voor features zoals:

- Geavanceerde security scanning
- Compliance features
- Betere performance en schaalbaarheid
- Enterprise support

Eenmaal afhankelijk van die _Enterprise Edition_ features, zit zo'n organisatie
vast.

## Digitale soevereiniteit en vrije software (FOSS)

Echte
[digitale soevereiniteit](https://www.tweedekamer.nl/zoeken?qry=position+paper+digitale+soevereiniteit&form_build_id=form-qdVAkRjc9-ixopjCXk_eYwERCpEpkS2_Zz1uURDIDxk&form_id=tk_external_data_autonomy_search_form)
kun je alleen bereiken door het gebruik van
[vrije software](https://audio-video.gnu.org/video/TEDxGE2014_Stallman05_LQ.webm)
(_Free and Open Source Software - FOSS_).
[Vrije software](https://www.gnu.org/philosophy/free-sw.html) is breder dan
opensource software. FOSS geeft de gebruiker vier vrijheden:

1.  De vrijheid om de software te gebruiken;
2.  De vrijheid om de software te bestuderen;
3.  De vrijheid om de software te distribueren;
4.  De vrijheid om _veranderingen_ aan de software te distribueren.

Er zijn veel nuance-verschillen in verschillende free software licenties, maar
voorgaande is volgens mij de kern. FOSS is
[copyleft](https://nl.wikipedia.org/wiki/Copyleft). Als het gaat over
herbruikbaarheid van broncode, zoals voorgeschreven door
[de wet](https://wetten.overheid.nl/BWBR0036795/2024-06-19/#HoofdstukI_Artikel2a)
(zie ook de
[memorie van toelichting](https://zoek.officielebekendmakingen.nl/kst-36382-3.pdf))
dan denk ik dat een copyleft licentie de beste keuze is. De
[EUPL v1.2 is copyleft](https://interoperable-europe.ec.europa.eu/collection/eupl/news/understanding-eupl-v12).

Het essentiële verschil tussen GitLab _Enterprise Edition_ en Forgejo is dat
GitLab _Enterprise Edition_ geen free software is en Forgejo is wel free
software (FOSS). Forgejo heeft alleen een vrije variant van de software.
[Forgejo zal altijd FOSS zijn](https://forgejo.org/). Bovendien gebruikt Forgejo
exclusief Free Software voor hun eigen project development.

Bij Forgejo heeft de gebruiker (overheid) dus álle vrijheid. Bij GitLab
_Enterprise Edition_ wordt er door de toegepaste licentie vrijheid van de
gebruiker (overheid) ontnomen. GitLab _Enterprise Edition_ is geen FOSS. Dit is
een fundamenteel, filosofisch en politiek verschil. Je kunt alleen digitale
soevereiniteit hebben als er geen vrijheid van je wordt ontnomen.

## Het team van Fedora koos ook voor Forgejo

[Fedora](https://www.fedoraproject.org/), een Linux-distributie, stond ook voor
de keuze welke Git-forge te gebruiken. Fedora koos voor Forgejo. Eén van de
argumenten van
[Fedora om voor Forgejo te kiezen](https://communityblog.fedoraproject.org/fedora-chooses-forgejo/)
is:

_\"Some of us on the council liked the well documented, and somewhat familiar
option of GitLab, but when faced with the reality that sometime in the near
future, Fedora may find itself_ **needing to make changes** _to our git forge,
and one option might require money we don't have, or_ **not allow the changes**
_we might need to make, and we_ **did not want to limit the project** _in any
way.\"_ (markering in vet van mij). Met andere woorden: Fedora vindt digitale
soevereiniteit essentieel en wil zichzelf geen vrijheid ontnemen of limiteren.

Merk op dat bij Fedora ongeveer de beste experts op het gebied van vrije
opensource software (FOSS) werken.

## Licentievergelijking

GitLab maakt
[onderscheid tussen tiers, users en distributions](https://handbook.gitlab.com/handbook/marketing/brand-and-product-marketing/product-and-solution-marketing/tiers/#history-of-ce-and-ee-distributions).
GitLab hanteert
[verschillende licenties](https://docs.gitlab.com/development/licensing/).

GitLab _Community Edition (CE)_ heeft de
[MIT License](https://gitlab.com/gitlab-org/gitlab-foss/blob/master/LICENSE).
GitLab _CE_ is daarmee compatibel met FOSS, free software.

GitLab _Enterprise Edition (EE)_ heeft
"[The GitLab Enterprise Edition (EE) license](https://gitlab.com/gitlab-org/gitlab/-/blob/master/ee/LICENSE)"
waarin meer restricties zijn. GitLab _EE_ is daarmee niet FOSS, dus _non free
software_.

Forgejo heeft de [GPLv3 licentie](https://forgejo.org/2024-08-gpl/) (voorheen
MIT). GPLv3 is FOSS en [copyleft](https://en.wikipedia.org/wiki/Copyleft) net
als Git zelf.

[Git heeft de GPLv2 licentie](https://git-scm.com/about/free-and-open-source).

## Forgejo als beste keuze voor digitale soevereiniteit op lange termijn

Mijn conclusie: Als de overheid fundamenteel wil kiezen voor digitale
soevereiniteit dan is een Git-forge die zelf FOSS of copyleft is essentieel.
GitLab als bedrijf zet in op het _free core / exendend enterprise model_. Dit
model heeft in het verleden tot
[vendor lock-in](https://en.wikipedia.org/wiki/Vendor_lock-in) en andere
problemen geleid (denk aan
[Owncloud / Nextcloud](https://itsfoss.com/nextcloud-vs-owncloud/)). Forgejo,
als democratische non-profitorganisatie, zet expliciet vol in op vrije software
(FOSS/copyleft). Daarmee is vanuit het oogpunt van digitale soevereiniteit
Forgejo de beste keuze.

## Public money, public code

Forgejo biedt de mogelijkheid om álle broncode ervan te bestuderen, aan te
passen en te distribueren. Dat is precies in lijn met de doelen van de overheid.
Elke investering in Forgejo komt in het publiek domein en daarmee ten goede aan
belastingbetalende burgers en bedrijven.
[Public money, public code](https://publiccode.eu/en/). Door te investeren in
Forgejo investeert de overheid in het publieke domein.

## Schaalbaarheid

Wat betreft schaalbaarheid, de essentie van Git is dat het een gedistribueerd,
gedecentraliseerd systeem is. Daarmee is Git zelf (de core van Git-forges) als
het ware van nature schaalbaar. Dat geldt niet perse voor de aanvullende
functionaliteit van de Git-forges. Ik weet te weinig van Forgejo om sterke
uitspraken over de schaalbaarheid te kunnen doen. Ik vermoed dat Forgejo op dit
moment schaalbaar genoeg is voor de opensource projecten van de overheid.
Codeberg, een publieke instantie van Forgejo host op het moment van schrijven
[313.753 projecten en 202.366 gebruikers](https://codeberg.org/about).

## Hands-on ervaring opdoen met Forgejo

Als je hands-on ervaring wil opdoen met Forgejo, dan kun je bijvoorbeeld gebruik
maken van [Codeberg](https://codeberg.org/about), een non-profit,
community-gedreven platform dat draait op Forgejo. Ik heb tijdens een hackathon
Forgejo inclusief
[een Forgejo Actions runner](https://forgejo.org/docs/latest/admin/actions/)
lokaal geïnstalleerd en GitLab CI/CD-pipelines omgezet naar
[Forgejo Actions](https://forgejo.org/docs/next/user/actions/reference/).

## Self-hosting en federatie

[_Self-hosting_](<https://en.wikipedia.org/wiki/Self-hosting_(web_services)>) is
ook essentieel voor digitale soevereiniteit en digitale autonomie. Een
organisatie heeft dan zelf de volledige zeggenschap over de data. Tot waar in
een overheidsorganisatie of natie de digitale soevereiniteit moet lopen kan
verschillen. Daarom is het belangrijk dat verschillende digitaal soevereine
organisaties toch goed samen kunnen werken. Dit zou bijvoorbeeld kunnen door
[federatie](https://forgefed.org/) tussen de Git-forges van deze soevereine
organisaties. Forgejo heeft ook
[federatie op de roadmap](https://forgejo.org/2023-01-10-answering-forgejo-federation-questions/).

## Conclusie

Samenvattend, vanuit het oogpunt van digitale soevereiniteit en digitale
autonomie is een _self-hosted_ Forgejo de beste keuze voor de overheid. De
functionaliteit van Forgejo is ruim voldoende voor software-ontwikkeling en elke
in Forgejo geïnvesteerde euro komt terecht in het publieke domein.
