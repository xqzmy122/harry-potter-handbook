module.exports = {
  root: true,
  extends: "@react-native",
  overrides: [
    {
      files: ["babel.config.js"],
      env: { node: true },
      parser: "@babel/eslint-parser",
      parserOptions: { sourceType: "script", requireConfigFile: false },
    },
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            varsIgnorePattern: "^_",
          },
        ],
      },
    },
  ],
};
