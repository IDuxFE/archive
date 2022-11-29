import { dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'

import { getSidebarRecordsByDirectory } from '@idux/archive'

export default {
  root: resolve(dirname(fileURLToPath(import.meta.url)), './demos'),
  theme: 'seer',
  sidebarConfig: (demos, root) => getSidebarRecordsByDirectory(demos, root, {
    getName: (_, id) => {
      return id.replace('demoPage', '示例')
    },
    sortDemos: (demo1, demo2) => {
      const getIdx = (demo) => Number(demo.filename.split('.')[1])
      return getIdx(demo1) - getIdx(demo2)
    }
  })
}