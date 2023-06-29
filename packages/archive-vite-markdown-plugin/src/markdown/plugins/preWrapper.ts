/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

// markdown-it plugin for wrapping <pre> ... </pre>.
//
// If your plugin was chained before preWrapper, you can add additional element directly.
// If your plugin was chained after preWrapper, you can use these slots:
//   1. <!--beforebegin-->
//   2. <!--afterbegin-->
//   3. <!--beforeend-->
//   4. <!--afterend-->

import type MarkdownIt from 'markdown-it'

export function preWrapperPlugin(md: MarkdownIt): void {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    // remove title from info
    token.info = token.info.replace(/\[.*\]/, '')

    const lang = extractLang(token.info)
    const rawCode = fence(...args)
    return `<div class="language-${lang}${/ active( |$)/.test(token.info) ? ' active' : ''}">
      <button title="Copy Code" class="copy"></button>
      <span class="lang">${lang}</span>
      ${rawCode}
    </div>`
  }
}
export function extractTitle(info: string): string {
  return info.match(/\[(.*)\]/)?.[1] || extractLang(info) || 'txt'
}

const extractLang = (info: string): string => {
  return info
    .trim()
    .replace(/:(no-)?line-numbers({| |$).*/, '')
    .replace(/(-vue|{| ).*$/, '')
    .replace(/^vue-html$/, 'template')
}
