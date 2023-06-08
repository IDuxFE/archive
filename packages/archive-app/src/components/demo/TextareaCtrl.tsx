/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { IxTextarea } from '@idux/components/textarea'

import { defineCtrComponent } from './defineCtrComponent'

export default defineCtrComponent<'textarea', string>({
  setup({ controlValue, setControlValue }) {
    return () => (
      <div class="archive-app-demo__control-textarea">
        <IxTextarea value={controlValue.value} onChange={setControlValue} />
      </div>
    )
  },
})
