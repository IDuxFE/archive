import { dirname, resolve, basename } from 'path'
import { fileURLToPath } from 'node:url'

import { directoryNavGetter } from '@idux/archive'

export default {
  root: resolve(dirname(fileURLToPath(import.meta.url)), './demos'),
  theme: 'seer',
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
}