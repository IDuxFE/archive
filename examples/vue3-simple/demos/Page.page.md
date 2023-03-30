<script setup lang="ts">
import item from 'archive-demo:./demoPage1/HelloWorld.demo.vue';
import { DemoComp } from '@idux/archive-app/components'

</script>

# CustomPage

*.page.{md,vue} file can be parsed as an individual page

> this behaviour can be modified by customizing `navConfig`

## title1

### title1-1

## code

write any code

```vue
<script setup lang="ts">
import HelloWorld from '../src/components/HelloWorld.vue'
</script>

<template>
  <div>
    <h1>Demo111</h1>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
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
```

## table

write markdown table

| th1 | th2 | th3  |
| --- | --- | --- |
| td1 | td2 | td3 |


<DemoComp :demo-item="item"></DemoComp>