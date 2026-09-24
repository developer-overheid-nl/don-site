import { useEffect, useId, useRef, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import RobotIcon from "./RobotIcon";
import styles from "./styles.module.css";

/**
 * Knop met acties om een pagina aan een AI-assistent te voeren.
 *
 * De site publiceert naast elke pagina de markdown-bron (zie
 * plugins/markdown-source-no-ui.js). Die versie is schoner dan de HTML en is
 * hier het uitgangspunt: kopiëren, bekijken en de prompt verwijzen er allemaal
 * naar.
 *
 * De aanroeper geeft de markdown-URL mee, omdat docs en blog die elk uit hun
 * eigen context halen.
 */

type AiMenuProps = {
  /** Pad naar de markdown-bron, bijvoorbeeld /kennisbank/.../eda.md */
  markdownPath: string;
  title: string;
};

type CopyStatus = "idle" | "pending" | "copied" | "failed";

export default function AiMenu({ markdownPath, title }: AiMenuProps) {
  const { siteConfig } = useDocusaurusContext();
  const [isOpen, setIsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const markdownUrl = `${siteConfig.url.replace(/\/$/, "")}${markdownPath}`;
  const prompt = encodeURIComponent(
    `Ik lees "${title}" op developer.overheid.nl en wil er vragen over stellen. De volledige tekst staat op ${markdownUrl}`,
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    function onClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isOpen]);

  async function copyMarkdown() {
    setCopyStatus("pending");
    try {
      const response = await fetch(markdownPath);
      if (!response.ok) throw new Error(String(response.status));
      await navigator.clipboard.writeText(await response.text());
      setCopyStatus("copied");
    } catch (e) {
      setCopyStatus("failed");
    }
    window.setTimeout(() => setCopyStatus("idle"), 4000);
  }

  const copyLabel = {
    idle: "Kopieer pagina als Markdown",
    pending: "Bezig met kopiëren…",
    copied: "Gekopieerd naar klembord",
    failed: "Kopiëren mislukt",
  }[copyStatus];

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        ref={buttonRef}
        className={styles.button}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <RobotIcon />
        AI
      </button>

      <div
        id={menuId}
        role="menu"
        className={styles.menu}
        hidden={!isOpen}
        aria-label="AI-acties voor deze pagina"
      >
        <button
          type="button"
          role="menuitem"
          className={styles.item}
          onClick={copyMarkdown}
        >
          {copyLabel}
        </button>

        <a role="menuitem" className={styles.item} href={markdownPath}>
          Bekijk als Markdown
        </a>

        <a
          role="menuitem"
          className={styles.item}
          href={`https://claude.ai/new?q=${prompt}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Claude
        </a>

        <a
          role="menuitem"
          className={styles.item}
          href={`https://chatgpt.com/?q=${prompt}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in ChatGPT
        </a>
      </div>

      <span role="status" aria-live="polite" className={styles.status}>
        {copyStatus === "copied" || copyStatus === "failed" ? copyLabel : ""}
      </span>
    </div>
  );
}
