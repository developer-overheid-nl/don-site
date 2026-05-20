import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const matter = require("gray-matter");

const SITE_URL = process.env.SITE_URL || "https://developer.overheid.nl";
const TYPESENSE_ENDPOINT = process.env.TYPESENSE_ENDPOINT;
const TYPESENSE_API_KEY = process.env.TYPESENSE_API_KEY;
const COLLECTION_PREFIX = "developer_overheid";
const BUILD_DIR = process.env.MARKDOWN_BUILD_DIR || "build";
const DOCS_DIR = process.env.DOCS_DIR || "docs";
const BLOG_DIR = process.env.BLOG_DIR || "blog";
const COMMUNITIES_DIR = process.env.COMMUNITIES_DIR || "communities";
const DRY_RUN = process.env.DRY_RUN === "true";

const CONTENT_TYPES = {
  standaard: {
    label: "Standaard",
    collection: `${COLLECTION_PREFIX}_standaard`,
  },
  tutorial: {
    label: "Tutorial",
    collection: `${COLLECTION_PREFIX}_tutorials`,
  },
  tool: {
    label: "Tool",
    collection: `${COLLECTION_PREFIX}_tools`,
  },
  architectuur: {
    label: "Architectuur",
    collection: `${COLLECTION_PREFIX}_architectuur`,
  },
  richtlijn: {
    label: "Richtlijn",
    collection: `${COLLECTION_PREFIX}_richtlijn`,
  },
};

const EXTRA_COLLECTIONS = {
  blog: {
    label: "Blog",
    collection: `${COLLECTION_PREFIX}_blog`,
  },
  community: {
    label: "Community",
    collection: `${COLLECTION_PREFIX}_community`,
  },
};

const COLLECTIONS = {
  ...CONTENT_TYPES,
  ...EXTRA_COLLECTIONS,
};

const CATEGORY_LABELS = {
  "api-ontwikkeling": "API Ontwikkeling",
  "front-end": "Front-end",
  data: "Data & Interoperabiliteit",
  security: "Security",
  devops: "DevOps & Platform",
  "open-source": "Open Source",
  leidraad: "Leidraad",
};

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "draft") return [];
      return walk(fullPath);
    }

    return /\.(md|mdx)$/.test(entry.name) ? [fullPath] : [];
  });
}

function filePathToUrl(filePath, frontmatter) {
  if (frontmatter.slug) {
    if (frontmatter.slug.startsWith("/")) {
      return `/kennisbank${frontmatter.slug}`;
    }

    const relativeDir = path.dirname(path.relative(DOCS_DIR, filePath));
    return `/kennisbank/${relativeDir}/${frontmatter.slug}`;
  }

  const relative = path.relative(DOCS_DIR, filePath);
  const withoutExtension = relative.replace(/\.(md|mdx)$/, "");
  const withoutIndex = withoutExtension.replace(/\/index$/, "");
  const withoutNumericPrefixes = withoutIndex
    .split(path.sep)
    .map((segment) => segment.replace(/^\d+-/, ""))
    .join("/");

  return `/kennisbank${
    withoutNumericPrefixes === "index" ? "" : `/${withoutNumericPrefixes}`
  }`;
}

function blogFilePathToUrl(filePath, frontmatter) {
  if (frontmatter.slug) {
    return frontmatter.slug.startsWith("/")
      ? frontmatter.slug
      : `/blog/${frontmatter.slug}`;
  }

  const relative = path.relative(BLOG_DIR, filePath);
  const parts = relative.split(path.sep);
  const fileName = parts.pop() || "";
  const fileSlug = fileName.replace(/\.(md|mdx)$/, "");
  const datePrefix = fileSlug.match(/^(\d{2})-(.+)$/);
  const slugParts = datePrefix ? [datePrefix[1], datePrefix[2]] : [fileSlug];

  return `/blog/${[...parts, ...slugParts].join("/")}`;
}

function communityFilePathToUrl(filePath, frontmatter) {
  if (frontmatter.slug) {
    return frontmatter.slug.startsWith("/")
      ? frontmatter.slug
      : `/communities/${frontmatter.slug}`;
  }

  const relative = path.relative(COMMUNITIES_DIR, filePath);
  const withoutExtension = relative.replace(/\.(md|mdx)$/, "");
  const withoutIndex = withoutExtension.replace(/\/index$/, "");

  return `/communities${withoutIndex === "index" ? "" : `/${withoutIndex}`}`;
}

