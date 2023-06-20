# 导航配置

## 默认导航解析

默认解析方式以及页面文档编写请查看[内置默认导航与路由解析](/guide/introdoction/DefaultNav/)

## 自定义导航配置

在配置文件 `archive.config.js` 中配置 `navConfig`，可以自定义导航结构。

### navConfig

- 类型：`(root: string) => NavRecord[]`

通过一个自定义函数返回导航配置项数组来实现导航自定义

### NavRecord

导航项，导航项由以下几种类型组成：

```ts
type NavRecord = ItemNavRecord | LinkNavRecord | GroupNavRecord | SubNavRecord
```

#### NavRecordBase

所有导航项类型公共属性

```ts
interface NavRecordBase {
  id: string // 导航项唯一ID
  name: string // 导航项名称，即导航栏中显示的导航名称
}
```

#### ItemNavRecord

`item` 类型导航项，即页面类型导航，包含实际可渲染的页面信息

```ts
interface ItemNavRecord extends NavRecordBase {
  type: 'item'
  pageData: PageData
}
```

__PageData__

页面数据

```ts
interface BasePageData {
  title?: string // 页面标题
  description?: string // 页面描述
  src?: string // 页面文档路径
  tabs?: PageTab[] // 标签页列表
  demoIds?: string[] // 页面内 demo ID 列表
}
export type PageData = RequireExactlyOne<BasePageData, 'tabs' | 'demos' | 'src'>
```

页面数据中的 `src`、`tabs` 和 `demos` 三个数据只能存在一个，他们分别对应了不同页面类型，具体见[文档页面编写](/guide/documents/page/Brief/)

__PageTab__

标签页数据

```ts
interface BasePageTab {
  id: string
  name: string
  src?: string
  demos?: string[]
}
export type PageTab = RequireExactlyOne<BasePageTab, 'src' | 'demos'>
```

标签页数据中 `src`、`demos` 只能存在一个，他们分别对应了不同的标签页类型，具体见[文档页面编写](/guide/documents/page/Brief/)

#### LinkNavRecord

链接类型导航项

```ts
interface LinkNavRecord extends NavRecordBase {
  type: 'link'
  link: string // 链接地址
}
```

在导航栏中点击链接类型导航，将直接跳转到配置的链接地址

#### SubNavRecord

具有子导航的导航项

```ts
interface SubNavRecord extends NavRecordBase {
  type: 'sub'
  children: NavRecord[] // 子导航项列表
}
```

#### GroupNavRecord

分组类型导航项，与子导航不同的是，其不具备展开收起功能，仅仅是分组展示

```ts
interface GroupNavRecord extends NavRecordBase {
  type: 'group'
  children: NavRecord[]
}
```

<!-- ## 导航配置处理相关工具函数

`navConfig` 函数的设计确保了导航配置的高度灵活性，但解析得到期望的导航列表通常还是需要大量的脚本处理。为了优化这部分使用体验，Idux Archive 暴露了相关的工具函数，如下：

// TODO -->