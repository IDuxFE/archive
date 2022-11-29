<template>
  <div :class="mregedPrefixCls">
    <h3 v-if="demoData.title" :id="demoData.id" :class="`${mregedPrefixCls}__title`">
      <span>{{ demoData.title }}</span>
      <a class="anchor">#</a>
    </h3>
    <p v-if="demoData.description" :class="`${mregedPrefixCls}__description`">{{ demoData.description }}</p>
    <div :class="`${mregedPrefixCls}__content`">
      <div :class="`${mregedPrefixCls}__content-inner`">
        <div :class="`${mregedPrefixCls}__stage`">
          <DemoInstanceComp :demoInstance="demoInstance" />
        </div>
        <div :class="`${mregedPrefixCls}__tools`">
          <template v-for="tool in mergedTools">
            <DemoToolComp
              v-if="tool.type === 'expandCode'"
              :prefixCls="prefixCls"
              :tooltip="tool.tooltip ?? expandedTitle"
              :onClick="onExpanded"
            >
              <IxIcon :name="expanded ? 'unexpand' : 'expand'"></IxIcon>
            </DemoToolComp>
            <DemoToolComp
              v-if="tool.type === 'copyCode'"
              :prefixCls="prefixCls"
              :tooltip="tool.tooltip ?? copyTitle"
              :onClick="onCopy"
            >
              <IxIcon :name="tool.icon ?? 'copy'"></IxIcon>
            </DemoToolComp>
            <DemoToolComp v-if="tool.type === 'link'" :prefixCls="prefixCls" :tooltip="tool.tooltip" :onClick="onCopy">
              <a :class="`${mregedPrefixCls}__tool-link`" :href="tool.link" target="_blank" rel="noopener noreferrer">
                <IxIcon :name="tool.icon ?? 'link'"></IxIcon>
              </a>
            </DemoToolComp>
          </template>
        </div>
      </div>
      <Transition :name="`${mregedPrefixCls}-code-fade-down`">
        <div v-if="expanded" :class="`${prefixCls}__source-code archive-md`">
          <div
            v-if="sourceCodes.length === 1"
            :class="`${mregedPrefixCls}__source-code__content`"
            v-html="sourceCodes[0].parsedCode"
          ></div>
          <IxTabs v-else v-model:selectedKey="selectedSourceTab">
            <IxTab v-for="(sourceCode, idx) in sourceCodes" :key="idx" :title="sourceCode.filename">
              <div :class="`${mregedPrefixCls}__source-code__content`" v-html="sourceCode.parsedCode"></div>
            </IxTab>
          </IxTabs>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { DemoTool } from '../../types'
import type { ResolvedDemo, LoadedSourceCode, DemoInstance } from '@idux/archive-plugin'
import { type ComputedRef, computed, ref, Transition, watch } from 'vue'

import { throttle } from 'lodash-es'

import { useClipboard } from '@idux/cdk/clipboard'
import { useState } from '@idux/cdk/utils'
import { useMessage } from '@idux/components/message'

import DemoInstanceComp from './DemoInstance.vue'
import DemoToolComp from './DemoTool.vue'

const props = defineProps<{
  lang: 'zh' | 'en'
  prefixCls: string
  demoData: ResolvedDemo
  demoInstance: DemoInstance
  tools?: DemoTool[]
}>()

const mregedPrefixCls = `${props.prefixCls}-demo`
const mergedTools = computed<DemoTool[]>(() => {
  if ((props.tools?.findIndex(tool => tool.type === 'expandCode') ?? -1) > -1) {
    return props.tools!
  }

  return [...(props.tools ?? []), { type: 'expandCode' } as DemoTool]
})
const sourceCodes = useSourceCodes()

const selectedSourceTab = ref(0)
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

function useSourceCodes(): ComputedRef<LoadedSourceCode[]> {
  const [sourceCodes, setSourceCodes] = useState<LoadedSourceCode[]>([])
  watch(
    () => props.demoData,
    async resolvedDemo => {
      const loadedSourceCodes = await Promise.all(
        resolvedDemo.sourceCodes.map(sourceCode =>
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
</script>
