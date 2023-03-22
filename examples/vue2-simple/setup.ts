import type { SetupContext } from '@idux/archive-types'

export default {
  options: {
    getDemoTools: () => [
      { type: 'copyCode' },
      { type: 'expandCode' }
    ]
  }
} as SetupContext