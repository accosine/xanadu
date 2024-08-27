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

// <x-zine>
//   <template shadowrootmode="open">
//     <style>
//       :host {
//         background-color: brown;
//         display: grid;
//         grid-template-rows: repeat(4, 1fr);
//         grid-template-columns: 1fr 1fr;

//         label {
//           position: absolute;
//         }

//         /* visibility: hidden etc. wont work */
//         [type='file'] {
//           width: 0.1px;
//           height: 0.1px;
//           opacity: 0;
//           overflow: hidden;
//           position: absolute;
//           z-index: -1;
//         }

//         [type='file']:focus + label {
//           /* keyboard navigation */
//           outline: 1px dotted #000;
//           outline: -webkit-focus-ring-color auto 5px;
//         }

//         [type='file'] + label * {
//           pointer-events: none;
//         }

//         img {
//           width: 100%;
//           height: 100%;
//         }

//         .container {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           flex-direction: column;
//           justify-content: center;
//         }
//         dialog {
//           position: fixed;
//           top: 0px;
//           left: 0px;
//           border: 0px;
//           padding: 0px;
//           width: 100vw;
//           height: 100vh;
//           /* display: flex;
//           align-items: center;
//           flex-direction: column;
//           justify-content: center; */
//         }
//       }
//     </style>
//     <dialog open>
//       <input
//         type="file"
//         name="file"
//         id="file"
//         accept=".jpg, .jpeg, .png"
//       />
//       <label for="file">Choose a file (Click me)</label>
//       <img id="previewImage" alt="Preview" />
//     </dialog>
//   </template>
//   <script>
//     (function () {
//       class MyElement extends HTMLElement {
//         constructor() {
//           super();
//           if (this.shadowRoot) {
//             // A Declarative Shadow Root exists!
//             // wire up event listeners, references, etc.:
//             //
//             // const button = this.shadowRoot;
//             // button.addEventListener('click', () => console.log('ladida'));

//             const imageInput = this.shadowRoot.getElementById('file');
//             const root = this.shadowRoot;
//             // console.log(this.shadowRoot.querySelectorAll('slot'));
//             const previewImage =
//               this.shadowRoot.getElementById('previewImage');
//             function previewSelectedImage() {
//               console.log('bla');
//               console.log(root.querySelectorAll("[type='file']"));
//               const [file] = imageInput.files;
//               if (file) {
//                 const reader = new FileReader();
//                 reader.readAsDataURL(file);
//                 reader.onload = function (e) {
//                   previewImage.src = e.target.result;
//                 };
//               }
//             }
//             imageInput.addEventListener('change', previewSelectedImage);
//           }

//           //       const shadowRoot = this.attachShadow({ mode: 'open' });
//           //       const template = document.createElement('template');
//           //       template.innerHTML = `
//           //   <div>
//           //     <button>
//           //       <slot> <em>left</em> </slot>
//           //     </button>
//           //   </div>
//           // `;
//           //       shadowRoot.append(template.content.cloneNode(true));

//           //       shadowRoot.addEventListener('click', (event) => {
//           //         // normal event delegation stuff,
//           //         const button = event.target.closest('button');
//           //         if (!button) return;
//           //         // do somthing with button
//           //         console.log(button);
//           //       });
//         }
//       }

//       customElements.define('my-element', MyElement);
//     })();
//   </script>
// </x-zine>
