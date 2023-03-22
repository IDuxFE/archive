/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { NavRecord, PageData, PageTab } from '@idux/archive-types'

import { readdirSync, statSync } from 'fs'

import { basename, resolve } from 'pathe'

interface PageInfo {
  id?: string
  name?: string
  title?: string
  description?: string
  tabs?: PageTab[]
  demos?: string[]
}

export interface DirectoryNavGetterOptions {
  navRoots?: string[]
  ignorePatterns?: RegExp[]

  checkIsPage?: (path: string) => boolean
  getPageInfo?: (path: string, isDir: boolean) => PageInfo | undefined

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

  const DEMO_MATCH_REG = /\.demo\.vue$/
  const TAB_MATCH_REG = /\.tab\.(vue|md)$/
  const files = readdirSync(path)
  const demos = files.filter(file => DEMO_MATCH_REG.test(file)).map(demo => resolve(path, demo))
  const tabs = files
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
    tabs: tabs.length ? [...tabs, { id: 'demos', name: 'Demos', demos }] : undefined,
    demos: !tabs.length ? demos : undefined,
  }
}

function defaultCheckIsPage(path: string) {
  return /\.page\.(vue|md)$/.test(path)
}

export function getNavFromDirectory(root: string, options?: DirectoryNavGetterOptions): NavRecord[] {
  const { rootRecords, records } = resolveDir(root, options)
  return [...records, ...rootRecords]
}

interface DirResolveRes {
  rootRecords: NavRecord[]
  records: NavRecord[]
}
function resolveDir(dir: string, options?: DirectoryNavGetterOptions): DirResolveRes {
  const {
    navRoots,
    ignorePatterns,
    checkIsPage = defaultCheckIsPage,
    getPageInfo = defaultGetPageInfo,
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
        const {
          id: pageId = file,
          name: pageName = file,
          title: pageTitle,
          description = '',
          tabs = [],
          demos = [],
        } = getPageInfo(path, true) ?? {}

        if (!demos?.length && !tabs.length) {
          const subItem = {
            type: 'sub',
            id: pageId,
            name: pageName,
            children: [] as NavRecord[],
          }
          const subResult = resolveDir(path, options)

          subItem.children = subResult.records
          subResult.rootRecords && result.rootRecords.push(...subResult.rootRecords)

          return subItem
        }

        const basicPageInfo = {
          title: pageTitle,
          description,
        }
        let pageData: PageData | undefined

        if (demos.length) {
          pageData = {
            ...basicPageInfo,
            demos,
          }
        } else if (tabs.length > 0) {
          pageData = {
            ...basicPageInfo,
            tabs,
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
