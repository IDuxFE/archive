import { d as defineComponent, o as openBlock, c as createElementBlock, p as pushScopeId, e as popScopeId, f as createBaseVNode, _ as _export_sfc, U as Ui$1, g as computed, t as toDisplayString, u as unref, L as Li, h as createVNode, a as createStaticVNode, i as createTextVNode } from "./_plugin-vue_export-helper-e63733f0.js";
import { U as Ui, D as Demo, I as IxMessageProvider } from "./Demo-099c9512.js";
import { i as iduxInstall, h } from "./app-default-a73ca19d.js";
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function createDemoInstance(resolvedDemoItem, tools, setupApp) {
  const instance = Ui("__archive_app_vue_instance__", Demo, {
    setupApp(app) {
      app.use(iduxInstall);
      setupApp == null ? void 0 : setupApp(app);
    },
    renderApp(children) {
      return h(IxMessageProvider, children);
    }
  });
  const mount = (el) => {
    instance.unmount();
    instance.mount(el, { resolvedDemoItem, tools });
  };
  const unmount = () => instance.unmount();
  const setData = () => {
  };
  const getData = () => void 0;
  const watchData = () => {
  };
  return {
    mount,
    unmount,
    setData,
    getData,
    watchData
  };
}
const _withScopeId$1 = (n) => (pushScopeId("data-v-4f5b670c"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode(
  "h3",
  null,
  "Source Code",
  -1
  /* HOISTED */
));
const _hoisted_2$2 = [
  _hoisted_1$2
];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SourceCode",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, _hoisted_2$2);
    };
  }
});
const SourceCode_vue_vue_type_style_index_0_scoped_4f5b670c_lang = "";
const Component$3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-4f5b670c"], ["__file", "/home/runner/work/archive/archive/docs/demos/SourceCode.vue"]]);
const __archive_data__$3 = {
  "id": "archive-item-29",
  "filename": "SourceCode.vue",
  "relativePath": "../demos/SourceCode.vue",
  "query": {},
  "sourceCodes": [{ "filename": "SourceCode.vue", "code": '<script setup lang="ts">\n// This starter template is using Vue 3 <script setup> SFCs\n// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup\n<\/script>\n\n<template>\n  <div>\n    <h3>Source Code</h3>\n  </div>\n</template>\n\n<style scoped>\n.logo {\n  height: 6em;\n  padding: 1.5em;\n  will-change: filter;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.vue:hover {\n  filter: drop-shadow(0 0 2em #42b883aa);\n}\n</style>', "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #676E95">// This starter template is using Vue 3 &lt;script setup&gt; SFCs</span></span>\n<span class="line"><span style="color: #676E95">// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">h3</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Source Code</span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">h3</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">style</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">scoped</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">logo</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">height</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">6em</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">padding</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1.5em</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">will-change</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> filter</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">logo</span><span style="color: #89DDFF">:</span><span style="color: #C792EA">hover</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">filter</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">drop-shadow</span><span style="color: #89DDFF">(</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">2em</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">646cffaa</span><span style="color: #89DDFF">);</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">logo</span><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">vue</span><span style="color: #89DDFF">:</span><span style="color: #C792EA">hover</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">filter</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">drop-shadow</span><span style="color: #89DDFF">(</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">2em</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">42b883aa</span><span style="color: #89DDFF">);</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">style</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }],
  instance: Ui$1("archive-vue-loader-1", Component$3)
};
const _withScopeId = (n) => (pushScopeId("data-v-407352dc"), n = n(), popScopeId(), n);
const _hoisted_1$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode(
  "h3",
  null,
  "Dependencies",
  -1
  /* HOISTED */
));
const _hoisted_2$1 = [
  _hoisted_1$1
];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Dependencies",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, _hoisted_2$1);
    };
  }
});
const Dependencies_vue_vue_type_style_index_0_scoped_407352dc_lang = "";
const dependencies = [
  "./SourceCode.vue"
];
const block0$1 = {
  dependencies
};
if (typeof block0$1 === "function")
  block0$1(_sfc_main$2);
