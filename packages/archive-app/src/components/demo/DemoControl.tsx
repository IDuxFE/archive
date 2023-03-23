/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { VueItemControls } from '@idux/archive-types'

import { type PropType, defineComponent, h } from 'vue'

import NumberCtrl from './NumberCtrl'
import StringCtrl from './StringCtrl'

export default defineComponent({
  props: {
    controls: Array as PropType<VueItemControls[]>,
    prefixCls: { type: String, required: true },
  },
  setup(props) {
    const ctrlMap = {
      string: StringCtrl,
      number: NumberCtrl,
      boolean: StringCtrl,
      object: StringCtrl,
    }
    const prefixCls = `${props.prefixCls}-demo__control`
    return () => (
      <div class={prefixCls}>
        <div class={`${prefixCls}__list`}>
          <div class={`${prefixCls}__list__row`}>
            <div class={`${prefixCls}__list__col`}>name</div>
            <div class={`${prefixCls}__list__col`}>type</div>
            <div class={`${prefixCls}__list__grow`}>control</div>
          </div>
          {props.controls?.map(item => {
            return (
              <div class={`${prefixCls}__list__row`}>
                <div class={`${prefixCls}__list__col`}>{item.prop}</div>
                <div class={`${prefixCls}__list__col`}>{item.type}</div>
                <div class={`${prefixCls}__list__grow`}>{h(ctrlMap[item.type], { control: item })}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
})
