import { loader, styler } from './loaders/loader.ts';
import countdownCss from './components/countdown.css?inline';

// Load Countdown custom element and corresponding stlyes
loader('x-countdown', 'Countdown');
styler('x-countdown', countdownCss);
