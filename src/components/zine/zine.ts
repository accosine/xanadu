/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { zineTemplate } from './templates.ts';
const testTemplate = `<span id="hi">I am still empty</span> <button id='aloha'>CLICK ME</button>`;

/**
 * A class to represent the Zine web component
 */
export class Zine extends HTMLElement {
  /**
   * Web component can be registered with as `<x-zine>`
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

  static #qwerEventDispatcher = (element: HTMLElement) => () => {
    element.dispatchEvent(new CustomEvent('myEvent'));
  };

  static #myEventHandler = (element: HTMLElement) => () => {
    element.innerHTML = 'button has been clicked';
  };

  static #cloneTemplates(templates: string[]) {
    const stencils: DocumentFragment[] = [];
    for (const template of templates) {
      const blueprint = document.createElement(
        'template'
      ) as HTMLTemplateElement;
      blueprint.innerHTML = template;
      const stencil = blueprint.content.cloneNode(true) as DocumentFragment;
      stencils.push(stencil);
    }
    return stencils;
  }

  static #render(): DocumentFragment {
    const [asdf, zineStencil] = Zine.#cloneTemplates([
      testTemplate,
      zineTemplate
    ]);
    const newDiv = document.createElement('div');

    const span = asdf.querySelector('#hi');
    const button = asdf.querySelector('#aloha');

    Zine.assert(
      button instanceof HTMLButtonElement,
      "A <button> element of id 'blubb' needs to exist in the DOM."
    );
    Zine.assert(
      span instanceof HTMLSpanElement,
      "A <span> element of id 'blubb' needs to exist in the DOM."
    );

    button.addEventListener('click', Zine.#qwerEventDispatcher(span));
    span.addEventListener('myEvent', Zine.#myEventHandler(span));

    // newDiv.append(button, span, zineStencil);
    // newDiv.append(zineStencil);

    const stories = zineStencil.querySelector('.is-stories') as HTMLElement;
    const median = stories.offsetLeft + stories.clientWidth / 2;

    const state = {
      current_story: stories.firstElementChild?.lastElementChild
    };

    stories.addEventListener('click', (e) => {
      const { target } = e;
      // Note e.g. XHR requests can be event targets, no nodeName
      if (!(target instanceof HTMLElement)) {
        console.error('asdf');
        return;
      }

      if (target.nodeName !== 'ARTICLE') return;
      navigateStories(e.clientX > median ? 'next' : 'prev');
    });

    zineStencil.addEventListener('keydown', ({ key }) => {
      if (key !== 'ArrowDown' || key !== 'ArrowUp')
        navigateStories(key === 'ArrowDown' ? 'next' : 'prev');
    });

    // eslint-disable-next-line max-statements
    const navigateStories = (direction) => {
      const story = state.current_story;
      const lastItemInUserStory = story.parentNode.firstElementChild;
      const firstItemInUserStory = story.parentNode.lastElementChild;
      const hasNextUserStory = story.parentElement.nextElementSibling;
      const hasPrevUserStory = story.parentElement.previousElementSibling;

      if (direction === 'next') {
        if (lastItemInUserStory === story && !hasNextUserStory) return;
        else if (lastItemInUserStory === story && hasNextUserStory) {
          state.current_story =
            story.parentElement.nextElementSibling.lastElementChild;
          story.parentElement.nextElementSibling.scrollIntoView({
            behavior: 'smooth'
          });
        } else {
          story.classList.add('is-seen');
          state.current_story = story.previousElementSibling;
        }
      } else if (direction === 'prev') {
        if (firstItemInUserStory === story && !hasPrevUserStory) return;
        else if (firstItemInUserStory === story && hasPrevUserStory) {
          state.current_story =
            story.parentElement.previousElementSibling.firstElementChild;
          story.parentElement.previousElementSibling.scrollIntoView({
            behavior: 'smooth'
          });
        } else {
          story.nextElementSibling.classList.remove('is-seen');
          state.current_story = story.nextElementSibling;
        }
      }
    };

    return zineStencil;
  }

  /**
   * Setup when the compontent was mounted into the DOM
   */
  connectedCallback() {
    this.#shadowRoot.append(Zine.#render());
  }

  /**
   * Called whenever the list of attributes in `observedAttributes` changes
   */

  addStylesheet(styles: CSSStyleSheet) {
    if (styles) {
      this.#shadowRoot.adoptedStyleSheets = [styles];
    }
  }

  static assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
      throw new Error(message);
    }
  }
}

export default Zine;
