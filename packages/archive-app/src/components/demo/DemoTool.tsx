/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { IxTooltip } from '@idux/components/tooltip'

import { type PropType, defineComponent } from '@idux/archive-app/vue'

export default defineComponent({
  props: {
    prefixCls: { type: String, required: true },
    tooltip: String,
    onClick: { type: Function as PropType<() => void>, required: true },
  },
  setup(props, { slots }) {
    return () => (
      <IxTooltip title={props.tooltip}>
        <div class={`${props.prefixCls}-demo__tool`} onClick={props.onClick}>
          {slots.default?.()}
        </div>
      </IxTooltip>
    )
  },
})
