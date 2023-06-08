/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { DemoControl } from '@idux/archive-types'
import type { Instance } from '@idux/archive-vite-plugin'

import { type ComputedRef, type PropType, type VNodeChild, computed, defineComponent } from 'vue'

import { debounce, isNil } from 'lodash-es'

import { useState } from '@idux/cdk/utils'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function defineCtrComponent<T extends DemoControl['type'], PT>(options: {
  setup: (props: {
    control: ComputedRef<DemoControl & { type: T }>
    controlValue: ComputedRef<PT | undefined>
    setControlValue: (value: PT | undefined | null) => void
  }) => () => VNodeChild
}) {
  type D = {
    [K: string]: PT
  }
  const { setup } = options

  return defineComponent({
    props: {
      instance: { type: Object as PropType<Instance<D>>, required: true },
      control: { type: Object as PropType<DemoControl & { type: T }>, required: true },
    },
    setup(props) {
      const control = computed(() => props.control)
      const [controlValue, setControlValue] = useState<PT | undefined>(props.instance.getData()?.[props.control.key])
      const setInstanceData = debounce((value: PT | undefined) => {
        props.instance.setData({ [props.control.key]: value ?? undefined })
      }, 50)

      const setData = (value: PT | undefined | null) => {
        setControlValue(!isNil(value) ? value : undefined)
        setInstanceData(!isNil(value) ? value : undefined)
      }

      props.instance.watchData(props.control.key, value => {
        if (value !== controlValue) {
          setControlValue(value)
        }
      })

      return setup({
        control,
        controlValue,
        setControlValue: setData,
      })
    },
  })
}
