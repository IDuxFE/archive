import type { SetupContext } from '@idux/archive'

export default {
  options: {
    getDemoTools: () => [
      { type: 'copyCode' },
      { type: 'expandCode' }
    ]
  }
} as SetupContext