import { builtinModules, createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { build } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const _require = createRequire(import.meta.url)

const { readFileSync, moveSync, removeSync, renameSync } = _require('fs-extra')

const typesTempDir = resolve(__dirname, '../types-temp')
const typesOutDir = resolve(__dirname, '../types')
const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

const buildConfig = {
  root: resolve(__dirname, '../'),
  configFile: false,
  build: {
    emptyOutDir: false,
    outDir: typesOutDir,
    target: 'esnext',

    lib: {
      formats: ['es'],
      entry: resolve(__dirname, '../src/index.ts'),
      fileName: 'temp.js',
    },

    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies),
        ...builtinModules.flatMap(m => (m.includes('punycode') ? [] : [m, `node:${m}`])),
        'vite',
      ],
    },
  },
  plugins: [dts({ entryRoot: resolve(__dirname, '../') })],
  define: {
    __import_meta_hot__: 'import.meta.hot',
  },
}

;(async () => {
  await build(buildConfig)

  moveSync(resolve(typesOutDir, './src'), typesTempDir)
  removeSync(typesOutDir)
  renameSync(typesTempDir, typesOutDir)
})()
