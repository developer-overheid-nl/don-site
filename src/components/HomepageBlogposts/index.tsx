import { useState, useEffect } from 'react';
import Admonition from "@theme/Admonition";
import { LinkListCard, LinkListLink } from "@rijkshuisstijl-community/components-react";
import styles from './styles.module.css';

const NUM_POSTS = 4;

function formatDate(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.valueOf())) {
    return null;
  }

  return new Intl.DateTimeFormat('nl-NL', {dateStyle: "long"}).format(date);
}

export default function HomepageBlogposts(): React.JSX.Element {
  const [feed, setFeed] = useState<Record<string, any>[] | null>(null);

  useEffect(function fetchFeed() {
    fetch('/blog/feed.json')
      .then((response) => response.json().catch((error) => {
        console.warn("JSON Error: ", error.message);
        return {
          items: []
        };
      }))
      .then((feed) => {
        const posts = feed.items.map(( {title, summary, date_modified, url} ) => ({
          title,
          summary,
          date: formatDate(date_modified),
          url
        }))
        .slice(0, NUM_POSTS);

        setFeed(posts);
      }).catch((error) => {
        console.error("Fetch Error: ", error.message);
      });
  }, []);

  return (
    <LinkListCard
      heading="Laatste blogposts"
      headingLevel={2}
    >
      { process.env.NODE_ENV === 'development' ? (
          <Admonition type='caution' title="Let op">De feed wordt niet opgebouwd in development.</Admonition>
       ) : null
      }
      { feed && ((feed.length > 0) ? feed.map(({title, date, summary, url}, index) => (
        <LinkListLink href={url} key={index}>
          <h3 className={styles.blogTitle}>{title}</h3>
          <p className={styles.blogMeta}>{date}</p>
          <p className={styles.blogIntro}>{summary}</p>
        </LinkListLink>
      )) : (
        <li>De laatste blogposts kunnen niet geladen worden.</li>
      )) || (
        <li><img src='/img/bouncing-squares.svg' width={42} alt='Blogposts worden geladen' /></li>
      )}
    </LinkListCard>
  );
}
