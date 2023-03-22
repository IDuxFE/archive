/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { LoadedItem, QueryObj, ResolvedLoader, ResolvedOptions, Storage } from './types'

import { basename, relative } from 'pathe'

let idSeed = 0

// export function watch(options: ResolvedOptions, demoStorage: Storage): FSWatcher {
//   const { root } = options
//   const { remove, notifyListChange } = demoStorage

//   const { matchPatterns, ignorePatterns } = getPatterns(options)
//   const watcher = _watch(matchPatterns, { cwd: root, ignored: ignorePatterns.length > 0 ? ignorePatterns : undefined })

//   watcher
//     // .on('add', file => {
//     //   add(file)
//     //   notifyListChange()
//     // })
//     .on('unlink', file => {
//       remove(file)
//       notifyListChange()
//     })

//   return watcher
// }

export function createStorage(options: ResolvedOptions): Storage {
  const itemMap = new Map<string, LoadedItem>()
  const listChangeHandlers: (() => void)[] = []

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
  const notifyListChange = () => {
    // // Delay in case file renaming fired Add event before Unlink event
    // setTimeout(_notifyListChange, 100)

    for (const handler of listChangeHandlers) {
      handler()
    }
  }

  const exists = (absolutePath: string) => itemMap.has(absolutePath)

  const set = async (absolutePath: string, query: QueryObj, loader: ResolvedLoader) => {
    const itemExisted = exists(absolutePath)

    const item = await load(absolutePath, query, loader)
    itemMap.set(item.absolutePath, item)

    if (itemExisted) {
      notifyItemChange(item)
    } else {
      notifyListChange()
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

    onListChange: callback => listChangeHandlers.push(callback),
    onItemChange: callback => itemChangeHandlers.push(callback),
    notifyListChange,
    notifyItemChange,
  }
}
