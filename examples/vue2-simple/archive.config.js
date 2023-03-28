const { resolve } = require('path')
const { defineConfig } = require('@idux/archive')
const { createArchiveVue2PageLoader, createArchiveVue2DemoLoader } = require('@idux/archive-loader-vue2')

module.exports = defineConfig({
  root: resolve(__dirname, './demos'),
  theme: {
    themeStyle: 'seer',
    layout: {
      type: 'sider',
    },
  },
  pageLoaders: [createArchiveVue2PageLoader()],
  demoLoaders: [createArchiveVue2DemoLoader()],
})
