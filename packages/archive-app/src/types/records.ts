import type { Except } from 'type-fest'
import type { PageData, ResolvedPageData } from './page'

interface NavRecordBase {
  id: string
  name: string
}
interface ItemNavRecord extends NavRecordBase {
  type: 'item'
  pageData: PageData
}
interface SidebarNavRecord extends NavRecordBase {
  type: 'sidebar'
  sidebar: string
}
interface LinkNavRecord extends NavRecordBase {
  type: 'link'
  link: string
}
interface DropdownNavRecord extends NavRecordBase {
  type: 'dropdown'
  children: NavRecord[]
}

interface SidebarRecordBase {
  id: string
  name: string
}
interface LinkSidebarRecord extends SidebarRecordBase {
  type: 'link'
  link: string
}

// TODO: support custom
interface ItemSidebarRecord extends SidebarRecordBase {
  type: 'item'
  pageData: PageData
}
interface SubSidebarRecord extends SidebarRecordBase {
  type: 'sub'
  children: SidebarRecord[]
}
interface GroupSidebarRecord extends SidebarRecordBase {
  type: 'group'
  children: SidebarRecord[]
}

export type NavRecordType = 'item' | 'sidebar' | 'link' | 'dropdown'
export type SidebarRecordType = 'item' | 'group' | 'link' | 'sub'

interface ResolvedItemNavRecord extends Except<ItemNavRecord, 'pageData'> {
  path: string
  pageData: ResolvedPageData
}
interface ResolvedSidebarNavRecord extends SidebarNavRecord {
  path: string
  prefix: string
}
export type NavRecord = ItemNavRecord | SidebarNavRecord | LinkNavRecord | DropdownNavRecord
export type ResolvedNavRecord =
  | ResolvedItemNavRecord
  | ResolvedSidebarNavRecord
  | LinkNavRecord
  | DropdownNavRecord

interface ResolvedItemSidebarRecord extends Except<ItemSidebarRecord, 'pageData'> {
  path: string
  pageData: 
  ResolvedPageData
}
interface ResolvedGroupSidebarRecord extends Except<GroupSidebarRecord, 'children'> {
  children: ResolvedSidebarRecord[]
}
interface ResolvedSubSidebarRecord extends Except<SubSidebarRecord, 'children'> {
  children: ResolvedSidebarRecord[]
}
export type SidebarRecord = ItemSidebarRecord | LinkSidebarRecord | GroupSidebarRecord | SubSidebarRecord
export type ResolvedSidebarRecord =
  | ResolvedItemSidebarRecord
  | LinkSidebarRecord
  | ResolvedGroupSidebarRecord
  | ResolvedSubSidebarRecord