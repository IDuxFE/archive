import { ResolvedPageData, ResolvedAppThemeOptions, AppRenderers, AppSetupOptions } from './types'

export function resolvePageProps(
  pageData: ResolvedPageData,
  theme: ResolvedAppThemeOptions,
  renderers: AppRenderers | undefined,
  options: AppSetupOptions | undefined,
) {
  return {
    pageData: pageData,
    theme,
    options,
    renderers,
  }
}
