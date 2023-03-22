/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { DemoTool, ResolvedDemoItem } from '@idux/archive-types'

import { throttle } from 'lodash-es'

import { useClipboard } from '@idux/cdk/clipboard'
import { IxIcon } from '@idux/components/icon'
import { useMessage } from '@idux/components/message'
import { IxTab, IxTabs } from '@idux/components/tabs'

import { type PropType, Transition, computed, defineComponent, ref } from '@idux/archive-app/vue'

import DemoToolComp from './DemoTool'
import Instance from '../Instance'

const demoProps = {
  lang: { type: String as PropType<'zh' | 'en'>, required: true },
  prefixCls: { type: String, required: true },
  resolvedDemoItem: { type: Object as PropType<ResolvedDemoItem>, required: true },
  tools: Array as PropType<DemoTool[]>,
}
export default defineComponent({
  props: demoProps,
  setup(props) {
    const mergedPrefixCls = `${props.prefixCls}-demo`
    const mergedTools = computed<DemoTool[]>(() => {
      if ((props.tools?.findIndex(tool => tool.type === 'expandCode') ?? -1) > -1) {
        return props.tools!
      }

      return [...(props.tools ?? []), { type: 'expandCode' } as DemoTool]
    })
    // const sourceCodes = useSourceCodes(props)

    const selectedSourceTab = ref(0)
    const handleSelectedSourceTabChange = (tab: number) => {
      selectedSourceTab.value = tab
    }

    const expanded = ref(false)
    const expandedTitle = computed(() => {
      if (props.lang === 'zh') {
        return expanded.value ? '收起代码' : '显示代码'
      }
      return expanded.value ? 'Hide Code' : 'Show Code'
    })
    const copyTitle = computed(() => (props.lang === 'zh' ? '复制代码' : 'Copy Code'))

    const onExpanded = () => {
      expanded.value = !expanded.value
    }

    const { copy } = useClipboard()
    const { success } = useMessage()

    const onCopy = throttle(async () => {
      const code = props.resolvedDemoItem?.sourceCodes[selectedSourceTab.value ?? 0].code
      code &&
        copy(decodeURIComponent(code)).then(() => {
          success(props.lang === 'zh' ? '复制成功' : 'copy succeeded')
        })
    }, 300)

    const renderTool = (tool: DemoTool) => {
      if (tool.type === 'expandCode') {
        return (
          <DemoToolComp prefixCls={props.prefixCls!} tooltip={tool.tooltip ?? expandedTitle.value} onClick={onExpanded}>
            {tool.render ? tool.render(expanded.value) : <IxIcon name={expanded.value ? 'unexpand' : 'expand'} />}
          </DemoToolComp>
        )
      }

      if (tool.type === 'copyCode') {
        return (
          <DemoToolComp prefixCls={props.prefixCls!} tooltip={tool.tooltip ?? copyTitle.value} onClick={onCopy}>
            {tool.render ? tool.render() : <IxIcon name={'copy'}></IxIcon>}
          </DemoToolComp>
        )
      }

      if (tool.type === 'link') {
        return (
          <DemoToolComp prefixCls={props.prefixCls!} tooltip={tool.tooltip} onClick={onCopy}>
            <a class={`${mergedPrefixCls}__tool-link`} href={tool.link} target="_blank" rel="noopener noreferrer">
              {tool.render ? tool.render() : <IxIcon name={'link'}></IxIcon>}
            </a>
          </DemoToolComp>
        )
      }
    }

    const renderSourceCode = () => {
      const sourceCodes = props.resolvedDemoItem?.sourceCodes
      if (!expanded.value || !sourceCodes) {
        return
      }

      const contentCls = `${mergedPrefixCls}__source-code__content`
      let children
      if (sourceCodes.length === 1) {
        children = <div class={contentCls} v-html={sourceCodes[0].parsedCode}></div>
      } else {
        children = (
          <IxTabs selectedKey={selectedSourceTab.value} onUpdate:selectedKey={handleSelectedSourceTabChange}>
            {sourceCodes.map((sourceCode, idx) => (
              <IxTab key={idx} title={sourceCode.filename}>
                <div class={contentCls} v-html={sourceCode.parsedCode}></div>
              </IxTab>
            ))}
          </IxTabs>
        )
      }

      return <div class={`${mergedPrefixCls}__source-code archive-md`}>{children}</div>
    }

    return () => {
      const demoItem = props.resolvedDemoItem!

      return (
        <div class={mergedPrefixCls}>
          {demoItem.title && (
            <h3 id={demoItem.id} class={`${mergedPrefixCls}__title`}>
              <span>{demoItem.title}</span>
              <a class="anchor" href={'#' + demoItem.id}>
                #
              </a>
            </h3>
          )}
          {demoItem.description && <p class={`${mergedPrefixCls}__description`}>{demoItem.description}</p>}
          <div class={`${mergedPrefixCls}__content`}>
            <div class={`${mergedPrefixCls}__content-inner`}>
              <div class={`${mergedPrefixCls}__stage`}>
                <Instance instance={demoItem.instance} />
              </div>
              <div class={`${mergedPrefixCls}__tools`}>{mergedTools.value.map(tool => renderTool(tool))}</div>
            </div>
          </div>
          <Transition name={`${mergedPrefixCls}-code-fade-down`}>{renderSourceCode()}</Transition>
        </div>
      )
    }
  },
})

// function useSourceCodes(props: DemoProps): ComputedRef<LoadedSourceCode[]> {
//   const [sourceCodes, setSourceCodes] = useState<LoadedSourceCode[]>([])
//   watch(
//     () => props.demoData,
//     async demoData => {
//       const loadedSourceCodes = await Promise.all(
//         demoData!.sourceCodes.map(sourceCode =>
//           (async () => {
//             return {
//               filename: sourceCode.filename,
//               code: await sourceCode.code(),
//               parsedCode: await sourceCode.parsedCode(),
//             }
//           })(),
//         ),
//       )

//       setSourceCodes(loadedSourceCodes)
//     },
//     { immediate: true },
//   )

//   return sourceCodes
// }
