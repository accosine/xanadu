import { Countdown } from '../components/countdown.ts';

type AllCustomElements = Countdown;

const customElementclasses = { Countdown };

export const loader = (
  customElementTag: string,
  customElementClassName: 'Countdown'
) => {
  if (!('customElements' in globalThis.window)) {
    // eslint-disable-next-line no-console
    console.warn('No Custom Elements available');
    return;
  }

  if (customElements.get(customElementTag)) {
    // eslint-disable-next-line no-console
    console.warn(`${customElementTag} already registered`);
    return;
  }
  customElementclasses[customElementClassName].register();
};

export const styler = <T extends AllCustomElements>(
  customElementTag: string,
  customElementStyles: string
) => {
  const styles = new CSSStyleSheet();
  styles.replaceSync(customElementStyles);

  const allCountdowns = document.querySelectorAll(
    customElementTag
  ) as NodeListOf<T>;

  for (const customElement of allCountdowns) {
    customElement.addStylesheet(styles);
  }
};
