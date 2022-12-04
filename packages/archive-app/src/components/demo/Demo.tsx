import type { DemoTool } from '../../types'
import type { ResolvedDemo, LoadedSourceCode, DemoInstance } from '@idux/archive-plugin'
import {
  type PropType,
  type ComputedRef,
  type ExtractPropTypes,
  defineComponent,
  computed,
  ref,
  Transition,
  watch,
} from 'vue'

import { throttle } from 'lodash-es'

import { useClipboard } from '@idux/cdk/clipboard'
import { useState } from '@idux/cdk/utils'
import { useMessage } from '@idux/components/message'
import { IxIcon } from '@idux/components/icon'
import { IxTabs, IxTab } from '@idux/components/tabs'

import DemoInstanceComp from './DemoInstance'
import DemoToolComp from './DemoTool'

const demoProps = {
  lang: { type: String as PropType<'zh' | 'en'>, required: true },
  prefixCls: { type: String, required: true },
  demoData: { type: Object as PropType<ResolvedDemo>, required: true },
  demoInstance: { type: Object as PropType<DemoInstance>, required: true },
  tools: Array as PropType<DemoTool[]>,
}
type DemoProps = ExtractPropTypes<typeof demoProps>
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
    const sourceCodes = useSourceCodes(props)

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
      const code = sourceCodes.value[selectedSourceTab.value ?? 0].code
      copy(decodeURIComponent(code)).then(() => {
        success(props.lang === 'zh' ? '复制成功' : 'copy succeeded')
      })
    }, 300)

    const renderTool = (tool: DemoTool) => {
      if (tool.type === 'expandCode') {
        return (
          <DemoToolComp prefixCls={props.prefixCls!} tooltip={tool.tooltip ?? expandedTitle.value} onClick={onExpanded}>
            <IxIcon name={expanded.value ? 'unexpand' : 'expand'} />
          </DemoToolComp>
        )
      }

      if (tool.type === 'copyCode') {
        return (
          <DemoToolComp prefixCls={props.prefixCls!} tooltip={tool.tooltip ?? copyTitle.value} onClick={onCopy}>
            <IxIcon name={tool.icon ?? 'copy'}></IxIcon>
          </DemoToolComp>
        )
      }

      if (tool.type === 'link') {
        return (
          <DemoToolComp prefixCls={props.prefixCls!} tooltip={tool.tooltip} onClick={onCopy}>
            <a class={`${mergedPrefixCls}__tool-link`} href={tool.link} target="_blank" rel="noopener noreferrer">
              <IxIcon name={tool.icon ?? 'link'}></IxIcon>
            </a>
          </DemoToolComp>
        )
      }
    }

    const renderSourceCode = () => {
      if (!expanded.value) {
        return
      }

      const contentCls = `${mergedPrefixCls}__source-code__content`
      let children
      if (sourceCodes.value.length === 1) {
        children = <div class={contentCls} v-html={sourceCodes.value[0].parsedCode}></div>
      } else {
        children = (
          <IxTabs selectedKey={selectedSourceTab.value} onUpdate:selectedKey={handleSelectedSourceTabChange}>
            {sourceCodes.value.map((sourceCode, idx) => (
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
      const demoData = props.demoData!
      const demoInstance = props.demoInstance!

      return (
        <div class={mergedPrefixCls}>
          {demoData.title && (
            <h3 id={demoData.id} class={`${mergedPrefixCls}__title`}>
              <span>{demoData.title}</span>
              <a class="anchor">#</a>
            </h3>
          )}
          {demoData.description && <p class={`${mergedPrefixCls}__description`}>{demoData.description}</p>}
          <div class={`${mergedPrefixCls}__content`}>
            <div class={`${mergedPrefixCls}__content-inner`}>
              <div class={`${mergedPrefixCls}__stage`}>
                <DemoInstanceComp demoInstance={demoInstance} />
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

function useSourceCodes(props: DemoProps): ComputedRef<LoadedSourceCode[]> {
  const [sourceCodes, setSourceCodes] = useState<LoadedSourceCode[]>([])
  watch(
    () => props.demoData,
    async demoData => {
      const loadedSourceCodes = await Promise.all(
        demoData!.sourceCodes.map(sourceCode =>
          (async () => {
            return {
              filename: sourceCode.filename,
              code: await sourceCode.code(),
              parsedCode: await sourceCode.parsedCode(),
            }
          })(),
        ),
      )

      setSourceCodes(loadedSourceCodes)
    },
    { immediate: true },
  )

  return sourceCodes
}
