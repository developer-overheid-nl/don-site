import { cloneElement } from "react";
import tiles from "./tiles";
import IconLadeArchiefkast from '@site/src/theme/icons/IconLadeArchiefkast';
import styles from './styles.module.css';

export default function HomepageTiles(): React.JSX.Element {
  const tileItems = tiles.map(({icon, title, link, description}, index) => {
    console.log({icon, title, link, description}, index);
    const Description = 
      typeof description === 'string' ? <p>{description}</p> : (
        <p>
          {description.map(({link, label}, i) => {
            return (
              <>
                <a key={i} href={link} className={styles.link}>{label}</a>
                <span>, </span>
              </>
            );
          })}
          <span>…</span>
        </p>
      );

    return (
      <li key={index} className={styles.tile}>
        {cloneElement(icon, { className: styles.icon })}
        <h2 className={styles.title}><a href={link}>{title}</a></h2>
        {Description}
      </li>
    );
  });

  console.log(tiles, tileItems);

  return (
    <section className="container">
      {/* <div className="container"> */}
        <ul className={styles.tiles}>
          {tileItems}
        </ul>
      {/* </div> */}
    </section>
  );
}
