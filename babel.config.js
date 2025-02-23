const MODULE_RESOLVER = [
  "module-resolver",
  {
    alias: {
      assets: "./src/assets",
      components: "./src/components",
      constants: "./src/core/constants",
      contexts: "./src/contexts",
      gql: "./src/core/gql",
      hooks: "./src/hooks",
      layouts: "./src/layouts",
      models: "./src/core/models",
      pages: "./src/pages",
      utils: "./src/utils",
      services: "./src/core/services",
      store: "./src/core/store",
      transformers: "./src/core/transformers",
    },
    extensions: [".ts", ".tsx", ".js", ".json", ".svg"],
    root: ["."],
  },
];

module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [MODULE_RESOLVER, "module:react-native-dotenv"],
};
