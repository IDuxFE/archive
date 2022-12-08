import { type PropType, computed, defineComponent, ref, inject, watch, nextTick } from 'vue'
import allDemoDatas from 'virtual:archive-demo-all-data'
import allDemoInstance from 'virtual:archive-demo-all'

import { pageContextToken } from '../../token'

import BaseContentComp from './BaseContent'
import DemoComp from '../demo/Demo'

export default defineComponent({
  props: {
    demoIds: { type: Array as PropType<string[]>, required: true },
    visible: { type: Boolean, required: true },
  },
  setup(props) {
    const {
      options: { getInitVisibleDemoIds, getDemoTools },
      renderers: { pageContent: pageContentRenderer },
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
      let children = props.demoIds.map(id => (
        <DemoComp
          v-show={visibleDemoIds.value.includes(id)}
          demoData={allDemoDatas[id]}
          demoInstance={allDemoInstance[id]}
          tools={getDemoTools?.(allDemoDatas[id])}
          prefixCls="archive-app"
          lang="zh"
        />
      ))

      return (
        <BaseContentComp ref={baseContentRef} visible={props.visible}>
          {pageContentRenderer
            ? pageContentRenderer(
                {
                  demos: demoDatas.value,
                  visibleDemoIds: visibleDemoIds.value,
                  setVisibleDemoIds,
                },
                children,
              )
            : children}
        </BaseContentComp>
      )
    }
  },
})
