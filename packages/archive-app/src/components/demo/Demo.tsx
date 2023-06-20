/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { DemoControl, DemoTool, ResolvedDemoItem } from '@idux/archive-types'
import type { InstanceProp } from '@idux/archive-vite-plugin'
import type { SetOptional } from 'type-fest'

import {
  type DefineComponent,
  type ExtractPropTypes,
  type PropType,
  Transition,
  computed,
  defineComponent,
  ref,
} from 'vue'

import { throttle } from 'lodash-es'

import { Instance } from '@idux/archive-loader-vue/client'
import { useClipboard } from '@idux/cdk/clipboard'
import { IxIcon } from '@idux/components/icon'
import { useMessage } from '@idux/components/message'
import { IxTab, IxTabs } from '@idux/components/tabs'

import DemoContorlComp from './DemoControl'
import DemoToolComp from './DemoTool'

export const demoProps = {
  lang: { type: String as PropType<'zh' | 'en'>, default: 'zh' },
  resolvedDemoItem: { type: Object as PropType<ResolvedDemoItem>, required: true },
  tools: Array as PropType<DemoTool[]>,
} as const
export type DemoProps = SetOptional<ExtractPropTypes<typeof demoProps>, 'lang' | 'tools'>
export default defineComponent({
  props: demoProps,
  setup(props) {
    const prefixCls = `archive-app-demo`
    const mergedControls = computed(() => mergeDemoControls(props.resolvedDemoItem))
    const mergedTools = computed<DemoTool[]>(() => {
      if ((props.tools?.findIndex(tool => tool.type === 'expandCode') ?? -1) > -1) {
        return props.tools!
      }

      return [
        ...(props.tools ?? []),
        { type: 'expandCode' },
        mergedControls.value.length && { type: 'expandControls' },
      ].filter(Boolean) as DemoTool[]
    })

    const selectedSourceTab = ref(0)
    const handleSelectedSourceTabChange = (tab: number) => {
      selectedSourceTab.value = tab
    }

    const expanded = ref<'code' | 'controls' | ''>('')

    const expandedCodeTitle = computed(() => {
      if (props.lang === 'zh') {
        return expanded.value === 'code' ? '收起代码' : '显示代码'
      }
      return expanded.value === 'code' ? 'Hide Code' : 'Show Code'
    })
    const expandedControlsTitle = computed(() => {
      if (props.lang === 'zh') {
        return expanded.value === 'controls' ? '收起控制' : '显示控制'
      }
      return expanded.value === 'controls' ? 'Hide Controls' : 'Show Controls'
    })
    const copyTitle = computed(() => (props.lang === 'zh' ? '复制代码' : 'Copy Code'))

    const onExpanded = (target: 'code' | 'controls') => {
      expanded.value = expanded.value === target ? '' : target
    }

    const { copy } = useClipboard()
    const { success } = useMessage()

    const onCopy = throttle(async () => {
      const code = props.resolvedDemoItem?.sourceCodes?.[selectedSourceTab.value ?? 0].code
      code &&
        copy(decodeURIComponent(code)).then(() => {
          success(props.lang === 'zh' ? '复制成功' : 'copy succeeded')
        })
    }, 300)

    const renderTool = (tool: DemoTool) => {
      if (tool.type === 'expandCode') {
        return (
          <DemoToolComp tooltip={tool.tooltip ?? expandedCodeTitle.value} onClick={() => onExpanded('code')}>
            <IxIcon name={expanded.value === 'code' ? 'unexpand' : 'expand'} />
          </DemoToolComp>
        )
      }

      if (tool.type === 'expandControls') {
        return (
          <DemoToolComp tooltip={tool.tooltip ?? expandedControlsTitle.value} onClick={() => onExpanded('controls')}>
            <IxIcon name={expanded.value === 'controls' ? 'up' : 'control'} />
          </DemoToolComp>
        )
      }

      if (tool.type === 'copyCode') {
        return (
          <DemoToolComp tooltip={tool.tooltip ?? copyTitle.value} onClick={onCopy}>
            {tool.render ? tool.render() : <IxIcon name={'copy'}></IxIcon>}
          </DemoToolComp>
        )
      }

      if (tool.type === 'link') {
        return (
          <DemoToolComp tooltip={tool.tooltip} onClick={onCopy}>
            <a class={`${prefixCls}__tool-link`} href={tool.link} target="_blank" rel="noopener noreferrer">
              {tool.render ? tool.render() : <IxIcon name={'link'}></IxIcon>}
            </a>
          </DemoToolComp>
        )
      }
    }

    const renderSourceCode = () => {
      const sourceCodes = props.resolvedDemoItem?.sourceCodes
      if (!sourceCodes) {
        return
      }

      const contentCls = `${prefixCls}__source-code__content`
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

      return <div class={`${prefixCls}__source-code archive-md`}>{children}</div>
    }

    const renderDemoControl = () => {
      if (expanded.value === 'controls' && mergedControls.value.length && props.resolvedDemoItem.instance) {
        return <DemoContorlComp controls={mergedControls.value} instance={props.resolvedDemoItem.instance} />
      }
    }

    const renderDropdownPanelContent = () => {
      if (expanded.value === 'code') {
        return renderSourceCode()
      }

      if (expanded.value === 'controls') {
        return renderDemoControl()
      }
    }

    return () => {
      const demoItem = props.resolvedDemoItem!
      return (
        <div class={prefixCls}>
          {demoItem.title && (
            <h3 id={demoItem.id} class={`${prefixCls}__title`}>
              <span>{demoItem.title}</span>
              <a class="anchor" href={'#' + demoItem.id}>
                #
              </a>
            </h3>
          )}
          {demoItem.description && <p class={`${prefixCls}__description`}>{demoItem.description}</p>}
          <div class={`${prefixCls}__content`}>
            <div class={`${prefixCls}__content-inner`}>
              <div class={`${prefixCls}__stage`}>
                <Instance instance={demoItem.instance} />
              </div>
              <div class={`${prefixCls}__tools`}>{mergedTools.value.map(tool => renderTool(tool))}</div>
            </div>
          </div>
          <Transition name={`${prefixCls}-fade-down`}>
            <div v-show={!!expanded.value} class={`${prefixCls}__dropdown-panel`}>
              {renderDropdownPanelContent()}
            </div>
          </Transition>
        </div>
      )
    }
  },
}) as DefineComponent<DemoProps>

function mergeDemoControls<D extends Record<string, any>>(item: ResolvedDemoItem<D>): DemoControl[] {
  const demoProps = item.instance.getProps()

  if (!demoProps.length) {
    return []
  }

  return (demoProps
    ?.map(prop => {
      const control = item.controls?.[prop.key as string]

      if (!control) {
        return createControlFromProp(prop)
      }

      return {
        ...control,
        key: prop.key,
        propType: prop.type,
      }
    })
    ?.filter(Boolean) ?? []) as DemoControl[]
}

function createControlFromProp<D extends Record<string, any>>(prop: InstanceProp<D>): DemoControl | undefined {
  const type = ((): DemoControl['type'] | undefined => {
    switch (prop.type) {
      case 'string':
        return 'input'
      case 'boolean':
        return 'boolean'
      case 'number':
        return 'number'
      case 'object':
        return 'json'

      default:
        break
    }
  })()

  if (!type) {
    return
  }

  return {
    key: prop.key,
    type,
    propType: prop.type,
  } as DemoControl
}
