const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withSentryConfig } = require("@sentry/react-native/metro");

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig();

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    experimentalImportSupport: false,
    inlineRequires: true,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    resolveRequest: (context, moduleName, platform) => {
      if (
        platform === "macos" &&
        (moduleName === "react-native" ||
          moduleName.startsWith("react-native/"))
      ) {
        const newModuleName = moduleName.replace(
          "react-native",
          "react-native-macos",
        );
        return context.resolveRequest(context, newModuleName, platform);
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
  serializer: {
    getModulesRunBeforeMainModule() {
      return [
        require.resolve("react-native/Libraries/Core/InitializeCore"),
        require.resolve("react-native-macos/Libraries/Core/InitializeCore"),
      ];
    },
  },
};

module.exports = withSentryConfig(
  mergeConfig(getDefaultConfig(__dirname), config),
);
