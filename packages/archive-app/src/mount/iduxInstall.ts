/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { App } from 'vue'

import { createGlobalConfig } from '@idux/components/config'
import {
  Control,
  Copy,
  Expand,
  IDUX_ICON_DEPENDENCIES,
  InfoCircle,
  Link,
  Unexpand,
  Up,
  addIconDefinitions,
} from '@idux/components/icon'
import { createGlobalConfig as createProGlobalConfig } from '@idux/pro/config'

addIconDefinitions(IDUX_ICON_DEPENDENCIES)
addIconDefinitions([Expand, Unexpand, Copy, Link, Control, Up, InfoCircle])

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
