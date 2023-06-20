# 主题自定义

Idux Archive 制定了统一的主题配置内容，交给 App 框架解析后用于相关渲染。

## Archive 主题配置

`archive.config.js` 配置文件中的 `theme` 选项，可以配置主题内容，例如 `logo`、`footer` 等。

详细的主题配置内容请查看 [Archive 配置](/config/Basic/)。

## 主题css变量

默认提供的 App 框架支持主题css变量，可以将编写自定义的主题变量的 `.css` 文件在初始化脚本中插入。

### 支持的css变量

#### App css 变量

|变量名|说明|默认主题|seer主题|
|---|----|-|-|
| `--archive-app-font-size` | 字体大小 | `14px` | `14px` |
| `--archive-app-content-padding-top-xs` | `xs`尺寸屏幕下内容区域顶部padding | `0` | `0` |
| `--archive-app-content-padding-bottom-xs` | `xs`尺寸屏幕下内容区域底部padding | `32px` | `32px` |
| `--archive-app-content-padding-left-xs` | `xs`尺寸屏幕下内容区域左padding | `16px` | `16px` |
| `--archive-app-content-padding-right-xs` | `xs`尺寸屏幕下内容区域右padding | `16px` | `16px` |
| `--archive-app-content-padding-top-sm` | `sm`尺寸屏幕下内容区域顶部padding | `0` | `0` |
| `--archive-app-content-padding-bottom-sm` | `sm`尺寸屏幕下内容区域底部padding | `32px` | `32px` |
| `--archive-app-content-padding-left-sm` | `sm`尺寸屏幕下内容区域左padding | `24px` | `24px` |
| `--archive-app-content-padding-right-sm` | `sm`尺寸屏幕下内容区域右padding | `20px` | `20px` |
| `--archive-app-content-padding-top-md` | `md`尺寸屏幕下内容区域顶部padding | `0` | `0` |
| `--archive-app-content-padding-bottom-md` | `md`尺寸屏幕下内容区域底部padding | `32px` | `32px` |
| `--archive-app-content-padding-left-md` | `md`尺寸屏幕下内容区域左padding | `32px` | `32px` |
| `--archive-app-content-padding-right-md` | `md`尺寸屏幕下内容区域右padding | `24px` | `24px` |
| `--archive-app-content-padding-top-lg` | `lg`尺寸屏幕下内容区域顶部padding | `0` | `0` |
| `--archive-app-content-padding-bottom-lg` | `lg`尺寸屏幕下内容区域底部padding | `32px` | `32px` |
| `--archive-app-content-padding-left-lg` | `lg`尺寸屏幕下内容区域左padding | `48px` | `48px` |
| `--archive-app-content-padding-right-lg` | `lg`尺寸屏幕下内容区域右padding | `32px` | `32px` |
| `--archive-app-content-padding-top-xl` | `xl`尺寸屏幕下内容区域顶部padding | `0` | `0` |
| `--archive-app-content-padding-bottom-xl` | `xl`尺寸屏幕下内容区域底部padding | `32px` | `32px` |
| `--archive-app-content-padding-left-xl` | `xl`尺寸屏幕下内容区域左padding | `64px` | `64px` |
| `--archive-app-content-padding-right-xl` | `xl`尺寸屏幕下内容区域右padding | `40px` | `40px` |
| `--archive-app-content-min-height` | 内容区域最小高度 | `600px` | `600px` |
| `--archive-app-sider-header-label-font-size` | 侧边栏头部label字体大小 | `16px` | `14px` |
| `--archive-app-sider-header-label-font-weight` | 侧边栏头部label字体weight | `bold` | `bold` |
| `--archive-app-sider-header-label-color` | 侧边栏头部label字体颜色 | `#000` | `#3d3d3d` |

#### 页面 css 变量

