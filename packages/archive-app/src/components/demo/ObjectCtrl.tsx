/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { VueItemControls } from '@idux/archive-types'

import { type PropType, defineComponent } from 'vue'

import { IxInput } from '@idux/components/input'

export default defineComponent({
  props: {
    control: Object as PropType<VueItemControls>,
  },
  setup(props) {
    return () => (
      <div>
        <IxInput />
        <div>{`asgasgasg${JSON.stringify(props.control)}`}</div>
      </div>
    )
  },
})
