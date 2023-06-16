/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedItem } from '@idux/archive-vite-plugin'

import { type Ref, computed, onBeforeUnmount, ref, watch } from 'vue'

import { useArrayAsyncProp, useAsyncProp } from './useAsyncProp'

export function useArchiveItemImport<
  P extends { [key in K]: (() => Promise<{ default: I }>) | undefined },
  K extends keyof P,
  I extends ResolvedItem,
>(props: P, key: K): Ref<I | undefined> {
  const data = useAsyncProp(props, key)
  const updatedItem = ref<I>()

  const resolvedItem = computed(() => updatedItem.value ?? data.value?.default)

  let stop: (() => void) | undefined
  if (window.__ARCHIVE_HMR_RUNTIME__) {
    stop = window.__ARCHIVE_HMR_RUNTIME__.onItemChange(item => {
      if (updatedItem.value?.id === item.id || data.value?.default.id === item.id) {
        updatedItem.value = item as I
      }
    })

    onBeforeUnmount(() => {
      stop?.()
    })
  }

  watch(data, () => {
    updatedItem.value = undefined
  })

  return resolvedItem
}

export function useArchiveItemImports<
  P extends { [key in K]: (() => Promise<{ default: I }>)[] | undefined },
  K extends keyof P,
  I extends ResolvedItem,
>(props: P, key: K): Ref<I[]> {
  const data = useArrayAsyncProp(props, key)
  const updatedItems = ref<Record<string, I>>({})

  const resolvedItems = computed(
    () =>
      data.value?.map(mod => {
        const item = mod.default

        return updatedItems.value[item.id] ?? item
      }) ?? [],
  )

  let stop: (() => void) | undefined
  if (window.__ARCHIVE_HMR_RUNTIME__) {
    stop = window.__ARCHIVE_HMR_RUNTIME__.onItemChange(item => {
      if (!!updatedItems.value[item.id] || data.value?.findIndex(loadedItem => loadedItem.default.id === item.id)) {
        updatedItems.value[item.id] = item as I
      }
    })

    onBeforeUnmount(() => {
      stop?.()
    })
  }

  watch(data, () => {
    updatedItems.value = {}
  })

  return resolvedItems
}
