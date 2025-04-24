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
  icon
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
                Mastadon
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
  if (githubUrl) return `${githubUrl}.png`;
  return icon;
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
          Product owner van Developer overheid.
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Tom Ootes"
        githubUrl="https://github.com/tomootes"
        linkedInUrl="https://www.linkedin.com/in/tootes/"
        mastadonUrl="https://hostux.social/@tomootes"
      >
        <Translate id="team.profile.Alexey Pyltsyn.body">
          Content creator bij Developer overheid
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Jaap-Hein Wester"
        githubUrl="https://github.com/MrSkippy"
        linkedInUrl="https://www.linkedin.com/in/jaapheinwester/"
      >
        <Translate id="team.profile.Alexey Pyltsyn.body">
          Front-end developer bij Developer overheid
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Matthijs Hovestad"
        githubUrl="https://github.com/pasibun"
        linkedInUrl="https://www.linkedin.com/in/matthijs-hovestad-a123898b/"
      >
        <Translate id="team.profile.Alexey Pyltsyn.body">
          Backend developer bij Developer overheid
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Martin van der Plas"
        githubUrl="https://github.com/mrtn78"
        linkedInUrl="https://www.linkedin.com/in/martinvanderplas/"
      >
        <Translate id="team.profile.Alexey Pyltsyn.body">
          Architect APIs bij Developer overheid
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Vivian van der Heijden-Hanssen"
        linkedInUrl="https://www.linkedin.com/in/vivianvanderheydenhanssen/"
        icon="https://ca.slack-edge.com/T055ZJ26M-U088PG4EAMT-64600c8cfa33-192"
      >
        <Translate id="team.profile.Alexey Pyltsyn.body">
          Program Manager bij Developer overheid
        </Translate>
      </TeamProfileCardCol>
    </div>
  );
}