function markdownPathForUrl(urlPath) {
  const relativeUrl = urlPath.replace(/^\//, "");
  const directPath = path.join(BUILD_DIR, `${relativeUrl}.md`);
  const indexPath = path.join(BUILD_DIR, relativeUrl, "index.md");

  if (fs.existsSync(directPath)) return directPath;
  if (fs.existsSync(indexPath)) return indexPath;
  return null;
}

function extractTitle(markdown, fallback) {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1];
  return cleanText(heading || fallback);
}

function cleanText(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[`*_{}[\]()>#+\-.!|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractDescription(markdown) {
  const withoutHeading = markdown.replace(/^#\s+.+$/m, "");
  const paragraph = withoutHeading
    .split(/\n\s*\n/)
    .map(cleanText)
    .find((value) => value.length > 80);

  return paragraph ? paragraph.slice(0, 320) : "";
}

function segmentToLabel(segment) {
  return segment
    .replace(/^\d+-/, "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getBlogDateLabel(filePath) {
  const relative = path.relative(BLOG_DIR, filePath);
  const [year, month, fileName = ""] = relative.split(path.sep);
  const day = fileName.match(/^(\d{2})-/)?.[1];

  return year && month && day ? `${day}-${month}-${year}` : "";
}

function getDocumentMetadata(filePath, contentType) {
  if (CONTENT_TYPES[contentType]) {
    const relative = path.relative(DOCS_DIR, filePath);
    const segments = relative.split(path.sep);
    const category = segments[0] || "kennisbank";
    const categoryLabel = CATEGORY_LABELS[category] || segmentToLabel(category);
    const sectionLabel = segments.length > 2 ? segmentToLabel(segments[1]) : "";

    return {
      category,
      categoryLabel,
      detailLabel: sectionLabel,
    };
  }

  if (contentType === "blog") {
    return {
      category: "blog",
      categoryLabel: "Blog",
      detailLabel: getBlogDateLabel(filePath),
    };
  }

  if (contentType === "community") {
    const relative = path.relative(COMMUNITIES_DIR, filePath);
    const parent = path.dirname(relative);
    const parentLabel =
      parent !== "." ? segmentToLabel(parent.split(path.sep)[0]) : "";

    return {
      category: "community",
      categoryLabel: "Community",
      detailLabel: parentLabel,
    };
  }

  return {
    category: "pagina",
    categoryLabel: "Pagina",
    detailLabel: "",
  };
}

function toDocument({ filePath, frontmatter, markdown, urlPath, contentType }) {
  const relative = path.relative(process.cwd(), filePath);
  const { category, categoryLabel, detailLabel } = getDocumentMetadata(
    filePath,
    contentType,
  );
  const title =
    frontmatter.title ||
    frontmatter.sidebar_label ||
    extractTitle(markdown, path.basename(filePath, path.extname(filePath)));

  return {
    id: Buffer.from(urlPath).toString("base64url"),
    title: cleanText(title),
    content: cleanText(markdown),
    description: extractDescription(markdown),
    url: new URL(urlPath, SITE_URL).toString(),
    url_without_anchor: new URL(urlPath, SITE_URL).toString(),
    path: urlPath,
    source_path: relative,
    category,
    category_label: categoryLabel,
    content_type: contentType,
    content_type_label: COLLECTIONS[contentType].label,
    "hierarchy.lvl0": cleanText(title),
    "hierarchy.lvl1": COLLECTIONS[contentType].label,
    "hierarchy.lvl2": categoryLabel,
    "hierarchy.lvl3": detailLabel,
    "hierarchy.lvl4": Array.isArray(frontmatter.tags)
      ? frontmatter.tags.map(String).join(", ")
      : "",
    language: "nl",
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
    type: "doc",
    item_priority: 1,
  };
}

function collectDocuments() {
  const documents = Object.fromEntries(
    Object.keys(COLLECTIONS).map((contentType) => [contentType, []]),
  );

  for (const filePath of walk(DOCS_DIR)) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter } = matter(raw);
    const contentType = frontmatter.content_type;

    if (!CONTENT_TYPES[contentType]) continue;

    const urlPath = filePathToUrl(filePath, frontmatter);
    const markdownPath = markdownPathForUrl(urlPath);

    if (!markdownPath) {
      console.warn(`No generated markdown found for ${urlPath}`);
      continue;
    }

    const markdown = fs.readFileSync(markdownPath, "utf8");
    documents[contentType].push(
      toDocument({ filePath, frontmatter, markdown, urlPath, contentType }),
    );
  }

  for (const filePath of walk(BLOG_DIR)) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter } = matter(raw);
    const urlPath = blogFilePathToUrl(filePath, frontmatter);
    const markdownPath = markdownPathForUrl(urlPath);

    if (!markdownPath) {
      console.warn(`No generated markdown found for ${urlPath}`);
      continue;
    }

    const markdown = fs.readFileSync(markdownPath, "utf8");
    documents.blog.push(
      toDocument({
        filePath,
        frontmatter,
        markdown,
        urlPath,
        contentType: "blog",
      }),
    );
  }

  for (const filePath of walk(COMMUNITIES_DIR)) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter } = matter(raw);
    const urlPath = communityFilePathToUrl(filePath, frontmatter);
    const markdownPath = markdownPathForUrl(urlPath);

    if (!markdownPath) {
      console.warn(`No generated markdown found for ${urlPath}`);
      continue;
    }

    const markdown = fs.readFileSync(markdownPath, "utf8");
    documents.community.push(
      toDocument({
        filePath,
        frontmatter,
        markdown,
        urlPath,
        contentType: "community",
      }),
    );
  }

  return documents;
}

async function typesenseRequest(pathname, options = {}) {
  if (!TYPESENSE_ENDPOINT || !TYPESENSE_API_KEY) {
    throw new Error("TYPESENSE_ENDPOINT and TYPESENSE_API_KEY are required");
  }

  const response = await fetch(new URL(pathname, TYPESENSE_ENDPOINT), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-TYPESENSE-API-KEY": TYPESENSE_API_KEY,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${options.method || "GET"} ${pathname} failed: ${
        response.status
      } ${body}`,
    );
  }

  const contentType = response.headers.get("content-type") || "";
  return contentType.includes("application/json")
    ? response.json()
    : response.text();
}

