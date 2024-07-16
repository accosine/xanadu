import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import pluginJs from '@eslint/js';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';
import wc from 'eslint-plugin-wc';

export default [
  { ...pluginJs.configs.all },
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{js,ts}', 'stories/**/*.{js,ts}'],
    languageOptions: { globals: globals.browser },
    plugins: { storybook },
    rules: {
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
  // 👇 Replace with "wc.configs.all" after it
  // has become truly compatible with flat config
  {
    // ...wc.configs.all,
    plugins: { wc },
    rules: {
      // wc - recommended
      'wc/no-constructor-attributes': 'error',
      'wc/no-invalid-element-name': 'error',
      'wc/no-self-class': 'error',

      // wc - best practice
      'wc/attach-shadow-constructor': 'error',
      'wc/guard-super-call': 'error',
      'wc/no-child-traversal-in-attributechangedcallback': 'error',
      'wc/no-child-traversal-in-connectedcallback': 'off',
      'wc/no-closed-shadow-root': 'error',
      'wc/no-constructor-params': 'error',
      'wc/no-customized-built-in-elements': 'error',
      'wc/no-invalid-extends': 'error',
      'wc/no-typos': 'error',
      'wc/require-listener-teardown': 'error',

      // wc - preference/convention
      'wc/define-tag-after-class-definition': 'off',
      'wc/expose-class-on-global': 'off',
      'wc/file-name-matches-element': 'error',
      'wc/guard-define-call': 'error',
      'wc/max-elements-per-file': 'error',
      'wc/no-constructor': 'error',
      'wc/no-exports-with-element': 'error',
      'wc/no-method-prefixed-with-on': 'error',
      'wc/tag-name-matches-class': 'error'
    }
  }
];
