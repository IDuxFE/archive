<template>
  <IxMenu class="archive-app__sidebar" :dataSource="menus" mode="inline" :indent="breakpoints.xs ? 24 : 48" :selectedKeys="selectedKeys">
    <template #itemLabel="item">
      <router-link v-if="item.recordType === 'item'" :to="item.path">
        <span>{{ item.name }}</span>
      </router-link>
      <a v-else-if="item.recordType === 'link'" target="_blank" :href="item.path">
        <span>{{ item.name }}</span>
      </a>
      <span v-else>{{ item.name }}</span>
    </template>
  </IxMenu>
</template>

<script setup lang="ts">
import type { SidebarRecordType } from '../../types'
import type { MenuData } from '@idux/components/menu'
import { computed, inject } from 'vue'
import { appContextToken } from '../../token'

import { mapTree } from '../../utils'

const {
  breakpoints,
  sidebarContext: { sidebarRecords, activeRecords },
} = inject(appContextToken)!
const selectedKeys = computed(() => activeRecords.value.map(r => r.id))

const getMenuDataType = (type: SidebarRecordType): MenuData['type'] => {
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
const menus = computed(() => {
  return mapTree(sidebarRecords.value, 'children', record => {
    const menu = {
      ...record,
      key: record.id,
      type: getMenuDataType(record.type),
      label: record.name,
      recordType: record.type,
    }

    return menu as MenuData
  })
})
</script>
