/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AppRenderers, AppSetupOptions, ResolvedAppThemeOptions, RouteRecord } from '@idux/archive-types'
import type { RouteRecordRaw } from 'vue-router'

import { resolvePageProps } from './resolvePageProps'

export function resolveRoutes(
  routesRecords: RouteRecord[],
  theme: ResolvedAppThemeOptions,
  renderers: AppRenderers | undefined,
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
