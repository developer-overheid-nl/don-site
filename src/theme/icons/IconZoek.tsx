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
const IconZoek = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="1em"
    height="1em"
    data-icon-name="zoek"
    {...props}
  >
    <path
      d="M0 0h64v64H0z"
      style={{
        fill: "none",
      }}
    />
    <path d="M59.18 52.24 44.21 38.35c-2.19 1.97-4 2.71-4.47 2.87-.27.09-.42.03-.48-.08.31-.27 2.38-2.32 3.57-4.07 1.99-2.94 3.08-6.52 3.08-10.33 0-10.45-8.48-18.93-18.93-18.93S8.06 16.28 8.06 26.74s8.48 18.93 18.93 18.93c3.81 0 7.36-1.14 10.33-3.08l15.17 16.34c1.1 1.1 3.34 2.11 5.42.02.89-.89.61-.62 1.6-1.68 1.58-1.68.77-3.94-.33-5.04ZM26.99 38.17c-6.28 0-11.39-5.11-11.39-11.39s5.11-11.39 11.39-11.39 11.39 5.11 11.39 11.39-5.11 11.39-11.39 11.39" />
  </svg>
);
export default IconZoek;
