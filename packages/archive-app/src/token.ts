/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedAppRender } from './composables/useAppRender'
import type { NavRecordsContext } from './composables/useNavRecords'
import type { ResolvedPageRender } from './composables/usePageRender'
import type {
  AppRenderers,
  AppSetupOptions,
  PageAnchorOptions,
  ResolvedAppThemeOptions,
  ResolvedNavRecord,
} from './types'
import type { ComputedRef, InjectionKey, Ref } from '@idux/archive-app/vue'
import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

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
