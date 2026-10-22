import { useState, useEffect } from "react";
import {
  LinkListCard,
  LinkListLink,
  type HeadingProps,
} from "@rijkshuisstijl-community/components-react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import AgendaEventLink from "../Agenda/AgendaEventLink";
import {
  type AgendaEvent,
  type EventsApiConfig,
  fetchUpcomingEvents,
} from "../Agenda/api";

const NUM_EVENTS = 6;
const HEADING_LEVEL = 2;

type HomepageAgendaProps = {
  numEvents?: number;
  headingLevel?: HeadingProps["level"];
};

export default function HomepageAgenda(
  props: HomepageAgendaProps,
): React.JSX.Element {
  const [agenda, setAgenda] = useState<AgendaEvent[] | null>(null);
  const { numEvents = NUM_EVENTS, headingLevel = HEADING_LEVEL } = props;
  const { siteConfig } = useDocusaurusContext();
  const { baseUrl, apiKey } = siteConfig.customFields
    .eventsApi as EventsApiConfig;

  useEffect(
    function fetchFeed() {
      fetchUpcomingEvents({ baseUrl, apiKey }, { perPage: numEvents })
        .then(({ events }) => setAgenda(events))
        .catch((error) => {
          console.warn("Agenda kon niet worden geladen:", error.message);
          setAgenda([]);
        });
    },
    [numEvents, baseUrl, apiKey],
  );

  return (
    <BrowserOnly>
      {() => (
        <LinkListCard
          heading="Aankomende evenementen"
          headingLevel={headingLevel}
        >
          {(agenda &&
            (agenda.length > 0 ? (
              <>
                {agenda.map((event) => (
                  <AgendaEventLink event={event} key={event.id} />
                ))}
                <LinkListLink href="/evenementen">
                  Bekijk alle evenementen
                </LinkListLink>
              </>
            ) : (
              <li>Er zijn geen aankomende evenementen in de agenda.</li>
            ))) || (
            <li>
              <img
                src="/img/bouncing-squares.svg"
                width={42}
                alt="Agenda wordt geladen"
              />
            </li>
          )}
        </LinkListCard>
      )}
    </BrowserOnly>
  );
}
