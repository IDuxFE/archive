/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { useState } from '@idux/cdk/utils'
import { IxTextarea } from '@idux/components/textarea'

import { defineCtrComponent } from './defineCtrComponent'

export default defineCtrComponent<'json', object>({
  setup({ controlValue, setControlValue }) {
    const [inputValue, setInputValue] = useState<string | undefined>(
      controlValue.value ? JSON.stringify(controlValue.value, undefined, 2) : undefined,
    )
    const handleChange = (value: string | undefined) => {
      setInputValue(value)
      if (!value) {
        setControlValue({})
      } else {
        try {
          const parsedValue = JSON.parse(value)
          setControlValue(parsedValue)
        } catch (err) {
          // TODO: add tips
        }
      }
    }

    return () => (
      <div class="archive-app-demo__control-json">
        <IxTextarea value={inputValue.value} onChange={handleChange} placeholder="JSON string required" />
      </div>
    )
  },
})
