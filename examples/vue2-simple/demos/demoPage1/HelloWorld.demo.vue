<script lang="ts">
import HelloWorld from './HelloWorld.vue'
export default {
  components: {
    HelloWorld
  }
}
</script>

<template>
  <div>
    <h1>Demo111</h1>
    <HelloWorld msg="Vite + Vue" />
  </div>
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
  "dependencies": [
    "./HelloWorld.vue"
  ]
}
</archive-meta>