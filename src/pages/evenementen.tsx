import { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import PaginatorNavLink from "@theme/PaginatorNavLink";
import { useHistory, useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  FormFieldSelect,
  SelectOption,
} from "@rijkshuisstijl-community/components-react";
import AgendaEventCard from "../components/Agenda/AgendaEventCard";
import {
  type EventsApiConfig,
  type EventsPage,
  fetchPastEvents,
  fetchUpcomingEvents,
} from "../components/Agenda/api";
import styles from "./evenementen.module.css";

// The 1.1.0 typings mark all select props as required, while they are optional at runtime.
const SelectField = FormFieldSelect as React.FC<
  Partial<React.ComponentProps<typeof FormFieldSelect>>
>;

const EVENTS_PER_PAGE = 10;
const PAGE_PARAM = "pagina";
const PERIOD_PARAM = "periode";

const PERIODS = {
  upcoming: {
    param: null,
    label: "Aankomend",
    heading: "Aankomende evenementen",
    empty: "Er zijn geen aankomende evenementen in de agenda.",
    previousPage: "Eerdere evenementen",
    nextPage: "Latere evenementen",
    fetchEvents: fetchUpcomingEvents,
  },
  past: {
    param: "afgelopen",
    label: "Afgelopen",
    heading: "Afgelopen evenementen",
    empty: "Er zijn geen afgelopen evenementen gevonden.",
    previousPage: "Recentere evenementen",
    nextPage: "Oudere evenementen",
    fetchEvents: fetchPastEvents,
  },
};

type Period = keyof typeof PERIODS;

function pagePermalink(period: Period, page: number) {
  const query = new URLSearchParams();
  if (PERIODS[period].param) {
    query.set(PERIOD_PARAM, PERIODS[period].param);
  }
  if (page > 1) {
    query.set(PAGE_PARAM, String(page));
  }
  return query.size > 0 ? `/evenementen?${query}` : "/evenementen";
}

export default function EventsPage(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { baseUrl, apiKey } = siteConfig.customFields
    .eventsApi as EventsApiConfig;
  const history = useHistory();
  const params = new URLSearchParams(useLocation().search);
  const period: Period =
    params.get(PERIOD_PARAM) === PERIODS.past.param ? "past" : "upcoming";
  const page = Math.max(
    1,
    Number.parseInt(params.get(PAGE_PARAM) ?? "", 10) || 1,
  );
  const texts = PERIODS[period];
  // undefined while loading, null when the events could not be loaded.
  const [result, setResult] = useState<EventsPage | null | undefined>();

  useEffect(
    function fetchEvents() {
      setResult(undefined);
      PERIODS[period]
        .fetchEvents({ baseUrl, apiKey }, { page, perPage: EVENTS_PER_PAGE })
        .then(setResult)
        .catch((error) => {
          console.warn(
            "Evenementen konden niet worden geladen:",
            error.message,
          );
          setResult(null);
        });
    },
    [period, page, baseUrl, apiKey],
  );

  return (
    <Layout
      title="Evenementen | Ontwikkelaarsportaal van de Nederlandse Overheid"
      description="Aankomende en afgelopen evenementen voor developers bij de overheid"
    >
      <main>
        <div
          className={`container margin-top--xl margin-bottom--xl ${styles.page}`}
        >
          <h1>{texts.heading}</h1>
          <p>
            Meetups, conferenties en andere bijeenkomsten voor developers bij de
            overheid, gesorteerd op datum.
          </p>
          <div className={styles.toolbar}>
            <SelectField
              label="Sortering"
              value={period}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                history.push(pagePermalink(event.target.value as Period, 1))
              }
            >
              {(Object.keys(PERIODS) as Period[]).map((option) => (
                <SelectOption key={option} value={option}>
                  {PERIODS[option].label}
                </SelectOption>
              ))}
            </SelectField>
          </div>
          {result === undefined && (
            <img
              src="/img/bouncing-squares.svg"
              width={42}
              alt="Evenementen worden geladen"
            />
          )}
          {result === null && (
            <p>De evenementen kunnen op dit moment niet geladen worden.</p>
          )}
          {result && result.events.length === 0 && <p>{texts.empty}</p>}
          {result && result.events.length > 0 && (
            <>
              <ul className={styles.events}>
                {result.events.map((event) => (
                  <AgendaEventCard event={event} key={event.id} />
                ))}
              </ul>
              {result.totalPages > 1 && (
                <nav
                  className="pagination-nav"
                  aria-label="Paginering evenementen"
                >
                  {page > 1 && (
                    <PaginatorNavLink
                      permalink={pagePermalink(period, page - 1)}
                      title={texts.previousPage}
                    />
                  )}
                  {page < result.totalPages && (
                    <PaginatorNavLink
                      permalink={pagePermalink(period, page + 1)}
                      title={texts.nextPage}
                      isNext
                    />
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}
