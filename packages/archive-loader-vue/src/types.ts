/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { Instance, LoadedItem, Loader, ResolvedItem, Fn } from '@idux/archive-vite-plugin'
import type { Except, SetOptional } from 'type-fest'
import type { App, ExtractPropTypes, PropType, VNode } from 'vue'

export type Lang = 'zh' | 'en'
export type Theme = 'default' | 'seer'
export type ArchiveLoaderVue = Loader

export interface ArchiveLoaderVueOptions extends SetOptional<Except<Loader, 'name'>, 'matched'> {
  setup?: string
  srcDir?: string
  includeMeta?: boolean
  includeSourceCodes?: boolean
}

export interface ArchiveLoaderVueSetup {
  setupApp?: (app: App) => void
  renderApp?: (children: VNode[]) => VNode
}

export type ArchiveLoaderVueInstance<D extends object> = Instance<D>

export interface VueItemMeta extends Pick<LoadedItem, 'description' | 'controls' | 'title'> {
  dependencies?: string[]
}

export interface ArchiveLoaderVueResolvedItem<D extends object> extends ResolvedItem<D> {
  instance: ArchiveLoaderVueInstance<D>
}

export const instanceCompProps = {
  instance: Object as PropType<ArchiveLoaderVueInstance<Record<string, any>>>,
  onInstanceMountedChange: Function as PropType<(mounted: boolean) => void>,
} as const
export type InstanceCompProps = ExtractPropTypes<typeof instanceCompProps>

export interface EmitItem {
  [key: string]: Fn;
}
