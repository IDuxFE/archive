import type { PageInstance, PageAnchorOptions, RouteRecord } from '../types'
import { type App, createApp, createVNode, render, defineComponent, VNode } from 'vue'

import Page from '../components/page/Page.vue'

import pageIduxInstall from './pageIduxInstall'

let __archive_app_vue_instance__: App | undefined

function _createApp() {
  if (!__archive_app_vue_instance__) {
    __archive_app_vue_instance__ = createApp({ render: () => null })
    __archive_app_vue_instance__.use(pageIduxInstall)
  }
}

export function createPageInstance(routeRecord: RouteRecord, pageAnchor?: PageAnchorOptions | boolean): PageInstance {
  let _vm: VNode
  let _el: HTMLElement

  const mount = (el: HTMLElement) => {
    unmount()
    _createApp()

    _el = el
    _vm = createVNode(Page, { pageData: routeRecord.pageData, pageAnchor })
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
