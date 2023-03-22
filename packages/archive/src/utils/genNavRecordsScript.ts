/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ServerResolvedNavRecord, ServerResolvedPageData, ServerResolvedPageTab } from '@idux/archive-types'

import { genObjectScript } from '@idux/archive-utils'

export function genPageTabScript(tab: ServerResolvedPageTab): string {
  if (tab.demoImportScripts) {
    return genObjectScript(tab, { demoImports: '[' + tab.demoImportScripts.join(',') + ']' })
  }

  if (tab.importScript) {
    return genObjectScript(tab, { import: tab.importScript })
  }

  return 'undefined'
}

export function genPageDataScript(pageData: ServerResolvedPageData): string {
  if (pageData.demoImportScripts) {
    return genObjectScript(pageData, { demoImports: '[' + pageData.demoImportScripts.join(',') + ']' })
  }

  if (pageData.importScript) {
    return genObjectScript(pageData, { import: pageData.importScript })
  }

  if (pageData.tabs) {
    return genObjectScript(pageData, { tabs: `[${pageData.tabs.map(tab => genPageTabScript(tab)).join(',')}]` })
  }

  return 'undefined'
}

export function genNavRecordsScript(records: ServerResolvedNavRecord[]): string {
  return `[${records.map(record => {
    if (record.type === 'link') {
      return JSON.stringify(record)
    }

    if (record.type === 'item') {
      return genObjectScript(
        record,
        record.pageData.tabs?.length ? { pageData: genPageDataScript(record.pageData) } : undefined,
      )
    }

    return genObjectScript(record, { children: genNavRecordsScript(record.children) })
  })}]`
}
