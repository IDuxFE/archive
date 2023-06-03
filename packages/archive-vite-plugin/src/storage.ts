/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { LoadedItem, QueryObj, ResolvedLoader, ResolvedOptions, Storage } from './types'

import { basename, relative } from 'pathe'

let idSeed = 0

export function createStorage(options: ResolvedOptions): Storage {
  const itemMap = new Map<string, LoadedItem>()

  const load = async (absolutePath: string, query: QueryObj, loader: ResolvedLoader) => {
    const id = get(absolutePath)?.id ?? `archive-item-${idSeed++}`
    const relativePath = relative(options.root, absolutePath)
    const filename = basename(absolutePath)

    const resolvedRes = await loader.resolve(absolutePath, query)

    const item: LoadedItem = {
      id,
      filename,
      relativePath,
      absolutePath,
      query,
      loader,
      ...resolvedRes,
    }

    return item
  }

  const itemChangeHandlers: ((item: LoadedItem) => void)[] = []
  const notifyItemChange = (item: LoadedItem) => {
    for (const handler of itemChangeHandlers) {
      handler(item)
    }
  }

  const exists = (absolutePath: string) => itemMap.has(absolutePath)

  const set = async (absolutePath: string, query: QueryObj, loader: ResolvedLoader) => {
    const itemExisted = exists(absolutePath)

    const item = await load(absolutePath, query, loader)
    itemMap.set(item.absolutePath, item)

    if (itemExisted) {
      notifyItemChange(item)
    }

    return item
  }
  const remove = (absolutePath: string) => {
    itemMap.delete(absolutePath)
  }
  const get = (absolutePath: string) => {
    return itemMap.get(absolutePath)
  }

  return {
    get,
    getAll: () => [...itemMap.values()],
    exists: absolutePath => itemMap.has(absolutePath),
    set,
    remove,

    onItemChange: callback => itemChangeHandlers.push(callback),
    notifyItemChange,
  }
}
