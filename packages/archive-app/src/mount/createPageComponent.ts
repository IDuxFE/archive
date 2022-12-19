/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AppRenderers, AppSetupOptions, ResolvedAppThemeOptions, RouteRecord } from '@idux/archive-types'

import {
  type App,
  type DefineComponent,
  createVNode,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from '__External_Vue__' // eslint-disable-line import/no-unresolved

import { createPageInstance } from './createPageInstance'

export function createPageComponent(
  routeRecord: RouteRecord,
  theme: ResolvedAppThemeOptions,
  renderers: AppRenderers | undefined,
  options: AppSetupOptions | undefined,
  setupApp?: (app: App) => void,
): DefineComponent {
  return defineComponent(() => {
    const instance = createPageInstance(routeRecord, theme, renderers, options, setupApp)
    const elRef = ref<HTMLElement>()
    onMounted(() => {
      instance.mount(elRef.value!)
    })
    onBeforeUnmount(() => {
      instance.unmount()
    })

    return () => createVNode('div', { ref: elRef })
  })
}
