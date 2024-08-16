import IstanbulPlugin from 'vite-plugin-istanbul';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';
import { folioTemplate } from './src/components/folio/templates';
import fs from 'node:fs';

const folioCss = fs.readFileSync('./src/components/folio/folio.css', {
  encoding: 'utf8',
  flag: 'r'
});

process.env.VITE_XANADU_COMPONENT_FOLIO_DSD = folioTemplate({
  css: folioCss,
  dsd: true,
  preview:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
});

export default defineConfig({
  build: {
    sourcemap: true,
    // cssMinify: 'lightningcss',
    lib: {
      entry: './src/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        dir: 'dist',
        preserveModules: true,
        entryFileNames: () => '[name].js'
      }
    }
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%'))
    }
  },
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
