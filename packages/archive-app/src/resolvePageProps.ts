/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import {
  AppRenderers,
  AppSetupOptions,
  InnerPageProps,
  ResolvedAppThemeOptions,
  ResolvedPageData,
} from '@idux/archive-types'

export function resolvePageProps(
  pageData: ResolvedPageData,
  theme: ResolvedAppThemeOptions,
  renderers: AppRenderers | undefined,
  options: AppSetupOptions | undefined,
): InnerPageProps {
  return {
    pageData: pageData,
    theme,
    options,
    renderers,
  }
}
