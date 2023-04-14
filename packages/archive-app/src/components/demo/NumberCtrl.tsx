/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedDemoItem, VueItemControls } from '@idux/archive-types'

import { type PropType, defineComponent } from 'vue'

import { debounce } from 'lodash-es'

import { IxInputNumber } from '@idux/components/input-number'

export default defineComponent({
  props: {
    instance: { type: Object as PropType<ResolvedDemoItem['instance']>, required: true },
    control: { type: Object as PropType<VueItemControls>, required: true },
  },
  setup(props) {
    const setData = debounce(value => {
      props.instance.setData({ [props.control.prop]: value })
    }, 200)
    return () => (
      <div>
        <IxInputNumber onChange={setData} />
      </div>
    )
  },
})
