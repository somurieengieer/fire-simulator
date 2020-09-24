module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:jsx-a11y/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jsx-a11y',
    'jest'
  ],
  rules: {
    'no-use-before-define': 'off'
  }
}
