import type { PropType } from 'vue'
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
  icon: string
}

interface DemoToolExpandCode extends SetOptional<Except<DemoToolBase, 'icon'>, 'tooltip'> {
  type: 'expandCode'
  icon: [string, string]
}
interface DemoToolCopyCode extends SetOptional<DemoToolBase, 'tooltip' | 'icon'> {
  type: 'copyCode'
}
interface DemoToolLink extends DemoToolBase {
  type: 'link'
  link: string
}

export type DemoTool = (DemoToolBase & { type: undefined }) | DemoToolExpandCode | DemoToolCopyCode | DemoToolLink