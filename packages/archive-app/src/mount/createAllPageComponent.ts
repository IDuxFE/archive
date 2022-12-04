import type { AppMountOptions } from '../types'
import type { DefineComponent } from 'vue'

import { resolveThemeOptions } from '../resolveThemeOptions'
import { createPageComponent } from './createPageComponent'

export function createAllPageComponents(options: AppMountOptions) {
  const { routeRecords, theme } = options
  const reseolvedTheme = resolveThemeOptions(theme)

  const components: Record<string, DefineComponent> = {}

  routeRecords.forEach(record => {
    components[record.path] = createPageComponent(record, reseolvedTheme)
  })

  return components
}