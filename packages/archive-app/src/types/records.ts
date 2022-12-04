import type { Except } from 'type-fest'
import type { PageData, ResolvedPageData } from './page'
import type { MenuItemProps, MenuSubProps, MenuItemGroupProps } from '@idux/components/menu'

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
export type NavRecord = ItemNavRecord | LinkNavRecord | GroupNavRecord | SubNavRecord
export type ResolvedNavRecord = ResolvedItemNavRecord | LinkNavRecord | ResolvedGroupNavRecord | ResolvedSubNavRecord

export type ResolvedMenuData =
  | (Except<ResolvedItemNavRecord, 'type'> & MenuItemProps & { recordType: 'item' })
  | (Except<LinkNavRecord, 'type'> & MenuItemProps & { recordType: 'link' })
  | (Except<ResolvedGroupNavRecord, 'type'> & MenuItemGroupProps & { recordType: 'group' })
  | (Except<ResolvedSubNavRecord, 'type'> & MenuSubProps & { recordType: 'sub' })
