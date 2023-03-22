/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type {
  NavRecord,
  PageData,
  RecordsContext,
  ServerResolvedNavRecord,
  ServerResolvedPageData,
  ServerResolvedPageTab,
  ServerRouteRecord,
} from '@idux/archive-types'
import type { Loader } from '@idux/archive-vite-plugin'

import { mapTree } from '@idux/archive-utils'

import { getImportScript, normalizePath } from '../utils'

export function resolveRecords(navRecords: NavRecord[], pageLoaders: Loader[], demoLoaders: Loader[]): RecordsContext {
  const routeRecords: ServerRouteRecord[] = []

  const recordsMap = new Map<NavRecord, ServerResolvedNavRecord & { type: 'sub' }>()

  const resolveSidebarRecords = (records: NavRecord[]) => {
    return mapTree(records, 'children', (record, parents) => {
      const basicRecord = {
        id: record.id,
        name: record.name,
      }
      let resolvedRecord: ServerResolvedNavRecord
      if (record.type === 'item') {
        const resolvedPageData = resolvePageData(record.pageData, pageLoaders, demoLoaders)
        if (!resolvedPageData) {
          return
        }

        const path = normalizePath(
          '/' +
            [...parents]
              .reverse()
              .map(p => p.id)
              .join('/') +
            '/' +
            record.id,
        )

        resolvedRecord = {
          ...basicRecord,
          id: record.id,
          type: 'item',
          path,
          pageData: resolvedPageData,
        }

        routeRecords.push({
          path: path,
          pageData: resolvedPageData,
        })

        parents.forEach(parent => {
          if (parent.type === 'sub' && recordsMap.has(parent)) {
            const parentRecord = recordsMap.get(parent)!
            parentRecord.path = path
            recordsMap.delete(parent)
          }
        })
        return resolvedRecord
      }

      resolvedRecord = { ...record } as ServerResolvedNavRecord
      if (record.type === 'sub') {
        recordsMap.set(record, resolvedRecord as ServerResolvedNavRecord & { type: 'sub' })
      }

      return resolvedRecord
    })
  }

  const resolvedNavRecords = resolveSidebarRecords(navRecords)

  return {
    resolvedNavRecords,
    routeRecords,
  }
}

function resolvePageData(
  pageData: PageData,
  pageLoaders: Loader[],
  demoLoaders: Loader[],
): ServerResolvedPageData | undefined {
  const basicData = {
    title: pageData.title,
    description: pageData.description,
  }

  if (pageData.demos) {
    return {
      ...basicData,
      demoImportScripts: pageData.demos.map(demo => getImportScript(demo, demoLoaders)).filter(Boolean) as string[],
    }
  }

  if (pageData.src) {
    return {
      ...basicData,
      importScript: getImportScript(pageData.src, pageLoaders),
    }
  }

  if (pageData.tabs) {
    return {
      ...basicData,
      tabs: pageData.tabs
        .map<ServerResolvedPageTab | undefined>(tab => {
          if (tab.demos) {
            return {
              name: tab.name,
              id: tab.id,
              demoImportScripts: tab.demos.map(demo => getImportScript(demo, demoLoaders)).filter(Boolean) as string[],
            }
          }

          if (tab.src) {
            return {
              name: tab.name,
              id: tab.id,
              importScript: getImportScript(tab.src, pageLoaders),
            }
          }

          return
        })
        .filter(Boolean) as ServerResolvedPageTab[],
    }
  }
}
