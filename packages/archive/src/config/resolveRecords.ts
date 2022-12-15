/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { RecordsContext } from '../types'
import type {
  NavRecord,
  PageData,
  ServerResolvedNavRecord,
  ServerResolvedPageData,
  ServerResolvedPageTab,
  ServerRouteRecord,
} from '@idux/archive-app'

import { normalizePath } from '../utils'
import { mapTree } from '@idux/archive-utils'

export function resolveRecords(navRecords: NavRecord[]): RecordsContext {
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
        const resolvedPageData = resolvePageData(record.pageData)
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

function resolvePageData(pageData: PageData): ServerResolvedPageData | undefined {
  const basicData = {
    title: pageData.title,
    description: pageData.description,
  }

  if (pageData.demoIds) {
    return {
      ...basicData,
      demoIds: pageData.demoIds,
    }
  }

  if (pageData.src) {
    return {
      ...basicData,
      component: `() => import(${JSON.stringify(pageData.src)})`,
    }
  }

  if (pageData.tabs) {
    return {
      ...basicData,
      tabs: pageData.tabs.map<ServerResolvedPageTab>(tab => {
        if (tab.src) {
          return {
            name: tab.name,
            id: tab.id,
            component: `() => import(${JSON.stringify(tab.src)})`,
          }
        }

        return tab as ServerResolvedPageTab
      }),
    }
  }
}
