import type { Preview } from '@storybook/web-components';
import { loadCountdown } from '../src/loaders/countdown_loader.ts';

// Wait for the preview frame in storybook to have fully loaded
addEventListener('DOMContentLoaded', (event) => {
  /**
   * Then fire the web component loader, so custom elements can receive styling
   * from the outside.
   * */
  loadCountdown();
});

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
