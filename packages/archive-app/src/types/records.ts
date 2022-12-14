/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { PageData, ResolvedPageData, ServerResolvedPageData } from './page'
import type { MenuItemGroupProps, MenuItemProps, MenuSubProps } from '@idux/components/menu'
import type { Except } from 'type-fest'

interface NavRecordBase {
  id: string
  name: string
}
interface LinkNavRecord extends NavRecordBase {
  type: 'link'
  link: string
}

// TODO: support custom
interface ItemNavRecord extends NavRecordBase {
  type: 'item'
  pageData: PageData
}
interface SubNavRecord extends NavRecordBase {
  type: 'sub'
  children: NavRecord[]
}
interface GroupNavRecord extends NavRecordBase {
  type: 'group'
  children: NavRecord[]
}

export type NavRecordType = 'item' | 'group' | 'link' | 'sub'

interface ResolvedItemNavRecord extends Except<ItemNavRecord, 'pageData'> {
  path: string
  pageData: ResolvedPageData
}
interface ResolvedGroupNavRecord extends Except<GroupNavRecord, 'children'> {
  children: ResolvedNavRecord[]
}
interface ResolvedSubNavRecord extends Except<SubNavRecord, 'children'> {
  path: string
  children: ResolvedNavRecord[]
}

interface ServerResolvedItemNavRecord extends Except<ItemNavRecord, 'pageData'> {
  path: string
  pageData: ServerResolvedPageData
}
interface ServerResolvedGroupNavRecord extends Except<GroupNavRecord, 'children'> {
  children: ServerResolvedItemNavRecord[]
}
interface ServerResolvedSubNavRecord extends Except<SubNavRecord, 'children'> {
  path: string
  children: ServerResolvedItemNavRecord[]
}

export type NavRecord = ItemNavRecord | LinkNavRecord | GroupNavRecord | SubNavRecord
export type ServerResolvedNavRecord =
  | ServerResolvedItemNavRecord
  | LinkNavRecord
  | ServerResolvedGroupNavRecord
  | ServerResolvedSubNavRecord
export type ResolvedNavRecord = ResolvedItemNavRecord | LinkNavRecord | ResolvedGroupNavRecord | ResolvedSubNavRecord

export type ResolvedMenuData =
  | (Except<ResolvedItemNavRecord, 'type'> & MenuItemProps & { recordType: 'item' })
  | (Except<LinkNavRecord, 'type'> & MenuItemProps & { recordType: 'link' })
  | (Except<ResolvedGroupNavRecord, 'type'> & MenuItemGroupProps & { recordType: 'group' })
  | (Except<ResolvedSubNavRecord, 'type'> & MenuSubProps & { recordType: 'sub' })
