import { Countdown } from '../index.ts';
import css from '../components/countdown.css?inline';

export const loadCountdown = () => {
  if ('customElements' in globalThis.window) {
    /*eslint no-unused-expressions: ["error", { "allowShortCircuit": true }]*/
    customElements.get('x-countdown') || Countdown.register();
  }

  const styles = new CSSStyleSheet();
  styles.replaceSync(css);

  const allCountdowns = document.getElementsByTagName(
    'x-countdown'
  ) as HTMLCollectionOf<Countdown>;

  for (const customElement of allCountdowns) {
    customElement.addStylesheet(styles);
  }
};

export default loadCountdown;