const Component$2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-407352dc"], ["__file", "/home/runner/work/archive/archive/docs/demos/Dependencies.vue"]]);
const __archive_data__$2 = {
  "id": "archive-item-30",
  "filename": "Dependencies.vue",
  "relativePath": "../demos/Dependencies.vue",
  "query": {},
  "dependencies": ["./SourceCode.vue"],
  "sourceCodes": [{ "filename": "Dependencies.vue", "code": '<script setup lang="ts">\n// This starter template is using Vue 3 <script setup> SFCs\n// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup\n<\/script>\n\n<template>\n  <div>\n    <h3>Dependencies</h3>\n  </div>\n</template>\n\n<style scoped>\n.logo {\n  height: 6em;\n  padding: 1.5em;\n  will-change: filter;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.vue:hover {\n  filter: drop-shadow(0 0 2em #42b883aa);\n}\n</style>', "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #676E95">// This starter template is using Vue 3 &lt;script setup&gt; SFCs</span></span>\n<span class="line"><span style="color: #676E95">// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">h3</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Dependencies</span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">h3</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">style</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">scoped</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">logo</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">height</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">6em</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">padding</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1.5em</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">will-change</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> filter</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">logo</span><span style="color: #89DDFF">:</span><span style="color: #C792EA">hover</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">filter</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">drop-shadow</span><span style="color: #89DDFF">(</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">2em</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">646cffaa</span><span style="color: #89DDFF">);</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">logo</span><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">vue</span><span style="color: #89DDFF">:</span><span style="color: #C792EA">hover</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">filter</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">drop-shadow</span><span style="color: #89DDFF">(</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">2em</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">42b883aa</span><span style="color: #89DDFF">);</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">style</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }, { "filename": "SourceCode.vue", "code": '<script setup lang="ts">\n// This starter template is using Vue 3 <script setup> SFCs\n// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup\n<\/script>\n\n<template>\n  <div>\n    <h3>Source Code</h3>\n  </div>\n</template>\n\n<style scoped>\n.logo {\n  height: 6em;\n  padding: 1.5em;\n  will-change: filter;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.vue:hover {\n  filter: drop-shadow(0 0 2em #42b883aa);\n}\n</style>', "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #676E95">// This starter template is using Vue 3 &lt;script setup&gt; SFCs</span></span>\n<span class="line"><span style="color: #676E95">// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">h3</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Source Code</span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">h3</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">style</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">scoped</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">logo</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">height</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">6em</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">padding</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1.5em</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">will-change</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> filter</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">logo</span><span style="color: #89DDFF">:</span><span style="color: #C792EA">hover</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">filter</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">drop-shadow</span><span style="color: #89DDFF">(</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">2em</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">646cffaa</span><span style="color: #89DDFF">);</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">logo</span><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">vue</span><span style="color: #89DDFF">:</span><span style="color: #C792EA">hover</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #B2CCD6">filter</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">drop-shadow</span><span style="color: #89DDFF">(</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">2em</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">42b883aa</span><span style="color: #89DDFF">);</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">style</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }],
  instance: Ui$1("archive-vue-loader-1", Component$2)
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Control",
  props: {
    numberCtr: { type: Number, required: true, default: 1 },
    stringCtr: { type: String, required: true, default: "string" },
    booleanCrt: { type: Boolean, required: true, default: true },
    inputCtr: { type: String, required: true, default: "input" },
    textareaCtr: { type: String, required: true, default: "line1 \n line2" },
    jsonCtr: { type: Object, required: true, default: () => ({
      a: 1,
      b: 2
    }) },
    selectCtr: { type: String, required: true, default: "option1" },
    radioCtr: { type: String, required: true, default: "option2" },
    checkboxCtr: { type: Array, required: true, default: () => ["value1"] }
  },
  setup(__props) {
    const props = __props;
    const controlValueText = computed(
      () => JSON.stringify(
        {
          numberCtr: props.numberCtr,
          stringCtr: props.stringCtr,
          booleanCrt: props.booleanCrt,
          inputCtc: props.inputCtr,
          textareaCtr: props.textareaCtr,
          jsonCtr: props.jsonCtr,
          selectCtr: props.selectCtr,
          radioCtr: props.radioCtr,
          checkboxCtr: props.checkboxCtr
        },
        void 0,
        2
      )
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "pre",
        null,
        toDisplayString(unref(controlValueText)),
        1
        /* TEXT */
      );
    };
  }
});
const controls = {
  inputCtr: {
    type: "input"
  },
  selectCtr: {
    type: "select",
    label: "select",
    description: "this is select control",
    options: [
      {
        label: "option1",
        value: "option1"
      },
      {
        label: "option2",
        value: "option2"
      }
    ]
  },
  textareaCtr: {
    type: "textarea"
  },
  jsonCtr: {
    type: "json"
  },
  radioCtr: {
    type: "radio",
    options: [
      {
        label: "option1",
        value: "option1"
      },
      {
        label: "option2",
        value: "option2"
      }
    ]
  },
  checkboxCtr: {
    type: "checkbox",
    options: [
      {
        label: "value1",
        value: "value1"
      },
      {
        label: "value2",
        value: "value2"
      }
    ]
  }
};
const block0 = {
  controls
};
if (typeof block0 === "function")
  block0(_sfc_main$1);
