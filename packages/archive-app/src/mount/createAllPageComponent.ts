/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AppMountOptions } from '../types'
import type { DefineComponent } from 'vue'

import { resolveThemeOptions } from '../resolveThemeOptions'
import { createPageComponent } from './createPageComponent'

export function createAllPageComponents(options: AppMountOptions): Record<string, DefineComponent> {
  const { routeRecords, theme, renderers, setupOptions, setupApp } = options
  const reseolvedTheme = resolveThemeOptions(theme)

  const components: Record<string, DefineComponent> = {}

  routeRecords.forEach(record => {
    components[record.path] = createPageComponent(record, reseolvedTheme, renderers, setupOptions, setupApp)
  })

  return components
}
