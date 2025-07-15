---
tags:
  - "owasp"
  - "security"
  - "security-by-design"
  - "tool"
  - "open-source"
title: "OWASP Application Security Verification Standard (ASVS)"
---

Het OWASP Application Security Verification Standard (ASVS) is een framework voor het systematisch testen en verifiëren van application security controls. ASVS biedt een basis voor het ontwerpen, bouwen en testen van technische beveiligingsmaatregelen en helpt ontwikkelaars bij het opbouwen van veilige applicaties.

## Wat is OWASP ASVS?

ASVS is een lijst van applicatiebeveiliging vereisten of tests die kunnen worden gebruikt door architecten, ontwikkelaars, testers en security professionals tijdens verschillende fases van de software development lifecycle (SDLC). Het framework definieert drie verificatieniveaus:

- **Level 1**: Opportunistische verificatie - geschikt voor alle software
- **Level 2**: Standaard verificatie - geschikt voor applicaties met gevoelige data
- **Level 3**: Geavanceerde verificatie - geschikt voor de meest kritieke applicaties

## Praktisch gebruik voor developers

### 1. Integratie in de development workflow

ASVS kan worden geïntegreerd in verschillende fases van ontwikkeling:

**Design fase:**
- Gebruik ASVS requirements als input voor threat modeling
- Identificeer welke controls nodig zijn voor jouw applicatie
- Bepaal het juiste verificatieniveau

**Development fase:**
- Implementeer security controls gebaseerd op ASVS requirements
- Voer code reviews uit met ASVS als checklist
- Automatiseer security testing met ASVS-gebaseerde tools

**Testing fase:**
- Voer security testing uit volgens ASVS methodologie
- Gebruik ASVS als basis voor penetration testing
- Valideer dat alle vereiste controls correct zijn geïmplementeerd

### 2. Tooling en implementatie

#### OWASP SAMM (Software Assurance Maturity Model)
Gebruik SAMM samen met ASVS voor een holistische security approach:
- **[OWASP SAMM](https://owaspsamm.org/)** - Voor het volwassenheidsmodel
- Integreer ASVS requirements in SAMM governance processen

#### Security testing tools
Diverse tools ondersteunen ASVS-gebaseerde testing:

**Static Application Security Testing (SAST):**
- **SonarQube** - Met security rules plugin
- **Semgrep** - Met OWASP rule sets
- **CodeQL** - GitHub's security analysis

**Dynamic Application Security Testing (DAST):**
- **OWASP ZAP** - Ondersteunt ASVS testing methodologie
- **Burp Suite** - Met ASVS-gebaseerde test cases
- **Nuclei** - Open source vulnerability scanner

**Software Composition Analysis (SCA):**
- **OWASP Dependency-Check** - Voor vulnerable dependencies
- **Snyk** - Dependency vulnerability management
- **WhiteSource/Mend** - Supply chain security

#### CI/CD integratie
Automatiseer ASVS controls in je pipeline:

```yaml
# Voorbeeld GitHub Actions workflow
name: Security Testing
on: [push, pull_request]

jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Semgrep OWASP rules
        uses: returntocorp/semgrep-action@v1
        with:
          config: p/owasp-top-10

  dast:
    runs-on: ubuntu-latest
    steps:
      - name: ZAP Baseline Scan
        uses: zaproxy/action-baseline@v0.7.0
        with:
          target: 'http://localhost:3000'
```

### 3. Praktische implementatie stappen

**Stap 1: Assessment**
- Bepaal het juiste ASVS niveau voor jouw applicatie
- Identificeer welke requirements van toepassing zijn
- Maak een gap analysis van huidige security controls

**Stap 2: Planning**
- Prioriteer requirements op basis van risico
- Integreer ASVS requirements in user stories/backlog
- Plan security testing activiteiten

**Stap 3: Implementatie**
- Implementeer authentication en session management controls
- Voeg input validation en output encoding toe
- Implementeer access control mechanismen
- Zorg voor cryptographic controls

**Stap 4: Verificatie**
- Voer automated security testing uit
- Gebruik ASVS checklist voor manual testing
- Documenteer compliance status

### 4. Nederlandse context

Voor Nederlandse overheidssoftware zijn specifieke aandachtspunten:

**Compliance requirements:**
- **AVG/GDPR** - Privacy by design implementatie
- **NIS2** - Cybersecurity requirements
- **BIO** - Baseline Informatiebeveiliging Overheid

**Nationale tools:**
- **DigiD/eHerkenning** integratie security
- **PKIOverheid** certificaat management
- **OpenKAT** voor vulnerability scanning

## Best practices

1. **Start klein**: Begin met Level 1 en werk naar hogere niveaus
2. **Automatiseer**: Integreer ASVS checks in CI/CD pipelines
3. **Train je team**: Zorg dat developers ASVS requirements begrijpen
4. **Documenteer**: Houd compliance status bij in je documentation
5. **Review regelmatig**: ASVS wordt regelmatig bijgewerkt

## Meer informatie

- **[OWASP ASVS Project](https://owasp.org/www-project-application-security-verification-standard/)**
- **[ASVS 4.0 PDF](https://github.com/OWASP/ASVS/releases)**
- **[ASVS GitHub Repository](https://github.com/OWASP/ASVS)**
- **[OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)**