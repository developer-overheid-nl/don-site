const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const { spawnSync } = require("child_process");
const fs = require("fs");
const { createAxeCommand } = require("./wcag-sitemap-check.helpers");

const SITEMAP_URL = "http://localhost:3000/sitemap.xml";

async function main() {
  const res = await axios.get(SITEMAP_URL);
  const result = await parseStringPromise(res.data);

  // Pak alle loc-linkjes
  const urls = result.urlset.url.map((u) => u.loc[0]);
  let hasFailures = false;
  let report = "";

  for (const url of urls) {
    const axeCommand = createAxeCommand(url);
    const axeResult = spawnSync(
      axeCommand.command,
      axeCommand.args,
      { encoding: "utf-8" },
    );

    if (axeResult.error) {
      throw axeResult.error;
    }

    let output = `${axeResult.stdout || ""}${axeResult.stderr || ""}`;

    if (
      /violation|issues detected|Accessibility issues/i.test(output) &&
      !/^\s*0\s+violations\s+found!?$/im.test(output)
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
              !/^\s*0\s+violations\s+found!?$/i.test(line) &&
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
