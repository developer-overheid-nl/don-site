const markdownSourcePlugin = require("docusaurus-markdown-source-plugin");

module.exports = function markdownSourceNoUiPlugin(context, options) {
  const plugin = markdownSourcePlugin(context, options);

  return {
    ...plugin,
    name: "markdown-source-no-ui-plugin",
    getThemePath: undefined,
  };
};
