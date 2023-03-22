/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AsyncReturnType } from 'type-fest'

import { type Ref, onMounted, ref, watch } from '@idux/archive-app/vue'

export function useAsyncProp<P extends { [key in K]: (() => Promise<any>) | undefined }, K extends keyof P>(
  props: P,
  key: K,
): Ref<AsyncReturnType<Exclude<P[K], undefined>> | undefined> {
  const data = ref<AsyncReturnType<Exclude<P[K], undefined>>>()

  onMounted(() => {
    watch(
      () => props[key],
      async asyncProp => {
        data.value = undefined
        if (asyncProp) {
          data.value = await asyncProp?.()
        }
      },
      {
        immediate: true,
      },
    )
  })

  return data
}

export function useArrayAsyncProp<P extends { [key in K]: (() => Promise<any>)[] | undefined }, K extends keyof P>(
  props: P,
  key: K,
): Ref<AsyncReturnType<Exclude<P[K], undefined>[number]>[] | undefined> {
  const data = ref<AsyncReturnType<Exclude<P[K], undefined>[number]>[]>()

  onMounted(() => {
    watch(
      () => props[key],
      async arrayAsyncProp => {
        data.value = undefined
        if (arrayAsyncProp) {
          data.value = await Promise.all(arrayAsyncProp?.map(asyncProp => asyncProp()))
        }
      },
      {
        immediate: true,
      },
    )
  })

  return data
}
