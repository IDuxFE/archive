/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

export function findOverflowParent(el: HTMLElement): HTMLElement | undefined {
  let parent = el.parentElement
  while (parent) {
    const { overflowY, display } = getComputedStyle(parent)
    if ((overflowY === 'auto' || overflowY === 'hidden' || overflowY === 'scroll') && !/inline/.test(display)) {
      return parent
    }

    parent = parent.parentElement
  }
}
