import type { BreakpointKey } from '@idux/cdk/breakpoint'

import { insertStyle } from './insertStyle'
import { genContentResponsiveStyle } from './content'

export function insertAppStyle(breakpoints: Record<BreakpointKey, string>) {
  insertStyle(genContentResponsiveStyle(breakpoints), 'app-responsive')
}