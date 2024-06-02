import type { Preview } from '@storybook/web-components';
import xanadu from '../src/index';
xanadu();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
