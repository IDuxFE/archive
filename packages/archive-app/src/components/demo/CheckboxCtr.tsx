/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { computed } from 'vue'

import { IxCheckboxGroup } from '@idux/components/checkbox'

import { defineCtrComponent } from './defineCtrComponent'

export default defineCtrComponent<'checkbox', (string | boolean | number)[]>({
  setup({ control, controlValue, setControlValue }) {
    const dataSource = computed(() =>
      control.value.options.map(opt => ({
        key: opt.label,
        label: opt.label,
      })),
    )
    const selectedValue = computed(() =>
      controlValue.value
        ?.map(v => {
          return control.value.options.find(opt => opt.value === v)?.label
        })
        .filter(Boolean),
    )

    const handleChange = (value: string[]) => {
      const checkedValue = value
        .map(v => control.value.options.find(opt => opt.value === v)?.value)
        .filter(Boolean) as (string | boolean | number)[]

      checkedValue && setControlValue(checkedValue)
    }

    return () => (
      <div class="archive-app-demo__control-checkbox">
        <IxCheckboxGroup value={selectedValue.value} dataSource={dataSource.value} onChange={handleChange} />
      </div>
    )
  },
})
