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
const IconDocumentMetVlakkenEnLijnenErop = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="1em" height="1em" data-icon-name="document-met-vlakken-en-lijnen-erop" {...props}><defs><clipPath id="clippath"><path d="M0 0h64v64H0z" className="cls-1" /></clipPath><clipPath id="clippath-1"><path d="M0 0h64v64H0z" className="cls-1" /></clipPath><style>{".cls-1{fill:none}"}</style></defs><g style={{
    clipPath: "url(#clippath)"
  }}><path d="M20 15h24v5H20zM20 41h24v3H20zM20 46h18v3H20zM20 24h10v3H20zM20 29h10v3H20zM20 34h10v3H20zM33 24h11v13H33z" /><path d="M50 7H14c-1.1 0-2 .9-2 2v46c0 1.1.9 2 2 2h36c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2m-3 45H17V12h30z" style={{
      clipPath: "url(#clippath-1)"
    }} /></g></svg>;
export default IconDocumentMetVlakkenEnLijnenErop;