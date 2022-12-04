import type { AnchorData } from '../../types'
import { type ComponentPublicInstance, defineComponent, computed, ref, inject, nextTick, onMounted, watch } from 'vue'
import { traverseTree } from '../../utils'
import { pageContextToken } from '../../token'

import { isObject } from 'lodash-es'

import Anchor from './Anchor'

export default defineComponent({
  props: {
    visible: { type: Boolean, required: true },
  },
  setup(props, { slots }) {
    const { anchorOptions } = inject(pageContextToken)!

    const enableAnchor = computed(() => !!anchorOptions)
    const anchorMaxLevel = computed(() => (isObject(anchorOptions) ? anchorOptions.maxLevel : 3))
    const rootEl = ref<HTMLElement>()
    const anchorEl = ref<ComponentPublicInstance>()
    const anchorDatas = ref<AnchorData[]>()

    const contentPaddingReight = ref<string>()
    const calcContentPadding = () => {
      const anchorWidth = anchorEl.value?.$el.getBoundingClientRect().width
      contentPaddingReight.value = anchorWidth ? `${anchorWidth}px` : undefined
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
          anchorDatas.value = parseAnchors(rootEl.value!, anchorMaxLevel.value)
        }
      })
      observer.observe(rootEl.value!, {
        childList: true,
        subtree: false,
        attributes: false,
      })

      anchorDatas.value = parseAnchors(rootEl.value!, anchorMaxLevel.value)
    })

    return () => (
      <div class="archive-app__page__content">
        <div class="archive-app__page__content__inner" ref={rootEl}>
          {slots.default?.()}
        </div>
        {anchorDatas.value && (
          <Anchor
            ref={anchorEl}
            class="archive-app__page__content__anchor"
            data={anchorDatas.value}
          />
        )}
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
  traverseTree(root.children, 'children', el => {
    if (!el.id || !el.textContent) {
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
