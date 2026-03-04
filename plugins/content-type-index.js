const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const DOCS_DIR = path.resolve(__dirname, "..", "docs");
const ROUTE_BASE = "/kennisbank";

function filePathToUrl(filePath, slug) {
  const relative = path.relative(DOCS_DIR, filePath);
  if (slug) {
    // If slug is absolute (starts with /), use as-is; otherwise resolve relative to category
    if (slug.startsWith("/")) {
      return ROUTE_BASE + slug;
    }
    const dir = path.dirname(relative);
    return ROUTE_BASE + "/" + dir + "/" + slug;
  }

  // Remove extension
  let url = relative.replace(/\.(mdx?)$/, "");

  // Handle index files — use the directory path
  url = url.replace(/\/index$/, "");
  if (url === "index") url = "";

  // Strip numeric prefixes from path segments (Docusaurus default behavior)
  url = url
    .split("/")
    .map((segment) => segment.replace(/^\d+-/, ""))
    .join("/");

  return ROUTE_BASE + (url ? "/" + url : "");
}

function extractTitleFromContent(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function scanDocs() {
  const items = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Skip draft directory
        if (entry.name === "draft") continue;
        walk(fullPath);
      } else if (/\.(md|mdx)$/.test(entry.name)) {
        const raw = fs.readFileSync(fullPath, "utf-8");
        const { data: frontmatter, content } = matter(raw);

        if (!frontmatter.content_type) continue;

        const relative = path.relative(DOCS_DIR, fullPath);
        const category = relative.split(path.sep)[0];

        const title =
          frontmatter.title ||
          frontmatter.sidebar_label ||
          extractTitleFromContent(content) ||
          path.basename(fullPath, path.extname(fullPath));

        items.push({
          title,
          description: frontmatter.description || "",
          contentType: frontmatter.content_type,
          tags: frontmatter.tags || [],
          category,
          url: filePathToUrl(fullPath, frontmatter.slug),
        });
      }
    }
  }

  walk(DOCS_DIR);
  return items;
}

module.exports = function contentTypeIndexPlugin() {
  return {
    name: "content-type-index",
    async loadContent() {
      return scanDocs();
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};
