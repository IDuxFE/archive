import type { VNodeChild } from 'vue'
import type { ResolvedPageTab } from './page'
import type { ResolvedNavRecord } from './records'
import type { ResolvedAppThemeOptions } from './theme'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ResolvedDemo } from '@idux/archive-plugin'
import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { MenuProps } from '@idux/components/menu'
import type { ProLayoutLogo } from '@idux/pro/layout'

import type { SetOptional } from 'type-fest'

export interface AppRendererDataBase {
  theme: ResolvedAppThemeOptions
  route: RouteLocationNormalizedLoaded
  breakpoints: Record<BreakpointKey, boolean>
  activeRecords: ResolvedNavRecord[]
}
export type PageRendererDataBase = SetOptional<AppRendererDataBase, 'route' | 'activeRecords'>

type Renderer<D, EnsureNodes, Base> = (
  data: D & Base,
  nodes: EnsureNodes extends true ? VNodeChild : VNodeChild | undefined,
) => VNodeChild
export type AppRenderer<D extends Record<string, any> = {}, EnsureNodes = true> = Renderer<
  D,
  EnsureNodes,
  AppRendererDataBase
>
export type PageRenderer<D extends Record<string, any> = {}, EnsureNodes = true> = Renderer<
  D,
  EnsureNodes,
  PageRendererDataBase
>

export interface PageHeaderRendererData {
  title?: string
  description?: string
  tabs?: ResolvedPageTab[]
  activeTabId?: string
  setActiveTabId: (tabId: string) => void
}

export interface PageContentRendererData {
  demos: ResolvedDemo[]
  visibleDemoIds: string[]
  setVisibleDemoIds: (demosIds: string[]) => void
}

export interface AppRenderers {
  logo?: AppRenderer<ProLayoutLogo, false>
  layoutHeaderContent?: AppRenderer<MenuProps, false>
  layoutHeaderExtra?: AppRenderer<{}, false>
  layoutSiderContent?: AppRenderer<MenuProps, false>
  layoutSiderHeader?: AppRenderer
  layoutSiderHeaderLabel?: AppRenderer
  layoutSiderFooter?: AppRenderer<{}, false>
  layoutSiderFooterLabel?: AppRenderer<{}, false>
  pageHeader?: PageRenderer<PageHeaderRendererData>
  pageContent?: PageRenderer<PageContentRendererData>
}
