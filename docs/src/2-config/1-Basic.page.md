# Archive 配置

## 配置文件

配置文件在执行 `archive` 命令的上下文目录或上层目录的 `archive.config.js` 文件，默认导出 `ArchiveConfig`。

可以通过 `@idux/archive` 暴露的 `defineConfig` 函数定义配置。

## 类型定义

```ts
interface ArchiveConfig {
  setupFile?: string
  navConfig?: (root: string) => NavRecord[]
  watchNavConfig?: (update: () => void) => void
  pageLoaders?: Loader[]
  demoLoaders?: Loader[]
  markdownOptions?: MarkdownOptions
  theme?: ArchiveThemeOptions
  dist?: string
  root?: string
  baseUrl?: string
}
```

### setupFile

- 类型: `string`
- 是否可选: 是

初始化脚本路径。脚本导出内容的类型请参考：[初始化脚本](/config/Setup/)

### dist

- 类型: `string`
- 是否可选: 是

打包的目标目录，默认为配置文件所在目录的 `dist` 文件夹。

### baseUrl

- 类型: `string`
- 是否可选: 是

公共基础路径，同时也作为路由的基础路径，默认为 `vite` 配置中的 `base`，如果都未提供，则为 `'/'`。

### root

- 类型: `string`
- 是否可选: 是

文档根目录，默认为 `vite` 配置文件中的 `root` 或 `process.cwd()`。


### navConfig

- 类型: `(root: string) => NavRecord[]`
- 是否可选: 是

导航配置函数，用于自定义导航列表。详情请参考：[导航配置](/guide/documents/Nav/)。

### watchNavConfig

- 类型: `(update: () => void) => void`
- 是否可选: 是

在该函数中创建对导航变更的监听，监听到变化之后执行 `update` 函数更新导航配置，用于 `HMR`。

### pageLoaders

- 类型: `Loader[]`
- 是否可选: 是

用于页面内容解析的 `Loader`，关于 `Loader` 请参考 [Loader](/loader/Brief/)。

### demoLoaders

- 类型: `Loader[]`
- 是否可选: 是

用于Demo内容解析的 `Loader`，关于 `Loader` 请参考 [Loader](/loader/Brief/)。

### markdownOptions

- 类型: `MarkdownOptions`
- 是否可选: 是

Markdown 解析配置，继承自 `markdown-it` 的配置

```ts
export interface MarkdownOptions extends MarkdownIt.Options {
  lineNumbers?: boolean;
  config?: (md: MarkdownIt) => void;
  anchor?: anchorPlugin.AnchorOptions;
  attrs?: {
    leftDelimiter?: string;
    rightDelimiter?: string;
    allowedAttributes?: string[];
    disable?: boolean;
  };
  frontmatter?: FrontmatterPluginOptions;
  headers?: HeadersPluginOptions;
  sfc?: SfcPluginOptions;
  theme?: ThemeOptions;
  toc?: TocPluginOptions;
  externalLinks?: Record<string, string>;
}
```

### theme

- 类型: `ArchiveThemeOptions`
- 是否可选: 是

```ts
interface AppThemeOptions {
  logo?: ProLayoutLogo
  breakpoints?: Record<BreakpointKey, string>
  layout?: {
    theme?: ProLayoutTheme
    type?: ProLayoutType
    siderCollapsable?: boolean | SiderCollapsable
  }
  footer?: string
  page?: {
    headerAffix?: boolean
    enableAnchor?: boolean
    anchorMaxLevel?: number
  }
}
interface ArchiveThemeOptions extends AppThemeOptions {
  themeStyle?: ArchiveThemeStyle
}
```

主题配置

#### theme.logo

- 类型: `ProLayoutLogo`
- 是否可选: 是

```ts
interface ProLayoutLogo {
  image: string | VNode;
  title: string;
  link?: string;
}
```

App Logo

#### theme.breakpoints

- 类型: `Record<BreakpointKey, string>`
- 是否可选: 是

```ts
type BreakpointKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

指定响应式断点边界宽度。

#### theme.layout.theme

- 类型: `ProLayoutTheme`
- 是否可选: 是

```ts
type MenuTheme = 'light' | 'dark';
type ProLayoutTheme = MenuTheme | {
    header: MenuTheme;
    sider: MenuTheme;
}
```

布局框架主题设置。

#### theme.layout.type

- 类型: `ProLayoutType`
- 是否可选: 是

```ts
type ProLayoutType = 'header' | 'sider' | 'mixin' | 'both'
```

指定布局框架类型。

#### theme.layout.siderCollapsable

- 类型: `boolean | SiderCollapsable`
- 是否可选: 是

```ts
type SiderCollapsable = 'top' | 'bottom'
```

指定布局框架的侧边栏是否可以收起。

- `top` 代表收起展开按钮在侧边栏顶部
- `bottom` 代表收起展开按钮在侧边栏底部

#### theme.footer

- 类型: `string`
- 是否可选: 是

指定 App 的 `footer` 内容。

#### theme.page.headerAffix

- 类型: `boolean`
- 是否可选: 是

是否将页面的头部在滚动到下方是固定到顶部。

#### theme.page.enableAnchor

- 类型: `boolean`
- 是否可选: 是

是否启用右侧快捷选择锚点。

启动后则会根据页面内容中的 `h` 标签层级自动生成锚点

#### theme.page.anchorMaxLevel

- 类型: `number`
- 是否可选: 是

锚点的最大层数。

例如配置为 `3` 则生成的锚点最大匹配3层，`h1`、`h2`、`h3` 标签可以被解析，但 `h4` 及更小的标签不会被解析。
