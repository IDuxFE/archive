/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { MarkdownOptions } from './markdown'
import type { Plugin, ResolvedConfig } from 'vite'

import { createMarkdownToVueRenderFn } from './markdownToVue'
import { CleanUrlsMode } from './types'

export function createArchiveMdPlugin(markdownOptions: MarkdownOptions, cleanUrls?: CleanUrlsMode): Plugin {
  let markdownToVue: Awaited<ReturnType<typeof createMarkdownToVueRenderFn>>
  let config: ResolvedConfig

  return {
    name: 'idux:markdown-plugin',
    enforce: 'pre',

    async configResolved(resolvedConfig) {
      config = resolvedConfig
      markdownToVue = await createMarkdownToVueRenderFn(
        config.root,
        markdownOptions,
        config.define,
        config.command === 'build',
        config.base,
        // lastUpdated,
        cleanUrls,
      )
    },

    async transform(code, id) {
      if (id.endsWith('.md')) {
        // transform .md files into vueSrc so plugin-vue can handle it
        const { vueSrc, includes } = await markdownToVue(code, id)
        if (includes.length) {
          includes.forEach(i => {
            this.addWatchFile(i)
          })
        }

        return vueSrc
      }
    },

    async handleHotUpdate(ctx) {
      const { file, read } = ctx

      // hot reload .md files as .vue files
      if (file.endsWith('.md')) {
        const content = await read()
        const { vueSrc } = await markdownToVue(content, file)

        // overwrite src so vue plugin can handle the HMR
        ctx.read = () => vueSrc
      }
    },
  }
}

export * from './markdown'
