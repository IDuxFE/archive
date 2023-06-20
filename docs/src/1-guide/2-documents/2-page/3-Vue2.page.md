# Vue2 文档页面
Vue2 SFC 格式的 文档页面 通过Loader `@idux/archive-loader-vue2` 进行解析以及渲染

`@idux/archive-loader-vue2` 是实现了 `@idux/archive-vite-plugin`插件 约束的 `Loader` 类型的Loader，作为 `loaders` 参数传入

详细的插件相关介绍以及 `Loader` 的类型定义，请查看 [Loader](/loader/Brief/)

## 使用

```bash
pnpm add @idux/archive-loader-vue2
```

```js
const { defineConfig } = require('@idux/archive')
const { createArchiveVue2PageLoader } = require('@idux/archive-loader-vue2')

module.exports = defineConfig({
  ...
  pageLoaders: [createArchiveVue2PageLoader()],
  ...
})

```

配合 `vue2` 的 `vite` 插件 `vite-plugin-vue2`，即可实现对vue2文档页面的引入

由于目前 `.md` 文件会被内置插件转换成 vue SFC，因此 `.md` 文件也依赖该页面Loader进行渲染。

## Loader配置

参考 [Vue Loader](/loader/vue/LoaderOptions/)
