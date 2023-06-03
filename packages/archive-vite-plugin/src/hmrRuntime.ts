/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { HmrRuntime, ItemChangeCallback, ResolvedItem } from './types'

const itemChangeCbs: Set<ItemChangeCallback> = new Set()

function onItemChange(cb: ItemChangeCallback) {
  itemChangeCbs.add(cb)

  return () => {
    itemChangeCbs.delete(cb)
  }
}

function _updateItem(currentItem: ResolvedItem, newItem: ResolvedItem) {
  for (const key of Object.keys(newItem) as (keyof ResolvedItem)[]) {
    if (key !== 'id' && key !== 'instance') {
      ;(currentItem[key] as ResolvedItem[keyof ResolvedItem]) = newItem[key]
    }
  }

  itemChangeCbs.forEach(cb => cb(newItem))
}

const getGlobalThis = (): any => {
  return typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : {}
}

const archiveHmrRuntime: HmrRuntime = {
  onItemChange,
  _updateItem,
}

getGlobalThis().__ARCHIVE_HMR_RUNTIME__ = archiveHmrRuntime
