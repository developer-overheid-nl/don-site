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
const IconApiInrichting = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="1em"
    height="1em"
    data-icon-name="api-inrichting"
    {...props}
  >
    <path d="M20.29 37.79h4.27l.76 2.96H29l-4.16-14.27h-4.49l-4.18 14.27h3.36zm2.13-8.1 1.45 5.42h-2.9zM34.13 36.1c.37.04.75.05 1.24.05 3.19 0 5.33-2.04 5.33-5.08 0-2.83-1.95-4.6-5.08-4.6H30.9v14.27h3.23v-4.65Zm-.04-6.96h1.11c1.42 0 2.14.71 2.14 2.12s-.87 2.21-2.33 2.21c-.34 0-.65-.02-.93-.05v-4.28ZM42.88 26.48h3.23v14.27h-3.23z" />
    <path d="M54 12H10c-1.66 0-3 1.34-3 3v34c0 1.66 1.34 3 3 3h44c1.66 0 3-1.34 3-3V15c0-1.66-1.34-3-3-3m-37.5 2c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5m-5 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5M54 49H10V19h44z" />
  </svg>
);
export default IconApiInrichting;
