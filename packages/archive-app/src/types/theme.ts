/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { ProLayoutLogo, ProLayoutTheme, ProLayoutType } from '@idux/pro/layout'

export type SiderCollapsable = 'top' | 'bottom'

export interface AppThemeOptions {
  logo?: ProLayoutLogo
  breakpoints?: Record<BreakpointKey, string>
  layout?: {
    theme?: ProLayoutTheme
    type?: ProLayoutType
    siderCollapsable?: boolean | SiderCollapsable
  }
  footer?: string
  page?: {
    headerAffix?: boolean
    enableAnchor?: boolean
    anchorMaxLevel?: number
  }
}

export interface ResolvedAppThemeOptions {
  breakpoints: Record<BreakpointKey, string>
  logo: ProLayoutLogo
  layout: Omit<Exclude<Required<AppThemeOptions['layout']>, undefined>, 'collapsable'> & {
    siderCollapsable: SiderCollapsable | false
  }
  footer?: string
  page: Exclude<Required<AppThemeOptions['page']>, undefined>
}
