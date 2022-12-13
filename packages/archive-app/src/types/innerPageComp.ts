import type { PropType } from 'vue'
import type { ResolvedPageData } from './page'
import type { ResolvedAppThemeOptions } from './theme'
import type { AppSetupOptions } from './options'
import type { AppRenderers } from './renderers'

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
