import { useState, useEffect } from 'react';
import { LinkListCard, LinkListLink } from "@rijkshuisstijl-community/components-react";
import styles from './styles.module.css';
import IconKalenderInline from '@site/src/theme/icons/IconKalenderInline';
import IconLocatiemarkerInline from '@site/src/theme/icons/IconLocatiemarkerInline';

const NUM_EVENTS = 4;

function formatDate(start_dateString, end_dateString) {
  const start_date = new Date(start_dateString);
  const end_date = new Date(end_dateString);

  if (Number.isNaN(start_date.valueOf()) || Number.isNaN(end_date.valueOf())) {
    return null;
  }
  
  if (start_date.getFullYear() === end_date.getFullYear() &&
    start_date.getMonth() === end_date.getMonth() &&
    start_date.getDate() === end_date.getDate()) 
  {
    // On the same day
    return `${new Intl.DateTimeFormat('nl-NL', {dateStyle: "long", timeStyle: "short"}).format(start_date)} - ${new Intl.DateTimeFormat('nl-NL', {timeStyle: "short"}).format(end_date)}`;
  } 
  else if (start_date.getFullYear() === end_date.getFullYear() &&
    start_date.getMonth() === end_date.getMonth())
  {
    // In the same month
    return `${new Intl.DateTimeFormat('nl-NL', {day: "numeric"}).format(start_date)} - ${new Intl.DateTimeFormat('nl-NL', {day: "numeric"}).format(end_date)} ${new Intl.DateTimeFormat('nl-NL', {month: "long", year: "numeric"}).format(start_date)}`;
  }
  // other
  return `${new Intl.DateTimeFormat('nl-NL', {dateStyle: "long"}).format(start_date)} - ${new Intl.DateTimeFormat('nl-NL', {dateStyle: "long"}).format(end_date)}`;
}

function filterDate(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.valueOf())) {
    // show if date cannot be parsed
    return true;
  }
  if (date.valueOf() > new Date().valueOf()) {
    // date is past current date
    return true;
  }
  return false;
}

export default function HomepageAgenda(): JSX.Element {
  const [agenda, setAgenda] = useState<Record<string, any>[] | null>(null);

  useEffect(function fetchFeed() {
    fetch('/agenda/events.json')
      .then((response) => response.json())
      .then((list) => {
        const events = list.filter(({ end_date }) => filterDate(end_date))
          .map(({ title, summary, start_date, end_date, place, url }) => ({
            title,
            summary,
            date: formatDate(start_date, end_date),
            place,
            url
          }))
          .slice(0, NUM_EVENTS);

        setAgenda(events);
      });
  }, []);

  return (
    <LinkListCard
      heading="Agenda"
      headingLevel={2}
    >
      { agenda && ((agenda.length > 0) ?
        agenda.map(({ title, summary, date, place, url }) => (
          <LinkListLink href={url}>
            <h3 className={styles.agendaTitle}>{title}</h3>
            <p className={styles.agendaMeta}>
              { date && (<span className={styles.agendaDate}><IconKalenderInline /> {date}</span>) }
              { place && (<span className={styles.agendaPlace}><IconLocatiemarkerInline /> {place}</span>) }
            </p>
            <p className={styles.agendaIntro}>{summary}</p>
          </LinkListLink>
      )) : (
        <li>Er zijn geen aankomende evenementen in de agenda.</li>
      )) || (
        <li><img src='/img/bouncing-squares.svg' width={42} alt='Agenda wordt geladen' /></li>
      ) }
    </LinkListCard>
  );
}
