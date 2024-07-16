import { Countdown } from './components/countdown/countdown.ts';
import { Zine } from './components/zine/zine.ts';

const customElementclasses = { Countdown, Zine };

export const loader = (
  customElementTag: string,
  customElementClassName: 'Countdown' | 'Zine'
) => {
  if (!('customElements' in globalThis.window)) {
    console.warn('No Custom Elements available');
    return;
  }

  if (customElements.get(customElementTag)) {
    console.warn(`${customElementTag} already registered`);
    return;
  }
  customElementclasses[customElementClassName].register(customElementTag);
};