const Component$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/archive/archive/docs/demos/Control.vue"]]);
const __archive_data__$1 = {
  "id": "archive-item-31",
  "filename": "Control.vue",
  "relativePath": "../demos/Control.vue",
  "query": {},
  "controls": { "inputCtr": { "type": "input" }, "selectCtr": { "type": "select", "label": "select", "description": "this is select control", "options": [{ "label": "option1", "value": "option1" }, { "label": "option2", "value": "option2" }] }, "textareaCtr": { "type": "textarea" }, "jsonCtr": { "type": "json" }, "radioCtr": { "type": "radio", "options": [{ "label": "option1", "value": "option1" }, { "label": "option2", "value": "option2" }] }, "checkboxCtr": { "type": "checkbox", "options": [{ "label": "value1", "value": "value1" }, { "label": "value2", "value": "value2" }] } },
  "sourceCodes": [{ "filename": "Control.vue", "code": `<script lang="ts" setup>
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    numberCtr: number
    stringCtr: string
    booleanCrt: boolean
    inputCtr: string
    textareaCtr: string
    jsonCtr: object
    selectCtr: 'option1' | 'option2'
    radioCtr: 'option1' | 'option2'
    checkboxCtr: ('value1' | 'value2')[]
  }>(),
  {
    numberCtr: 1,
    stringCtr: 'string',
    booleanCrt: true,
    inputCtr: 'input',
    textareaCtr: 'line1 \\n line2',
    jsonCtr: () => ({
      a: 1,
      b: 2,
    }),
    selectCtr: 'option1',
    radioCtr: 'option2',
    checkboxCtr: () => ['value1'],
  },
)

const controlValueText = computed(() =>
  JSON.stringify(
    {
      numberCtr: props.numberCtr,
      stringCtr: props.stringCtr,
      booleanCrt: props.booleanCrt,
      inputCtc: props.inputCtr,
      textareaCtr: props.textareaCtr,
      jsonCtr: props.jsonCtr,
      selectCtr: props.selectCtr,
      radioCtr: props.radioCtr,
      checkboxCtr: props.checkboxCtr,
    },
    undefined,
    2,
  ),
)
<\/script>
<template>
  <pre>{{ controlValueText }}</pre>
</template>`, "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">computed</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> props </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">withDefaults</span><span style="color: #A6ACCD">(</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #82AAFF">defineProps</span><span style="color: #89DDFF">&lt;{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">numberCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">stringCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">booleanCrt</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">boolean</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">inputCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">textareaCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">jsonCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">object</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">selectCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">option1</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">|</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">option2</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">radioCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">option1</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">|</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">option2</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">checkboxCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> (</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">value1</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">|</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">value2</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)[]</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">}&gt;</span><span style="color: #A6ACCD">()</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">numberCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">stringCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">string</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">booleanCrt</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FF9CAC">true</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">inputCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">input</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">textareaCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">line1 </span><span style="color: #A6ACCD">\\n</span><span style="color: #C3E88D"> line2</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #82AAFF">jsonCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> (</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">a</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">b</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">2</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">selectCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">option1</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">radioCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">option2</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #82AAFF">checkboxCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">value1</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> controlValueText </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">computed</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  JSON</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">stringify</span><span style="color: #A6ACCD">(</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">numberCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> props</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">numberCtr</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">stringCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> props</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">stringCtr</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">booleanCrt</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> props</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">booleanCrt</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">inputCtc</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> props</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">inputCtr</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">textareaCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> props</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">textareaCtr</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">jsonCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> props</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">jsonCtr</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">selectCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> props</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">selectCtr</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">radioCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> props</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">radioCtr</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">checkboxCtr</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> props</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">checkboxCtr</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">undefined,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F78C6C">2</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  )</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">)</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">pre</span><span style="color: #89DDFF">&gt;{{</span><span style="color: #A6ACCD"> controlValueText </span><span style="color: #89DDFF">}}&lt;/</span><span style="color: #F07178">pre</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }],
  instance: Ui$1("archive-vue-loader-1", Component$1)
};
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h1 id="demo编写简介" tabindex="-1">Demo编写简介 <a class="header-anchor" href="#demo编写简介" aria-hidden="true">#</a></h1><p>Idux Archive 底层通过 vite 插件 <code>@idux/archive-vite-plugin</code> 配合多个Loader支持不同类型的实例加载，作为页面或者demo，因此可以支持不同框架的 demo。</p><p>详情参考：<a href="/loader/Brief/">Loader 相关内容</a></p><h2 id="demo-特性" tabindex="-1">Demo 特性 <a class="header-anchor" href="#demo-特性" aria-hidden="true">#</a></h2><h3 id="源码展示" tabindex="-1">源码展示 <a class="header-anchor" href="#源码展示" aria-hidden="true">#</a></h3><p>通过对应loader的处理，可以支持demo源码的展示。</p>', 6);
const _hoisted_8 = /* @__PURE__ */ createBaseVNode(
  "h3",
  {
    id: "源码依赖文件",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createTextVNode("源码依赖文件 "),
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#源码依赖文件",
      "aria-hidden": "true"
    }, "#")
  ],
  -1
  /* HOISTED */
);
const _hoisted_9 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  "源码不是唯一的，可以将依赖文件的源码一同展示，依赖文件的配置可以参考不同loader的配置内容。",
  -1
  /* HOISTED */
);
const _hoisted_10 = /* @__PURE__ */ createStaticVNode('<h3 id="控件" tabindex="-1">控件 <a class="header-anchor" href="#控件" aria-hidden="true">#</a></h3><p>Demo 默认支持交互式控件，原理是控制 demo 组件暴露的参数。</p><p>支持不同配置的控件，例如 <code>input</code>，<code>number</code>，<code>select</code>，<code>radio</code> 等，详细的配置需要参考不同loader的配置内容。</p>', 3);
const _hoisted_13 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  [
    /* @__PURE__ */ createTextVNode("除了基础提供的 vue3 和 vue2 的Loader，也可以自定义Loader来支持基于不同框架的demo与页面, 详情请查看 "),
    /* @__PURE__ */ createBaseVNode("a", { href: "/loader/Brief/" }, "Loader")
  ],
  -1
  /* HOISTED */
);
JSON.parse('{"title":"Demo编写简介","description":"","frontmatter":{},"headers":[{"level":2,"title":"Demo 特性","slug":"demo-特性","link":"#demo-特性","children":[{"level":3,"title":"源码展示","slug":"源码展示","link":"#源码展示","children":[]},{"level":3,"title":"源码依赖文件","slug":"源码依赖文件","link":"#源码依赖文件","children":[]},{"level":3,"title":"控件","slug":"控件","link":"#控件","children":[]}]}],"relativePath":"src/1-guide/2-documents/3-demo/1-Brief.page.md"}');
const __default__ = { name: "1-Brief.page.md" };
const _sfc_main = Object.assign(__default__, {
  setup(__props) {
    const SourceCodeDemo = Li(createDemoInstance(__archive_data__$3));
    const DependenciesDemo = Li(createDemoInstance(__archive_data__$2));
    const ControlDemo = Li(createDemoInstance(__archive_data__$1));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _hoisted_2,
        createVNode(unref(SourceCodeDemo), { style: { "width": "960px" } }),
        _hoisted_8,
        _hoisted_9,
        createVNode(unref(DependenciesDemo), { style: { "width": "960px" } }),
        _hoisted_10,
        createVNode(unref(ControlDemo), { style: { "width": "960px" } }),
        _hoisted_13
      ]);
    };
  }
});
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/archive/archive/docs/src/1-guide/2-documents/3-demo/1-Brief.page.md"]]);
const __archive_data__ = {
  "id": "archive-item-10",
  "filename": "1-Brief.page.md",
  "relativePath": "1-guide/2-documents/3-demo/1-Brief.page.md",
  "query": {},
  instance: Ui$1("archive-vue-loader-0", Component)
};
export {
  __archive_data__ as default
};
