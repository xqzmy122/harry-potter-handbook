module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['babel.config.js'],
      env: { node: true },
      parserOptions: { sourceType: 'script' },
    },
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
