/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable camelcase */

import type { Instance } from '@idux/archive-vite-plugin'

import Vue, { type Component, type PropOptions, type PropType } from 'vue'

import { debounce } from 'lodash-es'

import InstanceComp from './instance'
import { instanceCompProps } from './types'

type Props<P extends Record<string, any>> = {
  [k in keyof P]: PropType<P[k]> | PropOptions<P[k]>
}

export function createComponent<P extends object, I extends Instance<P>>(
  instance: I,
  props?: Props<P>,
): Component<object, object, object, P> {
  return Vue.extend({
    name: 'ArchiveInstanceWrapper',
    props: { ...(props ?? {}), onInstanceMountedChange: instanceCompProps.onInstanceMountedChange },
    mounted() {
      if (!props) {
        return
      }

      const setData = debounce(() => {
        instance.setData(
          Object.keys(props).reduce((data, key) => {
            data[key as keyof P] = (this as any)[key]
            return data
          }, {} as P),
        )
      }, 10)

      Object.keys(props).forEach(key => {
        this.$watch(key, setData)
      })
      setData()
    },
    render(h) {
      return h(InstanceComp, { props: { instance, onInstanceMountedChange: this.onInstanceMountedChange } })
    },
  })
}
