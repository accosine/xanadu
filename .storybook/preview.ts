import { loader, styler } from '../src/loaders/loader.ts';
import type { Preview } from '@storybook/web-components';
import countdownCss from '../src/components/countdown.css?inline';

// Wait for the preview frame in storybook to have fully loaded
addEventListener('DOMContentLoaded', (event) => {
  /**
   * Then fire the web component loader, so custom elements can receive styling
   * from the outside.
   * */
  loader('x-countdown', 'Countdown');
  styler('x-countdown', countdownCss);
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
