import IconLocatiemarkerInline from "@site/src/theme/icons/IconLocatiemarkerInline";
import { type AgendaEvent } from "./api";
import styles from "./card.module.css";

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatWhen(startsAt: string, endsAt: string) {
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  if (Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf())) {
    return null;
  }

  const date = new Intl.DateTimeFormat("nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = new Intl.DateTimeFormat("nl-NL", { timeStyle: "short" });
  return {
    day: new Intl.DateTimeFormat("nl-NL", { day: "numeric" }).format(start),
    month: new Intl.DateTimeFormat("nl-NL", { month: "short" }).format(start),
    dates: isSameDay(start, end)
      ? date.format(start)
      : `${date.format(start)} t/m ${date.format(end)}`,
    times: `${time.format(start)} - ${time.format(end)}`,
  };
}

type AgendaEventCardProps = {
  event: AgendaEvent;
};

export default function AgendaEventCard({
  event: { title, summary, startsAt, endsAt, location, url },
}: AgendaEventCardProps): React.JSX.Element {
  const when = formatWhen(startsAt, endsAt);
  return (
    <li className={styles.card}>
      <a href={url} target="_blank" rel="noopener" className={styles.link}>
        <h2 className={styles.title}>{title}</h2>
        {when && (
          <div className={styles.when}>
            <span className={styles.calendarBlock} aria-hidden="true">
              <span className={styles.calendarDay}>{when.day}</span>
              <span className={styles.calendarMonth}>{when.month}</span>
            </span>
            <span>
              <span className={styles.dates}>{when.dates}</span>
              <span className={styles.times}>{when.times}</span>
            </span>
          </div>
        )}
        {location && (
          <span className={styles.location}>
            <IconLocatiemarkerInline /> {location}
          </span>
        )}
        {summary && <p className={styles.summary}>{summary}</p>}
      </a>
    </li>
  );
}
