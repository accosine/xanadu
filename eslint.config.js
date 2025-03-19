import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import pluginJs from '@eslint/js';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';
import { configs as wcconfigs } from 'eslint-plugin-wc';

export default [
  { ...pluginJs.configs.all },
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{js,ts}', 'stories/**/*.{js,ts}'],
    languageOptions: { globals: globals.browser },
    plugins: { storybook },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-ternary': 'off',
      'no-undef': 'off',
      'one-var': 'off',
      'sort-imports': ['error', { ignoreCase: true }]
    }
  },
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    rules: { 'unicorn/better-regex': 'warn' }
  },
  wcconfigs['flat/recommended'],

  {
    rules: {
      'wc/attach-shadow-constructor': 'error',
      'wc/define-tag-after-class-definition': 'off',
      'wc/expose-class-on-global': 'off',
      'wc/file-name-matches-element': 'error',
      'wc/guard-define-call': 'error',
      'wc/guard-super-call': 'error',
      'wc/max-elements-per-file': 'error',
      'wc/no-child-traversal-in-attributechangedcallback': 'error',
      'wc/no-child-traversal-in-connectedcallback': 'off',
      'wc/no-closed-shadow-root': 'error',
      'wc/no-constructor': 'error',
      'wc/no-constructor-attributes': 'error',
      'wc/no-constructor-params': 'error',
      'wc/no-customized-built-in-elements': 'error',
      'wc/no-exports-with-element': 'error',
      'wc/no-invalid-element-name': 'error',
      'wc/no-invalid-extends': 'error',
      'wc/no-method-prefixed-with-on': 'error',
      'wc/no-self-class': 'error',
      'wc/no-typos': 'error',
      'wc/require-listener-teardown': 'error',
      'wc/tag-name-matches-class': 'error'
    }
  }
];
