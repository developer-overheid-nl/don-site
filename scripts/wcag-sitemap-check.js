const axios = require('axios');
const { parseStringPromise } = require('xml2js');
const { execSync } = require('child_process');

const SITEMAP_URL = 'http://localhost:3000/sitemap.xml';

async function main() {
  const res = await axios.get(SITEMAP_URL);
  const result = await parseStringPromise(res.data);

  // Pak alle loc-linkjes
  const urls = result.urlset.url.map(u => u.loc[0]);
  let hasFailures = false;

  for (const url of urls) {
    console.log('====================================================');
    console.log(`Testing: ${url}`);
    console.log('====================================================');
    try {
      execSync(`axe "${url}" --exit`, { stdio: 'inherit' });
    } catch (error) {
      console.log('Accessibility issues found on this page');
      hasFailures = true;
    }
  }

  if (hasFailures) {
    process.exit(1);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
