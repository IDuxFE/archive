/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ArchivePageLoader } from '@idux/archive-types'

import { normalize } from 'pathe'

export function normalizePath(path: string): string {
  return path.replace(/\/(\/)+/g, '/')
}

export const ARCHIVE_PAGE_ID_AFFIX = '__archivePage'

export function findMatchedPageLoader(src: string, loaders: ArchivePageLoader[]): ArchivePageLoader | undefined {
  return loaders.find(loader => loader.matched(src))
}

export function getArchivePageId(src: string, loaders: ArchivePageLoader[]): string | undefined {
  if (!findMatchedPageLoader(src, loaders)) {
    return
  }

  return `${normalize(src)}${ARCHIVE_PAGE_ID_AFFIX}`
}

export function getPageSrcByArchivePageId(id: string): string {
  return id.slice(0, id.length - ARCHIVE_PAGE_ID_AFFIX.length)
}

export function isArchivePageId(id: string): boolean {
  return id.endsWith(ARCHIVE_PAGE_ID_AFFIX)
}
