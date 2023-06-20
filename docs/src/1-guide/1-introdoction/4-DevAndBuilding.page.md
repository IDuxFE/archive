# 本地调试与打包

Idux Archive 的**本地调试**以及**打包**均基于**vite**实现，因此需要依赖于**vite**, 同时可以通过 `vite.config.ts` 配置文件修改相关配置

以下内容均基于下面几条约定：
1. 所有的文档以及 demo 均在 `docs` 文件目录下
2. 打包的目标文件夹为 `dist` 目录
3. `package.json` 中包含以下脚本

```json
{
  ...
  "scripts": {
    "dev": "archive dev",
    "build": "archive build",
    "build:pages": "archive build -t page",
    "build:instances": "archive build -t instances"
  },
  ...
}
```

4. 文档项目的 `archive.config.js` 配置文件初始内容如下：

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

5. 文档项目的 `vite.config.ts` 配置文件初始内容如下：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ include: [/\.(vue|md)$/] }),
  ],
  server: { hmr: true },
})

```

:::warning 特别注意：
该文档项目的打包以及本地调试阶段，均使用 `esm` 形式，不支持 `esm` 的浏览器将不能查看。
:::

## 本地调试

- __运行以下命令启动项目的本地服务__

```bash
$ npm run dev
```

默认端口为 `8080`

即，项目运行在 `http://localhost:8080`

- __通过 `-p` 或者 `--port` 指定服务端口__

```json
{
  ...
  "scripts": {
    "dev": "archive dev --port 4171"
  },
  ...
}
```

这样，在执行 `dev` 之后，项目将运行在 `http://localhost:4171`

- __通过 `-r` 或者 `--root` 指定项目根目录，即 `archive.config.js` 存在的目录

项目目录默认为命令执行的 `cwd`

```json
{
  ...
  "scripts": {
    "dev": "archive dev --root ./docs_root"
  },
  ...
}
```

以上命令，指定工作空间根目录为 `./docs_root`，而不是 `cwd`

## 打包

### 打包为可部署应用

执行以下命令：

```bash
$ npm run build
```

可以将整个文档项目打包成最终可部署的应用，包含全部静态文件以及入口html。

生成的目录结构如下：

```
.
├─ dist // [!code ++]
|  ├─ assets // [!code ++]
|  |  └─ ... // [!code ++]
|  └─ index.html // [!code ++]
├─ docs
├─ package.json
└─ vite.config.ts
```

- __通过 `-r` 或者 `--root` 指定项目根目录，即 `archive.config.js` 存在的目录__

项目目录默认为命令执行的 `cwd`

```json
{
  ...
  "scripts": {
    "build": "archive build --root ./docs_root"
  },
  ...
}
```

- __配置打包目标文件夹__

在 `archive.config.js` 配置中配置 `dist` 属性改变打包目标文件夹，默认为根目录下的 `dist` 文件夹

例如增加如下配置后：

```js
export default defineConfig({
  root: resolve(__dirname, './demos'),
  dist: './custom-dist', // [!code ++]
  theme: {
    themeStyle: 'seer',
    layout: {
      type: 'sider',
    },
  },
  pageLoaders: [createVuePageLoader()],
  collectors: [createVueCollector({ matchPattern: '**/*.demo.vue' })],
})
```

打包后的目录结构将变成如下：

```
.
├─ custom-dist // [!code ++]
|  ├─ assets // [!code ++]
|  |  └─ ... // [!code ++]
|  └─ index.html // [!code ++]
├─ docs
├─ package.json
└─ vite.config.ts
```

### 打包为页面组件

执行以下命令：

```bash
$ npm run build:pages
```

可以将文档项目打包成 `esm` 形式的模块，其中每个文档页面将会作为一个独立的 vue 组件被导出。

导出的变量类型如下：

| 变量 | 类型 | 描述 |
| - | --- | ----- |
| pages | `Record<string, Component>` | 以对象形式提供的页面组件，键对应了页面的在app中的路由路径，值则是 vue 组件 |
| navRecords | `NavRecord[]` | 应用的完整导航信息，可用于处理导出的页面组件 |

> 关于 `NavRecord` 的描述详情请查看 [导航配置](/guide/documents/Nav)

通过这样的导出方式，可以将文档的页面以组件的形式添加到已有的 vue 项目当中，可以作为某个页面的子组件，也可以作为单独的页面，方便独立站点框架的完全自定义。


打包后的目录结构将变成如下：

```
.
├─ dist // [!code ++]
|  ├─ ... // [!code ++]
|  └─ index.js // [!code ++]
├─ docs
├─ package.json
└─ vite.config.ts
```

- __配置打包目标文件夹__

同[打包为可部署应用](#打包为可部署应用)

### 打包为页面 instance

基于[打包为页面组件](#打包为页面组件)的场景，如果页面组件需要添加到的项目并不是基于 vue 的项目，那么可以使用这种打包方式，打包出完全框架无关的页面 instance

| 变量 | 类型 | 描述 |
| - | --- | ----- |
| instances | `Record<string, PageInstance>` | 以对象形式提供的页面 instance，键对应了页面的在app中的路由路径，值则是 vue 组件 |
| navRecords | `NavRecord[]` | 应用的完整导航信息，可用于处理导出的页面组件 |

```ts
interface PageInstance {
  mount: (el: HTMLElement) => void
  unmount: () => void
}
```

页面的 instance 仅仅需要在项目中执行 `mount` 函数就可以渲染到页面上，在需要销毁的时候调用 `unmount` 即可。

打包后的目录结构将变成如下：

```
.
├─ dist // [!code ++]
|  ├─ ... // [!code ++]
|  └─ index.js // [!code ++]
├─ docs
├─ package.json
└─ vite.config.ts
```

- __配置打包目标文件夹__

同[打包为可部署应用](#打包为可部署应用)