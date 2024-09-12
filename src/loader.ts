import { Countdown } from './components/countdown.ts';

const customElementclasses = { Countdown };

export const loader = (
  customElementTag: string,
  customElementClassName: 'Countdown'
) => {
  if (customElements.get(customElementTag)) {
    console.warn(`${customElementTag} already registered`);
    return;
  }
  customElementclasses[customElementClassName].register(customElementTag);
};
