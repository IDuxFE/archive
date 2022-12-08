import type { ThemeOptions, ResolvedThemeOptions } from './types'

export function resolveThemeOptions(options?: ThemeOptions): ResolvedThemeOptions {
  return {
    layout: {
      theme: options?.layout?.theme ?? 'dark',
      type: options?.layout?.type ?? 'both',
    },
    page: {
      headerAffix: options?.page?.headerAffix ?? false,
      enableAnchor: options?.page?.enableAnchor ?? true,
      anchorMaxLevel: options?.page?.anchorMaxLevel ?? 3
    },
  }
}