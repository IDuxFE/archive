/* eslint-disable import/order */
import type { App, Component } from 'vue'

import { createGlobalConfig } from '@idux/components/config'

import { IxIcon, IDUX_ICON_DEPENDENCIES, addIconDefinitions, Expand, Unexpand, Copy, Link } from '@idux/components/icon'
import { IxMessageProvider } from '@idux/components/message'
import { IxRadioGroup, IxRadio } from '@idux/components/radio'
import { IxTooltip } from '@idux/components/tooltip'
import { IxTab, IxTabs } from '@idux/components/tabs'


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

  installComponents(app, [
    IxIcon,
    IxMessageProvider,
    IxRadio,
    IxRadioGroup,
    IxTabs,
    IxTab,
    IxTooltip,
  ])
}

export default { install }
