module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended', // Use the recommended rules from eslint
    'plugin:@typescript-eslint/recommended', // Use the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'no-undef': 'off', // Disable the rule as TypeScript will handle this
    'react/jsx-no-target-blank': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "react/prop-types": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
