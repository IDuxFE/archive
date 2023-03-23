<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './HelloWorld.vue'
defineProps<{ msg: string }>()
</script>

<template>
  <div>
    <h1>Demo111</h1>
  </div>
  <HelloWorld :msg="msg" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<archive-meta lang="json">
{
  "title": "demo1",
  "description": "description",
  "dependencies": ["./HelloWorld.vue"],
  "controls": [
    {
      "prop": "msg",
      "type": "string"
    }
  ]
}
</archive-meta>
