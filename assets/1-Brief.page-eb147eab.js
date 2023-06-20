import { _ as _export_sfc, o as openBlock, c as createElementBlock, a as createStaticVNode, U as Ui } from "./_plugin-vue_export-helper-e63733f0.js";
JSON.parse('{"title":"介绍","description":"","frontmatter":{},"headers":[{"level":2,"title":"@idux/archive-vite-plugin 使用以及参数","slug":"idux-archive-vite-plugin-使用以及参数","link":"#idux-archive-vite-plugin-使用以及参数","children":[{"level":3,"title":"root","slug":"root","link":"#root","children":[]}]},{"level":2,"title":"更多","slug":"更多","link":"#更多","children":[]}],"relativePath":"src/3-loader/1-Brief.page.md"}');
const _sfc_main = { name: "1-Brief.page.md" };
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h1 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-hidden="true">#</a></h1><p>Idux Archive 的核心插件 <code>@idux/archive-vite-plugin</code> 被用来将不同的文件解析成框架无关的 archive 实例并在 app 框架中挂载，但该插件本身只负责这个过程中的管理以及和 <code>vite</code> 本身的联动，并不具备实际的解析能力，解析会交给不同的 <code>Loader</code> 进行。</p><p><code>@idux/archive-vite-plugin</code> 规定了 <code>Loader</code> 的接口，并在内部调用不同 <code>Loader</code> 的接口来执行对文件的加载和解析。</p><p>通过该插件，指定的虚拟文件路径会返回解析后的 <code>Item</code></p><p>例如：</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> ArchiveItem </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">archive:./path/to/component.vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div><p><code>ArchiveItem</code> 即为解析后的 <code>ResolvedItem</code>。</p><p>可以使用如下语句执行解析后实例的挂载：</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">ArchiveItem</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">instance</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#A6ACCD;">(document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#demo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>\n<span class="line"></span></code></pre></div><p>Idux Archive 则基于以上原理进行管理和组装，实现了框架无关的 demo 文档管理。</p><h2 id="idux-archive-vite-plugin-使用以及参数" tabindex="-1"><code>@idux/archive-vite-plugin</code> 使用以及参数 <a class="header-anchor" href="#idux-archive-vite-plugin-使用以及参数" aria-hidden="true">#</a></h2><p>插件创建函数定义如下：</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createArchivePlugin</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Options</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Plugin</span></span>\n<span class="line"></span></code></pre></div><p>使用以下语句引用：</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createArchivePlugin</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@idux/archive-vite-plugin</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div><p>通过调用 <code>createArchivePlugin</code> 来创建 <code>vite</code> 插件。</p><p><code>Options</code>类型定义如下</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Options</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">root</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">loaders</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Loader</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><h3 id="root" tabindex="-1">root <a class="header-anchor" href="#root" aria-hidden="true">#</a></h3><p>解析所用的文件根目录，默认为 <code>vite</code> 配置中的 <code>root</code>。</p><h2 id="更多" tabindex="-1">更多 <a class="header-anchor" href="#更多" aria-hidden="true">#</a></h2><p>以上是对 <code>@idux/archive-vite-plugin</code> 以及 <code>Loader</code> 的内容介绍，我们当前提供了 <code>vue3</code> 和 <code>vue2</code> 的 <code>Loader</code>，对于其他框架或者特殊的解析需求，可以根据以上内容自定义 <code>Loader</code>。</p>', 22);
const _hoisted_24 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_24);
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/archive/archive/docs/src/3-loader/1-Brief.page.md"]]);
const __archive_data__ = {
  "id": "archive-item-19",
  "filename": "1-Brief.page.md",
  "relativePath": "3-loader/1-Brief.page.md",
  "query": {},
  instance: Ui("archive-vue-loader-0", Component)
};
export {
  __archive_data__ as default
};
