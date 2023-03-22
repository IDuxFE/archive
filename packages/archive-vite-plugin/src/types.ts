/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Except, SetOptional } from 'type-fest'

export interface Options {
  root?: string
  loaders?: Loader[]
}

export type QueryObj = Record<string, string | true>

export interface Loader<V = object> {
  name: string
  matched: (path: string) => boolean
  prefix?: string
  resolve?: (absolutePath: string, query: QueryObj) => Promise<Pick<LoadedItem, 'instanceScript' | 'prependScript'> & V>
  transform?: (code: string) => Promise<string> | string
}

export type ResolvedLoader<V = object> = SetOptional<Required<Loader<V>>, 'transform'>

export type ResolvedOptions = Except<Required<Options>, 'loaders'> & {
  loaders: ResolvedLoader[]
}

export interface LoadedItem {
  id: string
  filename: string
  relativePath: string
  absolutePath: string
  query: QueryObj
  loader: ResolvedLoader
  prependScript?: string
  instanceScript: string
}

export interface ResolvedItem<V = Instance>
  extends Except<LoadedItem, 'prependScript' | 'instanceScript' | 'loader' | 'absolutePath'> {
  instance: V
}

export interface Storage {
  get: (absolutePath: string) => LoadedItem | undefined
  getAll: () => LoadedItem[]
  exists: (absolutePath: string) => boolean
  set: (absolutePath: string, query: QueryObj, loader: ResolvedLoader) => Promise<LoadedItem>
  remove: (absolutePath: string) => void

  onListChange: (callback: () => void) => void
  onItemChange: (callback: (item: LoadedItem) => void) => void
  notifyListChange: () => void
  notifyItemChange: (item: LoadedItem) => void
}

export interface Instance {
  mount: (el: HTMLElement) => Promise<void>
  unmount: () => Promise<void>
}
