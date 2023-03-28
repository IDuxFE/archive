const { resolve } = require('path')
const { defineConfig } = require('@idux/archive')
const { createArchiveVuePageLoader, createArchiveVueDemoLoader } = require('@idux/archive-loader-vue')

module.exports = defineConfig({
  root: resolve(__dirname, './demos'),
  theme: {
    themeStyle: 'seer',
    layout: {
      type: 'sider',
    },
  },
  pageLoaders: [createArchiveVuePageLoader()],
  demoLoaders: [createArchiveVueDemoLoader()],
})
