import { folioTemplate } from './templates.ts';

/**
 * A class to represent the Folio web component
 */
export class Folio extends HTMLElement {
  imageInput: HTMLInputElement | undefined;
  previewImage: HTMLImageElement | null | undefined;
  labelElement: HTMLLabelElement | null | undefined;

  constructor() {
    super();
    if (!this.shadowRoot) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = folioTemplate({});
      const tmpl = wrapper.querySelector('template') as HTMLTemplateElement;
      const stencil = tmpl.content.cloneNode(true) as DocumentFragment;
      this.attachShadow({ mode: 'open' }).append(stencil);
    }
    this.prepareElements();
  }

  prepareElements() {
    if (this.shadowRoot) {
      this.imageInput = this.shadowRoot.querySelector(
        '#file'
      ) as HTMLInputElement;
      this.previewImage = this.shadowRoot.querySelector('img');
      if (!this.previewImage) {
        this.previewImage = document.createElement('img');
      }
      this.labelElement = this.shadowRoot.querySelector('label');
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
    this.imageInput?.addEventListener('change', () => {
      this.previewSelectedImage();
    });
  }

  disconnectedCallback() {
    this.imageInput?.removeEventListener('change', () => {
      this.previewSelectedImage();
    });
  }

  previewSelectedImage() {
    Folio.assert(
      this.shadowRoot instanceof ShadowRoot,
      'A ShadowRoot needs to be declared in the DOM.'
    );
    const imageInput = this.shadowRoot.querySelector(
      '#file'
    ) as HTMLInputElement;
    const [file] = imageInput.files || [];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (event) => {
        Folio.assert(
          this.previewImage instanceof HTMLImageElement,
          'A ShadowRoot needs to be declared in the DOM.'
        );
        Folio.assert(
          typeof event.target?.result === 'string',
          'Event.target.result needs to be a string.'
        );
        this.previewImage.src = event.target.result;
      });
      Folio.assert(
        this.labelElement instanceof HTMLLabelElement,
        'A ShadowRoot needs to be declared in the DOM.'
      );
      this.labelElement.after(this.previewImage as Node);
      this.labelElement.remove();
    }
  }

  static assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
      throw new Error(message);
    }
  }
}

export default Folio;
