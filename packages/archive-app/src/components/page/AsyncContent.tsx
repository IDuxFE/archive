/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { type PropType, defineComponent, inject, onMounted, ref, watch } from '@idux/archive-app/vue'

import { pageContextToken } from '../../token'
import { PageContentInstance } from '../../types'
import BaseContentComp from './BaseContent'

export default defineComponent({
  props: {
    visible: { type: Boolean, required: true },
    component: { type: Function as PropType<() => Promise<{ default: PageContentInstance }>>, required: true },
  },
  setup(props) {
    const elRef = ref<HTMLElement>()
    const instance = ref<PageContentInstance>()
    onMounted(() => {
      watch(
        () => props.component,
        async comp => {
          instance.value?.unmount()
          instance.value = (await comp()).default

          instance.value?.mount?.(elRef.value!)
        },
        {
          immediate: true,
        },
      )
    })

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
          () => [<div ref={elRef}></div>],
        )}
      </BaseContentComp>
    )
  },
})
