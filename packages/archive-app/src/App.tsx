import type { ResolvedMenuData } from './types'
import { computed, defineComponent, inject } from 'vue'
import { appContextToken } from './token'

import { RouterLink, RouterView } from 'vue-router'
import { IxLayoutSiderTrigger } from '@idux/components/layout'
import { IxProLayout } from '@idux/pro/layout'

export default defineComponent(() => {
  const { route, breakpoints, menuData, theme } = inject(appContextToken)!

  const layoutType = computed(() => {
    if (breakpoints.xs) {
      return 'header'
    }

    return theme.layout.type
  })

  const renderItemLabel = (item: ResolvedMenuData) => {
    if (item.recordType === 'item' || item.recordType === 'sub') {
      return (
        <RouterLink to={item.path}>
          <span>{item.name}</span>
        </RouterLink>
      )
    }

    if (item.recordType === 'link') {
      return (
        <a target="_blank" href={item.link}>
          <span>{item.name}</span>
        </a>
      )
    }

    return <span>{item.name}</span>
  }

  const proLayoutSlots = {
    itemLabel: renderItemLabel,
    siderHeader: () => <IxLayoutSiderTrigger></IxLayoutSiderTrigger>
  }

  return () => (
    <IxProLayout
      class="archive-app__root-wrapper"
      activeKey={route.path}
      menus={menuData}
      type={layoutType.value}
      v-slots={proLayoutSlots}
    >
      <div class="archive-app__main-content">
        <RouterView />
      </div>
    </IxProLayout>
  )
})
