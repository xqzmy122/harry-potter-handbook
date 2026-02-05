const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== "svg"),
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],

    extraNodeModules: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@screens": path.resolve(__dirname, "src/screens"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@services": path.resolve(__dirname, "src/services"),
      "@navigation": path.resolve(__dirname, "src/navigation"),
      "@types": path.resolve(__dirname, "src/types"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
