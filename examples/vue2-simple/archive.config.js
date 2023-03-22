import { dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from '@idux/archive'
import { createArchiveVue2PageLoader, createArchiveVue2DemoLoader } from '@idux/archive-loader-vue2'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
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
