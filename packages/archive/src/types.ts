import type { App } from 'vue'
import type { Collector, CollectedDemo } from '@idux/archive-plugin'
import type { VueCollectorOptions } from '@idux/archive-collector-vue'
import type { MarkdownOptions } from '@idux/archive-markdown-plugin'
import type { NavRecord, ResolvedNavRecord, RouteRecord, ThemeOptions, Renderers, AppSetupOptions } from '@idux/archive-app'
import type { SetRequired } from 'type-fest'

export interface ArchiveVueCollector extends Partial<VueCollectorOptions> {
  name: 'vue'
}

export type ArchiveThemeStyle = 'default' | 'seer'
export interface ArchiveThemeOptions extends ThemeOptions {
  themeStyle?: ArchiveThemeStyle
}

export interface SetupContext {
  setupApp?: (app: App) => void
  renderers?: Renderers
  options?: AppSetupOptions
}

export interface ArchiveConfig {
  setupFile?: string
  navConfig?: (demos: CollectedDemo[], root: string) => NavRecord[]
  collectors?: (Collector | ArchiveVueCollector)[]
  markdownOptions?: MarkdownOptions
  theme?: ArchiveThemeOptions
  dist?: string
  root?: string
}

export interface RecordsContext {
  resolvedNavRecords: ResolvedNavRecord[]
  routeRecords: RouteRecord[]
}

export interface ResolvedArchiveConfig {
  setupFile?: string
  collectors: Collector[]
  onDemosCollected: (demos: CollectedDemo[]) => void
  getResolvedRecords: () => RecordsContext
  theme: SetRequired<ArchiveThemeOptions, 'themeStyle'>
  markdownOptions: MarkdownOptions
  dist: string
  root: string
}