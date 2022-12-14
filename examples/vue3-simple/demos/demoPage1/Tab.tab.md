## Title

You can write Markdown as your component or lib documentations

### Usage Casces

1. use *.tab.{md,vue} file as a page tab
> this behaviour can be modified by customizing `navConfig` option

2. use *.demo.vue as vue3 demo
> this behaviour can be modified by customizing `matchPattern` and `ignorePattern` of collectors and `navConfig` option

## code

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

> 当 `mode` 不为 `link` 时，除以下表格之外还支持原生 `button` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button)。  
> 当 `mode` 为 `link` 时，除以下表格之外还支持原生 `a` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)。

| th1 | th2 | th3  |
| --- | --- | --- |
| td1 | td2 | td3 |