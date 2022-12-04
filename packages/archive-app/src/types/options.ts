import type { ResolvedPageData } from './page'
import type { ResolvedNavRecord } from './records'
import type { ProLayoutType, ProLayoutTheme } from '@idux/pro/layout'
import type { RequireAtLeastOne  } from 'type-fest'

export interface RouteRecord {
  path: string
  pageData: ResolvedPageData
}
export interface PageAnchorOptions {
  maxLevel: number
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
  }
}


export interface  ResolvedThemeOptions {
  layout: Exclude<Required<ThemeOptions['layout']>, undefined>
  page: Exclude<Required<ThemeOptions['page']>, undefined>
}

export interface AppMountOptions {
  el: string
  theme?: ThemeOptions
  pageAnchor?: PageAnchorOptions | boolean
  navRecords: ResolvedNavRecord[]
  routeRecords: RouteRecord[]
}

export interface PageInstance {
  mount: (el: HTMLElement) => void
  unmount: () => void
}