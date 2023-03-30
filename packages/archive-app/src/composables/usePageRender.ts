/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PageRenderer, PageRendererDataBase } from '@idux/archive-types'
import type { Except } from 'type-fest'
import type { ComputedRef, VNode, VNodeChild } from 'vue'

type DataBase = Except<PageRendererDataBase, 'activeRecords'> & {
  activeRecords: ComputedRef<Exclude<PageRendererDataBase['activeRecords'], undefined>> | undefined
}

export interface ResolvedPageRender {
  <D extends Record<string, any>, EnsureNodes extends false>(
    data: D,
    customRenderer: PageRenderer<D, EnsureNodes> | undefined,
  ): VNodeChild
  <D extends Record<string, any>, EnsureNodes extends true>(
    data: D,
    customRenderer: PageRenderer<D, EnsureNodes> | undefined,
    defaultRenderer: () => VNode[],
  ): VNodeChild
}

export function usePageRender(dataBase: DataBase): ResolvedPageRender {
  return <D extends Record<string, any>, EnsureNodes extends boolean>(
    data: D,
    customRenderer: PageRenderer<D, EnsureNodes> | undefined,
    defaultRenderer?: () => VNode[],
  ) => {
    const defaultNodes = defaultRenderer?.()

    return customRenderer
      ? customRenderer(
          {
            theme: dataBase.theme,
            route: dataBase.route,
            breakpoints: dataBase.breakpoints,
            activeRecords: dataBase.activeRecords?.value,
            ...(data ?? {}),
          },
          defaultNodes!,
        )
      : defaultNodes
  }
}
