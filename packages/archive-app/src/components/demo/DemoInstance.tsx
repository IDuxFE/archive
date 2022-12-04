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
        mount: async () => {
          await props.demoInstance.mount?.(elRef.value!)
        },
        unmount: async () => {
          await props.demoInstance.unmount()
        },
      }
    })()

    onMounted(mount)
    onBeforeUnmount(unmount)

    watch(
      () => props.demoInstance,
      async () => {
        await unmount()
        await mount()
      },
    )

    return () => <div ref={elRef}></div>
  },
})
