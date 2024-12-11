import StyleDictionary from "style-dictionary";
import { createConfig } from "./style-dictionary-config.mjs";

const build = async () => {
  console.log("Starting build..."); // Debugging statement

  const sd = new StyleDictionary({
    ...createConfig({
      selector: `.don-theme`,
      source: [
        // "node_modules/@rijkshuisstijl-community/design-tokens/dist/tokens.json"
        "src/*.tokens.json",
        "src/tokens.json",
      ],
    }),
    log: {
      verbosity: "verbose",
    },
  });

  console.log("Cleaning platforms..."); // Debugging statement
  await sd.cleanAllPlatforms();

  console.log("Building platforms..."); // Debugging statement
  await sd.buildAllPlatforms();
  console.log("Build complete!"); // Debugging statement
};

build();
