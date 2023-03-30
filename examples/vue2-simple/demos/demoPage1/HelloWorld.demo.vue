<script lang="ts">
import HelloWorld from './HelloWorld.vue'
export default {
  components: {
    HelloWorld
  },
  data: () => ({
    msg: 'Vite + Vue'
  }),
  methods: {
    change() {
      this.msg = this.msg + '1'
      console.log('change')
    }
  },
}
</script>

<template>
  <div>
    <h1>Demo111</h1>
    <HelloWorld :msg="msg" />
    <button @click="change">change</button>
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