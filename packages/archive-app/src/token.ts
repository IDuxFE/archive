import type { InjectionKey } from 'vue'
import type { NavRecordsContext } from './composables/useNavRecords'
import type { SidebarRecordsContext } from './composables/useSidbarRecords'
import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { PageAnchorOptions } from './types'

export interface AppContext {
  navContext: NavRecordsContext
  sidebarContext: SidebarRecordsContext
  breakpoints: Record<BreakpointKey, boolean>
}

export interface PageContext {
  pageAnchor: PageAnchorOptions | boolean
}

export const appContextToken = Symbol('appContext') as InjectionKey<AppContext>
export const pageContextToken = Symbol('pageContext') as InjectionKey<PageContext>