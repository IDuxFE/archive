/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AppSetupOptions, ServerRouteRecord } from './options'
import type { NavRecord, ServerResolvedNavRecord } from './records'
import type { AppRenderers } from './renderers'
import type { AppThemeOptions } from './theme'
import type { MarkdownOptions } from '@idux/archive-vite-markdown-plugin'
import type { CollectedDemo, Collector } from '@idux/archive-vite-plugin'
import type { SetRequired } from 'type-fest'
import type { App } from 'vue'

export type BuildTargets = 'app' | 'page' | 'instance'

export interface ArchivePageLoader {
  matched: (src: string) => boolean
  resolver: (absolutePath: string) => string | Promise<string>
}

export type ArchiveThemeStyle = 'default' | 'seer'
export interface ArchiveThemeOptions extends AppThemeOptions {
  themeStyle?: ArchiveThemeStyle
}

export interface SetupContext {
  setupApp?: (app: App) => void
  renderers?: AppRenderers
  options?: AppSetupOptions
}

export interface ArchiveConfig {
  setupFile?: string
  navConfig?: (demos: CollectedDemo[], root: string) => NavRecord[]
  pageLoaders?: ArchivePageLoader[]
  collectors?: Collector[]
  markdownOptions?: MarkdownOptions
  theme?: ArchiveThemeOptions
  dist?: string
  root?: string
}

export interface RecordsContext {
  resolvedNavRecords: ServerResolvedNavRecord[]
  routeRecords: ServerRouteRecord[]
}

export interface ResolvedArchiveConfig {
  setupFile?: string
  pageLoaders: ArchivePageLoader[]
  collectors: Collector[]
  onDemosCollected: (demos: CollectedDemo[]) => void
  getResolvedRecords: () => RecordsContext
  theme: SetRequired<ArchiveThemeOptions, 'themeStyle'>
  markdownOptions: MarkdownOptions
  dist: string
  root: string
}
