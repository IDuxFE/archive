import { type PropType, defineComponent, defineAsyncComponent, computed, inject } from 'vue'
import BaseContentComp from './BaseContent'

import { pageContextToken } from '../../token'

export default defineComponent({
  props: {
    visible: { type: Boolean, required: true },
    component: { type: Function as PropType<() => Promise<any>>, required: true },
  },
  setup(props) {
    const Comp = computed(() => defineAsyncComponent(props.component))
    const {
      render,
      renderers: { pageContent: pageContentRenderer },
    } = inject(pageContextToken)!

    return () => (
      <BaseContentComp visible={props.visible}>
        {render(
          {
            demos: [],
            visibleDemoIds: [],
            setVisibleDemoIds: () => {},
          },
          pageContentRenderer,
          () => [<Comp.value />],
        )}
      </BaseContentComp>
    )
  },
})
