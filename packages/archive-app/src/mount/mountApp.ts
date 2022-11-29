import type { AppMountOptions } from '../types'

import { h, createApp, provide } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import AppComp from '../App.vue'

import { appContextToken } from '../token'

import iduxInstall from './iduxInstall'
import { useNavRecords } from '../composables/useNavRecords'
import { useSidbarRecords } from '../composables/useSidbarRecords'
import { useSharedBreakpoints } from '@idux/cdk/breakpoint'

import { resolveRoutes } from '../resolveRoutes'

export function mountApp(options: AppMountOptions) {
  const { pageAnchor, navRecords, sidebarRecords, routeRecords, el } = options
  const routes = resolveRoutes(routeRecords, pageAnchor)
  const app = createApp({
    setup() {
      const navContext = useNavRecords(navRecords)
      const sidebarContext = useSidbarRecords(sidebarRecords, navContext.activeSidebar)
      const breakpoints = useSharedBreakpoints()

      provide(appContextToken, {
        navContext,
        sidebarContext,
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

  app.mount(el)
}