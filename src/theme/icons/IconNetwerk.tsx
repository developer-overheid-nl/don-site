import type { SVGProps } from "react";
/**
 * Rijkshuisstijl icoon
 *
 * @param {SVGProps<SVGSVGElement>} props SVG Attributes
 * @returns {*} SVG Element
 *
 * Copyright Rijksoverheid
 *
 * Er gelden auteursrechten op de huisstijl en dit icoon.
 * Alleen partijen die een opdracht uitvoeren voor de Rijksoverheid en
 * daarvoor gebruik mogen maken van de huisstijl en het logo hebben
 * toestemming. Maar in alle andere gevallen is ieder gebruik verboden.
 */
const IconNetwerk = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="1em"
    height="1em"
    data-icon-name="netwerk"
    {...props}
  >
    <path d="M48.85 52H62v-3H48.85a7.43 7.43 0 0 0-2.22-3.96l8.15-13.21c.39.1.8.17 1.22.17 2.76 0 5-2.24 5-5s-2.24-5-5-5c-.56 0-1.1.11-1.6.29L45.17 9.74c.52-.79.84-1.72.84-2.73 0-2.76-2.24-5-5-5s-5.13 2.25-4.97 5.27l-14.51 6.77a7.5 7.5 0 0 0-5.78-3.03L14.2 2.01h-3.04l1.63 9.52a7.51 7.51 0 0 0-4.63 5.48H2v3h6.15c.54 2.66 2.48 4.8 5.02 5.63l-2.12 18.47a5.002 5.002 0 0 0 .95 9.91c2.15 0 3.96-1.36 4.67-3.26l17.42.89c.7 4.62 5.43 7.52 9.9 5.94l2.66 4.43h3.5l-3.59-5.98a7.5 7.5 0 0 0 2.29-4.02m-9.49-40.3c.5.17 1.03.28 1.59.28.66 0 1.3-.14 1.88-.37l9.14 12.43c-.12.16-.22.33-.31.5L33.28 20.7l6.07-8.99ZM51.05 27.5l.03.31-18.5 9.34-5.68-6.99 4.57-6.77 19.57 4.11ZM29.84 38.54l-13.05 6.59 8.35-12.37 4.69 5.78Zm-4.92-10.81-3.63-4.47a7 7 0 0 0 1.08-1.78l5.92 1.24-3.38 5Zm-5.96-2.58 4.2 5.17-9.06 13.41 2.04-17.76a7.5 7.5 0 0 0 2.82-.82m12.81 15.77 3.92 4.83c-.68.83-1.18 1.81-1.46 2.89l-16.12-.82 13.65-6.9Zm6.25 2.94-3.51-4.32 17.41-8.79-7.85 12.73a7.45 7.45 0 0 0-6.05.39m-1.31-33.6-6.61 9.78-7.12-1.49v-.04c0-.6-.08-1.18-.21-1.74l13.94-6.5Z" />
  </svg>
);
export default IconNetwerk;
