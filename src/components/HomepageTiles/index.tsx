import { cloneElement } from "react";
import tiles from "./tiles";
import styles from './styles.module.css';

export default function HomepageTiles(): React.JSX.Element {
  const tileItems = tiles.map(({icon, title, link, description, highlight}, index) => {
    const Description = 
      typeof description === 'string' ? <p>{description}</p> : (
        <p>
          {description.map(({link, external, label}, i) => {
            return (
              <>
                <a key={i} href={link} className={styles.link}>{label}{external && <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.externalLinkIcon}><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>}</a>
                <span className={styles.spacer}>, </span>
              </>
            );
          })}
          <span>…</span>
        </p>
      );

    return (
      <li key={index} className={styles.tile}>
        {cloneElement(icon, { className: styles.icon, 'aria-hidden': true, focusable: false })}
        { highlight ? <span className={styles.highlight}>{highlight}</span> : null}
        <h2 className={styles.title}><a href={link}>{title}</a></h2>
        {Description}
      </li>
    );
  });

  return (
    <section className="container">
        <ul className={styles.tiles}>
          {tileItems}
        </ul>
    </section>
  );
}
