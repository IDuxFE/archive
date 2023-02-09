# 页面加载器

`@idux/archive` 内部通过不同的页面加载器来将引用的页面处理成框架无关的统一实例对象，之后在 Web UI 界面中将页面渲染出来。

因此，一个页面加载器需要具备以下条件：

1. 实现全部实例定义的接口。
2. 独立或借助其他vite插件实现对引入内容的转义。
3. 处理并生成可独立渲染的页面实例，并与 Web UI 本身无冲突，无依赖。

页面加载器通过 `archive.config.js` 配置文件中的 `pageLoaders` 进行配置。

## 页面实例类型

`PageContentInstance` 的类型定义如下：

```ts
interface PageContentInstance {
  mount: (el: HTMLElement) => void
  unmount: () => void
}
```
### `mount`

用来将实例挂载到指定的 HTML 元素上。

### `unmount` 

用来将实例卸载

## 页面加载器类型

`ArchivePageLoader` 的类型定义如下：

```ts
export interface ArchivePageLoader {
  matched: (src: string) => boolean
  resolver: (absolutePath: string) => string | Promise<string>
}
```

### `matched`

判断引入的文件路径是否通过该加载器进行处理。

### `resolver`

接收引入文件的绝对路径，并将其转化为默认导出页面实例的js或ts代码字符串。

## 内置页面加载器

### Vue3 页面加载器

`@idux/archive-page-loader-vue`

### 使用

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

