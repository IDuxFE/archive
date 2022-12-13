import type { SetupContext } from '@idux/archive'
import { h } from 'vue'

export default {
  renderers: {
    pageHeader: (data, nodes) => {
      console.log(data)
      return [h('div', 'test'),...nodes]
    }
  },
  options: {
    getDemoTools: (demo) => [
      { type: 'copyCode' },
      { type: 'expandCode' }
    ]
  }
} as SetupContext