|变量名|说明|默认主题|seer主题|
|---|----|-|-|
| `--archive-app-page-font-size` | 页面字体大小 | `14px` | `12px` |
| `--archive-app-page-min-height` | 页面最小高度 | `600px` | `600px` |
| `--archive-app-page-header-background` | 页面头部背景颜色 | `#fff` | `#fff` |
| `--archive-app-page-header-margin-bottom` | 页面头部底部margin | `16px` | `24px` |
| `--archive-app-page-toc-width` | 页面锚点快捷栏宽度 | `200px` | `200px` |
| `--archive-app-page-header-tabs-height` | 页面tab栏高度 | `40px` | `40px` |
| `--archive-app-page-header-tabs-padding` | 页面tab栏padding | `4px` | `4px` |
| `--archive-app-page-header-tabs-border-radius` | 页面tab栏圆角 | `20px` | `20px` |
| `--archive-app-page-header-tabs-background` | 页面tab栏背景颜色 | `#eceff3` | `#eceff3` |
| `--archive-app-page-header-tabs-item-min-width` | 页面tab按钮宽度 | `64px` | `64px` |
| `--archive-app-page-header-tabs-item-active-background-color` | 页面tab按钮激活状态背景颜色 | `#1c6eff` | `#1c6eff` |
| `--archive-app-page-header-tabs-item-checked-box-shadow` | 页面tab按钮激活状态box-shadow | `0 1px 2px -2px rgb(0 0 0 / 16%),0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)` | `0 1px 2px -2px rgb(0 0 0 / 16%),0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)` |
| `--archive-app-page-title-font-size` | 页面标题字体大小 | `30px` | `30px` |
| `--archive-app-page-fixed-font-size` | 页面标题在固定到顶部时的字体大小 | `24px` | `24px` |
| `--archive-app-page-title-color` | 页面标题字体颜色 | `#000` | `#000` |
| `--archive-app-page-description-font-size` | 页面描述字体大小 | `14px` | `14px` |
| `--archive-app-page-description-color` | 页面描述字体颜色 | `#2f3540` | `#6f7785` |

#### Demo css 变量

|变量名|说明|默认主题|seer主题|
|---|----|-|-|
| `--archive-app-demo-width` | demo 宽度 | `100%` | `100%` |
| `--archive-app-demo-padding` | demo padding | `0` | `0` |
| `--archive-app-demo-margin-bottom` | demo 底部 margin | `16px` | `16px` |
| `--archive-app-demo-title-font-size` | demo 标题字体大小 | `20px` | `20px` |
| `--archive-app-demo-title-color` | demo 标题字体颜色 | `#000` | `#000` |
| `--archive-app-demo-description-font-size` | demo 描述字体大小 | `14px` | `14px` |
| `--archive-app-demo-description-color` | demo 描述字体颜色 | `#2f3540` | `#6f7785` |
| `--archive-app-demo-content-padding` | demo 内容区域padding | `8px` | `8px` |
| `--archive-app-demo-content-border` | demo 内容区域border | `none` | `none` |
| `--archive-app-demo-content-background` | demo 内容区域背景颜色 | `#f7f9fc` | `#f7f9fc` |
| `--archive-app-demo-content-box-shadow` | demo 内容区域阴影 | `inset 0 0 4px #0000001a` | `inset 0 0 4px #0000001a` |
| `--archive-app-demo-stage-padding` | demo 展示区域padding | `22px` | `22px` |
| `--archive-app-demo-stage-border` | demo 展示区域border | `1px solid #edf1f7` | `1px solid #edf1f7` |
| `--archive-app-demo-stage-background` | demo 展示区域背景颜色 | `#fff` | `#fff` |
| `--archive-app-demo-tools-height` | demo 工具栏高度 | `20px` | `20px` |
| `--archive-app-demo-tools-gap` | demo 工具栏间距 | `16px` | `16px` |
| `--archive-app-demo-tools-background` | demo 工具栏背景颜色 | `#fff` | `#fff` |
| `--archive-app-demo-tools-padding` | demo 工具栏padding | `0 20px 0 0` | `0 20px 0 0` |
| `--archive-app-demo-tools-font-size` | demo 工具栏字体大小 | `16px` | `16px` |
| `--archive-app-demo-source-code-transition-duration` | demo 源码展开收起动画时间 | `0.2s` | `0.2s` |
| `--archive-app-demo-source-code-transition-timing-fn` | demo 源码展开收起动画缓动函数 | `cubic-bezier(0.37, 0, 0.63, 1)` | `cubic-bezier(0.37, 0, 0.63, 1)` |
| `--archive-app-demo-control-label-width` | demo 控件label宽度 | `150px` | `150px` |
| `--archive-app-demo-control-label-font-size` | demo 控件label字体大小 | `14px` | `14px` |
| `--archive-app-demo-control-font-size` | demo 控件字体大小 | `14px` | `14px` |

#### Idux 组件 css 变量

支持全部的 `idux` 组件 css 变量，但是所有的变量均不以 `--ix` 开头，而是以 `--archive-ix` 开头。

有关 `idux` 组件相关，请查看 [Idux](https://idux.site)。