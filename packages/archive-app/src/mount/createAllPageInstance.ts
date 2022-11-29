import type { AppMountOptions, PageInstance } from '../types'

import { createPageInstance } from './createPageInstance'

export function createAllPageInstance(options: AppMountOptions) {
  const { routeRecords, pageAnchor } = options

  const instances: Record<string, PageInstance> = {}

  routeRecords.forEach(record => {
    instances[record.path] = createPageInstance(record, pageAnchor)
  })

  return instances
}