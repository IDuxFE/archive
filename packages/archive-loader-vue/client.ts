/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable camelcase */

import type { ArchiveLoaderVueInstance, ArchiveLoaderVueSetup } from './src/types'
import type { DefineComponent } from 'vue'

import { type VueInstanceFactory, createVueInstanceFactory } from './src/vueInstance'

const __demoInstanceFactorys__: Record<string, VueInstanceFactory> = {}

export function createInstance(
  factoryId: string | undefined,
  comp: DefineComponent,
  setup?: ArchiveLoaderVueSetup,
): ArchiveLoaderVueInstance {
  const _factoryId = factoryId ?? 'default'
  if (!__demoInstanceFactorys__[_factoryId]) {
    __demoInstanceFactorys__[_factoryId] = createVueInstanceFactory(setup)
  }

  return __demoInstanceFactorys__[_factoryId](comp)
}
