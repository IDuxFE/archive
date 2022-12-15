import { dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from '@idux-archive/archive'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: resolve(__dirname, './demos'),
  setupFile: resolve(__dirname, './setup.ts'),
  theme: {
    themeStyle: 'seer',
    layout: {
      type: 'sider'
    }
  },
})