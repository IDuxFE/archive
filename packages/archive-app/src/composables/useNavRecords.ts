/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { NavRecordType, ResolvedMenuData, ResolvedNavRecord } from '../types'

import { type ComputedRef, computed } from 'vue'

import { type RouteLocationNormalizedLoaded } from 'vue-router'

import { mapTree } from '@idux/archive-utils/client'

export interface NavRecordsContext {
  activeRecords: ComputedRef<ResolvedNavRecord[]>
  menuData: ResolvedMenuData[]
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
        key: record.id,
        type: getMenuDataType(record.type),
        label: record.name,
        recordType: record.type,
      }

      return menu as ResolvedMenuData
    })

  const menuData = processRecords(navRecords)
  const activeRecords = computed(() => {
    const _activeRecords: ResolvedNavRecord[] = []
    const currentActiveRecord = pathRecordMap.get(route.path)

    if (currentActiveRecord) {
      _activeRecords.push(currentActiveRecord)
      traverseParents(currentActiveRecord, parent => _activeRecords.push(parent))
    }

    return _activeRecords
  })

  return {
    menuData,
    activeRecords,
  }
}
