module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'import', 'filenames'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Custom Rules (CR)
    'filenames/match-regex': ['error', '^[a-z0-9._-]+$', true],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        selector: 'function',
        format: ['camelCase'],
      },
      {
        selector: 'method',
        format: ['camelCase'],
      },
    ],
    'import/no-default-export': 'error',
    // Recommended Rules (RR)
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'max-len': ['error', { code: 80 }],
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
    'no-var': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'default-case': 'error',
    'curly': ['error', 'all'],
    'no-with': 'error',
    'constructor-super': 'error',
    'new-parens': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
