import { useEffect, useId, useRef, type MouseEvent } from "react";
import Mermaid from "@theme-original/Mermaid";
import type MermaidType from "@theme/Mermaid";
import type { WrapperProps } from "@docusaurus/types";

import IconFotoVergrotenInline from "@site/src/theme/icons/IconFotoVergrotenInline";
import IconKruisInline from "@site/src/theme/icons/IconKruisInline";

import styles from "./styles.module.css";

type Props = WrapperProps<typeof MermaidType>;

/**
 * Maakt een Mermaid-diagram zoombaar: een klik op het diagram of op het
 * vergrootglas opent het schermvullend in een dialog.
 *
 * Openen en sluiten gaan via de Invoker Commands API (`command`/`commandfor`),
 * dus de browser regelt de dialog-interactie. Vlak voor het openen vult een
 * `command`-listener de dialog met een kopie van de al gerenderde SVG, zodat
 * Mermaid niet opnieuw hoeft te renderen. Escape en een klik op de achtergrond
 * sluiten hem.
 */
export default function MermaidWrapper(props: Props): React.JSX.Element {
  const dialogId = useId();
  const diagramRef = useRef<HTMLDivElement>(null);
  const zoomButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Het command-event komt binnen voordat de browser de dialog opent.
    const onCommand = (event: Event & { command?: string }) => {
      if (event.command !== "show-modal") return;
      const svg = diagramRef.current?.querySelector("svg");
      if (!svg || !contentRef.current) {
        event.preventDefault();
        return;
      }
      // Set content for diagram.
      contentRef.current.innerHTML = svg.outerHTML;
    };

    dialog.addEventListener("command", onCommand);
    return () => dialog.removeEventListener("command", onCommand);
  }, []);

  const onDiagramClick = (event: MouseEvent) => {
    // Links in een diagram moeten gewoon blijven werken.
    if ((event.target as Element).closest("a")) return;
    zoomButtonRef.current?.click();
  };

  return (
    <div className={styles.wrapper}>
      <div ref={diagramRef} className={styles.diagram} onClick={onDiagramClick}>
        <Mermaid {...props} />
      </div>
      <button
        type="button"
        ref={zoomButtonRef}
        className={`${styles.iconButton} ${styles.zoomButton}`}
        command="show-modal"
        commandfor={dialogId}
        aria-label="Diagram vergroten"
        title="Diagram vergroten"
      >
        <IconFotoVergrotenInline
          width={20}
          height={20}
          fill="currentColor"
          aria-hidden="true"
        />
      </button>
      <dialog
        ref={dialogRef}
        id={dialogId}
        className={styles.dialog}
        aria-label="Vergroot diagram"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <button
          type="button"
          className={`${styles.iconButton} ${styles.closeButton}`}
          command="close"
          commandfor={dialogId}
          aria-label="Sluiten"
          title="Sluiten (Esc)"
        >
          <IconKruisInline
            width={20}
            height={20}
            fill="currentColor"
            aria-hidden="true"
          />
        </button>
        <div ref={contentRef} className={styles.content} />
      </dialog>
    </div>
  );
}
