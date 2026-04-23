# Dus je wilt je eigen container registry hosten?

In het kader van 'Digitale soevereiniteit', maar mogelijk ook omdat je intern een registry voor je containers wilt draaien bieden kun je er voor kiezen een eigen registry te hosten op eigen infra.

Op basis van de volgende containers kun je vrij simpel een eigen container registry hosten die zowel publiek leesbare repositories ondersteund, als ook private rechten en images.

- registry
- cesanta/docker_auth

In deze korte tutorial nemen we je mee in wat er nodig is om een basis-registry op te zetten welke je vanuit bijvoorbeeld de CI kunt laten vullen met oci-images / docker-container images.

## docker registry
Deze container handelt de daadwerkelijke container registry af: het opslaan van bestanden en het beheren van alle lagen. Hij spreekt het Docker container registry-protocol over http(s).

Zoals bij veel opslagoplossingen presenteert deze container slechts de façade, en kan hij de daadwerkelijke bestanden opslaan op een lange lijst van opslag-backends. Voor dit voorbeeld gebruiken we gewoon een lokale map, maar als je dit later wilt load-balancen, wil je mogelijk kiezen voor iets gedistribueerds, zoals bijvoorbeeld een S3-cluster.

## docker auth
Deze container handelt (indien nodig) alle logins af die vereist zijn door de registry-container. Hij kan meerdere gebruikers beheren, in meerdere groepen, die toegang hebben tot een lijst van registries en/of hun specifieke images op basis van ACL’s.

Net als de container registry spreekt hij het Docker registry-protocol voor authenticatie over http(s).

Trouw aan de vele login-opties kun je de gebruikers en ACL’s opslaan in een configuratiebestand (waarbij container restarts nodig zijn als je gebruikers of ACL’s wilt toevoegen of verwijderen), of je kunt ze opslaan in een van de verschillende backend-opties.  
Deze backend-opties variëren van basic-auth tot SQL-databases en lokale executable calls. Voor dit voorbeeld houden we het bij een lokaal configuratiebestand als auth-store.

## Voorbeeldconfiguraties

In deze voorbeelden gebruiken we de volgende variabelen die je zelf moet vervangen:

- `$registrydomain`: de domeinnaam waarop je registry beschikbaar wordt gemaakt. Dit is nodig omdat Docker registry interne en externe referenties en redirects gebruikt.
- `$somesecret`: een geheim dat alleen jouw registry kent.
- `$my-docker-auth`: de naam van de interne issuer van login-tokens. Deze wordt gebruikt in zowel de registry als de auth-server.

Voor de ondertekende tokens moet je ook een self-signed certificaat aanmaken en dit accepteren in je container registry, tenzij je de mogelijkheid hebt om dit met een regulier certificaat in te richten.

## registry/config.yml

```yaml
version: 0.1
log:
  fields:
    service: registry

storage:
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry

http:
  addr: :5000
  host: https://$registrydomain
  secret: $somesecret
  headers:
    X-Content-Type-Options: [nosniff]
auth:
  token:
    autoredirect: false
    realm: https://$registrydomain/auth/auth
    issuer: $my-docker-auth
    service: $registrydomain
    # if you are going to use self-signed certs for comms between the auth server
    # and the registry, you can point to a specific pem file. This does root 
    # bundle is not used for outbound/client services.
    rootcertbundle: /auth/my.pem
health:
  storagedriver:
    enabled: true
    interval: 10s
    threshold: 3
```

## auth/config.yml

```yaml
server:
  addr: ":5001"
  path_prefix: "/auth"

token:
  issuer: "$my-docker-auth"
  expiration: 900
  # sign the auth tokens with the following keys, these can be self signed, see 
  # rootcertbundle in the registry config.
  certificate: "/config/my.crt"
  key: "/config/my.key"

users:
  # admin user
  "admin":
    password: "$somepass"
  # other users
  "firstuser":
    password: "$somepass"
    labels:
      group:
        - "first_user_group"
  # allow anonymous users
  "": {}

acl:
  - match: {account: "", name: "publicrepos/*"}
    actions: ["pull"]
    comment: "Public read-only access to publicrepos namespace"
  - match:
      name: "publicrepos/*"
      labels:
        group: "first_user_group"
    actions: ["pull", "push"]
    comment: "firstgroup group members can push to publicrepos namespace"
    require_account: true
  - match: {account: "admin"}
    actions: ["*"]
    comment: "Admin has full access to everything."
    require_account: true
  - match: {name: "${labels:group}-shared/*"}
    actions: ["push", "pull"]
    comment: "Users can push to the shared namespace of any group they are in"
    require_account: true
  - match: {account: "/.+/", name: "${account}/*"}
    actions: ["*"]
    comment: "Logged in users have full access to images that are in their 'namespace'"
    require_account: true
```

De passwords zoals gebruikt in bovenstaande voorbeeld kun je maken met de tool htpasswd:

