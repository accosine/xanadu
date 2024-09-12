import { Countdown } from './components/countdown/countdown.ts';
import { Folio } from './components/folio/folio.ts';
import { Zine } from './components/zine/zine.ts';

const customElementclasses = { Countdown, Folio, Zine };

export const loader = (
  customElementTag: string,
  customElementClassName: 'Countdown' | 'Folio' | 'Zine'
) => {
  if (customElements.get(customElementTag)) {
    console.warn(`${customElementTag} already registered`);
    return;
  }
  customElementclasses[customElementClassName].register(customElementTag);
};
