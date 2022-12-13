import type { BreakpointKey } from '@idux/cdk/breakpoint'

const paddingDirections = ['top', 'bottom', 'left', 'right']

export function genContentResponsiveStyle(breakpoints: Record<BreakpointKey, string>) {
  return Object.entries(breakpoints)
    .map(([breakpointKey, query]) => {
      const paddingVarPrefix = '--archive-app-content-padding'
      const contentStyle = `.archive-app__main-content{${paddingDirections
        .map(direction => getPaddingStyle(paddingVarPrefix, direction, breakpointKey))
        .join('')}}`

      const pageHeaderFixedTyle = `.archive-app__main-content .archive-app__page__header--fixed{${[
        `margin-left: calc(0px - ${getPaddingVar(paddingVarPrefix, 'left', breakpointKey)});`,
        `padding-left: ${getPaddingVar(paddingVarPrefix, 'left', breakpointKey)};`,
        `width: calc(100% + ${getPaddingVar(paddingVarPrefix, 'left', breakpointKey)} + ${getPaddingVar(
          paddingVarPrefix,
          'right',
          breakpointKey,
        )})`,
      ].join('')}}`

      return `@media ${query} {${contentStyle + pageHeaderFixedTyle}}`
    })
    .join('')
}

function getPaddingVar(prefix: string, direction: string, breakpointKey: string) {
  return `var(${prefix}-${direction}-${breakpointKey})`
}

function getPaddingStyle(prefix: string, direction: string, breakpointKey: string) {
  return `padding-${direction}: ${getPaddingVar(prefix, direction, breakpointKey)};`
}
