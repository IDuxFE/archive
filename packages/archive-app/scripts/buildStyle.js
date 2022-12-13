const { build } = require('vite')
const { resolve } = require('path')
const { unlinkSync, existsSync, writeFileSync, readFileSync } = require('fs')

const getConfig = (theme) => ({
  configFile: false,
  build: {
    emptyOutDir: false,
    target: 'esnext',
    cssCodeSplit: true,

    lib: {
      entry: theme.input,
      formats: ['es'],
    },

    rollupOptions: {
      // input: {
      //   [`themes/${theme.name}/${theme.chunk}`]: theme.input,
      // },
      output: {
        entryFileNames: `__temp__.js`,
        assetFileNames: `themes/${theme.name}/${theme.chunk}.css`,
      },
      external: []
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@idux-prefix': 'archive-app',
          '@idux-pro-prefix': 'archive-app-pro'
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

    const styleTempFile = resolve(__dirname, '../dist/__temp__.js')
    if (existsSync(styleTempFile)) {
      unlinkSync(styleTempFile)
    }

    const styleFile = resolve(__dirname, `../dist/themes/${theme.name}/${theme.chunk}.css`)
    writeFileSync(styleFile, readFileSync(styleFile, 'utf-8').replace(/--ix-/g, '--archive-ix-'))
    // await appendFile(resolve(__dirname, `../dist/themes/${theme.name}/${theme.chunk}.js`), `\n import "./${theme.chunk}.css"`)
  }))
})()