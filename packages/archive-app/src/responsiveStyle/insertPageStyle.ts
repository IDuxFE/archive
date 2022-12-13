import type { BreakpointKey } from '@idux/cdk/breakpoint'

import { insertStyle } from './insertStyle'
import { getAnchorResponsiveStyle } from './anchor'

export function insertPageStyle(breakpoints: Record<BreakpointKey, string>) {
  insertStyle(getAnchorResponsiveStyle(breakpoints), 'page-responsive')
}