/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type {
  AppRenderers,
  AppSetupOptions,
  PageInstance,
  ResolvedAppThemeOptions,
  RouteRecord,
} from '@idux/archive-types'

import { useBreakpoints } from '@idux/cdk/breakpoint'

import { type App, VNode, createApp, createVNode, render } from '@idux/archive-app/vue'

import Page from '../components/page/Page'
import { resolvePageProps } from '../resolvePageProps'
import { breakpointsToken, themeToken } from '../token'
import iduxInstall from './iduxInstall'

/* eslint-disable camelcase */

let __archive_app_vue_instance__: App | undefined

function _createApp(setupApp: ((app: App) => void) | undefined, theme: ResolvedAppThemeOptions) {
  if (!__archive_app_vue_instance__) {
    __archive_app_vue_instance__ = createApp({
      render: () => null,
    })
    __archive_app_vue_instance__.use(iduxInstall)
    __archive_app_vue_instance__.provide(breakpointsToken, useBreakpoints(theme.breakpoints))
    __archive_app_vue_instance__.provide(themeToken, theme)

    setupApp?.(__archive_app_vue_instance__)
  }
}

export function createPageInstance(
  routeRecord: RouteRecord,
  theme: ResolvedAppThemeOptions,
  renderers: AppRenderers | undefined,
  setupOptions: AppSetupOptions | undefined,
  setupApp?: (app: App) => void,
): PageInstance {
  let _vm: VNode
  let _el: HTMLElement

  const mount = (el: HTMLElement) => {
    unmount()
    _createApp(setupApp, theme)

    _el = el
    _vm = createVNode(Page, { ...resolvePageProps(routeRecord.pageData, theme, renderers ?? {}, setupOptions) })
    _vm.appContext = __archive_app_vue_instance__!._context

    render(_vm, el)
  }
  const unmount = () => {
    _el && render(null, _el)
  }

  return {
    mount,
    unmount,
  }
}
