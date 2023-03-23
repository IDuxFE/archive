/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { VueItemControls } from '@idux/archive-types'

import { type PropType, defineComponent } from 'vue'

import { IxInputNumber } from '@idux/components/input-number'

export default defineComponent({
  props: {
    control: Object as PropType<VueItemControls>,
  },
  setup(props) {
    return () => (
      <div>
        <IxInputNumber />
        <div>{`asgasgasg${JSON.stringify(props.control)}`}</div>
      </div>
    )
  },
})
