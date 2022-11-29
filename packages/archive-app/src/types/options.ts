import type { ResolvedPageData } from './page'
import type { ResolvedNavRecord, ResolvedSidebarRecord } from './records'

export interface RouteRecord {
  path: string
  pageData: ResolvedPageData
}
export interface PageAnchorOptions {
  maxLevel: number
}

export interface AppMountOptions {
  el: string
  pageAnchor?: PageAnchorOptions | boolean,
  navRecords?: ResolvedNavRecord[]
  sidebarRecords: ResolvedSidebarRecord[] | Record<string, ResolvedSidebarRecord[]>
  routeRecords: RouteRecord[]
}

export interface PageInstance {
  mount: (el: HTMLElement) => void
  unmount: () => void
}