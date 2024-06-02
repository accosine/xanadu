import countdownCss from './components/countdown.css?inline';
import { loader } from './loader.ts';
import { styler } from './styler.ts';
export { Countdown } from './components/countdown.ts';

export const xanadu = () => {
  globalThis.addEventListener('DOMContentLoaded', () => {
    /**
     * Fire the web component loader, so custom elements can receive styling
     * from the outside.
     * */
    loader('x-countdown', 'Countdown');
    styler('x-countdown', countdownCss);
  });
};

export default xanadu;
