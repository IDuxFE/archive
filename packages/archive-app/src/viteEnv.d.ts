/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { HmrRuntime } from '@idux/archive-vite-plugin'

declare global {
  const __DEV__: boolean
  const __BASE_URL__: string

  interface Window {
    __ARCHIVE_HMR_RUNTIME__?: HmrRuntime
  }
}

export {}
