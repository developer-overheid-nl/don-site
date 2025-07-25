import { Builder } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import { AxeBuilder } from "@axe-core/webdriverjs";
import axios from "axios";
import { parseStringPromise } from "xml2js";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

const SITEMAP_URL = "http://localhost:3000/sitemap.xml";

async function getUrlsFromSitemap(url: string): Promise<string[]> {
  const res = await axios.get(url);
  if (res.status !== 200) throw new Error("Failed to fetch sitemap");
  const text = res.data;
  const result = await parseStringPromise(text);
  return (result as any).urlset.url.map((u: any) => u.loc[0]);
}

function createUniqueUserDataDir(): string {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "chrome-user-data-"));
  return tmpDir;
}

async function runAxeOnUrls(urls: string[]) {
  let errorCount = 0;
  for (const url of urls) {
    const userDataDir = createUniqueUserDataDir();
    const options = new chrome.Options()
      .headless()
      .addArguments(
        "--no-sandbox",
        "--disable-dev-shm-usage",
        `--user-data-dir=${userDataDir}`
      );
    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    try {
      await driver.get(url);
      const results = await new AxeBuilder(driver).analyze();
      if (results.violations.length > 0) {
        errorCount += results.violations.length;
        console.log(`WCAG violations at ${url}:`);
        results.violations.forEach((v: any) =>
          console.log(`  [${v.id}] ${v.help}: ${v.nodes.length} elements`)
        );
      } else {
        console.log(`✅ ${url} is WCAG compliant`);
      }
    } finally {
      await driver.quit();
      fs.rmSync(userDataDir, { recursive: true, force: true });
    }
  }
  if (errorCount > 0) process.exit(1);
}

(async () => {
  const urls = await getUrlsFromSitemap(SITEMAP_URL);
  await runAxeOnUrls(urls);
})();
