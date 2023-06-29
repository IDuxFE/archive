/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AppMountOptions, ResolvedAppThemeOptions } from '@idux/archive-types'

import { isString } from 'lodash-es'

// @ts-ignore
import defaultLogoImg from './assets/logo.svg'

const defaultBreakpoints = {
  xs: '(min-width: 0px) and (max-width: 1023.99px)',
  sm: '(min-width: 1024px) and (max-width: 1365.99px)',
  md: '(min-width: 1366px) and (max-width: 1720.99px)',
  lg: '(min-width: 1721px) and (max-width: 1920.99px)',
  xl: '(min-width: 1921px)',
}

export function resolveThemeOptions(options?: AppMountOptions): ResolvedAppThemeOptions {
  const { theme, baseUrl } = options ?? {}
  return {
    logo: theme?.logo ?? {
      image: defaultLogoImg,
      title: 'IDUX Archive',
      link: baseUrl ?? '/',
    },
    breakpoints: theme?.breakpoints ?? defaultBreakpoints,
    layout: {
      theme: theme?.layout?.theme ?? 'dark',
      type: theme?.layout?.type ?? 'both',
      siderCollapsable: (() => {
        const siderCollapsable = theme?.layout?.siderCollapsable
        if (isString(siderCollapsable)) {
          return siderCollapsable
        }

        if (siderCollapsable === false) {
          return false
        }

        return 'top'
      })(),
    },
    footer: theme?.footer,
    page: {
      headerAffix: theme?.page?.headerAffix ?? false,
      enableAnchor: theme?.page?.enableAnchor ?? true,
      anchorMaxLevel: theme?.page?.anchorMaxLevel ?? 3,
    },
  }
}
