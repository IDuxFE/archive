import type { RouteRecord, PageAnchorOptions } from './types'
import type { RouteRecordRaw } from 'vue-router'

export function resolveRoutes(
  routesRecords: RouteRecord[],
  pageAnchor: PageAnchorOptions | boolean | undefined,
): RouteRecordRaw[] {
  return [
    {
      path: '/',
      redirect: routesRecords[0].path,
    },
    ...routesRecords.map<RouteRecordRaw>(record => {
      return {
        path: record.path,
        component: () => import('./components/page/Page.vue'),
        props: { pageData: record.pageData, pageAnchor },
      }
    }),
  ]
}
