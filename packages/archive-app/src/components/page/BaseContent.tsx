/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AnchorData } from '../../types'

import { type ComponentPublicInstance, computed, defineComponent, inject, nextTick, onMounted, ref, watch } from 'vue'

import { isObject } from 'lodash-es'

import { pageContextToken } from '../../token'
import { traverseTree } from '@idux-archive/utils'
import Anchor from './Anchor'

export default defineComponent({
  props: {
    visible: { type: Boolean, required: true },
  },
  setup(props, { slots, expose }) {
    const { anchorOptions } = inject(pageContextToken)!

    const enableAnchor = computed(() => !!anchorOptions.value.enabled)
    const anchorMaxLevel = computed(() => (isObject(anchorOptions) ? anchorOptions.value.maxLevel : 3))
    const rootEl = ref<HTMLElement>()
    const anchorEl = ref<ComponentPublicInstance>()
    const anchorDatas = ref<AnchorData[]>()

    const contentPaddingReight = ref<string>()
    const calcContentPadding = () => {
      const anchorWidth = anchorEl.value?.$el.getBoundingClientRect().width
      contentPaddingReight.value = anchorWidth ? `${anchorWidth}px` : undefined
    }
    const updateAnchor = () => {
      if (!rootEl.value) {
        return
      }

      anchorDatas.value = parseAnchors(rootEl.value, anchorMaxLevel.value)
    }
    watch([anchorDatas, () => props.visible], ([, visible]) => {
      visible && nextTick(calcContentPadding)
    })
    onMounted(() => {
      if (!enableAnchor.value) {
        return
      }

      const observer = new MutationObserver(mutations => {
        if (mutations.findIndex(m => m.type === 'childList') > -1) {
          updateAnchor()
        }
      })
      observer.observe(rootEl.value!, {
        childList: true,
        subtree: false,
        attributes: false,
      })

      updateAnchor()
    })

    expose({ updateAnchor })

    return () => (
      <div class="archive-app__page__content">
        <div class="archive-app__page__content__inner" ref={rootEl}>
          {slots.default?.()}
        </div>
        {anchorDatas.value?.length ? (
          <Anchor ref={anchorEl} class="archive-app__page__content__anchor" data={anchorDatas.value} />
        ) : undefined}
      </div>
    )
  },
})

const anchorTags = [
  { tag: 'h1', level: 1 },
  { tag: 'h2', level: 2 },
  { tag: 'h3', level: 3 },
  { tag: 'h4', level: 4 },
] as const
function parseAnchors(root: HTMLElement, maxLevel: number): AnchorData[] {
  const anchorRoot: AnchorData = {
    level: 0,
    title: '',
    href: '',
    children: [],
  }
  let stackTop: AnchorData = anchorRoot
  const anchorStack: AnchorData[] = [anchorRoot]
  const pushStack = (data: AnchorData) => {
    anchorStack.push(data)
    stackTop = data
  }
  const popStack = () => {
    anchorStack.pop()
    stackTop = anchorStack[anchorStack.length - 1]
  }
  const hiddenEls: Element[] = []
  traverseTree(root.children, 'children', (el, parents) => {
    if (getComputedStyle(el).display === 'none') {
      hiddenEls.push(el)
      return
    }

    if (!el.id || !el.textContent || parents.some(parent => hiddenEls.includes(parent))) {
      return
    }

    const level = anchorTags.find(tag => tag.tag === el.tagName.toLowerCase())?.level
    if (!level || level > maxLevel) {
      return
    }

    const data: AnchorData = {
      level,
      title: el.getAttribute('title') ?? el.textContent.replace(/^#/, '').replace(/#$/, '') ?? el.id,
      href: `#${el.id}`,
      children: [],
    }

    while (level <= stackTop.level) {
      popStack()
    }

    stackTop.children.push(data)
    pushStack(data)
  })

  return anchorRoot.children
}
