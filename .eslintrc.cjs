module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'indent': ['error', 4],
    'vue/script-indent': ['error', 4],
    'vue/html-indent': ['error', 4],
    'max-len': 'off',
    'arrow-body-style': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-continue': 'off'
  },
};
