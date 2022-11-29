import type { Collector, CollectedDemo } from '@idux/archive-plugin'
import type { VueCollectorOptions } from '@idux/archive-plugin-collector-vue'
import type { MarkdownOptions } from '@idux/archive-markdown-plugin'
import type { NavRecord, SidebarRecord, ResolvedNavRecord, ResolvedSidebarRecord, RouteRecord, PageAnchorOptions } from '@idux/archive-app'

export interface archiveVueCollector extends Partial<VueCollectorOptions> {
  name: 'vue'
}

export type archiveTheme = 'default' | 'seer'

export interface archiveConfig {
  navConfig?: (demos: CollectedDemo[], root: string) => NavRecord[] | undefined
  sidebarConfig?: (demos: CollectedDemo[], root: string) => SidebarRecord[] | Record<string, SidebarRecord[]>
  collectors?: (Collector | archiveVueCollector)[]
  markdownOptions?: MarkdownOptions
  pageAnchor: PageAnchorOptions | boolean
  theme?: archiveTheme
  dist?: string
  root?: string
}

export interface RecordsContext {
  resolvedNavRecords: ResolvedNavRecord[] | undefined
  resolvedSidebarRecords: ResolvedSidebarRecord[] | Record<string, ResolvedSidebarRecord[]>
  routeRecords: RouteRecord[]
}

export interface ResolvedarchiveConfig {
  collectors: Collector[]
  onDemosCollected: (demos: CollectedDemo[]) => void
  getResolvedRecords: () => RecordsContext
  theme: archiveTheme
  pageAnchor: PageAnchorOptions | boolean
  markdownOptions: MarkdownOptions
  dist: string
  root: string
}