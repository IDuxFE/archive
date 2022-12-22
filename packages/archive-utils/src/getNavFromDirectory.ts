/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { DemoTool, NavRecord, PageData, PageTab } from '@idux/archive-types'
import type { CollectedDemo } from '@idux/archive-vite-plugin'

import { readdirSync, statSync } from 'fs'

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

  checkIsPage?: (path: string) => boolean
  getPageInfo?: (path: string, isDir: boolean) => PageInfo | undefined
  getDemoTools?: (demo: CollectedDemo) => DemoTool[]
  filterDemos?: (demos: CollectedDemo) => boolean
  sortDemos?: (demo1: CollectedDemo, demo2: CollectedDemo) => number

  mapRecords?: (dir: string, records: NavRecord[]) => NavRecord[]
}

const defaultGetPageInfo = (path: string, isDir: boolean): PageInfo => {
  const id = basename(path).replace(/\.page\.(vue|md)$/, '')
  if (!isDir) {
    return {
      id,
      name: id,
    }
  }

  const TAB_MATCH_REG = /\.tab\.(vue|md)$/
  const tabs = readdirSync(path)
    .filter(file => TAB_MATCH_REG.test(file))
    .map(tab => {
      const tabName = tab.replace(TAB_MATCH_REG, '')
      return { id: tabName, name: tabName, src: resolve(path, tab) }
    }) as PageTab[]

  return {
    id,
    name: id,
    title: id,
    description: '',
    tabs: tabs.length ? [...tabs, { id: 'demos', name: 'Demos', demoIds: [] }] : undefined,
  }
}
function defaultCheckIsPage(path: string) {
  return /\.page\.(vue|md)$/.test(path)
}

export function getNavFromDirectory(
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
          demoIds: demos.map(demo => demo.id),
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
    checkIsPage = defaultCheckIsPage,
    getPageInfo = defaultGetPageInfo,
    filterDemos,
    sortDemos,
    mapRecords,
  } = options ?? {}

  const result: DirResolveRes = {
    records: [],
    rootRecords: [],
  }

  const checkIgnored = (path: string) => {
    return ignorePatterns?.some(reg => reg.test(path))
  }

  if (checkIgnored(dir)) {
    return result
  }

  let records = readdirSync(dir)
    .map(file => {
      const path = resolve(dir, file)

      if (checkIgnored(path)) {
        return
      }

      if (statSync(path).isDirectory()) {
        let demos = demoDirnameMap.get(path)
        if (filterDemos) {
          demos = demos?.filter(filterDemos)
        }
        if (sortDemos) {
          demos = demos?.sort(sortDemos)
        }

        const _demoIds = demos?.map(demo => demo.id)
        const {
          id: pageId = file,
          name: pageName = file,
          title: pageTitle,
          description = '',
          tabs = [],
        } = getPageInfo(path, true) ?? {}

        if (!_demoIds?.length && !tabs.length) {
          const subItem = {
            type: 'sub',
            id: pageId,
            name: pageName,
            children: [] as NavRecord[],
          }
          const subResult = resolveDir(path, demoDirnameMap, options)

          subItem.children = subResult.records
          subResult.rootRecords && result.rootRecords.push(...subResult.rootRecords)

          return subItem
        }

        let pageData: PageData | undefined
        if (tabs.length > 0) {
          const demoTab = tabs.find(tab => tab.id === 'demos')

          if (demoTab) {
            demoTab.demoIds = _demoIds
          }
          pageData = {
            title: pageTitle,
            description,
            tabs,
          }
        } else if (_demoIds?.length) {
          pageData = {
            title: pageTitle,
            description,
            demoIds: _demoIds,
          }
        }

        return pageData
          ? {
              type: 'item',
              id: pageId,
              name: pageName,
              pageData,
            }
          : undefined
      }

      if (checkIsPage(path)) {
        const { id = file, name = file, title, description } = getPageInfo(path, false) ?? {}

        return {
          type: 'item',
          id,
          name,
          pageData: {
            title,
            description,
            src: path,
          },
        }
      }

      return
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
