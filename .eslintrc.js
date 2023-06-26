module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    camelcase: 'off',
    'no-param-reassign': 'off',
  },
};
