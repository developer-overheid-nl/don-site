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
const IconDocumentBlanco = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="1em"
    height="1em"
    data-icon-name="document-blanco"
    {...props}
  >
    <defs>
      <clipPath id="clippath">
        <path d="M0 0h64v64H0z" className="cls-1" />
      </clipPath>
      <clipPath id="clippath-1">
        <path d="M0 0h64v64H0z" className="cls-1" />
      </clipPath>
      <style>{".cls-1{fill:none}"}</style>
    </defs>
    <g
      style={{
        clipPath: "url(#clippath)",
      }}
    >
      <path
        d="M51.41 22.41 36.58 7.58c-.38-.38-.88-.59-1.41-.59H14a2 2 0 0 0-2 2V55c0 1.1.9 2 2 2h36c1.1 0 2-.9 2-2V23.83c0-.53-.21-1.04-.59-1.41m-1.27 1.94-3.15.93V52H17V12h16.71l.93-3.14c.11-.34.36-.23.36-.23V23c0 .55.45 1 1 1h14.37s.12.25-.22.36"
        style={{
          clipPath: "url(#clippath-1)",
        }}
      />
    </g>
  </svg>
);
export default IconDocumentBlanco;
