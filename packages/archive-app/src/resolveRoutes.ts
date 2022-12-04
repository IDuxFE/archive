import type { RouteRecord, ResolvedThemeOptions, ResolvedPageData } from './types'
import type { RouteRecordRaw } from 'vue-router'

export function resolveRoutes(routesRecords: RouteRecord[], theme: ResolvedThemeOptions): RouteRecordRaw[] {
  return [
    {
      path: '/',
      redirect: routesRecords[0].path,
    },
    ...routesRecords.map<RouteRecordRaw>(record => {
      return {
        path: record.path,
        component: () => import('./components/page/Page'),
        props: resolvePageProps(record.pageData, theme),
      }
    }),
  ]
}

export function resolvePageProps(pageData: ResolvedPageData, theme: ResolvedThemeOptions) {
  const {
    page: { headerAffix, enableAnchor, anchorMaxLevel },
  } = theme
  return { pageData: pageData, headerAffix, anchorOptions: enableAnchor ? { maxLevel: anchorMaxLevel } : false }
}
