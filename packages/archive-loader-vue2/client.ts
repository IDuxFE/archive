/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable camelcase */

import type { ArchiveLoaderVue2Instance, ArchiveLoaderVue2Setup } from './src/types'
import type { Component } from 'vue'

import { type VueInstanceFactory, createVueInstanceFactory } from './src/vueInstance'

const __demoInstanceFactorys__: Record<string, VueInstanceFactory> = {}

export function createInstance(
  factoryId: string | undefined,
  comp: Component,
  setup?: ArchiveLoaderVue2Setup,
): ArchiveLoaderVue2Instance {
  const _factoryId = factoryId ?? 'default'
  if (!__demoInstanceFactorys__[_factoryId]) {
    __demoInstanceFactorys__[_factoryId] = createVueInstanceFactory(setup)
  }

  return __demoInstanceFactorys__[_factoryId](comp)
}
