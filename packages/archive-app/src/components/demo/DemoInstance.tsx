import type { DemoInstance } from '@idux/archive-plugin'
import { type PropType, defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue'

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
