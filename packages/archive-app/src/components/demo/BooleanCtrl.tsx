/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedDemoItem, VueItemControls } from '@idux/archive-types'

import { type PropType, defineComponent } from 'vue'

import { IxRadioGroup, type RadioData } from '@idux/components/radio'

export default defineComponent({
  props: {
    instance: { type: Object as PropType<ResolvedDemoItem['instance']>, required: true },
    control: { type: Object as PropType<VueItemControls>, required: true },
  },
  setup(props) {
    const booleanRadio: RadioData[] = [
      { key: 'true', label: 'true' },
      { key: 'false', label: 'false' },
    ]
    const setData = (value: 'true' | 'false') => {
      props.instance.setData({ [props.control.prop]: value === 'true' ? true : false })
    }
    return () => (
      <div>
        <IxRadioGroup dataSource={booleanRadio} onChange={setData} />
      </div>
    )
  },
})
