import countdownCss from './components/countdown/countdown.css?inline';
import { loader } from './loader.ts';
import { styler } from './styler.ts';
export { Countdown } from './components/countdown/countdown.ts';
import zineCss from './components/zine/zine.css?inline';

export const xanadu = () => {
  loader('x-countdown', 'Countdown');
  globalThis.addEventListener('DOMContentLoaded', () => {
    /**
     * Fire the web component loader, so custom elements can receive styling
     * from the outside.
     * */
    styler('x-countdown', countdownCss);
    loader('x-zine', 'Zine');
    styler('x-zine', zineCss);
  });
};

export default xanadu;
