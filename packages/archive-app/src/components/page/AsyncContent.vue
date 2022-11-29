<template>
  <BaseContentComp :visible="visible">
    <Comp />
  </BaseContentComp>
</template>
<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import BaseContentComp from './BaseContent.vue';

const props = defineProps<{
  visible: boolean
  component: () => Promise<any>
}>()

const Comp = computed(() => defineAsyncComponent(props.component))
</script>