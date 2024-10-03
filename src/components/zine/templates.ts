type ZineTemplateType = {
  css?: string;
  dsd?: boolean;
  folioShadowRoot?: string;
};

export const zineTemplate = ({
  css = '',
  dsd = false,
  folioShadowRoot = ''
}: ZineTemplateType) => {
  const styles = css ? `<style>${css}</style>` : '';
  const shadowrootmode = dsd ? 'shadowrootmode="open"' : '';

  return `<template ${shadowrootmode}>
          ${styles}
          <dialog class="a4">
            <section class="sheet">
              <button>X</button>
              <div class="grid">
                <x-folio>${folioShadowRoot}</x-folio>
                <x-folio>${folioShadowRoot}</x-folio>
                <x-folio>${folioShadowRoot}</x-folio>
                <x-folio>${folioShadowRoot}</x-folio>
                <x-folio>${folioShadowRoot}</x-folio>
                <x-folio>${folioShadowRoot}</x-folio>
                <x-folio>${folioShadowRoot}</x-folio>
                <x-folio>${folioShadowRoot}</x-folio>
              </div>
            </section>
          </dialog>
        </template>
        `;
};

export default zineTemplate;
