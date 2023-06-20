# 基础使用

## 介绍

Vue2 SFC 格式的文件通过Loader `@idux/archive-loader-vue` 进行解析。

`@idux/archive-loader-vue` 暴露了 `createArchiveVueLoader` 创建 Loader。

同时暴露了 `createArchiveVuePageLoader` 以及 `createArchiveVueDemoLoader` 用于页面和Demo的解析，其均为对 `createArchiveVueLoader` 调用的封装，预指定了Loader的解析前缀。

## 安装

```bash
pnpm add @idux/archive-loader-vue
```

## 引入

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

## 组件编写

### 主体内容

与编写普通的 vue SFC 文件一致

### 元信息

通过 `<archive-meta>` 自定义 block 编写，详细配置内容请参考：[元信息](/loader/vue/Meta/)