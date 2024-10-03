export class XanaduElement extends HTMLElement {
  addStylesheet(styles: CSSStyleSheet) {
    if (styles && this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [styles];
    }
  }

  static register(tagName: string) {
    globalThis.window.customElements.define(tagName, this);
  }

  static assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
      throw new Error(message);
    }
  }

  static prepareTemplate(stencil: string) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = stencil;
    const template = wrapper.querySelector('template') as HTMLTemplateElement;
    return template.content.cloneNode(true) as DocumentFragment;
  }
}

export default XanaduElement;
