/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedPageData, ServerResolvedPageData } from './page'
import type { ResolvedNavRecord } from './records'
import type { AppRenderers } from './renderers'
import type { AppThemeOptions } from './theme'
import type { DemoTool } from './tools'
import type { ResolvedDemo } from '@idux/archive-vite-plugin'
import type { App } from 'vue'

export interface RouteRecord {
  path: string
  pageData: ResolvedPageData
}

export interface ServerRouteRecord {
  path: string
  pageData: ServerResolvedPageData
}

export interface AppSetupOptions {
  getInitVisibleDemoIds?: (demos?: ResolvedDemo[]) => string[]
  getDemoTools?: (demos: ResolvedDemo) => DemoTool[]
}

export interface AppMountOptions {
  el: string
  theme?: AppThemeOptions
  setupApp?: (app: App) => void
  setupOptions?: AppSetupOptions
  renderers?: AppRenderers
  navRecords: ResolvedNavRecord[]
  routeRecords: RouteRecord[]
}
