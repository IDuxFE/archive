import type { ComputedRef, InjectionKey } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { NavRecordsContext } from './composables/useNavRecords'
import type { ResolvedNavRecord, ResolvedThemeOptions, PageAnchorOptions } from './types'

export interface AppContext extends NavRecordsContext {
  route: RouteLocationNormalizedLoaded
  theme: ResolvedThemeOptions
  navRecords: ResolvedNavRecord[]
  breakpoints: Record<BreakpointKey, boolean>
}

export interface PageContext {
  headerFixed: ComputedRef<boolean>
  headerHeight: ComputedRef<number>
  anchorOptions: PageAnchorOptions | boolean
}

export const appContextToken = Symbol('appContext') as InjectionKey<AppContext>
export const pageContextToken = Symbol('pageContext') as InjectionKey<PageContext>