// AgendaEvent of the Tools API (GET /events), limited to the fields the agenda shows.
export type AgendaEvent = {
  id: string;
  title: string;
  summary?: string;
  startsAt: string;
  endsAt: string;
  location?: string;
  url: string;
};

export type EventsApiConfig = {
  baseUrl: string;
  apiKey?: string;
};

export type EventsPage = {
  events: AgendaEvent[];
  totalPages: number;
};

type Pagination = { page?: number; perPage: number };

async function requestEvents(
  { baseUrl, apiKey }: EventsApiConfig,
  filter: Record<string, string>,
  { page = 1, perPage }: Pagination,
) {
  const query = new URLSearchParams({
    ...filter,
    page: String(page),
    perPage: String(perPage),
  });
  const response = await fetch(`${baseUrl}/events?${query}`, {
    headers: apiKey ? { "X-Api-Key": apiKey } : {},
  });
  if (!response.ok) {
    throw new Error(`Events API responded with ${response.status}`);
  }
  return {
    events: (await response.json()) as AgendaEvent[],
    totalCount: Number(response.headers.get("Total-Count") ?? 0),
    totalPages: Number(response.headers.get("Total-Pages") ?? 1),
  };
}

export async function fetchUpcomingEvents(
  config: EventsApiConfig,
  pagination: Pagination,
): Promise<EventsPage> {
  // The API filters on events that have not ended yet and sorts them by start time.
  const { events, totalPages } = await requestEvents(
    config,
    { endsAfter: new Date().toISOString() },
    pagination,
  );
  return { events, totalPages };
}

export async function fetchPastEvents(
  config: EventsApiConfig,
  { page = 1, perPage }: Pagination,
): Promise<EventsPage> {
  // The API only sorts oldest first, so page through the started events from
  // the end: page 1 holds the most recent ones. That range spans at most two
  // API pages.
  const now = new Date();
  const filter = { startsBefore: now.toISOString() };
  const { totalCount } = await requestEvents(config, filter, { perPage: 1 });
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  const last = totalCount - (page - 1) * perPage - 1;
  const first = Math.max(0, last - perPage + 1);
  if (last < 0) {
    return { events: [], totalPages };
  }

  const firstApiPage = Math.floor(first / perPage) + 1;
  const lastApiPage = Math.floor(last / perPage) + 1;
  const apiPages = await Promise.all(
    [firstApiPage, lastApiPage]
      .filter((apiPage, index, list) => list.indexOf(apiPage) === index)
      .map((apiPage) =>
        requestEvents(config, filter, { page: apiPage, perPage }),
      ),
  );
  const offset = (firstApiPage - 1) * perPage;
  const events = apiPages
    .flatMap(({ events }) => events)
    .slice(first - offset, last - offset + 1)
    .reverse()
    // Events that are still running are listed as upcoming events.
    .filter(({ endsAt }) => new Date(endsAt) < now);
  return { events, totalPages };
}

export function formatDate(start_dateString: string, end_dateString: string) {
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
