# Vue Demo

Vue SFC 格式的 demo 通过Loader `@idux/archive-loader-vue` 进行解析。

## 引入

需要引入Loader `@idux/archive-loader-vue` 来解析 vue SFC 格式的 demo，在配置文件中添加以下代码：

```js
const { defineConfig } = require('@idux/archive')
const { createArchiveVueDemoLoader } = require('@idux/archive-loader-vue')

module.exports = defineConfig({
  ...
  demoLoaders: [createArchiveVueDemoLoader()],
  ...
})
```

## Demo 编写

参考 [Vue Loader](/loader/vue/Usage/)