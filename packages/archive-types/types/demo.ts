/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { Control, InstancePropTypes, ResolvedItem } from '@idux/archive-vite-plugin'

export type DemoControl = Control &
  Omit<Exclude<ResolvedItem['controls'], undefined>[number], 'key'> & { key: string; propType: InstancePropTypes }

export interface SourceCode {
  filename: string
  code: string
  parsedCode: string
}

export interface ResolvedDemoItem<D extends object = object> extends ResolvedItem<D> {
  title: string
  description: string
  sourceCodes?: SourceCode[]
}
