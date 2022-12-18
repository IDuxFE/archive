import { dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from '@idux/archive'
import { createVuePageLoader } from '@idux/archive-page-loader-vue'
import { createVueCollector } from '@idux/archive-collector-vue'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: resolve(__dirname, './demos'),
  theme: {
    themeStyle: 'seer',
    layout: {
      type: 'sider',
    },
  },
  pageLoaders: [createVuePageLoader()],
  collectors: [createVueCollector({ matchPattern: '**/*.demo.vue' })],
})
