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
const IconLocatiemarkerInline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    data-icon-name="locatiemarker-inline"
    {...props}
  >
    <defs>
      <clipPath id="clippath">
        <path d="M0 0h24v24H0z" className="cls-1" />
      </clipPath>
      <clipPath id="clippath-1">
        <path d="M0 0h24v24H0z" className="cls-1" />
      </clipPath>
      <style>{".cls-1{fill:none}"}</style>
    </defs>
    <g
      style={{
        clipPath: "url(#clippath)",
      }}
    >
      <g
        style={{
          clipPath: "url(#clippath-1)",
        }}
      >
        <path d="M12 1C8.13 1 5 4.13 5 8c0 1.31.47 2.53.99 3.72.43.97 3.71 7.46 5.24 10.47h.01c.14.28.43.48.76.48s.62-.2.76-.48h.01c1.53-3 4.81-9.49 5.24-10.47.52-1.19.99-2.42.99-3.72 0-3.87-3.13-7-7-7m0 11.2a4.2 4.2 0 1 1-.001-8.399A4.2 4.2 0 0 1 12 12.2" />
        <path d="M12 6.16c-.99 0-1.8.81-1.8 1.8s.81 1.8 1.8 1.8 1.8-.81 1.8-1.8-.81-1.8-1.8-1.8" />
      </g>
    </g>
  </svg>
);
export default IconLocatiemarkerInline;
