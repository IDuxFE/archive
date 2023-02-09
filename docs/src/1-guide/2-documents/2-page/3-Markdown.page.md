# Markdown 格式 文档页面

由于目前 `.md` 文件会被内置插件转换成 vue SFC，因此 `.md` 文件的处理与 `.vue` 文件相同，仅需要注意，需要配置 `@vitejs/plugin-vue` 的 `include` 允许接收 `.md` 文件即可。

示例如下：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ include: [/\.(vue|md)$/] }),
  ]
})

```