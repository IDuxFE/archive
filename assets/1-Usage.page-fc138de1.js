import { _ as _export_sfc, o as openBlock, c as createElementBlock, a as createStaticVNode, U as Ui } from "./_plugin-vue_export-helper-e63733f0.js";
JSON.parse('{"title":"基础使用","description":"","frontmatter":{},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"引入","slug":"引入","link":"#引入","children":[]},{"level":2,"title":"组件编写","slug":"组件编写","link":"#组件编写","children":[{"level":3,"title":"主体内容","slug":"主体内容","link":"#主体内容","children":[]},{"level":3,"title":"元信息","slug":"元信息","link":"#元信息","children":[]}]}],"relativePath":"src/3-loader/6-vue2/1-Usage.page.md"}');
const _sfc_main = { name: "1-Usage.page.md" };
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h1 id="基础使用" tabindex="-1">基础使用 <a class="header-anchor" href="#基础使用" aria-hidden="true">#</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-hidden="true">#</a></h2><p>Vue2 SFC 格式的文件通过Loader <code>@idux/archive-loader-vue2</code> 进行解析。</p><p><code>@idux/archive-loader-vue2</code> 暴露了 <code>createArchiveVueLoader</code> 创建 Loader。</p><p>同时暴露了 <code>createArchiveVue2PageLoader</code> 以及 <code>createArchiveVue2DemoLoader</code> 用于页面和Demo的解析，其均为对 <code>createArchiveVueLoader</code> 调用的封装，预指定了Loader的解析前缀。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-hidden="true">#</a></h2><div class="language-bash"><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">pnpm add @idux/archive-loader-vue2</span></span>\n<span class="line"></span></code></pre></div><h2 id="引入" tabindex="-1">引入 <a class="header-anchor" href="#引入" aria-hidden="true">#</a></h2><p>在配置文件中添加以下代码：</p><div class="language-js"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> resolve </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">path</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> defineConfig </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@idux/archive</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> createArchiveVue2PageLoader</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> createArchiveVue2DemoLoader </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@idux/archive-loader-vue2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineConfig</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">root</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./demos</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">theme</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">themeStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">seer</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">layout</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">sider</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">pageLoaders</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#82AAFF;">createArchiveVue2PageLoader</span><span style="color:#A6ACCD;">()]</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">demoLoaders</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#82AAFF;">createArchiveVue2DemoLoader</span><span style="color:#A6ACCD;">()]</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div><h2 id="组件编写" tabindex="-1">组件编写 <a class="header-anchor" href="#组件编写" aria-hidden="true">#</a></h2><h3 id="主体内容" tabindex="-1">主体内容 <a class="header-anchor" href="#主体内容" aria-hidden="true">#</a></h3><p>与编写普通的 vue SFC 文件一致</p><h3 id="元信息" tabindex="-1">元信息 <a class="header-anchor" href="#元信息" aria-hidden="true">#</a></h3><p>通过 <code>&lt;archive-meta&gt;</code> 自定义 block 编写，详细配置内容请参考：<a href="/loader/vue2/Meta/">元信息</a></p>', 15);
const _hoisted_17 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_17);
}
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/archive/archive/docs/src/3-loader/6-vue2/1-Usage.page.md"]]);
const __archive_data__ = {
  "id": "archive-item-26",
  "filename": "1-Usage.page.md",
  "relativePath": "3-loader/6-vue2/1-Usage.page.md",
  "query": {},
  instance: Ui("archive-vue-loader-0", Component)
};
export {
  __archive_data__ as default
};
