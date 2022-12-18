/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable camelcase */

import type { Instance, VueAppSetup } from '@idux/archive-utils/client'
import type { DefineComponent } from 'vue'

import { type VueInstanceFactory, createVueInstanceFactory } from '@idux/archive-utils/client'

let __demoInstanceFactory__: VueInstanceFactory | null = null

export function createInstance(pageComp: () => Promise<DefineComponent>, id: string, setup?: VueAppSetup): Instance {
  if (!__demoInstanceFactory__) {
    __demoInstanceFactory__ = createVueInstanceFactory(setup)
  }

  return __demoInstanceFactory__(pageComp, id)
}
