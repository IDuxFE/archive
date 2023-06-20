import { _ as _export_sfc, o as openBlock, c as createElementBlock, a as createStaticVNode, U as Ui } from "./_plugin-vue_export-helper-e63733f0.js";
JSON.parse('{"title":"Archive 配置","description":"","frontmatter":{},"headers":[{"level":2,"title":"配置文件","slug":"配置文件","link":"#配置文件","children":[]},{"level":2,"title":"类型定义","slug":"类型定义","link":"#类型定义","children":[{"level":3,"title":"setupFile","slug":"setupfile","link":"#setupfile","children":[]},{"level":3,"title":"dist","slug":"dist","link":"#dist","children":[]},{"level":3,"title":"root","slug":"root","link":"#root","children":[]},{"level":3,"title":"navConfig","slug":"navconfig","link":"#navconfig","children":[]},{"level":3,"title":"watchNavConfig","slug":"watchnavconfig","link":"#watchnavconfig","children":[]},{"level":3,"title":"pageLoaders","slug":"pageloaders","link":"#pageloaders","children":[]},{"level":3,"title":"demoLoaders","slug":"demoloaders","link":"#demoloaders","children":[]},{"level":3,"title":"markdownOptions","slug":"markdownoptions","link":"#markdownoptions","children":[]},{"level":3,"title":"theme","slug":"theme","link":"#theme","children":[]}]}],"relativePath":"src/2-config/1-Basic.page.md"}');
const _sfc_main = { name: "1-Basic.page.md" };
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h1 id="archive-配置" tabindex="-1">Archive 配置 <a class="header-anchor" href="#archive-配置" aria-hidden="true">#</a></h1><h2 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-hidden="true">#</a></h2><p>配置文件在执行 <code>archive</code> 命令的上下文目录或上层目录的 <code>archive.config.js</code> 文件，默认导出 <code>ArchiveConfig</code>。</p><p>可以通过 <code>@idux/archive</code> 暴露的 <code>defineConfig</code> 函数定义配置。</p><h2 id="类型定义" tabindex="-1">类型定义 <a class="header-anchor" href="#类型定义" aria-hidden="true">#</a></h2><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ArchiveConfig</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">setupFile</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">navConfig</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NavRecord</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">watchNavConfig</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#F07178;">update</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">pageLoaders</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Loader</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">demoLoaders</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Loader</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">markdownOptions</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MarkdownOptions</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">theme</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ArchiveThemeOptions</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">dist</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">root</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><h3 id="setupfile" tabindex="-1">setupFile <a class="header-anchor" href="#setupfile" aria-hidden="true">#</a></h3><ul><li>类型: <code>string</code></li><li>是否可选: 是</li></ul><p>初始化脚本路径。脚本导出内容的类型请参考：<a href="/config/Setup/">初始化脚本</a></p><h3 id="dist" tabindex="-1">dist <a class="header-anchor" href="#dist" aria-hidden="true">#</a></h3><ul><li>类型: <code>string</code></li><li>是否可选: 是</li></ul><p>打包的目标目录，默认为配置文件所在目录的 <code>dist</code> 文件夹。</p><h3 id="root" tabindex="-1">root <a class="header-anchor" href="#root" aria-hidden="true">#</a></h3><ul><li>类型: <code>string</code></li><li>是否可选: 是</li></ul><p>文档根目录，默认为 <code>vite</code> 配置文件中的 <code>root</code> 或 <code>process.cwd()</code>。</p><h3 id="navconfig" tabindex="-1">navConfig <a class="header-anchor" href="#navconfig" aria-hidden="true">#</a></h3><ul><li>类型: <code>(root: string) =&gt; NavRecord[]</code></li><li>是否可选: 是</li></ul><p>导航配置函数，用于自定义导航列表。详情请参考：<a href="/guide/documents/Nav/">导航配置</a>。</p><h3 id="watchnavconfig" tabindex="-1">watchNavConfig <a class="header-anchor" href="#watchnavconfig" aria-hidden="true">#</a></h3><ul><li>类型: <code>(update: () =&gt; void) =&gt; void</code></li><li>是否可选: 是</li></ul><p>在该函数中创建对导航变更的监听，监听到变化之后执行 <code>update</code> 函数更新导航配置，用于 <code>HMR</code>。</p><h3 id="pageloaders" tabindex="-1">pageLoaders <a class="header-anchor" href="#pageloaders" aria-hidden="true">#</a></h3><ul><li>类型: <code>Loader[]</code></li><li>是否可选: 是</li></ul><p>用于页面内容解析的 <code>Loader</code>，关于 <code>Loader</code> 请参考 <a href="/loader/Brief/">Loader</a>。</p><h3 id="demoloaders" tabindex="-1">demoLoaders <a class="header-anchor" href="#demoloaders" aria-hidden="true">#</a></h3><ul><li>类型: <code>Loader[]</code></li><li>是否可选: 是</li></ul><p>用于Demo内容解析的 <code>Loader</code>，关于 <code>Loader</code> 请参考 <a href="/loader/Brief/">Loader</a>。</p><h3 id="markdownoptions" tabindex="-1">markdownOptions <a class="header-anchor" href="#markdownoptions" aria-hidden="true">#</a></h3><ul><li>类型: <code>MarkdownOptions</code></li><li>是否可选: 是</li></ul><p>Markdown 解析配置，继承自 <code>markdown-it</code> 的配置</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MarkdownOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MarkdownIt</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">Options</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">lineNumbers</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">config</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">md</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MarkdownIt</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">anchor</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">anchorPlugin</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">AnchorOptions</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">attrs</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">leftDelimiter</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">rightDelimiter</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">allowedAttributes</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">disable</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">};</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">frontmatter</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">FrontmatterPluginOptions</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">headers</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HeadersPluginOptions</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">sfc</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SfcPluginOptions</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">theme</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ThemeOptions</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">toc</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TocPluginOptions</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">externalLinks</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">&gt;;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><h3 id="theme" tabindex="-1">theme <a class="header-anchor" href="#theme" aria-hidden="true">#</a></h3><ul><li>类型: <code>ArchiveThemeOptions</code></li><li>是否可选: 是</li></ul><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppThemeOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">logo</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ProLayoutLogo</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">breakpoints</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">BreakpointKey</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">layout</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">theme</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ProLayoutTheme</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ProLayoutType</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">siderCollapsable</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SiderCollapsable</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">footer</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">page</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">headerAffix</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">enableAnchor</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">anchorMaxLevel</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ArchiveThemeOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppThemeOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">themeStyle</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ArchiveThemeStyle</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>主题配置</p><h4 id="theme-logo" tabindex="-1">theme.logo <a class="header-anchor" href="#theme-logo" aria-hidden="true">#</a></h4><ul><li>类型: <code>ProLayoutLogo</code></li><li>是否可选: 是</li></ul><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ProLayoutLogo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">link</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>App Logo</p><h4 id="theme-breakpoints" tabindex="-1">theme.breakpoints <a class="header-anchor" href="#theme-breakpoints" aria-hidden="true">#</a></h4><ul><li>类型: <code>Record&lt;BreakpointKey, string&gt;</code></li><li>是否可选: 是</li></ul><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BreakpointKeys</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xs</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">sm</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">md</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">lg</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xl</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div><p>指定响应式断点边界宽度。</p><h4 id="theme-layout-theme" tabindex="-1">theme.layout.theme <a class="header-anchor" href="#theme-layout-theme" aria-hidden="true">#</a></h4><ul><li>类型: <code>ProLayoutTheme</code></li><li>是否可选: 是</li></ul><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MenuTheme</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">light</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">dark</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ProLayoutTheme</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MenuTheme</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">header</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MenuTheme</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">sider</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MenuTheme</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>布局框架主题设置。</p><h4 id="theme-layout-type" tabindex="-1">theme.layout.type <a class="header-anchor" href="#theme-layout-type" aria-hidden="true">#</a></h4><ul><li>类型: <code>ProLayoutType</code></li><li>是否可选: 是</li></ul><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ProLayoutType</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">header</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">sider</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">mixin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">both</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div><p>指定布局框架类型。</p><h4 id="theme-layout-sidercollapsable" tabindex="-1">theme.layout.siderCollapsable <a class="header-anchor" href="#theme-layout-sidercollapsable" aria-hidden="true">#</a></h4><ul><li>类型: <code>boolean | SiderCollapsable</code></li><li>是否可选: 是</li></ul><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SiderCollapsable</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">top</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">bottom</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div><p>指定布局框架的侧边栏是否可以收起。</p><ul><li><code>top</code> 代表收起展开按钮在侧边栏顶部</li><li><code>bottom</code> 代表收起展开按钮在侧边栏底部</li></ul><h4 id="theme-footer" tabindex="-1">theme.footer <a class="header-anchor" href="#theme-footer" aria-hidden="true">#</a></h4><ul><li>类型: <code>string</code></li><li>是否可选: 是</li></ul><p>指定 App 的 <code>footer</code> 内容。</p><h4 id="theme-page-headeraffix" tabindex="-1">theme.page.headerAffix <a class="header-anchor" href="#theme-page-headeraffix" aria-hidden="true">#</a></h4><ul><li>类型: <code>boolean</code></li><li>是否可选: 是</li></ul><p>是否将页面的头部在滚动到下方是固定到顶部。</p><h4 id="theme-page-enableanchor" tabindex="-1">theme.page.enableAnchor <a class="header-anchor" href="#theme-page-enableanchor" aria-hidden="true">#</a></h4><ul><li>类型: <code>boolean</code></li><li>是否可选: 是</li></ul><p>是否启用右侧快捷选择锚点。</p><p>启动后则会根据页面内容中的 <code>h</code> 标签层级自动生成锚点</p><h4 id="theme-page-anchormaxlevel" tabindex="-1">theme.page.anchorMaxLevel <a class="header-anchor" href="#theme-page-anchormaxlevel" aria-hidden="true">#</a></h4><ul><li>类型: <code>number</code></li><li>是否可选: 是</li></ul><p>锚点的最大层数。</p><p>例如配置为 <code>3</code> 则生成的锚点最大匹配3层，<code>h1</code>、<code>h2</code>、<code>h3</code> 标签可以被解析，但 <code>h4</code> 及更小的标签不会被解析。</p>', 70);
const _hoisted_72 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_72);
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/archive/archive/docs/src/2-config/1-Basic.page.md"]]);
const __archive_data__ = {
  "id": "archive-item-17",
  "filename": "1-Basic.page.md",
  "relativePath": "2-config/1-Basic.page.md",
  "query": {},
  instance: Ui("archive-vue-loader-0", Component)
};
export {
  __archive_data__ as default
};
