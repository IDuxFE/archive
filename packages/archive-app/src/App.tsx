/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedMenuData } from '@idux/archive-types'
import type { MenuProps } from '@idux/components/menu'

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { IxLayoutSiderTrigger } from '@idux/components/layout'
import { IxProLayout } from '@idux/pro/layout'
import { RouterLink, RouterView } from 'vue-router'

import { appContextToken, breakpointsToken } from './token'

export default defineComponent(() => {
  const { menuData, theme, render, renderers, activeRecords, getRecordNavKey } = inject(appContextToken)!
  const breakpoints = inject(breakpointsToken)!

  const activeKey = computed(() => getRecordNavKey(activeRecords.value[0]))
  const rootWrapperCls = computed(() => {
    const prefixCls = 'archive-app__root-wrapper'

    return normalizeClass({
      [prefixCls]: true,
      [`${prefixCls}-xs`]: breakpoints.xs,
      [`${prefixCls}-sm`]: breakpoints.sm,
      [`${prefixCls}-md`]: breakpoints.md,
      [`${prefixCls}-lg`]: breakpoints.lg,
      [`${prefixCls}-xl`]: breakpoints.xl,
    })
  })

  const layoutType = computed(() => {
    if (breakpoints.sm || breakpoints.xs) {
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

  const renderLogo = renderers.logo ? () => render(theme.logo, renderers.logo) : undefined

  const renderHeaderContent = renderers.layoutHeaderContent
    ? (menuProps: MenuProps) => render(menuProps, renderers.layoutHeaderContent)
    : undefined
  const renderHeaderExtra = renderers.layoutHeaderExtra ? () => render({}, renderers.layoutHeaderExtra) : undefined

  const renderSiderHeaderLabel = () =>
    render({}, renderers.layoutSiderHeaderLabel, () => (
      <span class="archive-app__sider-header-label">
        {activeRecords.value[activeRecords.value.length - 1]?.name ?? ''}
      </span>
    ))
  const renderSiderHeader = () =>
    render({}, renderers.layoutSiderHeader, () => {
      const label = renderSiderHeaderLabel()
      return theme.layout.siderCollapsable === 'top' ? <IxLayoutSiderTrigger>{label}</IxLayoutSiderTrigger> : label
    })
  const renderSiderContent = renderers.layoutSiderContent
    ? (menuProps: MenuProps) => render(menuProps, renderers.layoutSiderContent)
    : undefined

  const renderSiderFooterLabel = () => render({}, renderers.layoutSiderFooterLabel)
  const renderSiderFooter =
    theme.layout.siderCollapsable === 'bottom' || renderers.layoutSiderFooter
      ? () =>
          render({}, renderers.layoutSiderFooter, () => {
            const label = renderSiderFooterLabel()
            return theme.layout.siderCollapsable === 'bottom' ? (
              <IxLayoutSiderTrigger>{label}</IxLayoutSiderTrigger>
            ) : (
              label
            )
          })
      : undefined

  const proLayoutSlots = {
    itemLabel: renderItemLabel,
    logo: renderLogo,
    headerContent: renderHeaderContent,
    headerExtra: renderHeaderExtra,
    siderHeader: renderSiderHeader,
    siderContent: renderSiderContent,
    siderFooter: renderSiderFooter,
  }

  return () => (
    <IxProLayout
      class={rootWrapperCls.value}
      activeKey={activeKey.value}
      menus={menuData}
      type={layoutType.value}
      logo={theme.logo}
      v-slots={proLayoutSlots}
    >
      <div class="archive-app__main-content">
        <RouterView />
      </div>
    </IxProLayout>
  )
})
