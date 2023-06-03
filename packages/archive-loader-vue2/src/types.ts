/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { Instance, Loader, ResolvedItem } from '@idux/archive-vite-plugin'
import type { Except, SetOptional } from 'type-fest'
import type { ComponentOptions, PropType, VNode, VueConstructor } from 'vue'

import Vue from 'vue'

export type Lang = 'zh' | 'en'
export type Theme = 'default' | 'seer'
export type ArchiveLoaderVue2 = Loader<Vue2ItemMeta>

export interface ArchiveLoaderVue2Options extends SetOptional<Except<Loader, 'name'>, 'matched'> {
  setup?: string
  srcDir?: string
  includeMeta?: boolean
  includeSourceCodes?: boolean
}

export interface ArchiveLoaderVue2Setup {
  customOptions?: ComponentOptions<Vue>
  setupApp?: (app: InstanceType<VueConstructor>) => void
  renderApp?: (children: VNode[]) => VNode
}

export type ArchiveLoaderVue2Instance<D extends Record<string, any> = Record<string, any>> = Instance<D>

export interface SourceCode {
  filename: string
  code: string
  parsedCode: string
}

export interface Vue2ItemMeta {
  dependencies?: string[]
  title?: string
  description?: string
}

export interface ArchiveLoaderVue2ResolvedItem extends ResolvedItem, Vue2ItemMeta {
  instance: ArchiveLoaderVue2Instance
}

export const instanceCompProps = {
  instance: Object as PropType<ArchiveLoaderVue2Instance>,
  onInstanceMountedChange: Function as unknown as PropType<(mounted: boolean) => void>,
} as const
export interface InstanceCompProps {
  instance?: ArchiveLoaderVue2Instance
  onInstanceMountedChange?: (mounted: boolean) => void
}
