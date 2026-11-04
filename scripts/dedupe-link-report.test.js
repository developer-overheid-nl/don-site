const test = require("node:test");
const assert = require("node:assert/strict");

const { dedupeLinkReport } = require("./dedupe-link-report.js");

test("merges pages that were crawled with and without a trailing slash", () => {
  const report = [
    "→ crawling build",
    "[404] https://example.com/a",
    "[404] https://example.com/a",
    "[0] https://example.org/",
    "build/blog/post",
    "  [404] https://example.com/a",
    "build/kennisbank/tool",
    "  [0] https://example.org/",
    "build/blog/post/",
    "  [404] https://example.com/a",
    "ERROR: Detected 3 broken links. Scanned 10 links in 1.5 seconds.",
    "",
  ].join("\n");

  assert.equal(
    dedupeLinkReport(report),
    [
      "→ crawling build",
      "[404] https://example.com/a",
      "[0] https://example.org/",
      "build/blog/post",
      "  [404] https://example.com/a",
      "build/kennisbank/tool",
      "  [0] https://example.org/",
      "ERROR: Detected 2 broken links. Scanned 10 links in 1.5 seconds.",
      "",
    ].join("\n"),
  );
});

test("keeps different broken links on the same page", () => {
  const report = [
    "build/page",
    "  [404] https://example.com/a",
    "build/page/",
    "  [404] https://example.com/b",
  ].join("\n");

  assert.equal(
    dedupeLinkReport(report),
    [
      "build/page",
      "  [404] https://example.com/a",
      "  [404] https://example.com/b",
    ].join("\n"),
  );
});

test("leaves a report without broken links unchanged", () => {
  const report = "→ crawling build\nSuccessfully scanned 10 links.\n";

  assert.equal(dedupeLinkReport(report), report);
});
