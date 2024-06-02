import { Countdown } from './components/countdown.ts';

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
