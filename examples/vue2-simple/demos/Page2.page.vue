<template>
  <demo>
  </demo>
</template>

<script lang="ts">
import item from 'archive-demo:./demoPage1/HelloWorld.demo.vue';
import { createDemoInstance } from '@idux/archive-app/createDemoInstance'
import { createComponent } from '@idux/archive-loader-vue2/client'

const demoInstance = createDemoInstance(item)
const Comp = createComponent(demoInstance)

export default {
  components: {
    demo: Comp
  }
}
</script>