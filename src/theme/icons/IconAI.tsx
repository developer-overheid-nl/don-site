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
const IconAI = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="1em"
    height="1em"
    data-icon-name="ai"
    {...props}
  >
    <path d="M59,27L54,27L54,31L59,31L59,34L54,34L54,38L59,38L59,41L54,41L54,52.15C54,53.17 53.17,54 52.15,54L41,54L41,59L38,59L38,54L34,54L34,59L31,59L31,54L27,54L27,59L24,59L24,54L12.85,54C11.83,54 11,53.17 11,52.15L11,41L6,41L6,38L11,38L11,34L6,34L6,31L11,31L11,27L6,27L6,24L11,24L11,12.85C11,11.83 11.83,11 12.85,11L24,11L24,6L27,6L27,11L31,11L31,6L34,6L34,11L38,11L38,6L41,6L41,11L52.15,11C53.17,11 54,11.83 54,12.85L54,24L59,24zM48,47.57L48,17.43C48,17.19 47.81,17 47.57,17L17.43,17C17.19,17 17,17.19 17,17.43L17,47.57C17,47.81 17.19,48 17.43,48L47.57,48C47.81,48 48,47.81 48,47.57zM31.59,24.02L36.24,40L32.59,40L31.71,36.57L26.3,36.57L25.42,40L22.13,40L26.81,24.02zM41,24L41,40L38,40L38,24zM31.06,34.06L29.09,26.65L28.92,26.65L26.95,34.06z" />
  </svg>
);
export default IconAI;
