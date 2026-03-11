export default async function piwikProPlugin(context, options) {
  return {
    name: "plugin-piwik-pro",
    getClientModules() {
      return [require.resolve("./piwikPro.ts")];
    }
  };
}
