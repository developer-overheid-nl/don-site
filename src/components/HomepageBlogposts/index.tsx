// import useEffect from 'react';
import { useState, useEffect } from 'react';
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

export default function HomepageBlogposts(): JSX.Element {
  const [feed, setFeed] = useState<Record<string, any>[] | null>(null);

  useEffect(function fetchFeed() {
    fetch('/blog/feed.json')
      .then((response) => response.json())
      .then((feed) => {
        const posts = feed.items.map(( {title, summary, date_modified, url} ) => ({
          title,
          summary,
          date: formatDate(date_modified),
          url
        }))
        .slice(0, NUM_POSTS);

        setFeed(posts);
      });
  }, []);

  return (
    <LinkListCard
      heading="Laatste blogposts"
      headingLevel={2}
    >
      { feed && ((feed.length > 0) ? feed.map(({title, date, summary, url}) => (
        <LinkListLink href={url}>
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
