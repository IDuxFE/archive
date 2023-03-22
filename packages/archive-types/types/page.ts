/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedDemoItem } from './demo'
import type { ResolvedItem } from '@idux/archive-vite-plugin'
import type { Except, RequireExactlyOne } from 'type-fest'

interface BasePageData {
  title?: string
  description?: string
  src: string
  tabs: PageTab[]
  demos: string[]
}

interface BasePageTab {
  id: string
  name: string
  src: string
  demos: string[]
}

export type PageData = RequireExactlyOne<BasePageData, 'tabs' | 'demos' | 'src'>
export type PageTab = RequireExactlyOne<BasePageTab, 'src' | 'demos'>

export type ServerResolvedPageTab = RequireExactlyOne<
  Except<BasePageTab, 'src' | 'demos'> & {
    importScript: string | undefined
    demoImportScripts: string[]
  },
  'importScript' | 'demoImportScripts'
>

export type ServerResolvedPageData = RequireExactlyOne<
  Except<BasePageData, 'tabs' | 'src' | 'demos'> & {
    tabs: ServerResolvedPageTab[]
    demoImportScripts: string[]
    importScript: string | undefined
  },
  'tabs' | 'demoImportScripts' | 'importScript'
>

export type ResolvedPageTab = RequireExactlyOne<
  Except<BasePageTab, 'src' | 'demos'> & {
    import: () => Promise<{ default: ResolvedItem }>
    demoImports: (() => Promise<{ default: ResolvedDemoItem }>)[]
  },
  'import' | 'demoImports'
>

export type ResolvedPageData = RequireExactlyOne<
  Except<BasePageData, 'tabs' | 'src' | 'demos'> & {
    tabs: ResolvedPageTab[]
    import: () => Promise<{ default: ResolvedItem }>
    demoImports: (() => Promise<{ default: ResolvedDemoItem }>)[]
  },
  'tabs' | 'import' | 'demoImports'
>

export interface AnchorData {
  level: number
  title: string
  href: string
  children: AnchorData[]
}
