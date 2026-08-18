const test = require("node:test");
const assert = require("node:assert/strict");

const { createAxeCommand } = require("./wcag-sitemap-check.helpers");

test("uses Axe's bundled Chromedriver without an external browser installer", () => {
  assert.deepEqual(createAxeCommand("https://example.nl", {}), {
    command: "pnpm",
    args: ["exec", "axe", "https://example.nl", "--exit"],
  });
});

test("uses the matching Chromedriver provided by a GitHub Ubuntu runner", () => {
  assert.deepEqual(
    createAxeCommand("https://example.nl", {
      CHROMEWEBDRIVER: "/usr/local/share/chromedriver-linux64",
    }),
    {
      command: "pnpm",
      args: [
        "exec",
        "axe",
        "https://example.nl",
        "--exit",
        "--chromedriver-path=/usr/local/share/chromedriver-linux64/chromedriver",
      ],
    },
  );
});
