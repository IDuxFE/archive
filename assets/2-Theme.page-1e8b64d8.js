import { _ as _export_sfc, o as openBlock, c as createElementBlock, a as createStaticVNode, U as Ui } from "./_plugin-vue_export-helper-e63733f0.js";
JSON.parse('{"title":"主题自定义","description":"","frontmatter":{},"headers":[{"level":2,"title":"Archive 主题配置","slug":"archive-主题配置","link":"#archive-主题配置","children":[]},{"level":2,"title":"主题css变量","slug":"主题css变量","link":"#主题css变量","children":[{"level":3,"title":"支持的css变量","slug":"支持的css变量","link":"#支持的css变量","children":[]}]}],"relativePath":"src/1-guide/3-customization/2-Theme.page.md"}');
const _sfc_main = { name: "2-Theme.page.md" };
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h1 id="主题自定义" tabindex="-1">主题自定义 <a class="header-anchor" href="#主题自定义" aria-hidden="true">#</a></h1><p>Idux Archive 制定了统一的主题配置内容，交给 App 框架解析后用于相关渲染。</p><h2 id="archive-主题配置" tabindex="-1">Archive 主题配置 <a class="header-anchor" href="#archive-主题配置" aria-hidden="true">#</a></h2><p><code>archive.config.js</code> 配置文件中的 <code>theme</code> 选项，可以配置主题内容，例如 <code>logo</code>、<code>footer</code> 等。</p><p>详细的主题配置内容请查看 <a href="/config/Basic/">Archive 配置</a>。</p><h2 id="主题css变量" tabindex="-1">主题css变量 <a class="header-anchor" href="#主题css变量" aria-hidden="true">#</a></h2><p>默认提供的 App 框架支持主题css变量，可以将编写自定义的主题变量的 <code>.css</code> 文件在初始化脚本中插入。</p><h3 id="支持的css变量" tabindex="-1">支持的css变量 <a class="header-anchor" href="#支持的css变量" aria-hidden="true">#</a></h3><h4 id="app-css-变量" tabindex="-1">App css 变量 <a class="header-anchor" href="#app-css-变量" aria-hidden="true">#</a></h4><table><thead><tr><th>变量名</th><th>说明</th><th>默认主题</th><th>seer主题</th></tr></thead><tbody><tr><td><code>--archive-app-font-size</code></td><td>字体大小</td><td><code>14px</code></td><td><code>14px</code></td></tr><tr><td><code>--archive-app-content-padding-top-xs</code></td><td><code>xs</code>尺寸屏幕下内容区域顶部padding</td><td><code>0</code></td><td><code>0</code></td></tr><tr><td><code>--archive-app-content-padding-bottom-xs</code></td><td><code>xs</code>尺寸屏幕下内容区域底部padding</td><td><code>32px</code></td><td><code>32px</code></td></tr><tr><td><code>--archive-app-content-padding-left-xs</code></td><td><code>xs</code>尺寸屏幕下内容区域左padding</td><td><code>16px</code></td><td><code>16px</code></td></tr><tr><td><code>--archive-app-content-padding-right-xs</code></td><td><code>xs</code>尺寸屏幕下内容区域右padding</td><td><code>16px</code></td><td><code>16px</code></td></tr><tr><td><code>--archive-app-content-padding-top-sm</code></td><td><code>sm</code>尺寸屏幕下内容区域顶部padding</td><td><code>0</code></td><td><code>0</code></td></tr><tr><td><code>--archive-app-content-padding-bottom-sm</code></td><td><code>sm</code>尺寸屏幕下内容区域底部padding</td><td><code>32px</code></td><td><code>32px</code></td></tr><tr><td><code>--archive-app-content-padding-left-sm</code></td><td><code>sm</code>尺寸屏幕下内容区域左padding</td><td><code>24px</code></td><td><code>24px</code></td></tr><tr><td><code>--archive-app-content-padding-right-sm</code></td><td><code>sm</code>尺寸屏幕下内容区域右padding</td><td><code>20px</code></td><td><code>20px</code></td></tr><tr><td><code>--archive-app-content-padding-top-md</code></td><td><code>md</code>尺寸屏幕下内容区域顶部padding</td><td><code>0</code></td><td><code>0</code></td></tr><tr><td><code>--archive-app-content-padding-bottom-md</code></td><td><code>md</code>尺寸屏幕下内容区域底部padding</td><td><code>32px</code></td><td><code>32px</code></td></tr><tr><td><code>--archive-app-content-padding-left-md</code></td><td><code>md</code>尺寸屏幕下内容区域左padding</td><td><code>32px</code></td><td><code>32px</code></td></tr><tr><td><code>--archive-app-content-padding-right-md</code></td><td><code>md</code>尺寸屏幕下内容区域右padding</td><td><code>24px</code></td><td><code>24px</code></td></tr><tr><td><code>--archive-app-content-padding-top-lg</code></td><td><code>lg</code>尺寸屏幕下内容区域顶部padding</td><td><code>0</code></td><td><code>0</code></td></tr><tr><td><code>--archive-app-content-padding-bottom-lg</code></td><td><code>lg</code>尺寸屏幕下内容区域底部padding</td><td><code>32px</code></td><td><code>32px</code></td></tr><tr><td><code>--archive-app-content-padding-left-lg</code></td><td><code>lg</code>尺寸屏幕下内容区域左padding</td><td><code>48px</code></td><td><code>48px</code></td></tr><tr><td><code>--archive-app-content-padding-right-lg</code></td><td><code>lg</code>尺寸屏幕下内容区域右padding</td><td><code>32px</code></td><td><code>32px</code></td></tr><tr><td><code>--archive-app-content-padding-top-xl</code></td><td><code>xl</code>尺寸屏幕下内容区域顶部padding</td><td><code>0</code></td><td><code>0</code></td></tr><tr><td><code>--archive-app-content-padding-bottom-xl</code></td><td><code>xl</code>尺寸屏幕下内容区域底部padding</td><td><code>32px</code></td><td><code>32px</code></td></tr><tr><td><code>--archive-app-content-padding-left-xl</code></td><td><code>xl</code>尺寸屏幕下内容区域左padding</td><td><code>64px</code></td><td><code>64px</code></td></tr><tr><td><code>--archive-app-content-padding-right-xl</code></td><td><code>xl</code>尺寸屏幕下内容区域右padding</td><td><code>40px</code></td><td><code>40px</code></td></tr><tr><td><code>--archive-app-content-min-height</code></td><td>内容区域最小高度</td><td><code>600px</code></td><td><code>600px</code></td></tr><tr><td><code>--archive-app-sider-header-label-font-size</code></td><td>侧边栏头部label字体大小</td><td><code>16px</code></td><td><code>14px</code></td></tr><tr><td><code>--archive-app-sider-header-label-font-weight</code></td><td>侧边栏头部label字体weight</td><td><code>bold</code></td><td><code>bold</code></td></tr><tr><td><code>--archive-app-sider-header-label-color</code></td><td>侧边栏头部label字体颜色</td><td><code>#000</code></td><td><code>#3d3d3d</code></td></tr></tbody></table><h4 id="页面-css-变量" tabindex="-1">页面 css 变量 <a class="header-anchor" href="#页面-css-变量" aria-hidden="true">#</a></h4><table><thead><tr><th>变量名</th><th>说明</th><th>默认主题</th><th>seer主题</th></tr></thead><tbody><tr><td><code>--archive-app-page-font-size</code></td><td>页面字体大小</td><td><code>14px</code></td><td><code>12px</code></td></tr><tr><td><code>--archive-app-page-min-height</code></td><td>页面最小高度</td><td><code>600px</code></td><td><code>600px</code></td></tr><tr><td><code>--archive-app-page-header-background</code></td><td>页面头部背景颜色</td><td><code>#fff</code></td><td><code>#fff</code></td></tr><tr><td><code>--archive-app-page-header-margin-bottom</code></td><td>页面头部底部margin</td><td><code>16px</code></td><td><code>24px</code></td></tr><tr><td><code>--archive-app-page-toc-width</code></td><td>页面锚点快捷栏宽度</td><td><code>200px</code></td><td><code>200px</code></td></tr><tr><td><code>--archive-app-page-header-tabs-height</code></td><td>页面tab栏高度</td><td><code>40px</code></td><td><code>40px</code></td></tr><tr><td><code>--archive-app-page-header-tabs-padding</code></td><td>页面tab栏padding</td><td><code>4px</code></td><td><code>4px</code></td></tr><tr><td><code>--archive-app-page-header-tabs-border-radius</code></td><td>页面tab栏圆角</td><td><code>20px</code></td><td><code>20px</code></td></tr><tr><td><code>--archive-app-page-header-tabs-background</code></td><td>页面tab栏背景颜色</td><td><code>#eceff3</code></td><td><code>#eceff3</code></td></tr><tr><td><code>--archive-app-page-header-tabs-item-min-width</code></td><td>页面tab按钮宽度</td><td><code>64px</code></td><td><code>64px</code></td></tr><tr><td><code>--archive-app-page-header-tabs-item-active-background-color</code></td><td>页面tab按钮激活状态背景颜色</td><td><code>#1c6eff</code></td><td><code>#1c6eff</code></td></tr><tr><td><code>--archive-app-page-header-tabs-item-checked-box-shadow</code></td><td>页面tab按钮激活状态box-shadow</td><td><code>0 1px 2px -2px rgb(0 0 0 / 16%),0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)</code></td><td><code>0 1px 2px -2px rgb(0 0 0 / 16%),0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)</code></td></tr><tr><td><code>--archive-app-page-title-font-size</code></td><td>页面标题字体大小</td><td><code>30px</code></td><td><code>30px</code></td></tr><tr><td><code>--archive-app-page-fixed-font-size</code></td><td>页面标题在固定到顶部时的字体大小</td><td><code>24px</code></td><td><code>24px</code></td></tr><tr><td><code>--archive-app-page-title-color</code></td><td>页面标题字体颜色</td><td><code>#000</code></td><td><code>#000</code></td></tr><tr><td><code>--archive-app-page-description-font-size</code></td><td>页面描述字体大小</td><td><code>14px</code></td><td><code>14px</code></td></tr><tr><td><code>--archive-app-page-description-color</code></td><td>页面描述字体颜色</td><td><code>#2f3540</code></td><td><code>#6f7785</code></td></tr></tbody></table><h4 id="demo-css-变量" tabindex="-1">Demo css 变量 <a class="header-anchor" href="#demo-css-变量" aria-hidden="true">#</a></h4><table><thead><tr><th>变量名</th><th>说明</th><th>默认主题</th><th>seer主题</th></tr></thead><tbody><tr><td><code>--archive-app-demo-width</code></td><td>demo 宽度</td><td><code>100%</code></td><td><code>100%</code></td></tr><tr><td><code>--archive-app-demo-padding</code></td><td>demo padding</td><td><code>0</code></td><td><code>0</code></td></tr><tr><td><code>--archive-app-demo-margin-bottom</code></td><td>demo 底部 margin</td><td><code>16px</code></td><td><code>16px</code></td></tr><tr><td><code>--archive-app-demo-title-font-size</code></td><td>demo 标题字体大小</td><td><code>20px</code></td><td><code>20px</code></td></tr><tr><td><code>--archive-app-demo-title-color</code></td><td>demo 标题字体颜色</td><td><code>#000</code></td><td><code>#000</code></td></tr><tr><td><code>--archive-app-demo-description-font-size</code></td><td>demo 描述字体大小</td><td><code>14px</code></td><td><code>14px</code></td></tr><tr><td><code>--archive-app-demo-description-color</code></td><td>demo 描述字体颜色</td><td><code>#2f3540</code></td><td><code>#6f7785</code></td></tr><tr><td><code>--archive-app-demo-content-padding</code></td><td>demo 内容区域padding</td><td><code>8px</code></td><td><code>8px</code></td></tr><tr><td><code>--archive-app-demo-content-border</code></td><td>demo 内容区域border</td><td><code>none</code></td><td><code>none</code></td></tr><tr><td><code>--archive-app-demo-content-background</code></td><td>demo 内容区域背景颜色</td><td><code>#f7f9fc</code></td><td><code>#f7f9fc</code></td></tr><tr><td><code>--archive-app-demo-content-box-shadow</code></td><td>demo 内容区域阴影</td><td><code>inset 0 0 4px #0000001a</code></td><td><code>inset 0 0 4px #0000001a</code></td></tr><tr><td><code>--archive-app-demo-stage-padding</code></td><td>demo 展示区域padding</td><td><code>22px</code></td><td><code>22px</code></td></tr><tr><td><code>--archive-app-demo-stage-border</code></td><td>demo 展示区域border</td><td><code>1px solid #edf1f7</code></td><td><code>1px solid #edf1f7</code></td></tr><tr><td><code>--archive-app-demo-stage-background</code></td><td>demo 展示区域背景颜色</td><td><code>#fff</code></td><td><code>#fff</code></td></tr><tr><td><code>--archive-app-demo-tools-height</code></td><td>demo 工具栏高度</td><td><code>20px</code></td><td><code>20px</code></td></tr><tr><td><code>--archive-app-demo-tools-gap</code></td><td>demo 工具栏间距</td><td><code>16px</code></td><td><code>16px</code></td></tr><tr><td><code>--archive-app-demo-tools-background</code></td><td>demo 工具栏背景颜色</td><td><code>#fff</code></td><td><code>#fff</code></td></tr><tr><td><code>--archive-app-demo-tools-padding</code></td><td>demo 工具栏padding</td><td><code>0 20px 0 0</code></td><td><code>0 20px 0 0</code></td></tr><tr><td><code>--archive-app-demo-tools-font-size</code></td><td>demo 工具栏字体大小</td><td><code>16px</code></td><td><code>16px</code></td></tr><tr><td><code>--archive-app-demo-source-code-transition-duration</code></td><td>demo 源码展开收起动画时间</td><td><code>0.2s</code></td><td><code>0.2s</code></td></tr><tr><td><code>--archive-app-demo-source-code-transition-timing-fn</code></td><td>demo 源码展开收起动画缓动函数</td><td><code>cubic-bezier(0.37, 0, 0.63, 1)</code></td><td><code>cubic-bezier(0.37, 0, 0.63, 1)</code></td></tr><tr><td><code>--archive-app-demo-control-label-width</code></td><td>demo 控件label宽度</td><td><code>150px</code></td><td><code>150px</code></td></tr><tr><td><code>--archive-app-demo-control-label-font-size</code></td><td>demo 控件label字体大小</td><td><code>14px</code></td><td><code>14px</code></td></tr><tr><td><code>--archive-app-demo-control-font-size</code></td><td>demo 控件字体大小</td><td><code>14px</code></td><td><code>14px</code></td></tr></tbody></table><h4 id="idux-组件-css-变量" tabindex="-1">Idux 组件 css 变量 <a class="header-anchor" href="#idux-组件-css-变量" aria-hidden="true">#</a></h4><p>支持全部的 <code>idux</code> 组件 css 变量，但是所有的变量均不以 <code>--ix</code> 开头，而是以 <code>--archive-ix</code> 开头。</p><p>有关 <code>idux</code> 组件相关，请查看 <a href="https://idux.site" target="_blank" rel="noreferrer">Idux</a>。</p>', 17);
const _hoisted_19 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_19);
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/archive/archive/docs/src/1-guide/3-customization/2-Theme.page.md"]]);
const __archive_data__ = {
  "id": "archive-item-14",
  "filename": "2-Theme.page.md",
  "relativePath": "1-guide/3-customization/2-Theme.page.md",
  "query": {},
  instance: Ui("archive-vue-loader-0", Component)
};
export {
  __archive_data__ as default
};
