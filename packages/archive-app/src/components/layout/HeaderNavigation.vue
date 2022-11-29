<template>
  <IxMenu :data-source="menus" :selected-keys="selectedKeys">
    <template #itemLabel="item">
      <router-link v-if="item.recordType === 'item'" :to="item.path">
        <span>{{ item.label }}</span>
      </router-link>
      <a v-else-if="item.recordType === 'link'" target="_blank" :href="item.path">
        <span>{{ item.label }}</span>
      </a>
      <span v-else>{{ item.label }}</span>
    </template>
  </IxMenu>
</template>

<script lang="ts">
import type { NavRecordType } from '../../types'
import type { MenuData } from '@idux/components/menu'
import { computed, defineComponent, inject } from 'vue'

import { appContextToken } from '../../token'
import { mapTree } from '../../utils'

const getMenuDataType = (type: NavRecordType): MenuData['type'] => {
  switch (type) {
    case 'dropdown':
      return 'itemGroup'
    case 'sidebar':
    case 'item':
    case 'link':
    default:
      return 'item'
  }
}

export default defineComponent({
  setup() {
    const {
      navContext: { records, activeRecords },
    } = inject(appContextToken)!
    const selectedKeys = computed(() => activeRecords.value.map(r => r.id))

    const menus = computed(() => {
      return mapTree(records ?? [], 'children', record => {
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

    return { menus, selectedKeys }
  },
})
</script>
