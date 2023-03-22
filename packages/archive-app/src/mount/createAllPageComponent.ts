/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { DefineComponent } from '@idux/archive-app/vue'
import type { AppMountOptions } from '@idux/archive-types'

import { createPageComponent } from './createPageComponent'
import { resolveThemeOptions } from '../resolveThemeOptions'

export function createAllPageComponent(options: AppMountOptions): Record<string, DefineComponent> {
  const { routeRecords, theme, renderers, setupOptions, setupApp } = options
  const reseolvedTheme = resolveThemeOptions(theme)

  const components: Record<string, DefineComponent> = {}

  routeRecords.forEach(record => {
    components[record.path] = createPageComponent(record, reseolvedTheme, renderers, setupOptions, setupApp)
  })

  return components
}
