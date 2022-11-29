/* eslint-disable import/order */
import type { App, Component } from 'vue'

import { createGlobalConfig } from '@idux/components/config'
import { vClickOutside } from '@idux/cdk/click-outside'

import { IxAffix } from '@idux/components/affix'
import { IxButton, IxButtonGroup } from '@idux/components/button'
import { IxCol, IxRow } from '@idux/components/grid'
import { IxDrawer } from '@idux/components/drawer'
import { IxDropdown } from '@idux/components/dropdown'
import { IxIcon, IDUX_ICON_DEPENDENCIES, addIconDefinitions, Expand, Unexpand, Copy, Link } from '@idux/components/icon'
import { IxMenu, IxMenuItem, IxMenuItemGroup, IxMenuSub } from '@idux/components/menu'
import { IxMessageProvider } from '@idux/components/message'
import { IxRadioGroup, IxRadio } from '@idux/components/radio'
import { IxTab, IxTabs } from '@idux/components/tabs'
import { IxTooltip } from '@idux/components/tooltip'


// 静态加载: `IDUX_ICON_DEPENDENCIES` 是 `@idux` 的部分组件默认所使用到图标，建议在此时静态引入。
addIconDefinitions(IDUX_ICON_DEPENDENCIES)
addIconDefinitions([Expand, Unexpand, Copy, Link])

const globalConfig = createGlobalConfig({
  common: {
    prefixCls: 'archive-app'
  }
})

const installComponents = (app: App, components: Component[]) => {
  components.forEach(comp => {
    app.component((comp.name ?? (comp as any).displayName)!, comp)
  })
}

const install = (app: App): void => {
  app.use(globalConfig)
  app.directive('clickOutside', vClickOutside)

  installComponents(app, [
    IxAffix,
    IxButton,
    IxButtonGroup,
    IxCol,
    IxRow,
    IxDrawer,
    IxDropdown,
    IxIcon,
    IxMenu,
    IxMenuItem,
    IxMenuItemGroup,
    IxMenuSub,
    IxMessageProvider,
    IxRadio,
    IxRadioGroup,
    IxTabs,
    IxTab,
    IxTooltip,
  ])
}

export default { install }
