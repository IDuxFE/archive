/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { VueItemMeta } from './types'

import { parse } from '@vue/compiler-sfc'

export const META_BLOCK_TYPE = 'archive-meta'

export function parseMeta(code: string): VueItemMeta {
  let descriptor
  try {
    descriptor = parse(code).descriptor
  } catch (err) {
    //
  }

  const metaBlock = descriptor?.customBlocks.find(block => block.type === META_BLOCK_TYPE)

  if (metaBlock) {
    let parsedMeta: VueItemMeta = {}
    try {
      parsedMeta = JSON.parse(metaBlock.content)
    } catch (err) {
      console.error(err)
      // TODO: error log
    }

    return parsedMeta
  }

  return {}
}
