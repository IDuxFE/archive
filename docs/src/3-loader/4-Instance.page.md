# Instance

`Instance` 是解析后最重要的内容，其本质上是对任意框架下组件的封装，形成一个框架无关的原生对象中间层，用于挂载以及操作实际的组件。

## 类型定义

```ts
interface Instance<Data extends object = object> {
  mount: (el: HTMLElement, data?: Data) => Promise<void> | void
  unmount: () => Promise<void> | void
  getData: () => Data | undefined
  getProps: () => InstanceProp<Data>[]
  setData: (data: Partial<Data>) => Promise<void> | void
  watchData: {
    <K extends keyof Data>(key: K, callback: (value: Data[K] | undefined) => void): () => void
    (callback: (data: Data | undefined) => void): () => void
  }
}
```

### mount

- 类型: `(el: HTMLElement, data?: Data) => Promise<void> \| void`

挂载函数，允许接收初始数据。

### unmount

- 类型: `() => Promise<void> \| void`

卸载函数。

### getData

- 类型: `() => Data \| undefined`

获取实例数据，即对应组件的 `props` 参数数据。

### getProps

- 类型: `() => InstanceProp<Data>[]`

```ts
interface InstanceProp<D extends Record<string, any>, K extends keyof D> {
  key: K
  type: 'string' | 'number' | 'boolean' | 'array' | 'object'
  default?: D[K]
}
```

获取实例对应组件的 `props` 定义列表。

### setData

- 类型: `(data: Partial<Data>) => Promise<void> \| void`

更新实例数据。

### watchData

监听数据变更。可指定对某个特定 `key` 的监听，也可以监听全部数据。