import type { CollectedDemo } from '@idux/archive-plugin'
import type { NavRecord, PageTab, DemoTool, PageData } from '@idux/archive-app'

import { statSync, readdirSync } from 'fs'
import { basename, dirname, resolve } from 'pathe'

interface PageInfo {
  id?: string
  name?: string
  title?: string
  description?: string
  tabs?: PageTab[]
}

export interface DirectoryNavGetterOptions {
  navRoots?: string[]
  ignorePatterns?: RegExp[]

  getPageInfo?: (dir: string) => PageInfo | undefined
  getDemoTools?: (demo: CollectedDemo) => DemoTool[]
  filterDemos?: (demos: CollectedDemo) => boolean
  sortDemos?: (demo1: CollectedDemo, demo2: CollectedDemo) => number
  
  mapRecords?: (dir: string, records: NavRecord[]) => NavRecord[]
}

const defaultGetPageInfo = (dir: string): PageInfo => {
  const id = basename(dir)

  const TAB_MATCH_REG = /\.tab\.(vue|md)$/
  const tabs = readdirSync(dir)
    .filter(file => TAB_MATCH_REG.test(file))
    .map(tab => {
      const tabName = tab.replace(TAB_MATCH_REG, '')
      return { id: tabName, name: tabName, src: resolve(dir, tab) }
    }) as PageTab[]

  return {
    id,
    name: id,
    title: id,
    description: '',
    tabs,
  }
}

export function directoryNavGetter(
  demos: CollectedDemo[],
  root: string,
  options?: DirectoryNavGetterOptions,
): NavRecord[] {
  const demoDirnameMap = new Map<string, CollectedDemo[]>()
  demos.forEach(demo => {
    const demoDirname = dirname(demo.path)
    const _demos = demoDirnameMap.get(demoDirname) ?? []

    _demos.push(demo)
    !demoDirnameMap.has(demoDirname) && demoDirnameMap.set(demoDirname, _demos)
  })

  const { rootRecords, records } = resolveDir(root, demoDirnameMap, options)
  const result = [...records, ...rootRecords]

  if (!result.length) {
    return [
      {
        type: 'item',
        id: 'demos',
        name: 'demos',
        pageData: {
          title: 'Demos',
          description: '',
          demos: demos.map(demo => ({ id: demo.id, tools: options?.getDemoTools?.(demo) })),
        },
      },
    ]
  }

  return result
}

interface DirResolveRes {
  rootRecords: NavRecord[]
  records: NavRecord[]
}
function resolveDir(
  dir: string,
  demoDirnameMap: Map<string, CollectedDemo[]>,
  options?: DirectoryNavGetterOptions,
): DirResolveRes {
  const {
    navRoots,
    ignorePatterns,
    getPageInfo = defaultGetPageInfo,
    getDemoTools,
    filterDemos,
    sortDemos,
    mapRecords,
  } = options ?? {}

  const result: DirResolveRes = {
    records: [],
    rootRecords: [],
  }

  if (ignorePatterns?.some(reg => reg.test(dir))) {
    return result
  }

  let records = readdirSync(dir)
    .map(file => {
      const subdir = resolve(dir, file)
      if (!statSync(subdir).isDirectory()) {
        return
      }

      let demos = demoDirnameMap.get(subdir)
      if (filterDemos) {
        demos = demos?.filter(filterDemos)
      }
      if (sortDemos) {
        demos = demos?.sort(sortDemos)
      }

      const _demos = demos?.map(demo => ({ id: demo.id, tools: getDemoTools?.(demo) }))
      const {
        id: pageId = file,
        name: pageName = file,
        title: pageTitle = file,
        description = '',
        tabs = [],
      } = getPageInfo(subdir) ?? {}

      if (!_demos && !tabs.length) {
        const subItem = {
          type: 'sub',
          id: pageId,
          name: pageName,
          children: [] as NavRecord[],
        }
        const subResult = resolveDir(subdir, demoDirnameMap, options)

        subItem.children = subResult.records
        subResult.rootRecords && result.rootRecords.push(...subResult.rootRecords)

        return subItem
      }

      let pageData: PageData
      if (tabs.length > 0) {
        const demoTab = tabs.find(tab => tab.id === 'demos')

        if (demoTab) {
          demoTab.demos = _demos
        }
        pageData = {
          title: pageTitle,
          description,
          tabs,
        }
      } else {
        pageData = {
          title: pageTitle,
          description,
          demos: _demos,
        }
      }

      return {
        type: 'item',
        id: pageId,
        name: pageName,
        pageData,
      }
    })
    .filter(Boolean) as NavRecord[]

  if (mapRecords) {
    records = mapRecords(dir, records)
  }

  if (navRoots?.find(root => root === dir)) {
    result.rootRecords.unshift(...records)
  } else {
    result.records = records
  }

  return result
}
