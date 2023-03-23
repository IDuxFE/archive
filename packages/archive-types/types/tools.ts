/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedDemoItem } from './demo'
import type { Except, SetOptional } from 'type-fest'
import type { PropType, VNode } from 'vue'

export const demoToolProps = {
  tooltip: String,
  onClick: Function as PropType<() => void>,
}

export type ToolRenderParams = Except<ResolvedDemoItem, 'instance'>

export interface DemoToolBase {
  tooltip: string
  render: () => VNode
}

interface DemoToolExpandCode extends SetOptional<Except<DemoToolBase, 'render'>, 'tooltip'> {
  type: 'expandCode'
  render: (expanded: boolean) => VNode
}
interface DemoToolExpandControls extends SetOptional<Except<DemoToolBase, 'render'>, 'tooltip'> {
  type: 'expandControls'
  render: (expanded: boolean) => VNode
}
interface DemoToolCopyCode extends SetOptional<DemoToolBase, 'tooltip' | 'render'> {
  type: 'copyCode'
}
interface DemoToolLink extends DemoToolBase {
  type: 'link'
  link: string
}

export type DemoTool =
  | (DemoToolBase & { type: undefined })
  | DemoToolExpandCode
  | DemoToolCopyCode
  | DemoToolLink
  | DemoToolExpandControls
