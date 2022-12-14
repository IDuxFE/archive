/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ArchiveVueCollector } from '../types'
import type { Collector } from '@idux-archive/vite-plugin'

import { type VueCollectorOptions, createVueCollector } from '@idux-archive/collector-vue'

export function resolveCollectors(collectors?: (ArchiveVueCollector | Collector)[]): Collector[] {
  if (!collectors?.length) {
    return [resolveVueCollector()]
  }

  return collectors.map<Collector>(collector => {
    if (collector.name === 'vue') {
      return resolveVueCollector(collector as ArchiveVueCollector)
    }

    return collector as Collector
  })
}

function resolveVueCollector(collector?: ArchiveVueCollector) {
  const options: VueCollectorOptions = {
    ...(collector ?? {}),
    matchPattern: collector?.matchPattern ?? '**/*.demo.vue',
  }

  return createVueCollector(options)
}
