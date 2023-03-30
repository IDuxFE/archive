/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedItem } from '@idux/archive-vite-plugin'

export interface SourceCode {
  filename: string
  code: string
  parsedCode: string
}

export interface ResolvedDemoItem extends ResolvedItem {
  title: string
  description: string
  sourceCodes?: SourceCode[]
}
