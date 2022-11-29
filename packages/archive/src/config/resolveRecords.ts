import type { RecordsContext } from '../types'
import type {
  AppMountOptions,
  ResolvedSidebarRecord,
  ResolvedNavRecord,
  SidebarRecord,
  NavRecord,
  RouteRecord,
  PageData,
  ResolvedPageData,
  ResolvedPageTab,
} from '@idux/archive-app'

import { mapTree, normalizePath } from '../utils'
import { isArray } from 'lodash-es'

export function resolveRecords(
  navRecords: NavRecord[] | undefined,
  sidebarRecords: SidebarRecord[] | Record<string, SidebarRecord[]>,
): RecordsContext {
  const routeRecords: RouteRecord[] = []
  const sidebarNavRecordMap = new Map<string, ResolvedNavRecord & { type: 'sidebar' }>()

  let resolvedSidebarRecords: AppMountOptions['sidebarRecords']
  let resolvedNavRecords: AppMountOptions['navRecords']

  const resolveSidebarRecords = (records: SidebarRecord[], sidebar?: string) => {
    return mapTree(records, 'children', (record, parents) => {
      const resolvedRecord = { ...record } as ResolvedSidebarRecord
      if (resolvedRecord.type === 'item') {
        resolvedRecord.path =
          parents
            .reverse()
            .map(p => p.id)
            .join('/') +
          '/' +
          resolvedRecord.id

        if (sidebar && sidebarNavRecordMap.has(sidebar)) {
          const sidbarNavRecord = sidebarNavRecordMap.get(sidebar)!
          resolvedRecord.path = normalizePath(sidbarNavRecord.prefix + '/' + resolvedRecord.path)
        } else {
          resolvedRecord.path = normalizePath('/' + resolvedRecord.path)
        }

        const resolvedData = resolvePageData(resolvedRecord.pageData)
        resolvedRecord.pageData = resolvedData

        routeRecords.push({
          path: resolvedRecord.path,
          pageData: resolvedRecord.pageData,
        })
      }

      return resolvedRecord
    })
  }

  const resolveNavRecords = (records: NavRecord[]) => {
    return mapTree(records, 'children', (record, parents) => {
      const resolvedRecord = { ...record } as ResolvedNavRecord
      if (resolvedRecord.type === 'item') {
        resolvedRecord.path = normalizePath(
          '/' +
            parents
              .reverse()
              .map(p => p.id)
              .join('/') +
            resolvedRecord.id,
        )

        const resolvedData = resolvePageData(resolvedRecord.pageData)
        resolvedRecord.pageData = resolvedData

        routeRecords.push({
          path: resolvedRecord.path,
          pageData: resolvedRecord.pageData,
        })
      }

      if (resolvedRecord.type === 'sidebar') {
        resolvedRecord.prefix = normalizePath(
          '/' +
            parents
              .reverse()
              .map(p => p.id)
              .join('/') +
            resolvedRecord.sidebar,
        )
        sidebarNavRecordMap.set(resolvedRecord.sidebar, resolvedRecord)
      }

      return resolvedRecord
    })
  }

  if (navRecords) {
    resolvedNavRecords = resolveNavRecords(navRecords)
  }

  if (isArray(sidebarRecords)) {
    resolvedSidebarRecords = resolveSidebarRecords(sidebarRecords)
  } else {
    let temp = {} as Record<string, ResolvedSidebarRecord[]>
    Object.entries(sidebarRecords).forEach(([sidebar, records]) => {
      temp[sidebar] = resolveSidebarRecords(records, sidebar)

      const sidebarNavRecord = sidebarNavRecordMap.get(sidebar)
      if (sidebarNavRecord && temp[sidebar][0]) {
        sidebarNavRecord.path = normalizePath(sidebarNavRecord.prefix + '/' + temp[sidebar][0].id)
      }
    })

    resolvedSidebarRecords = temp
  }

  sidebarNavRecordMap.clear()

  return {
    resolvedNavRecords,
    resolvedSidebarRecords,
    routeRecords,
  }
}

function resolvePageData(pageData: PageData): ResolvedPageData {
  const resolvedData: ResolvedPageData = {
    title: pageData.title,
    description: pageData.description,
    demos: pageData.demos,
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
