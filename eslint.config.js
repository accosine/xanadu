import eslintPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import storybook from 'eslint-plugin-storybook';

export default [
  {
    plugins: {
      storybook
    },
    files: ['src/**/*.{js,ts}', 'stories/**/*.{js,ts}'],
    ...js.configs.all
  },
  {
    files: ['src/**/*.{js,ts}', 'stories/**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        myCustomGlobal: 'readonly'
      },
      parser: typescriptParser,
      sourceType: 'module'
    },
    plugins: { eslintPlugin },
    rules: {
      'no-ternary': 'off',
      'one-var': 'off',
      'sort-imports': ['error', { ignoreCase: true }],
      'no-undef': 'off'
    }
  }
];
