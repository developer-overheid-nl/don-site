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
  children: ReactNode;
  githubUrl?: string;
  linkedInUrl?: string;
  mastadonUrl?: string;
  icon?: string;
};

function TeamProfileCard({
  className,
  name,
  children,
  githubUrl,
  linkedInUrl,
  mastadonUrl,
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
        githubUrl="https://github.com/dvh"
        linkedInUrl="https://www.linkedin.com/in/dimitrivanhees/"
      >
        <Translate id="team.profile.Joel Marcey.body">
          Product owner van Developer Overheid
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Frank Terpstra"
        linkedInUrl="https://www.linkedin.com/in/frank-terpstra-1bb5096/"
        githubUrl="https://github.com/fterpstra"
        icon="/img/team/frank-terpstra.jpg"
      >
        <Translate>Architect Standaarden bij Developer Overheid</Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Jaap-Hein Wester"
        githubUrl="https://github.com/MrSkippy"
        linkedInUrl="https://www.linkedin.com/in/jaapheinwester/"
        icon="/img/team/jaap-hein-wester.jpg"
      >
        <Translate>Front-end developer bij Developer Overheid</Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Joost Farla"
        linkedInUrl="https://www.linkedin.com/in/joostfarla/"
        githubUrl="https://github.com/joostfarla"
        icon="/img/team/joost-farla.jpg"
      >
        <Translate>
          Architect en Implementatieondersteuner bij Developer Overheid
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Martin van der Plas"
        githubUrl="https://github.com/mrtn78"
        linkedInUrl="https://www.linkedin.com/in/martinvanderplas/"
      >
        <Translate>Architect APIs bij Developer Overheid</Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Matthijs Hovestad"
        githubUrl="https://github.com/pasibun"
        linkedInUrl="https://www.linkedin.com/in/matthijs-hovestad-a123898b/"
      >
        <Translate>Backend developer bij Developer Overheid</Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Tom Ootes"
        githubUrl="https://github.com/tomootes"
        linkedInUrl="https://www.linkedin.com/in/tootes/"
        mastadonUrl="https://hostux.social/@tomootes"
        icon="/img/team/tom-ootes.png"
      >
        <Translate>Developer Advocate bij Developer Overheid</Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Vivian van der Heijden-Hanssen"
        linkedInUrl="https://www.linkedin.com/in/vivianvanderheydenhanssen/"
        icon="/img/team/vivian-van-der-heijden-hanssen.jpg"
      >
        <Translate>Program Manager bij Developer Overheid</Translate>
      </TeamProfileCardCol>
    </div>
  );
}
