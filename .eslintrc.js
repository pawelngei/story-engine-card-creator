module.exports = {
  env: { jest: true, browser: true, es6: true },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    browser: true,
    cy: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: '.',
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  overrides: [],
}
