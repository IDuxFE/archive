/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { DemoInstance } from '@idux/archive-vite-plugin'

import { type PropType, defineComponent, onBeforeUnmount, onMounted, ref, watch } from '@idux/archive-app/vue'

export default defineComponent({
  props: {
    demoInstance: { type: Object as PropType<DemoInstance>, required: true },
  },
  setup(props) {
    const elRef = ref<HTMLElement>()
    const { mount, unmount } = (() => {
      return {
        mount: async (instance: DemoInstance) => {
          await instance.mount?.(elRef.value!)
        },
        unmount: async (instance: DemoInstance) => {
          await instance.unmount()
        },
      }
    })()

    onMounted(() => mount(props.demoInstance))
    onBeforeUnmount(() => unmount(props.demoInstance))

    watch(
      () => props.demoInstance,
      async (current, pre) => {
        await unmount(pre)
        await mount(current)
      },
    )

    return () => <div ref={elRef}></div>
  },
})
