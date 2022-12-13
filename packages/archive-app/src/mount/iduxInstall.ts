import type { App } from 'vue'

import { createGlobalConfig } from '@idux/components/config'
import { createGlobalConfig as createProGlobalConfig } from '@idux/pro/config'

import { IDUX_ICON_DEPENDENCIES, addIconDefinitions, Expand, Unexpand, Copy, Link } from '@idux/components/icon'

addIconDefinitions(IDUX_ICON_DEPENDENCIES)
addIconDefinitions([Expand, Unexpand, Copy, Link])

const globalConfig = createGlobalConfig({
  common: {
    prefixCls: 'archive-app',
  },
})
const proGlobalConfig = createProGlobalConfig({
  common: {
    prefixCls: 'archive-app-pro',
  },
})

const install = (app: App): void => {
  app.use(globalConfig).use(proGlobalConfig)
}

export default { install }
