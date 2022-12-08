import type { PropType, VNode } from 'vue'
import type { Except, SetOptional } from 'type-fest'
import type { ResolvedDemo, LoadedSourceCode } from '@idux/archive-plugin'

export const demoToolProps = {
  tooltip: String,
  onClick: Function as PropType<() => void>,
}

export interface ToolRenderParams extends Except<ResolvedDemo, 'sourceCodes' | 'component'> {
  sourceCodes: LoadedSourceCode[]
}

export interface DemoToolBase {
  tooltip: string
  render: () => VNode
}

interface DemoToolExpandCode extends SetOptional<Except<DemoToolBase, 'render'>, 'tooltip'> {
  type: 'expandCode'
  render: (expanded: boolean) => VNode
}
interface DemoToolCopyCode extends SetOptional<DemoToolBase, 'tooltip' | 'render'> {
  type: 'copyCode'
}
interface DemoToolLink extends DemoToolBase {
  type: 'link'
  link: string
}

export type DemoTool = (DemoToolBase & { type: undefined }) | DemoToolExpandCode | DemoToolCopyCode | DemoToolLink