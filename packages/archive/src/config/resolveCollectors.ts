import type { archiveVueCollector } from '../types'
import type { Collector } from '@idux/archive-plugin'

import { type VueCollectorOptions, createVueCollector } from '@idux/archive-collector-vue'

export function resolveCollectors(collectors?: (archiveVueCollector | Collector)[]): Collector[] {
  if (!collectors?.length) {
    return [resolveVueCollector()]
  }

  return collectors.map<Collector>(collector => {
    if (collector.name === 'vue') {
      return resolveVueCollector(collector as archiveVueCollector)
    }

    return collector as Collector
  })
}

function resolveVueCollector(collector?: archiveVueCollector) {
  const options: VueCollectorOptions = {
    ...(collector ?? {}),
    matchPattern: collector?.matchPattern ?? '**/*.demo.vue',
  }

  return createVueCollector(options)
}
