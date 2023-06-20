# 介绍

Idux Archive 的核心插件 `@idux/archive-vite-plugin` 被用来将不同的文件解析成框架无关的 archive 实例并在 app 框架中挂载，但该插件本身只负责这个过程中的管理以及和 `vite` 本身的联动，并不具备实际的解析能力，解析会交给不同的 `Loader` 进行。

`@idux/archive-vite-plugin` 规定了 `Loader` 的接口，并在内部调用不同 `Loader` 的接口来执行对文件的加载和解析。

通过该插件，指定的虚拟文件路径会返回解析后的 `Item`

例如：

```ts
import ArchiveItem from 'archive:./path/to/component.vue'
```

`ArchiveItem` 即为解析后的 `ResolvedItem`。

可以使用如下语句执行解析后实例的挂载：

```ts
ArchiveItem.instance.mount(document.querySelector('#demo'))
```

Idux Archive 则基于以上原理进行管理和组装，实现了框架无关的 demo 文档管理。

## `@idux/archive-vite-plugin` 使用以及参数

插件创建函数定义如下：

```ts
function createArchivePlugin(options?: Options): Plugin
```

使用以下语句引用：

```ts
import { createArchivePlugin } from '@idux/archive-vite-plugin'
```

通过调用 `createArchivePlugin` 来创建 `vite` 插件。

`Options`类型定义如下

```ts
interface Options {
  root?: string
  loaders?: Loader[]
}
```

### root

解析所用的文件根目录，默认为 `vite` 配置中的 `root`。

## 更多

以上是对 `@idux/archive-vite-plugin` 以及 `Loader` 的内容介绍，我们当前提供了 `vue3` 和 `vue2` 的 `Loader`，对于其他框架或者特殊的解析需求，可以根据以上内容自定义 `Loader`。