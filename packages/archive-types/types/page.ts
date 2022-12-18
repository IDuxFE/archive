/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { Except, RequireExactlyOne } from 'type-fest'

interface BasePageData {
  title?: string
  description?: string
  src: string
  tabs: PageTab[]
  demoIds: string[]
}

interface BasePageTab {
  id: string
  name: string
  src: string
  demoIds: string[]
}

export type PageData = RequireExactlyOne<BasePageData, 'tabs' | 'demoIds' | 'src'>
export type PageTab = RequireExactlyOne<BasePageTab, 'src' | 'demoIds'>

export type ServerResolvedPageTab = RequireExactlyOne<
  Except<BasePageTab, 'src'> & {
    component: string | undefined
  },
  'demoIds' | 'component'
>

export type ServerResolvedPageData = RequireExactlyOne<
  Except<BasePageData, 'tabs' | 'src'> & {
    tabs: ServerResolvedPageTab[]
    component: string | undefined
  },
  'tabs' | 'demoIds' | 'component'
>

export type ResolvedPageTab = RequireExactlyOne<
  Except<BasePageTab, 'src'> & {
    component: () => Promise<{ default: PageContentInstance }>
  },
  'demoIds' | 'component'
>

export type ResolvedPageData = RequireExactlyOne<
  Except<BasePageData, 'tabs' | 'src'> & {
    tabs: ResolvedPageTab[]
    component: () => Promise<{ default: PageContentInstance }>
  },
  'tabs' | 'demoIds' | 'component'
>

export interface AnchorData {
  level: number
  title: string
  href: string
  children: AnchorData[]
}

export interface PageContentInstance {
  mount: (el: HTMLElement) => void
  unmount: () => void
}
