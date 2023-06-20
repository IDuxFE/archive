# 初始化脚本

初始化脚本用于初始化文档框架所在的 `vue` app, 以及配置自定义渲染函数和自定义选项。

## 语法要求

`.ts` 或 `.js` 文件。

## 类型定义

```ts
interface SetupContext {
  setupApp?: (app: App) => void
  renderers?: AppRenderers
  options?: AppSetupOptions
}
```

### setupApp

- 类型: `(app: App) => void`
- 是否可选: 是

初始化文档框架所在的 `vue` app，通常用于注册一些自定义渲染内容中用到的特性。

### renderers

- 类型: `AppRenderers`
- 是否可选: 是

```ts
interface AppRenderers {
  logo?: AppRenderer<ProLayoutLogo, false>
  layoutHeaderContent?: AppRenderer<MenuProps, false>
  layoutHeaderExtra?: AppRenderer<Record<string, never>, false>
  layoutSiderContent?: AppRenderer<MenuProps, false>
  layoutSiderHeader?: AppRenderer
  layoutSiderHeaderLabel?: AppRenderer
  layoutSiderFooter?: AppRenderer<Record<string, never>, false>
  layoutSiderFooterLabel?: AppRenderer<Record<string, never>, false>
  pageHeader?: PageRenderer<PageHeaderRendererData>
  pageContent?: PageRenderer<PageContentRendererData>
}
```

自定义渲染函数配置。

```ts
interface AppRendererDataBase {
  theme: ResolvedAppThemeOptions // 主题配置
  route: RouteLocationNormalizedLoaded // route
  breakpoints: Record<BreakpointKey, boolean>
  activeRecords: ResolvedNavRecord[] // 当前激活的导航节点
}

type PageRendererDataBase = SetOptional<AppRendererDataBase, 'route' | 'activeRecords'>
```

#### renderers.logo

- 类型: `(data: ProLayoutLogo, nodes: VNodeChild) => VNodeChild`
- 是否可选: 是

logo 自定义渲染。

`nodes` 参数代表框架默认渲染的节点列表，以下均相同，不再重复。

`ProLayoutLogo` 参考 [ProLayout](https://idux.site/pro/layout/zh)。

#### renderers.layoutHeaderContent

- 类型: `(data: AppRendererDataBase & MenuProps, nodes: VNodeChild) => VNodeChild`
- 是否可选: 是

布局框架头部自定义渲染。

`MenuProps` 参考 [Menu](https://idux.site/components/menu/zh)。

#### renderers.layoutHeaderExtra

- 类型: `(data: AppRendererDataBase, nodes: VNodeChild) => VNodeChild`
- 是否可选: 是

布局框架头部额外内容自定义渲染。

#### renderers.layoutSiderContent

- 类型: `(data: MenuProps, nodes: VNodeChild) => VNodeChild`
- 是否可选: 是

布局框架侧边栏内容区域自定义渲染。

`MenuProps` 参考 [Menu](https://idux.site/components/menu/zh)。

#### renderers.layoutSiderHeader

- 类型: `(data: AppRendererDataBase, nodes: VNodeChild) => VNodeChild`
- 是否可选: 是

布局框架侧边栏头部区域自定义渲染。

#### renderers.layoutSiderHeaderLabel

- 类型: `(data: AppRendererDataBase, nodes: VNodeChild) => VNodeChild`
- 是否可选: 是

布局框架侧边栏头部Label自定义渲染。

#### renderers.layoutSiderFooter

- 类型: `(data: AppRendererDataBase, nodes: VNodeChild) => VNodeChild`
- 是否可选: 是

布局框架侧边栏底部自定义渲染。

#### renderers.layoutSiderFooterLabel

- 类型: `(data: AppRendererDataBase, nodes: VNodeChild) => VNodeChild`
- 是否可选: 是

布局框架侧边栏底部Label自定义渲染。

#### renderers.pageHeader

- 类型: `(data: PageRendererDataBase & PageHeaderRendererData, nodes: VNodeChild) => VNodeChild`
- 是否可选: 是

```ts
interface PageHeaderRendererData {
  title?: string
  description?: string
  tabs?: ResolvedPageTab[]
  activeTabId?: string
  setActiveTabId: (tabId: string) => void
}
```

页面头部自定义渲染。

#### renderers.pageContent

- 类型: `(data: PageRendererDataBase & PageContentRendererData, nodes: VNodeChild) => VNodeChild`
- 是否可选: 是

```ts
interface PageContentRendererData {
  demos: ResolvedDemoItem[]
  visibleDemoIds: string[]
  setVisibleDemoIds: (demosIds: string[]) => void
}
```

页面内容自定义渲染。

### options

- 类型: `AppSetupOptions`
- 是否可选: 是

```ts
interface AppSetupOptions {
  getInitVisibleDemoIds?: (demos?: ResolvedDemoItem[]) => string[]
  getDemoTools?: (demos: ResolvedDemoItem) => DemoTool[]
}
```

#### options.getInitVisibleDemoIds

- 类型: `(demos?: ResolvedDemoItem[]) => string[]`
- 是否可选: 是

```ts
interface ResolvedDemoItem<D extends object = object> extends ResolvedItem<D> {
  title: string
  description: string
  sourceCodes?: SourceCode[]
}
```

获取初始显示的DemoId列表。

关于 `ResolvedItem` 请参考 [Loader](/loader/Brief/)。

#### options.getDemoTools

- 类型: `(demo: ResolvedDemoItem) => DemoTool[]`
- 是否可选: 是

```ts
interface DemoToolBase {
  tooltip: string
  render: () => VNode
}

// 展开收起源码
interface DemoToolExpandCode extends SetOptional<Except<DemoToolBase, 'render'>, 'tooltip'> {
  type: 'expandCode'
  render: (expanded: boolean) => VNode
}

// 展开收起控件
interface DemoToolExpandControls extends SetOptional<Except<DemoToolBase, 'render'>, 'tooltip'> {
  type: 'expandControls'
  render: (expanded: boolean) => VNode
}

// 复制源码
interface DemoToolCopyCode extends SetOptional<DemoToolBase, 'tooltip' | 'render'> {
  type: 'copyCode'
}

// 链接
interface DemoToolLink extends DemoToolBase {
  type: 'link'
  link: string
}

type DemoTool =
  | (DemoToolBase & { type: undefined })
  | DemoToolExpandCode
  | DemoToolCopyCode
  | DemoToolLink
  | DemoToolExpandControls
```

获取Demo对应的工具栏工具列表

:::info 注：展开收起源码按钮固定展示，在配置中提供仅仅会改变其顺序。
:::

关于 `ResolvedItem` 请参考 [Loader](/loader/Brief/)。