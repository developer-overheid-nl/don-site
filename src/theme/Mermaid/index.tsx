import { useRef, type MouseEvent } from "react";
import Mermaid from "@theme-original/Mermaid";
import type MermaidType from "@theme/Mermaid";
import type { WrapperProps } from "@docusaurus/types";

import styles from "./styles.module.css";

type Props = WrapperProps<typeof MermaidType>;

const ZoomIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5M10.5 7.5v6M7.5 10.5h6" />
    </g>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6 6 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Maakt een Mermaid-diagram vergrootbaar: een klik op het diagram of op het
 * vergrootglas opent het schermvullend in een dialog.
 *
 * De dialog krijgt een kopie van de al gerenderde SVG, zodat Mermaid niet
 * opnieuw hoeft te renderen. Escape en een klik op de achtergrond sluiten hem.
 */
export default function MermaidWrapper(props: Props): React.JSX.Element {
  const diagramRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const open = () => {
    const svg = diagramRef.current?.querySelector("svg");
    if (!svg || !dialogRef.current || !contentRef.current) return;
    contentRef.current.innerHTML = svg.outerHTML;
    dialogRef.current.showModal();
  };

  const close = () => dialogRef.current?.close();

  const onDiagramClick = (event: MouseEvent) => {
    // Links in een diagram moeten gewoon blijven werken.
    if ((event.target as Element).closest("a")) return;
    open();
  };

  return (
    <div className={styles.wrapper}>
      <div ref={diagramRef} className={styles.diagram} onClick={onDiagramClick}>
        <Mermaid {...props} />
      </div>
      <button
        type="button"
        className={`${styles.iconButton} ${styles.zoomButton}`}
        onClick={open}
        aria-label="Diagram vergroten"
        title="Diagram vergroten"
      >
        <ZoomIcon />
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label="Vergroot diagram"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <button
          type="button"
          className={`${styles.iconButton} ${styles.closeButton}`}
          onClick={close}
          aria-label="Sluiten"
          title="Sluiten (Esc)"
        >
          <CloseIcon />
        </button>
        <div ref={contentRef} className={styles.content} />
      </dialog>
    </div>
  );
}
