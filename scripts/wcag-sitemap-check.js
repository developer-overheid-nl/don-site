const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const { execSync, spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const SITEMAP_URL = "http://localhost:3000/sitemap.xml";
const BROWSER_DRIVER_ENV_PATH = path.join(
  os.homedir(),
  ".browser-driver-manager",
  ".env",
);

function ensureChromeAndDriver() {
  try {
    execSync("npx browser-driver-manager install chrome", {
      stdio: "inherit",
    });
  } catch (error) {
    throw new Error(
      `Kon browser-driver-manager niet draaien: ${
        error.stderr?.toString() || error.message
      }`,
    );
  }

  let envContent = "";
  try {
    envContent = fs.readFileSync(BROWSER_DRIVER_ENV_PATH, "utf-8");
  } catch (error) {
    throw new Error(
      `Kon ${BROWSER_DRIVER_ENV_PATH} niet lezen. Run "npx browser-driver-manager install chrome" handmatig en probeer opnieuw.`,
    );
  }

  const envMap = {};
  for (const line of envContent.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const [key, ...rest] = line.split("=");
    if (!key || rest.length === 0) continue;
    const rawValue = rest.join("=");
    envMap[key.trim()] = rawValue.replace(/^"(.*)"$/, "$1").trim();
  }

  const chromePath = envMap.CHROME_TEST_PATH;
  const chromedriverPath = envMap.CHROMEDRIVER_TEST_PATH;

  if (!chromePath || !chromedriverPath) {
    throw new Error(
      `Kon Chrome of Chromedriver pad niet vinden in ${BROWSER_DRIVER_ENV_PATH}. Inhoud:\n${envContent}`,
    );
  }

  return {
    chromePath,
    chromedriverPath,
  };
}

async function main() {
  const { chromePath, chromedriverPath } = ensureChromeAndDriver();
  const res = await axios.get(SITEMAP_URL);
  const result = await parseStringPromise(res.data);

  // Pak alle loc-linkjes
  const urls = result.urlset.url.map((u) => u.loc[0]);
  let hasFailures = false;
  let report = "";

  for (const url of urls) {
    const axeResult = spawnSync(
      "npx",
      [
        "axe",
        url,
        "--exit",
        `--chromedriver-path=${chromedriverPath}`,
        `--chrome-path=${chromePath}`,
      ],
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
