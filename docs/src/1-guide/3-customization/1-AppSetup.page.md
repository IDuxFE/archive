# App 自定义

Idux Archive 会将解析后的应用配置传递给应用框架进行组装和展示。

Idux Archive 内置的 App 框架是使用 `vue3` 以及 `idux` 组件开发的应用框架， 支持一定程度上的自定义能力。

## 自定义渲染

App 框架的自定义渲染函数需要首先配置 `setupFile` 指定初始化脚本路径，并在初始化脚本文件中编写自定义渲染函数。

> 有关 `Archive` 配置相关内容请查看：[Archive 配置](/config/Basic/)

由于 App 框架需要隔离所有与外部使用可能冲突的依赖，因此会将 `vue` 以及使用到的 `idux` 组件打包到 App 内部并导出，所以在编写自定义渲染函数时，生成 `Vnode` 的 `h` 函数需要使用 App 框架导出的方法而不能引入 `vue` 暴露的 API。

例如，如果需要自定义导航头部，需要首先在配置文件中添加以下内容：

```ts
const { resolve } = require('path')
const { defineConfig } = require('@idux/archive')
const { createArchiveVuePageLoader, createArchiveVueDemoLoader } = require('@idux/archive-loader-vue')

const __dirname = dirname(fileURLToPath(import.meta.url))

const resolveSrc = (dir, file) => resolve(dir, file).replaceAll(/\\/g, '\\\\')

export default defineConfig({
  root: resolve(__dirname, './demos'),
  setupFile: '/setup.ts', // [!code ++]
  ...
})
```

并在初始化脚本 `setup.ts` 中添加以下内容：

```ts
import type { SetupContext } from '@idux/archive-types'

import 'custom-style.css'

import { BugFilled, addIconDefinitions, IxButton } from '@idux/archive-app/components'
import { h } from '@idux/archive-app/vue'

export default {
  setupApp: () => {
    addIconDefinitions([BugFilled, Bug])
  },
  renderers: {
    layoutHeaderContent(data, nodes) {
      return [
        nodes,
        h(IxButton, { class: 'report-bug' icon: 'bug-filled', title: '报告bug' })
      ]
    }
  }
} as SetupContext
```

以上代码：

1. 在 app 的 setup 阶段注册了 `BugFilled` 图标。
2. 自定义了头部渲染，在默认渲染的节点后增加了一个用来报告bug的按钮。
3. 添加了自定义样式文件 `custom-style.css`。

更多自定义渲染函数请查看：[初始化脚本](/config/Setup/)。

## 自定义配置

除了自定义渲染，App 框架还支持一些自定义配置，同样需要在初始化脚本中提供。

例如，基于以上的的初始化脚本，如果需要配置不同的 `demo` 所支持的工具栏工具，需要增加以下代码：

```ts
import type { SetupContext } from '@idux/archive-types'

import 'custom-style.css'

import { BugFilled, addIconDefinitions, IxButton } from '@idux/archive-app/components'
import { h } from '@idux/archive-app/vue'

export default {
  setupApp: () => {
    addIconDefinitions([BugFilled, Bug])
  },
  renderers: {
    layoutHeaderContent(data, nodes) {
      return [
        nodes,
        h(IxButton, { class: 'report-bug' icon: 'bug-filled', title: '报告bug' })
      ]
    }
  },
  options: { // [!code ++]
    getDemoTools(demo) { // [!code ++]
      if (/\/external/.test(demo.relativePath)) { // [!code ++]
        return [{ type: 'link', link: 'http://external.com' + demo.filename, tooltip: '外部链接' }]  // [!code ++]
      } // [!code ++]
    } // [!code ++]
  } // [!code ++]
} as SetupContext
```

以上代码添加了自定义配置，在处于 `external` 文件夹下的 `demo` 下添加一个连接按钮打开外部链接。

更多自定义配置请查看：[初始化脚本](/config/Setup/)。
