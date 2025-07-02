import React from "react";
import clsx from "clsx";
import styles from './styles.module.css';

export type GridTile = {
  icon: React.ReactNode;
  title: string;
  description: string | { link: string; label: string; external?: boolean }[];
  link?: string;
  highlight?: 'uitgelicht' | 'nieuw' | 'tutorial';
  external?: boolean;
};

const ExternalLinkIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.externalLinkIcon}>
    <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path>
  </svg>
);

export default function TilesGrid({ tiles, paddingY }): React.ReactNode {
  const tileItems = tiles.map(({ icon, title, link, external, description, highlight }, i) => {
    const Description =
      typeof description === 'string' ? <p>{description}</p> : (
        <p>
          {description.map(({ link, external, label }, j) => {
            return (
              <React.Fragment key={j}>
                <a href={link} className={styles.link}>{label}{external && <ExternalLinkIcon />}</a>
                <span className={styles.spacer}>, </span>
              </React.Fragment>
            );
          })}
          <span>…</span>
        </p>
      );

    return (
      <li key={i} className={styles.tile}>
        <h2 className={styles.title}>{link ? <a href={link}>{title}{external && <ExternalLinkIcon />}</a> : title}</h2>
        <div className={styles.iconRow}>
          {React.cloneElement(icon, { className: styles.icon, 'aria-hidden': true, focusable: false })}
          {highlight ? <span className={`${styles.highlight} highlight--${highlight}`}>{highlight}</span> : null}
        </div>
        {Description}
      </li>
    );
  });

  return (
    <ul className={clsx(styles.tiles, paddingY && styles['tiles--sparse'])}>
      {tileItems}
    </ul>
  );
}
