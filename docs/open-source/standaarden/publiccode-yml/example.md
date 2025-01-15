---
tags:
  - "open-source"
  - "publiccode-yml"
title: "Publiccode.yml example"
---

```yaml showLineNumbers title="./publiccode.yml"
# This repository adheres to the publiccode.yml standard by including this
# metadata file that makes public software easily discoverable.
# More info at https://github.com/publiccodeyml/publiccode.yml

publiccodeYmlVersion: "0.3"

# Dit veld bevat de korte naam van het project. Kies hier de naam waaronder het
# project bekend is bij de meeste mensen.
name: Developer Overheid
# De url naar de source code.
url: "https://gitlab.com/commonground/don/developer.overheid.nl"

# De url naar de productieomgeving van de software.
landingURL: "https://developer.overheid.nl" # optioneel

# Type software zoals te vinden op: https://yml.publiccode.tools/schema.core.html#key-softwaretype
softwareType: standalone/web

# Dit is een verplicht veld. Als je geen releaseDate hebt omdat je bijvoorbeeld
# doet aan Continuous Development vul je hier "1970-01-01" in.
releaseDate: "1970-01-01"

# Vul hier in op welke platforms de gebruiker de applicatie uitendelijk gaat
# gebruiken. Dus niet op welk platform de software zelf draait.
platforms:
  - web

# Vul hier een aantal tags in die beschrijven wat jouw sofware doet. De tags
# zijn te vinden op: https://yml.publiccode.tools/categories-list.html#categories-list
categories:
  - collaboration
  - digital-asset-management
  - it-asset-management
  - it-development
  - it-management
  - it-security
  - it-service-management
  - knowledge-management

# De beschrijving van de verschillende statussen zijn te vinden op: https://yml.publiccode.tools/schema.core.html#key-developmentstatus
developmentStatus: beta

# Welke dependencies zijn er nodig om de applicatie te installeren en te gebruiken?
dependsOn:
  open:
    - name: API Organisaties Overheid
      optional: true
    - name: PostgreSQL
      optional: true
      versionMin: "14.7"
    - name: Influxdb
      optional: true
      versionMin: "2.6.1"
    - name: Docker
      optional: false
      versionMin: "24.0.5"
    - name: Docker Compose
      optional: false
      versionMin: "2.20.2"
    - name: Python
      optional: false
      versionMin: "3.11"
    - name: Node.js
      optional: false
      versionMin: "20.10.0"

description:
  nl:
    longDescription: >
      Developer Overheid is de wegwijzer voor developers die voor of bij de overheid ontwikkelen. Zij vervult deze
      rol door het aanbieden van standaarden, best practices en tools.

      Een belangrijke feature van het platform is de API catalogus. Deze maakt inzichtelijk welke API's er beschikbaar
      zijn in het publieke landschap. Tevens kan je hier per API de informatie vinden die je nodig hebt om met de API aan
      de slag te gaan.
       
      Ook biedt het platform inzicht in welke open source software projecten er beschikbaar zijn in het 
      publieke landschap. Per project krijgt de gebruiker inzicht in de vitaliteit van de repository en andere
      waardevolle datapunten.

    # Mand!
    shortDescription: Developer Overheid is de wegwijzer voor developers die voor of bij de overheid ontwikkelen.

    # Welke grote features heeft dit project?
    features:
      - API Catalogus
      - Repository Catalogus

legal:
  # De licentie volgens de identifier van de SPDX standaard: https://spdx.org/licenses/
  license: EUPL-1.2
  # Wie is de eigenaar van de copyright op de code?
  mainCopyrightOwner: Stichting Geonovum
  # Wie is de eigenaar van de repository?
  repoOwner: Stichting Geonovum

# Voor welk publiek is deze repository bedoeld?
intendedAudience: # optioneel
  # In welk land?
  countries:
    - nl
  # En in welke sector?
  # De mogelijke tags vind je hier: https://yml.publiccode.tools/scope-list.html#scope-list
  scope:
    - government

localisation:
  # In welke talen is dit project beschikbaar?
  # Invullen volgens IETF BCP 47 standaard: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
  availableLanguages:
    - nl
  # Kunnen er meerdere talen geconfigureerd worden?
  localisationReady: false

maintenance:
  # Hoe is het onderhoud georganiseerd?
  # Doet een extern bedrijf het onderhoud? Kies dan: contract
  # Is het onderhoud intern belegd? Kies dan: internal
  type: internal

  # Wie kan ik bereiken bij vragen?
  contacts:
    - name: Dimitri van Hees
      email: d.vanhees@geonovum.nl
      affiliation: Geonovum
    - name: Tom Ootes
      email: tom@ootes.io
      affiliation: Geonovum
      phone: "+31623447230"
```
