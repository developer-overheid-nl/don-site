import { LinkListLink } from "@rijkshuisstijl-community/components-react";
import IconKalenderInline from "@site/src/theme/icons/IconKalenderInline";
import IconLocatiemarkerInline from "@site/src/theme/icons/IconLocatiemarkerInline";
import { type AgendaEvent, formatDate } from "./api";
import styles from "./styles.module.css";

type AgendaEventLinkProps = {
  event: AgendaEvent;
};

export default function AgendaEventLink({
  event: { title, summary, startsAt, endsAt, location, url },
}: AgendaEventLinkProps): React.JSX.Element {
  const date = formatDate(startsAt, endsAt);
  return (
    <LinkListLink href={url} target="_blank">
      <h3 className={styles.agendaTitle}>{title}</h3>
      <p className={styles.agendaMeta}>
        {date && (
          <span className={styles.agendaDate}>
            <IconKalenderInline /> {date}
          </span>
        )}
        {location && (
          <span className={styles.agendaPlace}>
            <IconLocatiemarkerInline /> {location}
          </span>
        )}
      </p>
      <p className={styles.agendaIntro}>{summary}</p>
    </LinkListLink>
  );
}
