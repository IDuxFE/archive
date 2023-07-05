/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Except, SetOptional, SetRequired } from 'type-fest'

export interface Options {
  root?: string
  loaders?: Loader[]
}

export type QueryObj = Record<string, string | true>

export type InstancePropTypes = 'string' | 'number' | 'boolean' | 'array' | 'object'
export type InstacePropType<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends Array<any>
  ? 'array'
  : T extends object
  ? 'object'
  : never
export interface IInstanceProp<D extends Record<string, any>, K extends keyof D> {
  key: K
  type: InstacePropType<D[K]>
  default?: D[K]
}
export type InstanceProp<D extends Record<string, any> = Record<string, any>> = {
  [key in keyof D]: IInstanceProp<D, key>
}[keyof D]

export interface ControlBase {
  label?: string
  description?: string
}
export interface InputControl extends ControlBase {
  type: 'input'
}
export interface SelectControl extends ControlBase {
  type: 'select'
  options: { label: string; value: string | number | boolean }[]
}
export interface RadioControl extends ControlBase {
  type: 'radio'
  options: { label: string; value: string | number | boolean }[]
}
export interface CheckboxControl extends ControlBase {
  type: 'checkbox'
  options: { label: string; value: string | number | boolean }[]
}
export interface TextareaControl extends ControlBase {
  type: 'textarea'
}
export interface NumberControl extends ControlBase {
  type: 'number'
}
export interface JsonControl extends ControlBase {
  type: 'json'
}
export interface BoolControl extends ControlBase {
  type: 'boolean'
}
export type Control =
  | InputControl
  | SelectControl
  | RadioControl
  | CheckboxControl
  | TextareaControl
  | NumberControl
  | JsonControl
  | BoolControl
export type ControlType = Control['type']

export interface Loader<V = object> {
  name: string
  matched: (path: string) => boolean
  prefix?: string
  resolve?: (
    absolutePath: string,
    query: QueryObj,
  ) => Promise<
    Pick<LoadedItem, 'instanceScript' | 'prependScript' | 'controls' | 'title' | 'description' | 'sourceCodes'> & V
  >
  transform?: (code: string) => Promise<string> | string
}

export type ResolvedLoader<V = object> = SetOptional<Required<Loader<V>>, 'transform'>

export interface ResolvedOptions extends Except<SetRequired<Options, 'root'>, 'loaders'> {
  loaders: ResolvedLoader[]
}

export interface SourceCode {
  filename: string
  code: string
  parsedCode: string
}

export interface LoadedItem {
  id: string
  filename: string
  relativePath: string
  absolutePath: string
  query: QueryObj
  loader: ResolvedLoader
  sourceCodes?: SourceCode[]
  title?: string
  description?: string
  controls?: Record<string, Control>
  prependScript?: string
  instanceScript: string
}

export interface ResolvedItem<D extends object = object>
  extends Except<LoadedItem, 'prependScript' | 'instanceScript' | 'loader' | 'absolutePath'> {
  instance: Instance<D>
}

export interface Storage {
  get: (absolutePath: string) => LoadedItem | undefined
  getAll: () => LoadedItem[]
  exists: (absolutePath: string) => boolean
  set: (absolutePath: string, query: QueryObj, loader: ResolvedLoader) => Promise<LoadedItem>
  remove: (absolutePath: string) => void

  onItemChange: (callback: (item: LoadedItem) => void) => void
  notifyItemChange: (item: LoadedItem) => void
}

export  interface Fn<TParams = any, TReturn = TParams> {
  (...arg: TParams[]): TReturn;
}

export interface Instance<Data extends object = object> {
  mount: (el: HTMLElement, data?: Data) => Promise<void> | void
  unmount: () => Promise<void> | void
  getExpose?: (funName: string) => Fn | undefined
  on?: (EvtName: string, fn: Fn) => void
  getData: () => Data | undefined
  getProps: () => InstanceProp<Data>[]
  setData: (data: Partial<Data>) => Promise<void> | void
  watchData: {
    <K extends keyof Data>(key: K, callback: (value: Data[K] | undefined) => void): () => void
    (callback: (data: Data | undefined) => void): () => void
  }
}

export type ItemChangeCallback = (item: ResolvedItem) => void
export interface HmrRuntime {
  onItemChange: (cb: ItemChangeCallback) => () => void
  _updateItem: (currentItem: ResolvedItem, newItem: ResolvedItem) => void
}
