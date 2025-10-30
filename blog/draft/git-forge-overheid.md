---
authors: [jan-vlug]
draft: true
---

# Aanbeveling voor de Git-werkplaats van de overheid

De Nederlandse overheid [publiceert een deel van haar
code](https://oss.developer.overheid.nl/repositories) als [vrije
opensource
software](https://fsfe.org/freesoftware/freesoftware.nl.html). Het *de
facto* versiebeheersysteem voor software is [Git](https://git-scm.com/).
Git is vrije opensource software.

Er zijn online platforms die werken met Git, en die daaromheen
toegevoegde functionaliteit bieden om software-development en
project-management met Git te ondersteunen. Ik gebruik hieronder de term
[Git-forge](https://en.wikipedia.org/wiki/Forge_(software))
(Git-werkplaats) om zulke platforms aan te duiden. GitLab, Forgejo en
GitHub zijn allemaal Git-forges.

In deze blog ga ik in op een aantal aspecten van verschillende
Git-forges, om zo de beste keuze voor een Git-forge voor de overheid te
kunnen maken.

<!-- truncate -->

Op dit moment wordt vrije opensource software van de overheid onder
andere gehost op GitHub en GitLab. Externe Git-forges die niet onder het
beheer van de overheid vallen. GitHub zelf is bovendien bedrijfseigen
(*proprietary*), niet vrije, niet-opensource software. GitLab *Free*
heeft een open source licentie, maar de *Enterprise Edition* heeft een
[source-available
licentie](https://handbook.gitlab.com/handbook/marketing/brand-and-product-marketing/product-and-solution-marketing/tiers/#overview)
en is geen vrije software.

De vraag rijst wáár de Nederlandse overheid het best haar vrije
opensource software kan publiceren?

[GitHub](https://github.com/) valt af omdat [GitHub, als niet vrije,
niet-opensource software](https://sfconservancy.org/GiveUpGitHub/) niet
in overeenstemming is met [de
lijn](https://open.overheid.nl/documenten/ronl-d468e28d-dfbc-43fe-92cc-77b7f861096e/pdf)
dat bij gelijke geschiktheid open source de voorkeur geniet.

Twee andere Git-forges zijn [Forgejo](https://forgejo.org/) en
[GitLab](https://gitlab.com/).

GitLab heeft een [*open
core*](https://en.wikipedia.org/wiki/Open-core_model) */ non-free
enterprise functionality model*. Er is een opensource editie en er is
een niet-vrije editie. Dat is een risico. Gebruikers van de niet-vrije
GitLab *Enterprise Edition* functionaliteit hebben een [vendor
lock-in](https://nl.wikipedia.org/wiki/Vendor_lock-in) bij GitLab. Het
is niet mogelijk de code naar eigen voorkeur aan te passen en vrij te
gebruiken.

Echte [digitale
soevereiniteit](https://www.tweedekamer.nl/zoeken?qry=position+paper+digitale+soevereiniteit&form_build_id=form-qdVAkRjc9-ixopjCXk_eYwERCpEpkS2_Zz1uURDIDxk&form_id=tk_external_data_autonomy_search_form)
kun je alleen bereiken door het gebruik van [vrije
software](https://audio-video.gnu.org/video/TEDxGE2014_Stallman05_LQ.webm)
(*Free and Open Source Software - FOSS*). [Vrije
software](https://www.gnu.org/philosophy/free-sw.html) is breder dan
opensource software. FOSS geeft de gebruiker vier vrijheden:

1.  De vrijheid om de software te gebruiken;
2.  De vrijheid om de software te bestuderen;
3.  De vrijheid om de software te distribueren;
4.  De vrijheid om *veranderingen* aan de software te distribueren.

Er zijn veel nuance-verschillen in verschillende free software
licenties, maar voorgaande is volgens mij de kern. FOSS is
[copyleft](https://nl.wikipedia.org/wiki/Copyleft). Als het gaat over
herbruikbaarheid van broncode, zoals voorgeschreven door
[de wet](https://wetten.overheid.nl/BWBR0036795/2024-06-19/#HoofdstukI_Artikel2a)
(zie ook de [memorie van toelichting](https://zoek.officielebekendmakingen.nl/kst-36382-3.pdf))
dan denk
ik dat een copyleft licentie de beste keuze is. De [EUPL v1.2 is
copyleft](https://interoperable-europe.ec.europa.eu/collection/eupl/news/understanding-eupl-v12).

Het essentiële verschil tussen GitLab *Enterprise Edition* en Forgejo is
dat GitLab *Enterprise Edition* geen free software is en Forgejo is wel
free software (FOSS). Forgejo heeft alleen een vrije variant van de
software. [Forgejo zal altijd FOSS zijn](https://forgejo.org/). Bovendien gebruikt Forgejo
exclusief Free Software voor hun eigen project development.

Bij Forgejo heeft de gebruiker (overheid) dus álle vrijheid. Bij GitLab
*Enterprise Edition* wordt er door de toegepaste licentie vrijheid van
de gebruiker (overheid) ontnomen. GitLab *Enterprise Edition* is geen
FOSS. Dit is een fundamenteel, filosofisch en politiek verschil. Je kunt
alleen digitale soevereiniteit hebben als er geen vrijheid van je wordt
ontnomen.

[Fedora](https://www.fedoraproject.org/), een Linux-distributie, stond
ook voor de keuze welke Git-forge te gebruiken. Fedora koos voor
Forgejo. Eén van de argumenten van [Fedora om voor Forgejo te
kiezen](https://communityblog.fedoraproject.org/fedora-chooses-forgejo/)
is:

*\"Some of us on the council liked the well documented, and somewhat
familiar option of GitLab, but when faced with the reality that sometime
in the near future, Fedora may find itself* **needing to make changes**
*to our git forge, and one option might require money we don't have, or*
**not allow the changes** *we might need to make, and we* **did not want
to limit the project** *in any way.\"* (markering in vet van mij). Met
andere woorden: Fedora vindt digitale soevereiniteit essentieel en wil
zichzelf geen vrijheid ontnemen of limiteren.

Merk op dat bij Fedora ongeveer de beste experts op het gebied van vrije
opensource software (FOSS) werken.

GitLab maakt [onderscheid tussen tiers, users en
distributions](https://handbook.gitlab.com/handbook/marketing/brand-and-product-marketing/product-and-solution-marketing/tiers/#history-of-ce-and-ee-distributions).
GitLab hanteert [verschillende
licenties](https://docs.gitlab.com/development/licensing/).

GitLab *Community Edition (CE)* heeft de
[MIT License](https://gitlab.com/gitlab-org/gitlab-foss/blob/master/LICENSE). GitLab *CE* is
daarmee compatibel met FOSS, free software.

GitLab *Enterprise Edition (EE)* heeft "[The GitLab Enterprise Edition
(EE) license](https://gitlab.com/gitlab-org/gitlab/-/blob/master/ee/LICENSE)"
waarin meer restricties zijn. GitLab *EE* is daarmee niet
FOSS, dus *non free software*.

Forgejo heeft de [GPLv3 licentie](https://forgejo.org/2024-08-gpl/)
(voorheen MIT). GPLv3 is FOSS en
[copyleft](https://en.wikipedia.org/wiki/Copyleft) net als Git zelf.

[Git heeft de GPLv2
licentie](https://git-scm.com/about/free-and-open-source).

Mijn conclusie: Als de overheid fundamenteel wil kiezen voor digitale
soevereiniteit dan is een Git-forge die zelf FOSS of copyleft is
essentieel. GitLab als bedrijf zet in op het *free core / exendend
enterprise model*. Dit model heeft in het verleden tot [vendor
lock-in](https://en.wikipedia.org/wiki/Vendor_lock-in) en andere
problemen geleid (denk aan [Owncloud /
Nextcloud](https://itsfoss.com/nextcloud-vs-owncloud/)). Forgejo, als
democratische non-profitorganisatie, zet
expliciet vol in op vrije software (FOSS/copyleft). Daarmee is vanuit
het oogpunt van digitale soevereiniteit Forgejo de beste keuze.

Forgejo biedt de mogelijkheid om álle broncode ervan te bestuderen, aan
te passen en te distribueren. Dat is precies in lijn met de doelen van
de overheid. Elke investering in Forgejo komt in het publiek domein en
daarmee ten goede aan belastingbetalende burgers en bedrijven. [Public
money, public code](https://publiccode.eu/en/). Door te investeren in
Forgejo investeert de overheid in het publieke domein.

Wat betreft schaalbaarheid, de essentie van Git is dat het een
gedistribueerd, gedecentraliseerd systeem is. Daarmee is Git zelf (de
core van Git-forges) als het ware van nature schaalbaar. Dat geldt niet
perse voor de aanvullende functionaliteit van de Git-forges. Ik weet te
weinig van Forgejo om sterke uitspraken over de schaalbaarheid te kunnen
doen. Ik vermoed dat Forgejo op dit moment schaalbaar genoeg is voor de
opensource projecten van de overheid. Codeberg, een publieke instantie
van Forgejo host op het moment van schrijven [313.753 projecten en
202.366 gebruikers](https://codeberg.org/about).

Als je hands-on ervaring wil opdoen met Forgejo, dan kun je bijvoorbeeld
gebruik maken van [Codeberg](https://codeberg.org/about), een
non-profit, community-gedreven platform dat draait op Forgejo. Ik heb
tijdens een hackathon Forgejo inclusief [een Forgejo Actions
runner](https://forgejo.org/docs/latest/admin/actions/) lokaal
geïnstalleerd en GitLab CI/CD-pipelines omgezet naar [Forgejo
Actions](https://forgejo.org/docs/next/user/actions/reference/).

[*Self-hosting*](https://en.wikipedia.org/wiki/Self-hosting_(web_services))
is ook essentieel voor digitale soevereiniteit en digitale autonomie.
Een organisatie heeft dan zelf de volledige zeggenschap over de
data. Tot waar in een overheidsorganisatie of natie de digitale
soevereiniteit moet lopen kan verschillen. Daarom is het belangrijk dat
verschillende digitaal soevereine organisaties toch goed samen kunnen
werken. Dit zou bijvoorbeeld kunnen door
[federatie](https://forgefed.org/) tussen de Git-forges van deze
soevereine organisaties. Forgejo heeft ook [federatie op de
roadmap](https://forgejo.org/2023-01-10-answering-forgejo-federation-questions/).

Samenvattend, vanuit het oogpunt van digitale soevereiniteit en digitale
autonomie is een *self-hosted* Forgejo de beste keuze is voor de
overheid. De functionaliteit van Forgejo is ruim voldoende voor
software-ontwikkeling en elke in Forgejo geïnvesteerde euro komt terecht
in het publieke domein.
