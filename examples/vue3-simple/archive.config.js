import { dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from '@idux/archive'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: resolve(__dirname, './demos'),
  theme: {
    themeStyle: 'seer',
    layout: {
      type: 'sider'
    }
  },
})