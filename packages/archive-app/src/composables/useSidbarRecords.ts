import type { AppMountOptions, ResolvedSidebarRecord } from '../types'
import { type ComputedRef, computed } from 'vue'
import { useRoute } from 'vue-router'

import { isArray } from 'lodash-es'
import { traverseTree } from '../utils'

export interface SidebarRecordsContext {
  sidebarRecords: ComputedRef<ResolvedSidebarRecord[]>
  activeRecords: ComputedRef<ResolvedSidebarRecord[]>
}

export function useSidbarRecords(
  sidebarRecords: AppMountOptions['sidebarRecords'],
  activeSidebar: ComputedRef<string | undefined>,
): SidebarRecordsContext {
  const route = useRoute()
  const pathRecordMap = new Map<string, ResolvedSidebarRecord>()
  const parentRecordMap = new Map<string, ResolvedSidebarRecord>()

  const traverseParents = (record: ResolvedSidebarRecord, fn: (parent: ResolvedSidebarRecord) => void) => {
    const parent = parentRecordMap.get(record.id)
    if (!parent) {
      return
    }

    fn(parent)
    traverseParents(parent, fn)
  }

  const processRecords = (records: ResolvedSidebarRecord[]) => {
    traverseTree(records, 'children', (record, parents) => {
      if (record.type === 'item') {
        pathRecordMap.set(record.path, record)
      }

      if (parents[0]) {
        parentRecordMap.set(record.id, parents[0])
      }
    })
  }

  if (isArray(sidebarRecords)) {
    processRecords(sidebarRecords)
  } else {
    Object.values(sidebarRecords).forEach(records => processRecords(records))
  }

  const _sidebarRecords = computed(() => {
    if (isArray(sidebarRecords)) {
      return sidebarRecords
    }

    return activeSidebar.value ? sidebarRecords[activeSidebar.value] : []
  })

  const activeRecords = computed(() => {
    const _activeRecords: ResolvedSidebarRecord[] = []
    const currentActiveRecord = pathRecordMap.get(route.path)

    if (currentActiveRecord) {
      _activeRecords.push(currentActiveRecord)
      traverseParents(currentActiveRecord, parent => _activeRecords.push(parent))
    }

    return _activeRecords
  })

  return {
    sidebarRecords: _sidebarRecords,
    activeRecords,
  }
}
