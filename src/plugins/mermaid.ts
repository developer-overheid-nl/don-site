import { createHash } from "crypto";
import { access, mkdir, readFile } from "fs/promises";
import { Root } from "hast";
import path from "path";
import puppeteer, { Browser } from "puppeteer";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

const DIAGRAMS_FOLDER = path.resolve(__dirname,  "../../.mermaid/diagrams");
const DOCUSAURUS_SCRIPT = path.resolve(__dirname,  "../../node_modules/mermaid/dist/mermaid.min.js");

const mermaidPlugin: Plugin<[], Root> = () => async (tree) => {
  try {
    await access(DIAGRAMS_FOLDER);
  } catch (err) {
    await mkdir(DIAGRAMS_FOLDER, { recursive: true });
  }

  const promises: PromiseLike<void>[] = [];
  const mermaidScript = await readFile(DOCUSAURUS_SCRIPT, 'utf-8');

  visit(tree, "element", (node, index, parent) => {
    if (
      node.tagName === "code" &&
      Array.isArray(node.properties.className) &&
      node.properties.className.includes("language-mermaid")
    ) {
      const code =
        node.children[0].type === "text" ? node.children[0].value : undefined;

      if (!code) {
        return;
      }

      const hash = createHash("sha256").update(code).digest("hex");
      const imgFileName = `${hash}.png`;

      promises.push(
        new Promise(async (resolve) => {
          let browser: Browser;

          try {
            browser = await puppeteer.launch({
              headless: true,
              args: ["--no-sandbox"],
            });
          } catch (e) {
            console.warn('Mermaid rendering is disabled due to missing dependencies.')
            return resolve();
          }
        
          const page = await browser.newPage();
          await page.setViewport({ width: 1920, height: 1080 });

          await page.setContent(`
          <html>
            <head>
              <style>
                html { -webkit-font-smoothing: antialiased; }
              </style>
            </head>
            <body>
              <div class="mermaid">${code}</div>
              <script>${mermaidScript}</script>
              <script>
              mermaid.initialize({ startOnLoad: false });
              mermaid.run({
                  querySelector: ".mermaid",
                  suppressErrors: true,
                })
                .then(() => {
                  window.mermaidDone = true;
                }); 
              </script>
            </body>
          </html>`);

          await page.waitForFunction("window.mermaidDone === true", {
            timeout: 5000,
          });

          const svg = await page.$("svg");

          await svg.screenshot({
            type: "png",
            omitBackground: true,
            path: `${DIAGRAMS_FOLDER}/${imgFileName}`,
          });

          await page.close();
          await browser.close();

          parent.children[index] = {
            type: "element",
            tagName: "img",
            properties: {
              src: `/diagrams/${imgFileName}`,
            },
            children: [],
          };

          resolve();
        })
      );
    }
  });

  await Promise.all(promises);
};

export default mermaidPlugin;
