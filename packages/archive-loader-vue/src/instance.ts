/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable camelcase */

import { type DefineComponent, defineComponent, h, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

import { type InstanceCompProps, instanceCompProps } from './types'

export default defineComponent({
  name: 'ArchiveInstance',
  props: instanceCompProps,
  setup(props) {
    const elRef = ref<HTMLElement>()

    onMounted(() => {
      watch(
        () => props.instance,
        async (instance, formerInstance) => {
          props.onInstanceMountedChange?.(false)
          await formerInstance?.unmount()

          while (!elRef.value) {
            await nextTick()
          }

          const observer = new MutationObserver(mutations => {
            if (mutations.findIndex(m => m.type === 'childList') > -1 && elRef.value?.children.length) {
              props.onInstanceMountedChange?.(true)
              observer.disconnect()
            }
          })
          observer.observe(elRef.value!, {
            childList: true,
            subtree: false,
            attributes: false,
          })

          await instance?.mount?.(elRef.value!)
        },
        {
          immediate: true,
        },
      )
    })
    onUnmounted(() => {
      props.instance?.unmount()
    })

    return () => h('div', { ref: elRef })
  },
}) as DefineComponent<InstanceCompProps>
