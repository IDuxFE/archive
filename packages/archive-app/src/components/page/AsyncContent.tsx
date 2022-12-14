/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { type DefineComponent, type PropType, computed, defineAsyncComponent, defineComponent, inject } from 'vue'

import { pageContextToken } from '../../token'
import BaseContentComp from './BaseContent'

export default defineComponent({
  props: {
    visible: { type: Boolean, required: true },
    component: { type: Function as PropType<() => Promise<DefineComponent>>, required: true },
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
