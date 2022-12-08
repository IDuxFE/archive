import type { RouteRecord, ResolvedThemeOptions, Renderers, AppSetupOptions } from './types'
import type { RouteRecordRaw } from 'vue-router'

import { resolvePageProps } from './resolvePageProps'

export function resolveRoutes(
  routesRecords: RouteRecord[],
  theme: ResolvedThemeOptions,
  renderers: Renderers | undefined,
  options: AppSetupOptions | undefined,
): RouteRecordRaw[] {
  return [
    {
      path: '/',
      redirect: routesRecords[0].path,
    },
    ...routesRecords.map<RouteRecordRaw>(record => {
      return {
        path: record.path,
        component: () => import('./components/page/Page'),
        props: resolvePageProps(record.pageData, theme, renderers, options),
      }
    }),
  ]
}
