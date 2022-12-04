import type { DemoData } from '../../types'
import { type PropType, defineComponent } from 'vue'
import allDemoDatas from 'virtual:archive-demo-all-data'
import allDemoInstance from 'virtual:archive-demo-all'

import BaseContentComp from './BaseContent'
import DemoComp from '../demo/Demo'

export default defineComponent({
  props: {
    demos: { type: Array as PropType<DemoData[]>, required: true },
    visible: { type: Boolean, required: true },
  },
  setup(props) {
    return () => (
      <BaseContentComp visible={props.visible}>
        {props.demos.map(demo => (
          <DemoComp
            demoData={allDemoDatas[demo.id]}
            demoInstance={allDemoInstance[demo.id]}
            tools={demo.tools}
            prefixCls="archive-app"
            lang="zh"
          />
        ))}
      </BaseContentComp>
    )
  },
})
