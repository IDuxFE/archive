<template>
  <div ref="el">
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import item from 'archive-page:./demoPage1/HelloWorld.demo.vue';

const el = ref()

onMounted(() => {
  item.instance.mount(el.value)
})
onUnmounted(() => {
  item.instance.unmount()
})
</script>