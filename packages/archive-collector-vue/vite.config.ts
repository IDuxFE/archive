import { defineConfig } from 'vite'
import { builtinModules } from 'module'
import pkg from './package.json'

const external = [
  ...Object.keys(pkg.dependencies),
  ...builtinModules.flatMap((m) =>
    m.includes('punycode') ? [] : [m, `node:${m}`]
  ),
  'vue',
  /^@idux/
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
      entry: '',
      formats: ['es'],
    },

    rollupOptions: {
      external,
      input: {
        'index': './index.ts' ,
        'client': './client.ts' ,
      },
      output: {
        entryFileNames: '[name].mjs',
      }
    },
  },
  define: {
    __import_meta_hot__: 'import.meta.hot'
  }
})
