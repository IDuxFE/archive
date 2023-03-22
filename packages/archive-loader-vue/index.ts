/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ArchiveLoaderVue, ArchiveLoaderVueOptions } from './src/types'

import { createArchiveVueLoader } from './src/createLoader'

export function createArchiveVuePageLoader(options: ArchiveLoaderVueOptions): ArchiveLoaderVue {
  return createArchiveVueLoader({ prefix: 'archive-page:', ...options })
}
export function createArchiveVueDemoLoader(options: ArchiveLoaderVueOptions): ArchiveLoaderVue {
  return createArchiveVueLoader({ prefix: 'archive-demo:', includeMeta: true, includeSourceCodes: true, ...options })
}

export type {
  ArchiveLoaderVue,
  ArchiveLoaderVueOptions,
  ArchiveLoaderVueSetup,
  ArchiveLoaderVueInstance,
} from './src/types'
export { createArchiveVueLoader } from './src/createLoader'
