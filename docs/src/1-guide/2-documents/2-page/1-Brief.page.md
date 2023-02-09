# 文档页面编写

每一个文档页面，均包含多种属性，且具有多种呈现形式，这些属性的最终解析结果会交给 Web UI 来渲染出具体的页面。

页面信息作为导航配置的一部分，可以由 `navConfig` 配置项自定义，下面关于页面文档编写的说明，全部基于对于导航配置信息已经了解的前提下，关于 `navConfig` 请查看[导航配置](/guide/documents/Nav/)

仅仅在导航项的数据类型为 `ItemNavRecord` 时，该导航才会对应一个可渲染的页面，根据其包含的页面数据信息 `pageData` 不同，渲染的结果也不尽相同

## 单文件文档页面

如果 `pageData` 中存在且仅存在 `src` 属性， 则该导航对应的页面是一个 __单文件文档页面__，配置的 `src` 属性是该页面文件的路径，通常是一个绝对路径。

页面文件的解析和渲染，需要配合对应的 `PageLoader`。

例：

```js
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from '@idux/archive'
import { createVuePageLoader } from '@idux/archive-page-loader-vue'

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
  navConfig(_, root) {
    return [{
      id: 'pageId',
      type: 'item',
      pageData: {
        title: '单文件文档页面',
        description: '描述。。。',
        src: resolve(root, 'path/to/page.vue'),
      }
    },
    ...]
  }
})
```

## Demo 页面

如果 `pageData` 中存在且仅存在 `demoIds` 属性， 则该导航对应的页面是一个 __Demo 页面__。

例：

```js
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from '@idux/archive'
import { createVuePageLoader } from '@idux/archive-page-loader-vue'

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
  navConfig(demos, root) {
    return [{
      id: 'pageId',
      type: 'item',
      pageData: {
        title: 'Demo 页面',
        description: '描述。。。',
        demoIds: [demos.map(demo => demo.id)],
      }
    },
    ...]
  }
})
```

## 多标签文档页面

如果 `pageData` 中存在且仅存在 `tabs` 属性，则该导航对应的页面是一个 __多标签文档页面__。每个标签页通过以下配置来展示不同类型的内容。

__PageTab__

标签页数据

```ts
interface BasePageTab {
  id: string
  name: string
  src: string
  demoIds: string[]
}
export type PageTab = RequireExactlyOne<BasePageTab, 'src' | 'demoIds'>
```

### 单文件标签页

如果 `pageTab` 中存在且仅存在 `src` 属性， 则该标签页是一个 __单文件标签页__，配置的 `src` 属性是文件的路径，通常是一个绝对路径。

与单文件文档页面相同，需要配合对应的 `PageLoader`。

### Demo 标签页

如果 `pageData` 中存在且仅存在 `demoIds` 属性， 则该导航对应的页面是一个 __Demo 标签页__。

### 示例

```js
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from '@idux/archive'
import { createVuePageLoader } from '@idux/archive-page-loader-vue'

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
  navConfig(demos, root) {
    return [{
      id: 'pageId',
      type: 'item',
      pageData: {
        title: '单文件文档页面',
        description: '描述。。。',
        tabs: [{ // 单文件标签页
          id: 'tab1',
          name: '文档',
          src: resolve(root, 'path/to/page-tab.vue')
        }, { // Demo 标签页
          id: 'tab2',
          name: 'Demos',
          demoIds: [demos.map(demo => demo.id)],
        }],
      }
    },
    ...]
  }
})
```

## 页面加载器

请查看[页面加载器](/guide/customization/PageLoader/)