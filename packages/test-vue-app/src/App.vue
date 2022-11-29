<script setup lang="ts">
//@ts-ignore
import { pages, navRecords, sidebarRecords } from '../../test/dist/index.js'

console.log(pages, navRecords, sidebarRecords)
</script>

<template>
  <div style="width:100%">
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
