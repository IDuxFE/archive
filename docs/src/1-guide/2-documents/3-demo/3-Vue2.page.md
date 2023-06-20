# Vue2 Demo

Vue2 SFC 格式的 demo 通过Loader `@idux/archive-loader-vue2` 进行解析。

## 引入

需要引入Loader `@idux/archive-loader-vue2` 来解析 vue2 SFC 格式的 demo，在配置文件中添加以下代码：

```js
const { defineConfig } = require('@idux/archive')
const { createArchiveVue2DemoLoader } = require('@idux/archive-loader-vue2')

module.exports = defineConfig({
  ...
  demoLoaders: [createArchiveVue2DemoLoader()],
  ...
})
```

## Demo 编写

参考 [Vue2 Loader](/loader/vue2/Usage/)