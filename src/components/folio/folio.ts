import { folioTemplate } from './templates.ts';

/**
 * A class to represent the Zine web component
 */
export class Folio extends HTMLElement {
  // eslint-disable-next-line wc/no-constructor, max-statements
  constructor() {
    super();
    if (!this.shadowRoot) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = folioTemplate({});
      const tmpl = wrapper.querySelector('template') as HTMLTemplateElement;
      const stencil = tmpl.content.cloneNode(true) as DocumentFragment;
      this.attachShadow({ mode: 'open' }).append(stencil);
    }
    if (this.shadowRoot) {
      const imageInput = this.shadowRoot.querySelector(
        '#file'
      ) as HTMLInputElement;
      let previewImage = this.shadowRoot.querySelector('img');
      if (!previewImage) {
        previewImage = document.createElement('img');
      }
      const labelElement = this.shadowRoot.querySelector('label');

      const previewSelectedImage = () => {
        const [file] = imageInput.files || [];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener('load', (event) => {
            previewImage.src = event.target.result;
          });
          labelElement.after(previewImage);
          labelElement.remove();
        }
      };
      imageInput.addEventListener('change', previewSelectedImage);
    }
  }

  /**
   * Web component can be registered with as `<x-zine>`
   */
  static register(tagName?: string) {
    globalThis.window.customElements.define(tagName || 'x-folio', Folio);
  }

  addStylesheet(styles: CSSStyleSheet) {
    if (styles && this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [styles];
    }
  }
}

export default Folio;
