<template>
  <BaseContentComp :visible="visible">
    <DemoComp
      v-for="demo in demos"
      :demoData="allDemoDatas[demo.id]"
      :demoInstance="allDemoInstance[demo.id]"
      :tools="demo.tools"
      prefixCls="archive-app"
      lang="zh"
    />
  </BaseContentComp>
</template>
<script setup lang="ts">
import type { DemoData } from '../../types'
import allDemoDatas from 'virtual:archive-demo-all-data'
import allDemoInstance from 'virtual:archive-demo-all'

import BaseContentComp from './BaseContent.vue'
import DemoComp from '../demo/Demo.vue'

defineProps<{
  demos: DemoData[]
  visible: boolean
}>()
</script>
