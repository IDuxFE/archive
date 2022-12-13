import type { ResolvedAppThemeOptions, RouteRecord, AppRenderers, AppSetupOptions } from '../types'
import { type App, createVNode, defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

import { createPageInstance } from './createPageInstance'

export function createPageComponent(
  routeRecord: RouteRecord,
  theme: ResolvedAppThemeOptions,
  renderers: AppRenderers | undefined,
  options: AppSetupOptions | undefined,
  setupApp?: (app: App) => void,
) {
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
