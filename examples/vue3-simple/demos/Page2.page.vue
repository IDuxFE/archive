<template>
  <DemoComp :demo-item="item"></DemoComp>
  <Comp/>
</template>

<script setup lang="ts">
import item from 'archive-demo:./demoPage1/HelloWorld.demo.vue';
import { DemoComp } from '@idux/archive-app/components'
import { createComponent } from '@idux/archive-loader-vue/client'

const Comp = createComponent(item.instance)

</script>