module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
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
    'react',
  ],
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'off',
    'react/prop-types': 'off',
  },
};
