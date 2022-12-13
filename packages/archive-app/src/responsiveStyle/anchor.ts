import type { BreakpointKey } from '@idux/cdk/breakpoint'

export function getAnchorResponsiveStyle(breakpoints: Record<BreakpointKey, string>) {
  return `@media ${breakpoints.xs} {.archive-app__page__content__anchor{ display: none; }}`
}