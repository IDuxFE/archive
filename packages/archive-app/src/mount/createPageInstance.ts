import type { PageInstance, ResolvedThemeOptions, RouteRecord, Renderers, AppSetupOptions } from '../types'
import { type App, createApp, createVNode, render, VNode } from 'vue'

import Page from '../components/page/Page'

import { resolvePageProps } from '../resolvePageProps'

import iduxInstall from './iduxInstall'

let __archive_app_vue_instance__: App | undefined

function _createApp(setupApp?: (app: App) => void) {
  if (!__archive_app_vue_instance__) {
    __archive_app_vue_instance__ = createApp({ render: () => null })
    __archive_app_vue_instance__.use(iduxInstall)

    setupApp?.(__archive_app_vue_instance__)
  }
}

export function createPageInstance(
  routeRecord: RouteRecord,
  theme: ResolvedThemeOptions,
  renderers: Renderers | undefined,
  options: AppSetupOptions | undefined,
  setupApp?: (app: App) => void,
): PageInstance {
  let _vm: VNode
  let _el: HTMLElement

  const mount = (el: HTMLElement) => {
    unmount()
    _createApp(setupApp)

    _el = el
    _vm = createVNode(Page, { ...resolvePageProps(routeRecord.pageData, theme, renderers, options) })
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
