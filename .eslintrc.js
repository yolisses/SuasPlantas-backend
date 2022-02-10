module.exports = {
  env: {
    browser: false,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'jest',
    '@typescript-eslint',
  ],
  ignorePatterns: ['**/dist/*'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    'import/extensions': 0,
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
  },
};
