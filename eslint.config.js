const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const stylistic = require('@stylistic/eslint-plugin');
const globals = require('globals');

// Flat-config migration of the former .eslintrc.
// airbnb-base (unmaintained, no flat-config support) is replaced by
// @eslint/js + typescript-eslint recommended, with the project's explicit
// style/behaviour rules carried over (formatting rules now live in @stylistic).
module.exports = tseslint.config(
  { ignores: ['dist/**', 'coverage/**'] },
  // Enforce that every eslint-disable marks a real, currently-used exception.
  { linterOptions: { reportUnusedDisableDirectives: 'error' } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { '@stylistic': stylistic },
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: { ...globals.node, ...globals.jest },
    },
    rules: {
      // --- formatting (carried over from .eslintrc, now via @stylistic) ---
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: 'always' }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/comma-spacing': 'error',
      '@stylistic/max-len': ['error', { code: 120, ignoreComments: true }],

      // --- behaviour tweaks carried over from .eslintrc ---
      'no-console': ['warn', { allow: ['info', 'warn', 'error', 'debug', 'trace'] }],
      'no-plusplus': 'off',
      'no-underscore-dangle': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      // enforced; intentional exceptions opt out with a local eslint-disable
      'no-nested-ternary': 'error',
      'no-param-reassign': 'error',
      'no-await-in-loop': 'error',
      'no-loop-func': 'error',
      'no-continue': 'error',
      'no-bitwise': 'error',

      // --- relaxations for this codebase (was no-unused-vars off; heavy any usage) ---
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // codebase idiom `<T extends unknown>` / `<T extends any>` is intentional
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      // type-introspection utilities intentionally reference these types
      // (e.g. isBigInt/isSymbol guards, Function-typed callbacks)
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
    },
  },
  {
    // Vendored third-party fork — don't hold it to our rule set.
    files: ['src/object-hash/**/*.ts'],
    rules: {
      '@typescript-eslint/no-this-alias': 'off',
    },
  },
);
