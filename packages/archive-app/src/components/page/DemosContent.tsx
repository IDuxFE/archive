/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedDemoItem } from '@idux/archive-types'

import { type PropType, computed, defineComponent, inject, nextTick, ref, watch } from 'vue'

import BaseContentComp from './BaseContent'
import { useArrayAsyncProp } from '../../composables/useAsyncProp'
import { pageContextToken } from '../../token'
import DemoComp from '../demo/Demo'

export default defineComponent({
  props: {
    demoImports: { type: Array as PropType<(() => Promise<{ default: ResolvedDemoItem }>)[]>, required: true },
    visible: { type: Boolean, required: true },
  },
  setup(props) {
    const {
      options: { getInitVisibleDemoIds, getDemoTools },
      renderers: { pageContent: pageContentRenderer },
      render,
    } = inject(pageContextToken)!
    const baseContentRef = ref()

    const demosRef = useArrayAsyncProp(props, 'demoImports')
    const demoItems = computed(() => demosRef.value?.map(demo => demo.default) ?? [])
    const demoIds = computed(() => demoItems.value.map(demoItem => demoItem.id))

    const _getInitVisibleDemoIds = () =>
      getInitVisibleDemoIds ? getInitVisibleDemoIds(demoItems.value) : demoIds.value

    const visibleDemoIds = ref(_getInitVisibleDemoIds())
    const setVisibleDemoIds = (demoIds: string[]) => {
      visibleDemoIds.value = demoIds
    }

    watch(
      demoIds,
      () => {
        visibleDemoIds.value = _getInitVisibleDemoIds()
      },
      {
        flush: 'post',
      },
    )
    watch(visibleDemoIds, (ids, oldIds) => {
      if (ids.length !== oldIds.length) {
        nextTick(() => {
          baseContentRef.value.updateAnchor()
        })
      }
    })

    return () => {
      return (
        <BaseContentComp ref={baseContentRef} visible={props.visible}>
          {render(
            {
              demos: demoItems.value,
              visibleDemoIds: visibleDemoIds.value,
              setVisibleDemoIds,
            },
            pageContentRenderer,
            () =>
              demoItems.value.map(demoItem => (
                <DemoComp
                  v-show={visibleDemoIds.value.includes(demoItem.id)}
                  resolvedDemoItem={demoItem}
                  tools={getDemoTools?.(demoItem)}
                  prefixCls="archive-app"
                  lang="zh"
                />
              )),
          )}
        </BaseContentComp>
      )
    }
  },
})
