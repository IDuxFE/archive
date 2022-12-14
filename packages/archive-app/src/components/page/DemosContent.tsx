/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { type PropType, computed, defineComponent, inject, nextTick, ref, watch } from 'vue'

// eslint-disable-next-line import/no-unresolved
import allDemoInstance from 'virtual:archive-demo-all'
// eslint-disable-next-line import/no-unresolved
import allDemoDatas from 'virtual:archive-demo-all-data'

import { pageContextToken } from '../../token'
import DemoComp from '../demo/Demo'
import BaseContentComp from './BaseContent'

export default defineComponent({
  props: {
    demoIds: { type: Array as PropType<string[]>, required: true },
    visible: { type: Boolean, required: true },
  },
  setup(props) {
    const {
      options: { getInitVisibleDemoIds, getDemoTools },
      renderers: { pageContent: pageContentRenderer },
      render,
    } = inject(pageContextToken)!
    const baseContentRef = ref()

    const _getInitVisibleDemoIds = () =>
      getInitVisibleDemoIds ? getInitVisibleDemoIds(demoDatas.value) : props.demoIds

    const demoDatas = computed(() => props.demoIds.map(id => allDemoDatas[id]))
    const visibleDemoIds = ref(_getInitVisibleDemoIds())
    const setVisibleDemoIds = (demoIds: string[]) => {
      visibleDemoIds.value = demoIds
    }

    watch(
      () => props.demoIds,
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
              demos: demoDatas.value,
              visibleDemoIds: visibleDemoIds.value,
              setVisibleDemoIds,
            },
            pageContentRenderer,
            () =>
              props.demoIds.map(id => (
                <DemoComp
                  v-show={visibleDemoIds.value.includes(id)}
                  demoData={allDemoDatas[id]}
                  demoInstance={allDemoInstance[id]}
                  tools={getDemoTools?.(allDemoDatas[id])}
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
