import type { AppMountOptions } from '../types'

import { h, createApp, provide } from 'vue'
import { useRoute, createRouter, createWebHistory } from 'vue-router'
import AppComp from '../App'

import { appContextToken } from '../token'

import iduxInstall from './iduxInstall'
import { useNavRecords } from '../composables/useNavRecords'
import { useSharedBreakpoints } from '@idux/cdk/breakpoint'

import { resolveRoutes } from '../resolveRoutes'
import { resolveThemeOptions } from '../resolveThemeOptions'

export function mountApp(options: AppMountOptions) {
  const { navRecords, routeRecords, el, renderers, setupOptions, setupApp } = options
  const theme = resolveThemeOptions(options.theme)
  const routes = resolveRoutes(routeRecords, theme, renderers, setupOptions)

  const app = createApp({
    setup() {
      const route = useRoute()
      const navContext = useNavRecords(navRecords, route)
      const breakpoints = useSharedBreakpoints()

      provide(appContextToken, {
        ...navContext,
        route,
        theme,
        navRecords,
        breakpoints,
      })

      return () => h(AppComp)
    },
  })

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
