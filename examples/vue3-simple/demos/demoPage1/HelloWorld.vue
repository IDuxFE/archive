<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string; num: number; bool: boolean; obj: object }>()

const count = ref(0)
</script>

<template>
  <h1>{{ `msg props: ${msg}` }}</h1>
  <h1>{{ `boolean prop: ${bool ? 'ture' : 'false'}` }}</h1>
  <h1>{{ `obj prop keys: ${Object.keys(obj).join(',')}` }}</h1>
  <h1>{{ `num prop: ${num}` }}</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
