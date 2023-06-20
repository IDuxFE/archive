# Loader参数

即 `createArchiveVueLoader` 的参数 `ArchiveLoaderVueOptions`

```ts
function createArchiveVueLoader(options?: ArchiveLoaderVueOptions): ArchiveLoaderVue {
  ...
}
```

```ts
interface ArchiveLoaderVueOptions extends SetOptional<Except<Loader, 'name'>, 'matched'> {
  setup?: string
  srcDir?: string
  includeMeta?: boolean
  includeSourceCodes?: boolean
}
```

`ArchiveLoaderVueOptions` 继承自 `Loader`，参考 [Loader](/loader/Brief)

## 配置内容

### setup

- 类型：`string`
- 是否可选：是

组件实例初始化脚本的路径，可以使用该脚本对 vue 实例所在的 app 上下文进行初始化，也可以用来执行其他的初始化逻辑。同时可以自定义组件所在 app 的渲染。

脚本为一个 `.ts` 或者 `.js` 类型文件，使用 `esm` 默认导出以下类型：

```ts
interface ArchiveLoaderVueSetup {
  setupApp?: (app: App) => void
  renderApp?: (children: VNode[]) => VNode
}
```

- __setupApp__

组件实例所在的 vue app 的初始化执行函数，它会在 app 挂载前执行，可以用在注册组件或者添加全局配置等。

- __renderApp__

组件实例所在的 vue app 的自定义渲染函数，通常用来加入一些自定义的包裹容器，例如 `IxMessageProvider`等。

__示例__: 

```ts
import '@idux/cdk/index.css'
import '@idux/components/style/core/reset.seer.css'
import '@idux/components/seer.css'
import '@idux/pro/seer.css'

import type { ArchiveLoaderVueSetup } from '@idux/archive-loader-vue'
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
} as ArchiveLoaderVueSetup

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

### srcDir

- 类型：`string`
- 是否可选：是

### includeMeta

- 类型：`boolean`
- 是否可选：是

是否需要解析元信息，如果不解析则仅会解析 `Instance` 内容。

### includeSourceCodes

- 类型：`boolean`
- 是否可选：是

是否需要解析源码。
