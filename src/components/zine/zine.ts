import XanaduElement from '../../xanadu-element.ts';
import { zineTemplate } from './templates.ts';

/**
 * A class to represent the Zine web component
 *
 */
export class Zine extends XanaduElement {
  button: HTMLButtonElement | null | undefined;
  dialog: HTMLDialogElement | null | undefined;
  closeButtonHandler: () => void;

  constructor() {
    super();
    if (!this.shadowRoot) {
      const template = Zine.prepareTemplate(zineTemplate({}));
      this.attachShadow({ mode: 'open' }).append(template);
    }
    Zine.assert(
      this.shadowRoot instanceof ShadowRoot,
      'A ShadowRoot needs to be declared in the DOM.'
    );
    this.button = this.shadowRoot.querySelector('button') as HTMLButtonElement;
    this.dialog = this.shadowRoot.querySelector('dialog');
    this.closeButtonHandler = this.#createCloseButtonClickHandler();
  }

  #createCloseButtonClickHandler() {
    return () => {
      this.dialog?.close();
      this.removeAttribute('open');
    };
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.button?.addEventListener('click', this.closeButtonHandler);
    }
  }

  disconnectedCallback() {
    if (this.shadowRoot) {
      this.button?.removeEventListener('click', this.closeButtonHandler);
    }
  }

  /**
   * The list of attributes which will call the a`attributeChangedCallback`
   */
  static get observedAttributes(): string[] {
    return ['open'];
  }

  attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
    if (newValue !== null) {
      this.dialog?.show();
    }
    if (newValue === null) {
      this.dialog?.close();
    }
  }

  /**
   * Web component can be registered with as `<x-zine>`
   */
  static register(tagName?: string) {
    globalThis.window.customElements.define(tagName || 'x-zine', Zine);
  }

  addStylesheet(styles: CSSStyleSheet) {
    if (this.shadowRoot && styles) {
      this.shadowRoot.adoptedStyleSheets = [styles];
    }
  }
}

export default Zine;
