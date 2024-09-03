/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
// @ts-nocheck
// import { zineTemplate } from './templates.ts';

/**
 * A class to represent the Zine web component
 */
export class Zine extends HTMLElement {
  // eslint-disable-next-line wc/no-constructor
  constructor() {
    super();
    if (this.shadowRoot) {
      const imageInput = this.shadowRoot.querySelector('#file');
      const previewImage = this.shadowRoot.querySelector('#previewImage');
      const previewSelectedImage = () => {
        const [file] = imageInput.files;
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener('load', (e) => {
            previewImage.src = e.target.result;
          });
        }
      };
      imageInput.addEventListener('change', previewSelectedImage);
    }
  }

  /**
   * Web component can be registered with as `<x-zine>`
   */
  static register(tagName?: string) {
    globalThis.window.customElements.define(tagName || 'x-zine', Zine);
  }
}

export default Zine;
