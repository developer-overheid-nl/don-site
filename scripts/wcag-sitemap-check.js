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
    try {
      execSync(`npx axe "${url}" --exit`, { stdio: 'ignore' });
    } catch (error) {
      const stdOut = error.stdout ? error.stdout.toString() : '';
      const stdErr = error.stderr ? error.stderr.toString() : '';
      const output = stdOut + '\n' + stdErr;

      const filtered = output
        .split('\n')
        .filter(line =>
          /Violation|Accessibility issues detected|Ensure|For details, see|occurrences|error|Exception/i.test(line)
        )
        .join('\n');

      if (filtered.trim()) {
        hasFailures = true;
        console.log('\n========================================');
        console.log(`🚨 WCAG issues found on: ${url}`);
        console.log(filtered);
        console.log('========================================\n');
      } else {
        // Log altijd iets als je niks vindt, voor debug
        console.log(`🚨 Axe error on: ${url}\n${output}`);
        hasFailures = true;
      }
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
