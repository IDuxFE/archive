import { readFileSync } from 'fs'
import { builtinModules } from 'module'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import { build } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

const external = [
  ...Object.keys(pkg.dependencies),
  ...builtinModules.flatMap(m => (m.includes('punycode') ? [] : [m, `node:${m}`])),
  /^@idux/,
  'vite',
]

const getConfig = buildOption => ({
  configFile: false,
  build: {
    emptyOutDir: false,
    target: 'esnext',

    lib: {
      entry: buildOption.input,
      formats: ['es', 'cjs'],
      fileName: format => (format === 'cjs' ? `${buildOption.filename}.cjs` : `${buildOption.filename}.mjs`),
    },

    rollupOptions: {
      external,
    },
  },
  define: {
    __import_meta_hot__: 'import.meta.hot',
  },
})

const buildOptions = [
  {
    input: resolve(__dirname, '../src/index.ts'),
    filename: 'index',
  },
  {
    input: resolve(__dirname, '../src/bin.ts'),
    filename: 'bin',
  },
]

;(async () => {
  await Promise.all(
    buildOptions.map(option =>
      (async () => {
        await build(getConfig(option))
      })(),
    ),
  )
})()
