import { folioTemplate } from './templates.ts';
import Xanadu from '../../xanadu.ts';

/**
 * A class to represent the Folio web component
 */
export class Folio extends Xanadu {
  imageInput: HTMLInputElement | undefined;
  previewImage: HTMLImageElement | null | undefined;
  labelElement: HTMLLabelElement | null | undefined;

  // eslint-disable-next-line wc/no-constructor
  constructor() {
    super();
    if (!this.shadowRoot) {
      const template = Folio.prepareTemplate(folioTemplate({}));
      this.attachShadow({ mode: 'open' }).append(template);
    }
    this.prepareElements();
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

  prepareElements() {
    Folio.assert(
      this.shadowRoot instanceof ShadowRoot,
      'A ShadowRoot needs to be declared in the DOM.'
    );
    this.imageInput = this.shadowRoot.querySelector(
      '#file'
    ) as HTMLInputElement;
    this.previewImage = this.shadowRoot.querySelector('img');
    if (!this.previewImage) {
      this.previewImage = document.createElement('img');
    }
    this.labelElement = this.shadowRoot.querySelector('label');
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
}

export default Folio;
