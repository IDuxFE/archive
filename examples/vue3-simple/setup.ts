/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { SetupContext } from '@idux/archive-types'

export default {
  options: {
    getDemoTools: () => [{ type: 'copyCode' }, { type: 'expandControls' }, { type: 'expandCode' }],
  },
} as SetupContext
