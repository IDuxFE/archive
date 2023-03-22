/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ArchiveLoaderVue2, ArchiveLoaderVue2Options } from './src/types'

import { createArchiveVueLoader } from './src/createLoader'

export function createArchiveVue2PageLoader(options: ArchiveLoaderVue2Options): ArchiveLoaderVue2 {
  return createArchiveVueLoader({ prefix: 'archive-page:', ...options })
}
export function createArchiveVue2DemoLoader(options: ArchiveLoaderVue2Options): ArchiveLoaderVue2 {
  return createArchiveVueLoader({ prefix: 'archive-demo:', includeMeta: true, includeSourceCodes: true, ...options })
}

export type {
  ArchiveLoaderVue2,
  ArchiveLoaderVue2Options,
  ArchiveLoaderVue2Setup,
  ArchiveLoaderVue2Instance,
} from './src/types'
export { createArchiveVueLoader } from './src/createLoader'
