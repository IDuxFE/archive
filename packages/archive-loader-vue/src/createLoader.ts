/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ArchiveLoaderVue, ArchiveLoaderVueOptions } from './types'
import type { SourceCode } from '@idux/archive-vite-plugin'

import { readFileSync } from 'node:fs'

import { basename, dirname, isAbsolute, resolve } from 'pathe'

import { createMarkdownRenderer } from '@idux/archive-vite-markdown-plugin'

import { genInstanceCode, genPrependCode } from './genInstanceCode'
import { genSourceCode } from './genSourceCodes'
import { parseMeta } from './parseMeta'

let factoryIdSeed = 0

export function createArchiveVueLoader(options?: ArchiveLoaderVueOptions): ArchiveLoaderVue {
  const { matched, srcDir, includeMeta = true, includeSourceCodes = false, setup, prefix } = options ?? {}
  const mdPromise = includeSourceCodes ? createMarkdownRenderer(srcDir ?? '.') : undefined
  const factoryId = `archive-vue-loader-${factoryIdSeed++}`

  const resolveSourceCodes = async (filePath: string, file: string, deps?: string[]): Promise<SourceCode[]> => {
    if (!mdPromise) {
      return []
    }

    const demoDirPath = dirname(filePath)
    const md = await mdPromise

    return [
      genSourceCode(basename(filePath), file, md),
      ...((deps ?? [])
        .map(depPath => {
          let depFile = ''
          try {
            const resolvedFilePath = isAbsolute(depPath) ? depPath : resolve(demoDirPath, depPath)
            depFile = readFileSync(resolvedFilePath, 'utf-8')
          } catch (err) {
            console.error(err)
            //TODO: error log
          }

          return depFile ? genSourceCode(basename(depPath), depFile, md) : undefined
        })
        .filter(Boolean) as SourceCode[]),
    ]
  }

  return {
    name: 'archive-loader-vue',
    prefix,
    matched(src) {
      return matched ? matched(src) : /\.(vue|md)$/.test(src)
    },
    async resolve(absolutePath) {
      const prependScript = genPrependCode(absolutePath, setup)
      const instanceScript = genInstanceCode(factoryId, setup)

      if (!includeMeta && !includeSourceCodes) {
        return {
          prependScript,
          instanceScript,
        }
      }

      const file = readFileSync(absolutePath, 'utf-8')
      const meta = includeMeta ? parseMeta(file) : {}
      const sourceCodes = includeSourceCodes
        ? await resolveSourceCodes(absolutePath, file, meta.dependencies)
        : undefined

      return {
        ...meta,
        sourceCodes,
        prependScript,
        instanceScript,
      }
    },
  }
}
