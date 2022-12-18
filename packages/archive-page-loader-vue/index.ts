/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ArchivePageLoader } from '@idux/archive'

export interface VuePageLoaderOptions {
  matched?: (src: string) => boolean
  setup?: string
}

export function createVuePageLoader(options?: VuePageLoaderOptions): ArchivePageLoader {
  return {
    matched(src) {
      return options?.matched ? options.matched(src) : /\.(vue|md)$/.test(src)
    },
    async resolver(absolutePath) {
      return genInstanceCode(absolutePath, options?.setup)
    },
  }
}

function genInstanceCode(absolutePath: string, setup?: string): string {
  return `import { createInstance } from '@idux/archive-page-loader-vue/client'
  ${setup && `import setup from ${JSON.stringify(setup)}`}

  export default createInstance(() => import(${JSON.stringify(absolutePath)}), ${JSON.stringify(absolutePath)}${
    setup ? ', setup' : ''
  })`
}
