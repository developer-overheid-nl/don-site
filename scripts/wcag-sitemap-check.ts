import { Builder, By, WebDriver } from "selenium-webdriver";
import { AxeBuilder } from "@axe-core/webdriverjs";
import axios from "axios";
import { parseStringPromise } from "xml2js";

const SITEMAP_URL = "http://localhost:3000/sitemap.xml";

async function getUrlsFromSitemap(url: string): Promise<string[]> {
  const res = await axios.get(url);
  if (res.status !== 200) throw new Error("Failed to fetch sitemap");
  const text = res.data;
  const result = await parseStringPromise(text);
  // Type cast omdat xml2js een vrij losse structuur teruggeeft
  return (result as any).urlset.url.map((u: any) => u.loc[0]);
}

async function runAxeOnUrls(urls: string[]) {
  let errorCount = 0;
  for (const url of urls) {
    const driver: WebDriver = await new Builder().forBrowser("chrome").build();
    try {
      await driver.get(url);
      const results = await new AxeBuilder(driver).analyze();
      if (results.violations.length > 0) {
        errorCount += results.violations.length;
        console.log(`❌ WCAG violations at ${url}:`);
        results.violations.forEach((v) =>
          console.log(`  [${v.id}] ${v.help}: ${v.nodes.length} elements`)
        );
      } else {
        console.log(`✅ ${url} is WCAG compliant`);
      }
    } finally {
      await driver.quit();
    }
  }
  if (errorCount > 0) process.exit(1);
}

(async () => {
  const urls = await getUrlsFromSitemap(SITEMAP_URL);
  await runAxeOnUrls(urls);
})();
