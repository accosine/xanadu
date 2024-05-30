import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import pluginJs from '@eslint/js';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

export default [
  { ...pluginJs.configs.all },
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{js,ts}', 'stories/**/*.{js,ts}'],
    languageOptions: { globals: globals.browser },
    plugins: {
      storybook
    },
    rules: {
      'no-ternary': 'off',
      'no-undef': 'off',
      'one-var': 'off',
      'sort-imports': ['error', { ignoreCase: true }]
    }
  },
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    rules: {
      'unicorn/better-regex': 'warn'
    }
  }
];
