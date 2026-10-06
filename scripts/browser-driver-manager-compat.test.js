const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { createRequire } = require("node:module");

// The override can install a Puppeteer version outside the manager's declared
// range. Check module loading and the exports it uses; this does not exercise
// browser downloads or installation.
test("browser-driver-manager loads with the required Puppeteer exports", () => {
  const managerPackagePath = require.resolve(
    "browser-driver-manager/package.json",
  );
  const managerRequire = createRequire(managerPackagePath);
  const puppeteerBrowsers = managerRequire("@puppeteer/browsers");
  const manager = require(path.join(
    path.dirname(managerPackagePath),
    "src/browser-driver-manager.js",
  ));

  assert.equal(typeof puppeteerBrowsers.install, "function");
  assert.equal(typeof puppeteerBrowsers.resolveBuildId, "function");
  assert.equal(typeof puppeteerBrowsers.detectBrowserPlatform, "function");
  assert.equal(typeof puppeteerBrowsers.uninstall, "function");
  assert.ok(puppeteerBrowsers.Browser.CHROME);
  assert.ok(puppeteerBrowsers.Browser.CHROMEDRIVER);
  assert.equal(typeof manager.install, "function");
});
