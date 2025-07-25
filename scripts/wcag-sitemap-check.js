const { Builder, By } = require("selenium-webdriver");
const { AxeBuilder } = require("@axe-core/webdriverjs");
const axios = require("axios");
const { parseStringPromise } = require("xml2js");

const SITEMAP_URL = "http://localhost:3000/sitemap.xml";

async function getUrlsFromSitemap(url) {
  const res = await axios.get(url);
  if (res.status !== 200) throw new Error("Failed to fetch sitemap");
  const text = res.data; // axios: body is direct in .data
  const result = await parseStringPromise(text);
  return result.urlset.url.map(u => u.loc[0]);
}

async function runAxeOnUrls(urls) {
  let errorCount = 0;
  for (const url of urls) {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
      await driver.get(url);
      const results = await new AxeBuilder(driver).analyze();
      if (results.violations.length > 0) {
        errorCount += results.violations.length;
        console.log(`WCAG violations at ${url}:`);
        results.violations.forEach(v =>
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
