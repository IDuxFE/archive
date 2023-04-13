<template>
  <DemoComp :demo-item="item"></DemoComp>
  <Comp :msg="msg" />
  <button @click="changeMsg">Change Msg</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import item from 'archive-demo:./demoPage1/HelloWorld.demo.vue';
import instanceItem from 'archive-demo:./demoPage1/HelloWorld.vue';
import { DemoComp } from '@idux/archive-app/components'
import { createComponent } from '@idux/archive-loader-vue/client'

const msg = ref(new Date().toISOString())
const Comp = createComponent(instanceItem.instance, { msg: String } as const)

const changeMsg = () => {
  msg.value = new Date().toISOString()
}

</script>