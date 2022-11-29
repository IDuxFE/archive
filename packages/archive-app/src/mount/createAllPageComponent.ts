import type { AppMountOptions } from '../types'
import type { DefineComponent } from 'vue'

import { createPageComponent } from './createPageComponent'

export function createAllPageComponents(options: AppMountOptions) {
  const { routeRecords, pageAnchor } = options

  const components: Record<string, DefineComponent> = {}

  routeRecords.forEach(record => {
    components[record.path] = createPageComponent(record, pageAnchor)
  })

  return components
}