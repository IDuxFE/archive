/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { type PropType, defineComponent } from 'vue'

import { IxTooltip } from '@idux/components/tooltip'

export default defineComponent({
  props: {
    tooltip: String,
    onClick: { type: Function as PropType<() => void>, required: true },
  },
  setup(props, { slots }) {
    return () => (
      <IxTooltip title={props.tooltip}>
        <div class="archive-app-demo__tool" onClick={props.onClick}>
          {slots.default?.()}
        </div>
      </IxTooltip>
    )
  },
})
