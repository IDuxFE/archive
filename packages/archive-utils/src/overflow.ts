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
