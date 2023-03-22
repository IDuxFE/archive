/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AppMountOptions, PageInstance } from '@idux/archive-types'

import { createPageInstance } from './createPageInstance'
import { resolveThemeOptions } from '../resolveThemeOptions'

export function createAllPageInstance(options: AppMountOptions): Record<string, PageInstance> {
  const { routeRecords, theme, renderers, setupOptions, setupApp } = options
  const reseolvedTheme = resolveThemeOptions(theme)

  const instances: Record<string, PageInstance> = {}

  routeRecords.forEach(record => {
    instances[record.path] = createPageInstance(record, reseolvedTheme, renderers, setupOptions, setupApp)
  })

  return instances
}
