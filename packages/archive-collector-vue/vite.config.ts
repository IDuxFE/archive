/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { builtinModules } from 'module'

import { defineConfig } from 'vite'

import pkg from './package.json'

const external = [
  ...Object.keys(pkg.dependencies),
  ...builtinModules.flatMap(m => (m.includes('punycode') ? [] : [m, `node:${m}`])),
  'vue',
  /^@idux/,
]

export default defineConfig({
  esbuild: {
    target: 'ESNext',
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    legalComments: 'none',
  },
  build: {
    emptyOutDir: false,
    target: 'esnext',
    cssCodeSplit: true,

    lib: {
      entry: ['./index.ts', './client.ts'],
      formats: ['es', 'cjs'],
      fileName: (format, entry) => (format === 'cjs' ? `${entry}.cjs` : `${entry}.js`),
    },

    rollupOptions: {
      external,
    },
  },
  define: {
    __import_meta_hot__: 'import.meta.hot',
  },
})
