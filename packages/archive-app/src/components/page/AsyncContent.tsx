/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { PageContentInstance } from '@idux/archive-types'

import { type PropType, defineComponent, inject, onMounted, ref, watch, nextTick } from '@idux/archive-app/vue'

import { pageContextToken } from '../../token'
import BaseContentComp from './BaseContent'

export default defineComponent({
  props: {
    visible: { type: Boolean, required: true },
    component: { type: Function as PropType<() => Promise<{ default: PageContentInstance }>>, required: true },
  },
  setup(props) {
    const elRef = ref<HTMLElement>()
    const instance = ref<PageContentInstance>()
    const instanceMounted = ref<boolean>(false)

    onMounted(() => {
      watch(
        () => props.component,
        async comp => {
          instanceMounted.value = false
          await instance.value?.unmount()
          elRef.value!.innerHTML = ''

          instance.value = (await comp()).default

          const observer = new MutationObserver(mutations => {
            if (mutations.findIndex(m => m.type === 'childList') > -1 && elRef.value?.children.length) {
              instanceMounted.value = true
              observer.disconnect()
            }
          })
          observer.observe(elRef.value!, {
            childList: true,
            subtree: false,
            attributes: false,
          })

          await instance.value?.mount?.(elRef.value!)
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
      <BaseContentComp visible={props.visible && instanceMounted.value}>
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
