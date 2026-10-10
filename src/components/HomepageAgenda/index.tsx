import { useState, useEffect } from "react";
import {
  LinkListCard,
  LinkListLink,
  type HeadingProps,
} from "@rijkshuisstijl-community/components-react";
import styles from "./styles.module.css";
import IconKalenderInline from "@site/src/theme/icons/IconKalenderInline";
import IconLocatiemarkerInline from "@site/src/theme/icons/IconLocatiemarkerInline";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const NUM_EVENTS = 6;
const HEADING_LEVEL = 2;

function formatDate(start_dateString: string, end_dateString: string) {
  const start_date = new Date(start_dateString);
  const end_date = new Date(end_dateString);

  if (Number.isNaN(start_date.valueOf()) || Number.isNaN(end_date.valueOf())) {
    return null;
  }

  if (
    start_date.getFullYear() === end_date.getFullYear() &&
    start_date.getMonth() === end_date.getMonth() &&
    start_date.getDate() === end_date.getDate()
  ) {
    // On the same day
    return `${new Intl.DateTimeFormat("nl-NL", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(start_date)} - ${new Intl.DateTimeFormat("nl-NL", {
      timeStyle: "short",
    }).format(end_date)}`;
  } else if (
    start_date.getFullYear() === end_date.getFullYear() &&
    start_date.getMonth() === end_date.getMonth()
  ) {
    // In the same month
    return `${new Intl.DateTimeFormat("nl-NL", { day: "numeric" }).format(
      start_date,
    )} - ${new Intl.DateTimeFormat("nl-NL", { day: "numeric" }).format(
      end_date,
    )} ${new Intl.DateTimeFormat("nl-NL", {
      month: "long",
      year: "numeric",
    }).format(start_date)}`;
  }
  // other
  return `${new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" }).format(
    start_date,
  )} - ${new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" }).format(
    end_date,
  )}`;
}

// AgendaEvent of the Tools API (GET /events), limited to the fields the agenda shows.
type AgendaEvent = {
  title: string;
  summary?: string;
  startsAt: string;
  endsAt: string;
  location?: string;
  url: string;
};

type EventsApiConfig = {
  baseUrl: string;
  apiKey?: string;
};

type HomepageAgendaProps = {
  numEvents?: number;
  headingLevel?: HeadingProps["level"];
};

export default function HomepageAgenda(
  props: HomepageAgendaProps,
): React.JSX.Element {
  const [agenda, setAgenda] = useState<Record<string, any>[] | null>(null);
  const { numEvents = NUM_EVENTS, headingLevel = HEADING_LEVEL } = props;
  const { siteConfig } = useDocusaurusContext();
  const { baseUrl, apiKey } = siteConfig.customFields
    .eventsApi as EventsApiConfig;

  useEffect(
    function fetchFeed() {
      // The API filters on events that have not ended yet and sorts them by start time.
      const query = new URLSearchParams({
        endsAfter: new Date().toISOString(),
        perPage: String(numEvents),
      });
      fetch(`${baseUrl}/events?${query}`, {
        headers: apiKey ? { "X-Api-Key": apiKey } : {},
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Events API responded with ${response.status}`);
          }
          return response.json() as Promise<AgendaEvent[]>;
        })
        .then((list) =>
          setAgenda(
            list.map(({ title, summary, startsAt, endsAt, location, url }) => ({
              title,
              summary,
              date: formatDate(startsAt, endsAt),
              place: location,
              url,
            })),
          ),
        )
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
              agenda.map(({ title, summary, date, place, url }, index) => (
                <LinkListLink href={url} key={index} target="_blank">
                  <h3 className={styles.agendaTitle}>{title}</h3>
                  <p className={styles.agendaMeta}>
                    {date && (
                      <span className={styles.agendaDate}>
                        <IconKalenderInline /> {date}
                      </span>
                    )}
                    {place && (
                      <span className={styles.agendaPlace}>
                        <IconLocatiemarkerInline /> {place}
                      </span>
                    )}
                  </p>
                  <p className={styles.agendaIntro}>{summary}</p>
                </LinkListLink>
              ))
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
