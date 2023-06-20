# Loader参数

即 `createArchiveVueLoader` 的参数 `ArchiveLoaderVue2Options`

```ts
function createArchiveVueLoader(options?: ArchiveLoaderVue2Options): ArchiveLoaderVue2 {
  ...
}
```

```ts
interface ArchiveLoaderVue2Options extends SetOptional<Except<Loader, 'name'>, 'matched'> {
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

组件实例初始化脚本的路径，可以使用该脚本对 组件vue 实例所在的 app 上下文进行初始化，也可以用来执行其他的初始化逻辑。同时可以自定义组件实例所在 app 的渲染。

脚本为一个 `.ts` 或者 `.js` 类型文件，使用 `esm` 默认导出以下类型：

```ts
interface ArchiveLoaderVue2Setup {
  customOptions?: ComponentOptions<Vue>
  setupApp?: (app: InstanceType<VueConstructor>) => void
  renderApp?: (children: VNode[]) => VNode
}
```

- __customOptions__

`new Vue(...)` 的额外参数添加，可以用来添加 `provide`, `watch` 等。

- __setupApp__

组件实例所在的 vue app 的初始化执行函数，它会在 app 挂载前执行，可以用在注册组件或者添加全局配置等。

- __renderApp__

组件实例所在的 vue app 的自定义渲染函数，通常用来加入一些自定义的包裹容器，例如 `IxMessageProvider`等。

__示例__: 

```ts
import type { ArchiveLoaderVue2Setup } from '@idux/archive-loader-vue2'
import Vue from 'vue'
import CompositionApi, { h } from '@vue/composition-api'
import i18n from 'i18n'

export default {
  setupApp(app: Vue) {
    app
      .use(CompositionApi)
      .use(i18n)
  },
  renderApp(children) {
    return h('div', { class: 'demo-wrapper' }, children)
  },
  customOptions: {
    provide: {
      foo: {
        a: 1
      }
    }
  }
} as ArchiveLoaderVue2Setup
```

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
