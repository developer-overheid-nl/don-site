const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { globSync } = require("glob");

/**
 * Strip number prefixes from path segments (e.g., "1-foo" → "foo")
 * to match Docusaurus' default numberPrefixParser behavior.
 */
function stripNumberPrefix(segment) {
  return segment.replace(/^\d+-/, "");
}

module.exports = function contentTypeIndexPlugin(context) {
  return {
    name: "content-type-index",

    async contentLoaded({ actions }) {
      const { setGlobalData } = actions;

      const docsDir = path.join(context.siteDir, "docs");
      const files = globSync("**/*.{md,mdx}", { cwd: docsDir });

      const index = [];

      for (const file of files) {
        const filePath = path.join(docsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        if (data.content_type) {
          // Use frontmatter title, or fall back to the first # heading
          let title = data.title || "";
          if (!title) {
            const headingMatch = content.match(/^#\s+(.+)$/m);
            if (headingMatch) {
              title = headingMatch[1].trim();
            }
          }
          // Build the doc path: remove extension, remove trailing /index
          let docPath = file
            .replace(/\.(md|mdx)$/, "")
            .replace(/\/index$/, "");

          // Strip number prefixes from each path segment to match
          // Docusaurus URL generation (numberPrefixParser)
          docPath = docPath
            .split("/")
            .map(stripNumberPrefix)
            .join("/");

          // Use slug from frontmatter if available
          if (data.slug) {
            const parts = docPath.split("/");
            parts[parts.length - 1] = data.slug;
            docPath = parts.join("/");
          }

          // Extract category from path (first folder)
          const category = docPath.split("/")[0] || "";

          index.push({
            id: docPath,
            title,
            description: data.description || "",
            contentType: data.content_type,
            tags: data.tags || [],
            category,
            path: `/kennisbank/${docPath}`,
          });
        }
      }

      setGlobalData({ contentTypeIndex: index });
    },
  };
};
