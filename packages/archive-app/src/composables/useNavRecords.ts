/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { NavRecordType, ResolvedMenuData, ResolvedNavRecord } from '@idux/archive-types'

import { type ComputedRef, computed } from 'vue'

import { mapTree } from '@idux/archive-utils/client'
import { type RouteLocationNormalizedLoaded } from 'vue-router'

export interface NavRecordsContext {
  activeRecords: ComputedRef<ResolvedNavRecord[]>
  menuData: ResolvedMenuData[]
  getRecordNavKey: (record: ResolvedNavRecord) => string
}

export function useNavRecords(
  navRecords: ResolvedNavRecord[],
  route: RouteLocationNormalizedLoaded,
): NavRecordsContext {
  const pathRecordMap = new Map<string, ResolvedNavRecord>()
  const parentRecordMap = new Map<string, ResolvedNavRecord>()

  const traverseParents = (record: ResolvedNavRecord, fn: (parent: ResolvedNavRecord) => void) => {
    const parent = parentRecordMap.get(record.id)
    if (!parent) {
      return
    }

    fn(parent)
    traverseParents(parent, fn)
  }

  const recordNavKeyMap = new Map<ResolvedNavRecord, string>()
  const getRecordNavKey = (record: ResolvedNavRecord): string => {
    if (!record) {
      return ''
    }

    if (recordNavKeyMap.has(record)) {
      return recordNavKeyMap.get(record)!
    }

    let key = record.id

    traverseParents(record, parent => {
      key += `-${parent.id}`
    })

    recordNavKeyMap.set(record, key)
    return key
  }

  const getMenuDataType = (type: NavRecordType): ResolvedMenuData['type'] => {
    switch (type) {
      case 'item':
      case 'sub':
        return type

      case 'group':
        return 'itemGroup'
      case 'link':
      default:
        return 'item'
    }
  }
  const processRecords = (records: ResolvedNavRecord[]) =>
    mapTree(records, 'children', (record, parents) => {
      if (record.type === 'item') {
        pathRecordMap.set(record.path, record)
      }

      if (parents[0]) {
        parentRecordMap.set(record.id, parents[0])
      }

      const menu = {
        ...record,
        key: getRecordNavKey(record),
        type: getMenuDataType(record.type),
        label: record.name,
        recordType: record.type,
      }

      return menu as ResolvedMenuData
    })

  const menuData = processRecords(navRecords)
  const activeRecords = computed(() => {
    const _activeRecords: ResolvedNavRecord[] = []
    const currentActiveRecord = pathRecordMap.get(route.path.replace(/\/$/, ''))

    if (currentActiveRecord) {
      _activeRecords.push(currentActiveRecord)
      traverseParents(currentActiveRecord, parent => _activeRecords.push(parent))
    }

    return _activeRecords
  })

  return {
    menuData,
    activeRecords,
    getRecordNavKey,
  }
}
