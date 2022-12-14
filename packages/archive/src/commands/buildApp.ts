/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { buildApp } from '../build'

export async function buildCommand(): Promise<void> {
  await buildApp()

  // @TODO remove when https://github.com/vitejs/vite/issues/6815 is fixed
  process.exit(0)
}
