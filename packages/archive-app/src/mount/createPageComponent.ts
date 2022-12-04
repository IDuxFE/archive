import type { ResolvedThemeOptions, RouteRecord } from '../types'
import { createVNode, defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

import { createPageInstance } from './createPageInstance'

export function createPageComponent(routeRecord: RouteRecord, theme: ResolvedThemeOptions) {
  return defineComponent(() => {
    const instance = createPageInstance(routeRecord, theme)
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