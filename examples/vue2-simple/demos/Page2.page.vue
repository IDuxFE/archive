<template>
  <div ref="el">
  </div>
</template>

<script lang="ts">
import item from 'archive-page:./demoPage1/HelloWorld.demo.vue';

export default {
  mounted() {
    item.instance.mount(this.$refs.el)
  },
  beforeDestroy() {
    item.instance.unmount()
  }
}
</script>