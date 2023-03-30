/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AppRenderers, AppSetupOptions, ResolvedAppThemeOptions, RouteRecord } from '@idux/archive-types'
import type { Instance } from '@idux/archive-vite-plugin'
import type { App } from 'vue'

import { createInstance } from '@idux/archive-loader-vue/client'
import { useBreakpoints } from '@idux/cdk/breakpoint'

import iduxInstall from './iduxInstall'
import Page from '../components/page/Page'
import { resolvePageProps } from '../resolvePageProps'
import { breakpointsToken, themeToken } from '../token'

export function createPageInstance(
  routeRecord: RouteRecord,
  theme: ResolvedAppThemeOptions,
  renderers: AppRenderers | undefined,
  setupOptions: AppSetupOptions | undefined,
  setupApp?: (app: App) => void,
): Instance {
  const instance = createInstance('__archive_app_vue_instance__', Page, {
    setupApp(app) {
      app.use(iduxInstall)
      app.provide(breakpointsToken, useBreakpoints(theme.breakpoints))
      app.provide(themeToken, theme)

      setupApp?.(app)
    },
  })

  const mount = (el: HTMLElement) => {
    instance.unmount()
    instance.mount(el, { ...resolvePageProps(routeRecord.pageData, theme, renderers ?? {}, setupOptions) })
  }
  const unmount = () => instance.unmount()

  return {
    mount,
    unmount,
    setData: () => {},
  }
}
