const stringSort = (a, b) => (a === b ? 0 : a > b ? 1 : -1);

const sortByName = (a, b) => stringSort(a.name, b.name);

export const createConfig = ({
  backwardsCompatible = false,
  selector,
  source = ["src/**/tokens.json", "src/**/*.tokens.json"],
  buildPath = "dist/",
  className = "",
}) => {
  const prefix = selector ? selector.replace(/^\.(.+)-theme/, "$1") : "";
  let themeName = className || (prefix ? `${prefix}-theme` : "theme");

  const legacyPlatforms = {
    legacyJson: {
      transforms: ["name/camel", "attribute/cti"],
      buildPath,
      files: [
        {
          destination: "index.json",
          format: "json/list",
        },
      ],
    },
    legacyCss: {
      transforms: ["name/kebab"],
      buildPath,
      files: [
        {
          destination: "design-tokens.css",
          format: "css/variables",
          options: {
            selector: `.${themeName}`,
            outputReferences: true,
          },
        },
      ],
    },
    legacyLess: {
      transforms: ["name/kebab"],
      buildPath,
      files: [
        {
          destination: "index.less",
          format: "less/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    legacyScss: {
      transforms: ["name/kebab"],
      buildPath,
      files: [
        {
          destination: "index.scss",
          format: "scss/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    legacyJs: {
      transforms: ["name/camel"],
      buildPath,
      files: [
        {
          destination: "index.js",
          format: "javascript/es6",
        },
      ],
    },
  };

  return {
    hooks: {
      formats: {
        "json/list": function ({ dictionary }) {
          return JSON.stringify(
            dictionary.allTokens.sort(sortByName),
            null,
            "  "
          );
        },
      },
    },
    source,
    platforms: {
      ...(backwardsCompatible ? legacyPlatforms : {}),
      js: {
        transforms: ["name/camel"],
        buildPath,
        files: [
          {
            destination: "variables.cjs",
            format: "javascript/module-flat",
          },
          {
            destination: "variables.mjs",
            format: "javascript/es6",
          },
        ],
      },
      tokenTree: {
        transforms: ["name/camel"],
        buildPath,
        files: [
          {
            format: "javascript/module",
            destination: "tokens.cjs",
          },
        ],
      },
      json: {
        transforms: ["name/camel"],
        buildPath,
        files: [
          {
            destination: "tokens.json",
            format: "json",
          },
          {
            destination: "list.json",
            format: "json/list",
          },
          {
            destination: "variables.json",
            format: "json/flat",
          },
        ],
      },
      css: {
        transforms: ["name/kebab"],
        buildPath,
        files: [
          {
            destination: "theme.css",
            format: "css/variables",
            options: {
              selector: `.${themeName}`,
              outputReferences: true,
            },
          },
          {
            destination: "variables.css",
            format: "css/variables",
            options: {
              selector: `:root`,
              outputReferences: true,
            },
          },
        ],
      },
      scss: {
        transforms: ["name/kebab"],
        buildPath,
        files: [
          {
            destination: "_variables.scss",
            format: "scss/variables",
            options: {
              outputReferences: true,
              themeable: true,
            },
          },
        ],
      },
      "scss-theme-mixin": {
        transforms: ["name/kebab"],
        buildPath,
        files: [
          {
            destination: "_mixin.scss",
            format: "css/variables",
            options: {
              selector: `@mixin ${themeName}`,
              outputReferences: true,
            },
          },
        ],
      },
      less: {
        transforms: ["name/kebab"],
        buildPath,
        files: [
          {
            destination: "variables.less",
            format: "less/variables",
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      typescript: {
        transforms: ["name/camel"],

        buildPath,
        files: [
          {
            format: "typescript/es6-declarations",
            destination: "variables.d.ts",
          },
          {
            format: "typescript/module-declarations",
            destination: "tokens.d.ts",
          },
        ],
      },
    },
  };
};
