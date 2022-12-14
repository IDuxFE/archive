/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Except } from 'type-fest'

export interface Options {
  root?: string
  onDemosCollected?: (demos: CollectedDemo[]) => void
  demoScriptGenerator?: (demo: CollectedDemo) => string
  collectors?: Collector[]
}

export interface Collector {
  name: string
  matchPattern: string | string[]
  ignorePattern?: string | string[]
  resolver?: (absolutePath: string) => Promise<
    {
      component: string
      sourceCodes: SourceCode[]
    } & Record<string, any>
  >
  demoRenderer?: (demos: CollectedDemo) => string
}

export type ResolvedCollector = Required<Collector> & { filter: (path: string) => boolean }
export type ResolvedOptions = Required<Options> & {
  collectors: ResolvedCollector[]
  findCollector: (path: string) => ResolvedCollector | undefined
}

export interface SourceCode {
  filename: string
  code: string
  parsedCode: string
}
export interface ResolvedSourceCode {
  filename: string
  code: () => Promise<string>
  parsedCode: () => Promise<string>
}
export interface LoadedSourceCode {
  filename: string
  code: string
  parsedCode: string
}

export interface CollectedDemo extends Record<string, any> {
  id: string
  filename: string
  path: string
  sourceCodes: SourceCode[]
  component: string
}

export interface ResolvedDemo extends Except<CollectedDemo, 'sourceCodes' | 'component'> {
  sourceCodes: ResolvedSourceCode[]
  component: () => Promise<unknown>
}

export interface DemoStorage {
  get: (id: string) => CollectedDemo | undefined
  getAll: () => CollectedDemo[]
  exists: (id: string) => boolean
  add: (relativePath: string) => Promise<void>
  remove: (id: string) => void

  onListChange: (callback: () => void) => void
  notifyListChange: () => void

  onDemoChange: (callback: (demo: CollectedDemo) => void) => void
  notifyDemoChange: (demo: CollectedDemo) => void
}

export interface DemoInstance {
  mount: (el: HTMLElement) => Promise<void>
  unmount: () => Promise<void>
}
