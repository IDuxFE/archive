/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { useClipboard } from '@idux/cdk/clipboard'

let inited = false

export function useCopyCode(): void {
  if (inited) {
    return
  }

  const { copy } = useClipboard()
  const timeoutIdMap: Map<HTMLElement, NodeJS.Timeout> = new Map()
  window.addEventListener('click', e => {
    const el = e.target as HTMLElement
    if (el.matches('div[class*="language-"] > button.copy')) {
      const parent = el.parentElement
      const sibling = el.nextElementSibling?.nextElementSibling as HTMLPreElement | null
      if (!parent || !sibling) {
        return
      }

      const isShell = /language-(shellscript|shell|bash|sh|zsh)/.test(parent.className)

      let text = ''

      sibling.querySelectorAll('span.line:not(.diff.remove)').forEach(node => (text += (node.textContent || '') + '\n'))
      text = text.slice(0, -1)

      if (isShell) {
        text = text.replace(/^ *(\$|>) /gm, '').trim()
      }

      copy(text).then(() => {
        el.classList.add('copied')

        clearTimeout(timeoutIdMap.get(el))
        const timeoutId = setTimeout(() => {
          el.classList.remove('copied')
          el.blur()
          timeoutIdMap.delete(el)
        }, 2000)
        timeoutIdMap.set(el, timeoutId)
      })
    }
  })

  inited = true
}
