import { _ as _export_sfc, o as openBlock, c as createElementBlock, a as createStaticVNode, U as Ui } from "./_plugin-vue_export-helper-e63733f0.js";
JSON.parse('{"title":"Vue2 Demo","description":"","frontmatter":{},"headers":[{"level":2,"title":"引入","slug":"引入","link":"#引入","children":[]},{"level":2,"title":"Demo 编写","slug":"demo-编写","link":"#demo-编写","children":[]}],"relativePath":"src/1-guide/2-documents/3-demo/3-Vue2.page.md"}');
const _sfc_main = { name: "3-Vue2.page.md" };
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h1 id="vue2-demo" tabindex="-1">Vue2 Demo <a class="header-anchor" href="#vue2-demo" aria-hidden="true">#</a></h1><p>Vue2 SFC 格式的 demo 通过Loader <code>@idux/archive-loader-vue2</code> 进行解析。</p><h2 id="引入" tabindex="-1">引入 <a class="header-anchor" href="#引入" aria-hidden="true">#</a></h2><p>需要引入Loader <code>@idux/archive-loader-vue2</code> 来解析 vue2 SFC 格式的 demo，在配置文件中添加以下代码：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> defineConfig </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@idux/archive</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> createArchiveVue2DemoLoader </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@idux/archive-loader-vue2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineConfig</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">...</span></span>\n<span class="line"><span style="color:#A6ACCD;">  demoLoaders: [</span><span style="color:#82AAFF;">createArchiveVue2DemoLoader</span><span style="color:#A6ACCD;">()]</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">...</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div><h2 id="demo-编写" tabindex="-1">Demo 编写 <a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a></h2><p>参考 <a href="/loader/vue2/Usage/">Vue2 Loader</a></p>', 7);
const _hoisted_9 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_9);
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/archive/archive/docs/src/1-guide/2-documents/3-demo/3-Vue2.page.md"]]);
const __archive_data__ = {
  "id": "archive-item-12",
  "filename": "3-Vue2.page.md",
  "relativePath": "1-guide/2-documents/3-demo/3-Vue2.page.md",
  "query": {},
  instance: Ui("archive-vue-loader-0", Component)
};
export {
  __archive_data__ as default
};
