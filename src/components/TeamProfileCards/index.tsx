/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode } from "react";
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

type ProfileProps = {
  className?: string;
  name: string;
  role: string;
  children: ReactNode;
  githubUrl?: string;
  linkedInUrl?: string;
  mastadonUrl?: string;
  email?: string;
  icon?: string;
};

function TeamProfileCard({
  className,
  name,
  role,
  children,
  githubUrl,
  linkedInUrl,
  mastadonUrl,
  email,
  icon,
}: ProfileProps) {
  return (
    <div className={className}>
      <div className="card card--full-height">
        <div className="card__header">
          <div className="avatar avatar--vertical">
            <img
              className="avatar__photo avatar__photo--xl"
              src={`${getAvatarUrl(githubUrl, icon)}`}
              alt={`${name}'s avatar`}
            />
            <div className="avatar__intro">
              <Heading as="h3" className="avatar__name">
                {name}
                <br />
                {role}
              </Heading>
            </div>
          </div>
        </div>
        <div className="card__body">{children}</div>
        <div className="card__footer">
          <div className="button-group button-group--block">
            {githubUrl && (
              <Link className="button button--secondary" href={githubUrl}>
                GitHub
              </Link>
            )}
            {linkedInUrl && (
              <Link className="button button--secondary" href={linkedInUrl}>
                LinkedIn
              </Link>
            )}
            {mastadonUrl && (
              <Link className="button button--secondary" href={mastadonUrl}>
                Mastodon
              </Link>
            )}
            {email && (
              <Link
                className="button button--secondary"
                href={`mailto:${email}`}
              >
                E-mail
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamProfileCardCol(props: ProfileProps) {
  return (
    <TeamProfileCard {...props} className="col col--6 margin-bottom--lg" />
  );
}
function getAvatarUrl(githubUrl?: string, icon?: string) {
  if (icon) return icon;
  else if (githubUrl) return `${githubUrl}.png`;
  return "";
}

export function ActiveTeam(): ReactNode {
  return (
    <div className="row">
      <TeamProfileCardCol
        name="Dimitri van Hees"
        role="Product Owner"
        githubUrl="https://github.com/dvh"
        linkedInUrl="https://www.linkedin.com/in/dimitrivanhees/"
        email="d.vanhees@geonovum.nl"
        mastadonUrl="https://me.dm/@dvh"
      >
        <Translate>
          Dimitri is als Product Owner de brug tussen de business en techniek.
          Met zijn achtergrond als architect, gespecialiseerd in API's, bewaakt
          hij de technische lijn van het product. Hij is gepassioneerd over het
          creëren van robuuste oplossingen die schaalbaar en toekomstbestendig
          zijn. In zijn vrije tijd gaat hij graag zaalvoetballen of brouwt hij
          speciaalbier in zijn eigen brouwerij.
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Frank Terpstra"
        role="Implementatie-ondersteuner"
        linkedInUrl="https://www.linkedin.com/in/frank-terpstra-1bb5096/"
        githubUrl="https://github.com/fterpstra"
        icon="/img/team/frank-terpstra.jpg"
        email="f.terpstra@geonovum.nl"
      >
        <Translate>
          Frank werkt als expert standaarden binnen het implementatie-ondersteuningsteam
          en heeft een grote passie voor standaarden. Hij gelooft in de kracht
          van heldere afspraken en consistente structuren om samenwerking en
          innovatie te versnellen. In zijn vrije tijd is hij een fanatiek
          mountainbiker en gaat hij graag schaatsen.
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        role="Front-end developer"
        name="Jaap-Hein Wester"
        githubUrl="https://github.com/MrSkippy"
        linkedInUrl="https://www.linkedin.com/in/jaapheinwester/"
        icon="/img/team/jaap-hein-wester.jpg"
        email="j.h.wester@geonovum.nl"
      >
        <Translate>
          Jaap-Hein is een ervaren front-end developer met een sterke focus op
          toegankelijkheid. Hij zet zich in om digitale producten voor iedereen
          bruikbaar te maken, ongeacht beperking of apparaat. Buiten werktijd is
          hij te vinden in een kano, op een sup board of samen met zijn gezin.
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Joost Farla"
        role="Implementatie-ondersteuner"
        linkedInUrl="https://www.linkedin.com/in/joostfarla/"
        githubUrl="https://github.com/joostfarla"
        icon="/img/team/joost-farla.jpg"
        email="j.farla@geonovum.nl"
      >
        <Translate>
          Joost is als architect onderdeel van het
          implementatie-ondersteuningsteam, waar hij complexe technische
          vraagstukken vertaalt naar werkbare oplossingen. Hij denkt graag mee
          over de lange termijn en helpt teams bij het maken van duurzame
          keuzes. Buiten het werk draait hij graag als DJ en programmeert hij
          aan eigen projecten.
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Martin van der Plas"
        role="Implementatie-ondersteuner"
        githubUrl="https://github.com/mrtn78"
        linkedInUrl="https://www.linkedin.com/in/martinvanderplas/"
        email="m.vanderplas@geonovum.nl"
      >
        <Translate>
          Martin is architect binnen het implementatie-ondersteuningsteam en
          richt zich op het creëren van verbindingen tussen burgers en overheden
          via data. Zijn passie ligt in het toegankelijk en bruikbaar maken van
          informatie voor iedereen. In zijn vrije tijd gaat hij graag hardlopen
          of op vakantie met zijn gezin.
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        role="Back-end developer"
        name="Matthijs Hovestad"
        githubUrl="https://github.com/pasibun"
        linkedInUrl="https://www.linkedin.com/in/matthijs-hovestad-a123898b/"
        email="m.hovestad@geonovum.nl"
      >
        <Translate>
          Matthijs ontwikkelt robuuste back-endoplossingen en heeft een scherp
          oog voor het maken van herbruikbare, generieke componenten. Hij
          streeft naar code die niet alleen werkt, maar ook lang meegaat en
          breed toepasbaar is. Buiten werktijd is hij vaak aan het klussen of
          aan het reizen.
        </Translate>
      </TeamProfileCardCol>

      <TeamProfileCardCol
        role="Developer Advocate"
        name="Tom Ootes"
        githubUrl="https://github.com/tomootes"
        linkedInUrl="https://www.linkedin.com/in/tootes/"
        mastadonUrl="https://hostux.social/@tomootes"
        icon="/img/team/tom-ootes.png"
        email="t.ootes@geonovum.nl"
      >
        <Translate>
          Tom zorgt ervoor dat developers zich gehoord en ondersteund voelen.
          Vanuit zijn rol als Developer Advocate deelt hij kennis, stimuleert
          hij community engagement en promoot hij het gebruik van open source.
          Naast zijn werk is hij een man van vele hobbies: hij klust graag, en
          speelt in een band waarin hij zijn creativiteit kwijt kan. Ook is 
          hij geïnteresseerd in hoe we het internet op een meer ethische 
          manier kunnen vormgeven.
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Vivian van der Heijden-Hanssen"
        linkedInUrl="https://www.linkedin.com/in/vivianvanderheydenhanssen/"
        icon="/img/team/vivian-van-der-heijden-hanssen.jpg"
        email="v.vanderheijden@geonovum.nl"
        role="Projectleider"
      >
        <Translate>
          Vivian bewaakt de voortgang, zorgt voor structuur en houdt het team
          gefocust op gezamenlijke doelen. Als projectleider weet zij hoe je
          mensen in beweging brengt en projecten tot een goed einde leidt. In
          haar vrije tijd komt ze tot rust tijdens een stevige hardloopsessie.
        </Translate>
      </TeamProfileCardCol>
    </div>
  );
}
