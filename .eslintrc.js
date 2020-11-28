module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'react/react-in-jsx-scope': 'off',
    'comma-dangle': 0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'jsx-quotes': 1,
    'linebreak-style': [2, 'unix'],
    quotes: [2, 'single'],
    'react/display-name': 1,
    'react/forbid-prop-types': 0,
    'react/sort-prop-types': 1,
    'react/jsx-boolean-value': 1,
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-curly-spacing': 1,
    'react/jsx-indent-props': [2, 2],
    'react/jsx-max-props-per-line': 1,
    'react/jsx-no-duplicate-props': 1,
    'react/jsx-no-literals': 0,
    'react/jsx-no-undef': 1,
    'react/jsx-sort-props': 1,
    'react/jsx-uses-react': 1,

    'react/jsx-uses-vars': 1,
    'react/no-danger': 1,
    'react/no-did-mount-set-state': 0,
    'react/no-did-update-set-state': 1,
    'react/no-direct-mutation-state': 1,
    'react/no-multi-comp': 1,
    'react/no-set-state': 1,
    'react/no-unknown-property': 1,
    'react/prefer-es6-class': 1,
    'react/jsx-props-no-spreading': 0,
    'react/self-closing-comp': 1,
    'react/sort-comp': 0,
    semi: 0,
  },
};
