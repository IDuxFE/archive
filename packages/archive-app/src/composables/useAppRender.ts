/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ComputedRef, VNodeChild } from '@idux/archive-app/vue'
import type { AppRenderer, AppRendererDataBase } from '@idux/archive-types'
import type { Except } from 'type-fest'

type DataBase = Except<AppRendererDataBase, 'activeRecords'> & {
  activeRecords: ComputedRef<AppRendererDataBase['activeRecords']>
}

export interface ResolvedAppRender {
  <D extends Record<string, any>, EnsureNodes extends false>(
    data: D,
    customRenderer: AppRenderer<D, EnsureNodes> | undefined,
  ): VNodeChild
  <D extends Record<string, any>, EnsureNodes extends true>(
    data: D,
    customRenderer: AppRenderer<D, EnsureNodes> | undefined,
    defaultRenderer: () => VNodeChild,
  ): VNodeChild
}

export function useAppRender(dataBase: DataBase): ResolvedAppRender {
  return <D extends Record<string, any>, EnsureNodes extends boolean>(
    data: D,
    customRenderer: AppRenderer<D, EnsureNodes> | undefined,
    defaultRenderer?: () => VNodeChild,
  ) => {
    const defaultNodes = defaultRenderer?.()

    return customRenderer
      ? customRenderer(
          {
            theme: dataBase.theme,
            route: dataBase.route,
            breakpoints: dataBase.breakpoints,
            activeRecords: dataBase.activeRecords.value,
            ...(data ?? {}),
          },
          defaultNodes!,
        )
      : defaultNodes
  }
}
