import type { ProLayoutTheme, ProLayoutType, ProLayoutLogo } from '@idux/pro/layout'
import type { BreakpointKey } from '@idux/cdk/breakpoint'

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
