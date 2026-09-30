import { useEffect, useRef, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import DropdownNavbarItem from "@site/src/theme/NavbarItem/DropdownNavbarItem";
import IconAI from "@site/src/theme/icons/IconAI";
import styles from "./styles.module.css";

function promptText(title: string, url: string) {
  return `Ik lees "${title}" op developer.overheid.nl en wil er vragen over stellen. De volledige tekst staat op ${url}`;
}

function promptQueryParam(title: string, url: string) {
  return encodeURIComponent(promptText(title, url));
}

type PromptSource = "md" | "html";

// Add a new entry here to expose another AI service in the dropdown.
const AiServices: { label: string; serviceLink: string; promptSource: PromptSource }[] = [
  {
    label: "Open in Claude",
    serviceLink: "https://claude.ai/new?q={{prompt}}",
    promptSource: "md", // works
  },
  {
    label: "Open in ChatGPT",
    serviceLink: "https://chatgpt.com/?q={{prompt}}",
    promptSource: "html", // open-ai kan niet direct met md omgaan, html gaat wel goed
  },
  {
    label: "Open in Google",
    serviceLink: "https://google.com/search?q={{prompt}}", // gebruiker moet zelf op AI modus klikken
    promptSource: "html",
  },
];

type CopyStatus = "idle" | "pending" | "copied" | "failed";

const COPY_STATUS_LABELS: Record<Exclude<CopyStatus, "idle">, string> = {
  pending: "Bezig met kopiëren…",
  copied: "Gekopieerd naar klembord",
  failed: "Kopiëren mislukt",
};

function copyStatusLabel(status: CopyStatus, idleLabel: string) {
  return status === "idle" ? idleLabel : COPY_STATUS_LABELS[status];
}

// Screen-reader-only announcement for a copy action, phrased around what
// was (or is being) copied. Returns null while idle so it contributes
// nothing to the shared live region below.
function copyStatusMessage(status: CopyStatus, subject: string): string | null {
  switch (status) {
    case "pending":
      return `Bezig met kopiëren van ${subject}…`;
    case "copied":
      return `${subject} gekopieerd naar klembord`;
    case "failed":
      return `Kopiëren van ${subject} mislukt`;
    case "idle":
      return null;
  }
}

const COPY_RESET_DELAY_MS = 4000;

// Reusable status machine for a single "copy X to clipboard" action:
// idle -> pending -> copied/failed -> (after a delay) idle.
// Centralizing this means new copy actions (e.g. "copy as citation") are
// just another call to this hook, and the reset-timer/unmount handling
// only has to be correct once.
function useClipboardCopy(getText: () => Promise<string> | string) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
  }, []);

  async function copy() {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    setStatus("pending");
    try {
      await navigator.clipboard.writeText(await getText());
      setStatus("copied");
    } catch (e) {
      console.error("Failed to copy to clipboard:", e);
      setStatus("failed");
    }
    resetTimerRef.current = setTimeout(() => setStatus("idle"), COPY_RESET_DELAY_MS);
  }

  return [status, copy] as const;
}

interface AiDropdownProps {
  permalink: string;
  title: string;
  label: string;
}

export default function AiDropdown({ permalink, title, label }: AiDropdownProps) {
  const { siteConfig } = useDocusaurusContext();

  const markdownPath = permalink.endsWith("/")
    ? `${permalink}index.md`
    : `${permalink}.md`;
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const markdownUrl = `${baseUrl}${markdownPath}`;
  const pageUrl = `${baseUrl}${permalink}`;

  const [copyMarkdownStatus, copyMarkdown] = useClipboardCopy(async () => {
    const response = await fetch(markdownPath);
    if (!response.ok) throw new Error(String(response.status));
    return response.text();
  });

  const [copyPromptStatus, copyPrompt] = useClipboardCopy(() => promptText(title, pageUrl));

  const MARKDOWN_COPY_SUBJECT = "pagina als Markdown";
  const PROMPT_COPY_SUBJECT = "prompt";

  const copyMarkdownLabel = copyStatusLabel(copyMarkdownStatus, `Kopieer ${MARKDOWN_COPY_SUBJECT}`);
  const copyPromptLabel = copyStatusLabel(copyPromptStatus, `Kopieer ${PROMPT_COPY_SUBJECT}`);

  // Only one of these is normally active at a time; if both are (a second
  // copy click lands while the first is still resolving) the markdown
  // action's message takes priority since it's the slower, fetch-backed one.
  const liveStatusMessage =
    copyStatusMessage(copyMarkdownStatus, MARKDOWN_COPY_SUBJECT) ??
    copyStatusMessage(copyPromptStatus, PROMPT_COPY_SUBJECT) ??
    "";

  return (
    <>
      <nav className={`${styles.aiDropdown}`} aria-label={label} id="ai-menu">
        <DropdownNavbarItem
          position="right"
          label={<IconAI width={`1.5em`} height={`1.5em`} aria-hidden="true" />}
          aria-labelledby="ai-menu"
          items={[
            {
              label: "Bekijk als Markdown",
              href: markdownPath,
            },
            {
              label: copyMarkdownLabel,
              onClick: copyMarkdown,
              className: styles.copyLink,
            },
            {
              label: copyPromptLabel,
              onClick: copyPrompt,
              className: styles.copyLink,
            },
            ...AiServices.map(({ label, serviceLink, promptSource }) => (
              {
                label,
                href: serviceLink.replace(
                  "{{prompt}}",
                  promptQueryParam(title, promptSource === "md" ? markdownUrl : pageUrl),
                ),
                target: "_blank",
                rel: "noopener noreferrer",
              }
            )),
          ]}
        />
      </nav>
      <span role="status" aria-live="polite" className="visual-hidden">
        {liveStatusMessage}
      </span>
    </>
  );
}
