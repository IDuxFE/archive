import { ResolvedPageData, ResolvedThemeOptions, Renderers, AppSetupOptions } from './types'

export function resolvePageProps(
  pageData: ResolvedPageData,
  theme: ResolvedThemeOptions,
  renderers: Renderers | undefined,
  options: AppSetupOptions | undefined,
) {
  const {
    page: { headerAffix, enableAnchor, anchorMaxLevel },
  } = theme
  return {
    pageData: pageData,
    headerAffix,
    anchorOptions: enableAnchor ? { maxLevel: anchorMaxLevel } : false,
    options,
    renderers,
  }
}
