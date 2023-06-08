/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { computed } from 'vue'

import { IxRadioGroup } from '@idux/components/radio'

import { defineCtrComponent } from './defineCtrComponent'

export default defineCtrComponent<'radio', string | boolean | number>({
  setup({ control, controlValue, setControlValue }) {
    const dataSource = computed(() =>
      control.value.options.map(opt => ({
        key: opt.label,
        label: opt.label,
      })),
    )
    const selectedOption = computed(() => control.value.options.find(opt => opt.value === controlValue.value))

    const handleChange = (value: string) => {
      const option = control.value.options.find(opt => opt.label === value)

      option && setControlValue(option.value)
    }

    return () => (
      <div class="archive-app-demo__control-radio">
        <IxRadioGroup value={selectedOption.value?.label} dataSource={dataSource.value} onChange={handleChange} />
      </div>
    )
  },
})
