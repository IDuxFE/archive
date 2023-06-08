/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { computed } from 'vue'

import { IxRadioGroup, type RadioData } from '@idux/components/radio'

import { defineCtrComponent } from './defineCtrComponent'

export default defineCtrComponent<'boolean', boolean>({
  setup({ controlValue, setControlValue }) {
    const radioValue = computed(() => (controlValue.value ? 'true' : 'false'))
    const booleanRadio: RadioData[] = [
      { key: 'true', label: 'true' },
      { key: 'false', label: 'false' },
    ]

    const handleChange = (value: 'true' | 'false') => {
      setControlValue(value === 'true' ? true : false)
    }

    return () => (
      <div class="archive-app-demo__control-boolean">
        <IxRadioGroup value={radioValue.value} dataSource={booleanRadio} onChange={handleChange} />
      </div>
    )
  },
})
