// Linkinator crawlt een pagina zowel via /pad als via /pad/, omdat de site naar
// beide varianten linkt en linkinator de URL van vóór de redirect onthoudt.
// Daardoor staat elke kapotte link twee keer in het rapport. Dit script voegt
// die dubbele meldingen samen. Gebruik: linkinator ... 2>&1 | node <dit script>
const BROKEN_LINK = /^\[\d+\] /;
const PAGE_ENTRY = /^\s+\[\d+\] /;
const PAGE = /^build(\/|$)/;
const SUMMARY = /^ERROR: Detected \d+ broken links\./;

function dedupeLinkReport(report) {
  const output = [];
  const brokenLinks = new Set();
  const pages = new Map();
  let pagesPosition = -1;
  let currentPage;

  for (const line of report.split("\n")) {
    if (BROKEN_LINK.test(line)) {
      if (!brokenLinks.has(line)) {
        brokenLinks.add(line);
        output.push(line);
      }
      continue;
    }

    if (currentPage && PAGE_ENTRY.test(line)) {
      pages.get(currentPage).add(line);
      continue;
    }

    if (PAGE.test(line)) {
      currentPage = line.replace(/\/$/, "");
      if (!pages.has(currentPage)) {
        pages.set(currentPage, new Set());
      }
      if (pagesPosition === -1) {
        pagesPosition = output.length;
      }
      continue;
    }

    currentPage = undefined;
    output.push(line);
  }

  const pageLines = [];
  let brokenCount = 0;
  for (const [page, entries] of pages) {
    pageLines.push(page, ...entries);
    brokenCount += entries.size;
  }
  if (pagesPosition !== -1) {
    output.splice(pagesPosition, 0, ...pageLines);
  }

  return output
    .map((line) =>
      SUMMARY.test(line)
        ? line.replace(/\d+ broken links/, `${brokenCount} broken links`)
        : line,
    )
    .join("\n");
}

if (require.main === module) {
  let input = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    input += chunk;
  });
  process.stdin.on("end", () => {
    process.stdout.write(dedupeLinkReport(input));
  });
}

module.exports = { dedupeLinkReport };
