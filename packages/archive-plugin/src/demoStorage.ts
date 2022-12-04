import type { CollectedDemo, DemoStorage, ResolvedOptions } from './types'
import { type FSWatcher, watch } from 'chokidar'
import { globby } from 'globby'
import { paramCase } from 'change-case'
import { resolve, basename } from 'pathe'

export function watchDemos(options: ResolvedOptions, demoStorage: DemoStorage): FSWatcher {
  const { root } = options
  const { add, remove, notifyListChange } = demoStorage

  const { matchPatterns, ignorePatterns } = getPatterns(options)
  const watcher = watch(matchPatterns, { cwd: root, ignored: ignorePatterns.length > 0 ? ignorePatterns : undefined })

  watcher
    // .on('add', file => {
    //   add(file)
    //   notifyListChange()
    // })
    .on('unlink', file => {
      remove(file)
      notifyListChange()
    })

  return watcher
}

export function createDemoStorage(options: ResolvedOptions): DemoStorage {
  const demoMap = new Map<string, CollectedDemo>()
  const pathMap = new Map<string, string>()
  const listChangeHandlers: (() => void)[] = []

  const { findCollector } = options

  const collectDemo = async (relativePath: string) => {
    const absolutePath = resolve(options.root, relativePath)
    const filename = basename(relativePath)
    const collector = findCollector(relativePath)

    if (!collector) {
      return
    }

    const resolvedRes = await collector.resolver(absolutePath)

    const demo: CollectedDemo = {
      id: paramCase(relativePath),
      filename,
      path: absolutePath,
      ...resolvedRes,
    }

    demoMap.set(demo.id, demo)
    pathMap.set(absolutePath, demo.id)

    console.log('demo collected', relativePath)
  }

  const demoChangeHandlers: ((demo: CollectedDemo) => void)[] = [
    demo => {
      collectDemo(demo.id)
    },
  ]

  const _notifyListChange = () => {
    for (const handler of listChangeHandlers) {
      handler()
    }
  }
  const notifyDemoChange = (demo: CollectedDemo) => {
    for (const handler of demoChangeHandlers) {
      handler(demo)
    }
  }
  const notifyListChange = () => {
    // Delay in case file renaming fired Add event before Unlink event
    setTimeout(_notifyListChange, 100)
  }

  const add = async (relativePath: string) => {
    await collectDemo(relativePath)
  }
  const remove = (id: string) => {
    demoMap.delete(id)
  }
  const get = (id: string) => {
    if (pathMap.has(id)) {
      return demoMap.get(pathMap.get(id)!)
    }

    return demoMap.get(id)
  }

  return {
    get,
    getAll: () => [...demoMap.values()],
    exists: id => pathMap.has(id) || demoMap.has(id),
    add,
    remove,

    onListChange: callback => listChangeHandlers.push(callback),
    notifyListChange,

    onDemoChange: callback => demoChangeHandlers.push(callback),
    notifyDemoChange,
  }
}

export async function collectAllDemos(options: ResolvedOptions, demoStorage: DemoStorage) {
  const { root } = options
  const { add } = demoStorage

  const { matchPatterns, ignorePatterns } = getPatterns(options)
  const files = await globby(matchPatterns, {
    ignoreFiles: ignorePatterns.length > 0 ? ignorePatterns : undefined,
    cwd: root,
  })

  await Promise.all(files.map(file => add(file)))
}

function getPatterns(options: ResolvedOptions): {
  matchPatterns: string[]
  ignorePatterns: string[]
} {
  const { collectors } = options

  return {
    matchPatterns: collectors.flatMap(collector => collector.matchPattern),
    ignorePatterns: collectors.flatMap(collector => collector.ignorePattern).filter(Boolean) as string[]
  }
}