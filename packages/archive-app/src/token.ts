import type { ComputedRef, Ref, InjectionKey } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { NavRecordsContext } from './composables/useNavRecords'
import type { ResolvedAppRender } from './composables/useAppRender'
import type { ResolvedPageRender } from './composables/usePageRender'
import type { ResolvedNavRecord, ResolvedAppThemeOptions, PageAnchorOptions, AppSetupOptions, AppRenderers } from './types'

export interface AppContext extends NavRecordsContext {
  route: RouteLocationNormalizedLoaded
  theme: ResolvedAppThemeOptions
  navRecords: ResolvedNavRecord[]
  renderers: AppRenderers
  render: ResolvedAppRender
}

export interface PageContext {
  headerFixed: Ref<boolean>
  headerHeight: Ref<number>
  anchorOptions: ComputedRef<PageAnchorOptions>
  options: AppSetupOptions
  renderers: AppRenderers
  render: ResolvedPageRender
}

export const themeToken = Symbol('theme') as InjectionKey<ResolvedAppThemeOptions>
export const appContextToken = Symbol('appContext') as InjectionKey<AppContext>
export const breakpointsToken = Symbol('breakpoint') as InjectionKey<Record<BreakpointKey, boolean>>
export const pageContextToken = Symbol('pageContext') as InjectionKey<PageContext>