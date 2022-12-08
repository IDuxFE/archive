import { dirname, resolve, basename } from 'path'
import { fileURLToPath } from 'node:url'

import { directoryNavGetter, defineConfig } from '@idux/archive'

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
  navConfig: (demos, root) => directoryNavGetter(demos, root, {
    getPageInfo: (dir) => {
      return {
        id: basename(dir),
        name: basename(dir).replace('demoPage', '示例')
      }
    },
    sortDemos: (demo1, demo2) => {
      const getIdx = (demo) => Number(demo.filename.split('.')[1])
      return getIdx(demo1) - getIdx(demo2)
    },
    getDemoTools: (demo) => [
      { type: 'copyCode' },
      { type: 'expandCode' }
    ]
  })
})