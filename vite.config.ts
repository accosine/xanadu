import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { folioTemplate } from './src/components/folio/templates';
import fs from 'node:fs';
import IstanbulPlugin from 'vite-plugin-istanbul';
import { zineTemplate } from './src/components/zine/templates';

const folioCss = fs.readFileSync('./src/components/folio/folio.css', {
  encoding: 'utf8',
  flag: 'r'
});

const zineCss = fs.readFileSync('./src/components/zine/zine.css', {
  encoding: 'utf8',
  flag: 'r'
});

process.env.VITE_XANADU_COMPONENT_FOLIO_DSD = folioTemplate({
  css: folioCss,
  dsd: true,
  preview:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
});

process.env.VITE_XANADU_COMPONENT_ZINE_DSD = zineTemplate({
  css: zineCss,
  dsd: true,
  folioShadowRoot: process.env.VITE_XANADU_COMPONENT_FOLIO_DSD
});

export default defineConfig({
  build: {
    // cssMinify: 'lightningcss',
    lib: {
      entry: './src/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        dir: 'dist',
        entryFileNames: () => '[name].js',
        preserveModules: true
      }
    },
    sourcemap: true
  },
  // css: {
  //   lightningcss: {
  //     targets: browserslistToTargets(browserslist('>= 0.25%'))
  //   },
  //   transformer: 'lightningcss'
  // },
  plugins: [
    dts({
      include: ['src', 'declaration.d.ts'],
      outDir: 'dist',
      rollupTypes: true,
      strictOutput: false
    }),
    ...(process.env.USE_BABEL_PLUGIN_ISTANBUL
      ? [
          IstanbulPlugin({
            include: './src/*',
            exclude: ['node_modules', 'test/'],
            extension: ['.js', '.ts']
          })
        ]
      : [])
  ]
});
