# 内置默认导航与路由解析

如果在配置文件 `archive.config.js` 中不配置 `navConfig`，则会使用内置默认的解析方式来解析导航和路由，即根据目录结构解析。

## 单文件文档页面

在某一级目录中（包括根目录）创建以 `.page.{vue,md}` 结尾的文件，该文件将被解析为一个独立的文档页面，其不包括任何标签页

### 页面元信息

- 导航名称：文件名在 `.page.{vue,md}` 的部分
- ID：文件名在 `.page.{vue,md}` 的部分
- 标题：文件名在 `.page.{vue,md}` 的部分
- 描述：无

### Markdown 文档页面

内置的vite插件可以解析 `.md` 文件为vue SFC，前提是需要配置 `vite.config.ts` 的 `include` 字段接受 `.md` 文件，自此 md 文件将与 vue 文件一样都可作为 vue 组件被引入。

因此，创建 `.page.md` 结尾的文件将可以被解析成文档页面。

<!-- > 更多 Markdown 编写相关内容请查看 // TODO -->

### Vue 文档页面

基于 `@idux/archive-page-loader-vue`，Idux Archive 可以将 vue SFC 解析为 `PageInstance` 并添加为文档页面，在任意目录创建 `.page.vue` 结尾的文件即可。

> 关于 `Page Loader` 相关请查看[页面加载器](/guide/customization/PageLoader/)

## Demo 页面

创建一个文件夹，该文件夹中仅包含 `demo` 文件，同时不包含 `tab` 文件，则该文件夹作为一个 Demo 页面。

例如：

```
.
├─ docs
│  └─ demoPage
|     ├─ HelloWorld.vue
|     ├─ Demo1.demo.vue
|     └─ Demo2.demo.vue
```
`demoPage` 文件夹将被解析为一个 Demo 页面，包含 `Demo1.demo.vue`、`Demo2.demo.vue` 两个 demo。

::: info demo 除了 vue 格式以外还可以是其他的任何格式，具体请查看 // TODO
:::

### 页面元信息

- 导航名称：文件夹名称
- ID：文件夹名称
- 标题：文件夹名称
- 描述：无

## 多标签页面

创建一个文件夹，该文件夹中包含至少一个 `tab` 文件，包含0-n个 `demo` 文件，则该文件夹作为一个多标签页面。

例如：

```
.
├─ docs
│  └─ tabPage
|     ├─ Tab.tab.vue
|     └─ Demo.demo.vue
```

`tabPage` 文件夹作为一个多标签页面。

### `tab` 文件

一个多标签页面文件夹中所有的 `.tab.{vue,md}` 文件均会被解析成标签页，解析的原理和过程与[单文件文档页面](#单文件文档页面)相同。

#### tab 元信息解析

- ID：文件名在 `.tab.{vue,md}` 的部分
- tab名称：文件名在 `.tab.{vue,md}` 的部分

### Demo 标签页

一个多标签页面文件夹中所有的 `demo` 文件将被集中作为一个 Demo 标签页。

#### tab 元信息解析

- ID：`'demos'`
- tab名称：`'Demos'`

::: warning 注意，如果一个文件夹中已经有 `tab` 文件或者 `demo` 文件，其中的 `page` 文件将不会被解析
:::

## 父子导航

一个不包含任何 `tab` 文件或 `demo` 文件的文件夹，如果它拥有子文件夹，则该文件夹被解析为一个父级导航，其下的 `page` 文件以及子文件夹将被解析为子导航。

反之，如果该文件夹中有至少一个 `tab` 文件或 `demo` 文件，那么它不会被解析为父级导航，其下的子目录也不会被解析。

## 修改默认导航

可以通过`navConfig`来自定义导航，同时可以借助 `@idux/archive-utils` 中的函数来辅助自定义。 

<!-- // TODO 跳转 -->