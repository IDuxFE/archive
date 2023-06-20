import { _ as _export_sfc, o as openBlock, c as createElementBlock, a as createStaticVNode, U as Ui } from "./_plugin-vue_export-helper-e63733f0.js";
JSON.parse('{"title":"Markdown 格式 文档页面","description":"","frontmatter":{},"headers":[],"relativePath":"src/1-guide/2-documents/2-page/4-Markdown.page.md"}');
const _sfc_main = { name: "4-Markdown.page.md" };
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h1 id="markdown-格式-文档页面" tabindex="-1">Markdown 格式 文档页面 <a class="header-anchor" href="#markdown-格式-文档页面" aria-hidden="true">#</a></h1><p>由于目前 <code>.md</code> 文件会被内置插件转换成 vue SFC，因此 <code>.md</code> 文件的处理与 <code>.vue</code> 文件相同，仅需要注意，需要配置 <code>@vitejs/plugin-vue</code> 的 <code>include</code> 允许接收 <code>.md</code> 文件即可。</p><p>示例如下：</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">defineConfig</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vite</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> vue </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@vitejs/plugin-vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// https://vitejs.dev/config/</span></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineConfig</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">vue</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">include</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\.</span><span style="color:#89DDFF;">(</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">md</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">$</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">] </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  ]</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"></span></code></pre></div>', 4);
const _hoisted_6 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_6);
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/archive/archive/docs/src/1-guide/2-documents/2-page/4-Markdown.page.md"]]);
const __archive_data__ = {
  "id": "archive-item-9",
  "filename": "4-Markdown.page.md",
  "relativePath": "1-guide/2-documents/2-page/4-Markdown.page.md",
  "query": {},
  instance: Ui("archive-vue-loader-0", Component)
};
export {
  __archive_data__ as default
};
