const axios = require("axios");
const { AxeBuilder } = require("@axe-core/webdriverjs");
const { parseStringPromise } = require("xml2js");
const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

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

  const chromeOptions = new chrome.Options()
    .setChromeBinaryPath(chromePath)
    .addArguments("--headless=new", "--no-sandbox", "--disable-dev-shm-usage");
  const chromeService = new chrome.ServiceBuilder(chromedriverPath);
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .setChromeService(chromeService)
    .build();

  // Pak alle loc-linkjes
  const urls = result.urlset.url.map((u) => u.loc[0]);
  let hasFailures = false;
  let report = "";

  try {
    for (const url of urls) {
      await driver.get(url);
      const { violations } = await new AxeBuilder(driver).analyze();

      if (violations.length > 0) {
        hasFailures = true;
        const issueBlock = [
          "\n========================================",
          `WCAG issues found on: ${url}`,
          `${violations.length} violations found`,
          ...violations.flatMap((violation) => [
            `- ${violation.id}: ${violation.help}`,
            `  Impact: ${violation.impact || "unknown"}`,
            `  Help: ${violation.helpUrl}`,
            ...violation.nodes.map(
              (node) => `  Element: ${node.target.join(" ")}`,
            ),
          ]),
          "========================================\n",
        ].join("\n");
        report += issueBlock + "\n";
        console.log(issueBlock);
      }
    }
  } finally {
    await driver.quit();
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
