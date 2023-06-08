/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { DemoTool, ResolvedDemoItem } from '@idux/archive-types'
import type { Instance } from '@idux/archive-vite-plugin'

import { type App, h } from 'vue'

import { createInstance } from '@idux/archive-loader-vue/client'
import { IxMessageProvider } from '@idux/components/message'

import Demo from './src/components/demo/Demo'
import iduxInstall from './src/mount/iduxInstall'

export function createDemoInstance(
  resolvedDemoItem: ResolvedDemoItem,
  tools?: DemoTool[],
  setupApp?: (app: App) => void,
): Instance<object> {
  const instance = createInstance('__archive_app_vue_instance__', Demo, {
    setupApp(app) {
      app.use(iduxInstall)
      setupApp?.(app)
    },
    renderApp(children) {
      return h(IxMessageProvider, children)
    },
  })

  const mount = (el: HTMLElement) => {
    instance.unmount()
    instance.mount(el, { resolvedDemoItem: resolvedDemoItem, tools })
  }
  const unmount = () => instance.unmount()
  const setData = () => {}
  const getData = () => undefined
  const watchData = () => {}

  return {
    mount,
    unmount,
    setData,
    getData,
    watchData,
  } as unknown as Instance<object>
}
