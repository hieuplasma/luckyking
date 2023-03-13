module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {
    jest: true,
  },
  rules: {
    'max-len': ['warn', {code: 200, tabWidth: 2}],
    'no-use-before-define': 'off',
    'consistent-return': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    semi: ['never'],
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    quotes: ['error', 'single', {allowTemplateLiterals: false}],
    'react/no-did-update-set-state': 'off',
    'react/no-unused-state': 'warn',
    'react/no-deprecated': 'warn',
    'react/sort-comp': 'off',
    'react/forbid-prop-types': 'off',
    'no-case-declarations': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
  plugins: [
    // ...
    'react-hooks',
  ],
  globals: {
    fetch: false,
    window: true,
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
