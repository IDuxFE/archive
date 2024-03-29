/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { IxInputNumber } from '@idux/components/input-number'

import { defineCtrComponent } from './defineCtrComponent'

export default defineCtrComponent<'number', number>({
  setup({ controlValue, setControlValue }) {
    return () => (
      <div class="archive-app-demo__control-number">
        <IxInputNumber value={controlValue.value} onChange={setControlValue} />
      </div>
    )
  },
})
