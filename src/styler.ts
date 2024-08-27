import { Countdown } from './components/countdown/countdown.ts';

type AllCustomElements = Countdown;

export const styler = <T extends AllCustomElements>(
  customElementTag: string,
  customElementStyles: string
) => {
  const styles = new CSSStyleSheet();
  styles.replaceSync(customElementStyles);

  const allCustomElements = document.querySelectorAll(
    customElementTag
  ) as NodeListOf<T>;

  for (const customElement of allCustomElements) {
    customElement.addStylesheet(styles);
  }
};
