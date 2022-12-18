/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { Collector, ResolvedDemo } from '@idux/archive-vite-plugin'
import type { Except, SetOptional } from 'type-fest'
import type { App, DefineComponent, VNode } from 'vue'

export type Lang = 'zh' | 'en'
export type Theme = 'default' | 'seer'

export interface VueCollectorOptions extends SetOptional<Except<Collector, 'name'>, 'matchPattern'> {
  setup?: string
  srcDir?: string
}

export interface VueCollectorSetup {
  setupApp?: (app: App) => void
  renderApp?: (children: VNode[]) => VNode
}

export interface ResolvedVue3Demo extends Except<ResolvedDemo, 'component'> {
  title: string
  description: string
  component: () => Promise<DefineComponent>
}
