import type { AppMountOptions, ResolvedNavRecord } from '../types'
import { type ComputedRef, computed } from 'vue'
import { useRoute } from 'vue-router'

import { traverseTree } from '../utils'

export interface NavRecordsContext {
  records: ResolvedNavRecord[] | undefined
  activeSidebar: ComputedRef<string | undefined>
  activeSidebarNavRecord: ComputedRef<ResolvedNavRecord | undefined>
  activeRecords: ComputedRef<ResolvedNavRecord[]>
}

export function useNavRecords(navRecords: AppMountOptions['navRecords']): NavRecordsContext {
  const route = useRoute()
  const pathRecordMap = new Map<string, ResolvedNavRecord>()
  const parentRecordMap = new Map<string, ResolvedNavRecord>()
  const sidebarPrefixMap = new Map<string, ResolvedNavRecord & { type: 'sidebar' }>()

  const traverseParents = (record: ResolvedNavRecord, fn: (parent: ResolvedNavRecord) => void) => {
    const parent = parentRecordMap.get(record.id)
    if (!parent) {
      return
    }

    fn(parent)
    traverseParents(parent, fn)
  }

  const processRecords = (records: ResolvedNavRecord[]) => {
    traverseTree(records, 'children', (record, parents) => {
      if (record.type === 'item') {
        pathRecordMap.set(record.path, record)
      } else if (record.type === 'sidebar') {
        sidebarPrefixMap.set(record.prefix, record)
      }

      if (parents[0]) {
        parentRecordMap.set(record.id, parents[0])
      }
    })
  }

  if (navRecords) {
    processRecords(navRecords)
  }

  const activeSidebarNavRecord = computed(() => {
    const prefix = [...sidebarPrefixMap.keys()].find(p => route.path.startsWith(p))

    return prefix ? sidebarPrefixMap.get(prefix) : undefined
  })
  const activeSidebar = computed(() => activeSidebarNavRecord.value?.sidebar)

  const activeRecords = computed(() => {
    const _activeRecords: ResolvedNavRecord[] = []
    const currentActiveRecord = pathRecordMap.get(route.path) ?? activeSidebarNavRecord.value

    if (currentActiveRecord) {
      _activeRecords.push(currentActiveRecord)
      traverseParents(currentActiveRecord, parent => _activeRecords.push(parent))
    }

    return _activeRecords
  })

  return {
    records: navRecords,
    activeSidebar,
    activeSidebarNavRecord,
    activeRecords,
  }
}
