const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const { loadSiteConfig } = require("@docusaurus/core/lib/server/config.js");

test("Typesense browser config is derived from the build environment", async () => {
  const previousEnvironment = {
    TYPESENSE_ENDPOINT: process.env.TYPESENSE_ENDPOINT,
    TYPESENSE_HOST: process.env.TYPESENSE_HOST,
    TYPESENSE_PORT: process.env.TYPESENSE_PORT,
    TYPESENSE_PROTOCOL: process.env.TYPESENSE_PROTOCOL,
    TYPESENSE_API_KEY: process.env.TYPESENSE_API_KEY,
  };

  process.env.TYPESENSE_ENDPOINT = "https://search.example.test:8443";
  delete process.env.TYPESENSE_HOST;
  delete process.env.TYPESENSE_PORT;
  delete process.env.TYPESENSE_PROTOCOL;
  process.env.TYPESENSE_API_KEY = "search-only-test-key";

  try {
    const { siteConfig } = await loadSiteConfig({
      siteDir: path.join(__dirname, ".."),
    });
    const serverConfig =
      siteConfig.themeConfig.typesense.typesenseServerConfig;

    assert.deepEqual(serverConfig.nodes, [
      {
        host: "search.example.test",
        port: 8443,
        protocol: "https",
      },
    ]);
    assert.equal(serverConfig.apiKey, "search-only-test-key");
  } finally {
    for (const [name, value] of Object.entries(previousEnvironment)) {
      if (value === undefined) {
        delete process.env[name];
      } else {
        process.env[name] = value;
      }
    }
  }
});
