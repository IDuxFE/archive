/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AppThemeOptions, ResolvedAppThemeOptions } from './types'

import { isString } from 'lodash-es'

import defaultLogoImg from './assets/logo.svg'

const defaultBreakpoints = {
  xs: '(min-width: 0px) and (max-width: 1023.99px)',
  sm: '(min-width: 1024px) and (max-width: 1365.99px)',
  md: '(min-width: 1366px) and (max-width: 1720.99px)',
  lg: '(min-width: 1721px) and (max-width: 1920.99px)',
  xl: '(min-width: 1921px)',
}

export function resolveThemeOptions(options?: AppThemeOptions): ResolvedAppThemeOptions {
  return {
    logo: options?.logo ?? {
      image: defaultLogoImg,
      title: 'IDUX Archive',
      link: '/',
    },
    breakpoints: options?.breakpoints ?? defaultBreakpoints,
    layout: {
      theme: options?.layout?.theme ?? 'dark',
      type: options?.layout?.type ?? 'both',
      siderCollapsable: (() => {
        const siderCollapsable = options?.layout?.siderCollapsable
        if (isString(siderCollapsable)) {
          return siderCollapsable
        }

        if (siderCollapsable === false) {
          return false
        }

        return 'top'
      })(),
    },
    footer: options?.footer,
    page: {
      headerAffix: options?.page?.headerAffix ?? false,
      enableAnchor: options?.page?.enableAnchor ?? true,
      anchorMaxLevel: options?.page?.anchorMaxLevel ?? 3,
    },
  }
}
