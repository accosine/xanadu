type FolioTemplateType = {
  css?: string;
  preview?: string;
  dsd?: boolean;
};

export const folioTemplate = ({
  css = '',
  preview = '',
  dsd = false
}: FolioTemplateType) => {
  const styles = css ? `<style>${css}</style>` : '';
  const shadowrootmode = dsd ? 'shadowrootmode="open"' : '';
  const previewImage = preview
    ? `<img id="previewImage" alt="Preview" src="${preview}"/>`
    : '';

  return `<template ${shadowrootmode}>
          ${styles}
          <input type="file" name="file" id="file" accept=".jpg, .jpeg, .png" />
          <label for="file">Choose a file (Click me)</label>
          ${previewImage}
        </template>`;
};

export default folioTemplate;
