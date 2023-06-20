# 在自编写页面中使用 Demo

Idux Archive 本质上通过 `@idux/archive-vite-plugin` 实现了对 `demo` 的解析，转换成统一的 `item`，因此除了利用 app 框架进行约定的 `demo` 组织，也可以只利用 `@idux/archive-vite-plugin` 的功能引入 `demo` 并自行编写页面。

## Demo 的引入

参考 [Loader](/loader/Brief/)。

## Demo 实例创建

`demo` 在加载之后需要通过一套 app 框架组织和渲染，而默认提供的 app 框架 `@idux/archvie-app` 则暴露了其内部 Demo 的完整展示组件。

为了在不同的框架下使用 Demo 组件，不用提供 `vue` 组件，而是一个 `Instance`, 通过暴露的 `createDemoInstance` 创建。

其声名如下：

```ts
function createDemoInstance(
  resolvedDemoItem: ResolvedDemoItem,
  tools?: DemoTool[],
  setupApp?: (app: App) => void
): Instance<object> {
  ...
}
```

> 有关 `DemoTool` 类型请参考 [初始化脚本](/config/Setup/)
> 有关 `ResolvedDemoItem` 类型请参考 [LoadedItem](/loader/Item/)

## 使用说明

### 在 vue3 文件中使用

`@idux/archive-loader-vue` 暴露了将 `instance` 转换为 `vue` 组件的方法 `createComponent`。

引入 `demo` 并创建了Demo实例之后，可以通过以下方式渲染 Demo：

```vue
<template>
  <DemoComp></DemoComp>
</template>

<script setup lang="ts">
import item from 'archive-demo:./demoPage1/HelloWorld.demo.vue';
import { createDemoInstance } from '@idux/archive-app/components'
import { createComponent } from '@idux/archive-loader-vue/client'

const DemoComp = createComponent(createDemoInstance(item))
</script>
```

### 在 vue2 文件中使用

`@idux/archive-loader-vue2` 也暴露了创建组件的方法。

```vue
<template>
  <DemoComp></DemoComp>
</template>

<script lang="ts">
import item from 'archive-demo:./demoPage1/HelloWorld.demo.vue';
import { createDemoInstance } from '@idux/archive-app/components'
import { createComponent } from '@idux/archive-loader-vue2/client'

const DemoComp = createComponent(createDemoInstance(item))

export default {
  components: {
    DemoComp,
  }
}
</script>
```

### 在 markdown 文件中使用

基于 `@idux/archive-vite-markdown-plugin`，`.md` 会被转换成 `vue SFC` 文件通过 `vue3` 或者 `vue2` 的 `vite` 插件解析。

可以通过以下方式使用：

```md
<script setup>
import item from 'archive-demo:./demoPage1/HelloWorld.demo.vue';
import { createDemoInstance } from '@idux/archive-app/components'
import { createComponent } from '@idux/archive-loader-vue/client'

const DemoComp = createComponent(createDemoInstance(item))
</script>

# Title

## Demos

### Demo1

this is demo

<DemoComp/>
```