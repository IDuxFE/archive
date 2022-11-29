const { build } = require('vite')
const { builtinModules } = require('module')
const { resolve } = require('path')
const pkg = require('../package.json')

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
      formats: ['es'],
      fileName: () => buildOption.filename,
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
    filename: 'index.mjs',
  },
  {
    input: resolve(__dirname, '../src/bin.ts'),
    filename: 'bin.mjs',
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
