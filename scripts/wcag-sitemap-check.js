const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const { execSync } = require("child_process");

const SITEMAP_URL = "http://localhost:3000/sitemap.xml";

async function main() {
  const res = await axios.get(SITEMAP_URL);
  const result = await parseStringPromise(res.data);

  // Pak alle loc-linkjes
  const urls = result.urlset.url.map((u) => u.loc[0]);
  let hasFailures = false;

  for (const url of urls) {
    try {
      output = execSync(`npx axe "${url}" --exit`, { encoding: "utf-8" });
    } catch (error) {
      output =
        (error.stdout ? error.stdout.toString() : "") +
        (error.stderr ? error.stderr.toString() : "");
    }

    if (
      /violation|issues detected|Accessibility issues/i.test(output) &&
      !/0 violations found!/i.test(output)
    ) {
      hasFailures = true;
      console.log("\n========================================");
      console.log(`WCAG issues found on: ${url}`);
      // Print alleen violation lines
      output.split("\n").forEach((line) => {
        if (
          !/0 violations found!/i.test(line) &&
          /violation|issues detected|Accessibility issues|heading-order|Ensure|For details|occurrences/i.test(
            line
          )
        ) {
          console.log(line);
        }
      });
      console.log("========================================\n");
    }
  }

  if (hasFailures) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
