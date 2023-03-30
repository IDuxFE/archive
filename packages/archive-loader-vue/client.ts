/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable camelcase */

import type { ArchiveLoaderVueInstance, ArchiveLoaderVueSetup } from './src/types'
import type { DefineComponent } from 'vue'

import { type InstanceFactory, createInstanceFactory } from './src/createInstanceFactory'
import InstanceComp from './src/instance'

const __demoInstanceFactorys__: Record<string, InstanceFactory> = {}

export function createInstance<P extends object = object>(
  factoryId: string | undefined,
  comp: DefineComponent<P>,
  setup?: ArchiveLoaderVueSetup,
): ArchiveLoaderVueInstance<P> {
  const _factoryId = factoryId ?? 'default'
  if (!__demoInstanceFactorys__[_factoryId]) {
    __demoInstanceFactorys__[_factoryId] = createInstanceFactory(setup)
  }

  return __demoInstanceFactorys__[_factoryId](comp)
}

export const Instance = InstanceComp
export { createComponent } from './src/createComponent'
export { createInstanceFactory } from './src/createInstanceFactory'
export type { ArchiveLoaderVueInstance, InstanceCompProps } from './src/types'
