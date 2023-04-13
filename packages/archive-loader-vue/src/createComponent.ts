/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable camelcase */

import type { Instance } from '@idux/archive-vite-plugin'

import { type ComponentObjectPropsOptions, DefineComponent, defineComponent, h, onMounted, watch } from 'vue'

import { debounce, omit } from 'lodash-es'

import InstanceComp from './instance'
import { type InstanceCompProps, instanceCompProps } from './types'

export function createComponent<P extends object, I extends Instance<P>>(
  instance: I,
  props?: ComponentObjectPropsOptions<P>,
): DefineComponent<P & Pick<InstanceCompProps, 'onInstanceMountedChange'>> {
  return defineComponent({
    name: 'ArchiveInstanceWrapper',
    props: { ...(props ?? {}), onInstanceMountedChange: instanceCompProps.onInstanceMountedChange },
    setup(props) {
      const setData = debounce(() => {
        instance.setData(omit(props, 'onInstanceMountedChange'))
      }, 10)
      onMounted(() => {
        watch(props, setData, {
          immediate: true,
        })
      })

      return () =>
        h(InstanceComp, {
          instance: instance as Instance<Record<string, any>>,
          onInstanceMountedChange: props.onInstanceMountedChange,
        })
    },
  }) as DefineComponent<P & Pick<InstanceCompProps, 'onInstanceMountedChange'>>
}
