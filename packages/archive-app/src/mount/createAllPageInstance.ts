/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AppMountOptions, PageInstance } from '@idux/archive-types'

import { resolveThemeOptions } from '../resolveThemeOptions'
import { createPageInstance } from './createPageInstance'

export function createAllPageInstance(options: AppMountOptions): Record<string, PageInstance> {
  const { routeRecords, renderers, setupOptions, setupApp } = options
  const reseolvedTheme = resolveThemeOptions(options)

  const instances: Record<string, PageInstance> = {}

  routeRecords.forEach(record => {
    instances[record.path] = createPageInstance(record, reseolvedTheme, renderers, setupOptions, setupApp)
  })

  return instances
}
