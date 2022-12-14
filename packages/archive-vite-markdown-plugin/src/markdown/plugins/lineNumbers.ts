/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

// markdown-it plugin for generating line numbers.
// It depends on preWrapper plugin.

import MarkdownIt from 'markdown-it'

export const lineNumberPlugin = (md: MarkdownIt): void => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)
    const code = rawCode.slice(rawCode.indexOf('<code>'), rawCode.indexOf('</code>'))

    const lines = code.split('\n')
    const lineNumbersCode = [...Array(lines.length - 1)]
      .map((line, index) => `<span class="line-number">${index + 1}</span><br>`)
      .join('')

    const lineNumbersWrapperCode = `<div class="line-numbers-wrapper">${lineNumbersCode}</div>`

    const finalCode = rawCode
      .replace(/<\/div>$/, `${lineNumbersWrapperCode}</div>`)
      .replace(/"(language-\S*?)"/, '"$1 line-numbers-mode"')

    return finalCode
  }
}
