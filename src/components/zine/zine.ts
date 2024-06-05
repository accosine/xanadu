/**
 * A class to represent the Zine web component
 */
export class Zine extends HTMLElement {
  /**
   * Web component can be registered with as `<countdown-o-tronic>`
   */
  static register(tagName?: string) {
    globalThis.window.customElements.define(tagName || 'x-zine', Zine);
  }

  /**
   * The list of attributes which will call the an `attributeChangedCallback`
   */
  static get observedAttributes(): string[] {
    return ['days', 'hours', 'minutes', 'seconds'];
  }

  /**
   * Give this element its own encapsulated DOM
   */
  #shadowRoot: ShadowRoot = this.attachShadow({ mode: 'open' });

  // Initialize private state

  #start = Date.now();

  /**
   * Setup when the compontent was mounted into the DOM
   */
  connectedCallback() {
    this.#shadowRoot.replaceChildren('hello asdf');
  }

  /**
   * Called whenever the list of attributes in `observedAttributes` changes
   */
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {}

  addStylesheet(styles: CSSStyleSheet) {
    if (styles) {
      this.#shadowRoot.adoptedStyleSheets = [styles];
    }
  }
}

export default Zine;
