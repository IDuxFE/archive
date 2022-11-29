const { build } = require('vite')
const { resolve } = require('path')
const { unlink } = require('fs/promises')

const getConfig = (theme) => ({
  configFile: false,
  build: {
    emptyOutDir: false,
    target: 'esnext',
    cssCodeSplit: true,

    lib: {
      entry: '',
      formats: ['es'],
    },

    rollupOptions: {
      input: {
        [`themes/${theme.name}/${theme.chunk}`]: theme.input,
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: `themes/${theme.name}/${theme.chunk}.css`,
      }
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@idux-prefix': 'archive-app',
        },
      },
    },
  },
})

const themes = [
  { name: 'default', chunk: 'app', input: resolve(__dirname, '../style/themes/default/app/index.ts') },
  { name: 'seer', chunk: 'app', input: resolve(__dirname, '../style/themes/seer/app/index.ts') },
  { name: 'default', chunk: 'page', input: resolve(__dirname, '../style/themes/default/page/index.ts') },
  { name: 'seer', chunk: 'page', input: resolve(__dirname, '../style/themes/seer/page/index.ts') }
]

;(async () => {
  await Promise.all(themes.map(async theme => {
    await build(getConfig(theme))
    await unlink(resolve(__dirname, `../dist/themes/${theme.name}/${theme.chunk}.js`))
    // await appendFile(resolve(__dirname, `../dist/themes/${theme.name}/${theme.chunk}.js`), `\n import "./${theme.chunk}.css"`)
  }))
})()