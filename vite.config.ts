import IstanbulPlugin from 'vite-plugin-istanbul';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

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
    dts(/* { rollupTypes: true }*/),
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
