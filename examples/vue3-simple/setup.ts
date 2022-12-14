import type { SetupContext } from '@idux-archive/archive'
import { h } from 'vue'

export default {
  options: {
    getDemoTools: () => [
      { type: 'copyCode' },
      { type: 'expandCode' }
    ]
  }
} as SetupContext