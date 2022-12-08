import type { Except } from 'type-fest'
import type { DemoTool } from './tools'

export interface PageData {
  title: string
  description: string
  tabs?: PageTab[]
  demoIds?: string[]
}
export interface PageTab {
  id: string
  name: string
  src?: string
  demoIds?: string[]
}
export interface ResolvedPageTab extends Except<PageTab, 'src'> {
  component?: () => Promise<any>
}
export interface ResolvedPageData extends Except<PageData, 'tabs'> {
  tabs?: ResolvedPageTab[]
}

export interface AnchorData {
  level: number
  title: string
  href: string
  children: AnchorData[]
}