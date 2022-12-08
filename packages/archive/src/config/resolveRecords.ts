import type { RecordsContext } from '../types'
import type {
  ResolvedNavRecord,
  NavRecord,
  RouteRecord,
  PageData,
  ResolvedPageData,
  ResolvedPageTab,
} from '@idux/archive-app'

import { mapTree, normalizePath } from '../utils'

export function resolveRecords(navRecords: NavRecord[]): RecordsContext {
  const routeRecords: RouteRecord[] = []

  let resolvedNavRecords: ResolvedNavRecord[]
  let recordsMap = new Map<NavRecord, ResolvedNavRecord & { type: 'sub' }>()

  const resolveSidebarRecords = (records: NavRecord[]) => {
    return mapTree(records, 'children', (record, parents) => {
      const resolvedRecord = { ...record } as ResolvedNavRecord
      if (resolvedRecord.type === 'item') {
        resolvedRecord.path = normalizePath(
          '/' +
            [...parents]
              .reverse()
              .map(p => p.id)
              .join('/') +
            '/' +
            resolvedRecord.id,
        )

        const resolvedData = resolvePageData(resolvedRecord.pageData)
        resolvedRecord.pageData = resolvedData

        routeRecords.push({
          path: resolvedRecord.path,
          pageData: resolvedRecord.pageData,
        })

        parents.forEach(parent => {
          if (parent.type === 'sub' && recordsMap.has(parent)) {
            const parentRecord = recordsMap.get(parent)!
            parentRecord.path = resolvedRecord.path
            recordsMap.delete(parent)
          }
        })
      }

      if (resolvedRecord.type === 'sub') {
        recordsMap.set(record, resolvedRecord)
      }

      return resolvedRecord
    })
  }

  resolvedNavRecords = resolveSidebarRecords(navRecords)

  return {
    resolvedNavRecords,
    routeRecords,
  }
}

function resolvePageData(pageData: PageData): ResolvedPageData {
  const resolvedData: ResolvedPageData = {
    title: pageData.title,
    description: pageData.description,
    demoIds: pageData.demoIds,
  }

  if (pageData.tabs) {
    resolvedData.tabs = pageData.tabs.map<ResolvedPageTab>(tab => {
      if (tab.src) {
        return {
          name: tab.name,
          id: tab.id,
          component: `() => import(${JSON.stringify(tab.src)})`,
        } as unknown as ResolvedPageTab
      }

      return tab
    })
  }

  return resolvedData
}
