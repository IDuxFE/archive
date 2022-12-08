import type { Ref, InjectionKey } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { NavRecordsContext } from './composables/useNavRecords'
import type { ResolvedNavRecord, ResolvedThemeOptions, PageAnchorOptions, AppSetupOptions, Renderers } from './types'

export interface AppContext extends NavRecordsContext {
  route: RouteLocationNormalizedLoaded
  theme: ResolvedThemeOptions
  navRecords: ResolvedNavRecord[]
  breakpoints: Record<BreakpointKey, boolean>
}

export interface PageContext {
  headerFixed: Ref<boolean>
  headerHeight: Ref<number>
  anchorOptions: PageAnchorOptions | boolean
  options: AppSetupOptions
  renderers: Renderers
}

export const appContextToken = Symbol('appContext') as InjectionKey<AppContext>
export const pageContextToken = Symbol('pageContext') as InjectionKey<PageContext>