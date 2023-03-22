/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { Instance } from '@idux/archive-vite-plugin'

import { callEmit } from '@idux/cdk'

import { type PropType, defineComponent, onUnmounted, ref, watch } from '@idux/archive-app/vue'

import { useAsyncProp } from '../composables/useAsyncProp'

export default defineComponent({
  props: {
    asyncInstance: { type: Function as PropType<() => Promise<Instance>> },
    onInstanceMountedChange: {
      type: [Function, Array] as PropType<((mounted: boolean) => void) | ((mounted: boolean) => void)[]>,
    },
  },
  setup(props) {
    const elRef = ref<HTMLElement>()
    const instanceRef = useAsyncProp(props, 'asyncInstance')

    watch(instanceRef, async (instance, formerInstance) => {
      callEmit(props.onInstanceMountedChange, false)
      await formerInstance?.unmount()

      const observer = new MutationObserver(mutations => {
        if (mutations.findIndex(m => m.type === 'childList') > -1 && elRef.value?.children.length) {
          callEmit(props.onInstanceMountedChange, true)
          observer.disconnect()
        }
      })
      observer.observe(elRef.value!, {
        childList: true,
        subtree: false,
        attributes: false,
      })

      await instance?.mount?.(elRef.value!)
    })
    onUnmounted(() => {
      instanceRef.value?.unmount()
    })

    return () => <div ref={elRef}></div>
  },
})
