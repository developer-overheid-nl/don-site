const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

/**
 * Genereert /llms.txt volgens https://llmstxt.org.
 *
 * Het bestand is een index voor taalmodellen: per artikel een link naar de
 * markdown-bron in plaats van naar de HTML-pagina. Die bronbestanden publiceert
 * de site al via plugins/markdown-source-no-ui.js, dus dit voegt alleen de
 * wegwijzer toe en geen tweede kopie van de inhoud.
 *
 * Draait in postBuild, zodat de index altijd overeenkomt met wat er is gebouwd.
 */

const DOCS_DIR = "docs";
const BLOG_DIR = "blog";

const THEME_LABELS = {
  "api-ontwikkeling": "API Ontwikkeling",
  "front-end": "Front-end",
  data: "Data & Interoperabiliteit",
  "open-source": "Open Source",
  devops: "DevOps & Platform",
  security: "Security",
  ai: "AI",
  leidraad: "Leidraad softwareontwikkeling",
};

/** Volgorde zoals in het hoofdmenu, niet alfabetisch. */
const THEME_ORDER = Object.keys(THEME_LABELS);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name === "draft" ? [] : walk(fullPath);
    }
    return /\.mdx?$/.test(entry.name) ? [fullPath] : [];
  });
}

function firstSentence(content) {
  const body = content
    .replace(/^import .*$/gm, "")
    .replace(/^#.*$/gm, "")
    .replace(/^:::[\s\S]*?:::/gm, "")
    .replace(/^\s*[-|>].*$/gm, "")
    .trim();
  const paragraph = body.split(/\n\s*\n/).find((p) => p.trim().length > 40);
  if (!paragraph) return "";
  const plain = paragraph
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const sentence = plain.split(/(?<=\.)\s/)[0];
  return sentence.length > 180 ? `${sentence.slice(0, 177)}…` : sentence;
}

function titleOf(frontMatter, content, filePath) {
  if (frontMatter.title) return frontMatter.title;
  const heading = content.match(/^#\s+(.+)$/m);
  if (heading) return heading[1].trim();
  return path.basename(filePath, path.extname(filePath));
}

/** Bladpagina's krijgen <route>.md, indexpagina's <route>/index.md. */
function markdownUrl(filePath, baseDir, routeBase) {
  const relative = path.relative(baseDir, filePath).split(path.sep).join("/");
  const withoutExtension = relative.replace(/\.mdx?$/, "");
  const segments = withoutExtension
    .split("/")
    .map((segment) => segment.replace(/^\d+-/, ""));
  return `${routeBase}/${segments.join("/")}.md`;
}

function collect(baseDir, routeBase) {
  return walk(baseDir).map((filePath) => {
    const { data: frontMatter, content } = matter(
      fs.readFileSync(filePath, "utf8"),
    );
    return {
      filePath,
      title: titleOf(frontMatter, content, filePath),
      description: frontMatter.description || firstSentence(content),
      url: markdownUrl(filePath, baseDir, routeBase),
      theme: path.relative(baseDir, filePath).split(path.sep)[0],
      contentType: frontMatter.content_type || null,
    };
  });
}

function formatLine(siteUrl, item) {
  const description = item.description ? `: ${item.description}` : "";
  return `- [${item.title}](${siteUrl}${item.url})${description}`;
}

module.exports = function llmsTxtPlugin(context) {
  return {
    name: "llms-txt",

    async postBuild({ outDir, siteConfig }) {
      const siteUrl = siteConfig.url.replace(/\/$/, "");
      const docs = collect(DOCS_DIR, "/kennisbank");
      const blog = collect(BLOG_DIR, "/blog");

      const lines = [];
      lines.push("# developer.overheid.nl");
      lines.push("");
      lines.push(
        "> Het ontwikkelaarsportaal van de Nederlandse overheid. De kennisbank bevat " +
          "richtlijnen, standaarden, tutorials en tools voor iedereen die software " +
          "bouwt bij of voor de overheid.",
      );
      lines.push("");
      lines.push(
        "Elke pagina op deze site is ook beschikbaar als markdown: voeg `.md` toe " +
          "aan de URL van een artikel, of gebruik de links hieronder. Die " +
          "markdownversie is de bron; gebruik die in plaats van de HTML-pagina.",
      );
      lines.push("");
      lines.push(
        "De inhoud is een toelichting op standaarden en richtlijnen, niet de " +
          "officiële tekst ervan. Bij twijfel is de gepubliceerde standaard van de " +
          "beheerorganisatie leidend.",
      );
      lines.push("");

      for (const theme of THEME_ORDER) {
        const items = docs
          .filter((item) => item.theme === theme)
          .sort((a, b) => a.title.localeCompare(b.title, "nl"));
        if (!items.length) continue;
        lines.push(`## ${THEME_LABELS[theme]}`);
        lines.push("");
        items.forEach((item) => lines.push(formatLine(siteUrl, item)));
        lines.push("");
      }

      lines.push("## Registers");
      lines.push("");
      lines.push(
        `- [API-register](https://apis.developer.overheid.nl/apis): overzicht van API's van de Nederlandse overheid`,
      );
      lines.push(
        `- [Open source register](https://oss.developer.overheid.nl/repositories): overzicht van opensourceprojecten van de Nederlandse overheid`,
      );
      lines.push("");

      lines.push("## Optional");
      lines.push("");
      lines.push(
        `- [Blogoverzicht](${siteUrl}/blog): ${blog.length} artikelen over lopend werk, interviews en achtergronden`,
      );
      blog
        .sort((a, b) => b.url.localeCompare(a.url))
        .slice(0, 20)
        .forEach((item) => lines.push(formatLine(siteUrl, item)));
      lines.push("");

      const inhoud = `${lines.join("\n")}`;
      fs.writeFileSync(path.join(outDir, "llms.txt"), inhoud, "utf8");
      console.log(
        `[llms-txt] ${docs.length} kennisbankartikelen en ${blog.length} blogposts geïndexeerd`,
      );
    },
  };
};
