# Vue SFC 格式 文档页面
Vue SFC 格式的 文档页面 通过页面加载器 `@idux/archive-page-loader-vue` 进行解析以及渲染

## 使用

```bash
pnpm add @idux/archive-page-loader-vue
```

```js
import { defineConfig } from '@idux/archive'
import { createVuePageLoader } from '@idux/archive-page-loader-vue'

export default defineConfig({
  ...
  pageLoaders: [createVuePageLoader()], // [!code ++]
  ...
})
```

配合 `vue3` 的 `vite` 插件 `@vitejs/plugin-vue`，即可实现对vue3文档页面的引入

由于目前 `.md` 文件会被内置插件转换成 vue SFC，因此 `.md` 文件也依赖该页面加载器进行渲染。

## 页面加载器配置

即 `createVuePageLoader` 的参数

__`createVuePageLoader` 类型定义__

```ts
export function createVuePageLoader(options?: VuePageLoaderOptions): ArchivePageLoader
```

__`VuePageLoaderOptions` 类型定义__

```ts
interface VuePageLoaderOptions {
  matched?: (src: string) => boolean
  setup?: string
}
```

### `matched`

- 类型：`string`
- 是否可选：是
- 默认: `(src) => /\.(vue|md)$/.test(src)`

判断引入的文件路径是否通过该加载器进行处理, 默认匹配所有 `.vue` 以及 `.md` 文件

### `setup`

- 类型：`string`
- 是否可选：是

初始化的脚本路径，可以使用该脚本对页面 vue 实例所在的 app 上下文进行初始化，也可以用来执行其他的初始化逻辑。同时可以自定义所在 app 的渲染。

脚本为一个 `.ts` 或者 `.js` 类型文件，使用 `esm` 默认导出以下类型：

```ts
export interface VueAppSetup {
  setupApp?: (app: App) => void
  renderApp?: (nodes: VNode[]) => VNodeChild
}
```

- __setupApp__

demo 所在的 vue app 的初始化执行函数，它会在 app 挂载前执行，可以用在注册组件或者添加全局配置等。

- __renderApp__

demo 所在的 vue app 的自定义渲染函数，通常用来加入一些自定义的包裹容器，例如 `IxMessageProvider`等。