```bash
htpasswd -nB $username
```

De certs die nodig zijn voor een self signed flow zijn te maken met openssl:

```bash
openssl req -x509 -newkey rsa:4096 -keyout my.key -out my.crt -days 365 -subj '/CN=$registrydomain' -nodes
cp my.* /etc/docker/registry/auth/
cat my.* | tee /etc/docker/registry/auth/my.pem
```
Deze kun je eventueel een cronjob gieten voor jaarlijkste verversing.

## de containers starten:
```bash
docker run \
    -d --name docker_auth --restart=always -p 5001:5001 \
    -v /etc/docker/registry/auth:/config:ro \
    -v /var/log/docker_auth:/logs \
    cesanta/docker_auth:latest --alsologtostderr /config/config.yml

docker run -d -p 5000:5000 --restart=always --name registry \
             -v /etc/docker/registry/config.yml:/etc/docker/registry/config.yml \
	     -v /var/lib/docker/registry:/var/lib/registry \
	     -v /etc/docker/registry/auth:/auth \
             registry:latest
```

Uiteraard doen je de containers te (her)starten na deze config changes (of als je meer users wilt toevoegen alleen de auth container).

n.b. we gebruiken hier 'latest' maar idealiter pin je de containers op de gewenste versie, en update je deze periodiek handmatig na validatie.

## Webserver / gateway config.

### nginx/registry.conf
```Nginx
server {
    listen 0.0.0.0:80;

    server_name $registrydomain;

    location ~ /\.ht {
        deny all;
    }

    access_log  /var/log/nginx/$registrydomain.access.log;
    error_log   /var/log/nginx/$registrydomain.error.log;

    # Per site configuration
    location /auth/ {
      proxy_pass http://localhost:5001/auth/;
    }

    location / {
      client_max_body_size 0;
      proxy_pass http://localhost:5000/;
    }
}
```

Deze config file dien je uiteraard te activeren in je nginx config / container, en nog te voorzien van de nodige certificaten en security-headers als je hiermee direct het web wilt bedienen.

## Read only public toegang testen
Op een computer waarop je geen docker login voor je eigen repos hebt gedaan doe je het volgende:

```bash
docker manifest inspect $registrydomain/$repos/$image:pr-$number@sha256:$someShaHash
```

Dit zou pull-/lees-toegang moeten valideren voor een image die aanwezig is in de publieke repositories. Als je al vanuit je Git CI images pusht kun je een pr-nummer en de bijbehorende sha hash daar vinden.

Als je `no such manifest` krijgt, ben je waarschijnlijk verplicht om in te loggen, of heb je niet de juiste image naam.
Je kunt valideren of de manifest wel bestaat door het zelfde commando uit te voeren met een wel ingelogde user.

Je kunt ook direct met `curl` een request doen voor een token die toegang tot de bepaalde image. Let er op dat je hier dus de auth container direct aanspreekt.
```bash
curl -v "https://$registrydomain/auth/auth?service=$registrydomain&scope=repository:$repos/$image:pull"
```

Dit doet hetzelfde, maar gebruikt Docker niet, en kan dus niet vertrouwen op eventuele Docker-loginpogingen die je al hebt gedaan.
Als je een access token krijgt, ben je succesvol goedgekeurd als anonieme gebruiker voor de opgegeven image en repository.

# Gebruik maken van je nieuwe Container registry in de github Ci:

In de workflow die je images pusht voeg je een nieuwe image naam toe, en je voegt een login block toe voor docker.

## build-images.yml
```yaml

jobs:
  create_container_image:
    permissions:
      contents: read
      packages: write
    runs-on: ubuntu-24.04
    steps:
      - name: Checkout code
        uses: actions/checkout@v5
      - name: Docker meta
        id: meta
        uses: docker/metadata-action@c1e51972afc2121e065aed6d45c65596fe445f3f # v5.8.0
        with:
          images: |
            ghcr.io/${{ github.repository_owner }}/myimage
            $registrydomain/myrepo/myimage
          tags: |
            type=ref,event=branch
            type=ref,event=tag

      - name: Login to my own Container Registry
        uses: docker/login-action@5e57cd118135c172c3672efd75eb46360885c0ef # v3.6.0
        with:
          registry: $registrydomain
          username: ${{ secrets.registry_user }}
          password: ${{ secrets.registry_password }}
```
Om dit te laten werken dien je in je secrets natuurlijk wel een username en password beschikbaar te maken die ook in de auth.conf van je registry bekend zijn, icm een bijpassende repository zoals bekend in de acl.
Uiteraard kun je indien gewenst de originele ghcr.io login en image verwijderen als je hier geen behoefte meer aan hebt.
n.b. Let er op dat deze job voor elke Commit binnen een PR potentieel een container produceert en deze gaat uploaden. Dit kan vrij snel een boel diskspace kosten, en helaas geeft de registry een niet veel zeggende 500 internal error als deze diskspace op is geraakt.
