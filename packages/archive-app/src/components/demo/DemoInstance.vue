<template>
  <div ref="elRef"></div>
</template>
<script setup lang="ts">
import type { DemoInstance } from "@idux/archive-plugin"
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
const props = defineProps<{
  demoInstance: DemoInstance
}>()

const elRef = ref<HTMLElement>()
const { mount, unmount } = (() => {
  return {
    mount: async () => {
      await props.demoInstance.mount?.(elRef.value!)
    },
    unmount: async () => {
      await props.demoInstance.unmount()
    }
  }
})();

onMounted(mount)
onBeforeUnmount(unmount)

watch(() => props.demoInstance, async () => {
  await unmount()
  await mount()
})
</script>