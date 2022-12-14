/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable import/no-unresolved */

import { buildPages } from '../build.js'

export async function buildCommand(): Promise<void> {
  await buildPages()

  // @TODO remove when https://github.com/vitejs/vite/issues/6815 is fixed
  process.exit(0)
}
