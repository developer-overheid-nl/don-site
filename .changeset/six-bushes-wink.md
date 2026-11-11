---
"@developer-overheid-nl/website": patch
---

Update @rijkshuisstijl-community packages to components-react 17 and
design-tokens 18, and load component CSS from components-css

- Replace the removed `variation="pink-background"` prop on `Blockquote` with
  `className="don-blockquote--pink"`
- Set `headingLevel` on every `Card` so card titles fit the page heading outline
- Keep the whole `Card` clickable, as it was before the upgrade
- Document Card heading levels, colours and the pink quote in the contributor
  guides
