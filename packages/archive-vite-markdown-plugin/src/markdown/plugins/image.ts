/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

// markdown-it plugin for normalizing image source

import MarkdownIt from 'markdown-it'

import { EXTERNAL_URL_RE } from '../../types'

export const imagePlugin = (md: MarkdownIt): void => {
  const imageRule = md.renderer.rules.image!
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    let url = token.attrGet('src')
    if (url && !EXTERNAL_URL_RE.test(url)) {
      if (!/^\.?\//.test(url)) {
        url = './' + url
      }
      token.attrSet('src', decodeURIComponent(url))
    }
    return imageRule(tokens, idx, options, env, self)
  }
}
