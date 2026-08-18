const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");

const packageJson = require("../package.json");

test("browser-driver-manager uses Puppeteer browsers v3 without extract-zip", () => {
  assert.equal(
    packageJson.devDependencies["browser-driver-manager"],
    "2.0.1",
  );
  assert.equal(packageJson.pnpm.overrides["@puppeteer/browsers"], "3.2.0");

  const managerPackagePath = require.resolve(
    "browser-driver-manager/package.json",
  );
  const managerRequire = createRequire(managerPackagePath);
  const puppeteerBrowsers = managerRequire("@puppeteer/browsers");
  const puppeteerPackageJson = managerRequire(
    "@puppeteer/browsers/package.json",
  );
  const manager = require(path.join(
    path.dirname(managerPackagePath),
    "src/browser-driver-manager.js",
  ));

  assert.match(puppeteerPackageJson.version, /^3\./);
  assert.equal(typeof puppeteerBrowsers.install, "function");
  assert.equal(typeof puppeteerBrowsers.resolveBuildId, "function");
  assert.equal(typeof puppeteerBrowsers.detectBrowserPlatform, "function");
  assert.equal(typeof puppeteerBrowsers.uninstall, "function");
  assert.ok(puppeteerBrowsers.Browser.CHROME);
  assert.ok(puppeteerBrowsers.Browser.CHROMEDRIVER);
  assert.equal(typeof manager.install, "function");

  const lockfile = fs.readFileSync(
    path.join(__dirname, "..", "pnpm-lock.yaml"),
    "utf8",
  );
  assert.doesNotMatch(lockfile, /^  extract-zip@/m);
});
