import { type PropType, defineComponent, defineAsyncComponent, computed } from 'vue'
import BaseContentComp from './BaseContent'

export default defineComponent({
  props: {
    visible: { type: Boolean, required: true },
    component: { type: Function as PropType<() => Promise<any>>, required: true },
  },
  setup(props) {
    const Comp = computed(() => defineAsyncComponent(props.component))

    return () => (
      <BaseContentComp visible={props.visible}>
        <Comp.value />
      </BaseContentComp>
    )
  },
})
