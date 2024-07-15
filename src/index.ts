import countdownCss from './components/countdown.css?inline';
import { loader } from './loader.ts';
import { styler } from './styler.ts';
export { Countdown } from './components/countdown.ts';

export const xanadu = () => {
  loader('x-countdown', 'Countdown');
  globalThis.addEventListener('DOMContentLoaded', () => {
    /**
     * Fire the web component loader, so custom elements can receive styling
     * from the outside.
     * */
    styler('x-countdown', countdownCss);
  });
};

export default xanadu;
