import type { CollectedDemo } from '@idux/archive-plugin'
import type { SidebarRecord, PageTab } from '@idux/archive-app'

import { statSync, readdirSync } from 'fs'
import { basename, dirname, resolve } from 'pathe'

export interface DirStrucResolveOptions {
  sidebarRoots?: { sidebar: string; root: string }[]
  getId?: (dir: string) => string
  getName?: (dir: string, id: string) => string
  getTitle?: (dir: string, id: string, name: string) => string
  getTabs?: (dir: string) => PageTab[] | undefined
  filterDemos?: (demos: CollectedDemo) => boolean
  sortDemos?: (demo1: CollectedDemo, demo2: CollectedDemo) => number
  mapRecords?: (dir: string, records: SidebarRecord[]) => SidebarRecord[]
}

const defaultGetId = (dir: string) => basename(dir)
const defaultGetName = (dir: string, id: string) => id
const defaultGetTitle = (dir: string, id: string, name: string) => name
const defaultGetTabs = (dir: string) => {
  const TAB_MATCH_REG = /\.tab\.(vue|md)$/
  return readdirSync(dir)
    .filter(file => TAB_MATCH_REG.test(file))
    .map(tab => {
      const tabName = tab.replace(TAB_MATCH_REG, '')
      return { id: tabName, name: tabName, src: resolve(dir, tab) }
    })
}

export function getSidebarRecordsByDirectory(
  demos: CollectedDemo[],
  root: string,
  options?: DirStrucResolveOptions,
): SidebarRecord[] | Record<string, SidebarRecord[]> {
  const demoDirnameMap = new Map<string, CollectedDemo[]>()
  demos.forEach(demo => {
    const demoDirname = dirname(demo.path)
    const _demos = demoDirnameMap.get(demoDirname) ?? []

    _demos.push(demo)
    !demoDirnameMap.has(demoDirname) && demoDirnameMap.set(demoDirname, _demos)
  })

  const resolveResults = resolveDir(root, demoDirnameMap, options)

  if (!resolveResults.length) {
    return [
      {
        type: 'item',
        id: 'demos',
        name: 'demos',
        pageData: {
          title: 'Demos',
          description: '',
          demos: demos.map(demo => ({ id: demo.id })),
        },
      },
    ]
  }

  if (resolveResults.length === 1 && !resolveResults[0].sidebar) {
    return resolveResults[0].records
  }

  const results: Record<string, SidebarRecord[]> = {}
  resolveResults.forEach(r => {
    const sidebar = r.sidebar ?? 'default'
    results[sidebar] = [...(results[sidebar] ?? []), ...r.records]
  })

  return results
}

interface DirResolveRes {
  sidebar: string | undefined
  records: SidebarRecord[]
}
function resolveDir(
  dir: string,
  demoDirnameMap: Map<string, CollectedDemo[]>,
  options?: DirStrucResolveOptions,
): DirResolveRes[] {
  const {
    sidebarRoots,
    getId = defaultGetId,
    getName = defaultGetName,
    getTitle = defaultGetTitle,
    getTabs = defaultGetTabs,
    filterDemos,
    sortDemos,
    mapRecords,
  } = options ?? {}

  const results: DirResolveRes[] = []
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

      const _demos = demos?.map(demo => ({ id: demo.id }))
      const PageId = getId(subdir)
      const pageName = getName(subdir, PageId)
      const pageTitle = getTitle(subdir, PageId, pageName)
      const tabs = getTabs(subdir) ?? []

      if (!_demos && !tabs.length) {
        const subItem = {
          type: 'sub',
          id: PageId,
          name: pageName,
          children: [] as SidebarRecord[],
        }
        resolveDir(subdir, demoDirnameMap, options).forEach(res => {
          if (!res.sidebar) {
            subItem.children = res.records
          } else {
            results.push(res)
          }
        })

        return subItem
      }

      const pageData =
        tabs.length > 0
          ? {
              title: pageTitle,
              description: '',
              tabs: [...tabs, _demos && { id: 'demos', name: 'demos', demos: _demos }],
            }
          : {
              title: pageTitle,
              description: '',
              demos: _demos,
            }

      return {
        type: 'item',
        id: PageId,
        name: pageName,
        pageData,
      }
    })
    .filter(Boolean) as SidebarRecord[]

  if (mapRecords) {
    records = mapRecords(dir, records)
  }

  results.unshift({
    sidebar: sidebarRoots?.find(sr => sr.root === dir)?.sidebar,
    records,
  })

  return results
}
