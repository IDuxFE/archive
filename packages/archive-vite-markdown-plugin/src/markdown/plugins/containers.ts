/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import { RenderRule } from 'markdown-it/lib/renderer'
import Token from 'markdown-it/lib/token'

export const containerPlugin = (md: MarkdownIt): void => {
  md.use(...createContainer('info', 'INFO', md))
    .use(...createContainer('success', 'SUCCESS', md))
    .use(...createContainer('warning', 'WARNING', md))
    .use(...createContainer('error', 'ERROR', md))
    .use(...createContainer('details', 'Details', md))
    // explicitly escape Vue syntax
    .use(container, 'v-pre', {
      render: (tokens: Token[], idx: number) => (tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`),
    })
    .use(container, 'raw', {
      render: (tokens: Token[], idx: number) => (tokens[idx].nesting === 1 ? `<div class="vp-raw">\n` : `</div>\n`),
    })
}

type ContainerArgs = [typeof container, string, { render: RenderRule }]

function createContainer(klass: string, defaultTitle: string, md: MarkdownIt): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const info = token.info.trim().slice(klass.length).trim()
        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle)
          if (klass === 'details') {
            return `<details class="${klass} custom-block"><summary>${title}</summary>\n`
          }
          return `<div class="${klass} custom-block"><p class="custom-block-title">${title}</p>\n`
        } else {
          return klass === 'details' ? `</details>\n` : `</div>\n`
        }
      },
    },
  ]
}
