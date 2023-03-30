/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { Instance, Loader, ResolvedItem } from '@idux/archive-vite-plugin'
import type { Except, SetOptional } from 'type-fest'
import type { App, ExtractPropTypes, PropType, VNode } from 'vue'

export type Lang = 'zh' | 'en'
export type Theme = 'default' | 'seer'
export type ArchiveLoaderVue = Loader<VueItemMeta>

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

export type ArchiveLoaderVueInstance<D extends Record<string, any> = Record<string, any>> = Instance<D>

export interface SourceCode {
  filename: string
  code: string
  parsedCode: string
}

export interface VueItemMeta {
  dependencies?: string[]
  title?: string
  description?: string
}

export interface ArchiveLoaderVueResolvedItem extends ResolvedItem, VueItemMeta {
  instance: ArchiveLoaderVueInstance
}

export const instanceCompProps = {
  instance: Object as PropType<ArchiveLoaderVueInstance>,
  onInstanceMountedChange: Function as PropType<(mounted: boolean) => void>,
} as const
export type InstanceCompProps = ExtractPropTypes<typeof instanceCompProps>
