# Item

## LoadedItem

```ts
interface LoadedItem {
  id: string
  filename: string
  relativePath: string
  absolutePath: string
  query: QueryObj
  loader: ResolvedLoader
  title?: string
  description?: string
  controls?: Record<string, Control>
  sourceCodes?: SourceCode[]
  prependScript?: string
  instanceScript: string
}
```

`Loader` 将文件解析成固定格式的对象类型 `LoadedItem`。

`instanceScript`， `prependScript`， `controls`， `title`， `description`， `dependencies` 由 `Loader` 负责解析，其余基础信息则由插件本身负责。

### LoadedItem.id

- 类型: `string`

解析后的唯一ID，通常是文件的相对路径。

### LoadedItem.filename

- 类型: `string`

文件名。

### LoadedItem.relativePath

- 类型: `string`

文件相对于 `root` 配置的根目录的路径。

### LoadedItem.absolutePath

- 类型: `string`

文件的绝对路径。

### LoadedItem.query

- 类型: `QueryObj`

```ts
type QueryObj = Record<string, string | true>
```

引用路径中的 `query`。

### LoadedItem.loader

- 类型: `Loader`

解析使用的，即匹配到的 `Loader`。

### LoadedItem.title

- 类型: `string`

app框架中用于展示的标题。

### LoadedItem.description

- 类型: `string`

app框架中用于展示的描述。

### LoadedItem.controls

- 类型: `Control[]`

demo 控件配置，不配置的话默认会以从demo组件定义的prop中自行读取

:::info 控件配置包含的属性，必须在demo组件中显式定义，否则无法实现参数控制
:::

控件类型定义如下：

```ts
interface ControlBase {
  label?: string
  description?: string
}
interface InputControl extends ControlBase {
  type: 'input'
}
interface SelectControl extends ControlBase {
  type: 'select'
  options: { label: string; value: string | number | boolean }[]
}
interface RadioControl extends ControlBase {
  type: 'radio'
  options: { label: string; value: string | number | boolean }[]
}
interface CheckboxControl extends ControlBase {
  type: 'checkbox'
  options: { label: string; value: string | number | boolean }[]
}
interface TextareaControl extends ControlBase {
  type: 'textarea'
}
interface NumberControl extends ControlBase {
  type: 'number'
}
interface JsonControl extends ControlBase {
  type: 'json'
}
interface BoolControl extends ControlBase {
  type: 'boolean'
}

type Control =
  | InputControl
  | SelectControl
  | RadioControl
  | CheckboxControl
  | TextareaControl
  | NumberControl
  | JsonControl
  | BoolControl
```

### LoadedItem.sourceCodes

- 类型: `SourceCode[]`

解析后的文件源码，包含文件名、源代码、页面渲染 `html` 字符串。

```ts
interface SourceCode {
  filename: string
  code: string
  parsedCode: string
}
```

### LoadedItem.prependScript

- 类型: `string`

解析后的 `LoadedItem` 将会由一个虚拟模块提供默认导出，该属性代码在虚拟模块文件中添加到顶部的内容，一般用于添加文件以及模块的引用。

### LoadedItem.instanceScript

- 类型: `string`

解析后的 `instance` 实例对象代码字符串。

解析后插件会进行以下处理：

```ts
...
return `{
    ${JSON.stringify(_item).slice(1, -1)},
    instance: ${item.instanceScript},
  }`
```

## ResolvedItem

`LoadedItem` 是在 `node` 下解析的产物，而 `ResolvedItem` 则是进一步解析后在浏览器环境下实际引入的 `Item` 实例。

类型定义如下：

```ts
export interface ResolvedItem<D extends object = object>
  extends Except<LoadedItem, 'prependScript' | 'instanceScript' | 'loader' | 'absolutePath'> {
  instance: Instance<D>
}
```
`prependScript`, `instanceScript`, `loader`, `absolutePath` 不会被暴露在浏览器环境中，不会在打包后的内容中包含。