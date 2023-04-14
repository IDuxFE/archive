/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedDemoItem, VueItemControls } from '@idux/archive-types'

import { type PropType, defineComponent } from 'vue'

import { debounce } from 'lodash-es'

import { IxInput } from '@idux/components/input'

export default defineComponent({
  props: {
    instance: { type: Object as PropType<ResolvedDemoItem['instance']>, required: true },
    control: { type: Object as PropType<VueItemControls>, required: true },
  },
  setup(props) {
    const setData = debounce(value => {
      try {
        const parsedValue = JSON.parse(value)
        props.instance.setData({ [props.control.prop]: parsedValue })
      } catch (error) {
        // todo: add tips
      }
    }, 200)
    return () => (
      <div>
        <IxInput onChange={setData} placeholder="JSON string required" />
      </div>
    )
  },
})
