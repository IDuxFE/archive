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

const external = [
  /^@idux\/(archive-utils)/,
  'external:@idux/archive-loader-vue/client',
  '__External_Vue__',
  '@idux/archive-app/createDemoInstance',
]

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

              if (
                content.includes('__External_Vue__') ||
                content.includes('external:@idux/archive-loader-vue/client')
              ) {
                writeFileSync(
                  filePath,
                  content
                    .replace(/__External_Vue__/g, 'vue')
                    .replace(/external:@idux\/archive-loader-vue\/client/g, '@idux/archive-loader-vue/client'),
                  'utf-8',
                )
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
  build: {
    emptyOutDir: false,
    outDir: 'dist',
    lib: {
      entry: '',
      formats: ['es'],
    },
    rollupOptions: {
      external,

      input: [
        './mountApp.ts',
        './createAllPageComponent.ts',
        './createAllPageInstance.ts',
        './createDemoInstance.ts',
        './vendor/vue.ts',
        './vendor/components.ts',
      ],

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
