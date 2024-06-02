import { Countdown } from './components/countdown.ts';

type AllCustomElements = Countdown;

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