function collectionSchema(collectionName) {
  return {
    name: collectionName,
    fields: [
      { name: "id", type: "string" },
      { name: "title", type: "string" },
      { name: "content", type: "string" },
      { name: "description", type: "string", optional: true },
      { name: "url", type: "string" },
      { name: "url_without_anchor", type: "string" },
      { name: "path", type: "string" },
      { name: "source_path", type: "string" },
      { name: "category", type: "string", facet: true },
      { name: "category_label", type: "string", facet: true },
      { name: "content_type", type: "string", facet: true },
      { name: "content_type_label", type: "string", facet: true },
      { name: "hierarchy.lvl0", type: "string" },
      { name: "hierarchy.lvl1", type: "string", optional: true },
      { name: "hierarchy.lvl2", type: "string", optional: true },
      { name: "hierarchy.lvl3", type: "string", optional: true },
      { name: "hierarchy.lvl4", type: "string", optional: true },
      { name: "language", type: "string" },
      { name: "tags", type: "string[]", facet: true, optional: true },
      { name: "type", type: "string", facet: true },
      { name: "item_priority", type: "int32" },
    ],
    default_sorting_field: "item_priority",
  };
}

async function indexCollection(aliasName, documents) {
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const collectionName = `${aliasName}_${timestamp}`;

  if (DRY_RUN) {
    console.log(`[dry-run] ${aliasName}: ${documents.length} documents`);
    return;
  }

  let previousCollectionName = null;
  try {
    const alias = await typesenseRequest(`/aliases/${aliasName}`);
    previousCollectionName = alias.collection_name;
  } catch (error) {
    if (!String(error.message).includes("404")) throw error;
  }

  await typesenseRequest("/collections", {
    method: "POST",
    body: JSON.stringify(collectionSchema(collectionName)),
  });

  const importBody = documents
    .map((document) => JSON.stringify(document))
    .join("\n");
  const importResult = await typesenseRequest(
    `/collections/${collectionName}/documents/import?action=create`,
    {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: importBody,
    },
  );

  const failedImports = String(importResult)
    .split("\n")
    .filter((line) => line && !JSON.parse(line).success);

  if (failedImports.length > 0) {
    throw new Error(
      `${failedImports.length} imports failed for ${collectionName}`,
    );
  }

  await typesenseRequest(`/aliases/${aliasName}`, {
    method: "PUT",
    body: JSON.stringify({ collection_name: collectionName }),
  });

  if (previousCollectionName && previousCollectionName !== collectionName) {
    await typesenseRequest(`/collections/${previousCollectionName}`, {
      method: "DELETE",
    });
  }

  console.log(
    `${aliasName}: indexed ${documents.length} documents into ${collectionName}`,
  );
}

const documentsByType = collectDocuments();

for (const [contentType, documents] of Object.entries(documentsByType)) {
  await indexCollection(COLLECTIONS[contentType].collection, documents);
}
