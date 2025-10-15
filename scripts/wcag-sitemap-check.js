const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const { execSync } = require("child_process");
const fs = require("fs");

const SITEMAP_URL = "http://localhost:3000/sitemap.xml";

async function main() {
  const res = await axios.get(SITEMAP_URL);
  const result = await parseStringPromise(res.data);

  // Pak alle loc-linkjes
  const urls = result.urlset.url.map((u) => u.loc[0]);
  let hasFailures = false;
  let report = "";

  for (const url of urls) {
    let output = "";
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
      const interestingPatterns = [
        /violation/i,
        /issues detected/i,
        /Accessibility issues/i,
        /Ensure/i,
        /Correct invalid elements/i,
        /For details/i,
        /occurrences/i,
        /Fix all of the following/i,
        /Element/i,
        /Selector/i,
      ];
      const issueBlock = [
        "\n========================================",
        `WCAG issues found on: ${url}`,
        ...output
          .split("\n")
          .filter(
            (line) =>
              !/0 violations found!/i.test(line) &&
              (line.trim().startsWith("-") ||
                interestingPatterns.some((pattern) => pattern.test(line))),
          ),
        "========================================\n",
      ].join("\n");
      report += issueBlock + "\n";
      console.log(issueBlock);
    }
  }

  if (hasFailures) {
    fs.writeFileSync("wcag-report.txt", report);
    process.exit(1);
  } else {
    fs.writeFileSync(
      "wcag-report.txt",
      "🎉 Geen accessibility issues gevonden op enige pagina!",
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
