---
"@developer-overheid-nl/website": patch
---

Improve Typesense search across Developer Overheid

Updated the search page to query multiple Typesense collections, including the
API register, OSS register, and the new Developer Overheid content collections.
Search results are grouped by source, use collection-specific ranking fields
where needed, and link API/OSS results to their public domains.

Also added Markdown indexing for generated Docusaurus content so standards,
tutorials, tools, architecture, guidelines, blog posts, and communities can be
pushed to Typesense after build.
