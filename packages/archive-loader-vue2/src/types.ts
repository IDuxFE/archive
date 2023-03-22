/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { Instance, Loader } from '@idux/archive-vite-plugin'
import type { Except, SetOptional } from 'type-fest'
import type { ComponentOptions, VNode, VueConstructor } from 'vue'

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

export type ArchiveLoaderVue2Instance = Instance

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
