<template>
  <div>
    <DemoComp>
    </DemoComp>
    <Comp :msg="msg" />
    <button @click="changeMsg">Change Msg</button>
  </div>
</template>

<script lang="ts">
import item from 'archive-demo:./demoPage1/HelloWorld.demo.vue';
import instaceItem from 'archive-page:./demoPage1/HelloWorld.vue'
import { createDemoInstance } from '@idux/archive-app/createDemoInstance'
import { createComponent } from '@idux/archive-loader-vue2/client'

const demoInstance = createDemoInstance(item)
const DemoComp = createComponent(demoInstance)
const Comp = createComponent(instaceItem.instance, { msg: String })

export default {
  components: {
    DemoComp,
    Comp,
  },
  data: () => ({
    msg: new Date().toLocaleString()
  }),
  methods: {
    changeMsg() {
      this.msg = new Date().toLocaleString()
    }
  }
}
</script>