import { ResolvedPageData, ResolvedThemeOptions } from './types'

export function resolvePageProps(pageData: ResolvedPageData, theme: ResolvedThemeOptions) {
  const {
    page: { headerAffix, enableAnchor, anchorMaxLevel },
  } = theme
  return { pageData: pageData, headerAffix, anchorOptions: enableAnchor ? { maxLevel: anchorMaxLevel } : false }
}
