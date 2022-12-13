import type { ResolvedDemo } from '@idux/archive-plugin';
import type { ResolvedPageData, ServerResolvedPageData } from './page'
import type { DemoTool } from './tools'
import type { ResolvedNavRecord } from './records'
import type { AppRenderers } from './renderers'
import type { AppThemeOptions } from './theme'
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
