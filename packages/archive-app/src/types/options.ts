import type { ResolvedDemo } from '@idux/archive-plugin';
import type { ResolvedPageData } from './page'
import type { DemoTool } from './tools'
import type { ResolvedNavRecord } from './records'
import type { PageHeaderRenderer, PageContentRenderer } from './renderers'
import type { ProLayoutType, ProLayoutTheme } from '@idux/pro/layout'
import type { App } from 'vue'

export interface RouteRecord {
  path: string
  pageData: ResolvedPageData
}
export interface PageAnchorOptions {
  maxLevel: number
}

export interface Renderers {
  pageHeader?: PageHeaderRenderer
  pageContent?: PageContentRenderer
}

export interface AppSetupOptions {
  getInitVisibleDemoIds?: (demos?: ResolvedDemo[]) => string[]
  getDemoTools?: (demos: ResolvedDemo) => DemoTool[]
}

export interface ThemeOptions {
  layout?: {
    theme?: ProLayoutTheme,
    type?: ProLayoutType
  },
  page?: {
    headerAffix?: boolean
    enableAnchor?: boolean
    anchorMaxLevel?: number
  },
}

export interface  ResolvedThemeOptions {
  layout: Exclude<Required<ThemeOptions['layout']>, undefined>
  page: Exclude<Required<ThemeOptions['page']>, undefined>
}

export interface AppMountOptions {
  el: string
  theme?: ThemeOptions
  setupApp?: (app: App) => void
  setupOptions?: AppSetupOptions
  renderers?: Renderers
  pageAnchor?: PageAnchorOptions | boolean
  navRecords: ResolvedNavRecord[]
  routeRecords: RouteRecord[]
}

export interface PageInstance {
  mount: (el: HTMLElement) => void
  unmount: () => void
}