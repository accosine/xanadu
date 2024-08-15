import { folioTemplate } from './templates.ts';

/**
 * A class to represent the Folio web component
 */
export class Folio extends HTMLElement {
  imageInput: HTMLInputElement | undefined;
  previewImage: HTMLImageElement | null | undefined;
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
      this.imageInput = this.shadowRoot.querySelector(
        '#file'
      ) as HTMLInputElement;
      this.previewImage = this.shadowRoot.querySelector('img');
      if (!this.previewImage) {
        this.previewImage = document.createElement('img');
      }
      const labelElement = this.shadowRoot.querySelector('label');
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

  connectedCallback() {
    this.imageInput?.addEventListener('change', (event) => {
      this.previewSelectedImage();
    });
  }

  disconnectedCallback() {
    this.imageInput?.removeEventListener('change', (event) => {
      this.previewSelectedImage();
    });
  }

  previewSelectedImage() {
    const labelElement = this.shadowRoot.querySelector('label');
    const imageInput = this.shadowRoot.querySelector(
      '#file'
    ) as HTMLInputElement;
    const [file] = imageInput.files || [];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (event) => {
        this.previewImage.src = event.target.result;
      });
      labelElement.after(this.previewImage);
      labelElement.remove();
    }
  }
}

export default Folio;
