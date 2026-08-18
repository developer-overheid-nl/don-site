const path = require("node:path");

function createAxeCommand(url, environment = process.env) {
  const args = ["exec", "axe", url, "--exit"];
  const chromedriverPath =
    environment.CHROMEDRIVER_TEST_PATH ||
    (environment.CHROMEWEBDRIVER
      ? path.join(environment.CHROMEWEBDRIVER, "chromedriver")
      : undefined);

  if (chromedriverPath) {
    args.push(`--chromedriver-path=${chromedriverPath}`);
  }

  const chromePath = environment.CHROME_TEST_PATH || environment.CHROME_BIN;
  if (chromePath) {
    args.push(`--chrome-path=${chromePath}`);
  }

  return {
    command: "pnpm",
    args,
  };
}

module.exports = { createAxeCommand };
