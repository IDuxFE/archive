import type { App, DefineComponent, VNode } from 'vue'
import type { Except } from 'type-fest'
import type { Collector, ResolvedDemo } from '@idux/archive-plugin'

export type Lang = 'zh' | 'en'
export type Theme = 'default' | 'seer'

export interface VueCollectorOptions extends Except<Collector, 'name'> {
  setup?: string
}

export interface VueCollectorSetup {
  setupApp?: (app: App) => void
  render?: (vm: VNode) => VNode
}

export interface ResolvedVue3Demo extends Except<ResolvedDemo, 'component'> {
  title: string
  description: string
  component: () => Promise<DefineComponent>
}