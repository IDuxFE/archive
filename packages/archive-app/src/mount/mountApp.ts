/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AppMountOptions } from '@idux/archive-types'

import { createApp, defineComponent, h, provide } from 'vue'

import { useBreakpoints } from '@idux/cdk/breakpoint'
import { createRouter, createWebHistory, useRoute } from 'vue-router'

import iduxInstall from './iduxInstall'
import AppComp from '../App'
import { useAppRender } from '../composables/useAppRender'
import { useNavRecords } from '../composables/useNavRecords'
import { resolveRoutes } from '../resolveRoutes'
import { resolveThemeOptions } from '../resolveThemeOptions'
import { appContextToken, breakpointsToken, themeToken } from '../token'

export function mountApp(options: AppMountOptions): void {
  const { navRecords, routeRecords, el, renderers = {}, setupOptions, setupApp } = options
  const theme = resolveThemeOptions(options.theme)
  const routes = resolveRoutes(routeRecords, theme, renderers, setupOptions)

  const app = createApp(
    defineComponent({
      setup() {
        const route = useRoute()
        const navContext = useNavRecords(navRecords, route)
        const breakpoints = useBreakpoints(theme.breakpoints)

        const render = useAppRender({
          route,
          activeRecords: navContext.activeRecords,
          theme,
          breakpoints,
        })

        provide(appContextToken, {
          ...navContext,
          route,
          theme,
          navRecords,
          renderers,
          render,
        })
        provide(themeToken, theme)
        provide(breakpointsToken, breakpoints)

        return () => h(AppComp)
      },
    }),
  )

  app
    .use(
      createRouter({
        history: createWebHistory('/'),
        scrollBehavior: (to, _, savedPosition) => {
          if (savedPosition) {
            return savedPosition
          } else if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
          } else {
            return { top: 0, behavior: 'smooth' }
          }
        },
        routes,
      }),
    )
    .use(iduxInstall)

  setupApp?.(app)

  app.mount(el)
}
