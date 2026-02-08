module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@": "./src",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@assets": "./src/assets",
          "@helpers": "./src/helpers",
          "@services": "./src/services",
          "@navigation": "./src/navigation",
          "@types": "./src/types",
          "@hooks": "./src/hooks",
        },
      },
    ],
    "react-native-worklets/plugin",
  ],
};
