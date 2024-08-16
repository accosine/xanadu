import countdownCss from './components/countdown/countdown.css?inline';
import folioCss from './components/folio/folio.css?inline';
import { loader } from './loader.ts';
import { styler } from './styler.ts';
import zineCss from './components/zine/zine.css?inline';
export { Countdown } from './components/countdown/countdown.ts';
export { Folio } from './components/folio/folio.ts';

export const xanadu = () => {
  loader('x-countdown', 'Countdown');
  loader('x-zine', 'Zine');
  loader('x-folio', 'Folio');
  globalThis.addEventListener('DOMContentLoaded', () => {
    /**
     * Fire the web component styler, so custom elements can receive styling
     * from the outside.
     * */
    styler('x-countdown', countdownCss);
    styler('x-zine', zineCss);
    styler('x-folio', folioCss);
  });
};

export default xanadu;
