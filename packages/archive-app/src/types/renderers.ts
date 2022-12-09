import type { VNode, VNodeChild } from 'vue'
import type { ResolvedPageTab } from './page'
import type { ResolvedDemo } from '@idux/archive-plugin'

type CustomRenderer<D extends Record<string, any>> = (data: D, nodes: VNode[]) => VNodeChild

export interface PageHeaderRendererData {
  title?: string
  description?: string
  tabs?: ResolvedPageTab[]
  activeTabId?: string
  setActiveTabId: (tabId: string) => void
}
export type PageHeaderRenderer = CustomRenderer<PageHeaderRendererData>

export interface PageContentRendererData {
  demos: ResolvedDemo[],
  visibleDemoIds: string[]
  setVisibleDemoIds: (demosIds: string[]) => void
}
export type PageContentRenderer = CustomRenderer<PageContentRendererData>