/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

// import pkg from './package.json'

// const external = [...Object.keys(pkg.dependencies), 'vue', 'vue-router', /^@idux/, /^virtual:archive/]

const external = [/^@idux\/archive-utils/, /^virtual:archive/]

export default defineConfig({
  plugins: [vue(), vueJsx({ enableObjectSlots: false })],
  resolve: {
    alias: [{ find: '@idux/archive-app/vue', replacement: resolve(__dirname, './venderVue') }],
  },
  build: {
    emptyOutDir: false,
    outDir: 'dist',
    lib: {
      entry: '',
      formats: ['es'],
    },
    rollupOptions: {
      external,

      input: ['./index.ts', './venderVue.ts', './components.ts'],

      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
        // preserveModulesRoot: 'src/app',
      },
      treeshake: true,
      preserveEntrySignatures: 'strict',
    },
    cssCodeSplit: false,
    minify: false,
  },
})
