/* eslint-disable */
module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
      node: true,
    },
    extends: [
      'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
    },
    plugins: [
      '@typescript-eslint',
    ],
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'off',
      'react/prop-types': 'off',
    },
  };
  