# Vue SFC 格式 demo

Vue SFC 格式的 demo 通过收集器 `@idux/archive-collector-vue` 进行解析以及渲染

## 使用

需要引入收集器 `@idux/archive-collector-vue` 来解析和渲染 vue SFC 格式的 demo，在配置文件中添加以下代码：

```js
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from '@idux/archive'
import { createVuePageLoader } from '@idux/archive-page-loader-vue'
import { createVueCollector } from '@idux/archive-collector-vue'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: resolve(__dirname, './docs'),
  theme: {
    themeStyle: 'seer',
    layout: {
      type: 'sider',
    },
  },
  pageLoaders: [createVuePageLoader()],
  collectors: [createVueCollector({ matchPattern: '**/*.demo.vue' })], // [!code ++]
})
```

## Demo 编写

### Demo 主体

与普通 vue SFC 写法一致

### Demo 元信息

通过添加 `<archie-meta>...</archie-meta>` block 来设置元信息，内容为 `json` 格式。

其中包含以下几项：

| 名称 | 类型 | 描述 |
| - | -- | --- |
| title | `string` | demo 标题 |
| description | `string` | demo 描述 |
| dependencies | `string[]` | demo 依赖文件的路径，相对路径或者绝对路径。<br/>如果提供依赖文件，则在源码展示中会将依赖的代码也显示出来 |

## Collector 配置

<!-- ### 基础配置

继承自 `Collector` 类型，详情请查看 // TODO -->

### setup

- 类型：`string`
- 是否可选：是

demo 初始化脚本的路径，可以使用该脚本对 demo vue 实例所在的 app 上下文进行初始化，也可以用来执行其他的初始化逻辑。同时可以自定义 demo 所在 app 的渲染。

脚本为一个 `.ts` 或者 `.js` 类型文件，使用 `esm` 默认导出以下类型：

```ts
interface VueCollectorSetup {
  setupApp?: (app: App) => void
  renderApp?: (children: VNode[]) => VNode
}
```

- __setupApp__

demo 所在的 vue app 的初始化执行函数，它会在 app 挂载前执行，可以用在注册组件或者添加全局配置等。

- __renderApp__

demo 所在的 vue app 的自定义渲染函数，通常用来加入一些自定义的包裹容器，例如 `IxMessageProvider`等。

__示例__: 

```ts
import '@idux/cdk/index.css'
import '@idux/components/style/core/reset.seer.css'
import '@idux/components/seer.css'
import '@idux/pro/seer.css'

import type { VueCollectorSetup } from '@idux/archive-collector-vue'
import type { IconDefinition } from '@idux/components/icon'

import { App, h } from 'vue'

import components from '@idux/components'
import { createGlobalConfig } from '@idux/components/config'
import { IxDrawerProvider } from '@idux/components/drawer'
import * as IduxIcons from '@idux/components/icon'
import { IxLoadingBarProvider } from '@idux/components/loading-bar'
import { IxMessageProvider } from '@idux/components/message'
import { IxModalProvider } from '@idux/components/modal'
import { IxNotificationProvider } from '@idux/components/notification'
import pro from '@idux/pro'
import { createGlobalConfig as createProGlobalconfig } from '@idux/pro/config'

export default {
  setupApp(app: App) {
    app
      .use(components)
      .use(pro)
      .use(
        createGlobalConfig({
          common: {
            prefixCls: 'ix',
          },
          icon: {
            loadIconDynamically(name) {
              return Promise.resolve((IduxIcons as unknown as Record<string, IconDefinition>)[changeCase(name)].svg)
            },
          },
        }),
      )
      .use(
        createProGlobalconfig({
          common: {
            prefixCls: 'ix-pro',
          },
        }),
      )
  },
  renderApp(children) {
    return h(IxMessageProvider, () =>
      h(IxModalProvider, () =>
        h(IxDrawerProvider, () => h(IxNotificationProvider, () => h(IxLoadingBarProvider, () => children))),
      ),
    )
  },
} as VueCollectorSetup

function changeCase(iconName: string) {
  return iconName
    .replace(/^([a-z])/, (_, $1) => $1.toUpperCase())
    .replace(/(-([a-z]))/g, (_, $1, $2) => $2.toUpperCase())
}
```

以上示例展示了 IDUX 组件库的 demo 初始化过程，其中包含以下几个部分：

1. 全局注册全部组件库
2. 注册全局配置，固定前缀避免冲突
3. 注册 IDUX 组件图标加载方法
4. 自定义APP渲染，在最外层包裹全部会用到的 `Provider`
5. 引入组件样式