/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedDemoItem } from '@idux/archive-types'

import { type PropType, computed, defineComponent, h } from '__External_Vue__' // eslint-disable-line import/no-unresolved
import { Instance } from 'external:@idux/archive-loader-vue/client' // eslint-disable-line import/no-unresolved

import { createDemoInstance } from '../../createDemoInstance'

export default defineComponent({
  props: {
    demoItem: {
      type: Object as PropType<ResolvedDemoItem>,
      required: true,
    },
  },
  setup(props) {
    const instance = computed(() => {
      return createDemoInstance(props.demoItem)
    })
    return () => h(Instance, { instance: instance.value })
  },
})
