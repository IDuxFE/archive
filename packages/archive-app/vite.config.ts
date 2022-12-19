/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

const external = [/^@idux\/archive-utils/, /^virtual:archive/, '__External_Vue__']

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({ enableObjectSlots: false }),
    {
      name: 'transform-external-vue',
      enforce: 'post',
      closeBundle() {
        const distDir = resolve(__dirname, './dist')
        try {
          readdirSync(distDir).forEach(file => {
            try {
              const filePath = resolve(distDir, file)
              const content = readFileSync(filePath, 'utf-8')

              if (content.includes('__External_Vue__')) {
                writeFileSync(filePath, content.replace(/__External_Vue__/, 'vue'), 'utf-8')
              }
            } catch (err) {
              void 0
            }
          })
        } catch (err) {
          void 0
        }
      },
    },
  ],
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
