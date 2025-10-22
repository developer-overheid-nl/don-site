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
const IconDeltaOmhoogInline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    data-icon-name="delta-omhoog-inline"
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
      <path
        d="M.95 18.34c1.01 1.01 2.3 1.35 3.31.34l7.75-7.75 7.75 7.75c1.01 1.01 2.3.66 3.3-.34 1.01-1.01 1.35-2.3.34-3.3l-9.58-9.57a2.577 2.577 0 0 0-3.65 0L.61 15.04c-1.01 1.01-.66 2.3.34 3.3"
        style={{
          clipPath: "url(#clippath-1)",
        }}
      />
    </g>
  </svg>
);
export default IconDeltaOmhoogInline;
