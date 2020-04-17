module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': 0,
    'no-underscore-dangle': ['error', { allow: ['_callbacks'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'implicit-arrow-linebreak': 0,
  },
};
