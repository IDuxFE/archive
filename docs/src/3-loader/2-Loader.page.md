# Loader 接口定义

## 类型定义

```ts
interface interface Loader<V = object> {
  name: string
  matched: (path: string) => boolean
  prefix?: string
  resolve?: (absolutePath: string, query: QueryObj) => Promise<Pick<LoadedItem, 'instanceScript' | 'prependScript' | 'controls' | 'title' | 'description' | 'sourceCodes'> & V>
  transform?: (code: string) => Promise<string> | string
}
```

### name

- 类型: `string`
- 是否可选: 否

指定 loader 的唯一名称

### matched

- 类型: `(path: string) => boolean`
- 是否可选: 否

`@idux/archive-vite-plugin` 所接收的 `Loader` 不止一个，因此需要根据一定的匹配方法来指定什么文件使用哪个 `Loader`

`matched` 接受文件的路径，来由 `Loader` 判断是否解析该文件，默认使用第一个匹配到的 `Loader` 解析文件。

### prefix

- 类型: `string`
- 是否可选: 是

同 `matched`，前缀也是用来分配文件匹配到的 `Loader`，默认为 `archive`。

例如：

```ts
import ArchiveItem from 'archive:./path/to/component.vue'
```

以上 `import` 语句对应的前缀则是 `archive`，

### resolve

- 类型: `(absolutePath: string, query: QueryObj) => Promise<Pick<LoadedItem, 'instanceScript' \| 'prependScript' \| 'controls' \| 'title' \| 'description' \| 'sourceCodes'> & V>`
- 是否可选: 否

将给定路径和query的文件解析成 `LoadedItem` 对象。

### transform

- 类型: `(code: string) => Promise<string> \| string`
- 是否可选: 是

对于某些特定的解析场景，可能需要对文件进行二次转换，该接口则提供了转换的能力。