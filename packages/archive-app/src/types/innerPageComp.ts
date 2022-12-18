/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AppSetupOptions } from './options'
import type { ResolvedPageData } from './page'
import type { AppRenderers } from './renderers'
import type { ResolvedAppThemeOptions } from './theme'
import type { PropType } from '@idux/archive-app/vue'
import type { ExtractInnerPropTypes } from '@idux/cdk/utils'

export const innerPageProps = {
  pageData: { type: Object as PropType<ResolvedPageData>, required: true },
  theme: { type: Object as PropType<ResolvedAppThemeOptions>, required: true },
  options: Object as PropType<AppSetupOptions>,
  renderers: Object as PropType<AppRenderers>,
} as const
export type InnerPageProps = ExtractInnerPropTypes<typeof innerPageProps>

export interface PageAnchorOptions {
  enabled: boolean
  maxLevel: number
}
