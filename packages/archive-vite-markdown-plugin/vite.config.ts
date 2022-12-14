/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { builtinModules } from 'module'

import { defineConfig } from 'vite'

import pkg from './package.json'
// import { resolve } from 'path'

// const ROOT = fileURLToPath(import.meta.url)
// const r = (p: string) => resolve(ROOT, '..', p)

const external = [
  ...Object.keys(pkg.dependencies),
  ...builtinModules.flatMap(m => (m.includes('punycode') ? [] : [m, `node:${m}`])),
]

export default defineConfig({
  build: {
    emptyOutDir: false,
    target: 'esnext',

    lib: {
      entry: './index.ts',
      formats: ['es', 'cjs'],
      fileName: format => (format === 'cjs' ? 'index.cjs' : 'index.mjs'),
    },

    rollupOptions: {
      external,
    },
  },
})
