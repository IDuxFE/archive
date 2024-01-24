import { _ as _export_sfc, o as openBlock, c as createElementBlock, a as createStaticVNode, U as Ui } from "./_plugin-vue_export-helper-e63733f0.js";
JSON.parse('{"title":"初始化脚本","description":"","frontmatter":{},"headers":[{"level":2,"title":"语法要求","slug":"语法要求","link":"#语法要求","children":[]},{"level":2,"title":"类型定义","slug":"类型定义","link":"#类型定义","children":[{"level":3,"title":"setupApp","slug":"setupapp","link":"#setupapp","children":[]},{"level":3,"title":"renderers","slug":"renderers","link":"#renderers","children":[]},{"level":3,"title":"options","slug":"options","link":"#options","children":[]}]}],"relativePath":"src/2-config/2-Setup.page.md"}');
const _sfc_main = { name: "2-Setup.page.md" };
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h1 id="初始化脚本" tabindex="-1">初始化脚本 <a class="header-anchor" href="#初始化脚本" aria-hidden="true">#</a></h1><p>初始化脚本用于初始化文档框架所在的 <code>vue</code> app, 以及配置自定义渲染函数和自定义选项。</p><h2 id="语法要求" tabindex="-1">语法要求 <a class="header-anchor" href="#语法要求" aria-hidden="true">#</a></h2><p><code>.ts</code> 或 <code>.js</code> 文件。</p><h2 id="类型定义" tabindex="-1">类型定义 <a class="header-anchor" href="#类型定义" aria-hidden="true">#</a></h2><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SetupContext</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">setupApp</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">App</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">renderers</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppRenderers</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">options</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppSetupOptions</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><h3 id="setupapp" tabindex="-1">setupApp <a class="header-anchor" href="#setupapp" aria-hidden="true">#</a></h3><ul><li>类型: <code>(app: App) =&gt; void</code></li><li>是否可选: 是</li></ul><p>初始化文档框架所在的 <code>vue</code> app，通常用于注册一些自定义渲染内容中用到的特性。</p><h3 id="renderers" tabindex="-1">renderers <a class="header-anchor" href="#renderers" aria-hidden="true">#</a></h3><ul><li>类型: <code>AppRenderers</code></li><li>是否可选: 是</li></ul><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppRenderers</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">logo</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppRenderer</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ProLayoutLogo</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">false</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">layoutHeaderContent</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppRenderer</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">MenuProps</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">false</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">layoutHeaderExtra</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppRenderer</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">never</span><span style="color:#89DDFF;">&gt;,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">false</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">layoutSiderContent</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppRenderer</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">MenuProps</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">false</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">layoutSiderHeader</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppRenderer</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">layoutSiderHeaderLabel</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppRenderer</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">layoutSiderFooter</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppRenderer</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">never</span><span style="color:#89DDFF;">&gt;,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">false</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">layoutSiderFooterLabel</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppRenderer</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">never</span><span style="color:#89DDFF;">&gt;,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">false</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">pageHeader</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PageRenderer</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">PageHeaderRendererData</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">pageContent</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PageRenderer</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">PageContentRendererData</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>自定义渲染函数配置。</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppRendererDataBase</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">theme</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ResolvedAppThemeOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// 主题配置</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">route</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RouteLocationNormalizedLoaded</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// route</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">breakpoints</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">BreakpointKey</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">activeRecords</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ResolvedNavRecord</span><span style="color:#A6ACCD;">[] </span><span style="color:#676E95;">// 当前激活的导航节点</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PageRendererDataBase</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SetOptional</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">AppRendererDataBase</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">route</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">activeRecords</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><h4 id="renderers-logo" tabindex="-1">renderers.logo <a class="header-anchor" href="#renderers-logo" aria-hidden="true">#</a></h4><ul><li>类型: <code>(data: ProLayoutLogo, nodes: VNodeChild) =&gt; VNodeChild</code></li><li>是否可选: 是</li></ul><p>logo 自定义渲染。</p><p><code>nodes</code> 参数代表框架默认渲染的节点列表，以下均相同，不再重复。</p><p><code>ProLayoutLogo</code> 参考 <a href="https://idux.site/pro/layout/zh" target="_blank" rel="noreferrer">ProLayout</a>。</p><h4 id="renderers-layoutheadercontent" tabindex="-1">renderers.layoutHeaderContent <a class="header-anchor" href="#renderers-layoutheadercontent" aria-hidden="true">#</a></h4><ul><li>类型: <code>(data: AppRendererDataBase &amp; MenuProps, nodes: VNodeChild) =&gt; VNodeChild</code></li><li>是否可选: 是</li></ul><p>布局框架头部自定义渲染。</p><p><code>MenuProps</code> 参考 <a href="https://idux.site/components/menu/zh" target="_blank" rel="noreferrer">Menu</a>。</p><h4 id="renderers-layoutheaderextra" tabindex="-1">renderers.layoutHeaderExtra <a class="header-anchor" href="#renderers-layoutheaderextra" aria-hidden="true">#</a></h4><ul><li>类型: <code>(data: AppRendererDataBase, nodes: VNodeChild) =&gt; VNodeChild</code></li><li>是否可选: 是</li></ul><p>布局框架头部额外内容自定义渲染。</p><h4 id="renderers-layoutsidercontent" tabindex="-1">renderers.layoutSiderContent <a class="header-anchor" href="#renderers-layoutsidercontent" aria-hidden="true">#</a></h4><ul><li>类型: <code>(data: MenuProps, nodes: VNodeChild) =&gt; VNodeChild</code></li><li>是否可选: 是</li></ul><p>布局框架侧边栏内容区域自定义渲染。</p><p><code>MenuProps</code> 参考 <a href="https://idux.site/components/menu/zh" target="_blank" rel="noreferrer">Menu</a>。</p><h4 id="renderers-layoutsiderheader" tabindex="-1">renderers.layoutSiderHeader <a class="header-anchor" href="#renderers-layoutsiderheader" aria-hidden="true">#</a></h4><ul><li>类型: <code>(data: AppRendererDataBase, nodes: VNodeChild) =&gt; VNodeChild</code></li><li>是否可选: 是</li></ul><p>布局框架侧边栏头部区域自定义渲染。</p><h4 id="renderers-layoutsiderheaderlabel" tabindex="-1">renderers.layoutSiderHeaderLabel <a class="header-anchor" href="#renderers-layoutsiderheaderlabel" aria-hidden="true">#</a></h4><ul><li>类型: <code>(data: AppRendererDataBase, nodes: VNodeChild) =&gt; VNodeChild</code></li><li>是否可选: 是</li></ul><p>布局框架侧边栏头部Label自定义渲染。</p><h4 id="renderers-layoutsiderfooter" tabindex="-1">renderers.layoutSiderFooter <a class="header-anchor" href="#renderers-layoutsiderfooter" aria-hidden="true">#</a></h4><ul><li>类型: <code>(data: AppRendererDataBase, nodes: VNodeChild) =&gt; VNodeChild</code></li><li>是否可选: 是</li></ul><p>布局框架侧边栏底部自定义渲染。</p><h4 id="renderers-layoutsiderfooterlabel" tabindex="-1">renderers.layoutSiderFooterLabel <a class="header-anchor" href="#renderers-layoutsiderfooterlabel" aria-hidden="true">#</a></h4><ul><li>类型: <code>(data: AppRendererDataBase, nodes: VNodeChild) =&gt; VNodeChild</code></li><li>是否可选: 是</li></ul><p>布局框架侧边栏底部Label自定义渲染。</p><h4 id="renderers-pageheader" tabindex="-1">renderers.pageHeader <a class="header-anchor" href="#renderers-pageheader" aria-hidden="true">#</a></h4><ul><li>类型: <code>(data: PageRendererDataBase &amp; PageHeaderRendererData, nodes: VNodeChild) =&gt; VNodeChild</code></li><li>是否可选: 是</li></ul><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PageHeaderRendererData</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">description</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">tabs</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ResolvedPageTab</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">activeTabId</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">setActiveTabId</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">tabId</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>页面头部自定义渲染。</p><h4 id="renderers-pagecontent" tabindex="-1">renderers.pageContent <a class="header-anchor" href="#renderers-pagecontent" aria-hidden="true">#</a></h4><ul><li>类型: <code>(data: PageRendererDataBase &amp; PageContentRendererData, nodes: VNodeChild) =&gt; VNodeChild</code></li><li>是否可选: 是</li></ul><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PageContentRendererData</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">demos</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ResolvedDemoItem</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">visibleDemoIds</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">setVisibleDemoIds</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">demosIds</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>页面内容自定义渲染。</p><h3 id="options" tabindex="-1">options <a class="header-anchor" href="#options" aria-hidden="true">#</a></h3><ul><li>类型: <code>AppSetupOptions</code></li><li>是否可选: 是</li></ul><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppSetupOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">getInitVisibleDemoIds</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">demos</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ResolvedDemoItem</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">getDemoTools</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">demos</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ResolvedDemoItem</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DemoTool</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><h4 id="options-getinitvisibledemoids" tabindex="-1">options.getInitVisibleDemoIds <a class="header-anchor" href="#options-getinitvisibledemoids" aria-hidden="true">#</a></h4><ul><li>类型: <code>(demos?: ResolvedDemoItem[]) =&gt; string[]</code></li><li>是否可选: 是</li></ul><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ResolvedDemoItem</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">D</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">object</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">object</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ResolvedItem</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">D</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">description</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">sourceCodes</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SourceCode</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>获取初始显示的DemoId列表。</p><p>关于 <code>ResolvedItem</code> 请参考 <a href="/loader/Brief/">Loader</a>。</p><h4 id="options-getdemotools" tabindex="-1">options.getDemoTools <a class="header-anchor" href="#options-getdemotools" aria-hidden="true">#</a></h4><ul><li>类型: <code>(demo: ResolvedDemoItem) =&gt; DemoTool[]</code></li><li>是否可选: 是</li></ul><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DemoToolBase</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">tooltip</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// 展开收起源码</span></span>\n<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DemoToolExpandCode</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SetOptional</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Except</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">DemoToolBase</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">render</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">&gt;,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tooltip</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">expandCode</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">expanded</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// 展开收起控件</span></span>\n<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DemoToolExpandControls</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SetOptional</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Except</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">DemoToolBase</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">render</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">&gt;,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tooltip</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">expandControls</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">expanded</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// 复制源码</span></span>\n<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DemoToolCopyCode</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SetOptional</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">DemoToolBase</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tooltip</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">render</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">copyCode</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// 链接</span></span>\n<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DemoToolLink</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DemoToolBase</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">link</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">link</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DemoTool</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> (</span><span style="color:#FFCB6B;">DemoToolBase</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">undefined</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DemoToolExpandCode</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DemoToolCopyCode</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DemoToolLink</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DemoToolExpandControls</span></span>\n<span class="line"></span></code></pre></div><p>获取Demo对应的工具栏工具列表</p><div class="info custom-block"><p class="custom-block-title">注：展开收起源码按钮固定展示，在配置中提供仅仅会改变其顺序。</p></div><p>关于 <code>ResolvedItem</code> 请参考 <a href="/loader/Brief/">Loader</a>。</p>', 64);
const _hoisted_66 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_66);
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/archive/archive/docs/src/2-config/2-Setup.page.md"]]);
const __archive_data__ = {
  "id": "archive-item-18",
  "filename": "2-Setup.page.md",
  "relativePath": "2-config/2-Setup.page.md",
  "query": {},
  instance: Ui("archive-vue-loader-0", Component)
};
export {
  __archive_data__ as default
};