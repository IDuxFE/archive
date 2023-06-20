# 快速上手

这个章节将会帮助你在已有的基于 __vite__ 的 __Vue__ 项目中 引入 Idux Archive 用以维护项目的文档，默认使用 `pnpm` 管理依赖。

如果你需要了解如何创建一个新的项目，可以参照对应框架的文档。

## 步骤1：安装 @idux/archive 及相关依赖

> 全部的 npm 包及其描述请参照 [相关 npm 包](/guide/introdoction/Introdoction/#相关-npm-包)

``` bash
pnpm add -D @idux/archive @idux/archive-loader-vue @idux/archive-utils vite
```

::: info 注：这里引入了 @idux/archive-utils 以便使用暴露的工具函数，非必须
:::

## 步骤2：创建文档根目录

创建后的文档目录结构大致如下：

```
.
├─ docs // [!code ++]
├─ package.json
└─ vite.config.ts
```

## 步骤3：创建配置文件并添加配置项

```
.
├─ docs
├─ package.json
├─ vite.config.ts
└─ archive.config.js // [!code ++]
```

在配置文件中添加以下代码：

```js
const { resolve } = require('path')
const { defineConfig } = require('@idux/archive')
const { createArchiveVuePageLoader, createArchiveVueDemoLoader } = require('@idux/archive-loader-vue')

module.exports = defineConfig({
  root: resolve(__dirname, './demos'),
  theme: {
    themeStyle: 'seer',
    layout: {
      type: 'sider',
    },
  },
  pageLoaders: [createArchiveVuePageLoader()],
  demoLoaders: [createArchiveVueDemoLoader()],
})
```

::: warning 注：Idux Archive 当前版本仅支持 `.js` 格式文件
:::

在 `vite.config.ts` 文件中，将 `vue` 插件的 `include` 配置设置为支持 `.md` 格式文件，Idux Archive 内置了加载解析 `.md` 文件为 vue SFC 文件的插件，以便将 `.md` 文件作为 vue 组件处理。

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({ include: [/\.(vue|md)$/] }),
  ]
})
```

基于以上配置：
- `docs` 目录结构会被解析成导航结构，全部 `.page.vue` 以及 `.page.md` 文件将被加载为文档页面。
- 全部 `.demo.vue` 文件将被当作基于 Vue 的 demo 被收集，可以通过导航自定义的形式将 demo 绑定到某个页面。

> 导航结构配置相关请查看

> Page Loader 相关内容请查看

> Demo Collector 相关请查看

## 步骤4：编写第一个文档页面

添加一个 `.md` 文件作为页面

```
.
├─ docs
│  └─ Introdoction.page.md // [!code ++]
├─ package.json
├─ vite.config.ts
└─ archive.config.js
```

- __Introdoction.page.md__

```md
# 介绍

这里是介绍
```

当然，你可以编写一个 Vue 组件作为页面，这种情况下通常会需要一些初始化内容，详情请见 app setup

## 步骤5：编写第一个Demo页面

默认在一个文件夹中的全部 demo 会被放在同一个页面中，也可以通过自定义导航结构改变该行为。

添加以下目录结构

```
.
├─ docs
|  ├─ Introdoction.page.md
│  └─ demoPage // [!code ++]
|     ├─ HelloWorld.vue // [!code ++]
|     ├─ Demo1.demo.vue // [!code ++]
|     └─ Demo2.demo.vue // [!code ++]
├─ package.json
├─ vite.config.ts
└─ archive.config.js
```

- __Demo1.demo.vue__

```vue
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <div>
    <h1>Demo2</h1>
  </div>
</template>
```

- __Demo2.demo.vue__

```vue
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './HelloWorld.vue'
</script>

<template>
  <div>
    <h1>Demo111</h1>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<archive-meta lang="json">
{
  "title": "demo1",
  "description": "description",
  "dependencies": [
    "./HelloWorld.vue"
  ]
}
</archive-meta>
```

`<archive-meta>...</archive-meta>` 中的内容是 demo 的元信息配置。

以上的demo是通过 Vue 的 loader 处理的 demo, 也可以自定义支持其他形式的 demo。

更多详情请查看 [Loader](/loader/Brief)。

## 步骤6：添加相关脚本到 `package.json`

```json
{
  ...
  "scripts": {
    "dev": "archive dev", // [!code ++]
    "build": "archive build", // [!code ++]
    "build:pages": "archive build -t page", // [!code ++]
    "build:instances": "archive build -t instance" // [!code ++]
  },
  ...
}

```

以上脚本：
1. 运行 `npm run dev` 开启本地服务进行调试。
2. 运行 `npm run build` 执行构建，构建目标默认为 app，即打包成完整的可部署的应用。
3. 运行 `npm run build:pages` 执行页面构建，构建目标为 page，打包后的内容以esm形式提供，每个文档页面都会作为一个单独的vue3组件导出
3. 运行 `npm run build:instances` 执行页面实例，构建目标为 instance，打包后的内容以esm形式提供，每个文档页面都会作为一个单独的框架无关的实例导出，运行实例的mount和unmount可以实现挂着和卸载

至此，项目文档搭建的第一步已经完成，继续补充项目文档吧！

如果需要更多的自定义能力，或者需要了解更详细的用法，请参考其他章节。