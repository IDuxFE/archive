import { o as openBlock, c as createElementBlock, b as createCommentVNode, a as createStaticVNode } from "./app-default.4adbfa92.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
const pageData = JSON.parse('{"title":"\u5BFC\u822A\u914D\u7F6E","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u9ED8\u8BA4\u5BFC\u822A\u89E3\u6790","slug":"\u9ED8\u8BA4\u5BFC\u822A\u89E3\u6790","link":"#\u9ED8\u8BA4\u5BFC\u822A\u89E3\u6790","children":[]},{"level":2,"title":"\u81EA\u5B9A\u4E49\u5BFC\u822A\u914D\u7F6E","slug":"\u81EA\u5B9A\u4E49\u5BFC\u822A\u914D\u7F6E","link":"#\u81EA\u5B9A\u4E49\u5BFC\u822A\u914D\u7F6E","children":[{"level":3,"title":"navConfig","slug":"navconfig","link":"#navconfig","children":[]},{"level":3,"title":"CollectedDemo","slug":"collecteddemo","link":"#collecteddemo","children":[]},{"level":3,"title":"NavRecord","slug":"navrecord","link":"#navrecord","children":[]}]}],"relativePath":"src/1-guide/2-documents/1-Nav.page.md"}');
const _sfc_main = { name: "src/1-guide/2-documents/1-Nav.page.md" };
const _hoisted_1 = { class: "archive-md" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<h1 id="\u5BFC\u822A\u914D\u7F6E" tabindex="-1">\u5BFC\u822A\u914D\u7F6E <a class="header-anchor" href="#\u5BFC\u822A\u914D\u7F6E" aria-hidden="true">#</a></h1><h2 id="\u9ED8\u8BA4\u5BFC\u822A\u89E3\u6790" tabindex="-1">\u9ED8\u8BA4\u5BFC\u822A\u89E3\u6790 <a class="header-anchor" href="#\u9ED8\u8BA4\u5BFC\u822A\u89E3\u6790" aria-hidden="true">#</a></h2><p>\u9ED8\u8BA4\u89E3\u6790\u65B9\u5F0F\u4EE5\u53CA\u9875\u9762\u6587\u6863\u7F16\u5199\u8BF7\u67E5\u770B<a href="/guide/introdoction/DefaultNav/">\u5185\u7F6E\u9ED8\u8BA4\u5BFC\u822A\u4E0E\u8DEF\u7531\u89E3\u6790</a></p><h2 id="\u81EA\u5B9A\u4E49\u5BFC\u822A\u914D\u7F6E" tabindex="-1">\u81EA\u5B9A\u4E49\u5BFC\u822A\u914D\u7F6E <a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u5BFC\u822A\u914D\u7F6E" aria-hidden="true">#</a></h2><p>\u5728\u914D\u7F6E\u6587\u4EF6 <code>archive.config.js</code> \u4E2D\u914D\u7F6E <code>navConfig</code>\uFF0C\u53EF\u4EE5\u81EA\u5B9A\u4E49\u5BFC\u822A\u7ED3\u6784\u3002</p><h3 id="navconfig" tabindex="-1">navConfig <a class="header-anchor" href="#navconfig" aria-hidden="true">#</a></h3><ul><li>\u7C7B\u578B\uFF1A<code>(demos: CollectedDemo[], root: string) =&gt; NavRecord[]</code></li></ul><p>\u901A\u8FC7\u4E00\u4E2A\u81EA\u5B9A\u4E49\u51FD\u6570\u8FD4\u56DE\u5BFC\u822A\u914D\u7F6E\u9879\u6570\u7EC4\u6765\u5B9E\u73B0\u5BFC\u822A\u81EA\u5B9A\u4E49</p><p>\u63A5\u6536\u7684\u53C2\u6570\u6709\u4E24\u4E2A\uFF1A</p><ol><li>demos: \u5DF2\u7ECF\u6536\u96C6\u7684 demo\uFF0C\u53EF\u4EE5\u5C06\u67D0\u4E2A\u6216\u67D0\u51E0\u4E2A demo \u7ED1\u5B9A\u5230\u5BF9\u5E94 <code>NavRecord</code> \u7684 <code>pageData</code> \u4E0A\u3002</li><li>root\uFF1A\u9879\u76EE\u6839\u76EE\u5F55\uFF08<code>archive.config.js</code>\u4E2D\u914D\u7F6E\uFF09</li></ol><h3 id="collecteddemo" tabindex="-1">CollectedDemo <a class="header-anchor" href="#collecteddemo" aria-hidden="true">#</a></h3><p>\u901A\u8FC7\u914D\u7F6E\u7684 <code>colletor</code> \u6536\u96C6\u5230\u7684 demo \u5B9E\u4F8B</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">CollectedDemo</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// demo ID</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">filename</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// demo \u6587\u4EF6\u540D</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// demo \u8DEF\u5F84\uFF08\u7EDD\u5BF9\u8DEF\u5F84\uFF09</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">sourceCodes</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SourceCode</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// demo \u7684\u6E90\u4EE3\u7801</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">component</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// demo \u7EC4\u4EF6\u7684 import \u811A\u672C</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SourceCode</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">filename</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u6587\u4EF6\u540D</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">code</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u4EE3\u7801</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">parsedCode</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u4EE3\u7801\u89E3\u6790\u540E\u53EF\u6E32\u67D3\u7684 html</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><h3 id="navrecord" tabindex="-1">NavRecord <a class="header-anchor" href="#navrecord" aria-hidden="true">#</a></h3><p>\u5BFC\u822A\u9879\uFF0C\u5BFC\u822A\u9879\u7531\u4EE5\u4E0B\u51E0\u79CD\u7C7B\u578B\u7EC4\u6210\uFF1A</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NavRecord</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ItemNavRecord</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">LinkNavRecord</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">GroupNavRecord</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SubNavRecord</span></span>\n<span class="line"></span></code></pre></div><h4 id="navrecordbase" tabindex="-1">NavRecordBase <a class="header-anchor" href="#navrecordbase" aria-hidden="true">#</a></h4><p>\u6240\u6709\u5BFC\u822A\u9879\u7C7B\u578B\u516C\u5171\u5C5E\u6027</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NavRecordBase</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u5BFC\u822A\u9879\u552F\u4E00ID</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u5BFC\u822A\u9879\u540D\u79F0\uFF0C\u5373\u5BFC\u822A\u680F\u4E2D\u663E\u793A\u7684\u5BFC\u822A\u540D\u79F0</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><h4 id="itemnavrecord" tabindex="-1">ItemNavRecord <a class="header-anchor" href="#itemnavrecord" aria-hidden="true">#</a></h4><p><code>item</code> \u7C7B\u578B\u5BFC\u822A\u9879\uFF0C\u5373\u9875\u9762\u7C7B\u578B\u5BFC\u822A\uFF0C\u5305\u542B\u5B9E\u9645\u53EF\u6E32\u67D3\u7684\u9875\u9762\u4FE1\u606F</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ItemNavRecord</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NavRecordBase</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">item</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">pageData</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PageData</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p><strong>PageData</strong></p><p>\u9875\u9762\u6570\u636E</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BasePageData</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u9875\u9762\u6807\u9898</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">description</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u9875\u9762\u63CF\u8FF0</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">src</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u9875\u9762\u6587\u6863\u8DEF\u5F84</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">tabs</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PageTab</span><span style="color:#A6ACCD;">[] </span><span style="color:#676E95;">// \u6807\u7B7E\u9875\u5217\u8868</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">demoIds</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">[] </span><span style="color:#676E95;">// \u9875\u9762\u5185 demo ID \u5217\u8868</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PageData</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RequireExactlyOne</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">BasePageData</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tabs</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">demoIds</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">src</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>\u9875\u9762\u6570\u636E\u4E2D\u7684 <code>src</code>\u3001<code>tabs</code> \u548C <code>demoIds</code> \u4E09\u4E2A\u6570\u636E\u53EA\u80FD\u5B58\u5728\u4E00\u4E2A\uFF0C\u4ED6\u4EEC\u5206\u522B\u5BF9\u5E94\u4E86\u4E0D\u540C\u9875\u9762\u7C7B\u578B\uFF0C\u5177\u4F53\u89C1<a href="/guide/documents/page/Brief/">\u6587\u6863\u9875\u9762\u7F16\u5199</a></p><p><strong>PageTab</strong></p><p>\u6807\u7B7E\u9875\u6570\u636E</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BasePageTab</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">src</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">demoIds</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PageTab</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RequireExactlyOne</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">BasePageTab</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">src</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">demoIds</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>\u6807\u7B7E\u9875\u6570\u636E\u4E2D <code>src</code>\u3001<code>demoIds</code> \u53EA\u80FD\u5B58\u5728\u4E00\u4E2A\uFF0C\u4ED6\u4EEC\u5206\u522B\u5BF9\u5E94\u4E86\u4E0D\u540C\u7684\u6807\u7B7E\u9875\u7C7B\u578B\uFF0C\u5177\u4F53\u89C1<a href="/guide/documents/page/Brief/">\u6587\u6863\u9875\u9762\u7F16\u5199</a></p><h4 id="linknavrecord" tabindex="-1">LinkNavRecord <a class="header-anchor" href="#linknavrecord" aria-hidden="true">#</a></h4><p>\u94FE\u63A5\u7C7B\u578B\u5BFC\u822A\u9879</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">LinkNavRecord</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NavRecordBase</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">link</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">link</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u94FE\u63A5\u5730\u5740</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>\u5728\u5BFC\u822A\u680F\u4E2D\u70B9\u51FB\u94FE\u63A5\u7C7B\u578B\u5BFC\u822A\uFF0C\u5C06\u76F4\u63A5\u8DF3\u8F6C\u5230\u914D\u7F6E\u7684\u94FE\u63A5\u5730\u5740</p><h4 id="subnavrecord" tabindex="-1">SubNavRecord <a class="header-anchor" href="#subnavrecord" aria-hidden="true">#</a></h4><p>\u5177\u6709\u5B50\u5BFC\u822A\u7684\u5BFC\u822A\u9879</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SubNavRecord</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NavRecordBase</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">sub</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NavRecord</span><span style="color:#A6ACCD;">[] </span><span style="color:#676E95;">// \u5B50\u5BFC\u822A\u9879\u5217\u8868</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><h4 id="groupnavrecord" tabindex="-1">GroupNavRecord <a class="header-anchor" href="#groupnavrecord" aria-hidden="true">#</a></h4><p>\u5206\u7EC4\u7C7B\u578B\u5BFC\u822A\u9879\uFF0C\u4E0E\u5B50\u5BFC\u822A\u4E0D\u540C\u7684\u662F\uFF0C\u5176\u4E0D\u5177\u5907\u5C55\u5F00\u6536\u8D77\u529F\u80FD\uFF0C\u4EC5\u4EC5\u662F\u5206\u7EC4\u5C55\u793A</p><div class="language-ts"><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">GroupNavRecord</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NavRecordBase</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">group</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NavRecord</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div>', 41);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    createCommentVNode(" ## \u5BFC\u822A\u914D\u7F6E\u5904\u7406\u76F8\u5173\u5DE5\u5177\u51FD\u6570\n\n`navConfig` \u51FD\u6570\u7684\u8BBE\u8BA1\u786E\u4FDD\u4E86\u5BFC\u822A\u914D\u7F6E\u7684\u9AD8\u5EA6\u7075\u6D3B\u6027\uFF0C\u4F46\u89E3\u6790\u5F97\u5230\u671F\u671B\u7684\u5BFC\u822A\u5217\u8868\u901A\u5E38\u8FD8\u662F\u9700\u8981\u5927\u91CF\u7684\u811A\u672C\u5904\u7406\u3002\u4E3A\u4E86\u4F18\u5316\u8FD9\u90E8\u5206\u4F7F\u7528\u4F53\u9A8C\uFF0CIdux Archive \u66B4\u9732\u4E86\u76F8\u5173\u7684\u5DE5\u5177\u51FD\u6570\uFF0C\u5982\u4E0B\uFF1A\n\n// TODO ")
  ]);
}
const _1Nav_page = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/archive/archive/docs/src/1-guide/2-documents/1-Nav.page.md"]]);
export {
  _1Nav_page as default,
  pageData
};
