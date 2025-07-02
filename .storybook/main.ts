import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  addons: ['@storybook/addon-docs'],
  docs: { autodocs: 'tag' },
  framework: { name: '@storybook/web-components-vite', options: {} },
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ]
};
export default config;
