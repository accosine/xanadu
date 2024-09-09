import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import fs from 'node:fs';
import IstanbulPlugin from 'vite-plugin-istanbul';

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
