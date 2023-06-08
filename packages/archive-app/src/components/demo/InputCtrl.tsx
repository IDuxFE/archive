/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { IxInput } from '@idux/components/input'

import { defineCtrComponent } from './defineCtrComponent'

export default defineCtrComponent<'input', string>({
  setup({ controlValue, setControlValue }) {
    return () => (
      <div class="archive-app-demo__control-input">
        <IxInput value={controlValue.value} onChange={setControlValue} />
      </div>
    )
  },
})
