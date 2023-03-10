const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i = links.length - 1; i >= 0; i--) {
        const link2 = links[i];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
const mountOptions = {
  el: "#app",
  theme: { "themeStyle": "default", "layout": { "type": "both", "siderCollapsable": false }, "page": { "anchorMaxLevel": 6 } },
  navRecords: [{ "type": "sub", "id": "guide", "name": "\u6307\u5357", "path": "/guide/introdoction/Introdoction", children: [{ "type": "sub", "id": "introdoction", "name": "\u4ECB\u7ECD", "path": "/guide/introdoction/Introdoction", children: [{ "id": "Introdoction", "name": "\u4ECB\u7ECD", "type": "item", "path": "/guide/introdoction/Introdoction", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/1-introdoction/1-Introdoction.page.md__archivePage")' } }, { "id": "GettingStarted", "name": "\u5FEB\u901F\u4E0A\u624B", "type": "item", "path": "/guide/introdoction/GettingStarted", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/1-introdoction/2-GettingStarted.page.md__archivePage")' } }, { "id": "DefaultNav", "name": "\u5185\u7F6E\u9ED8\u8BA4\u5BFC\u822A\u4E0E\u8DEF\u7531\u89E3\u6790", "type": "item", "path": "/guide/introdoction/DefaultNav", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/1-introdoction/3-DefaultNav.page.md__archivePage")' } }, { "id": "DevAndBuilding", "name": "\u672C\u5730\u8C03\u8BD5\u4E0E\u6253\u5305", "type": "item", "path": "/guide/introdoction/DevAndBuilding", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/1-introdoction/4-DevAndBuilding.page.md__archivePage")' } }, { "id": "Deploying", "name": "\u90E8\u7F72", "type": "item", "path": "/guide/introdoction/Deploying", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/1-introdoction/5-Deploying.page.md__archivePage")' } }] }, { "type": "sub", "id": "documents", "name": "\u6587\u6863\u7F16\u5199", "path": "/guide/documents/Nav", children: [{ "id": "Nav", "name": "\u5BFC\u822A\u914D\u7F6E", "type": "item", "path": "/guide/documents/Nav", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/2-documents/1-Nav.page.md__archivePage")' } }, { "id": "Page", "name": "\u6587\u6863\u9875\u9762\u7F16\u5199", "type": "item", "path": "/guide/documents/Page", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/2-documents/2-Page.page.md__archivePage")' } }, { "type": "sub", "id": "page", "name": "page", "path": "/guide/documents/page/Brief", children: [{ "id": "Brief", "name": "\u6587\u6863\u9875\u9762\u7F16\u5199", "type": "item", "path": "/guide/documents/page/Brief", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/2-documents/2-page/1-Brief.page.md__archivePage")' } }, { "id": "VueSFC", "name": "Vue SFC \u683C\u5F0F \u6587\u6863\u9875\u9762", "type": "item", "path": "/guide/documents/page/VueSFC", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/2-documents/2-page/2-VueSFC.page.md__archivePage")' } }, { "id": "Markdown", "name": "Markdown \u683C\u5F0F \u6587\u6863\u9875\u9762", "type": "item", "path": "/guide/documents/page/Markdown", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/2-documents/2-page/3-Markdown.page.md__archivePage")' } }] }, { "type": "sub", "id": "demo", "name": "Demo\u7F16\u5199", "path": "/guide/documents/demo/Brief", children: [{ "id": "Brief", "name": "Demo\u7F16\u5199\u7B80\u4ECB", "type": "item", "path": "/guide/documents/demo/Brief", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/2-documents/3-demo/1-Brief.page.md__archivePage")' } }, { "id": "VueSFC", "name": "Vue SFC \u683C\u5F0F demo", "type": "item", "path": "/guide/documents/demo/VueSFC", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/2-documents/3-demo/2-VueSFC.page.md__archivePage")' } }] }, { "type": "sub", "id": "markdown", "name": "Markdown \u6587\u6863", children: [] }] }, { "type": "sub", "id": "customization", "name": "\u81EA\u5B9A\u4E49", "path": "/guide/customization/PageLoader", children: [{ "id": "PageLoader", "name": "\u9875\u9762\u52A0\u8F7D\u5668", "type": "item", "path": "/guide/customization/PageLoader", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/4-customization/1-PageLoader.page.md__archivePage")' } }, { "id": "DemoCollector", "name": "Demo \u6536\u96C6\u5668", "type": "item", "path": "/guide/customization/DemoCollector", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/4-customization/2-DemoCollector.page.md__archivePage")' } }, { "id": "AppSetup", "name": "App \u81EA\u5B9A\u4E49", "type": "item", "path": "/guide/customization/AppSetup", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/4-customization/3-AppSetup.page.md__archivePage")' } }, { "id": "Theme", "name": "\u4E3B\u9898\u81EA\u5B9A\u4E49", "type": "item", "path": "/guide/customization/Theme", "pageData": { "title": "", "description": "", "component": '() => import("/home/runner/work/archive/archive/docs/src/1-guide/4-customization/4-Theme.page.md__archivePage")' } }] }] }],
  routeRecords: [{ path: "/guide/introdoction/Introdoction", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./1-Introdoction.page.e623c9d2.js"), true ? ["assets/1-Introdoction.page.e623c9d2.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/introdoction/GettingStarted", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./2-GettingStarted.page.177b4112.js"), true ? ["assets/2-GettingStarted.page.177b4112.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/introdoction/DefaultNav", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./3-DefaultNav.page.ef252813.js"), true ? ["assets/3-DefaultNav.page.ef252813.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/introdoction/DevAndBuilding", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./4-DevAndBuilding.page.d11a2f87.js"), true ? ["assets/4-DevAndBuilding.page.d11a2f87.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/introdoction/Deploying", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./5-Deploying.page.454dcda5.js"), true ? ["assets/5-Deploying.page.454dcda5.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/documents/Nav", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./1-Nav.page.f7a1d4c4.js"), true ? ["assets/1-Nav.page.f7a1d4c4.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/documents/Page", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./2-Page.page.7b63e75a.js"), true ? ["assets/2-Page.page.7b63e75a.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/documents/page/Brief", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./1-Brief.page.190e700e.js"), true ? ["assets/1-Brief.page.190e700e.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/documents/page/VueSFC", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./2-VueSFC.page.48ea5b00.js"), true ? ["assets/2-VueSFC.page.48ea5b00.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/documents/page/Markdown", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./3-Markdown.page.6af23099.js"), true ? ["assets/3-Markdown.page.6af23099.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/documents/demo/Brief", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./1-Brief.page.45c0330d.js"), true ? ["assets/1-Brief.page.45c0330d.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/documents/demo/VueSFC", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./2-VueSFC.page.96061c8c.js"), true ? ["assets/2-VueSFC.page.96061c8c.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/customization/PageLoader", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./1-PageLoader.page.be460fa3.js"), true ? ["assets/1-PageLoader.page.be460fa3.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/customization/DemoCollector", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./2-DemoCollector.page.0e6d3469.js"), true ? ["assets/2-DemoCollector.page.0e6d3469.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/customization/AppSetup", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./3-AppSetup.page.62a297bf.js"), true ? ["assets/3-AppSetup.page.62a297bf.js","assets/client.e85160f0.js"] : void 0) } }, { path: "/guide/customization/Theme", pageData: { "title": "", "description": "", component: () => __vitePreload(() => import("./4-Theme.page.2d7306d4.js"), true ? ["assets/4-Theme.page.2d7306d4.js","assets/client.e85160f0.js"] : void 0) } }]
};
function makeMap$1(str, expectsLowerCase) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map2[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
}
function normalizeStyle$1(value) {
  if (isArray$3(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$2(item) ? parseStringStyle$1(item) : normalizeStyle$1(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$2(value)) {
    return value;
  } else if (isObject$2(value)) {
    return value;
  }
}
const listDelimiterRE$1 = /;(?![^(]*\))/g;
const propertyDelimiterRE$1 = /:([^]+)/;
const styleCommentRE$1 = /\/\*.*?\*\//gs;
function parseStringStyle$1(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE$1, "").split(listDelimiterRE$1).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE$1);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass$1(value) {
  let res = "";
  if (isString$2(value)) {
    res = value;
  } else if (isArray$3(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass$1(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$2(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const HTML_TAGS$1 = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS$1 = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const isHTMLTag$1 = /* @__PURE__ */ makeMap$1(HTML_TAGS$1);
const isSVGTag$1 = /* @__PURE__ */ makeMap$1(SVG_TAGS$1);
const specialBooleanAttrs$1 = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr$1 = /* @__PURE__ */ makeMap$1(specialBooleanAttrs$1);
function includeBooleanAttr$1(value) {
  return !!value || value === "";
}
const EMPTY_OBJ$1 = Object.freeze({});
const EMPTY_ARR$1 = Object.freeze([]);
const NOOP$1 = () => {
};
const NO$1 = () => false;
const onRE$1 = /^on[^a-z]/;
const isOn$1 = (key) => onRE$1.test(key);
const isModelListener$1 = (key) => key.startsWith("onUpdate:");
const extend$1 = Object.assign;
const remove$1 = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$e = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty$e.call(val, key);
const isArray$3 = Array.isArray;
const isMap$2 = (val) => toTypeString$1(val) === "[object Map]";
const isSet$2 = (val) => toTypeString$1(val) === "[object Set]";
const isFunction$2 = (val) => typeof val === "function";
const isString$2 = (val) => typeof val === "string";
const isSymbol$2 = (val) => typeof val === "symbol";
const isObject$2 = (val) => val !== null && typeof val === "object";
const isPromise$1 = (val) => {
  return isObject$2(val) && isFunction$2(val.then) && isFunction$2(val.catch);
};
const objectToString$2 = Object.prototype.toString;
const toTypeString$1 = (value) => objectToString$2.call(value);
const toRawType$1 = (value) => {
  return toTypeString$1(value).slice(8, -1);
};
const isPlainObject$2 = (val) => toTypeString$1(val) === "[object Object]";
const isIntegerKey$1 = (key) => isString$2(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp$1 = /* @__PURE__ */ makeMap$1(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective$1 = /* @__PURE__ */ makeMap$1("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction$1 = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE$1 = /-(\w)/g;
const camelize$1 = cacheStringFunction$1((str) => {
  return str.replace(camelizeRE$1, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE$1 = /\B([A-Z])/g;
const hyphenate$1 = cacheStringFunction$1((str) => str.replace(hyphenateRE$1, "-$1").toLowerCase());
const capitalize$2 = cacheStringFunction$1((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey$1 = cacheStringFunction$1((str) => str ? `on${capitalize$2(str)}` : ``);
const hasChanged$1 = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def$1 = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber$2 = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis$1;
const getGlobalThis$1 = () => {
  return _globalThis$1 || (_globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function warn$1$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope$1;
class EffectScope$1 {
  constructor(detached = false) {
    this.detached = detached;
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope$1;
    if (!detached && activeEffectScope$1) {
      this.index = (activeEffectScope$1.scopes || (activeEffectScope$1.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope$1;
      try {
        activeEffectScope$1 = this;
        return fn();
      } finally {
        activeEffectScope$1 = currentEffectScope;
      }
    } else {
      warn$1$1(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    activeEffectScope$1 = this;
  }
  off() {
    activeEffectScope$1 = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this.active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope$1(detached);
}
function recordEffectScope$1(effect2, scope = activeEffectScope$1) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope$1;
}
function onScopeDispose(fn) {
  if (activeEffectScope$1) {
    activeEffectScope$1.cleanups.push(fn);
  } else {
    warn$1$1(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
  }
}
const createDep$1 = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked$1 = (dep) => (dep.w & trackOpBit$1) > 0;
const newTracked$1 = (dep) => (dep.n & trackOpBit$1) > 0;
const initDepMarkers$1 = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit$1;
    }
  }
};
const finalizeDepMarkers$1 = (effect2) => {
  const { deps } = effect2;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked$1(dep) && !newTracked$1(dep)) {
        dep.delete(effect2);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit$1;
      dep.n &= ~trackOpBit$1;
    }
    deps.length = ptr;
  }
};
const targetMap$1 = /* @__PURE__ */ new WeakMap();
let effectTrackDepth$1 = 0;
let trackOpBit$1 = 1;
const maxMarkerBits$1 = 30;
let activeEffect$1;
const ITERATE_KEY$1 = Symbol("iterate");
const MAP_KEY_ITERATE_KEY$1 = Symbol("Map key iterate");
class ReactiveEffect$1 {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope$1(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect$1;
    let lastShouldTrack = shouldTrack$1;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect$1;
      activeEffect$1 = this;
      shouldTrack$1 = true;
      trackOpBit$1 = 1 << ++effectTrackDepth$1;
      if (effectTrackDepth$1 <= maxMarkerBits$1) {
        initDepMarkers$1(this);
      } else {
        cleanupEffect$1(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth$1 <= maxMarkerBits$1) {
        finalizeDepMarkers$1(this);
      }
      trackOpBit$1 = 1 << --effectTrackDepth$1;
      activeEffect$1 = this.parent;
      shouldTrack$1 = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect$1 === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect$1(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect$1(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
}
let shouldTrack$1 = true;
const trackStack$1 = [];
function pauseTracking$1() {
  trackStack$1.push(shouldTrack$1);
  shouldTrack$1 = false;
}
function resetTracking$1() {
  const last = trackStack$1.pop();
  shouldTrack$1 = last === void 0 ? true : last;
}
function track$1(target, type, key) {
  if (shouldTrack$1 && activeEffect$1) {
    let depsMap = targetMap$1.get(target);
    if (!depsMap) {
      targetMap$1.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep$1());
    }
    const eventInfo = { effect: activeEffect$1, target, type, key };
    trackEffects$1(dep, eventInfo);
  }
}
function trackEffects$1(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth$1 <= maxMarkerBits$1) {
    if (!newTracked$1(dep)) {
      dep.n |= trackOpBit$1;
      shouldTrack2 = !wasTracked$1(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect$1);
  }
  if (shouldTrack2) {
    dep.add(activeEffect$1);
    activeEffect$1.deps.push(dep);
    if (activeEffect$1.onTrack) {
      activeEffect$1.onTrack(Object.assign({ effect: activeEffect$1 }, debuggerEventExtraInfo));
    }
  }
}
function trigger$1(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap$1.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$3(target)) {
    const newLength = toNumber$2(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$3(target)) {
          deps.push(depsMap.get(ITERATE_KEY$1));
          if (isMap$2(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY$1));
          }
        } else if (isIntegerKey$1(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$3(target)) {
          deps.push(depsMap.get(ITERATE_KEY$1));
          if (isMap$2(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY$1));
          }
        }
        break;
      case "set":
        if (isMap$2(target)) {
          deps.push(depsMap.get(ITERATE_KEY$1));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects$1(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects$1(createDep$1(effects), eventInfo);
    }
  }
}
function triggerEffects$1(dep, debuggerEventExtraInfo) {
  const effects = isArray$3(dep) ? dep : [...dep];
  for (const effect2 of effects) {
    if (effect2.computed) {
      triggerEffect$1(effect2, debuggerEventExtraInfo);
    }
  }
  for (const effect2 of effects) {
    if (!effect2.computed) {
      triggerEffect$1(effect2, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect$1(effect2, debuggerEventExtraInfo) {
  if (effect2 !== activeEffect$1 || effect2.allowRecurse) {
    if (effect2.onTrigger) {
      effect2.onTrigger(extend$1({ effect: effect2 }, debuggerEventExtraInfo));
    }
    if (effect2.scheduler) {
      effect2.scheduler();
    } else {
      effect2.run();
    }
  }
}
const isNonTrackableKeys$1 = /* @__PURE__ */ makeMap$1(`__proto__,__v_isRef,__isVue`);
const builtInSymbols$1 = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol$2)
);
const get$2 = /* @__PURE__ */ createGetter$1();
const shallowGet$1 = /* @__PURE__ */ createGetter$1(false, true);
const readonlyGet$1 = /* @__PURE__ */ createGetter$1(true);
const shallowReadonlyGet$1 = /* @__PURE__ */ createGetter$1(true, true);
const arrayInstrumentations$1 = /* @__PURE__ */ createArrayInstrumentations$1();
function createArrayInstrumentations$1() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw$1(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track$1(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw$1));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking$1();
      const res = toRaw$1(this)[key].apply(this, args);
      resetTracking$1();
      return res;
    };
  });
  return instrumentations;
}
function createGetter$1(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap$1 : readonlyMap$1 : shallow ? shallowReactiveMap$1 : reactiveMap$1).get(target)) {
      return target;
    }
    const targetIsArray = isArray$3(target);
    if (!isReadonly2 && targetIsArray && hasOwn$1(arrayInstrumentations$1, key)) {
      return Reflect.get(arrayInstrumentations$1, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol$2(key) ? builtInSymbols$1.has(key) : isNonTrackableKeys$1(key)) {
      return res;
    }
    if (!isReadonly2) {
      track$1(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef$1(res)) {
      return targetIsArray && isIntegerKey$1(key) ? res : res.value;
    }
    if (isObject$2(res)) {
      return isReadonly2 ? readonly$1(res) : reactive$1(res);
    }
    return res;
  };
}
const set$2 = /* @__PURE__ */ createSetter$1();
const shallowSet$1 = /* @__PURE__ */ createSetter$1(true);
function createSetter$1(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly$1(oldValue) && isRef$1(oldValue) && !isRef$1(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow$1$1(value) && !isReadonly$1(value)) {
        oldValue = toRaw$1(oldValue);
        value = toRaw$1(value);
      }
      if (!isArray$3(target) && isRef$1(oldValue) && !isRef$1(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$3(target) && isIntegerKey$1(key) ? Number(key) < target.length : hasOwn$1(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw$1(receiver)) {
      if (!hadKey) {
        trigger$1(target, "add", key, value);
      } else if (hasChanged$1(value, oldValue)) {
        trigger$1(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty$1(target, key) {
  const hadKey = hasOwn$1(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger$1(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has$2(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol$2(key) || !builtInSymbols$1.has(key)) {
    track$1(target, "has", key);
  }
  return result;
}
function ownKeys$1(target) {
  track$1(target, "iterate", isArray$3(target) ? "length" : ITERATE_KEY$1);
  return Reflect.ownKeys(target);
}
const mutableHandlers$1 = {
  get: get$2,
  set: set$2,
  deleteProperty: deleteProperty$1,
  has: has$2,
  ownKeys: ownKeys$1
};
const readonlyHandlers$1 = {
  get: readonlyGet$1,
  set(target, key) {
    {
      warn$1$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$1$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers$1 = /* @__PURE__ */ extend$1({}, mutableHandlers$1, {
  get: shallowGet$1,
  set: shallowSet$1
});
const shallowReadonlyHandlers$1 = /* @__PURE__ */ extend$1({}, readonlyHandlers$1, {
  get: shallowReadonlyGet$1
});
const toShallow$1 = (value) => value;
const getProto$1 = (v) => Reflect.getPrototypeOf(v);
function get$1$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw$1(target);
  const rawKey = toRaw$1(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track$1(rawTarget, "get", key);
    }
    track$1(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto$1(rawTarget);
  const wrap = isShallow2 ? toShallow$1 : isReadonly2 ? toReadonly$1 : toReactive$1;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw$1(target);
  const rawKey = toRaw$1(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track$1(rawTarget, "has", key);
    }
    track$1(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size$1(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track$1(toRaw$1(target), "iterate", ITERATE_KEY$1);
  return Reflect.get(target, "size", target);
}
function add$1(value) {
  value = toRaw$1(value);
  const target = toRaw$1(this);
  const proto = getProto$1(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger$1(target, "add", value, value);
  }
  return this;
}
function set$1$1(key, value) {
  value = toRaw$1(value);
  const target = toRaw$1(this);
  const { has: has2, get: get2 } = getProto$1(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw$1(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys$1(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger$1(target, "add", key, value);
  } else if (hasChanged$1(value, oldValue)) {
    trigger$1(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry$1(key) {
  const target = toRaw$1(this);
  const { has: has2, get: get2 } = getProto$1(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw$1(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys$1(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger$1(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear$1() {
  const target = toRaw$1(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap$2(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger$1(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach$1(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw$1(target);
    const wrap = isShallow2 ? toShallow$1 : isReadonly2 ? toReadonly$1 : toReactive$1;
    !isReadonly2 && track$1(rawTarget, "iterate", ITERATE_KEY$1);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod$1(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw$1(target);
    const targetIsMap = isMap$2(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow$1 : isReadonly2 ? toReadonly$1 : toReactive$1;
    !isReadonly2 && track$1(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY$1 : ITERATE_KEY$1);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod$1(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize$2(type)} operation ${key}failed: target is readonly.`, toRaw$1(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations$1() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1$1(this, key);
    },
    get size() {
      return size$1(this);
    },
    has: has$1$1,
    add: add$1,
    set: set$1$1,
    delete: deleteEntry$1,
    clear: clear$1,
    forEach: createForEach$1(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1$1(this, key, false, true);
    },
    get size() {
      return size$1(this);
    },
    has: has$1$1,
    add: add$1,
    set: set$1$1,
    delete: deleteEntry$1,
    clear: clear$1,
    forEach: createForEach$1(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1$1(this, key, true);
    },
    get size() {
      return size$1(this, true);
    },
    has(key) {
      return has$1$1.call(this, key, true);
    },
    add: createReadonlyMethod$1("add"),
    set: createReadonlyMethod$1("set"),
    delete: createReadonlyMethod$1("delete"),
    clear: createReadonlyMethod$1("clear"),
    forEach: createForEach$1(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1$1(this, key, true, true);
    },
    get size() {
      return size$1(this, true);
    },
    has(key) {
      return has$1$1.call(this, key, true);
    },
    add: createReadonlyMethod$1("add"),
    set: createReadonlyMethod$1("set"),
    delete: createReadonlyMethod$1("delete"),
    clear: createReadonlyMethod$1("clear"),
    forEach: createForEach$1(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod$1(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod$1(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod$1(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod$1(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations$1, readonlyInstrumentations$1, shallowInstrumentations$1, shallowReadonlyInstrumentations$1] = /* @__PURE__ */ createInstrumentations$1();
function createInstrumentationGetter$1(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations$1 : shallowInstrumentations$1 : isReadonly2 ? readonlyInstrumentations$1 : mutableInstrumentations$1;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn$1(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers$1 = {
  get: /* @__PURE__ */ createInstrumentationGetter$1(false, false)
};
const shallowCollectionHandlers$1 = {
  get: /* @__PURE__ */ createInstrumentationGetter$1(false, true)
};
const readonlyCollectionHandlers$1 = {
  get: /* @__PURE__ */ createInstrumentationGetter$1(true, false)
};
const shallowReadonlyCollectionHandlers$1 = {
  get: /* @__PURE__ */ createInstrumentationGetter$1(true, true)
};
function checkIdentityKeys$1(target, has2, key) {
  const rawKey = toRaw$1(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType$1(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap$1 = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap$1 = /* @__PURE__ */ new WeakMap();
const readonlyMap$1 = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap$1 = /* @__PURE__ */ new WeakMap();
function targetTypeMap$1(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType$1(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap$1(toRawType$1(value));
}
function reactive$1(target) {
  if (isReadonly$1(target)) {
    return target;
  }
  return createReactiveObject$1(target, false, mutableHandlers$1, mutableCollectionHandlers$1, reactiveMap$1);
}
function shallowReactive$1(target) {
  return createReactiveObject$1(target, false, shallowReactiveHandlers$1, shallowCollectionHandlers$1, shallowReactiveMap$1);
}
function readonly$1(target) {
  return createReactiveObject$1(target, true, readonlyHandlers$1, readonlyCollectionHandlers$1, readonlyMap$1);
}
function shallowReadonly$1(target) {
  return createReactiveObject$1(target, true, shallowReadonlyHandlers$1, shallowReadonlyCollectionHandlers$1, shallowReadonlyMap$1);
}
function createReactiveObject$1(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$2(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType$1(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive$1(value) {
  if (isReadonly$1(value)) {
    return isReactive$1(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly$1(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow$1$1(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy$1(value) {
  return isReactive$1(value) || isReadonly$1(value);
}
function toRaw$1(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw$1(raw) : observed;
}
function markRaw$1(value) {
  def$1(value, "__v_skip", true);
  return value;
}
const toReactive$1 = (value) => isObject$2(value) ? reactive$1(value) : value;
const toReadonly$1 = (value) => isObject$2(value) ? readonly$1(value) : value;
function trackRefValue$1(ref2) {
  if (shouldTrack$1 && activeEffect$1) {
    ref2 = toRaw$1(ref2);
    {
      trackEffects$1(ref2.dep || (ref2.dep = createDep$1()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue$1(ref2, newVal) {
  ref2 = toRaw$1(ref2);
  if (ref2.dep) {
    {
      triggerEffects$1(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef$1(r) {
  return !!(r && r.__v_isRef === true);
}
function ref$1(value) {
  return createRef$1(value, false);
}
function shallowRef(value) {
  return createRef$1(value, true);
}
function createRef$1(rawValue, shallow) {
  if (isRef$1(rawValue)) {
    return rawValue;
  }
  return new RefImpl$1(rawValue, shallow);
}
class RefImpl$1 {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw$1(value);
    this._value = __v_isShallow ? value : toReactive$1(value);
  }
  get value() {
    trackRefValue$1(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow$1$1(newVal) || isReadonly$1(newVal);
    newVal = useDirectValue ? newVal : toRaw$1(newVal);
    if (hasChanged$1(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive$1(newVal);
      triggerRefValue$1(this, newVal);
    }
  }
}
function unref$1(ref2) {
  return isRef$1(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers$1 = {
  get: (target, key, receiver) => unref$1(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef$1(oldValue) && !isRef$1(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs$1(objectWithRefs) {
  return isReactive$1(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers$1);
}
class CustomRefImpl {
  constructor(factory) {
    this.dep = void 0;
    this.__v_isRef = true;
    const { get: get2, set: set2 } = factory(() => trackRefValue$1(this), () => triggerRefValue$1(this));
    this._get = get2;
    this._set = set2;
  }
  get value() {
    return this._get();
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function customRef(factory) {
  return new CustomRefImpl(factory);
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef$1(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
var _a$1;
class ComputedRefImpl$1 {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a$1] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect$1(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue$1(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw$1(this);
    trackRefValue$1(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a$1 = "__v_isReadonly";
function computed$1$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$2(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl$1(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack$1 = [];
function pushWarningContext$1(vnode) {
  stack$1.push(vnode);
}
function popWarningContext$1() {
  stack$1.pop();
}
function warn$4(msg, ...args) {
  pauseTracking$1();
  const instance = stack$1.length ? stack$1[stack$1.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace$1();
  if (appWarnHandler) {
    callWithErrorHandling$1(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName$1(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace$1(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking$1();
}
function getComponentTrace$1() {
  let currentVNode = stack$1[stack$1.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace$1(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry$1(entry));
  });
  return logs;
}
function formatTraceEntry$1({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName$1(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps$1(vnode.props), close] : [open + close];
}
function formatProps$1(props) {
  const res = [];
  const keys2 = Object.keys(props);
  keys2.slice(0, 3).forEach((key) => {
    res.push(...formatProp$1(key, props[key]));
  });
  if (keys2.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp$1(key, value, raw) {
  if (isString$2(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef$1(value)) {
    value = formatProp$1(key, toRaw$1(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction$2(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw$1(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling$1(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError$1(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling$1(fn, instance, type, args) {
  if (isFunction$2(fn)) {
    const res = callWithErrorHandling$1(fn, instance, type, args);
    if (res && isPromise$1(res)) {
      res.catch((err) => {
        handleError$1(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling$1(fn[i], instance, type, args));
  }
  return values;
}
function handleError$1(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings$1[type];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling$1(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError$1(err, type, contextVNode, throwInDev);
}
function logError$1(err, type, contextVNode, throwInDev = true) {
  {
    const info2 = ErrorTypeStrings$1[type];
    if (contextVNode) {
      pushWarningContext$1(contextVNode);
    }
    warn$4(`Unhandled error${info2 ? ` during execution of ${info2}` : ``}`);
    if (contextVNode) {
      popWarningContext$1();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  }
}
let isFlushing$1 = false;
let isFlushPending$1 = false;
const queue$1 = [];
let flushIndex$1 = 0;
const pendingPostFlushCbs$1 = [];
let activePostFlushCbs$1 = null;
let postFlushIndex$1 = 0;
const resolvedPromise$1 = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise$1 = null;
const RECURSION_LIMIT$1 = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise$1 || resolvedPromise$1;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex$1(id) {
  let start = flushIndex$1 + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId$1(queue$1[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob$1(job) {
  if (!queue$1.length || !queue$1.includes(job, isFlushing$1 && job.allowRecurse ? flushIndex$1 + 1 : flushIndex$1)) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex$1(job.id), 0, job);
    }
    queueFlush$1();
  }
}
function queueFlush$1() {
  if (!isFlushing$1 && !isFlushPending$1) {
    isFlushPending$1 = true;
    currentFlushPromise$1 = resolvedPromise$1.then(flushJobs$1);
  }
}
function invalidateJob$1(job) {
  const i = queue$1.indexOf(job);
  if (i > flushIndex$1) {
    queue$1.splice(i, 1);
  }
}
function queuePostFlushCb$1(cb) {
  if (!isArray$3(cb)) {
    if (!activePostFlushCbs$1 || !activePostFlushCbs$1.includes(cb, cb.allowRecurse ? postFlushIndex$1 + 1 : postFlushIndex$1)) {
      pendingPostFlushCbs$1.push(cb);
    }
  } else {
    pendingPostFlushCbs$1.push(...cb);
  }
  queueFlush$1();
}
function flushPreFlushCbs$1(seen2, i = isFlushing$1 ? flushIndex$1 + 1 : 0) {
  {
    seen2 = seen2 || /* @__PURE__ */ new Map();
  }
  for (; i < queue$1.length; i++) {
    const cb = queue$1[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates$1(seen2, cb)) {
        continue;
      }
      queue$1.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs$1(seen2) {
  if (pendingPostFlushCbs$1.length) {
    const deduped = [...new Set(pendingPostFlushCbs$1)];
    pendingPostFlushCbs$1.length = 0;
    if (activePostFlushCbs$1) {
      activePostFlushCbs$1.push(...deduped);
      return;
    }
    activePostFlushCbs$1 = deduped;
    {
      seen2 = seen2 || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs$1.sort((a, b) => getId$1(a) - getId$1(b));
    for (postFlushIndex$1 = 0; postFlushIndex$1 < activePostFlushCbs$1.length; postFlushIndex$1++) {
      if (checkRecursiveUpdates$1(seen2, activePostFlushCbs$1[postFlushIndex$1])) {
        continue;
      }
      activePostFlushCbs$1[postFlushIndex$1]();
    }
    activePostFlushCbs$1 = null;
    postFlushIndex$1 = 0;
  }
}
const getId$1 = (job) => job.id == null ? Infinity : job.id;
const comparator$1 = (a, b) => {
  const diff = getId$1(a) - getId$1(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs$1(seen2) {
  isFlushPending$1 = false;
  isFlushing$1 = true;
  {
    seen2 = seen2 || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator$1);
  const check = (job) => checkRecursiveUpdates$1(seen2, job);
  try {
    for (flushIndex$1 = 0; flushIndex$1 < queue$1.length; flushIndex$1++) {
      const job = queue$1[flushIndex$1];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling$1(job, null, 14);
      }
    }
  } finally {
    flushIndex$1 = 0;
    queue$1.length = 0;
    flushPostFlushCbs$1(seen2);
    isFlushing$1 = false;
    currentFlushPromise$1 = null;
    if (queue$1.length || pendingPostFlushCbs$1.length) {
      flushJobs$1(seen2);
    }
  }
}
function checkRecursiveUpdates$1(seen2, fn) {
  if (!seen2.has(fn)) {
    seen2.set(fn, 1);
  } else {
    const count = seen2.get(fn);
    if (count > RECURSION_LIMIT$1) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName$1(instance.type);
      warn$4(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen2.set(fn, count + 1);
    }
  }
}
let isHmrUpdating$1 = false;
const hmrDirtyComponents$1 = /* @__PURE__ */ new Set();
{
  getGlobalThis$1().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap$1(createRecord$1),
    rerender: tryWrap$1(rerender$1),
    reload: tryWrap$1(reload$1)
  };
}
const map$1 = /* @__PURE__ */ new Map();
function registerHMR$1(instance) {
  const id = instance.type.__hmrId;
  let record = map$1.get(id);
  if (!record) {
    createRecord$1(id, instance.type);
    record = map$1.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR$1(instance) {
  map$1.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord$1(id, initialDef) {
  if (map$1.has(id)) {
    return false;
  }
  map$1.set(id, {
    initialDef: normalizeClassComponent$1(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent$1(component) {
  return isClassComponent$1(component) ? component.__vccOpts : component;
}
function rerender$1(id, newRender) {
  const record = map$1.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent$1(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating$1 = true;
    instance.update();
    isHmrUpdating$1 = false;
  });
}
function reload$1(id, newComp) {
  const record = map$1.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent$1(newComp);
  updateComponentDef$1(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent$1(instance.type);
    if (!hmrDirtyComponents$1.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef$1(oldComp, newComp);
      }
      hmrDirtyComponents$1.add(oldComp);
    }
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents$1.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents$1.delete(oldComp);
    } else if (instance.parent) {
      queueJob$1(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
    }
  }
  queuePostFlushCb$1(() => {
    for (const instance of instances) {
      hmrDirtyComponents$1.delete(normalizeClassComponent$1(instance.type));
    }
  });
}
function updateComponentDef$1(oldComp, newComp) {
  extend$1(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap$1(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
    }
  };
}
let devtools$1;
let buffer$1 = [];
let devtoolsNotInstalled$1 = false;
function emit$2(event, ...args) {
  if (devtools$1) {
    devtools$1.emit(event, ...args);
  } else if (!devtoolsNotInstalled$1) {
    buffer$1.push({ event, args });
  }
}
function setDevtoolsHook$1(hook, target) {
  var _a2, _b;
  devtools$1 = hook;
  if (devtools$1) {
    devtools$1.enabled = true;
    buffer$1.forEach(({ event, args }) => devtools$1.emit(event, ...args));
    buffer$1 = [];
  } else if (typeof window !== "undefined" && window.HTMLElement && !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook$1(newHook, target);
    });
    setTimeout(() => {
      if (!devtools$1) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled$1 = true;
        buffer$1 = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled$1 = true;
    buffer$1 = [];
  }
}
function devtoolsInitApp$1(app2, version2) {
  emit$2("app:init", app2, version2, {
    Fragment: Fragment$1,
    Text: Text$1,
    Comment: Comment$1,
    Static: Static$1
  });
}
function devtoolsUnmountApp$1(app2) {
  emit$2("app:unmount", app2);
}
const devtoolsComponentAdded$1 = /* @__PURE__ */ createDevtoolsComponentHook$1("component:added");
const devtoolsComponentUpdated$1 = /* @__PURE__ */ createDevtoolsComponentHook$1("component:updated");
const _devtoolsComponentRemoved$1 = /* @__PURE__ */ createDevtoolsComponentHook$1("component:removed");
const devtoolsComponentRemoved$1 = (component) => {
  if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && !devtools$1.cleanupBuffer(component)) {
    _devtoolsComponentRemoved$1(component);
  }
};
function createDevtoolsComponentHook$1(hook) {
  return (component) => {
    emit$2(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
  };
}
const devtoolsPerfStart$1 = /* @__PURE__ */ createDevtoolsPerformanceHook$1("perf:start");
const devtoolsPerfEnd$1 = /* @__PURE__ */ createDevtoolsPerformanceHook$1("perf:end");
function createDevtoolsPerformanceHook$1(hook) {
  return (component, type, time) => {
    emit$2(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit$1(component, event, params) {
  emit$2("component:emit", component.appContext.app, component, event, params);
}
function emit$1$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ$1;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey$1(event) in propsOptions)) {
          warn$4(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey$1(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction$2(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$4(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ$1;
    if (trim) {
      args = rawArgs.map((a) => isString$2(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(toNumber$2);
    }
  }
  {
    devtoolsComponentEmit$1(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey$1(lowerCaseEvent)]) {
      warn$4(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName$1(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate$1(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey$1(event)] || props[handlerName = toHandlerKey$1(camelize$1(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey$1(hyphenate$1(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling$1(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling$1(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions$1(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$2(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions$1(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend$1(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$2(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$3(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend$1(normalized, raw);
  }
  if (isObject$2(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener$1(options, key) {
  if (!options || !isOn$1(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate$1(key)) || hasOwn$1(options, key);
}
let currentRenderingInstance$1 = null;
let currentScopeId$1 = null;
function setCurrentRenderingInstance$1(instance) {
  const prev = currentRenderingInstance$1;
  currentRenderingInstance$1 = instance;
  currentScopeId$1 = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx$1(fn, ctx = currentRenderingInstance$1, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking$1(-1);
    }
    const prevInstance = setCurrentRenderingInstance$1(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance$1(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking$1(1);
      }
    }
    {
      devtoolsComponentUpdated$1(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
let accessedAttrs$1 = false;
function markAttrsAccessed$1() {
  accessedAttrs$1 = true;
}
function renderComponentRoot$1(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render: render2, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance$1(instance);
  {
    accessedAttrs$1 = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode$1(render2.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render3 = Component;
      if (attrs === props) {
        markAttrsAccessed$1();
      }
      result = normalizeVNode$1(render3.length > 1 ? render3(props, true ? {
        get attrs() {
          markAttrsAccessed$1();
          return attrs;
        },
        slots,
        emit: emit2
      } : { attrs, slots, emit: emit2 }) : render3(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough$1(attrs);
    }
  } catch (err) {
    handleError$1(err, instance, 1);
    result = createVNode$1(Comment$1);
  }
  let root2 = result;
  let setRoot = void 0;
  if (result.patchFlag > 0 && result.patchFlag & 2048) {
    [root2, setRoot] = getChildRoot$1(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys2 = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root2;
    if (keys2.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys2.some(isModelListener$1)) {
          fallthroughAttrs = filterModelListeners$1(fallthroughAttrs, propsOptions);
        }
        root2 = cloneVNode$1(root2, fallthroughAttrs);
      } else if (!accessedAttrs$1 && root2.type !== Comment$1) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i = 0, l = allAttrs.length; i < l; i++) {
          const key = allAttrs[i];
          if (isOn$1(key)) {
            if (!isModelListener$1(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn$4(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`);
        }
        if (eventAttrs.length) {
          warn$4(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!isElementRoot$1(root2)) {
      warn$4(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
    }
    root2 = cloneVNode$1(root2);
    root2.dirs = root2.dirs ? root2.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!isElementRoot$1(root2)) {
      warn$4(`Component inside <Transition> renders non-element root node that cannot be animated.`);
    }
    root2.transition = vnode.transition;
  }
  if (setRoot) {
    setRoot(root2);
  } else {
    result = root2;
  }
  setCurrentRenderingInstance$1(prev);
  return result;
}
const getChildRoot$1 = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot$1(rawChildren);
  if (!childRoot) {
    return [vnode, void 0];
  }
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode$1(childRoot), setRoot];
};
function filterSingleRoot$1(children) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode$1(child)) {
      if (child.type !== Comment$1 || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough$1 = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn$1(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners$1 = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener$1(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot$1 = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment$1;
};
function shouldUpdateComponent$1(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if ((prevChildren || nextChildren) && isHmrUpdating$1) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged$1(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener$1(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged$1(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged$1(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener$1(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl$1({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense$1 = (type) => type.__isSuspense;
function queueEffectWithSuspense$1(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$3(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb$1(fn);
  }
}
function provide$1(key, value) {
  if (!currentInstance$1) {
    {
      warn$4(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance$1.provides;
    const parentProvides = currentInstance$1.parent && currentInstance$1.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance$1.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject$1(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance$1 || currentRenderingInstance$1;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$2(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$4(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$4(`inject() can only be used inside setup() or functional components.`);
  }
}
function watchEffect(effect2, options) {
  return doWatch$1(effect2, null, options);
}
const INITIAL_WATCHER_VALUE$1 = {};
function watch$1(source, cb, options) {
  if (!isFunction$2(cb)) {
    warn$4(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch$1(source, cb, options);
}
function doWatch$1(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ$1) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$4(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$4(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s) => {
    warn$4(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance$1;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef$1(source)) {
    getter = () => source.value;
    forceTrigger = isShallow$1$1(source);
  } else if (isReactive$1(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$3(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive$1(s) || isShallow$1$1(s));
    getter = () => source.map((s) => {
      if (isRef$1(s)) {
        return s.value;
      } else if (isReactive$1(s)) {
        return traverse$1(s);
      } else if (isFunction$2(s)) {
        return callWithErrorHandling$1(s, instance, 2);
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction$2(source)) {
    if (cb) {
      getter = () => callWithErrorHandling$1(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling$1(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP$1;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse$1(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling$1(fn, instance, 4);
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup$1) {
    onCleanup = NOOP$1;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling$1(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext$1();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP$1;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE$1) : INITIAL_WATCHER_VALUE$1;
  const job = () => {
    if (!effect2.active) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged$1(v, oldValue[i])) : hasChanged$1(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling$1(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE$1 ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE$1 ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob$1(job);
  }
  const effect2 = new ReactiveEffect$1(getter, scheduler);
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(effect2.run.bind(effect2), instance && instance.suspense);
  } else {
    effect2.run();
  }
  const unwatch = () => {
    effect2.stop();
    if (instance && instance.scope) {
      remove$1(instance.scope.effects, effect2);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch$1(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$2(source) ? source.includes(".") ? createPathGetter$1(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$2(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance$1;
  setCurrentInstance$1(this);
  const res = doWatch$1(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance$1(cur);
  } else {
    unsetCurrentInstance$1();
  }
  return res;
}
function createPathGetter$1(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse$1(value, seen2) {
  if (!isObject$2(value) || value["__v_skip"]) {
    return value;
  }
  seen2 = seen2 || /* @__PURE__ */ new Set();
  if (seen2.has(value)) {
    return value;
  }
  seen2.add(value);
  if (isRef$1(value)) {
    traverse$1(value.value, seen2);
  } else if (isArray$3(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse$1(value[i], seen2);
    }
  } else if (isSet$2(value) || isMap$2(value)) {
    value.forEach((v) => {
      traverse$1(v, seen2);
    });
  } else if (isPlainObject$2(value)) {
    for (const key in value) {
      traverse$1(value[key], seen2);
    }
  }
  return value;
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted$1(() => {
    state.isMounted = true;
  });
  onBeforeUnmount$1(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        let hasFound = false;
        for (const c of children) {
          if (c.type !== Comment$1) {
            if (hasFound) {
              warn$4("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            child = c;
            hasFound = true;
          }
        }
      }
      const rawProps = toRaw$1(props);
      const { mode } = rawProps;
      if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
        warn$4(`invalid <transition> mode: ${mode}`);
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment$1 && (!isSameVNodeType$1(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment$1) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling$1(hook, instance, 9, args);
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$3(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType$1(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive$1(vnode)) {
    vnode = cloneVNode$1(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive$1(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment$1) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment$1) {
      ret.push(key != null ? cloneVNode$1(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent$1(options) {
  return isFunction$2(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper$1 = (i) => !!i.type.__asyncLoader;
const isKeepAlive$1 = (vnode) => vnode.type.__isKeepAlive;
function onActivated$1(hook, target) {
  registerKeepAliveHook$1(hook, "a", target);
}
function onDeactivated$1(hook, target) {
  registerKeepAliveHook$1(hook, "da", target);
}
function registerKeepAliveHook$1(hook, type, target = currentInstance$1) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook$1(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive$1(current.parent.vnode)) {
        injectToKeepAliveRoot$1(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot$1(hook, type, target, keepAliveRoot) {
  const injected = injectHook$1(type, hook, keepAliveRoot, true);
  onUnmounted$1(() => {
    remove$1(keepAliveRoot[type], injected);
  }, target);
}
function injectHook$1(type, hook, target = currentInstance$1, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking$1();
      setCurrentInstance$1(target);
      const res = callWithAsyncErrorHandling$1(hook, target, type, args);
      unsetCurrentInstance$1();
      resetTracking$1();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey$1(ErrorTypeStrings$1[type].replace(/ hook$/, ""));
    warn$4(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const createHook$1 = (lifecycle) => (hook, target = currentInstance$1) => (!isInSSRComponentSetup$1 || lifecycle === "sp") && injectHook$1(lifecycle, (...args) => hook(...args), target);
const onBeforeMount$1 = createHook$1("bm");
const onMounted$1 = createHook$1("m");
const onBeforeUpdate$1 = createHook$1("bu");
const onUpdated$1 = createHook$1("u");
const onBeforeUnmount$1 = createHook$1("bum");
const onUnmounted$1 = createHook$1("um");
const onServerPrefetch$1 = createHook$1("sp");
const onRenderTriggered$1 = createHook$1("rtg");
const onRenderTracked$1 = createHook$1("rtc");
function onErrorCaptured$1(hook, target = currentInstance$1) {
  injectHook$1("ec", hook, target);
}
function validateDirectiveName$1(name) {
  if (isBuiltInDirective$1(name)) {
    warn$4("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance$1;
  if (internalInstance === null) {
    warn$4(`withDirectives can only be used inside render functions.`);
    return vnode;
  }
  const instance = getExposeProxy$1(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ$1] = directives[i];
    if (dir) {
      if (isFunction$2(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse$1(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook$1(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking$1();
      callWithAsyncErrorHandling$1(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking$1();
    }
  }
}
const NULL_DYNAMIC_COMPONENT$1 = Symbol();
const getPublicInstance$1 = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent$1(i))
    return getExposeProxy$1(i) || i.proxy;
  return getPublicInstance$1(i.parent);
};
const publicPropertiesMap$1 = /* @__PURE__ */ extend$1(/* @__PURE__ */ Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => shallowReadonly$1(i.props),
  $attrs: (i) => shallowReadonly$1(i.attrs),
  $slots: (i) => shallowReadonly$1(i.slots),
  $refs: (i) => shallowReadonly$1(i.refs),
  $parent: (i) => getPublicInstance$1(i.parent),
  $root: (i) => getPublicInstance$1(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions$1(i),
  $forceUpdate: (i) => i.f || (i.f = () => queueJob$1(i.update)),
  $nextTick: (i) => i.n || (i.n = nextTick$1.bind(i.proxy)),
  $watch: (i) => instanceWatch$1.bind(i)
});
const isReservedPrefix$1 = (key) => key === "_" || key === "$";
const hasSetupBinding$1 = (state, key) => state !== EMPTY_OBJ$1 && !state.__isScriptSetup && hasOwn$1(state, key);
const PublicInstanceProxyHandlers$1 = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding$1(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ$1 && hasOwn$1(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ$1 && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess$1) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap$1[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track$1(instance, "get", key);
        markAttrsAccessed$1();
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ$1 && hasOwn$1(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance$1 && (!isString$2(key) || key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ$1 && isReservedPrefix$1(key[0]) && hasOwn$1(data, key)) {
        warn$4(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance$1) {
        warn$4(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding$1(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn$1(setupState, key)) {
      warn$4(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ$1 && hasOwn$1(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$1(instance.props, key)) {
      warn$4(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$4(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ$1 && hasOwn$1(data, key) || hasSetupBinding$1(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap$1, key) || hasOwn$1(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers$1.ownKeys = (target) => {
    warn$4(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext$1(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap$1).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap$1[key](instance),
      set: NOOP$1
    });
  });
  return target;
}
function exposePropsOnRenderContext$1(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP$1
      });
    });
  }
}
function exposeSetupStateOnRenderContext$1(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw$1(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix$1(key[0])) {
        warn$4(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP$1
      });
    }
  });
}
function createDuplicateChecker$1() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$4(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess$1 = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions$1(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess$1 = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker$1();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections$1(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$2(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$4(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction$2(dataOptions)) {
      warn$4(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise$1(data)) {
      warn$4(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$2(data)) {
      warn$4(`data() should return an object.`);
    } else {
      instance.data = reactive$1(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix$1(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP$1
            });
          }
        }
      }
    }
  }
  shouldCacheAccess$1 = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$2(opt) ? opt.bind(publicThis, publicThis) : isFunction$2(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP$1;
      if (get2 === NOOP$1) {
        warn$4(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction$2(opt) && isFunction$2(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$4(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed$2({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher$1(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$2(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide$1(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$3(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount$1, beforeMount);
  registerLifecycleHook(onMounted$1, mounted);
  registerLifecycleHook(onBeforeUpdate$1, beforeUpdate);
  registerLifecycleHook(onUpdated$1, updated);
  registerLifecycleHook(onActivated$1, activated);
  registerLifecycleHook(onDeactivated$1, deactivated);
  registerLifecycleHook(onErrorCaptured$1, errorCaptured);
  registerLifecycleHook(onRenderTracked$1, renderTracked);
  registerLifecycleHook(onRenderTriggered$1, renderTriggered);
  registerLifecycleHook(onBeforeUnmount$1, beforeUnmount);
  registerLifecycleHook(onUnmounted$1, unmounted);
  registerLifecycleHook(onServerPrefetch$1, serverPrefetch);
  if (isArray$3(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP$1) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections$1(injectOptions, ctx, checkDuplicateProperties = NOOP$1, unwrapRef = false) {
  if (isArray$3(injectOptions)) {
    injectOptions = normalizeInject$1(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$2(opt)) {
      if ("default" in opt) {
        injected = inject$1(opt.from || key, opt.default, true);
      } else {
        injected = inject$1(opt.from || key);
      }
    } else {
      injected = inject$1(opt);
    }
    if (isRef$1(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn$4(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling$1(isArray$3(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher$1(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter$1(publicThis, key) : () => publicThis[key];
  if (isString$2(raw)) {
    const handler = ctx[raw];
    if (isFunction$2(handler)) {
      watch$1(getter, handler);
    } else {
      warn$4(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction$2(raw)) {
    watch$1(getter, raw.bind(publicThis));
  } else if (isObject$2(raw)) {
    if (isArray$3(raw)) {
      raw.forEach((r) => createWatcher$1(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$2(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$2(handler)) {
        watch$1(getter, handler, raw);
      } else {
        warn$4(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$4(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions$1(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions$2(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions$2(resolved, base, optionMergeStrategies);
  }
  if (isObject$2(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions$2(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$2(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions$2(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$4(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats$1[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats$1 = {
  data: mergeDataFn$1,
  props: mergeObjectOptions$1,
  emits: mergeObjectOptions$1,
  methods: mergeObjectOptions$1,
  computed: mergeObjectOptions$1,
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  components: mergeObjectOptions$1,
  directives: mergeObjectOptions$1,
  watch: mergeWatchOptions$1,
  provide: mergeDataFn$1,
  inject: mergeInject$1
};
function mergeDataFn$1(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend$1(isFunction$2(to) ? to.call(this, this) : to, isFunction$2(from) ? from.call(this, this) : from);
  };
}
function mergeInject$1(to, from) {
  return mergeObjectOptions$1(normalizeInject$1(to), normalizeInject$1(from));
}
function normalizeInject$1(raw) {
  if (isArray$3(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions$1(to, from) {
  return to ? extend$1(extend$1(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions$1(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend$1(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def$1(attrs, InternalObjectKey$1, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps$1(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps$1(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive$1(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext$1(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps$1(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw$1(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (!isInHmrContext$1(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener$1(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize$1(key);
            props[camelizedKey] = resolvePropValue$1(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps$1(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn$1(rawProps, key) && ((kebabKey = hyphenate$1(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue$1(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger$1(instance, "set", "$attrs");
  }
  {
    validateProps$1(rawProps || {}, props, instance);
  }
}
function setFullProps$1(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp$1(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize$1(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener$1(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw$1(props);
    const castValues = rawCastValues || EMPTY_OBJ$1;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue$1(options, rawCurrentProps, key, castValues[key], instance, !hasOwn$1(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue$1(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction$2(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance$1(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance$1();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate$1(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions$1(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$2(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys2] = normalizePropsOptions$1(raw2, appContext, true);
      extend$1(normalized, props);
      if (keys2)
        needCastKeys.push(...keys2);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$2(comp)) {
      cache.set(comp, EMPTY_ARR$1);
    }
    return EMPTY_ARR$1;
  }
  if (isArray$3(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString$2(raw[i])) {
        warn$4(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize$1(raw[i]);
      if (validatePropName$1(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ$1;
      }
    }
  } else if (raw) {
    if (!isObject$2(raw)) {
      warn$4(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize$1(key);
      if (validatePropName$1(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$3(opt) || isFunction$2(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex$1(Boolean, prop.type);
          const stringIndex = getTypeIndex$1(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$2(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName$1(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn$4(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType$1(ctor) {
  const match2 = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match2 ? match2[1] : ctor === null ? "null" : "";
}
function isSameType$1(a, b) {
  return getType$1(a) === getType$1(b);
}
function getTypeIndex$1(type, expectedTypes) {
  if (isArray$3(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType$1(t, type));
  } else if (isFunction$2(expectedTypes)) {
    return isSameType$1(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps$1(rawProps, props, instance) {
  const resolvedValues = toRaw$1(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp$1(key, resolvedValues[key], opt, !hasOwn$1(rawProps, key) && !hasOwn$1(rawProps, hyphenate$1(key)));
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$4('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray$3(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$4(getInvalidTypeMessage$1(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$4('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap$1("String,Number,Boolean,Function,Symbol,BigInt");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$2(value);
  } else if (expectedType === "Array") {
    valid = isArray$3(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize$2).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType$1(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
const isInternalKey$1 = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue$1 = (value) => isArray$3(value) ? value.map(normalizeVNode$1) : [normalizeVNode$1(value)];
const normalizeSlot$2 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx$1((...args) => {
    if (currentInstance$1) {
      warn$4(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
    }
    return normalizeSlotValue$1(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots$1 = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey$1(key))
      continue;
    const value = rawSlots[key];
    if (isFunction$2(value)) {
      slots[key] = normalizeSlot$2(key, value, ctx);
    } else if (value != null) {
      {
        warn$4(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
      }
      const normalized = normalizeSlotValue$1(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots$1 = (instance, children) => {
  if (!isKeepAlive$1(instance.vnode) && true) {
    warn$4(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
  }
  const normalized = normalizeSlotValue$1(children);
  instance.slots.default = () => normalized;
};
const initSlots$1 = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw$1(children);
      def$1(children, "_", type);
    } else {
      normalizeObjectSlots$1(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots$1(instance, children);
    }
  }
  def$1(instance.slots, InternalObjectKey$1, 1);
};
const updateSlots$1 = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ$1;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (isHmrUpdating$1) {
        extend$1(slots, children);
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend$1(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots$1(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots$1(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey$1(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function createAppContext$1() {
  return {
    app: null,
    config: {
      isNativeTag: NO$1,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$2 = 0;
function createAppAPI$1(render2, hydrate2) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$2(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$2(rootProps)) {
      warn$4(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext$1();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid$2++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version: version$1,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn$4(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          warn$4(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction$2(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction$2(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else {
          warn$4(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$4("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app2;
      },
      component(name, component) {
        {
          validateComponentName$1(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$4(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        {
          validateDirectiveName$1(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$4(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          if (rootContainer.__vue_app__) {
            warn$4(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
          }
          const vnode = createVNode$1(rootComponent, rootProps);
          vnode.appContext = context;
          {
            context.reload = () => {
              render2(cloneVNode$1(vnode), rootContainer, isSVG);
            };
          }
          if (isHydrate && hydrate2) {
            hydrate2(vnode, rootContainer);
          } else {
            render2(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          {
            app2._instance = vnode.component;
            devtoolsInitApp$1(app2, version$1);
          }
          return getExposeProxy$1(vnode.component) || vnode.component.proxy;
        } else {
          warn$4(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
        }
      },
      unmount() {
        if (isMounted) {
          render2(null, app2._container);
          {
            app2._instance = null;
            devtoolsUnmountApp$1(app2);
          }
          delete app2._container.__vue_app__;
        } else {
          warn$4(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$4(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app2;
      }
    };
    return app2;
  };
}
function setRef$1(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$3(rawRef)) {
    rawRef.forEach((r, i) => setRef$1(r, oldRawRef && (isArray$3(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper$1(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy$1(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (!owner) {
    warn$4(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ$1 ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$2(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn$1(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef$1(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$2(ref2)) {
    callWithErrorHandling$1(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString$2(ref2);
    const _isRef = isRef$1(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn$1(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$3(existing) && remove$1(existing, refValue);
          } else {
            if (!isArray$3(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn$1(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn$1(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else {
          warn$4("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect$1(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else {
      warn$4("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
}
let supported$2;
let perf$2;
function startMeasure$1(instance, type) {
  if (instance.appContext.config.performance && isSupported$1()) {
    perf$2.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart$1(instance, type, isSupported$1() ? perf$2.now() : Date.now());
  }
}
function endMeasure$1(instance, type) {
  if (instance.appContext.config.performance && isSupported$1()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf$2.mark(endTag);
    perf$2.measure(`<${formatComponentName$1(instance, instance.type)}> ${type}`, startTag, endTag);
    perf$2.clearMarks(startTag);
    perf$2.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd$1(instance, type, isSupported$1() ? perf$2.now() : Date.now());
  }
}
function isSupported$1() {
  if (supported$2 !== void 0) {
    return supported$2;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported$2 = true;
    perf$2 = window.performance;
  } else {
    supported$2 = false;
  }
  return supported$2;
}
function initFeatureFlags$1() {
  const needWarn = [];
  if (needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const queuePostRenderEffect$1 = queueEffectWithSuspense$1;
function createRenderer$1(options) {
  return baseCreateRenderer$1(options);
}
function baseCreateRenderer$1(options, createHydrationFns) {
  {
    initFeatureFlags$1();
  }
  const target = getGlobalThis$1();
  target.__VUE__ = true;
  {
    setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP$1, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating$1 ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType$1(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text$1:
        processText(n1, n2, container, anchor);
        break;
      case Comment$1:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static$1:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else {
          patchStaticNode(n1, n2, container, isSVG);
        }
        break;
      case Fragment$1:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else {
          warn$4("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef$1(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const patchStaticNode = (n1, n2, container, isSVG) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
    }
    if (dirs) {
      invokeDirectiveHook$1(vnode, null, parentComponent, "created");
    }
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp$1(key)) {
          hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook$1(vnodeHook, parentComponent, vnode);
      }
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook$1(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect$1(() => {
        vnodeHook && invokeVNodeHook$1(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook$1(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot$1(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted$1(children[i]) : normalizeVNode$1(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ$1;
    const newProps = n2.props || EMPTY_OBJ$1;
    let vnodeHook;
    parentComponent && toggleRecurse$1(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook$1(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook$1(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse$1(parentComponent, true);
    if (isHmrUpdating$1) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
      if (parentComponent && parentComponent.type.__hmrId) {
        traverseStaticChildren$1(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect$1(() => {
        vnodeHook && invokeVNodeHook$1(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook$1(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment$1 || !isSameVNodeType$1(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ$1) {
        for (const key in oldProps) {
          if (!isReservedProp$1(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp$1(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (isHmrUpdating$1 || patchFlag & 2048) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren$1(n1, n2);
        } else if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren$1(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance$1(initialVNode, parentComponent, parentSuspense);
    if (instance.type.__hmrId) {
      registerHMR$1(instance);
    }
    {
      pushWarningContext$1(initialVNode);
      startMeasure$1(instance, `mount`);
    }
    if (isKeepAlive$1(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      {
        startMeasure$1(instance, `init`);
      }
      setupComponent$1(instance);
      {
        endMeasure$1(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode$1(Comment$1);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    {
      popWarningContext$1();
      endMeasure$1(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent$1(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        {
          pushWarningContext$1(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        {
          popWarningContext$1();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob$1(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper$1(initialVNode);
        toggleRecurse$1(instance, false);
        if (bm) {
          invokeArrayFns$1(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook$1(vnodeHook, parent, initialVNode);
        }
        toggleRecurse$1(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            {
              startMeasure$1(instance, `render`);
            }
            instance.subTree = renderComponentRoot$1(instance);
            {
              endMeasure$1(instance, `render`);
            }
            {
              startMeasure$1(instance, `hydrate`);
            }
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            {
              endMeasure$1(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          {
            startMeasure$1(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot$1(instance);
          {
            endMeasure$1(instance, `render`);
          }
          {
            startMeasure$1(instance, `patch`);
          }
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          {
            endMeasure$1(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect$1(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect$1(() => invokeVNodeHook$1(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper$1(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect$1(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        {
          devtoolsComponentAdded$1(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        {
          pushWarningContext$1(next || instance.vnode);
        }
        toggleRecurse$1(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns$1(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook$1(vnodeHook, parent, next, vnode);
        }
        toggleRecurse$1(instance, true);
        {
          startMeasure$1(instance, `render`);
        }
        const nextTree = renderComponentRoot$1(instance);
        {
          endMeasure$1(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        {
          startMeasure$1(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          hostParentNode(prevTree.el),
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        {
          endMeasure$1(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl$1(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect$1(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect$1(() => invokeVNodeHook$1(vnodeHook, parent, next, vnode), parentSuspense);
        }
        {
          devtoolsComponentUpdated$1(instance);
        }
        {
          popWarningContext$1();
        }
      }
    };
    const effect2 = instance.effect = new ReactiveEffect$1(
      componentUpdateFn,
      () => queueJob$1(update),
      instance.scope
    );
    const update = instance.update = () => effect2.run();
    update.id = instance.uid;
    toggleRecurse$1(instance, true);
    {
      effect2.onTrack = instance.rtc ? (e) => invokeArrayFns$1(instance.rtc, e) : void 0;
      effect2.onTrigger = instance.rtg ? (e) => invokeArrayFns$1(instance.rtg, e) : void 0;
      update.ownerInstance = instance;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps$1(instance, nextVNode.props, prevProps, optimized);
    updateSlots$1(instance, nextVNode.children, optimized);
    pauseTracking$1();
    flushPreFlushCbs$1();
    resetTracking$1();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR$1;
    c2 = c2 || EMPTY_ARR$1;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted$1(c2[i]) : normalizeVNode$1(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted$1(c2[i]) : normalizeVNode$1(c2[i]);
      if (isSameVNodeType$1(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted$1(c2[e2]) : normalizeVNode$1(c2[e2]);
      if (isSameVNodeType$1(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted$1(c2[i]) : normalizeVNode$1(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted$1(c2[i]) : normalizeVNode$1(c2[i]);
        if (nextChild.key != null) {
          if (keyToNewIndexMap.has(nextChild.key)) {
            warn$4(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType$1(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence$1(newIndexToOldIndexMap) : EMPTY_ARR$1;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment$1) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static$1) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect$1(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef$1(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper$1(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook$1(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook$1(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type !== Fragment$1 || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment$1 && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect$1(() => {
        vnodeHook && invokeVNodeHook$1(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook$1(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment$1) {
      if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment$1) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static$1) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (instance.type.__hmrId) {
      unregisterHMR$1(instance);
    }
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns$1(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect$1(um, parentSuspense);
    }
    queuePostRenderEffect$1(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    {
      devtoolsComponentRemoved$1(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render2 = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs$1();
    flushPostFlushCbs$1();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate2;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate2, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render: render2,
    hydrate: hydrate2,
    createApp: createAppAPI$1(render2, hydrate2)
  };
}
function toggleRecurse$1({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren$1(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$3(ch1) && isArray$3(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted$1(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren$1(c1, c2);
      }
      if (c2.type === Text$1) {
        c2.el = c1.el;
      }
      if (c2.type === Comment$1 && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence$1(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport$1 = (type) => type.__isTeleport;
const isTeleportDisabled$1 = (props) => props && (props.disabled || props.disabled === "");
const isTargetSVG$1 = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const resolveTarget$1 = (props, select) => {
  const targetSelector = props && props.to;
  if (isString$2(targetSelector)) {
    if (!select) {
      warn$4(`Current renderer does not support string target for Teleports. (missing querySelector renderer option)`);
      return null;
    } else {
      const target = select(targetSelector);
      if (!target) {
        warn$4(`Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`);
      }
      return target;
    }
  } else {
    if (!targetSelector && !isTeleportDisabled$1(props)) {
      warn$4(`Invalid Teleport target: ${targetSelector}`);
    }
    return targetSelector;
  }
};
const TeleportImpl$1 = {
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
    const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
    const disabled = isTeleportDisabled$1(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (isHmrUpdating$1) {
      optimized = false;
      dynamicChildren = null;
    }
    if (n1 == null) {
      const placeholder = n2.el = createComment("teleport start");
      const mainAnchor = n2.anchor = createComment("teleport end");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target = n2.target = resolveTarget$1(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText("");
      if (target) {
        insert(targetAnchor, target);
        isSVG = isSVG || isTargetSVG$1(target);
      } else if (!disabled) {
        warn$4("Invalid Teleport target on mount:", target, `(${typeof target})`);
      }
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled$1(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG$1(target);
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
        traverseStaticChildren$1(n1, n2, true);
      } else if (!optimized) {
        patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport$1(n2, container, mainAnchor, internals, 1);
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget$1(n2.props, querySelector);
          if (nextTarget) {
            moveTeleport$1(n2, nextTarget, null, internals, 0);
          } else {
            warn$4("Invalid Teleport target on update:", target, `(${typeof target})`);
          }
        } else if (wasDisabled) {
          moveTeleport$1(n2, target, targetAnchor, internals, 1);
        }
      }
    }
    updateCssVars$1(n2);
  },
  remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
    if (target) {
      hostRemove(targetAnchor);
    }
    if (doRemove || !isTeleportDisabled$1(props)) {
      hostRemove(anchor);
      if (shapeFlag & 16) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
        }
      }
    }
  },
  move: moveTeleport$1,
  hydrate: hydrateTeleport$1
};
function moveTeleport$1(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled$1(props)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, parentAnchor, 2);
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport$1(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector } }, hydrateChildren) {
  const target = vnode.target = resolveTarget$1(vnode.props, querySelector);
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled$1(vnode.props)) {
        vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          targetAnchor = nextSibling(targetAnchor);
          if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
      }
    }
    updateCssVars$1(vnode);
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport$1 = TeleportImpl$1;
function updateCssVars$1(vnode) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node = vnode.children[0].el;
    while (node !== vnode.targetAnchor) {
      if (node.nodeType === 1)
        node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
const Fragment$1 = Symbol("Fragment");
const Text$1 = Symbol("Text");
const Comment$1 = Symbol("Comment");
const Static$1 = Symbol("Static");
let currentBlock$1 = null;
let isBlockTreeEnabled$1 = 1;
function setBlockTracking$1(value) {
  isBlockTreeEnabled$1 += value;
}
function isVNode$1(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType$1(n1, n2) {
  if (n2.shapeFlag & 6 && hmrDirtyComponents$1.has(n2.type)) {
    n1.shapeFlag &= ~256;
    n2.shapeFlag &= ~512;
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
const createVNodeWithArgsTransform$1 = (...args) => {
  return _createVNode$1(...args);
};
const InternalObjectKey$1 = `__vInternal`;
const normalizeKey$1 = ({ key }) => key != null ? key : null;
const normalizeRef$1 = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString$2(ref2) || isRef$1(ref2) || isFunction$2(ref2) ? { i: currentRenderingInstance$1, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode$1(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment$1 ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey$1(props),
    ref: props && normalizeRef$1(props),
    scopeId: currentScopeId$1,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance$1
  };
  if (needFullChildrenNormalization) {
    normalizeChildren$1(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$2(children) ? 8 : 16;
  }
  if (vnode.key !== vnode.key) {
    warn$4(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled$1 > 0 && !isBlockNode && currentBlock$1 && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock$1.push(vnode);
  }
  return vnode;
}
const createVNode$1 = createVNodeWithArgsTransform$1;
function _createVNode$1(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT$1) {
    if (!type) {
      warn$4(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment$1;
  }
  if (isVNode$1(type)) {
    const cloned = cloneVNode$1(type, props, true);
    if (children) {
      normalizeChildren$1(cloned, children);
    }
    if (isBlockTreeEnabled$1 > 0 && !isBlockNode && currentBlock$1) {
      if (cloned.shapeFlag & 6) {
        currentBlock$1[currentBlock$1.indexOf(type)] = cloned;
      } else {
        currentBlock$1.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent$1(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps$1(props);
    let { class: klass, style } = props;
    if (klass && !isString$2(klass)) {
      props.class = normalizeClass$1(klass);
    }
    if (isObject$2(style)) {
      if (isProxy$1(style) && !isArray$3(style)) {
        style = extend$1({}, style);
      }
      props.style = normalizeStyle$1(style);
    }
  }
  const shapeFlag = isString$2(type) ? 1 : isSuspense$1(type) ? 128 : isTeleport$1(type) ? 64 : isObject$2(type) ? 4 : isFunction$2(type) ? 2 : 0;
  if (shapeFlag & 4 && isProxy$1(type)) {
    type = toRaw$1(type);
    warn$4(`Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
  }
  return createBaseVNode$1(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps$1(props) {
  if (!props)
    return null;
  return isProxy$1(props) || InternalObjectKey$1 in props ? extend$1({}, props) : props;
}
function cloneVNode$1(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps$1(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey$1(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray$3(ref2) ? ref2.concat(normalizeRef$1(extraProps)) : [ref2, normalizeRef$1(extraProps)] : normalizeRef$1(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray$3(children) ? children.map(deepCloneVNode$1) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment$1 ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode$1(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode$1(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx
  };
  return cloned;
}
function deepCloneVNode$1(vnode) {
  const cloned = cloneVNode$1(vnode);
  if (isArray$3(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode$1);
  }
  return cloned;
}
function createTextVNode$1(text = " ", flag = 0) {
  return createVNode$1(Text$1, null, text, flag);
}
function normalizeVNode$1(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode$1(Comment$1);
  } else if (isArray$3(child)) {
    return createVNode$1(
      Fragment$1,
      null,
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted$1(child);
  } else {
    return createVNode$1(Text$1, null, String(child));
  }
}
function cloneIfMounted$1(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode$1(child);
}
function normalizeChildren$1(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$3(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren$1(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey$1 in children)) {
        children._ctx = currentRenderingInstance$1;
      } else if (slotFlag === 3 && currentRenderingInstance$1) {
        if (currentRenderingInstance$1.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$2(children)) {
    children = { default: children, _ctx: currentRenderingInstance$1 };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode$1(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps$1(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass$1([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle$1([ret.style, toMerge.style]);
      } else if (isOn$1(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$3(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook$1(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling$1(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext$1 = createAppContext$1();
let uid$1$1 = 0;
function createComponentInstance$1(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext$1;
  const instance = {
    uid: uid$1$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope$1(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions$1(type, appContext),
    emitsOptions: normalizeEmitsOptions$1(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ$1,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ$1,
    data: EMPTY_OBJ$1,
    props: EMPTY_OBJ$1,
    attrs: EMPTY_OBJ$1,
    slots: EMPTY_OBJ$1,
    refs: EMPTY_OBJ$1,
    setupState: EMPTY_OBJ$1,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext$1(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance$1 = null;
const getCurrentInstance = () => currentInstance$1 || currentRenderingInstance$1;
const setCurrentInstance$1 = (instance) => {
  currentInstance$1 = instance;
  instance.scope.on();
};
const unsetCurrentInstance$1 = () => {
  currentInstance$1 && currentInstance$1.scope.off();
  currentInstance$1 = null;
};
const isBuiltInTag$1 = /* @__PURE__ */ makeMap$1("slot,component");
function validateComponentName$1(name, config) {
  const appIsNativeTag = config.isNativeTag || NO$1;
  if (isBuiltInTag$1(name) || appIsNativeTag(name)) {
    warn$4("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent$1(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup$1 = false;
function setupComponent$1(instance, isSSR = false) {
  isInSSRComponentSetup$1 = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent$1(instance);
  initProps$1(instance, props, isStateful, isSSR);
  initSlots$1(instance, children);
  const setupResult = isStateful ? setupStatefulComponent$1(instance, isSSR) : void 0;
  isInSSRComponentSetup$1 = false;
  return setupResult;
}
function setupStatefulComponent$1(instance, isSSR) {
  var _a2;
  const Component = instance.type;
  {
    if (Component.name) {
      validateComponentName$1(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName$1(names[i], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName$1(names[i]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly$1()) {
      warn$4(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw$1(new Proxy(instance.ctx, PublicInstanceProxyHandlers$1));
  {
    exposePropsOnRenderContext$1(instance);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext$1(instance) : null;
    setCurrentInstance$1(instance);
    pauseTracking$1();
    const setupResult = callWithErrorHandling$1(setup, instance, 0, [shallowReadonly$1(instance.props), setupContext]);
    resetTracking$1();
    unsetCurrentInstance$1();
    if (isPromise$1(setupResult)) {
      setupResult.then(unsetCurrentInstance$1, unsetCurrentInstance$1);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult$1(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError$1(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (!instance.suspense) {
          const name = (_a2 = Component.name) !== null && _a2 !== void 0 ? _a2 : "Anonymous";
          warn$4(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
        }
      }
    } else {
      handleSetupResult$1(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup$1(instance, isSSR);
  }
}
function handleSetupResult$1(instance, setupResult, isSSR) {
  if (isFunction$2(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$2(setupResult)) {
    if (isVNode$1(setupResult)) {
      warn$4(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs$1(setupResult);
    {
      exposeSetupStateOnRenderContext$1(instance);
    }
  } else if (setupResult !== void 0) {
    warn$4(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup$1(instance, isSSR);
}
let compile$1;
const isRuntimeOnly$1 = () => !compile$1;
function finishComponentSetup$1(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile$1 && !Component.render) {
      const template = Component.template || resolveMergedOptions$1(instance).template;
      if (template) {
        {
          startMeasure$1(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend$1(extend$1({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile$1(template, finalCompilerOptions);
        {
          endMeasure$1(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP$1;
  }
  {
    setCurrentInstance$1(instance);
    pauseTracking$1();
    applyOptions$1(instance);
    resetTracking$1();
    unsetCurrentInstance$1();
  }
  if (!Component.render && instance.render === NOOP$1 && !isSSR) {
    if (Component.template) {
      warn$4(`Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
    } else {
      warn$4(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy$1(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      markAttrsAccessed$1();
      track$1(instance, "get", "$attrs");
      return target[key];
    },
    set() {
      warn$4(`setupContext.attrs is readonly.`);
      return false;
    },
    deleteProperty() {
      warn$4(`setupContext.attrs is readonly.`);
      return false;
    }
  });
}
function createSetupContext$1(instance) {
  const expose = (exposed) => {
    if (instance.exposed) {
      warn$4(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy$1(instance));
      },
      get slots() {
        return shallowReadonly$1(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy$1(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs$1(markRaw$1(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap$1) {
          return publicPropertiesMap$1[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap$1;
      }
    }));
  }
}
const classifyRE$1 = /(?:^|[-_])(\w)/g;
const classify$1 = (str) => str.replace(classifyRE$1, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName$1(Component, includeInferred = true) {
  return isFunction$2(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName$1(instance, Component, isRoot = false) {
  let name = getComponentName$1(Component);
  if (!name && Component.__file) {
    const match2 = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match2) {
      name = match2[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify$1(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent$1(value) {
  return isFunction$2(value) && "__vccOpts" in value;
}
const computed$2 = (getterOrOptions, debugOptions) => {
  return computed$1$1(getterOrOptions, debugOptions, isInSSRComponentSetup$1);
};
function h$1(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject$2(propsOrChildren) && !isArray$3(propsOrChildren)) {
      if (isVNode$1(propsOrChildren)) {
        return createVNode$1(type, null, [propsOrChildren]);
      }
      return createVNode$1(type, propsOrChildren);
    } else {
      return createVNode$1(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode$1(children)) {
      children = [children];
    }
    return createVNode$1(type, propsOrChildren, children);
  }
}
const ssrContextKey$1 = Symbol(`ssrContext`);
const useSSRContext$1 = () => {
  {
    const ctx = inject$1(ssrContextKey$1);
    if (!ctx) {
      warn$4(`Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`);
    }
    return ctx;
  }
};
function isShallow$2(value) {
  return !!(value && value["__v_isShallow"]);
}
function initCustomFormatter$1() {
  if (typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#0b1bc9" };
  const stringStyle = { style: "color:#b62e24" };
  const keywordStyle = { style: "color:#9d288c" };
  const formatter = {
    header(obj) {
      if (!isObject$2(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef$1(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive$1(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow$2(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly$1(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly$1(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow$2(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw$1(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ$1) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ$1) {
      blocks.push(createInstanceBlock("data", toRaw$1(instance.data)));
    }
    const computed2 = extractKeys(instance, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend$1({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject$2(v)) {
      return ["object", { object: asRaw ? toRaw$1(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction$2(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray$3(opts) && opts.includes(key) || isObject$2(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow$2(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
const version$1 = "3.2.45";
const svgNS$1 = "http://www.w3.org/2000/svg";
const doc$1 = typeof document !== "undefined" ? document : null;
const templateContainer$1 = doc$1 && /* @__PURE__ */ doc$1.createElement("template");
const nodeOps$1 = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc$1.createElementNS(svgNS$1, tag) : doc$1.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc$1.createTextNode(text),
  createComment: (text) => doc$1.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc$1.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer$1.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer$1.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass$1(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle$1(el, prev, next) {
  const style = el.style;
  const isCssString = isString$2(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle$1(style, key, next[key]);
    }
    if (prev && !isString$2(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle$1(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const semicolonRE$1 = /[^\\];\s*$/;
const importantRE$1 = /\s*!important$/;
function setStyle$1(style, name, val) {
  if (isArray$3(val)) {
    val.forEach((v) => setStyle$1(style, name, v));
  } else {
    if (val == null)
      val = "";
    {
      if (semicolonRE$1.test(val)) {
        warn$4(`Unexpected semicolon at the end of '${name}' style value: '${val}'`);
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix$1(style, name);
      if (importantRE$1.test(val)) {
        style.setProperty(hyphenate$1(prefixed), val.replace(importantRE$1, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes$1 = ["Webkit", "Moz", "ms"];
const prefixCache$1 = {};
function autoPrefix$1(style, rawName) {
  const cached = prefixCache$1[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize$1(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache$1[rawName] = name;
  }
  name = capitalize$2(name);
  for (let i = 0; i < prefixes$1.length; i++) {
    const prefixed = prefixes$1[i] + name;
    if (prefixed in style) {
      return prefixCache$1[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS$1 = "http://www.w3.org/1999/xlink";
function patchAttr$1(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS$1, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS$1, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr$1(key);
    if (value == null || isBoolean2 && !includeBooleanAttr$1(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
}
function patchDOMProp$1(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr$1(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (!needRemove) {
      warn$4(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`, e);
    }
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener$1(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener$1(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent$1(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName$1(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker$1(nextValue, instance);
      addEventListener$1(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener$1(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE$1 = /(?:Once|Passive|Capture)$/;
function parseName$1(name) {
  let options;
  if (optionsModifierRE$1.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE$1)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate$1(name.slice(2));
  return [event, options];
}
let cachedNow$1 = 0;
const p$1 = /* @__PURE__ */ Promise.resolve();
const getNow$1 = () => cachedNow$1 || (p$1.then(() => cachedNow$1 = 0), cachedNow$1 = Date.now());
function createInvoker$1(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling$1(patchStopImmediatePropagation$1(e, invoker.value), instance, 5, [e]);
  };
  invoker.value = initialValue;
  invoker.attached = getNow$1();
  return invoker;
}
function patchStopImmediatePropagation$1(e, value) {
  if (isArray$3(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE$1 = /^on[a-z]/;
const patchProp$1 = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass$1(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle$1(el, prevValue, nextValue);
  } else if (isOn$1(key)) {
    if (!isModelListener$1(key)) {
      patchEvent$1(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp$1(el, key, nextValue, isSVG)) {
    patchDOMProp$1(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr$1(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp$1(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE$1.test(key) && isFunction$2(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE$1.test(key) && isString$2(value)) {
    return false;
  }
  return key in el;
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props, { slots }) => h$1(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend$1({}, BaseTransition.props, DOMTransitionPropsValidators);
const callHook$2 = (hook, args = []) => {
  if (isArray$3(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$3(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook$2(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend$1(baseProps, {
    onBeforeEnter(el) {
      callHook$2(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook$2(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook$2(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook$2(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook$2(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook$2(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject$2(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber$2(val);
  validateDuration(res);
  return res;
}
function validateDuration(val) {
  if (typeof val !== "number") {
    warn$4(`<transition> explicit duration is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn$4(`<transition> explicit duration is NaN - the duration expression might be incorrect.`);
  }
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const TransitionGroupImpl = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ extend$1({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated$1(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c) => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el._moveCb = (e) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      const rawProps = toRaw$1(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment$1;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
        } else {
          warn$4(`<TransitionGroup> children must be keyed.`);
        }
      }
      if (prevChildren) {
        for (let i = 0; i < prevChildren.length; i++) {
          const child = prevChildren[i];
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }
      return createVNode$1(tag, null, children);
    };
  }
};
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
  const el = c.el;
  if (el._moveCb) {
    el._moveCb();
  }
  if (el._enterCb) {
    el._enterCb();
  }
}
function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}
function applyTranslation(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
    return c;
  }
}
function hasCSSTransform(el, root2, moveClass) {
  const clone = el.cloneNode();
  if (el._vtc) {
    el._vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root2.nodeType === 1 ? root2 : root2.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions$1 = /* @__PURE__ */ extend$1({ patchProp: patchProp$1 }, nodeOps$1);
let renderer$1;
function ensureRenderer$1() {
  return renderer$1 || (renderer$1 = createRenderer$1(rendererOptions$1));
}
const createApp$1 = (...args) => {
  const app2 = ensureRenderer$1().createApp(...args);
  {
    injectNativeTagCheck$1(app2);
    injectCompilerOptionsCheck$1(app2);
  }
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer$1(containerOrSelector);
    if (!container)
      return;
    const component = app2._component;
    if (!isFunction$2(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function injectNativeTagCheck$1(app2) {
  Object.defineProperty(app2.config, "isNativeTag", {
    value: (tag) => isHTMLTag$1(tag) || isSVGTag$1(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck$1(app2) {
  {
    const isCustomElement = app2.config.isCustomElement;
    Object.defineProperty(app2.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn$4(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
      }
    });
    const compilerOptions = app2.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
    Object.defineProperty(app2.config, "compilerOptions", {
      get() {
        warn$4(msg);
        return compilerOptions;
      },
      set() {
        warn$4(msg);
      }
    });
  }
}
function normalizeContainer$1(container) {
  if (isString$2(container)) {
    const res = document.querySelector(container);
    if (!res) {
      warn$4(`Failed to mount app: mount target selector "${container}" returned null.`);
    }
    return res;
  }
  if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn$4(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
  }
  return container;
}
function initDev$1() {
  {
    initCustomFormatter$1();
  }
}
{
  initDev$1();
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$f = Object.prototype;
var hasOwnProperty$c = objectProto$f.hasOwnProperty;
var nativeObjectToString$1 = objectProto$f.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$c.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$e = Object.prototype;
var nativeObjectToString = objectProto$e.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString$1(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag$3 = "[object Symbol]";
function isSymbol$1(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$3;
}
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var isArray$2 = Array.isArray;
const isArray$1$1 = isArray$2;
var INFINITY$1 = 1 / 0;
var symbolProto$2 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$1$1(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol$1(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
function isObject$1(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
function identity(value) {
  return value;
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$1(value) {
  if (!isObject$1(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid2 = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid2 ? "Symbol(src)_1." + uid2 : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$d = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$b = objectProto$d.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$b).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject$1(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap$1 = getNative(root$1, "WeakMap");
const WeakMap$1$1 = WeakMap$1;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
const baseCreate$1 = baseCreate;
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
const defineProperty$1 = defineProperty;
var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
  return defineProperty$1(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
const baseSetToString$1 = baseSetToString;
var setToString = shortOut(baseSetToString$1);
const setToString$1 = setToString;
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$c = Object.prototype;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$a.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var nativeMax$4 = Math.max;
function overRest(func, start, transform) {
  start = nativeMax$4(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax$4(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
function baseRest(func, start) {
  return setToString$1(overRest(func, start, identity), func + "");
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction$1(value);
}
function isIterateeCall(value, index, object) {
  if (!isObject$1(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var objectProto$b = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$b;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$3 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$3;
}
var objectProto$a = Object.prototype;
var hasOwnProperty$9 = objectProto$a.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$9.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$4 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$4 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$4] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$9 = Object.prototype;
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$8.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$8 = Object.prototype;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject$1(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$6.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$5.call(data, key) ? data[key] : void 0;
}
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$4.call(data, key);
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root$1, "Map");
const Map$2 = Map$1;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size2 = data.size;
  data.set(key, value);
  this.size += data.size == size2 ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function arrayPush(array, values) {
  var index = -1, length = values.length, offset2 = array.length;
  while (++index < length) {
    array[offset2 + index] = values[index];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
var objectTag$3 = "[object Object]";
var funcProto = Function.prototype, objectProto$4 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject$1(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) {
    return false;
  }
  var proto = getPrototype$1(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$3.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
function baseSlice(array, start, end) {
  var index = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
function castSlice(array, start, end) {
  var length = array.length;
  end = end === void 0 ? length : end;
  return !start && end >= length ? array : baseSlice(array, start, end);
}
var rsAstralRange$2 = "\\ud800-\\udfff", rsComboMarksRange$3 = "\\u0300-\\u036f", reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$3 = "\\u20d0-\\u20ff", rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3, rsVarRange$2 = "\\ufe0e\\ufe0f";
var rsZWJ$2 = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ$2 + rsAstralRange$2 + rsComboRange$3 + rsVarRange$2 + "]");
function hasUnicode(string) {
  return reHasUnicode.test(string);
}
function asciiToArray(string) {
  return string.split("");
}
var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$2 = "\\u0300-\\u036f", reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$2 = "\\u20d0-\\u20ff", rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2, rsVarRange$1 = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange$1 + "]", rsCombo$2 = "[" + rsComboRange$2 + "]", rsFitz$1 = "\\ud83c[\\udffb-\\udfff]", rsModifier$1 = "(?:" + rsCombo$2 + "|" + rsFitz$1 + ")", rsNonAstral$1 = "[^" + rsAstralRange$1 + "]", rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ$1 = "\\u200d";
var reOptMod$1 = rsModifier$1 + "?", rsOptVar$1 = "[" + rsVarRange$1 + "]?", rsOptJoin$1 = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsOptVar$1 + reOptMod$1 + ")*", rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1, rsSymbol = "(?:" + [rsNonAstral$1 + rsCombo$2 + "?", rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz$1 + "(?=" + rsFitz$1 + ")|" + rsSymbol + rsSeq$1, "g");
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}
function stringToArray(string) {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);
    var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
var upperFirst = createCaseFirst("toUpperCase");
const upperFirst$1 = upperFirst;
function capitalize$1(string) {
  return upperFirst$1(toString(string).toLowerCase());
}
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1, length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}
function basePropertyOf(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
var deburredLetters = {
  "\xC0": "A",
  "\xC1": "A",
  "\xC2": "A",
  "\xC3": "A",
  "\xC4": "A",
  "\xC5": "A",
  "\xE0": "a",
  "\xE1": "a",
  "\xE2": "a",
  "\xE3": "a",
  "\xE4": "a",
  "\xE5": "a",
  "\xC7": "C",
  "\xE7": "c",
  "\xD0": "D",
  "\xF0": "d",
  "\xC8": "E",
  "\xC9": "E",
  "\xCA": "E",
  "\xCB": "E",
  "\xE8": "e",
  "\xE9": "e",
  "\xEA": "e",
  "\xEB": "e",
  "\xCC": "I",
  "\xCD": "I",
  "\xCE": "I",
  "\xCF": "I",
  "\xEC": "i",
  "\xED": "i",
  "\xEE": "i",
  "\xEF": "i",
  "\xD1": "N",
  "\xF1": "n",
  "\xD2": "O",
  "\xD3": "O",
  "\xD4": "O",
  "\xD5": "O",
  "\xD6": "O",
  "\xD8": "O",
  "\xF2": "o",
  "\xF3": "o",
  "\xF4": "o",
  "\xF5": "o",
  "\xF6": "o",
  "\xF8": "o",
  "\xD9": "U",
  "\xDA": "U",
  "\xDB": "U",
  "\xDC": "U",
  "\xF9": "u",
  "\xFA": "u",
  "\xFB": "u",
  "\xFC": "u",
  "\xDD": "Y",
  "\xFD": "y",
  "\xFF": "y",
  "\xC6": "Ae",
  "\xE6": "ae",
  "\xDE": "Th",
  "\xFE": "th",
  "\xDF": "ss",
  "\u0100": "A",
  "\u0102": "A",
  "\u0104": "A",
  "\u0101": "a",
  "\u0103": "a",
  "\u0105": "a",
  "\u0106": "C",
  "\u0108": "C",
  "\u010A": "C",
  "\u010C": "C",
  "\u0107": "c",
  "\u0109": "c",
  "\u010B": "c",
  "\u010D": "c",
  "\u010E": "D",
  "\u0110": "D",
  "\u010F": "d",
  "\u0111": "d",
  "\u0112": "E",
  "\u0114": "E",
  "\u0116": "E",
  "\u0118": "E",
  "\u011A": "E",
  "\u0113": "e",
  "\u0115": "e",
  "\u0117": "e",
  "\u0119": "e",
  "\u011B": "e",
  "\u011C": "G",
  "\u011E": "G",
  "\u0120": "G",
  "\u0122": "G",
  "\u011D": "g",
  "\u011F": "g",
  "\u0121": "g",
  "\u0123": "g",
  "\u0124": "H",
  "\u0126": "H",
  "\u0125": "h",
  "\u0127": "h",
  "\u0128": "I",
  "\u012A": "I",
  "\u012C": "I",
  "\u012E": "I",
  "\u0130": "I",
  "\u0129": "i",
  "\u012B": "i",
  "\u012D": "i",
  "\u012F": "i",
  "\u0131": "i",
  "\u0134": "J",
  "\u0135": "j",
  "\u0136": "K",
  "\u0137": "k",
  "\u0138": "k",
  "\u0139": "L",
  "\u013B": "L",
  "\u013D": "L",
  "\u013F": "L",
  "\u0141": "L",
  "\u013A": "l",
  "\u013C": "l",
  "\u013E": "l",
  "\u0140": "l",
  "\u0142": "l",
  "\u0143": "N",
  "\u0145": "N",
  "\u0147": "N",
  "\u014A": "N",
  "\u0144": "n",
  "\u0146": "n",
  "\u0148": "n",
  "\u014B": "n",
  "\u014C": "O",
  "\u014E": "O",
  "\u0150": "O",
  "\u014D": "o",
  "\u014F": "o",
  "\u0151": "o",
  "\u0154": "R",
  "\u0156": "R",
  "\u0158": "R",
  "\u0155": "r",
  "\u0157": "r",
  "\u0159": "r",
  "\u015A": "S",
  "\u015C": "S",
  "\u015E": "S",
  "\u0160": "S",
  "\u015B": "s",
  "\u015D": "s",
  "\u015F": "s",
  "\u0161": "s",
  "\u0162": "T",
  "\u0164": "T",
  "\u0166": "T",
  "\u0163": "t",
  "\u0165": "t",
  "\u0167": "t",
  "\u0168": "U",
  "\u016A": "U",
  "\u016C": "U",
  "\u016E": "U",
  "\u0170": "U",
  "\u0172": "U",
  "\u0169": "u",
  "\u016B": "u",
  "\u016D": "u",
  "\u016F": "u",
  "\u0171": "u",
  "\u0173": "u",
  "\u0174": "W",
  "\u0175": "w",
  "\u0176": "Y",
  "\u0177": "y",
  "\u0178": "Y",
  "\u0179": "Z",
  "\u017B": "Z",
  "\u017D": "Z",
  "\u017A": "z",
  "\u017C": "z",
  "\u017E": "z",
  "\u0132": "IJ",
  "\u0133": "ij",
  "\u0152": "Oe",
  "\u0153": "oe",
  "\u0149": "'n",
  "\u017F": "s"
};
var deburrLetter = basePropertyOf(deburredLetters);
const deburrLetter$1 = deburrLetter;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
var rsCombo$1 = "[" + rsComboRange$1 + "]";
var reComboMark = RegExp(rsCombo$1, "g");
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter$1).replace(reComboMark, "");
}
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos$1 = "['\u2019]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
  rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
  rsUpper + "+" + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join("|"), "g");
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}
var rsApos = "['\u2019]";
var reApos = RegExp(rsApos, "g");
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
  };
}
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize$1(word) : word);
});
const camelCase$1 = camelCase;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer2, isDeep) {
  if (isDeep) {
    return buffer2.slice();
  }
  var length = buffer2.length, result = allocUnsafe ? allocUnsafe(length) : new buffer2.constructor(length);
  buffer2.copy(result);
  return result;
}
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$3 = Object.prototype;
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
const getSymbols$1 = getSymbols;
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
const getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}
var DataView = getNative(root$1, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set$1 = getNative(root$1, "Set");
const Set$2 = Set$1;
var mapTag$4 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$4 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$3 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$1$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$3 || Map$2 && getTag(new Map$2()) != mapTag$4 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$4 || WeakMap$1$1 && getTag(new WeakMap$1$1()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$3;
        case mapCtorString:
          return mapTag$4;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$4;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var objectProto$2 = Object.prototype;
var hasOwnProperty$2$1 = objectProto$2.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty$2$1.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array = root$1.Uint8Array;
const Uint8Array$1 = Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer2 = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer2, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer2 = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer2, typedArray.byteOffset, typedArray.length);
}
var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$3 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$3 = "[object String]", symbolTag$2 = "[object Symbol]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$2:
      return cloneArrayBuffer(object);
    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object);
    case dataViewTag$2:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$3:
      return new Ctor();
    case numberTag$2:
    case stringTag$3:
      return new Ctor(object);
    case regexpTag$2:
      return cloneRegExp(object);
    case setTag$3:
      return new Ctor();
    case symbolTag$2:
      return cloneSymbol(object);
  }
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
var mapTag$2 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$2;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap$1 = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
const isMap$1$1 = isMap$1;
var setTag$2 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$2;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
const isSet$1$1 = isSet$1;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$1 = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$1 = "[object Set]", stringTag$2 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$2] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack2) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack2) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject$1(value)) {
    return value;
  }
  var isArr = isArray$1$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$1 || tag == argsTag$1 || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack2 || (stack2 = new Stack());
  var stacked = stack2.get(value);
  if (stacked) {
    return stacked;
  }
  stack2.set(value, result);
  if (isSet$1$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack2));
    });
  } else if (isMap$1$1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack2));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack2));
  });
  return result;
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
function setCacheHas(value) {
  return this.__data__.has(value);
}
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
function cacheHas(cache, key) {
  return cache.has(key);
}
var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack2) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack2.get(array);
  var othStacked = stack2.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen2 = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
  stack2.set(array, other);
  stack2.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack2) : customizer(arrValue, othValue, index, array, other, stack2);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen2) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen2, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack2))) {
          return seen2.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack2))) {
      result = false;
      break;
    }
  }
  stack2["delete"](array);
  stack2["delete"](other);
  return result;
}
function mapToArray(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
function setToArray(set2) {
  var index = -1, result = Array(set2.size);
  set2.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag$4 = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag$1 = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack2) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag$4:
      return eq(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag$1:
      return object == other + "";
    case mapTag:
      var convert = mapToArray;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
      convert || (convert = setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack2.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;
      stack2.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack2);
      stack2["delete"](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var COMPARE_PARTIAL_FLAG$1 = 1;
var objectProto$1$1 = Object.prototype;
var hasOwnProperty$1$1 = objectProto$1$1.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack2) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1$1.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack2.get(object);
  var othStacked = stack2.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack2.set(object, other);
  stack2.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack2) : customizer(objValue, othValue, key, object, other, stack2);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack2) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack2["delete"](object);
  stack2["delete"](other);
  return result;
}
var COMPARE_PARTIAL_FLAG = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var objectProto$g = Object.prototype;
var hasOwnProperty$d = objectProto$g.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack2) {
  var objIsArr = isArray$1$1(object), othIsArr = isArray$1$1(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer$1(object)) {
    if (!isBuffer$1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack2 || (stack2 = new Stack());
    return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack2) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack2);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty$d.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$d.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack2 || (stack2 = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack2);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack2 || (stack2 = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack2);
}
function baseIsEqual(value, other, bitmask, customizer, stack2) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack2);
}
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var baseFor = createBaseFor();
const baseFor$1 = baseFor;
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack2) {
  var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack2.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack2) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray$1$1(srcValue), isBuff = !isArr && isBuffer$1(srcValue), isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$1$1(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject$1(srcValue) || isArguments$1(srcValue)) {
      newValue = objValue;
      if (isArguments$1(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject$1(objValue) || isFunction$1(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack2.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack2);
    stack2["delete"](srcValue);
  }
  assignMergeValue(object, key, newValue);
}
function baseMerge(object, source, srcIndex, customizer, stack2) {
  if (object === source) {
    return;
  }
  baseFor$1(source, function(srcValue, key) {
    stack2 || (stack2 = new Stack());
    if (isObject$1(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack2);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack2) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
var stringTag = "[object String]";
function isString$1(value) {
  return typeof value == "string" || !isArray$1$1(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
}
function isEqual(value, other) {
  return baseIsEqual(value, other);
}
function isNil(value) {
  return value == null;
}
var kebabCase = createCompounder(function(result, word, index) {
  return result + (index ? "-" : "") + word.toLowerCase();
});
const kebabCase$1 = kebabCase;
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
const merge$1 = merge;
function callEmit(funcs, ...args) {
  if (!funcs) {
    return;
  }
  if (Array.isArray(funcs)) {
    funcs.forEach((fn) => fn(...args));
  } else {
    return funcs(...args);
  }
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function createSharedComposable(composable) {
  let subscribers = 0;
  let state;
  let scope;
  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop();
      state = scope = void 0;
    }
  };
  return (...args) => {
    subscribers++;
    if (!state) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose(dispose);
    return state;
  };
}
function useState(defaultOrFactory, shallow = true) {
  const defaultValue = isFunction$1(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory;
  const state = shallow ? shallowRef(defaultValue) : ref$1(defaultValue);
  const setState = (value) => {
    if (value !== toRaw$1(state.value)) {
      state.value = value;
    }
  };
  return [computed$2(() => state.value), setState];
}
function useControlledProp(props, key, defaultOrFactory) {
  const tempProp = shallowRef(props[key]);
  watch$1(
    () => props[key],
    (value) => tempProp.value = value
  );
  const state = computed$2(
    () => {
      var _a2, _b;
      return (_b = (_a2 = props[key]) != null ? _a2 : tempProp.value) != null ? _b : isFunction$1(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory;
    }
  );
  const setState = (value, ...args) => {
    if (value !== toRaw$1(state.value)) {
      tempProp.value = value;
      callEmit(props[`onUpdate:${key}`], value, ...args);
    }
  };
  return [state, setState];
}
function isNumeric(val) {
  return !isNaN(parseFloat(val)) && isFinite(val);
}
const isHTMLElement$1 = (val) => toRawType$1(val).startsWith("HTML");
function convertArray(value) {
  if (isNil(value)) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}
function convertNumber(value, fallback = 0) {
  return isNumeric(value) ? Number(value) : fallback;
}
function convertCssPixel(value) {
  if (isNil(value)) {
    return "";
  }
  return typeof value === "string" ? value : `${value}px`;
}
function convertElement(elementOrInstance) {
  var _a2;
  const element = unref$1(elementOrInstance);
  return isHTMLElement$1(element) ? element : (_a2 = element == null ? void 0 : element.$el) != null ? _a2 : element;
}
function on(el, type, listener, options) {
  if (el && type && listener) {
    el.addEventListener(type, listener, options);
  }
}
function off(el, type, listener, options) {
  if (el && type && listener) {
    el.removeEventListener(type, listener, options);
  }
}
function addClass(el, className) {
  const cls = isString$1(className) ? [className] : className;
  el.classList.add(...cls);
}
function removeClass(el, className) {
  const cls = isString$1(className) ? [className] : className;
  el.classList.remove(...cls);
}
const rAF = requestAnimationFrame || ((cb) => setTimeout(cb, 1e3 / 60));
function throttleRAF(fn) {
  let id = null;
  const frameCb = (...args) => {
    id = null;
    fn(...args);
  };
  const requestCb = (...args) => {
    if (id === null) {
      id = rAF(() => frameCb(...args));
    }
  };
  requestCb.cancel = () => {
    if (id !== null) {
      (cancelAnimationFrame || clearTimeout)(id);
    }
  };
  return requestCb;
}
const easeInOutCubic = (elapsed, initialValue, amountOfChange, duration) => {
  if (duration <= 0) {
    return amountOfChange + initialValue;
  }
  if ((elapsed /= duration / 2) < 1) {
    return amountOfChange / 2 * elapsed * elapsed * elapsed + initialValue;
  }
  return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue;
};
const logWrapper = (location2, args, log) => {
  log(`[@idux/${location2}]:`, ...args);
};
const info = (location2, ...args) => logWrapper(location2, args, console.log);
const warn$3 = (location2, ...args) => logWrapper(location2, args, console.warn);
const error = (location2, ...args) => logWrapper(location2, args, console.error);
const Logger = { info, warn: warn$3, error };
const throwError = (location2, message) => {
  throw new Error(`[@idux/${location2}]: ${message}`);
};
const NoopFunction = () => {
};
const NoopObject = Object.freeze({});
const NoopArray = Object.freeze([]);
const getOffset = (el, target = window) => {
  if (!el || !el.getClientRects().length) {
    return { top: 0, left: 0 };
  }
  let { top, left } = el.getBoundingClientRect();
  if (target === window) {
    const doc2 = el.ownerDocument.documentElement;
    top = top - doc2.clientTop;
    left = left - doc2.clientLeft;
  } else {
    const targetRect = target.getBoundingClientRect();
    top = top - targetRect.top;
    left = left - targetRect.left;
  }
  return { top, left };
};
let nodeId = 0;
function uniqueId(prefix = "ix") {
  return `${prefix}-${nodeId++}`;
}
function useEventListener(target, type, listener, options) {
  const stopWatch = watch$1(
    () => convertElement(target),
    (currElement, prevElement) => {
      off(prevElement, type, listener, options);
      on(currElement, type, listener, options);
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    off(convertElement(target), type, listener, options);
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return stop;
}
const TEMPLATE = "template";
const isComment = (node) => node.type === Comment$1;
const isFragment = (node) => node.type === Fragment$1;
const isTemplate = (node) => node.type === TEMPLATE;
const isText = (node) => node.type === Text$1;
function getValidNode(node, depth) {
  if (isComment(node)) {
    return;
  }
  if (isFragment(node) || isTemplate(node)) {
    return depth > 0 ? getFirstValidNode(node.children, depth - 1) : void 0;
  }
  return node;
}
function getFirstValidNode(nodes, maxDepth = 3) {
  return convertArray(nodes).find((node) => getValidNode(node, maxDepth));
}
function isEmptyNode(nodes) {
  return convertArray(nodes).every(
    (node) => !node || isComment(node) || isFragment(node) && node.children.length === 0 || isText(node) && node.children.trim() === ""
  );
}
function flattenNode(nodes, filterOptions = {}) {
  const result = [];
  convertArray(nodes).forEach((node) => {
    if (Array.isArray(node)) {
      result.push(...flattenNode(node, filterOptions));
    } else if (isFragment(node)) {
      result.push(...flattenNode(node.children, filterOptions));
    } else {
      const { empty = true, key } = filterOptions;
      if (empty && isEmptyNode(node)) {
        return;
      }
      const keys2 = convertArray(key);
      if (keys2.length && isVNode$1(node) && !keys2.some((key2) => node.type[key2])) {
        return;
      }
      result.push(node);
    }
  });
  return result;
}
let hasV8BreakIterator;
try {
  hasV8BreakIterator = typeof Intl !== "undefined" && Intl.v8BreakIterator;
} catch {
  hasV8BreakIterator = false;
}
const testUserAgent = (regexp) => {
  return regexp.test(navigator.userAgent);
};
const isBrowser$1 = typeof document === "object" && !!document;
const isEdge = isBrowser$1 && testUserAgent(/(edge)/i);
const isTrident = isBrowser$1 && testUserAgent(/(msie|trident)/i);
const isBlink = isBrowser$1 && !!(window.chrome || hasV8BreakIterator) && typeof CSS !== "undefined" && !isEdge && !isTrident;
const isWebKit = isBrowser$1 && testUserAgent(/AppleWebKit/i) && !isBlink && !isEdge && !isTrident;
isBrowser$1 && testUserAgent(/(firefox|minefield)/i);
isBrowser$1 && testUserAgent(/safari/i) && isWebKit;
isBrowser$1 && testUserAgent(/iPad|iPhone|iPod/) && !("MSStream" in window);
isBrowser$1 && testUserAgent(/android/i) && !isTrident;
let flexGapSupported$1;
function supportsFlexGap() {
  if (!isBrowser$1) {
    return false;
  }
  if (flexGapSupported$1 !== void 0) {
    return flexGapSupported$1;
  }
  const flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";
  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));
  document.body.appendChild(flex);
  flexGapSupported$1 = flex.scrollHeight === 1;
  document.body.removeChild(flex);
  return flexGapSupported$1;
}
let supportsPassiveEvents;
function supportsPassiveEventListeners() {
  if (supportsPassiveEvents == null && typeof window !== "undefined") {
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: () => supportsPassiveEvents = true
        })
      );
    } finally {
      supportsPassiveEvents = supportsPassiveEvents || false;
    }
  }
  return supportsPassiveEvents;
}
function normalizePassiveListenerOptions(options) {
  return supportsPassiveEventListeners() ? options : !!options.capture;
}
let shadowDomIsSupported;
function _supportsShadowDom() {
  if (shadowDomIsSupported == null) {
    const head = typeof document !== "undefined" ? document.head : null;
    shadowDomIsSupported = !!(head && (head.createShadowRoot || head.attachShadow));
  }
  return shadowDomIsSupported;
}
function _getShadowRoot(element) {
  if (_supportsShadowDom()) {
    const rootNode = element.getRootNode ? element.getRootNode() : null;
    if (typeof ShadowRoot !== "undefined" && ShadowRoot && rootNode instanceof ShadowRoot) {
      return rootNode;
    }
  }
  return null;
}
function _getEventTarget(event) {
  return event.composedPath ? event.composedPath()[0] : event.target;
}
function toInteger$1(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger$1((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function isSameUTCWeek(dirtyDateLeft, dirtyDateRight, options) {
  requiredArgs(2, arguments);
  var dateLeftStartOfWeek = startOfUTCWeek(dirtyDateLeft, options);
  var dateRightStartOfWeek = startOfUTCWeek(dirtyDateRight, options);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "\u4E0D\u5230 1 \u79D2",
    other: "\u4E0D\u5230 {{count}} \u79D2"
  },
  xSeconds: {
    one: "1 \u79D2",
    other: "{{count}} \u79D2"
  },
  halfAMinute: "\u534A\u5206\u949F",
  lessThanXMinutes: {
    one: "\u4E0D\u5230 1 \u5206\u949F",
    other: "\u4E0D\u5230 {{count}} \u5206\u949F"
  },
  xMinutes: {
    one: "1 \u5206\u949F",
    other: "{{count}} \u5206\u949F"
  },
  xHours: {
    one: "1 \u5C0F\u65F6",
    other: "{{count}} \u5C0F\u65F6"
  },
  aboutXHours: {
    one: "\u5927\u7EA6 1 \u5C0F\u65F6",
    other: "\u5927\u7EA6 {{count}} \u5C0F\u65F6"
  },
  xDays: {
    one: "1 \u5929",
    other: "{{count}} \u5929"
  },
  aboutXWeeks: {
    one: "\u5927\u7EA6 1 \u4E2A\u661F\u671F",
    other: "\u5927\u7EA6 {{count}} \u4E2A\u661F\u671F"
  },
  xWeeks: {
    one: "1 \u4E2A\u661F\u671F",
    other: "{{count}} \u4E2A\u661F\u671F"
  },
  aboutXMonths: {
    one: "\u5927\u7EA6 1 \u4E2A\u6708",
    other: "\u5927\u7EA6 {{count}} \u4E2A\u6708"
  },
  xMonths: {
    one: "1 \u4E2A\u6708",
    other: "{{count}} \u4E2A\u6708"
  },
  aboutXYears: {
    one: "\u5927\u7EA6 1 \u5E74",
    other: "\u5927\u7EA6 {{count}} \u5E74"
  },
  xYears: {
    one: "1 \u5E74",
    other: "{{count}} \u5E74"
  },
  overXYears: {
    one: "\u8D85\u8FC7 1 \u5E74",
    other: "\u8D85\u8FC7 {{count}} \u5E74"
  },
  almostXYears: {
    one: "\u5C06\u8FD1 1 \u5E74",
    other: "\u5C06\u8FD1 {{count}} \u5E74"
  }
};
var formatDistance = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "\u5185";
    } else {
      return result + "\u524D";
    }
  }
  return result;
};
const formatDistance$1 = formatDistance;
var dateFormats = {
  full: "y'\u5E74'M'\u6708'd'\u65E5' EEEE",
  long: "y'\u5E74'M'\u6708'd'\u65E5'",
  medium: "yyyy-MM-dd",
  short: "yy-MM-dd"
};
var timeFormats = {
  full: "zzzz a h:mm:ss",
  long: "z a h:mm:ss",
  medium: "a h:mm:ss",
  short: "a h:mm"
};
var dateTimeFormats = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
const formatLong$1 = formatLong;
function checkWeek(date, baseDate, options) {
  var baseFormat = "eeee p";
  if (isSameUTCWeek(date, baseDate, options)) {
    return baseFormat;
  } else if (date.getTime() > baseDate.getTime()) {
    return "'\u4E0B\u4E2A'" + baseFormat;
  }
  return "'\u4E0A\u4E2A'" + baseFormat;
}
var formatRelativeLocale = {
  lastWeek: checkWeek,
  yesterday: "'\u6628\u5929' p",
  today: "'\u4ECA\u5929' p",
  tomorrow: "'\u660E\u5929' p",
  nextWeek: checkWeek,
  other: "PP p"
};
var formatRelative = function formatRelative2(token, date, baseDate, options) {
  var format = formatRelativeLocale[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
const formatRelative$1 = formatRelative;
var eraValues = {
  narrow: ["\u524D", "\u516C\u5143"],
  abbreviated: ["\u524D", "\u516C\u5143"],
  wide: ["\u516C\u5143\u524D", "\u516C\u5143"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["\u7B2C\u4E00\u5B63", "\u7B2C\u4E8C\u5B63", "\u7B2C\u4E09\u5B63", "\u7B2C\u56DB\u5B63"],
  wide: ["\u7B2C\u4E00\u5B63\u5EA6", "\u7B2C\u4E8C\u5B63\u5EA6", "\u7B2C\u4E09\u5B63\u5EA6", "\u7B2C\u56DB\u5B63\u5EA6"]
};
var monthValues = {
  narrow: ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u5341\u4E00", "\u5341\u4E8C"],
  abbreviated: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
  wide: ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"]
};
var dayValues = {
  narrow: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
  short: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
  abbreviated: ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"],
  wide: ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"]
};
var dayPeriodValues = {
  narrow: {
    am: "\u4E0A",
    pm: "\u4E0B",
    midnight: "\u51CC\u6668",
    noon: "\u5348",
    morning: "\u65E9",
    afternoon: "\u4E0B\u5348",
    evening: "\u665A",
    night: "\u591C"
  },
  abbreviated: {
    am: "\u4E0A\u5348",
    pm: "\u4E0B\u5348",
    midnight: "\u51CC\u6668",
    noon: "\u4E2D\u5348",
    morning: "\u65E9\u6668",
    afternoon: "\u4E2D\u5348",
    evening: "\u665A\u4E0A",
    night: "\u591C\u95F4"
  },
  wide: {
    am: "\u4E0A\u5348",
    pm: "\u4E0B\u5348",
    midnight: "\u51CC\u6668",
    noon: "\u4E2D\u5348",
    morning: "\u65E9\u6668",
    afternoon: "\u4E2D\u5348",
    evening: "\u665A\u4E0A",
    night: "\u591C\u95F4"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "\u4E0A",
    pm: "\u4E0B",
    midnight: "\u51CC\u6668",
    noon: "\u5348",
    morning: "\u65E9",
    afternoon: "\u4E0B\u5348",
    evening: "\u665A",
    night: "\u591C"
  },
  abbreviated: {
    am: "\u4E0A\u5348",
    pm: "\u4E0B\u5348",
    midnight: "\u51CC\u6668",
    noon: "\u4E2D\u5348",
    morning: "\u65E9\u6668",
    afternoon: "\u4E2D\u5348",
    evening: "\u665A\u4E0A",
    night: "\u591C\u95F4"
  },
  wide: {
    am: "\u4E0A\u5348",
    pm: "\u4E0B\u5348",
    midnight: "\u51CC\u6668",
    noon: "\u4E2D\u5348",
    morning: "\u65E9\u6668",
    afternoon: "\u4E2D\u5348",
    evening: "\u665A\u4E0A",
    night: "\u591C\u95F4"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  switch (options === null || options === void 0 ? void 0 : options.unit) {
    case "date":
      return number.toString() + "\u65E5";
    case "hour":
      return number.toString() + "\u65F6";
    case "minute":
      return number.toString() + "\u5206";
    case "second":
      return number.toString() + "\u79D2";
    default:
      return "\u7B2C " + number.toString();
  }
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
const localize$1 = localize;
var matchOrdinalNumberPattern = /^(第\s*)?\d+(日|时|分|秒)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(前)/i,
  abbreviated: /^(前)/i,
  wide: /^(公元前|公元)/i
};
var parseEraPatterns = {
  any: [/^(前)/i, /^(公元)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^第[一二三四]刻/i,
  wide: /^第[一二三四]刻钟/i
};
var parseQuarterPatterns = {
  any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
var matchMonthPatterns = {
  narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
  abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
  wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
};
var parseMonthPatterns = {
  narrow: [/^一/i, /^二/i, /^三/i, /^四/i, /^五/i, /^六/i, /^七/i, /^八/i, /^九/i, /^十(?!(一|二))/i, /^十一/i, /^十二/i],
  any: [/^一|1/i, /^二|2/i, /^三|3/i, /^四|4/i, /^五|5/i, /^六|6/i, /^七|7/i, /^八|8/i, /^九|9/i, /^十(?!(一|二))|10/i, /^十一|11/i, /^十二|12/i]
};
var matchDayPatterns = {
  narrow: /^[一二三四五六日]/i,
  short: /^[一二三四五六日]/i,
  abbreviated: /^周[一二三四五六日]/i,
  wide: /^星期[一二三四五六日]/i
};
var parseDayPatterns = {
  any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
var matchDayPeriodPatterns = {
  any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨|)/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^上午?/i,
    pm: /^下午?/i,
    midnight: /^午夜/i,
    noon: /^[中正]午/i,
    morning: /^早上/i,
    afternoon: /^下午/i,
    evening: /^晚上?/i,
    night: /^凌晨/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
const match$1 = match;
var locale = {
  code: "zh-CN",
  formatDistance: formatDistance$1,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const zhCN$1 = locale;
const zhCN$2 = {
  type: "zh-CN",
  date: zhCN$1,
  datePicker: {
    today: "\u4ECA\u5929",
    ok: "\u786E\u5B9A",
    clear: "\u6E05\u9664",
    month: "\u6708",
    year: "\u5E74",
    monthSelect: "\u9009\u62E9\u6708\u4EFD",
    yearSelect: "\u9009\u62E9\u5E74\u4EFD",
    monthFormat: "MMM",
    yearFormat: "yyyy\u5E74",
    previousMonth: "\u4E0A\u4E2A\u6708",
    nextMonth: "\u4E0B\u4E2A\u6708",
    previousYear: "\u4E0A\u4E00\u5E74",
    nextYear: "\u4E0B\u4E00\u5E74",
    previousDecade: "\u4E0A\u4E00\u5E74\u4EE3",
    nextDecade: "\u4E0B\u4E00\u5E74\u4EE3",
    datePlaceholder: "\u8BF7\u9009\u62E9\u65E5\u671F",
    yearPlaceholder: "\u8BF7\u9009\u62E9\u5E74\u4EFD",
    quarterPlaceholder: "\u8BF7\u9009\u62E9\u5B63\u5EA6",
    monthPlaceholder: "\u8BF7\u9009\u62E9\u6708\u4EFD",
    weekPlaceholder: "\u8BF7\u9009\u62E9\u5468",
    datetimePlaceholder: "\u8BF7\u9009\u62E9\u65E5\u671F\u65F6\u95F4"
  },
  dateRangePicker: {
    datePlaceholder: ["\u5F00\u59CB\u65E5\u671F", "\u7ED3\u675F\u65E5\u671F"],
    weekPlaceholder: ["\u5F00\u59CB\u5468", "\u7ED3\u675F\u5468"],
    monthPlaceholder: ["\u5F00\u59CB\u6708\u4EFD", "\u7ED3\u675F\u6708\u4EFD"],
    quarterPlaceholder: ["\u5F00\u59CB\u5B63\u5EA6", "\u7ED3\u675F\u5B63\u5EA6"],
    yearPlaceholder: ["\u5F00\u59CB\u5E74\u4EFD", "\u7ED3\u675F\u5E74\u4EFD"],
    datetimePlaceholder: ["\u5F00\u59CB\u65F6\u95F4", "\u7ED3\u675F\u65F6\u95F4"],
    separator: "\u81F3",
    okText: "\u786E\u5B9A",
    cancelText: "\u53D6\u6D88"
  },
  empty: {
    description: "\u6682\u65E0\u6570\u636E"
  },
  modal: {
    cancelText: "\u53D6\u6D88",
    okText: "\u786E\u5B9A",
    justOkText: "\u6211\u77E5\u9053\u4E86"
  },
  popconfirm: {
    cancelText: "\u53D6\u6D88",
    okText: "\u786E\u5B9A"
  },
  pagination: {
    itemsPerPage: "\u6BCF\u9875",
    itemsSuffix: "\u9879",
    jumpTo: "\u524D\u5F80",
    page: "\u9875",
    prev: "\u4E0A\u4E00\u9875",
    next: "\u4E0B\u4E00\u9875",
    prev5: "\u5411\u524D 5 \u9875",
    next5: "\u5411\u540E 5 \u9875",
    totalPrefix: "\u5171",
    totalSuffix: "\u9879"
  },
  select: {
    limitMessage: "\u8BE5\u9009\u62E9\u5668\u7684\u503C\u4E0D\u80FD\u8D85\u8FC7 ${0} \u9879"
  },
  table: {
    expand: "\u5C55\u5F00\u884C",
    collapse: "\u6536\u8D77\u884C",
    filterTitle: "\u7B5B\u9009",
    filterConfirm: "\u786E\u5B9A",
    filterReset: "\u91CD\u7F6E",
    filterEmptyText: "\u65E0\u7B5B\u9009\u9879",
    selectAll: "\u5168\u9009\u6240\u6709",
    selectInvert: "\u53CD\u9009\u6240\u6709",
    selectNone: "\u6E05\u7A7A\u6240\u6709",
    selectPageAll: "\u5168\u9009\u5F53\u9875",
    selectPageInvert: "\u53CD\u9009\u5F53\u9875",
    sortDesc: "\u70B9\u51FB\u964D\u5E8F",
    sortAsc: "\u70B9\u51FB\u5347\u5E8F",
    sortCancel: "\u53D6\u6D88\u6392\u5E8F"
  },
  timePicker: {
    okText: "\u786E\u5B9A",
    placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4"
  },
  timeRangePicker: {
    okText: "\u786E\u5B9A",
    separator: "\u81F3",
    placeholder: ["\u8D77\u59CB\u65F6\u95F4", "\u7ED3\u675F\u65F6\u95F4"]
  },
  transfer: {
    toSelect: "\u5F85\u9009",
    selected: "\u5DF2\u9009",
    searchPlaceholder: ["\u641C\u7D22\u5173\u952E\u5B57", "\u641C\u7D22\u5173\u952E\u5B57"]
  },
  treeSelect: {
    expandAll: "\u5C55\u5F00\u5168\u90E8",
    collapseAll: "\u6536\u8D77\u5168\u90E8"
  },
  upload: {
    uploading: "\u6B63\u5728\u4E0A\u4F20...",
    error: "\u4E0A\u4F20\u5931\u8D25",
    cancel: "\u53D6\u6D88\u4E0A\u4F20",
    preview: "\u9884\u89C8\u6587\u4EF6",
    remove: "\u5220\u9664\u6587\u4EF6",
    retry: "\u91CD\u65B0\u4E0A\u4F20",
    download: "\u4E0B\u8F7D\u6587\u4EF6"
  }
};
const iconProps = {
  name: String,
  iconfont: {
    type: Boolean,
    default: false
  },
  rotate: {
    type: [Boolean, Number, String],
    default: void 0
  },
  color: String,
  size: [String, Number]
};
const iconDefinitions = /* @__PURE__ */ new Map();
const iconCache = /* @__PURE__ */ new Map();
function clearSVGElement(el) {
  var _a2;
  const children = el.childNodes;
  const length = children.length;
  for (let i = length - 1; i >= 0; i--) {
    const child = children[i];
    if (((_a2 = child.tagName) == null ? void 0 : _a2.toLowerCase()) === "svg") {
      child.remove();
    }
  }
}
async function loadSVGElement(iconName, loadIconDynamically) {
  const cached = iconCache.get(iconName);
  if (cached) {
    const svg2 = await cached;
    if (svg2) {
      return svg2.cloneNode(true);
    } else {
      iconCache.delete(iconName);
      return null;
    }
  }
  const svg = createSVGElement(iconName, loadIconDynamically);
  iconCache.set(iconName, svg);
  return svg;
}
async function loadSvgElementFormScript(iconName) {
  let svg = null;
  const cachedName = `IDUX_CACHED_ICON_FONT_` + iconName;
  const cached = iconCache.get(cachedName);
  if (cached) {
    svg = await cached;
  }
  if (!svg) {
    svg = convertSVGElement(`<svg><use xlink:href="#${iconName}"></svg>`);
    setSVGAttribute(svg, iconName);
    iconCache.set(cachedName, svg);
  }
  return svg.cloneNode(true);
}
async function createSVGElement(iconName, loadIconDynamically) {
  let svg = null;
  const icon = await loadIconDefinition(iconName, loadIconDynamically);
  if (icon) {
    svg = convertSVGElement(icon.svg);
    if (svg) {
      setSVGAttribute(svg, iconName);
      iconCache.set(iconName, svg);
    } else {
      Logger.warn("components/icon", `The icon [${iconName}] create failed.`);
    }
  }
  return svg;
}
async function loadIconDefinition(iconName, loadIconDynamically) {
  let icon = iconDefinitions.get(iconName);
  if (!icon) {
    if (loadIconDynamically) {
      const svg = await loadIconDynamically(iconName);
      if (validSVGString(svg)) {
        icon = { name: iconName, svg };
        iconDefinitions.set(iconName, icon);
      } else {
        Logger.warn("components/icon", `The dynamically loaded icon [${iconName}] is invalid.`);
        return;
      }
    } else {
      Logger.warn("components/icon", `The icon [${iconName}] load failed.`);
    }
  }
  return icon;
}
function validSVGString(svg) {
  return !!svg && svg.includes("<svg");
}
function convertSVGElement(svg) {
  const div = document.createElement("div");
  div.innerHTML = svg;
  return div.querySelector("svg");
}
const defaultSVGAttributes = {
  viewBox: "0 0 1024 1024",
  focusable: "false",
  "aria-hidden": "true"
};
function setSVGAttribute(svg, iconName) {
  Object.entries(defaultSVGAttributes).forEach(([key, value]) => {
    if (!svg.hasAttribute(key)) {
      svg.setAttribute(key, value);
    }
  });
  svg.setAttribute("data-icon", iconName);
}
function convertSVGNode(child) {
  const node = getFirstValidNode(child);
  if (!node || node.type !== "svg") {
    Logger.warn("components/icon", "The children must is svg element");
    return;
  }
  return cloneVNode$1(node, { ...defaultSVGAttributes, ...node.props });
}
var Icon = /* @__PURE__ */ defineComponent$1({
  name: "IxIcon",
  props: iconProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-icon`);
    const config = useGlobalConfig$1("icon");
    const root2 = ref$1();
    onMounted$1(() => appendChild(props, config, root2.value));
    watch$1([() => props.name, () => props.iconfont], () => {
      const rootElement = root2.value;
      if (!rootElement) {
        return;
      }
      clearSVGElement(rootElement);
      appendChild(props, config, rootElement);
    });
    const classes = computed$2(() => {
      const {
        name,
        rotate
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-${name}`]: !!name,
        [`${prefixCls}-spinning`]: rotate === true
      });
    });
    const style = computed$2(() => {
      const {
        rotate,
        color,
        size: size2
      } = props;
      return {
        color,
        fontSize: convertCssPixel(size2),
        transform: isNumeric(rotate) ? `rotate(${rotate}deg)` : void 0
      };
    });
    return () => {
      var _a2;
      const {
        name
      } = props;
      if (name) {
        return createVNode$1("i", {
          "ref": root2,
          "class": classes.value,
          "style": style.value,
          "role": "img",
          "aria-label": name
        }, null);
      } else {
        return createVNode$1("i", {
          "ref": root2,
          "class": classes.value,
          "style": style.value,
          "role": "img"
        }, [convertSVGNode((_a2 = slots.default) == null ? void 0 : _a2.call(slots))]);
      }
    };
  }
});
async function appendChild(props, config, rootElement) {
  const {
    name,
    iconfont
  } = props;
  if (name) {
    const svgElement = iconfont ? await loadSvgElementFormScript(name) : await loadSVGElement(name, config.loadIconDynamically);
    if (svgElement && name === props.name) {
      rootElement.appendChild(svgElement);
    }
  }
}
const addIconDefinitions = (icons) => {
  icons.forEach((icon) => iconDefinitions.set(icon.name, icon));
};
const Bulb = {
  name: "bulb",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64a320 320 0 0 1 192.064 576L704 691.2a12.8 12.8 0 0 1-12.8 12.8H332.8a12.8 12.8 0 0 1-12.8-12.8V640A320 320 0 0 1 512 64zm0 64a256 256 0 0 0-165.248 451.52l11.648 9.28L384 608l-.064 31.936h256.128v-32l25.6-19.2A256 256 0 0 0 512 128zM396.8 896h230.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H396.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8z"/><path d="M691.2 640c7.04 0 12.8 5.76 12.8 12.8v166.4a12.8 12.8 0 0 1-12.8 12.8H332.8a12.8 12.8 0 0 1-12.8-12.8V652.8c0-7.04 5.76-12.8 12.8-12.8h358.4zM640 704H384v64h256v-64zM458.752 211.648l13.184 37.568a11.392 11.392 0 0 1-6.208 14.208 160.64 160.64 0 0 0-85.12 86.272 11.776 11.776 0 0 1-14.72 7.04l-38.976-12.8A11.264 11.264 0 0 1 320 329.024 224.64 224.64 0 0 1 441.6 204.16l.576-.192a12.8 12.8 0 0 1 16.64 7.68z"/></svg>'
};
const CaretDownFilled = {
  name: "caret-down-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"/></svg>'
};
const CaretUpFilled = {
  name: "caret-up-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M858.9 689 530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"/></svg>'
};
const CheckCircleFilled = {
  name: "check-circle-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 0c282.752 0 512 229.248 512 512s-229.248 512-512 512S0 794.752 0 512 229.248 0 512 0zm238.336 366.933a17.067 17.067 0 0 0-24.15 0L466.689 626.432l-138.71-138.795a17.067 17.067 0 0 0-24.149 0l-36.224 36.224a17.067 17.067 0 0 0 0 24.15l187.051 187.05a17.067 17.067 0 0 0 24.15 0L786.56 427.307a17.067 17.067 0 0 0 0-24.15z"/></svg>'
};
const CheckCircle = {
  name: "check-circle",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path fill-rule="evenodd" d="M512 64c247.445 0 448 200.555 448 448S759.445 960 512 960 64 759.445 64 512 264.555 64 512 64Zm0 64c-212.045 0-384 171.955-384 384s171.955 384 384 384 384-171.955 384-384-171.955-384-384-384Zm220.149 223.365 27.152 27.153c5 4.998 5 13.103 0 18.102L460.384 695.537c-4.999 4.999-13.103 4.999-18.102 0L279.365 532.62c-4.999-5-4.999-13.104 0-18.102l27.153-27.153c3.999-4 9.985-4.8 14.78-2.4l3.321 2.4 117.662 117.662c4.998 4.998 13.103 4.998 18.102 0l253.664-253.662c4.998-4.999 13.103-4.999 18.102 0Z"/></svg>'
};
const Check = {
  name: "check",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M158.912 440.768a12.8 12.8 0 0 1 18.112 0l262.4 262.464 443.52-443.52a12.8 12.8 0 0 1 18.112 0l27.2 27.2a12.8 12.8 0 0 1 0 18.112L448.512 784.64a12.8 12.8 0 0 1-18.112 0L131.84 486.016a12.8 12.8 0 0 1 0-18.112l27.136-27.136z"/></svg>'
};
const Clear = {
  name: "clear",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M243.2 320c7.04 0 12.8 5.76 12.8 12.8V896h512V332.8c0-7.04 5.76-12.8 12.8-12.8h38.4c7.04 0 12.8 5.76 12.8 12.8v614.08a12.8 12.8 0 0 1-12.8 12.8H204.8a12.8 12.8 0 0 1-12.8-12.8V332.8c0-7.04 5.76-12.8 12.8-12.8h38.4zm512-256c7.04 0 12.8 5.76 12.8 12.8V192h179.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H76.8A12.8 12.8 0 0 1 64 243.2v-38.4c0-7.04 5.76-12.8 12.8-12.8H256V76.8c0-7.04 5.76-12.8 12.8-12.8h486.4zm-50.752 64h-383.68l-.128 64h383.68v-64z"/></svg>'
};
const ClockCircle = {
  name: "clock-circle",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768z"/><path d="M512 268.8v291.456c0 7.04 5.76 12.8 12.8 12.8h166.4c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H460.8a12.8 12.8 0 0 1-12.8-12.8V268.8c0-7.04 5.76-12.8 12.8-12.8h38.4c7.04 0 12.8 5.76 12.8 12.8z"/></svg>'
};
const CloseCircleFilled = {
  name: "close-circle-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 0c282.752 0 512 229.248 512 512s-229.248 512-512 512S0 794.752 0 512 229.248 0 512 0zm192 288.128a14.635 14.635 0 0 0-20.65 0l-170.923 170.88-168.278-168.277a14.635 14.635 0 0 0-20.693 0l-31.061 31.018a14.635 14.635 0 0 0 0 20.694l168.32 168.277-170.752 170.752a14.635 14.635 0 0 0 0 20.693l31.018 31.062a14.635 14.635 0 0 0 20.694 0l170.752-170.795 170.752 170.795a14.635 14.635 0 0 0 20.693 0l31.061-31.019a14.635 14.635 0 0 0 0-20.693L564.181 510.72l170.88-170.88a14.635 14.635 0 0 0 0-20.693l-31.018-31.019z"/></svg>'
};
const CloseCircle = {
  name: "close-circle",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm195.2 215.232a12.8 12.8 0 0 1 0 18.112L557.632 510.848l149.44 149.44a12.8 12.8 0 0 1 0 18.112l-27.2 27.136a12.8 12.8 0 0 1-18.048 0L512.384 556.16 362.944 705.6a12.8 12.8 0 0 1-18.048 0l-27.2-27.136a12.8 12.8 0 0 1 0-18.112L467.2 510.848l-147.264-147.2a12.8 12.8 0 0 1 0-18.112l27.136-27.136a12.8 12.8 0 0 1 18.112 0l147.264 147.2 149.568-149.504a12.8 12.8 0 0 1 18.048 0l27.2 27.136z"/></svg>'
};
const Close = {
  name: "close",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M282.24 236.928 512 466.688l229.76-229.76a12.8 12.8 0 0 1 18.176 0l27.136 27.136a12.8 12.8 0 0 1 0 18.112L557.248 512l229.76 229.888a12.8 12.8 0 0 1 0 18.112l-27.072 27.136a12.8 12.8 0 0 1-18.112 0L512 557.248l-229.76 229.76a12.8 12.8 0 0 1-18.176 0l-27.136-27.072a12.8 12.8 0 0 1 0-18.112L466.688 512l-229.76-229.76a12.8 12.8 0 0 1 0-18.176l27.136-27.136a12.8 12.8 0 0 1 18.112 0z"/></svg>'
};
const Collapse = {
  name: "collapse",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M819.2 128c7.04 0 12.8 5.76 12.8 12.8v742.4a12.8 12.8 0 0 1-12.8 12.8h-38.4a12.8 12.8 0 0 1-12.8-12.8V140.8c0-7.04 5.76-12.8 12.8-12.8h38.4zm-266.176 76.224 27.2 27.2a12.8 12.8 0 0 1 0 18.112l-262.528 262.4 262.528 262.528a12.8 12.8 0 0 1 0 18.112l-27.2 27.136a12.8 12.8 0 0 1-18.048 0L236.288 521.024a12.8 12.8 0 0 1 0-18.112l298.688-298.688a12.8 12.8 0 0 1 18.048 0z"/></svg>'
};
const Copy = {
  name: "copy",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M883.2 64c7.04 0 12.8 5.76 12.8 12.8v742.4a12.8 12.8 0 0 1-12.8 12.8H768v-64h64V128H384v64h-64V76.8c0-7.04 5.76-12.8 12.8-12.8h550.4z"/><path d="M691.2 256c7.04 0 12.8 5.76 12.8 12.8v678.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8V268.8c0-7.04 5.76-12.8 12.8-12.8h550.4zM640 320H192v576h448V320z"/><path d="M268.8 448h294.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H268.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8Zm0 192h294.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H268.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8Z"/></svg>'
};
const DialogClose = {
  name: "dialog-close",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path fill-rule="evenodd" d="M916.741 210.766c4.999-4.999 4.999-13.103 0-18.102l-45.255-45.255c-4.999-4.999-13.103-4.999-18.102 0L532.073 468.721 210.766 147.414c-4.999-5-13.103-5-18.102 0l-45.255 45.254c-4.999 5-4.999 13.104 0 18.102l321.307 321.307-321.307 321.307c-5 5.001-4.999 13.103 0 18.102l45.255 45.255c4.999 4.999 13.101 5 18.102 0l321.307-321.307 321.311 321.312c5.001 5 13.103 4.999 18.102 0l45.255-45.255c4.999-4.999 5-13.101 0-18.102L595.43 532.077 916.74 210.766Z"/></svg>'
};
const DoubleLeft = {
  name: "double-left",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M533.504 265.344a32 32 0 0 1 0 45.312L342.336 501.76a12.8 12.8 0 0 0 0 18.112l192.512 192.512a32 32 0 0 1-45.248 45.248L265.344 533.504a32 32 0 0 1 0-45.248L488.32 265.344a32 32 0 0 1 45.248 0zm224 0a32 32 0 0 1 0 45.312L566.336 501.76a12.8 12.8 0 0 0 0 18.112l192.512 192.512a32 32 0 1 1-45.248 45.248L489.344 533.504a32 32 0 0 1 0-45.248l222.912-222.912a32 32 0 0 1 45.248 0z"/></svg>'
};
const DoubleRight = {
  name: "double-right",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M490.752 265.344a32 32 0 0 0 0 45.312L681.92 501.824a12.8 12.8 0 0 1 0 18.112L489.344 712.448a32 32 0 0 0 45.312 45.248l224.192-224.192a32 32 0 0 0 0-45.248L536 265.344a32 32 0 0 0-45.248 0zm-224 0a32 32 0 0 0 0 45.312L457.92 501.76a12.8 12.8 0 0 1 0 18.112L265.344 712.384a32 32 0 1 0 45.312 45.248L534.848 533.44a32 32 0 0 0 0-45.248L312 265.344a32 32 0 0 0-45.248 0z"/></svg>'
};
const Down = {
  name: "down",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="m294.784 411.776 208.192 208.192a12.8 12.8 0 0 0 18.048 0l208.192-208.192a12.8 12.8 0 0 1 18.112 0l27.136 27.2a12.8 12.8 0 0 1 0 18.048l-253.44 253.44a12.8 12.8 0 0 1-18.048 0l-253.44-253.44a12.8 12.8 0 0 1 0-18.048l27.136-27.2a12.8 12.8 0 0 1 18.112 0z"/></svg>'
};
const Ellipsis = {
  name: "ellipsis",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><defs><style/></defs><path d="M768 448a64 64 0 1 0 0 128 64 64 0 1 0 0-128Zm-256 0a64 64 0 1 0 0 128 64 64 0 1 0 0-128Zm-256 0a64 64 0 1 0 0 128 64 64 0 1 0 0-128Z"/></svg>'
};
const Empty = {
  name: "empty",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><defs><style/></defs><path d="M961.991 628.895h.01V849.5c0 31.066-25.184 56.25-56.25 56.25h-787.5C87.185 905.75 62 880.566 62 849.5V628.895h.01a36.879 36.879 0 0 1 5.25-18.1l118.856-198.028c10.175-16.954 28.515-27.33 48.307-27.33h555.149c19.792 0 38.131 10.376 48.307 27.33l118.856 198.027a36.718 36.718 0 0 1 5.255 18.1zm-312.198-4.38c.362 0 .724-.005 1.084-.015h252.416a7.031 7.031 0 0 0 6.028-10.65L801.65 434.458a14.084 14.084 0 0 0-12.077-6.833h-555.15a14.083 14.083 0 0 0-12.076 6.833L114.675 613.85a7.031 7.031 0 0 0 6.029 10.65h253.505c13.108 0 24.435 9.047 27.39 21.739C411.727 697.968 457.307 737 512.002 737c37.814 0 71.271-18.657 91.668-47.268a111.935 111.935 0 0 0 18.56-42.63c2.632-13.134 14.168-22.588 27.564-22.588zM512.001 118.25c11.65 0 21.094 9.444 21.094 21.094v89.648c0 11.65-9.444 21.094-21.094 21.094s-21.094-9.444-21.094-21.094v-89.648c0-11.65 9.444-21.094 21.094-21.094zm266.341 65.892c8.237 8.238 8.237 21.593 0 29.831l-63.391 63.392c-8.238 8.237-21.594 8.237-29.831 0-8.238-8.238-8.238-21.594 0-29.831l63.391-63.392c8.237-8.238 21.593-8.238 29.831 0zm-532.682 0c8.238-8.238 21.594-8.238 29.832 0l63.39 63.392c8.238 8.237 8.238 21.593 0 29.83-8.237 8.238-21.593 8.238-29.831 0l-63.391-63.39c-8.237-8.239-8.237-21.594 0-29.832z"/></svg>'
};
const ExclamationCircleFilled = {
  name: "exclamation-circle-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 1024c282.752 0 512-229.248 512-512S794.752 0 512 0 0 229.248 0 512s229.248 512 512 512zm25.6-405.333h-51.2a17.067 17.067 0 0 1-17.067-17.067V251.733c0-9.386 7.68-17.066 17.067-17.066h51.2c9.387 0 17.067 7.68 17.067 17.066V601.6a17.067 17.067 0 0 1-17.067 17.067zm0 170.666h-51.2a17.067 17.067 0 0 1-17.067-17.066v-51.2c0-9.387 7.68-17.067 17.067-17.067h51.2c9.387 0 17.067 7.68 17.067 17.067v51.2a17.067 17.067 0 0 1-17.067 17.066z"/></svg>'
};
const ExclamationCircle = {
  name: "exclamation-circle",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 960c247.424 0 448-200.576 448-448S759.424 64 512 64 64 264.576 64 512s200.576 448 448 448Zm0-64c-212.077 0-384-171.923-384-384s171.923-384 384-384 384 171.923 384 384-171.923 384-384 384Zm19.2-576c6.967 0 12.634-5.566 12.796-12.493L544 268.8c0-6.967-5.566-12.634-12.493-12.796L492.8 256c-6.967 0-12.634 5.566-12.796 12.493L480 307.2c0 6.967 5.566 12.634 12.493 12.796L531.2 320Zm0 448c6.967 0 12.634-5.566 12.796-12.493L544 396.8c0-6.967-5.566-12.634-12.493-12.8H492.8c-6.967 0-12.634 5.566-12.796 12.493L480 755.2c0 6.967 5.566 12.634 12.493 12.8H531.2Z"/></svg>'
};
const Expand = {
  name: "expand",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M308.288 285.248a15.64 15.64 0 0 1 11.264 4.8L344 314.496a15.68 15.68 0 0 1 0 22.528L151.552 529.536 344 721.984a15.68 15.68 0 0 1 2.56 19.264l-2.56 3.2-24.448 24.512a15.68 15.68 0 0 1-22.528 0L68.8 540.8a15.68 15.68 0 0 1 0-22.592l228.16-228.16a15.68 15.68 0 0 1 11.264-4.8zm407.424 0c4.288 0 8.32 1.664 11.264 4.736L955.2 518.208a15.68 15.68 0 0 1 2.56 19.2l-2.56 3.392-228.224 228.16a15.68 15.68 0 0 1-22.528 0L680 744.512a15.68 15.68 0 0 1 0-22.528l192.448-192.512L680 337.024a15.68 15.68 0 0 1 0-22.528l24.448-24.512a15.68 15.68 0 0 1 11.264-4.8z"/></svg>'
};
const FilterFilled = {
  name: "filter-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M259.776 323.776a12.8 12.8 0 0 1-3.776-9.088V268.8c0-7.04 5.76-12.8 12.8-12.8h486.4c7.04 0 12.8 5.76 12.8 12.8v45.888a12.8 12.8 0 0 1-3.776 9.088L576 512v248.064a12.8 12.8 0 0 1-7.04 11.52l-102.4 51.2a12.8 12.8 0 0 1-18.56-11.52V512L259.776 323.776z"/></svg>'
};
const Holder = {
  name: "holder",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M320 256a64 64 0 1 0 128 0 64 64 0 1 0-128 0Zm256 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0ZM320 512a64 64 0 1 0 128 0 64 64 0 1 0-128 0Zm256 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0ZM320 768a64 64 0 1 0 128 0 64 64 0 1 0-128 0Zm256 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"/></svg>'
};
const InfoCircleFilled = {
  name: "info-circle-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 0c282.752 0 512 229.248 512 512s-229.248 512-512 512S0 794.752 0 512 229.248 0 512 0zm25.6 405.333h-51.2a17.067 17.067 0 0 0-17.067 17.067v349.867c0 9.386 7.68 17.066 17.067 17.066h51.2a17.067 17.067 0 0 0 17.067-17.066V422.4a17.067 17.067 0 0 0-17.067-17.067zm0-170.666h-51.2a17.067 17.067 0 0 0-17.067 17.066v51.2c0 9.387 7.68 17.067 17.067 17.067h51.2a17.067 17.067 0 0 0 17.067-17.067v-51.2a17.067 17.067 0 0 0-17.067-17.066z"/></svg>'
};
const InfoCircle = {
  name: "info-circle",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64Zm0 64c-212.077 0-384 171.923-384 384s171.923 384 384 384 384-171.923 384-384-171.923-384-384-384Zm19.2 576c6.967 0 12.634 5.566 12.796 12.493L544 755.2c0 6.967-5.566 12.634-12.493 12.796L492.8 768c-6.967 0-12.634-5.566-12.796-12.493L480 716.8c0-6.967 5.566-12.634 12.493-12.796L531.2 704Zm0-448c6.967 0 12.634 5.566 12.796 12.493L544 627.2c0 6.967-5.566 12.634-12.493 12.8H492.8c-6.967 0-12.634-5.566-12.796-12.493L480 268.8c0-6.967 5.566-12.634 12.493-12.8H531.2Z"/></svg>'
};
const Info = {
  name: "info",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M550.4 768c14.08 0 25.6 11.52 25.6 25.6v76.8a25.6 25.6 0 0 1-25.6 25.6h-76.8a25.6 25.6 0 0 1-25.6-25.6v-76.8c0-14.08 11.52-25.6 25.6-25.6h76.8zm0-576c14.08 0 25.6 11.52 25.6 25.6v460.8a25.6 25.6 0 0 1-25.6 25.6h-76.8a25.6 25.6 0 0 1-25.6-25.6V217.6c0-14.08 11.52-25.6 25.6-25.6h76.8z"/></svg>'
};
const LayoutCompact = {
  name: "layout-compact",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M907.84 713.024a12.8 12.8 0 0 0 0-18.048l-27.136-27.2a12.8 12.8 0 0 0-18.112 0l-126.72 126.72-126.72-126.72a12.8 12.8 0 0 0-18.048 0l-27.2 27.2a12.8 12.8 0 0 0 0 18.048l162.944 162.944a12.8 12.8 0 0 0 18.112 0l162.88-162.944zm0-402.048a12.8 12.8 0 0 1 0 18.048l-27.136 27.2a12.8 12.8 0 0 1-18.112 0l-126.72-126.72-126.72 126.72a12.8 12.8 0 0 1-18.048 0L563.84 328.96a12.8 12.8 0 0 1 0-18.048l162.944-162.944a12.8 12.8 0 0 1 18.112 0l162.88 162.944zM140.8 192h294.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8Zm0 192h294.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8Zm0 192h294.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8Zm0 192h294.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8Z"/></svg>'
};
const LayoutLarge = {
  name: "layout-large",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M907.84 713.024a12.8 12.8 0 0 0 0-18.048l-27.136-27.2a12.8 12.8 0 0 0-18.112 0l-126.72 126.72-126.72-126.72a12.8 12.8 0 0 0-18.048 0l-27.2 27.2a12.8 12.8 0 0 0 0 18.048l162.944 162.944a12.8 12.8 0 0 0 18.112 0l162.88-162.944zm0-402.048a12.8 12.8 0 0 1 0 18.048l-27.136 27.2a12.8 12.8 0 0 1-18.112 0l-126.72-126.72-126.72 126.72a12.8 12.8 0 0 1-18.048 0L563.84 328.96a12.8 12.8 0 0 1 0-18.048l162.944-162.944a12.8 12.8 0 0 1 18.112 0l162.88 162.944zM140.8 192h294.4q12.8 0 12.8 12.8v230.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8V204.8q0-12.8 12.8-12.8Zm0 384h294.4q12.8 0 12.8 12.8v230.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8V588.8q0-12.8 12.8-12.8Z"/></svg>'
};
const LayoutMedium = {
  name: "layout-medium",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M907.84 713.024a12.8 12.8 0 0 0 0-18.048l-27.136-27.2a12.8 12.8 0 0 0-18.112 0l-126.72 126.72-126.72-126.72a12.8 12.8 0 0 0-18.048 0l-27.2 27.2a12.8 12.8 0 0 0 0 18.048l162.944 162.944a12.8 12.8 0 0 0 18.112 0l162.88-162.944zm0-402.048a12.8 12.8 0 0 1 0 18.048l-27.136 27.2a12.8 12.8 0 0 1-18.112 0l-126.72-126.72-126.72 126.72a12.8 12.8 0 0 1-18.048 0L563.84 328.96a12.8 12.8 0 0 1 0-18.048l162.944-162.944a12.8 12.8 0 0 1 18.112 0l162.88 162.944zM140.8 192h294.4q12.8 0 12.8 12.8v102.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8V204.8q0-12.8 12.8-12.8Zm0 256h294.4q12.8 0 12.8 12.8v102.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8V460.8q0-12.8 12.8-12.8Zm0 256h294.4q12.8 0 12.8 12.8v102.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8V716.8q0-12.8 12.8-12.8Z"/></svg>'
};
const LeftDouble = {
  name: "left-double",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M533.504 265.344a32 32 0 0 1 0 45.312L342.336 501.76a12.8 12.8 0 0 0 0 18.112l192.512 192.512a32 32 0 0 1-45.248 45.248L265.344 533.504a32 32 0 0 1 0-45.248L488.32 265.344a32 32 0 0 1 45.248 0zm224 0a32 32 0 0 1 0 45.312L566.336 501.76a12.8 12.8 0 0 0 0 18.112l192.512 192.512a32 32 0 1 1-45.248 45.248L489.344 533.504a32 32 0 0 1 0-45.248l222.912-222.912a32 32 0 0 1 45.248 0z"/></svg>'
};
const Left = {
  name: "left",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M612.224 294.784 404.032 502.976a12.8 12.8 0 0 0 0 18.048l208.192 208.192a12.8 12.8 0 0 1 0 18.112l-27.2 27.136a12.8 12.8 0 0 1-18.048 0l-253.44-253.44a12.8 12.8 0 0 1 0-18.048l253.44-253.44a12.8 12.8 0 0 1 18.048 0l27.2 27.136a12.8 12.8 0 0 1 0 18.112z"/></svg>'
};
const Link = {
  name: "link",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M602.496 421.504a192 192 0 0 1 8.64 262.272l-8.64 9.216L421.44 874.048a192 192 0 0 1-280.128-262.336l8.64-9.216 135.68-135.68 45.312 45.248L195.2 647.744a128 128 0 0 0-6.528 174.08l6.528 6.976a128 128 0 0 0 172.864 7.488l8.128-7.488 180.992-180.992a128 128 0 0 0 7.488-172.864l-7.488-8.128 45.312-45.312zm271.488-271.552a192 192 0 0 1 8.64 262.336l-8.64 9.216-135.68 135.744-45.248-45.184 135.68-135.808a128 128 0 0 0 6.528-174.08l-6.528-6.976a128 128 0 0 0-172.8-7.488l-8.192 7.488-180.992 181.12a128 128 0 0 0-7.488 172.8l7.488 8.192-45.248 45.248 1.6 1.664-1.664-1.6a192 192 0 0 1-8.64-262.336l8.64-9.216 181.056-181.056a192 192 0 0 1 271.488 0z"/></svg>'
};
const Loading = {
  name: "loading",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="m527.424 64.32 3.712.064a448 448 0 0 1 430.912 432.32v2.368a12.8 12.8 0 0 1-12.8 13.056h-38.336a12.8 12.8 0 0 1-12.8-13.632A384 384 0 0 0 528.64 128.384h-1.792a12.8 12.8 0 0 1-12.608-12.8V77.12a12.8 12.8 0 0 1 13.12-12.8z"/></svg>'
};
const MenuFold = {
  name: "menu-fold",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M888.32 768c4.224 0 7.68 3.2 7.68 7.104v49.792c.064 3.84-3.328 7.04-7.68 7.104H135.68c-4.352-.064-7.744-3.264-7.68-7.104v-49.792c0-3.904 3.456-7.104 7.68-7.104h752.64zM736 392.576c0-7.168 7.872-11.136 13.248-6.72l143.68 119.488a8.832 8.832 0 0 1 0 13.44l-143.68 119.424c-5.376 4.48-13.248.384-13.248-6.784zM631.68 576c4.608 0 8.32 3.2 8.32 7.104v49.792c.064 3.84-3.584 7.04-8.32 7.104H136.32c-4.736-.064-8.384-3.264-8.32-7.104V583.04c0-3.84 3.712-7.104 8.32-7.104h495.36zm0-192c4.608 0 8.32 3.2 8.32 7.104v49.792c.064 3.84-3.584 7.04-8.32 7.104H136.32c-4.736-.064-8.384-3.264-8.32-7.104V391.04c0-3.84 3.712-7.104 8.32-7.104h495.36zm256.64-192c4.224 0 7.68 3.2 7.68 7.104v49.792c.064 3.84-3.328 7.04-7.68 7.104H135.68c-4.352-.064-7.744-3.264-7.68-7.104V199.04c0-3.84 3.456-7.04 7.68-7.04h752.64z"/></svg>'
};
const MenuUnfold = {
  name: "menu-unfold",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M888.32 768c4.224 0 7.68 3.2 7.68 7.104v49.792c.064 3.84-3.328 7.04-7.68 7.104H135.68c-4.352-.064-7.744-3.264-7.68-7.104v-49.792c0-3.904 3.456-7.104 7.68-7.104h752.64zM896 392.576v238.848c0 7.168-7.872 11.264-13.248 6.784l-143.68-119.36a8.832 8.832 0 0 1 0-13.44l143.68-119.552c5.376-4.48 13.248-.448 13.248 6.72zM631.68 576c4.608 0 8.32 3.2 8.32 7.104v49.792c.064 3.84-3.584 7.04-8.32 7.104H136.32c-4.736-.064-8.384-3.264-8.32-7.104V583.04c0-3.84 3.712-7.104 8.32-7.104h495.36zm0-192c4.608 0 8.32 3.2 8.32 7.104v49.792c.064 3.84-3.584 7.04-8.32 7.104H136.32c-4.736-.064-8.384-3.264-8.32-7.104V391.04c0-3.84 3.712-7.104 8.32-7.104h495.36zm256.64-192c4.224 0 7.68 3.2 7.68 7.104v49.792c.064 3.84-3.328 7.04-7.68 7.104H135.68c-4.352-.064-7.744-3.264-7.68-7.104V199.04c0-3.84 3.456-7.04 7.68-7.04h752.64z"/></svg>'
};
const Menu$1 = {
  name: "menu",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M896 140.8v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8zm0 128v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8zm0 128v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8zm0 128v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8zm0 128v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8zm0 128v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8z"/></svg>'
};
const Minus = {
  name: "minus",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M896 492.8v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8z"/></svg>'
};
const Plus = {
  name: "plus",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M499.2 128c7.04 0 12.8 5.312 12.8 11.84V448h308.16c6.528 0 11.84 5.76 11.84 12.8v38.4c0 7.04-5.312 12.8-11.84 12.8H512v308.16c0 6.528-5.76 11.84-12.8 11.84h-38.4c-7.04 0-12.8-5.312-12.8-11.84V512H139.84c-6.528 0-11.84-5.76-11.84-12.8v-38.4c0-7.04 5.312-12.8 11.84-12.8l308.16-.064V139.84c0-6.528 5.76-11.84 12.8-11.84h38.4z"/></svg>'
};
const QuestionCircleFilled = {
  name: "question-circle-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64zm.853 656.939a48 48 0 1 0 0 96 48 48 0 0 0 0-96zM512 192a192.021 192.021 0 0 0-191.019 172.48 144.576 144.576 0 0 0-.469 6.72 12.8 12.8 0 0 0 12.8 12.8h38.57a12.8 12.8 0 0 0 12.758-11.819c.213-2.773.448-5.077.725-6.933A128.021 128.021 0 0 1 640 384a128 128 0 0 1-128 128h-32v115.2a12.8 12.8 0 0 0 12.8 12.8h38.4a12.8 12.8 0 0 0 12.8-12.8v-53.867A192 192 0 0 0 512 192z"/></svg>'
};
const QuestionCircle = {
  name: "question-circle",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm0 64a192 192 0 1 1 0 384v-64a128 128 0 1 0-128-128h-64a192 192 0 0 1 192-192zm-32 320h64v115.2a12.8 12.8 0 0 1-12.8 12.8h-38.4a12.8 12.8 0 0 1-12.8-12.8V512zm32.832 208.96q48 0 48 48t-48 48q-48 0-48-48t48-48Z"/></svg>'
};
const RightDouble = {
  name: "right-double",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M490.752 265.344a32 32 0 0 0 0 45.312L681.92 501.824a12.8 12.8 0 0 1 0 18.112L489.344 712.448a32 32 0 0 0 45.312 45.248l224.192-224.192a32 32 0 0 0 0-45.248L536 265.344a32 32 0 0 0-45.248 0zm-224 0a32 32 0 0 0 0 45.312L457.92 501.76a12.8 12.8 0 0 1 0 18.112L265.344 712.384a32 32 0 1 0 45.312 45.248L534.848 533.44a32 32 0 0 0 0-45.248L312 265.344a32 32 0 0 0-45.248 0z"/></svg>'
};
const Right = {
  name: "right",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="m411.776 294.784 208.192 208.192a12.8 12.8 0 0 1 0 18.048L411.776 729.216a12.8 12.8 0 0 0 0 18.112l27.2 27.136a12.8 12.8 0 0 0 18.048 0l253.44-253.44a12.8 12.8 0 0 0 0-18.048l-253.44-253.44a12.8 12.8 0 0 0-18.048 0l-27.2 27.136a12.8 12.8 0 0 0 0 18.112z"/></svg>'
};
const RotateLeft = {
  name: "rotate-left",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M768 396.8v550.4a12.8 12.8 0 0 1-12.8 12.8H76.8A12.8 12.8 0 0 1 64 947.2V396.8c0-7.04 5.76-12.8 12.8-12.8h678.4c7.04 0 12.8 5.76 12.8 12.8zM704 448H128v448h576V448zM462.208 319.616a12.8 12.8 0 0 1-9.088-21.888L665.28 85.824a12.8 12.8 0 0 1 21.888 9.024v160.768A288 288 0 0 1 960 529.664v.512a12.8 12.8 0 0 1-12.48 13.056h-39.68a11.904 11.904 0 0 1-11.072-7.68l-.768-3.584a224 224 0 0 0-211.392-212.416z"/></svg>'
};
const RotateRight = {
  name: "rotate-right",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M256 396.8v550.4c0 7.04 5.76 12.8 12.8 12.8h678.4a12.8 12.8 0 0 0 12.8-12.8V396.8a12.8 12.8 0 0 0-12.8-12.8H268.8a12.8 12.8 0 0 0-12.8 12.8zm64 51.2h576v448H320V448zm241.792-128.384a12.8 12.8 0 0 0 8.96-21.888L358.72 85.824a12.8 12.8 0 0 0-21.888 9.024v160.768A288 288 0 0 0 64 529.664v.512a12.8 12.8 0 0 0 12.48 13.056h39.68c4.992 0 9.344-3.2 11.072-7.68l.768-3.584a224 224 0 0 1 211.392-212.416z"/></svg>'
};
const Search = {
  name: "search",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M448 96a384 384 0 0 1 307.392 614.208l154.24 154.112a12.8 12.8 0 0 1 0 18.112l-27.2 27.136a12.8 12.8 0 0 1-18.112 0L712.832 758.08A384 384 0 1 1 448 96zm0 64a320 320 0 1 0 0 640 320 320 0 0 0 0-640zm0 128v64a160 160 0 0 0-159.68 149.504L288 512h-64a224 224 0 0 1 211.712-223.68L448 288z"/></svg>'
};
const StarFilled = {
  name: "star-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M652.181 340.395 523.243 78.955a12.8 12.8 0 0 0-22.955 0L371.2 340.395a12.8 12.8 0 0 1-9.621 6.997L73.024 389.376A12.8 12.8 0 0 0 65.92 411.2l208.81 203.499a12.8 12.8 0 0 1 3.691 11.306L229.12 913.493a12.8 12.8 0 0 0 18.56 13.504l258.09-135.744a12.8 12.8 0 0 1 11.905 0l258.133 135.744a12.8 12.8 0 0 0 18.56-13.504l-49.323-287.381a12.8 12.8 0 0 1 3.691-11.328l208.853-203.563a12.8 12.8 0 0 0-7.104-21.824l-288.682-41.984a12.8 12.8 0 0 1-9.643-6.997z"/></svg>'
};
const Success = {
  name: "success",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M264.384 443.52a25.6 25.6 0 0 1 36.224 0L463.552 606.4 762.24 307.712a25.6 25.6 0 0 1 36.16 0l54.336 54.272a25.6 25.6 0 0 1 0 36.224L481.6 769.28a25.6 25.6 0 0 1-36.16 0L210.112 534.016a25.6 25.6 0 0 1 0-36.224l54.272-54.336z"/></svg>'
};
const TreeExpand = {
  name: "tree-expand",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M179.2 192c7.04 0 12.8 5.76 12.8 12.8V256h51.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H192v192h179.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H320v192h115.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H268.8a12.8 12.8 0 0 1-12.8-12.8V576H140.8a12.8 12.8 0 0 1-12.8-12.8V204.8c0-7.04 5.76-12.8 12.8-12.8h38.4zm704 576c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H524.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h358.4zm-64-256c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H460.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h358.4zm-64-256c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H332.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h422.4z"/></svg>'
};
const TreeUnexpand = {
  name: "tree-unexpand",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M179.2 192c7.04 0 12.8 5.76 12.8 12.8V256h115.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H192v192h115.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H192v192h115.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8V204.8c0-7.04 5.76-12.8 12.8-12.8h38.4zm704 576c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H396.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h486.4zm0-256c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H396.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h486.4zm0-256c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H396.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h486.4z"/></svg>'
};
const Uncollapse = {
  name: "uncollapse",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M204.8 128a12.8 12.8 0 0 0-12.8 12.8v742.4c0 7.04 5.76 12.8 12.8 12.8h38.4a12.8 12.8 0 0 0 12.8-12.8V140.8a12.8 12.8 0 0 0-12.8-12.8h-38.4zm266.176 76.224-27.2 27.2a12.8 12.8 0 0 0 0 18.112l262.528 262.4-262.528 262.528a12.8 12.8 0 0 0 0 18.112l27.2 27.136a12.8 12.8 0 0 0 18.048 0l298.688-298.688a12.8 12.8 0 0 0 0-18.112L489.024 204.224a12.8 12.8 0 0 0-18.048 0z"/></svg>'
};
const Unexpand = {
  name: "unexpand",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="m344 744.512-24.448 24.448a15.68 15.68 0 0 1-22.528 0L68.8 540.8a15.68 15.68 0 0 1 0-22.592l228.16-228.16a15.68 15.68 0 0 1 22.528 0l24.448 24.448a15.68 15.68 0 0 1 0 22.528L151.552 529.536 344 721.984a15.68 15.68 0 0 1 0 22.528zm289.472-522.56-182.72 632.256a15.552 15.552 0 0 1-19.072 10.752l-30.4-8.32a15.872 15.872 0 0 1-10.752-19.584L573.184 204.8a15.552 15.552 0 0 1 19.072-10.752l30.4 8.32c8.32 2.496 13.184 11.264 10.816 19.648zM955.2 540.8 726.976 768.96a15.68 15.68 0 0 1-22.528 0L680 744.512a15.68 15.68 0 0 1 0-22.528l192.448-192.512L680 337.024a15.68 15.68 0 0 1 0-22.528l24.448-24.512a15.68 15.68 0 0 1 22.528 0L955.2 518.208a15.68 15.68 0 0 1 0 22.528z"/></svg>'
};
const User = {
  name: "user",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64a256 256 0 1 1 0 512 256 256 0 0 1 0-512zm0 64a192 192 0 1 0 0 384 192 192 0 0 0 0-384z"/><path d="M512 512c-224.768 0-407.872 146.24-415.744 369.088l-.192 20.48.512 13.376.448 7.872a44.8 44.8 0 0 0 44.672 42.112l740.48.64a44.8 44.8 0 0 0 44.8-42.048l.768-15.36L928 896c0-229.76-186.24-384-416-384zm0 64c194.432 0 352 125.568 352 320l-.128 5.568L160 900.864V896c0-194.432 157.568-320 352-320z"/></svg>'
};
const VerticalAlignCenter = {
  name: "vertical-align-center",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M470.84 596.02c3.999-4 9.985-4.799 14.78-2.4l3.322 2.4 162.917 162.917c4 4 4.799 9.986 2.4 14.78l-2.4 3.322-27.153 27.153c-3.999 3.999-9.985 4.799-14.78 2.4l-3.322-2.4L512 709.568V947.2c0 7.07-5.73 12.8-12.8 12.8h-38.4c-7.07 0-12.8-5.73-12.8-12.8V709.312l-94.823 94.88c-3.999 3.999-9.986 4.799-14.78 2.4l-3.322-2.4-27.153-27.153c-3.999-3.999-4.799-9.986-2.4-14.78l2.4-3.322L470.84 596.02zM819.2 448c7.07 0 12.8 5.73 12.8 12.8v38.4c0 7.07-5.73 12.8-12.8 12.8H140.8c-7.07 0-12.8-5.73-12.8-12.8v-38.4c0-7.07 5.73-12.8 12.8-12.8h678.4zM499.2 0c5.891 0 10.853 3.98 12.343 9.397L512 12.8v237.504l94.59-94.53c4.998-5 13.103-5 18.101 0l27.153 27.152c4.999 4.999 4.999 13.104 0 18.102L488.927 363.945c-4.999 5-13.103 5-18.102 0L307.908 201.028c-5-4.999-5-13.103 0-18.102l27.152-27.153c5-4.999 13.104-4.999 18.102 0L448 250.56V12.8c0-5.891 3.98-10.853 9.397-12.343L460.8 0h38.4z"/></svg>'
};
const VerticalAlignTop = {
  name: "vertical-align-top",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="m488.96 276.032 162.88 162.944a12.8 12.8 0 0 1 0 18.048l-27.136 27.2a12.8 12.8 0 0 1-18.112 0L512 389.568V883.2a12.8 12.8 0 0 1-12.8 12.8h-38.4a12.8 12.8 0 0 1-12.8-12.8V389.312l-94.784 94.912a12.8 12.8 0 0 1-18.112 0L307.84 456.96a12.8 12.8 0 0 1 0-18.048l162.944-162.944a12.8 12.8 0 0 1 18.112 0zM819.2 128c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h678.4z"/></svg>'
};
const ZoomIn = {
  name: "zoom-in",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M448 96a384 384 0 0 1 307.392 614.208l154.24 154.112a12.8 12.8 0 0 1 0 18.112l-27.2 27.136a12.8 12.8 0 0 1-18.112 0L712.832 758.08A384 384 0 1 1 448 96zm0 64a320 320 0 1 0 0 640 320 320 0 0 0 0-640z"/><path d="M428.8 255.68h38.4c7.04 0 12.8 5.76 12.8 12.8v422.4a12.8 12.8 0 0 1-12.8 12.8h-38.4a12.8 12.8 0 0 1-12.8-12.8v-422.4c0-7.04 5.76-12.8 12.8-12.8z"/><path d="M672 460.48v38.4a12.8 12.8 0 0 1-12.8 12.8H236.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h422.4c7.04 0 12.8 5.76 12.8 12.8z"/></svg>'
};
const ZoomOut = {
  name: "zoom-out",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M448 96a384 384 0 0 1 307.392 614.208l154.24 154.112a12.8 12.8 0 0 1 0 18.112l-27.2 27.136a12.8 12.8 0 0 1-18.112 0L712.832 758.08A384 384 0 1 1 448 96zm0 64a320 320 0 1 0 0 640 320 320 0 0 0 0-640z"/><path d="M672 460.48v38.4a12.8 12.8 0 0 1-12.8 12.8H236.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h422.4c7.04 0 12.8 5.76 12.8 12.8z"/></svg>'
};
const IDUX_ICON_DEPENDENCIES = [
  Bulb,
  CaretDownFilled,
  CaretUpFilled,
  Check,
  CheckCircle,
  CheckCircleFilled,
  Clear,
  ClockCircle,
  Close,
  CloseCircle,
  CloseCircleFilled,
  Collapse,
  DialogClose,
  DoubleLeft,
  DoubleRight,
  Down,
  Ellipsis,
  Empty,
  ExclamationCircle,
  ExclamationCircleFilled,
  FilterFilled,
  Holder,
  Info,
  InfoCircle,
  InfoCircleFilled,
  LayoutCompact,
  LayoutLarge,
  LayoutMedium,
  Left,
  LeftDouble,
  Loading,
  Menu$1,
  MenuFold,
  MenuUnfold,
  Minus,
  Plus,
  QuestionCircle,
  QuestionCircleFilled,
  Right,
  RightDouble,
  RotateLeft,
  RotateRight,
  Search,
  Success,
  StarFilled,
  User,
  Uncollapse,
  TreeExpand,
  TreeUnexpand,
  VerticalAlignCenter,
  VerticalAlignTop,
  ZoomIn,
  ZoomOut
];
const IxIcon = Icon;
function numFormatter(value, precision) {
  const separator = ".";
  const numReg = /^(\d+)(\.(\d+))?$/;
  const numMatchRet = String(value).match(numReg);
  if (!numMatchRet) {
    return {
      value: String(value),
      int: "",
      decimal: ""
    };
  } else {
    const int = String(numMatchRet[1]);
    let decimal = String(numMatchRet[3] || "").slice(0, precision).padEnd(precision, "0");
    decimal = decimal.length > 0 ? `${separator}${decimal}` : "";
    return {
      value: `${int}${decimal}`,
      int,
      decimal
    };
  }
}
const defaultConfig$1 = {
  common: {
    prefixCls: "ix",
    overlayZIndex: 1e3,
    theme: "default"
  },
  locale: zhCN$2,
  alert: {
    closable: false,
    icon: {
      success: "check-circle",
      error: "info-circle",
      info: "bulb",
      warning: "exclamation-circle",
      offline: "exclamation-circle"
    }
  },
  anchor: {
    bounds: 5,
    hideLinkBall: false
  },
  avatar: {
    gap: 4,
    icon: "user",
    shape: "circle",
    size: "md"
  },
  backTop: {
    duration: 450,
    visibilityHeight: 400
  },
  badge: {
    showZero: false,
    dot: false,
    overflowCount: 99
  },
  button: {
    size: "md",
    waveless: false
  },
  card: {
    borderless: false,
    hoverable: false,
    size: "md"
  },
  carousel: {
    autoplayTime: 0,
    dotPlacement: "bottom",
    showArrow: false,
    trigger: "click"
  },
  cascader: {
    borderless: false,
    clearIcon: "close-circle",
    childrenKey: "children",
    expandIcon: "right",
    fullPath: true,
    getKey: "key",
    labelKey: "label",
    overlayMatchWidth: false,
    size: "md",
    suffix: "down"
  },
  checkbox: {
    size: "md",
    waveless: false
  },
  collapse: {
    accordion: false,
    borderless: false,
    expandIcon: "right",
    ghost: false,
    size: "md"
  },
  datePicker: {
    allowInput: false,
    borderless: false,
    clearable: false,
    clearIcon: "close-circle",
    size: "md",
    suffix: "calendar"
  },
  divider: {
    dashed: false,
    labelPlacement: "center",
    plain: false,
    size: "md"
  },
  drawer: {
    closable: true,
    closeOnEsc: true,
    closeIcon: "dialog-close",
    height: 256,
    mask: true,
    maskClosable: true,
    width: 480
  },
  dropdown: {
    autoAdjust: true,
    destroyOnHide: false,
    offset: [0, 4],
    placement: "bottomStart",
    showArrow: false,
    trigger: "hover"
  },
  empty: {},
  form: {
    colonless: false,
    labelAlign: "end",
    layout: "horizontal",
    size: "md",
    labelTooltipIcon: "question-circle",
    controlTooltipIcon: "info-circle"
  },
  icon: {},
  input: {
    borderless: false,
    clearable: false,
    clearIcon: "close-circle",
    size: "md",
    trim: false
  },
  inputNumber: {
    keyboard: true,
    size: "md"
  },
  list: {
    size: "md",
    borderless: true
  },
  loadingBar: {
    mask: false,
    animation: {
      loading: {
        duration: 3e3,
        progress: 80
      },
      finish: {
        duration: 300,
        progress: 100
      },
      error: {
        duration: 400,
        progress: 100
      }
    }
  },
  image: {
    preview: true
  },
  imageViewer: {
    loop: true,
    maskClosable: true,
    zoom: [0.5, 2]
  },
  menu: {
    getKey: "key",
    indent: 16,
    offset: [0, 8],
    suffix: "right",
    theme: "light"
  },
  message: {
    destroyOnHover: false,
    duration: 3e3,
    maxCount: 5,
    icon: {
      success: "check-circle-filled",
      error: "close-circle-filled",
      info: "info-circle-filled",
      warning: "exclamation-circle-filled",
      loading: "loading"
    }
  },
  modal: {
    centered: false,
    closable: true,
    closeIcon: "dialog-close",
    closeOnEsc: true,
    mask: true,
    maskClosable: true
  },
  notification: {
    destroyOnHover: false,
    duration: 4500,
    maxCount: 5,
    offset: 24,
    placement: "topEnd"
  },
  pagination: {
    pageSize: 10,
    pageSizes: [10, 20, 50, 100],
    showQuickJumper: false,
    showSizeChanger: false,
    showTitle: true,
    showTotal: true,
    simple: false,
    size: "md"
  },
  popconfirm: {
    autoAdjust: true,
    delay: 100,
    destroyOnHide: false,
    placement: "top",
    trigger: "click",
    offset: [0, 4]
  },
  popover: {
    autoAdjust: true,
    delay: 100,
    destroyOnHide: false,
    placement: "top",
    showArrow: true,
    trigger: "hover",
    closeIcon: "close",
    offset: [0, 4]
  },
  progress: {
    strokeLinecap: "round",
    size: "md",
    format: (percent) => percent + "%"
  },
  radio: {
    size: "md",
    waveless: false
  },
  rate: {
    allowHalf: false,
    clearable: false,
    count: 5,
    icon: "star-filled",
    size: "md"
  },
  result: {
    status: "info"
  },
  row: {
    wrap: true
  },
  select: {
    borderless: false,
    childrenKey: "children",
    getKey: "key",
    clearIcon: "close-circle",
    labelKey: "label",
    offset: [0, 4],
    overlayMatchWidth: true,
    size: "md",
    suffix: "down"
  },
  skeleton: {
    animated: true
  },
  space: {
    size: 8,
    wrap: true
  },
  spin: {
    tip: "",
    tipAlign: "vertical",
    size: "md"
  },
  statistic: {
    precision: 0,
    formatter: numFormatter
  },
  stepper: {
    clickable: false,
    labelPlacement: "end",
    size: "md"
  },
  switch: {
    size: "md"
  },
  tabs: {
    size: "md"
  },
  table: {
    autoHeight: false,
    borderless: true,
    childrenKey: "children",
    getKey: "key",
    size: "md",
    scrollToTopOnChange: true,
    pagination: {
      position: "bottomEnd"
    },
    columnBase: {
      align: "start",
      sortable: {
        nextTooltip: false,
        orders: ["ascend", "descend"]
      },
      filterable: {
        multiple: true,
        footer: true
      }
    },
    columnExpandable: {
      icon: "right"
    },
    columnSelectable: {
      showIndex: false
    }
  },
  tag: {},
  tagGroup: {
    gap: 8,
    wrap: true
  },
  textarea: {
    autoRows: false,
    clearable: false,
    clearIcon: "close-circle",
    resize: "vertical",
    showCount: false,
    size: "md",
    trim: false
  },
  timePicker: {
    borderless: false,
    clearable: true,
    clearIcon: "close-circle",
    size: "md",
    suffix: "clock-circle",
    allowInput: false,
    format: "HH:mm:ss"
  },
  transfer: {
    getKey: "key",
    clearable: true,
    clearIcon: "clear",
    showSelectAll: true
  },
  tooltip: {
    autoAdjust: true,
    delay: 100,
    destroyOnHide: false,
    offset: [0, 4],
    placement: "top",
    trigger: "hover"
  },
  tree: {
    autoHeight: false,
    blocked: false,
    childrenKey: "children",
    expandIcon: "right",
    draggableIcon: "holder",
    getKey: "key",
    labelKey: "label",
    showLine: false
  },
  treeSelect: {
    borderless: false,
    childrenKey: "children",
    clearIcon: "close-circle",
    labelKey: "label",
    getKey: "key",
    offset: [0, 4],
    overlayMatchWidth: true,
    size: "md",
    suffix: "down"
  },
  upload: {
    multiple: false,
    dragable: false,
    directory: false,
    name: "file",
    withCredentials: false,
    requestMethod: "post"
  },
  uploadFiles: {
    type: "text",
    icon: {
      file: "paper-clip",
      remove: "close",
      retry: "edit"
    }
  }
};
const tokens$1 = Object.keys(defaultConfig$1).map((key) => [key, Symbol(key)]);
const tokenMap$1 = new Map(tokens$1);
const createGlobalConfig$1 = (config) => {
  const install2 = (app2) => {
    const compNames = Object.keys(config);
    compNames.forEach((compName) => {
      const token = tokenMap$1.get(compName);
      const currConfig = cloneDeep(defaultConfig$1[compName]);
      merge$1(currConfig, config[compName]);
      app2.provide(token, currConfig);
    });
  };
  return { install: install2 };
};
function useGlobalConfig$1(compName, config) {
  const token = tokenMap$1.get(compName);
  const currConfig = inject$1(token, defaultConfig$1[compName]);
  if (!config) {
    return currConfig;
  }
  const newConfig = reactive$1(merge$1(cloneDeep(currConfig), config));
  provide$1(token, newConfig);
  return [newConfig, (config2) => merge$1(newConfig, config2)];
}
const waveProps = {};
var Wave = /* @__PURE__ */ defineComponent$1({
  name: "\u0275Wave",
  props: waveProps,
  setup(_, {
    expose
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-wave`);
    const selfRef = ref$1();
    const play = () => {
      nextTick$1(() => {
        if (selfRef.value && selfRef.value.parentElement && selfRef.value.animate) {
          const borderColor = getComputedStyle(selfRef.value.parentElement).borderColor;
          selfRef.value.animate([{
            opacity: 0.6,
            boxShadow: `0 0 1px 0 ${borderColor}`,
            zIndex: 1,
            easing: "cubic-bezier(0, 0, 0.2, 1)"
          }, {
            opacity: 0,
            zIndex: 0,
            boxShadow: `0 0 1px 5px ${borderColor}`
          }], 600);
        }
      });
    };
    expose({
      play
    });
    return () => {
      return createVNode$1("div", {
        "ref": selfRef,
        "aria-hidden": true,
        "class": mergedPrefixCls.value
      }, null);
    };
  }
});
const \u0275Wave = Wave;
function useClickOutside(target, handler, options) {
  const { container = window, exclude = [] } = options || {};
  if (!container) {
    return NoopFunction;
  }
  const shouldListen = ref$1(true);
  let fallback;
  const listener = (evt) => {
    clearTimeout(fallback);
    const targetElement = convertElement(target);
    if (!targetElement || !shouldListen.value) {
      return;
    }
    const eventTarget = evt.target;
    const composedPath = evt.composedPath();
    if (targetElement === eventTarget || composedPath.includes(targetElement) || exclude.some((item) => {
      const element = convertElement(item);
      return element && (element === eventTarget || composedPath.includes(element));
    })) {
      return;
    }
    handler(evt);
  };
  const listenerStops = [
    useEventListener(container, "click", listener, { passive: true, capture: true }),
    useEventListener(
      container,
      "pointerdown",
      (evt) => {
        const targetElement = convertElement(target);
        shouldListen.value = !!targetElement && !evt.composedPath().includes(targetElement);
      },
      { passive: true }
    ),
    useEventListener(
      container,
      "pointerup",
      (evt) => {
        if (evt.button === 0) {
          const path = evt.composedPath();
          evt.composedPath = () => path;
          fallback = setTimeout(() => listener(evt), 50);
        }
      },
      { passive: true }
    )
  ];
  const stop = () => {
    listenerStops.forEach((listenerStop) => listenerStop());
  };
  tryOnScopeDispose(stop);
  return stop;
}
const stopHandleMap = /* @__PURE__ */ new Map();
const createClickOutside = (el, binding) => {
  let stop = stopHandleMap.get(el);
  if (stop) {
    stop();
  }
  if (!binding) {
    return;
  }
  if (isFunction$1(binding)) {
    stop = useClickOutside(el, binding);
  } else {
    const { handler, ...options } = binding;
    stop = useClickOutside(el, handler, options);
  }
  stopHandleMap.set(el, stop);
};
const vClickOutside = {
  mounted(el, binding) {
    createClickOutside(el, binding.value);
  },
  updated(el, binding) {
    createClickOutside(el, binding.value);
  },
  unmounted(el) {
    const stop = stopHandleMap.get(el);
    if (stop) {
      stop();
    }
    stopHandleMap.delete(el);
  }
};
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "x" : "y";
}
function getLengthFromAxis(axis) {
  return axis === "y" ? "height" : "width";
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  const commonAlign = reference[length] / 2 - floating[length] / 2;
  const side = getSide(placement);
  const isVertical = mainAxis === "x";
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  {
    if (platform2 == null) {
      console.error(["Floating UI: `platform` property was not passed to config. If you", "want to use Floating UI on the web, install @floating-ui/dom", "instead of the /core package. Otherwise, you can create your own", "`platform`: https://floating-ui.com/docs/platform"].join(" "));
    }
    if (validMiddleware.filter((_ref) => {
      let {
        name
      } = _ref;
      return name === "autoPlacement" || name === "flip";
    }).length > 1) {
      throw new Error(["Floating UI: duplicate `flip` and/or `autoPlacement` middleware", "detected. This will lead to an infinite loop. Ensure only one of", "either has been passed to the `middleware` array."].join(" "));
    }
    if (!reference || !floating) {
      console.error(["Floating UI: The reference and/or floating element was not defined", "when `computePosition()` was called. Ensure that both elements have", "been created and can be measured."].join(" "));
    }
  }
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x2,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x2,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x2 = nextX != null ? nextX : x2;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    {
      if (resetCount > 50) {
        console.warn(["Floating UI: The middleware lifecycle appears to be running in an", "infinite loop. This is usually caused by a `reset` continually", "being returned without a break condition."].join(" "));
      }
    }
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x2,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x: x2,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getSideObjectFromPadding(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}
async function detectOverflow(middlewareArguments, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = middlewareArguments;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = options;
  const paddingObject = getSideObjectFromPadding(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    ...rects.floating,
    x: x2,
    y
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const min$1 = Math.min;
const max$1 = Math.max;
function within(min$1$1, value, max$1$1) {
  return max$1(min$1$1, min$1(value, max$1$1));
}
const arrow$1 = (options) => ({
  name: "arrow",
  options,
  async fn(middlewareArguments) {
    const {
      element,
      padding = 0
    } = options != null ? options : {};
    const {
      x: x2,
      y,
      placement,
      rects,
      platform: platform2
    } = middlewareArguments;
    if (element == null) {
      {
        console.warn("Floating UI: No `element` was passed to the `arrow` middleware.");
      }
      return {};
    }
    const paddingObject = getSideObjectFromPadding(padding);
    const coords = {
      x: x2,
      y
    };
    const axis = getMainAxisFromPlacement(placement);
    const alignment = getAlignment(placement);
    const length = getLengthFromAxis(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const minProp = axis === "y" ? "top" : "left";
    const maxProp = axis === "y" ? "bottom" : "right";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    if (clientSize === 0) {
      clientSize = rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const min2 = paddingObject[minProp];
    const max2 = clientSize - arrowDimensions[length] - paddingObject[maxProp];
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = within(min2, center, max2);
    const alignmentPadding = alignment === "start" ? paddingObject[minProp] : paddingObject[maxProp];
    const shouldAddOffset = alignmentPadding > 0 && center !== offset2 && rects.reference[length] <= rects.floating[length];
    const alignmentOffset = shouldAddOffset ? center < min2 ? min2 - center : max2 - center : 0;
    return {
      [axis]: coords[axis] - alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2
      }
    };
  }
});
const hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (matched) => hash$1[matched]);
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  let mainAlignmentSide = mainAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return {
    main: mainAlignmentSide,
    cross: getOppositePlacement(mainAlignmentSide)
  };
}
const hash = {
  start: "end",
  end: "start"
};
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (matched) => hash[matched]);
}
const sides = ["top", "right", "bottom", "left"];
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
const flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(middlewareArguments) {
      var _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        flipAlignment = true,
        ...detectOverflowOptions
      } = options;
      const side = getSide(placement);
      const isBasePlacement = side === initialPlacement;
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const {
          main,
          cross
        } = getAlignmentSides(placement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
        overflows.push(overflow[main], overflow[cross]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip$, _middlewareData$flip2;
        const nextIndex = ((_middlewareData$flip$ = (_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) != null ? _middlewareData$flip$ : 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = "bottom";
        switch (fallbackStrategy) {
          case "bestFit": {
            var _overflowsData$map$so;
            const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0].placement;
            if (placement2) {
              resetPlacement = placement2;
            }
            break;
          }
          case "initialPlacement":
            resetPlacement = initialPlacement;
            break;
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
const hide = function(_temp) {
  let {
    strategy = "referenceHidden",
    ...detectOverflowOptions
  } = _temp === void 0 ? {} : _temp;
  return {
    name: "hide",
    async fn(middlewareArguments) {
      const {
        rects
      } = middlewareArguments;
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await detectOverflow(middlewareArguments, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await detectOverflow(middlewareArguments, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
async function convertValueToCoords(middlewareArguments, value) {
  const {
    placement,
    platform: platform2,
    elements
  } = middlewareArguments;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getMainAxisFromPlacement(placement) === "x";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = typeof value === "function" ? value(middlewareArguments) : value;
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset = function(value) {
  if (value === void 0) {
    value = 0;
  }
  return {
    name: "offset",
    options: value,
    async fn(middlewareArguments) {
      const {
        x: x2,
        y
      } = middlewareArguments;
      const diffCoords = await convertValueToCoords(middlewareArguments, value);
      return {
        x: x2 + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }
  };
};
function getCrossAxis(axis) {
  return axis === "x" ? "y" : "x";
}
const shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(middlewareArguments) {
      const {
        x: x2,
        y,
        placement
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x22,
              y: y2
            } = _ref;
            return {
              x: x22,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = options;
      const coords = {
        x: x2,
        y
      };
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const mainAxis = getMainAxisFromPlacement(getSide(placement));
      const crossAxis = getCrossAxis(mainAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = within(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = within(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...middlewareArguments,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x2,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
function getWindow(node) {
  var _node$ownerDocument;
  return ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeName(node) {
  return isNode(node) ? (node.nodeName || "").toLowerCase() : "";
}
let uaString;
function getUAString() {
  if (uaString) {
    return uaString;
  }
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    uaString = uaData.brands.map((item) => item.brand + "/" + item.version).join(" ");
    return uaString;
  }
  return navigator.userAgent;
}
function isHTMLElement(value) {
  return value instanceof getWindow(value).HTMLElement;
}
function isElement(value) {
  return value instanceof getWindow(value).Element;
}
function isNode(value) {
  return value instanceof getWindow(value).Node;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const isFirefox = /firefox/i.test(getUAString());
  const css = getComputedStyle$1(element);
  const backdropFilter = css.backdropFilter || css.WebkitBackdropFilter;
  return css.transform !== "none" || css.perspective !== "none" || (backdropFilter ? backdropFilter !== "none" : false) || isFirefox && css.willChange === "filter" || isFirefox && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective"].some((value) => css.willChange.includes(value)) || ["paint", "layout", "strict", "content"].some(
    (value) => {
      const contain = css.contain;
      return contain != null ? contain.includes(value) : false;
    }
  );
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
const min = Math.min;
const max = Math.max;
const round = Math.round;
const FALLBACK_SCALE = {
  x: 1,
  y: 1
};
function getScale(element) {
  const domElement = !isElement(element) && element.contextElement ? element.contextElement : isElement(element) ? element : null;
  if (!domElement) {
    return FALLBACK_SCALE;
  }
  const rect = domElement.getBoundingClientRect();
  const css = getComputedStyle$1(domElement);
  if (css.boxSizing !== "border-box") {
    if (!isHTMLElement(domElement)) {
      return FALLBACK_SCALE;
    }
    return {
      x: domElement.offsetWidth > 0 ? round(rect.width) / domElement.offsetWidth || 1 : 1,
      y: domElement.offsetHeight > 0 ? round(rect.height) / domElement.offsetHeight || 1 : 1
    };
  }
  let x2 = rect.width / parseFloat(css.width);
  let y = rect.height / parseFloat(css.height);
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x: x2,
    y
  };
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  var _win$visualViewport$o, _win$visualViewport, _win$visualViewport$o2, _win$visualViewport2;
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  let scale = FALLBACK_SCALE;
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const win = isElement(element) ? getWindow(element) : window;
  const addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  const x2 = (clientRect.left + (addVisualOffsets ? (_win$visualViewport$o = (_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) != null ? _win$visualViewport$o : 0 : 0)) / scale.x;
  const y = (clientRect.top + (addVisualOffsets ? (_win$visualViewport$o2 = (_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) != null ? _win$visualViewport$o2 : 0 : 0)) / scale.y;
  const width = clientRect.width / scale.x;
  const height = clientRect.height / scale.y;
  return {
    width,
    height,
    top: y,
    right: x2 + width,
    bottom: y + height,
    left: x2,
    x: x2,
    y
  };
}
function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const rect = getBoundingClientRect(element, true, strategy === "fixed", offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = node.assignedSlot || node.parentNode || (isShadowRoot(node) ? node.host : null) || getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function getOffsetParent(element) {
  const window2 = getWindow(element);
  let offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getDimensions(element) {
  if (isHTMLElement(element)) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
  const rect = getBoundingClientRect(element);
  return {
    width: rect.width,
    height: rect.height
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = {
    x: 1,
    y: 1
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2,
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  const width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  const height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x2 += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x: x2,
    y
  };
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : {
    x: 1,
    y: 1
  };
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y = top * scale.y;
  return {
    top: y,
    left: x2,
    right: x2 + width,
    bottom: y + height,
    x: x2,
    y,
    width,
    height
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  if (clippingAncestor === "viewport") {
    return rectToClientRect(getViewportRect(element, strategy));
  }
  if (isElement(clippingAncestor)) {
    return getInnerBoundingClientRect(clippingAncestor, strategy);
  }
  return rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const containingBlock = isContainingBlock(currentNode);
    const shouldDropCurrentNode = elementIsFixed ? !containingBlock && !currentContainingBlockComputedStyle : !containingBlock && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
const platform = {
  getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement,
  getDimensions,
  getOffsetParent,
  getDocumentElement,
  getScale,
  async getElementRects(_ref) {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    return {
      reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
      floating: {
        x: 0,
        y: 0,
        ...await getDimensionsFn(floating)
      }
    };
  },
  getClientRects: (element) => Array.from(element.getClientRects()),
  isRTL: (element) => getComputedStyle$1(element).direction === "rtl"
};
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll: _ancestorScroll = true,
    ancestorResize = true,
    elementResize = true,
    animationFrame = false
  } = options;
  const ancestorScroll = _ancestorScroll && !animationFrame;
  const ancestors = ancestorScroll || ancestorResize ? [...isElement(reference) ? getOverflowAncestors(reference) : reference.contextElement ? getOverflowAncestors(reference.contextElement) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  let observer = null;
  if (elementResize) {
    let initialUpdate = true;
    observer = new ResizeObserver(() => {
      if (!initialUpdate) {
        update();
      }
      initialUpdate = false;
    });
    isElement(reference) && !animationFrame && observer.observe(reference);
    if (!isElement(reference) && reference.contextElement && !animationFrame) {
      observer.observe(reference.contextElement);
    }
    observer.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _observer;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    (_observer = observer) == null ? void 0 : _observer.disconnect();
    observer = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
const defaultDelay = 0;
function usePopperOptions$1(options) {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const popperOptions = reactive$1({
    allowEnter: (_a2 = options.allowEnter) != null ? _a2 : true,
    autoAdjust: (_b = options.autoAdjust) != null ? _b : true,
    delay: (_c = options.delay) != null ? _c : defaultDelay,
    disabled: (_d = options.disabled) != null ? _d : false,
    offset: (_e = options.offset) != null ? _e : [0, 0],
    placement: (_f = options.placement) != null ? _f : "top",
    trigger: (_g = options.trigger) != null ? _g : "hover",
    visible: (_h = options.visible) != null ? _h : false,
    strategy: (_i = options.strategy) != null ? _i : "absolute",
    middlewares: (_j = options.middlewares) != null ? _j : []
  });
  const updateOptions = (options2) => {
    Object.entries(options2).forEach(([key, value]) => {
      if (value !== void 0 && !isEqual(value, popperOptions[key])) {
        popperOptions[key] = value;
      }
    });
  };
  if (isReactive$1(options)) {
    watch$1(options, (_options) => {
      updateOptions(_options);
    });
  }
  return {
    popperOptions,
    updateOptions
  };
}
function useBaseOptions(options) {
  return computed$2(() => {
    const { placement, strategy, middlewares, offset: offset2, autoAdjust } = options;
    return { placement, strategy, middlewares, offset: offset2, autoAdjust };
  });
}
function useDelay(options) {
  const convertDelay = (delay) => {
    if (Array.isArray(delay)) {
      const [show, hide2] = delay;
      return { show: show != null ? show : defaultDelay, hide: hide2 != null ? hide2 : defaultDelay };
    }
    return { show: delay, hide: delay };
  };
  return computed$2(() => convertDelay(options.delay));
}
function useInstance(triggerRef, popperRef, options) {
  const updatePopperPosition = (state) => {
    const popperEl = convertElement(popperRef.value);
    const { x: x2, y, strategy } = state;
    if (popperEl) {
      Object.assign(popperEl.style, {
        position: strategy,
        left: `${x2}px`,
        top: `${y}px`
      });
    }
  };
  const update = async () => {
    const triggerEl = convertElement(triggerRef.value);
    const popperEl = convertElement(popperRef.value);
    if (!triggerEl || !popperEl) {
      return;
    }
    const state = await computePosition(triggerEl, popperEl, options.value);
    state && updatePopperPosition(state);
  };
  let cleanUpHandler = null;
  const initialize = () => {
    const triggerEl = convertElement(triggerRef.value);
    const popperEl = convertElement(popperRef.value);
    if (!triggerEl || !popperEl) {
      return;
    }
    cleanUpHandler == null ? void 0 : cleanUpHandler();
    Object.assign(popperEl.style, {
      position: "absolute",
      left: 0,
      top: 0
    });
    cleanUpHandler = autoUpdate(triggerEl, popperEl, () => {
      update();
    });
  };
  const watchStopHandlers = [
    watch$1([triggerRef, popperRef], initialize, { immediate: true }),
    watch$1(options, update, { immediate: true })
  ];
  const destroy = () => {
    watchStopHandlers.forEach((handler) => handler());
    cleanUpHandler == null ? void 0 : cleanUpHandler();
  };
  return {
    update,
    destroy
  };
}
function usePlacement(options) {
  const _placement = ref$1(options.placement);
  const updatePlacement2 = (value) => {
    _placement.value = value;
  };
  watch$1(() => options.placement, updatePlacement2);
  const placement = computed$2(() => _placement.value);
  return { placement, updatePlacement: updatePlacement2 };
}
function usePopperEvents(baseOptions, eventOptions) {
  const { show, hide: hide2 } = eventOptions;
  const onMouseenter = () => show();
  const onMouseleave = () => hide2();
  const eventsMap = {
    click: NoopObject,
    focus: NoopObject,
    hover: { onMouseenter, onMouseleave },
    contextmenu: NoopObject,
    manual: NoopObject
  };
  return computed$2(() => baseOptions.allowEnter ? eventsMap[baseOptions.trigger] : NoopObject);
}
function useTimer() {
  let timer = null;
  const setTimer = (action, delay) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(action, delay);
  };
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return { setTimer, clearTimer };
}
function useTriggerEvents(baseOptions, eventOptions) {
  const { visibility, show, hide: hide2 } = eventOptions;
  const onMouseenter = () => show();
  const onMouseleave = () => hide2();
  const onFocus = () => show();
  const onBlur = () => hide2();
  const onClick = () => {
    const { trigger: trigger2 } = baseOptions;
    if (trigger2 === "click") {
      visibility.value ? hide2() : show();
    } else if (trigger2 === "contextmenu") {
      visibility.value && hide2();
    }
  };
  const onContextmenu = (evt) => {
    evt.preventDefault();
    show();
  };
  const eventsMap = {
    hover: { onMouseenter, onMouseleave },
    focus: { onFocus, onBlur },
    click: { onClick },
    contextmenu: { onClick, onContextmenu },
    manual: {}
  };
  return computed$2(() => eventsMap[baseOptions.trigger]);
}
function useVisibility(options) {
  return computed$2(() => !options.disabled && options.visible);
}
function arrow(arrowElement) {
  const { fn: arrowFn, ...rest } = arrow$1({ element: arrowElement, padding: 4 });
  return {
    ...rest,
    name: "IDUX_arrow",
    async fn(middlewareArguments) {
      const res = await arrowFn(middlewareArguments);
      const {
        data: { x: x2, y }
      } = res;
      Object.assign(arrowElement.style, {
        left: x2 != null ? `${x2}px` : "",
        top: y != null ? `${y}px` : ""
      });
      return res;
    }
  };
}
function referenceHidden() {
  const { fn: hideFn, ...rest } = hide();
  return {
    ...rest,
    name: "IDUX_referenceHidden",
    async fn(middlewareArguments) {
      const {
        elements: { floating }
      } = middlewareArguments;
      const res = await hideFn(middlewareArguments);
      const {
        data: { referenceHidden: referenceHidden2 }
      } = res;
      if (referenceHidden2) {
        floating.setAttribute("data-popper-reference-hidden", "");
      } else {
        floating.removeAttribute("data-popper-reference-hidden");
      }
      return res;
    }
  };
}
function updatePlacement(updatePlacement2) {
  return {
    name: "IDUX_updatePlacement",
    fn(middlewareArguments) {
      const {
        placement,
        elements: { floating }
      } = middlewareArguments;
      updatePlacement2(camelCase$1(placement));
      floating.setAttribute("data-popper-placement", placement);
      return middlewareArguments;
    }
  };
}
function convertOptions(baseOptions, extraOptions) {
  const { placement, strategy, middlewares, offset: offset$1, autoAdjust } = baseOptions;
  const { arrowElement, updatePlacement: _updatePlacement } = extraOptions;
  return {
    placement: kebabCase$1(placement),
    strategy,
    middleware: [
      autoAdjust && flip({ padding: 4 }),
      autoAdjust && shift(),
      !!arrowElement && arrow(arrowElement),
      offset({
        mainAxis: offset$1[1],
        crossAxis: offset$1[0]
      }),
      referenceHidden(),
      updatePlacement(_updatePlacement),
      ...middlewares
    ].filter(Boolean)
  };
}
function usePopper(options = {}) {
  let popperInstance;
  const triggerRef = ref$1();
  const popperRef = ref$1();
  const arrowRef = ref$1();
  const { popperOptions, updateOptions } = usePopperOptions$1(options);
  const baseOptions = useBaseOptions(popperOptions);
  const convertedOptions = computed$2(
    () => convertOptions(baseOptions.value, { arrowElement: convertElement(arrowRef), updatePlacement: updatePlacement2 })
  );
  const visibility = useVisibility(popperOptions);
  const { placement, updatePlacement: updatePlacement2 } = usePlacement(popperOptions);
  const delay = useDelay(popperOptions);
  const { setTimer, clearTimer } = useTimer();
  const triggerEvents = useTriggerEvents(popperOptions, { visibility, show, hide: hide2 });
  const popperEvents = usePopperEvents(popperOptions, { show, hide: hide2 });
  function toggle(visible, delay2) {
    clearTimer();
    const action = () => {
      popperOptions.visible = visible;
    };
    if (delay2 > 0) {
      setTimer(action, delay2);
    } else {
      action();
    }
  }
  function show(showDelay = delay.value.show) {
    toggle(true, showDelay);
  }
  function hide2(hideDelay = delay.value.hide) {
    toggle(false, hideDelay);
  }
  function update(options2) {
    if (options2) {
      updateOptions(options2);
      return;
    }
    popperInstance == null ? void 0 : popperInstance.update();
  }
  function initialize() {
    destroy();
    popperInstance = useInstance(triggerRef, popperRef, convertedOptions);
  }
  function destroy() {
    clearTimer();
    if (!popperInstance) {
      return;
    }
    popperInstance.destroy();
    popperInstance = null;
  }
  watch$1(visibility, (value) => {
    if (value) {
      clearTimer();
      popperInstance == null ? void 0 : popperInstance.update();
    }
  });
  return {
    visibility,
    placement,
    triggerRef,
    triggerEvents,
    popperRef,
    popperEvents,
    arrowRef,
    initialize,
    show,
    hide: hide2,
    update,
    destroy
  };
}
const portalProps = {
  disabled: { type: Boolean, default: void 0 },
  target: {
    type: [String, HTMLElement, Function],
    required: true
  },
  load: { type: Boolean, default: true }
};
var Portal = /* @__PURE__ */ defineComponent$1({
  name: "CdkPortal",
  props: portalProps,
  setup(props, {
    slots
  }) {
    const loaded = ref$1(props.load);
    watch$1(() => props.load, (load) => {
      if (!loaded.value) {
        loaded.value = load;
      }
    });
    const elementRef = computed$2(() => convertTargetElement(props.target));
    return () => {
      if (!loaded.value) {
        return null;
      }
      return createVNode$1(Teleport$1, {
        "to": elementRef.value,
        "disabled": props.disabled
      }, {
        default: () => [slots.default && slots.default()]
      });
    };
  }
});
function convertTargetElement(target) {
  const elementOrSelector = isFunction$1(target) ? target() : target;
  if (!isString$1(elementOrSelector)) {
    return elementOrSelector;
  }
  return getTargetElement(elementOrSelector);
}
function getTargetElement(selector) {
  let element = document.querySelector(selector);
  if (element) {
    return element;
  }
  const selectorType = selector.startsWith(".") ? "class" : selector.startsWith("#") ? "id" : void 0;
  if (!selectorType) {
    Logger.warn("cdk/portal", "the selector of target supports only simple id or class");
    element = document.querySelector(`.${selector}`);
    if (element) {
      return element;
    }
  }
  const attrName = selectorType || "class";
  const attrValue = selectorType ? selector.substring(1) : selector;
  return createDivElement(attrName, attrValue);
}
function createDivElement(attrName, attrValue) {
  const element = document.createElement("div");
  element.setAttribute(attrName, attrValue);
  document.body.appendChild(element);
  return element;
}
const CdkPortal = Portal;
function convertTarget(target) {
  const temp = isFunction$1(target) ? target() : target;
  if (isString$1(temp)) {
    const targetDom = document.querySelector(temp);
    if (targetDom) {
      return targetDom;
    } else {
      Logger.warn("components/utils", `target does not exist: ${target}, default value are already used: window.`);
      return window;
    }
  }
  return temp || window;
}
function convertStringVNode(slots, props, keyOrParams, slotParams) {
  let labelSlot;
  let label;
  const isKey = isString$1(keyOrParams);
  const params = isKey ? slotParams : keyOrParams;
  if (isKey) {
    labelSlot = slots[keyOrParams];
    if (!labelSlot) {
      label = props[keyOrParams];
    }
  } else {
    labelSlot = slots;
    label = props;
  }
  return labelSlot ? labelSlot(params) : label;
}
function usePortalTarget(props, config, common, mergedPrefix) {
  return computed$2(() => {
    var _a2, _b, _c;
    const container = (_b = (_a2 = props.container) != null ? _a2 : config.container) != null ? _b : common.overlayContainer;
    return (_c = isFunction$1(container) ? container() : container) != null ? _c : `.${mergedPrefix.value}-container`;
  });
}
function useKey() {
  var _a2;
  const { vnode, uid: uid2 } = getCurrentInstance();
  return (_a2 = vnode.key) != null ? _a2 : uid2;
}
function useGetKey(props, config, location2) {
  return computed$2(() => {
    const { getKey = config.getKey } = props;
    if (isString$1(getKey)) {
      return (data) => {
        const key = data[getKey];
        if (key === void 0) {
          Logger.warn(location2, "Each item in dataSource should have a unique `key` prop.");
        }
        return key;
      };
    }
    return getKey;
  });
}
let zIndexCount = 0;
const useZIndex = (controlZIndex, configZIndex, visible) => {
  const getZIndex = () => {
    const zIndex = configZIndex.value;
    if (isFunction$1(zIndex)) {
      return zIndex();
    }
    return zIndex + zIndexCount++;
  };
  const innerZIndex = ref$1(0);
  watch$1(
    visible,
    (newVisible) => {
      if (newVisible && isNil(controlZIndex.value)) {
        innerZIndex.value = getZIndex();
      }
    },
    { immediate: true }
  );
  return computed$2(() => {
    var _a2;
    return (_a2 = controlZIndex.value) != null ? _a2 : innerZIndex.value;
  });
};
const overlayPlacementDef = String;
const overlayTriggerDef = String;
const overlayDelayDef = [Number, Array];
const overlayProps = {
  visible: {
    type: Boolean,
    default: void 0
  },
  placement: overlayPlacementDef,
  allowEnter: {
    type: Boolean,
    default: void 0
  },
  autoAdjust: {
    type: Boolean,
    default: void 0
  },
  clickOutside: {
    type: Boolean,
    default: void 0
  },
  container: {
    type: [String, HTMLElement, Function],
    default: void 0
  },
  containerFallback: {
    type: String,
    required: true
  },
  delay: overlayDelayDef,
  destroyOnHide: {
    type: Boolean,
    default: void 0
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  offset: Array,
  showArrow: {
    type: Boolean,
    default: void 0
  },
  transitionName: String,
  trigger: overlayTriggerDef,
  triggerId: { type: null, default: void 0 },
  zIndex: Number,
  "onUpdate:visible": [Function, Array],
  "onUpdate:placement": [Function, Array],
  onAfterLeave: [Function, Array]
};
var Overlay = /* @__PURE__ */ defineComponent$1({
  name: "\u0275Overlay",
  inheritAttrs: false,
  props: overlayProps,
  setup(props, {
    slots,
    attrs,
    expose
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-overlay`);
    const contentArrowRef = ref$1();
    const popperOptions = usePopperOptions(props, contentArrowRef);
    const {
      arrowRef,
      popperRef,
      popperEvents,
      triggerRef,
      triggerEvents,
      visibility,
      placement,
      initialize,
      update,
      show,
      hide: hide2,
      destroy
    } = usePopper({
      ...popperOptions.value,
      visible: props.visible
    });
    const {
      destroy: popperDestroy
    } = usePopperInit(props, initialize, destroy);
    const currentZIndex = useZIndex(toRef(props, "zIndex"), toRef(common, "overlayZIndex"), visibility);
    const mergedContainer = computed$2(() => {
      var _a2;
      const {
        container = common.overlayContainer
      } = props;
      return (_a2 = isFunction$1(container) ? container(convertElement(triggerRef)) : container) != null ? _a2 : props.containerFallback;
    });
    watch$1(visibility, (value) => callEmit(props["onUpdate:visible"], value));
    watch$1(placement, (value) => callEmit(props["onUpdate:placement"], value));
    watch$1(popperOptions, (options) => update(options));
    watch$1(() => props.visible, (visible) => {
      visible ? show() : hide2();
    }, {
      flush: "post"
    });
    watch$1(contentArrowRef, () => {
      arrowRef.value = contentArrowRef.value;
    }, {
      immediate: true
    });
    const onAfterLeave = () => {
      if (props.destroyOnHide) {
        popperDestroy();
      }
      callEmit(props.onAfterLeave);
    };
    expose({
      updatePopper: update
    });
    const handleClickOutside = (evt) => {
      const popperElement = convertElement(popperRef);
      const target = evt.target;
      if (!popperElement || popperElement === target || popperElement.contains(target)) {
        return;
      }
      hide2();
    };
    return () => {
      var _a2, _b;
      const triggerNode = getFirstValidNode((_a2 = slots.default) == null ? void 0 : _a2.call(slots));
      if (!triggerNode) {
        Logger.warn("components/overlay", "Trigger must is single rooted node");
        return null;
      }
      const trigger2 = renderTrigger(props, triggerNode, {
        ref: triggerRef,
        ...triggerEvents.value
      }, handleClickOutside);
      const contentNode = (_b = slots.content) == null ? void 0 : _b.call(slots);
      if (!getFirstValidNode(contentNode)) {
        return createVNode$1(Fragment$1, null, [trigger2, createVNode$1(CdkPortal, {
          "target": mergedContainer.value,
          "load": false
        }, null)]);
      }
      const content = renderContent$1(props, mergedPrefixCls, visibility, currentZIndex, contentNode, contentArrowRef, popperRef, popperEvents, attrs);
      return createVNode$1(Fragment$1, null, [trigger2, createVNode$1(CdkPortal, {
        "target": mergedContainer.value,
        "load": visibility.value
      }, {
        default: () => [createVNode$1(Transition, {
          "appear": true,
          "name": props.transitionName,
          "onAfterLeave": onAfterLeave
        }, {
          default: () => [content]
        })]
      })]);
    };
  }
});
function usePopperOptions(props, arrowRef) {
  return computed$2(() => {
    const {
      allowEnter,
      autoAdjust,
      delay,
      disabled,
      offset: offset2,
      placement,
      trigger: trigger2
    } = props;
    let _offset;
    if (!arrowRef.value) {
      _offset = offset2;
    } else {
      const {
        offsetWidth,
        offsetHeight
      } = arrowRef.value;
      _offset = offset2 ? [...offset2] : [0, 0];
      _offset[1] += [offsetWidth, offsetHeight][1] / 2;
    }
    return {
      allowEnter,
      autoAdjust,
      delay,
      disabled,
      offset: _offset,
      placement,
      trigger: trigger2
    };
  });
}
function usePopperInit(props, initialize, destroy) {
  let initialized = false;
  const _initialize = () => {
    if (initialized) {
      return;
    }
    initialize();
    initialized = true;
  };
  const _destroy = () => {
    if (!initialized) {
      return;
    }
    destroy();
    initialized = false;
  };
  onMounted$1(_initialize);
  onBeforeUnmount$1(_destroy);
  watch$1(() => props.visible, (visible) => {
    if (visible) {
      initialize();
    }
  });
  return {
    initialize: _initialize,
    destroy: _destroy
  };
}
function renderContent$1(props, mergedPrefixCls, visibility, currentZIndex, contentNode, arrowRef, popperRef, popperEvents, attrs) {
  if (props.destroyOnHide && !visibility.value) {
    return null;
  }
  const prefixCls = mergedPrefixCls.value;
  const {
    triggerId
  } = props;
  const overlayId = triggerId != null ? `__IDUX_OVERLAY-${triggerId}` : void 0;
  const style = `z-index: ${currentZIndex.value}`;
  const overlay = createVNode$1("div", mergeProps$1({
    "ref": popperRef,
    "id": overlayId,
    "class": prefixCls,
    "style": style
  }, popperEvents.value, attrs), [contentNode, props.showArrow && createVNode$1("div", {
    "ref": arrowRef,
    "class": `${prefixCls}-arrow`
  }, null)]);
  return props.destroyOnHide ? overlay : withDirectives(overlay, [[vShow, visibility.value]]);
}
function renderTrigger(props, triggerNode, extraProps, handleClickOutside) {
  const element = cloneVNode$1(triggerNode, extraProps, true);
  if (props.clickOutside) {
    return withDirectives(element, [[vClickOutside, handleClickOutside]]);
  }
  return element;
}
const \u0275Overlay = Overlay;
const tooltipProps = {
  visible: { type: Boolean, default: void 0 },
  autoAdjust: { type: Boolean, default: void 0 },
  closeOnDeactivated: { type: Boolean, default: true },
  destroyOnHide: { type: Boolean, default: void 0 },
  delay: overlayDelayDef,
  disabled: { type: Boolean, default: false },
  offset: Array,
  overlayContainer: {
    type: [String, HTMLElement, Function],
    default: void 0
  },
  placement: overlayPlacementDef,
  title: String,
  trigger: overlayTriggerDef,
  zIndex: Number,
  "onUpdate:visible": [Function, Array]
};
function useTooltipOverlay(props, config, mergedPrefixCls) {
  const overlayRef = ref$1();
  const updatePopper = () => {
    var _a2;
    return (_a2 = overlayRef.value) == null ? void 0 : _a2.updatePopper();
  };
  const [visible, setVisible] = useControlledProp(props, "visible", false);
  onDeactivated$1(() => {
    if (visible.value && props.closeOnDeactivated) {
      setVisible(false);
    }
  });
  const overlayProps2 = computed$2(() => {
    var _a2, _b, _c, _d, _e, _f, _g;
    const trigger2 = (_a2 = props.trigger) != null ? _a2 : config.trigger;
    return {
      visible: visible.value,
      ["onUpdate:visible"]: setVisible,
      autoAdjust: (_b = props.autoAdjust) != null ? _b : config.autoAdjust,
      clickOutside: trigger2 === "click" || trigger2 === "contextmenu",
      container: (_c = props.overlayContainer) != null ? _c : config.overlayContainer,
      containerFallback: `.${mergedPrefixCls.value}-overlay-container`,
      delay: (_d = props.delay) != null ? _d : config.delay,
      destroyOnHide: (_e = props.destroyOnHide) != null ? _e : config.destroyOnHide,
      disabled: props.disabled,
      offset: (_f = props.offset) != null ? _f : config.offset,
      showArrow: true,
      placement: (_g = props.placement) != null ? _g : config.placement,
      trigger: trigger2,
      zIndex: props.zIndex
    };
  });
  return { overlayRef, updatePopper, visible, setVisible, overlayProps: overlayProps2 };
}
var Tooltip = /* @__PURE__ */ defineComponent$1({
  name: "IxTooltip",
  props: tooltipProps,
  setup(props, {
    slots,
    expose
  }) {
    const common = useGlobalConfig$1("common");
    const config = useGlobalConfig$1("tooltip");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-tooltip`);
    const {
      overlayRef,
      updatePopper,
      overlayProps: overlayProps2
    } = useTooltipOverlay(props, config, mergedPrefixCls);
    expose({
      updatePopper
    });
    return () => {
      const prefixCls = mergedPrefixCls.value;
      return createVNode$1(\u0275Overlay, mergeProps$1({
        "ref": overlayRef,
        "class": prefixCls,
        "transitionName": `${common.prefixCls}-fade-fast`
      }, overlayProps2.value), {
        default: slots.default,
        content: () => renderContent(props, slots, prefixCls)
      });
    };
  }
});
const renderContent = (props, slots, prefixCls) => {
  if (!(slots.title || props.title)) {
    return null;
  }
  return createVNode$1("div", {
    "class": `${prefixCls}-wrapper`
  }, [slots.title ? slots.title() : props.title]);
};
const IxTooltip = Tooltip;
function isFakeMousedownFromScreenReader(event) {
  return event.offsetX === 0 && event.offsetY === 0;
}
function isFakeTouchstartFromScreenReader(event) {
  const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
  return !!touch && touch.identifier === -1 && (touch.radiusX == null || touch.radiusX === 1) && (touch.radiusY == null || touch.radiusY === 1);
}
const INPUT_MODALITY_DETECTOR_OPTIONS_TOKEN = Symbol(
  "cdk-input-modality-detector-options"
);
const INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS = {
  ignoreCodes: ["AltLeft", "AltRight", "ControlLeft", "ControlRight", "OSLeft", "OSRight", "ShiftLeft", "ShiftRight"]
};
const TOUCH_BUFFER_MS = 650;
const modalityEventListenerOptions = normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
function useInputModalityDetector(options) {
  const contextOptions = inject$1(INPUT_MODALITY_DETECTOR_OPTIONS_TOKEN, INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS);
  const _options = { ...contextOptions, ...options };
  const _modality = ref$1(null);
  const _modalityDetected = customRef((track2, trigger2) => {
    let value = null;
    return {
      get() {
        track2();
        return value;
      },
      set(newValue) {
        value = newValue;
        trigger2();
      }
    };
  });
  const changeModality = (value) => {
    _modality.value = value;
    _modalityDetected.value = value;
  };
  const _target = ref$1(null);
  let _lastTouchMs = 0;
  const _onKeydown = (event) => {
    var _a2;
    if ((_a2 = _options.ignoreCodes) == null ? void 0 : _a2.some((code) => code === event.code)) {
      return;
    }
    changeModality("keyboard");
    _target.value = _getEventTarget(event);
  };
  const _onMousedown = (event) => {
    if (Date.now() - _lastTouchMs < TOUCH_BUFFER_MS) {
      return;
    }
    changeModality(isFakeMousedownFromScreenReader(event) ? "keyboard" : "mouse");
    _target.value = _getEventTarget(event);
  };
  const _onTouchstart = (event) => {
    if (isFakeTouchstartFromScreenReader(event)) {
      changeModality("keyboard");
      return;
    }
    _lastTouchMs = Date.now();
    changeModality("touch");
    _target.value = _getEventTarget(event);
  };
  if (isBrowser$1) {
    document.addEventListener("keydown", _onKeydown, modalityEventListenerOptions);
    document.addEventListener("mousedown", _onMousedown, modalityEventListenerOptions);
    document.addEventListener("touchstart", _onTouchstart, modalityEventListenerOptions);
  }
  tryOnScopeDispose(() => {
    if (isBrowser$1) {
      document.removeEventListener("keydown", _onKeydown, modalityEventListenerOptions);
      document.removeEventListener("mousedown", _onMousedown, modalityEventListenerOptions);
      document.removeEventListener("touchstart", _onTouchstart, modalityEventListenerOptions);
    }
  });
  return {
    modality: _modality,
    modalityDetected: _modalityDetected,
    target: _target
  };
}
const useSharedInputModalityDetector = createSharedComposable(() => useInputModalityDetector());
const FOCUS_MONITOR_OPTIONS_TOKEN = Symbol("cdk-focus-monitor-options");
const FOCUS_MONITOR_DEFAULT_OPTIONS = {
  detectionMode: "immediate"
};
const captureEventListenerOptions = normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
function useFocusMonitor(options) {
  var _a2;
  const contextOptions = inject$1(FOCUS_MONITOR_OPTIONS_TOKEN, FOCUS_MONITOR_DEFAULT_OPTIONS);
  const _options = { ...contextOptions, ...options };
  const _detectionMode = _options.detectionMode;
  const _inputModalityDetector = (_a2 = _options.inputModalityDetector) != null ? _a2 : useSharedInputModalityDetector();
  let _origin = null;
  let _lastFocusOrigin;
  let _windowFocused = false;
  let _windowFocusTimeoutId;
  let _originTimeoutId;
  let _originFromTouchInteraction = false;
  const _elementInfo = /* @__PURE__ */ new Map();
  let _monitoredElementCount = 0;
  const _rootNodeFocusListenerCount = /* @__PURE__ */ new Map();
  const _windowFocusListener = () => {
    _windowFocused = true;
    _windowFocusTimeoutId = setTimeout(() => _windowFocused = false);
  };
  let _stopInputModalityDetector = null;
  const _rootNodeFocusAndBlurListener = (event) => {
    const target = _getEventTarget(event);
    const handler = event.type === "focus" ? _onFocus : _onBlur;
    for (let element = target; element; element = element.parentElement) {
      handler(event, element);
    }
  };
  function monitor(element, checkChildren = false) {
    const nativeElement = convertElement(element);
    if (!isBrowser$1 || !nativeElement || nativeElement.nodeType !== 1) {
      return computed$2(() => ({ origin: null }));
    }
    const rootNode = _getShadowRoot(nativeElement) || _getDocument();
    const cachedInfo = _elementInfo.get(nativeElement);
    if (cachedInfo) {
      if (checkChildren) {
        cachedInfo.checkChildren = true;
      }
      return computed$2(() => cachedInfo.subject.value);
    }
    const info2 = {
      checkChildren,
      subject: shallowRef({ origin: null }),
      rootNode
    };
    _elementInfo.set(nativeElement, info2);
    _registerGlobalListeners(info2);
    return computed$2(() => info2.subject.value);
  }
  function stopMonitoring(element) {
    const nativeElement = convertElement(element);
    if (!nativeElement) {
      return;
    }
    const elementInfo = _elementInfo.get(nativeElement);
    if (elementInfo) {
      _setClasses(nativeElement);
      _elementInfo.delete(nativeElement);
      _removeGlobalListeners(elementInfo);
    }
  }
  function focusVia(element, origin, options2) {
    const nativeElement = convertElement(element);
    const focusedElement = _getDocument().activeElement;
    if (nativeElement === focusedElement) {
      _getClosestElementsInfo(nativeElement).forEach(
        ([currentElement, info2]) => _originChanged(currentElement, origin, info2)
      );
    } else {
      _setOrigin(origin);
      if (nativeElement && typeof nativeElement.focus === "function") {
        nativeElement.focus(options2);
      }
    }
  }
  function blurVia(element) {
    const nativeElement = convertElement(element);
    if (!nativeElement) {
      return;
    }
    const focusedElement = _getDocument().activeElement;
    if (nativeElement === focusedElement && typeof nativeElement.blur === "function") {
      nativeElement.blur();
    }
  }
  function _getDocument() {
    return document;
  }
  function _getWindow() {
    const doc2 = _getDocument();
    return doc2.defaultView || window;
  }
  function _toggleClass(element, className, shouldSet) {
    if (shouldSet) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }
  function _getFocusOrigin(focusEventTarget) {
    if (_origin) {
      if (_originFromTouchInteraction) {
        return _shouldBeAttributedToTouch(focusEventTarget) ? "touch" : "program";
      } else {
        return _origin;
      }
    }
    return _windowFocused && _lastFocusOrigin ? _lastFocusOrigin : "program";
  }
  function _shouldBeAttributedToTouch(focusEventTarget) {
    return _detectionMode === "eventual" || !!(focusEventTarget == null ? void 0 : focusEventTarget.contains(_inputModalityDetector.target.value));
  }
  function _setClasses(element, origin) {
    _toggleClass(element, "cdk-focused", !!origin);
    _toggleClass(element, "cdk-touch-focused", origin === "touch");
    _toggleClass(element, "cdk-keyboard-focused", origin === "keyboard");
    _toggleClass(element, "cdk-mouse-focused", origin === "mouse");
    _toggleClass(element, "cdk-program-focused", origin === "program");
  }
  function _setOrigin(origin, isFromInteraction = false) {
    _origin = origin;
    _originFromTouchInteraction = origin === "touch" && isFromInteraction;
    if (_detectionMode === "immediate") {
      clearTimeout(_originTimeoutId);
      const ms = _originFromTouchInteraction ? TOUCH_BUFFER_MS : 1;
      _originTimeoutId = setTimeout(() => _origin = null, ms);
    }
  }
  function _onFocus(event, element) {
    const elementInfo = _elementInfo.get(element);
    const focusEventTarget = _getEventTarget(event);
    if (!elementInfo || !elementInfo.checkChildren && element !== focusEventTarget) {
      return;
    }
    _originChanged(element, _getFocusOrigin(focusEventTarget), elementInfo, event);
  }
  function _onBlur(event, element) {
    const elementInfo = _elementInfo.get(element);
    if (!elementInfo || elementInfo.checkChildren && event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) {
      return;
    }
    _setClasses(element);
    _emitOrigin(elementInfo.subject, null, event);
  }
  function _emitOrigin(subject, origin, event) {
    subject.value = { origin, event };
  }
  function _registerGlobalListeners(elementInfo) {
    if (!isBrowser$1) {
      return;
    }
    const rootNode = elementInfo.rootNode;
    const rootNodeFocusListeners = _rootNodeFocusListenerCount.get(rootNode) || 0;
    if (!rootNodeFocusListeners) {
      rootNode.addEventListener("focus", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
      rootNode.addEventListener("blur", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
    }
    _rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners + 1);
    if (++_monitoredElementCount === 1) {
      const window2 = _getWindow();
      window2.addEventListener("focus", _windowFocusListener);
      _stopInputModalityDetector = watchEffect(() => {
        _setOrigin(_inputModalityDetector.modalityDetected.value, true);
      });
    }
  }
  function _removeGlobalListeners(elementInfo) {
    const rootNode = elementInfo.rootNode;
    if (_rootNodeFocusListenerCount.has(rootNode)) {
      const rootNodeFocusListeners = _rootNodeFocusListenerCount.get(rootNode);
      if (rootNodeFocusListeners > 1) {
        _rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners - 1);
      } else {
        rootNode.removeEventListener("focus", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
        rootNode.removeEventListener("blur", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
        _rootNodeFocusListenerCount.delete(rootNode);
      }
    }
    if (!--_monitoredElementCount) {
      const window2 = _getWindow();
      window2.removeEventListener("focus", _windowFocusListener);
      if (_stopInputModalityDetector) {
        _stopInputModalityDetector();
        _stopInputModalityDetector = null;
      }
      clearTimeout(_windowFocusTimeoutId);
      clearTimeout(_originTimeoutId);
    }
  }
  function _originChanged(element, origin, elementInfo, event) {
    _setClasses(element, origin);
    _emitOrigin(elementInfo.subject, origin, event);
    _lastFocusOrigin = origin;
  }
  function _getClosestElementsInfo(element) {
    const results = [];
    _elementInfo.forEach((info2, currentElement) => {
      if (currentElement === element || info2.checkChildren && currentElement.contains(element)) {
        results.push([currentElement, info2]);
      }
    });
    return results;
  }
  tryOnScopeDispose(() => _elementInfo.forEach((_info, element) => stopMonitoring(element)));
  return { monitor, stopMonitoring, focusVia, blurVia };
}
const useSharedFocusMonitor = createSharedComposable(() => useFocusMonitor());
const FORM_TOKEN = Symbol("FORM_TOKEN");
const FORM_ITEM_TOKEN = Symbol("FORM_ITEM_TOKEN");
function useFormItemRegister(control) {
  const context = inject$1(FORM_ITEM_TOKEN, null);
  if (context) {
    const key = useKey();
    const { registerControl, unregisterControl } = context;
    registerControl(key, control);
    onBeforeUnmount$1(() => unregisterControl(key));
  }
}
function useFormElement() {
  const elementRef = ref$1();
  const focus = (options) => {
    var _a2;
    (_a2 = elementRef.value) == null ? void 0 : _a2.focus(options);
  };
  const blur = () => {
    var _a2;
    return (_a2 = elementRef.value) == null ? void 0 : _a2.blur();
  };
  return { elementRef, focus, blur };
}
function useFormFocusMonitor(options) {
  const focusMonitor = useSharedFocusMonitor();
  const elementRef = ref$1();
  let watchStopHandle;
  watch$1(elementRef, (currElement, prevElement) => {
    if (watchStopHandle) {
      watchStopHandle();
    }
    if (prevElement) {
      focusMonitor.stopMonitoring(prevElement);
    }
    watchStopHandle = watch$1(focusMonitor.monitor(currElement, options.checkChildren), (evt) => {
      const { origin, event } = evt;
      if (event) {
        origin ? options.handleFocus(event) : options.handleBlur(event);
      }
    });
  });
  onBeforeUnmount$1(() => {
    if (watchStopHandle) {
      watchStopHandle();
    }
    focusMonitor.stopMonitoring(elementRef.value);
  });
  const focus = (options2) => focusMonitor.focusVia(elementRef.value, "program", options2);
  const blur = () => focusMonitor.blurVia(elementRef.value);
  return { elementRef, focus, blur };
}
function useFormSize(props, config) {
  const formContext = inject$1(FORM_TOKEN, null);
  return computed$2(() => {
    var _a2, _b;
    return (_b = (_a2 = props.size) != null ? _a2 : formContext == null ? void 0 : formContext.size.value) != null ? _b : config.size;
  });
}
function useFormStatus(props, control) {
  return computed$2(() => {
    if (props.status) {
      return props.status;
    }
    const currControl = control.value;
    if (!currControl || currControl.disabled.value) {
      return void 0;
    }
    const { trigger: trigger2, dirty, blurred, status } = currControl;
    if (trigger2 === "change" && dirty.value || trigger2 === "blur" && blurred.value) {
      return status.value;
    }
    return void 0;
  });
}
const spaceProps = {
  align: String,
  block: {
    type: Boolean,
    default: void 0
  },
  justify: String,
  size: [Number, String, Array],
  separator: String,
  vertical: {
    type: Boolean,
    default: void 0
  },
  wrap: {
    type: Boolean,
    default: void 0
  }
};
const flexGapSupported = supportsFlexGap();
const defaultSizeMap = {
  sm: "8px",
  md: "16px",
  lg: "24px"
};
var Space = /* @__PURE__ */ defineComponent$1({
  name: "IxSpace",
  props: spaceProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-space`);
    const config = useGlobalConfig$1("space");
    const wrap = computed$2(() => {
      var _a2;
      return (_a2 = props.wrap) != null ? _a2 : config.wrap;
    });
    const mergedGaps = computed$2(() => {
      const {
        size: size2 = config.size
      } = props;
      const sizes = Array.isArray(size2) ? size2 : [size2, size2];
      return sizes.map((size22) => defaultSizeMap[size22] || convertCssPixel(size22));
    });
    const classes = computed$2(() => {
      const {
        align,
        justify,
        block,
        vertical
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-align-${align}`]: align,
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-justify-${justify}`]: justify,
        [`${prefixCls}-nowrap`]: !wrap.value,
        [`${prefixCls}-vertical`]: vertical
      });
    });
    const style = computed$2(() => {
      const [rowGap, columnGap] = mergedGaps.value;
      if (flexGapSupported) {
        return `gap: ${rowGap} ${columnGap}`;
      } else {
        return !props.vertical && wrap.value ? `margin-bottom: -${convertCssPixel(rowGap)}` : void 0;
      }
    });
    return () => {
      var _a2;
      const nodes = flattenNode((_a2 = slots.default) == null ? void 0 : _a2.call(slots));
      if (nodes.length === 0) {
        return;
      }
      const prefixCls = mergedPrefixCls.value;
      const children = [];
      const separatorNode = convertStringVNode(slots, props, "separator");
      const lastIndex = nodes.length - 1;
      nodes.forEach((node, index) => {
        const style2 = calcItemStyle(mergedGaps, wrap, props.vertical, index, lastIndex);
        children.push(createVNode$1("div", {
          "key": `item-${index}`,
          "class": `${prefixCls}-item`,
          "style": style2
        }, [node]));
        if (separatorNode && index < lastIndex) {
          children.push(createVNode$1("div", {
            "key": `separator-${index}`,
            "class": `${prefixCls}-item-separator`,
            "style": style2
          }, [separatorNode]));
        }
      });
      return createVNode$1("div", {
        "class": classes.value,
        "style": style.value
      }, [children]);
    };
  }
});
const calcItemStyle = (mergedGaps, wrap, vertical, index, lastIndex) => {
  if (flexGapSupported) {
    return void 0;
  }
  const [rowGap, columnGap] = mergedGaps.value;
  if (vertical) {
    const marginBottom = index < lastIndex ? convertCssPixel(rowGap) : void 0;
    return {
      marginBottom
    };
  } else {
    const marginRight = index < lastIndex ? convertCssPixel(columnGap) : void 0;
    const paddingBottom = wrap.value ? convertCssPixel(rowGap) : void 0;
    return {
      marginRight,
      paddingBottom
    };
  }
};
const IxSpace = Space;
const buttonToken = Symbol("button");
const buttonProps = {
  block: { type: Boolean, default: void 0 },
  danger: { type: Boolean, default: void 0 },
  disabled: { type: Boolean, default: void 0 },
  ghost: { type: Boolean, default: void 0 },
  icon: String,
  loading: { type: Boolean, default: void 0 },
  mode: String,
  size: String,
  shape: String,
  type: { type: String, default: "button" },
  waveless: { type: Boolean, default: void 0 },
  onClick: [Function, Array]
};
const aProps = ["href", "target", "rel", "download", "hreflang", "ping"];
var Button = /* @__PURE__ */ defineComponent$1({
  name: "IxButton",
  props: buttonProps,
  setup(props, {
    slots,
    attrs
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-button`);
    const config = useGlobalConfig$1("button");
    const groupProps = inject$1(buttonToken, {});
    const formContext = inject$1(FORM_TOKEN, null);
    const waveRef = ref$1();
    const mode = computed$2(() => {
      var _a2, _b;
      return (_b = (_a2 = props.mode) != null ? _a2 : groupProps.mode) != null ? _b : "default";
    });
    const size2 = computed$2(() => {
      var _a2, _b, _c;
      return (_c = (_b = (_a2 = props.size) != null ? _a2 : groupProps.size) != null ? _b : formContext == null ? void 0 : formContext.size.value) != null ? _c : config.size;
    });
    const mergedWaveless = computed$2(() => {
      var _a2;
      return mode.value === "text" || mode.value === "link" || ((_a2 = props.waveless) != null ? _a2 : config.waveless);
    });
    const classes = computed$2(() => {
      const {
        block = groupProps.block,
        danger = groupProps.danger,
        disabled = groupProps.disabled,
        ghost = groupProps.ghost,
        loading,
        icon,
        shape = groupProps.shape
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-danger`]: danger,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-ghost`]: ghost,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-icon-only`]: !slots.default && (icon || loading || slots.icon),
        [`${prefixCls}-${mode.value}`]: mode.value,
        [`${prefixCls}-${shape}`]: !!shape,
        [`${prefixCls}-${size2.value}`]: true
      });
    });
    const handleClick = (evt) => {
      if (props.disabled || props.loading) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        return;
      }
      if (!mergedWaveless.value && waveRef.value) {
        waveRef.value.play();
      }
      callEmit(props.onClick, evt);
    };
    return () => {
      const {
        disabled,
        loading,
        icon,
        type
      } = props;
      const children = [];
      if (loading) {
        children.push(createVNode$1(IxIcon, {
          "name": "loading"
        }, null));
      } else if (slots.icon) {
        children.push(slots.icon());
      } else if (icon) {
        children.push(createVNode$1(IxIcon, {
          "name": icon
        }, null));
      }
      if (slots.default) {
        children.push(createVNode$1("span", null, [slots.default()]));
      }
      if (mode.value === "link" && Object.keys(attrs).some((attr) => aProps.includes(attr))) {
        return createVNode$1("a", {
          "class": classes.value,
          "onClick": handleClick
        }, [children]);
      }
      return createVNode$1("button", {
        "class": classes.value,
        "disabled": disabled || loading,
        "type": type,
        "onClick": handleClick
      }, [children, !mergedWaveless.value && createVNode$1(\u0275Wave, {
        "ref": waveRef
      }, null)]);
    };
  }
});
const IxButton = Button;
function makeMap(str, expectsLowerCase) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map2[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
}
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$2.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber$1 = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    const newLength = toNumber$1(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$1(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow$1(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$2(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$2(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow$1(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow$1(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var _a;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys2 = Object.keys(props);
  keys2.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys2.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info2 = ErrorTypeStrings[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info2 ? ` during execution of ${info2}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen2, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen2 = seen2 || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen2, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen2) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen2 = seen2 || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen2, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen2) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen2 = seen2 || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen2, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen2);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen2);
    }
  }
}
function checkRecursiveUpdates(seen2, fn) {
  if (!seen2.has(fn)) {
    seen2.set(fn, 1);
  } else {
    const count = seen2.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn$1(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen2.set(fn, count + 1);
    }
  }
}
let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Set();
{
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      queueJob(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
    }
  }
  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
    }
  };
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (typeof window !== "undefined" && window.HTMLElement && !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app2, version2) {
  emit("app:init", app2, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app2) {
  emit("app:unmount", app2);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook("component:added");
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook("component:updated");
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook("component:removed");
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:start");
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:end");
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit("component:emit", component.appContext.app, component, event, params);
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(toNumber$1);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(render2.length > 1 ? render2(props, true ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit: emit2
      } : { attrs, slots, emit: emit2 }) : render2(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root2 = result;
  let setRoot = void 0;
  if (result.patchFlag > 0 && result.patchFlag & 2048) {
    [root2, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys2 = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root2;
    if (keys2.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys2.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root2 = cloneVNode(root2, fallthroughAttrs);
      } else if (!accessedAttrs && root2.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i = 0, l = allAttrs.length; i < l; i++) {
          const key = allAttrs[i];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn$1(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`);
        }
        if (eventAttrs.length) {
          warn$1(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!isElementRoot(root2)) {
      warn$1(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
    }
    root2 = cloneVNode(root2);
    root2.dirs = root2.dirs ? root2.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!isElementRoot(root2)) {
      warn$1(`Component inside <Transition> renders non-element root node that cannot be animated.`);
    }
    root2.transition = vnode.transition;
  }
  if (setRoot) {
    setRoot(root2);
  } else {
    result = root2;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren);
  if (!childRoot) {
    return [vnode, void 0];
  }
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if ((prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$1(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s) => {
    warn$1(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow$1(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow$1(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen2) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen2 = seen2 || /* @__PURE__ */ new Set();
  if (seen2.has(value)) {
    return value;
  }
  seen2.add(value);
  if (isRef(value)) {
    traverse(value.value, seen2);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen2);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen2);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen2);
    }
  }
  return value;
}
function defineComponent(options) {
  return isFunction(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = { loader: source };
  }
  const {
    loader,
    loadingComponent,
    errorComponent,
    delay = 200,
    timeout,
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve, reject) => {
          const userRetry = () => resolve(retry());
          const userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (!comp) {
        warn$1(`Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.`);
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      if (comp && !isObject(comp) && !isFunction(comp)) {
        throw new Error(`Invalid async component load result: ${comp}`);
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      const instance = currentInstance;
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      const onError = (err) => {
        pendingRequest = null;
        handleError(err, instance, 13, !errorComponent);
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return load().then((comp) => {
          return () => createInnerComp(comp, instance);
        }).catch((err) => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }
      const loaded = ref(false);
      const error2 = ref();
      const delayed = ref(!!delay);
      if (delay) {
        setTimeout(() => {
          delayed.value = false;
        }, delay);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error2.value) {
            const err = new Error(`Async component timed out after ${timeout}ms.`);
            onError(err);
            error2.value = err;
          }
        }, timeout);
      }
      load().then(() => {
        loaded.value = true;
        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          queueJob(instance.parent.update);
        }
      }).catch((err) => {
        onError(err);
        error2.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error2.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error2.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp(comp, parent) {
  const { ref: ref2, props, children, ce } = parent.vnode;
  const vnode = createVNode(comp, props, children);
  vnode.ref = ref2;
  vnode.ce = ce;
  delete parent.vnode.ce;
  return vnode;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
    warn$1(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const NULL_DYNAMIC_COMPONENT = Symbol();
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => shallowReadonly(i.props),
  $attrs: (i) => shallowReadonly(i.attrs),
  $slots: (i) => shallowReadonly(i.slots),
  $refs: (i) => shallowReadonly(i.refs),
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
  $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
  $watch: (i) => instanceWatch.bind(i)
});
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
        markAttrsAccessed();
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn$1(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions$1(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions$1(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (!isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys2)
        needCastKeys.push(...keys2);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match2 = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match2 ? match2[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (currentInstance) {
      warn$1(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      {
        warn$1(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  if (!isKeepAlive(instance.vnode) && true) {
    warn$1(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (isHmrUpdating) {
        extend(slots, children);
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn$1(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else {
          warn$1(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app2;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          if (rootContainer.__vue_app__) {
            warn$1(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer, isSVG);
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          {
            app2._instance = vnode.component;
            devtoolsInitApp(app2, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else {
          warn$1(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app2._container);
          {
            app2._instance = null;
            devtoolsUnmountApp(app2);
          }
          delete app2._container.__vue_app__;
        } else {
          warn$1(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app2;
      }
    };
    return app2;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (!owner) {
    warn$1(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else {
          warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else {
      warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
}
let supported$1;
let perf$1;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf$1.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf$1.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf$1.mark(endTag);
    perf$1.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf$1.clearMarks(startTag);
    perf$1.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf$1.now() : Date.now());
  }
}
function isSupported() {
  if (supported$1 !== void 0) {
    return supported$1;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported$1 = true;
    perf$1 = window.performance;
  } else {
    supported$1 = false;
  }
  return supported$1;
}
function initFeatureFlags() {
  const needWarn = [];
  if (needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else {
          patchStaticNode(n1, n2, container, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else {
          warn$1("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const patchStaticNode = (n1, n2, container, isSVG) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
      if (parentComponent && parentComponent.type.__hmrId) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (isHmrUpdating || patchFlag & 2048) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren(n1, n2);
        } else if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (instance.type.__hmrId) {
      registerHMR(instance);
    }
    {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      {
        startMeasure(instance, `init`);
      }
      setupComponent(instance);
      {
        endMeasure(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            {
              endMeasure(instance, `render`);
            }
            {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          {
            endMeasure(instance, `render`);
          }
          {
            startMeasure(instance, `patch`);
          }
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          hostParentNode(prevTree.el),
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
        {
          devtoolsComponentUpdated(instance);
        }
        {
          popWarningContext();
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
    );
    const update = instance.update = () => effect.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    {
      effect.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
      effect.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
      update.ownerInstance = instance;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if (keyToNewIndexMap.has(nextChild.key)) {
            warn$1(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (isString(targetSelector)) {
    if (!select) {
      warn$1(`Current renderer does not support string target for Teleports. (missing querySelector renderer option)`);
      return null;
    } else {
      const target = select(targetSelector);
      if (!target) {
        warn$1(`Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`);
      }
      return target;
    }
  } else {
    if (!targetSelector && !isTeleportDisabled(props)) {
      warn$1(`Invalid Teleport target: ${targetSelector}`);
    }
    return targetSelector;
  }
};
const TeleportImpl = {
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
    const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (isHmrUpdating) {
      optimized = false;
      dynamicChildren = null;
    }
    if (n1 == null) {
      const placeholder = n2.el = createComment("teleport start");
      const mainAnchor = n2.anchor = createComment("teleport end");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText("");
      if (target) {
        insert(targetAnchor, target);
        isSVG = isSVG || isTargetSVG(target);
      } else if (!disabled) {
        warn$1("Invalid Teleport target on mount:", target, `(${typeof target})`);
      }
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG(target);
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(n2, container, mainAnchor, internals, 1);
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
          if (nextTarget) {
            moveTeleport(n2, nextTarget, null, internals, 0);
          } else {
            warn$1("Invalid Teleport target on update:", target, `(${typeof target})`);
          }
        } else if (wasDisabled) {
          moveTeleport(n2, target, targetAnchor, internals, 1);
        }
      }
    }
    updateCssVars(n2);
  },
  remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
    if (target) {
      hostRemove(targetAnchor);
    }
    if (doRemove || !isTeleportDisabled(props)) {
      hostRemove(anchor);
      if (shapeFlag & 16) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
        }
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, parentAnchor, 2);
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector } }, hydrateChildren) {
  const target = vnode.target = resolveTarget(vnode.props, querySelector);
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          targetAnchor = nextSibling(targetAnchor);
          if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
      }
    }
    updateCssVars(vnode);
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node = vnode.children[0].el;
    while (node !== vnode.targetAnchor) {
      if (node.nodeType === 1)
        node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    n1.shapeFlag &= ~256;
    n2.shapeFlag &= ~512;
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(...args);
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (vnode.key !== vnode.key) {
    warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = createVNodeWithArgsTransform;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!type) {
      warn$1(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  if (shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn$1(`Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
  }
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray$1(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx
  };
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray$1(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a2;
  const Component = instance.type;
  {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn$1(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (!instance.suspense) {
          const name = (_a2 = Component.name) !== null && _a2 !== void 0 ? _a2 : "Anonymous";
          warn$1(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
        {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component.render && instance.render === NOOP && !isSSR) {
    if (Component.template) {
      warn$1(`Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key) {
        markAttrsAccessed();
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (instance.exposed) {
      warn$1(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match2 = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match2) {
      name = match2[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const ssrContextKey = Symbol(`ssrContext`);
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
      warn$1(`Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`);
    }
    return ctx;
  }
};
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function initCustomFormatter() {
  if (typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#0b1bc9" };
  const stringStyle = { style: "color:#b62e24" };
  const keywordStyle = { style: "color:#9d288c" };
  const formatter = {
    header(obj) {
      if (!isObject(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed2 = extractKeys(instance, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject(v)) {
      return ["object", { object: asRaw ? toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray$1(opts) && opts.includes(key) || isObject(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
const version = "3.2.45";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const semicolonRE = /[^\\];\s*$/;
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    {
      if (semicolonRE.test(val)) {
        warn$1(`Unexpected semicolon at the end of '${name}' style value: '${val}'`);
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (!needRemove) {
      warn$1(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`, e);
    }
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  {
    injectNativeTagCheck(app2);
    injectCompilerOptionsCheck(app2);
  }
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app2._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function injectNativeTagCheck(app2) {
  Object.defineProperty(app2.config, "isNativeTag", {
    value: (tag) => isHTMLTag(tag) || isSVGTag(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck(app2) {
  {
    const isCustomElement = app2.config.isCustomElement;
    Object.defineProperty(app2.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn$1(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
      }
    });
    const compilerOptions = app2.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
    Object.defineProperty(app2.config, "compilerOptions", {
      get() {
        warn$1(msg);
        return compilerOptions;
      },
      set() {
        warn$1(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    if (!res) {
      warn$1(`Failed to mount app: mount target selector "${container}" returned null.`);
    }
    return res;
  }
  if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn$1(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
  }
  return container;
}
function initDev() {
  {
    initCustomFormatter();
  }
}
{
  initDev();
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function I(a) {
  let n = a.parentElement;
  for (; n; ) {
    const { overflowY: o, display: r } = getComputedStyle(n);
    if ((o === "auto" || o === "hidden" || o === "scroll") && !/inline/.test(r))
      return n;
    n = n.parentElement;
  }
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function h(a, n, o, r = "pre") {
  const u = (p2, s) => {
    for (let e = 0; e < p2.length; e++) {
      const t = p2[e];
      r === "pre" && o(t, s), t[n] && u(t[n], [t, ...s]), r === "post" && o(t, s);
    }
  };
  u(a, []);
}
function C(a, n, o) {
  const r = (u, p2) => {
    const s = [];
    for (let e = 0; e < u.length; e++) {
      const t = u[e], c = o(t, p2);
      if (!!c) {
        if (t[n]) {
          const i = r(t[n], [t, ...p2]);
          c[n] = i;
        }
        s.push(c);
      }
    }
    return s;
  };
  return r(a, []);
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function x(a) {
  let n = null;
  const o = ref(/* @__PURE__ */ new Set()), r = () => [...o.value.values()].map(
    ({ key: e, el: t, component: c }) => createVNode(
      Teleport,
      { to: t, key: e },
      {
        default: () => [createVNode(c)]
      }
    )
  ), u = () => {
    var _a2;
    if (n)
      return;
    n = createApp({
      render: () => (a == null ? void 0 : a.renderApp) ? a.renderApp(r()) : r()
    }), (_a2 = a == null ? void 0 : a.setupApp) == null ? void 0 : _a2.call(a, n);
    const e = document.createElement("div");
    document.body.appendChild(e), n.mount(e);
  }, p2 = (e, t, c) => {
    u();
    const i = { component: t, key: c, el: e };
    return o.value.add(i), i;
  }, s = (e) => {
    e && o.value.delete(e);
  };
  return (e, t) => {
    let c;
    return {
      async mount(i) {
        c = p2(i, markRaw(defineAsyncComponent(e)), t);
      },
      async unmount() {
        s(c);
      }
    };
  };
}
const allDemoInstance = {};
const allDemoDatas = {};
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol$1(value)) {
    return NAN;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject$1(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
function toInteger(value) {
  var result = toFinite(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
var metaMap = WeakMap$1$1 && new WeakMap$1$1();
const metaMap$1 = metaMap;
var baseSetData = !metaMap$1 ? identity : function(func, data) {
  metaMap$1.set(func, data);
  return func;
};
const baseSetData$1 = baseSetData;
function createCtor(Ctor) {
  return function() {
    var args = arguments;
    switch (args.length) {
      case 0:
        return new Ctor();
      case 1:
        return new Ctor(args[0]);
      case 2:
        return new Ctor(args[0], args[1]);
      case 3:
        return new Ctor(args[0], args[1], args[2]);
      case 4:
        return new Ctor(args[0], args[1], args[2], args[3]);
      case 5:
        return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate$1(Ctor.prototype), result = Ctor.apply(thisBinding, args);
    return isObject$1(result) ? result : thisBinding;
  };
}
var WRAP_BIND_FLAG$6 = 1;
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG$6, Ctor = createCtor(func);
  function wrapper() {
    var fn = this && this !== root$1 && this instanceof wrapper ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}
var nativeMax$3 = Math.max;
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax$3(argsLength - holdersLength, 0), result = Array(leftLength + rangeLength), isUncurried = !isCurried;
  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}
var nativeMax$2 = Math.max;
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax$2(argsLength - holdersLength, 0), result = Array(rangeLength + rightLength), isUncurried = !isCurried;
  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset2 = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset2 + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset2 + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}
function countHolders(array, placeholder) {
  var length = array.length, result = 0;
  while (length--) {
    if (array[length] === placeholder) {
      ++result;
    }
  }
  return result;
}
function baseLodash() {
}
var MAX_ARRAY_LENGTH = 4294967295;
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}
LazyWrapper.prototype = baseCreate$1(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;
function noop$1() {
}
var getData = !metaMap$1 ? noop$1 : function(func) {
  return metaMap$1.get(func);
};
const getData$1 = getData;
var realNames = {};
const realNames$1 = realNames;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function getFuncName(func) {
  var result = func.name + "", array = realNames$1[result], length = hasOwnProperty$1.call(realNames$1, result) ? array.length : 0;
  while (length--) {
    var data = array[length], otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = void 0;
}
LodashWrapper.prototype = baseCreate$1(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__ = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function lodash(value) {
  if (isObjectLike(value) && !isArray$1$1(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty.call(value, "__wrapped__")) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}
lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;
function isLaziable(func) {
  var funcName = getFuncName(func), other = lodash[funcName];
  if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData$1(other);
  return !!data && func === data[0];
}
var setData = shortOut(baseSetData$1);
const setData$1 = setData;
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
function getWrapDetails(source) {
  var match2 = source.match(reWrapDetails);
  return match2 ? match2[1].split(reSplitDetails) : [];
}
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
function insertWrapDetails(source, details) {
  var length = details.length;
  if (!length) {
    return source;
  }
  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
  details = details.join(length > 2 ? ", " : " ");
  return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
}
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
function baseIsNaN(value) {
  return value !== value;
}
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1, length = array.length;
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}
function baseIndexOf(array, value, fromIndex) {
  return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
}
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}
var WRAP_BIND_FLAG$5 = 1, WRAP_BIND_KEY_FLAG$4 = 2, WRAP_CURRY_FLAG$5 = 8, WRAP_CURRY_RIGHT_FLAG$2 = 16, WRAP_PARTIAL_FLAG$2 = 32, WRAP_PARTIAL_RIGHT_FLAG$2 = 64, WRAP_ARY_FLAG$2 = 128, WRAP_REARG_FLAG$1 = 256, WRAP_FLIP_FLAG$1 = 512;
var wrapFlags = [
  ["ary", WRAP_ARY_FLAG$2],
  ["bind", WRAP_BIND_FLAG$5],
  ["bindKey", WRAP_BIND_KEY_FLAG$4],
  ["curry", WRAP_CURRY_FLAG$5],
  ["curryRight", WRAP_CURRY_RIGHT_FLAG$2],
  ["flip", WRAP_FLIP_FLAG$1],
  ["partial", WRAP_PARTIAL_FLAG$2],
  ["partialRight", WRAP_PARTIAL_RIGHT_FLAG$2],
  ["rearg", WRAP_REARG_FLAG$1]
];
function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function(pair) {
    var value = "_." + pair[0];
    if (bitmask & pair[1] && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}
function setWrapToString(wrapper, reference, bitmask) {
  var source = reference + "";
  return setToString$1(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}
var WRAP_BIND_FLAG$4 = 1, WRAP_BIND_KEY_FLAG$3 = 2, WRAP_CURRY_BOUND_FLAG$1 = 4, WRAP_CURRY_FLAG$4 = 8, WRAP_PARTIAL_FLAG$1 = 32, WRAP_PARTIAL_RIGHT_FLAG$1 = 64;
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG$4, newHolders = isCurry ? holders : void 0, newHoldersRight = isCurry ? void 0 : holders, newPartials = isCurry ? partials : void 0, newPartialsRight = isCurry ? void 0 : partials;
  bitmask |= isCurry ? WRAP_PARTIAL_FLAG$1 : WRAP_PARTIAL_RIGHT_FLAG$1;
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG$1 : WRAP_PARTIAL_FLAG$1);
  if (!(bitmask & WRAP_CURRY_BOUND_FLAG$1)) {
    bitmask &= ~(WRAP_BIND_FLAG$4 | WRAP_BIND_KEY_FLAG$3);
  }
  var newData = [
    func,
    bitmask,
    thisArg,
    newPartials,
    newHolders,
    newPartialsRight,
    newHoldersRight,
    argPos,
    ary,
    arity
  ];
  var result = wrapFunc.apply(void 0, newData);
  if (isLaziable(func)) {
    setData$1(result, newData);
  }
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}
function getHolder(func) {
  var object = func;
  return object.placeholder;
}
var nativeMin$2 = Math.min;
function reorder(array, indexes) {
  var arrLength = array.length, length = nativeMin$2(indexes.length, arrLength), oldArray = copyArray(array);
  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : void 0;
  }
  return array;
}
var PLACEHOLDER$1 = "__lodash_placeholder__";
function replaceHolders(array, placeholder) {
  var index = -1, length = array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER$1) {
      array[index] = PLACEHOLDER$1;
      result[resIndex++] = index;
    }
  }
  return result;
}
var WRAP_BIND_FLAG$3 = 1, WRAP_BIND_KEY_FLAG$2 = 2, WRAP_CURRY_FLAG$3 = 8, WRAP_CURRY_RIGHT_FLAG$1 = 16, WRAP_ARY_FLAG$1 = 128, WRAP_FLIP_FLAG = 512;
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG$1, isBind = bitmask & WRAP_BIND_FLAG$3, isBindKey = bitmask & WRAP_BIND_KEY_FLAG$2, isCurried = bitmask & (WRAP_CURRY_FLAG$3 | WRAP_CURRY_RIGHT_FLAG$1), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? void 0 : createCtor(func);
  function wrapper() {
    var length = arguments.length, args = Array(length), index = length;
    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(
        func,
        bitmask,
        createHybrid,
        wrapper.placeholder,
        thisArg,
        args,
        newHolders,
        argPos,
        ary,
        arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root$1 && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);
  function wrapper() {
    var length = arguments.length, args = Array(length), index = length, placeholder = getHolder(wrapper);
    while (index--) {
      args[index] = arguments[index];
    }
    var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func,
        bitmask,
        createHybrid,
        wrapper.placeholder,
        void 0,
        args,
        holders,
        void 0,
        void 0,
        arity - length
      );
    }
    var fn = this && this !== root$1 && this instanceof wrapper ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}
var WRAP_BIND_FLAG$2 = 1;
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG$2, Ctor = createCtor(func);
  function wrapper() {
    var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = this && this !== root$1 && this instanceof wrapper ? Ctor : func;
    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}
var PLACEHOLDER = "__lodash_placeholder__";
var WRAP_BIND_FLAG$1 = 1, WRAP_BIND_KEY_FLAG$1 = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG$2 = 8, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256;
var nativeMin$1 = Math.min;
function mergeData(data, source) {
  var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG$1 | WRAP_BIND_KEY_FLAG$1 | WRAP_ARY_FLAG);
  var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG$2 || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG$2;
  if (!(isCommon || isCombo)) {
    return data;
  }
  if (srcBitmask & WRAP_BIND_FLAG$1) {
    data[2] = source[2];
    newBitmask |= bitmask & WRAP_BIND_FLAG$1 ? 0 : WRAP_CURRY_BOUND_FLAG;
  }
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
  }
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
  }
  value = source[7];
  if (value) {
    data[7] = value;
  }
  if (srcBitmask & WRAP_ARY_FLAG) {
    data[8] = data[8] == null ? source[8] : nativeMin$1(data[8], source[8]);
  }
  if (data[9] == null) {
    data[9] = source[9];
  }
  data[0] = source[0];
  data[1] = newBitmask;
  return data;
}
var FUNC_ERROR_TEXT$2 = "Expected a function";
var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_FLAG$1 = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64;
var nativeMax$1 = Math.max;
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
  if (!isBindKey && typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
    partials = holders = void 0;
  }
  ary = ary === void 0 ? ary : nativeMax$1(toInteger(ary), 0);
  arity = arity === void 0 ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;
  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials, holdersRight = holders;
    partials = holders = void 0;
  }
  var data = isBindKey ? void 0 : getData$1(func);
  var newData = [
    func,
    bitmask,
    thisArg,
    partials,
    holders,
    partialsRight,
    holdersRight,
    argPos,
    ary,
    arity
  ];
  if (data) {
    mergeData(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === void 0 ? isBindKey ? 0 : func.length : nativeMax$1(newData[9] - length, 0);
  if (!arity && bitmask & (WRAP_CURRY_FLAG$1 | WRAP_CURRY_RIGHT_FLAG)) {
    bitmask &= ~(WRAP_CURRY_FLAG$1 | WRAP_CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG$1 || bitmask == WRAP_CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(void 0, newData);
  }
  var setter = data ? baseSetData$1 : setData$1;
  return setWrapToString(setter(result, newData), func, bitmask);
}
var WRAP_CURRY_FLAG = 8;
function curry(func, arity, guard) {
  arity = guard ? void 0 : arity;
  var result = createWrap(func, WRAP_CURRY_FLAG, void 0, void 0, void 0, void 0, void 0, arity);
  result.placeholder = curry.placeholder;
  return result;
}
curry.placeholder = {};
var now$1 = function() {
  return root$1.Date.now();
};
const now$2 = now$1;
var FUNC_ERROR_TEXT$1 = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now$2();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now$2());
  }
  function debounced() {
    var time = now$2(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var numberTag = "[object Number]";
function isNumber(value) {
  return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
}
function isUndefined(value) {
  return value === void 0;
}
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject$1(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
const mediaQueriesForWebkitCompatibility = /* @__PURE__ */ new Set();
let mediaQueryStyleNode;
function createEmptyStyleRule(query) {
  if (mediaQueriesForWebkitCompatibility.has(query)) {
    return;
  }
  try {
    if (!mediaQueryStyleNode) {
      mediaQueryStyleNode = document.createElement("style");
      mediaQueryStyleNode.setAttribute("type", "text/css");
      document.head.appendChild(mediaQueryStyleNode);
    }
    if (mediaQueryStyleNode.sheet) {
      ;
      mediaQueryStyleNode.sheet.insertRule(`@media ${query} {.fx-query-test{ }}`, 0);
      mediaQueriesForWebkitCompatibility.add(query);
    }
  } catch (err) {
    Logger.error("cdk/breakpoint", err);
  }
}
function noopMatchMedia(query) {
  return {
    matches: query === "all" || query === "",
    media: query,
    addEventListener: () => {
    },
    removeEventListener: () => {
    }
  };
}
const _matchMedia = isBrowser$1 && window.matchMedia ? window.matchMedia.bind(window) : noopMatchMedia;
const matchMedia = (query) => {
  if (isWebKit) {
    createEmptyStyleRule(query);
  }
  return _matchMedia(query);
};
const _queries = /* @__PURE__ */ new Map();
function useMediaQuery(value) {
  const queries = splitQueries(value).map((query) => registerQuery(query));
  tryOnScopeDispose(() => {
    queries.forEach((query) => {
      query.referenceCnt--;
      if (query.referenceCnt > 0) {
        return;
      }
      query.destroy();
      _queries.delete(query.media);
    });
  });
  return computed$2(() => {
    let matches = false;
    const medias = {};
    queries.forEach((query) => {
      const currMatches = query.matches.value;
      matches = matches || currMatches;
      medias[query.media] = currMatches;
    });
    return { matches, medias };
  });
}
function registerQuery(query) {
  if (_queries.has(query)) {
    const output2 = _queries.get(query);
    output2.referenceCnt++;
    return output2;
  }
  const mql = matchMedia(query);
  const matches = ref$1(mql.matches);
  const handler = (evt) => {
    matches.value = evt.matches;
  };
  mql.addEventListener("change", handler);
  const destroy = () => mql.removeEventListener("change", handler);
  const output = { referenceCnt: 1, matches, destroy, media: query };
  _queries.set(query, output);
  return output;
}
function splitQueries(queries) {
  return convertArray(queries).map((query) => query.split(",")).reduce((a1, a2) => a1.concat(a2)).map((query) => query.trim());
}
const BREAKPOINTS_KEYS = ["xs", "sm", "md", "lg", "xl"];
const BREAKPOINTS = {
  xs: "(max-width: 599.99px)",
  sm: "(min-width: 600px) and (max-width: 959.99px)",
  md: "(min-width: 960px) and (max-width: 1279.99px)",
  lg: "(min-width: 1280px) and (max-width: 1719.99px)",
  xl: "(min-width: 1720px)"
};
const BREAKPOINTS_TOKEN = Symbol("cdk-breakpoints");
function useBreakpoints(value) {
  const medias = value != null ? value : inject$1(BREAKPOINTS_TOKEN, BREAKPOINTS);
  const queryState = useMediaQuery(Object.values(medias));
  const match2 = reactive$1({});
  watchEffect(() => {
    const state = queryState.value;
    Object.entries(medias).forEach(([key, value2]) => {
      match2[key] = state.medias[value2];
    });
  });
  return match2;
}
const useSharedBreakpoints = createSharedComposable(() => useBreakpoints());
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
}
const isProxyAvailable = typeof Proxy === "function";
const HOOK_SETUP = "devtools-plugin:setup";
const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
let supported;
let perf;
function isPerformanceSupported() {
  var _a2;
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else if (typeof global !== "undefined" && ((_a2 = global.perf_hooks) === null || _a2 === void 0 ? void 0 : _a2.performance)) {
    supported = true;
    perf = global.perf_hooks.performance;
  } else {
    supported = false;
  }
  return supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}
class ApiProxy {
  constructor(plugin, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin;
    this.hook = hook;
    const defaultSettings = {};
    if (plugin.settings) {
      for (const id in plugin.settings) {
        const item = plugin.settings[id];
        defaultSettings[id] = item.defaultValue;
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
    let currentSettings = Object.assign({}, defaultSettings);
    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e) {
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e) {
        }
        currentSettings = value;
      },
      now() {
        return now();
      }
    };
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }
    this.proxiedOn = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target.on[prop];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target[prop];
        } else if (prop === "on") {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop,
              args,
              resolve: () => {
              }
            });
            return this.fallbacks[prop](...args);
          };
        } else {
          return (...args) => {
            return new Promise((resolve) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve
              });
            });
          };
        }
      }
    });
  }
  async setRealTarget(target) {
    this.target = target;
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }
}
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor;
  const target = getTarget();
  const hook = getDevtoolsGlobalHook();
  const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy
    });
    if (proxy)
      setupFn(proxy.proxiedTarget);
  }
}
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module";
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray = Array.isArray;
function warn(msg) {
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + msg].concat(args));
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash2 = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash2 = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash2,
    path,
    query,
    hash: hash2
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
    return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  for (const key in a) {
    if (!isSameRouteLocationParamsValue(a[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : a === b;
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!from.startsWith("/")) {
    warn(`Cannot resolve a relative location without an absolute path. Trying to resolve "${to}" from "${from}". It should look like "/${from}".`);
    return to;
  }
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position > 1)
        position--;
    } else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base) {
  if (!base) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset2) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset2.behavior,
    left: elRect.left - docRect.left - (offset2.left || 0),
    top: elRect.top - docRect.top - (offset2.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    if (typeof position.el === "string") {
      if (!isIdSelector || !document.getElementById(position.el.slice(1))) {
        try {
          const foundEl = document.querySelector(position.el);
          if (isIdSelector && foundEl) {
            warn(`The selector "${position.el}" should be passed as "el: document.querySelector('${position.el}')" because it starts with "#".`);
            return;
          }
        } catch (err) {
          warn(`The selector "${position.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
          return;
        }
      }
    }
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      warn(`Couldn't find element using selector "${position.el}" returned by scrollBehavior.`);
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location2) {
  const { pathname, search, hash: hash2 } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash2.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash2.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base);
  return path + search + hash2;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1)
        listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      position: history2.length - 1,
      replaced: true,
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        warn("Error with push/replace State", err);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    const state = assign({}, history2.state, buildState(
      historyState.value.back,
      to,
      historyState.value.forward,
      true
    ), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign(
      {},
      historyState.value,
      history2.state,
      {
        forward: to,
        scroll: computeScrollPosition()
      }
    );
    if (!history2.state) {
      warn(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`);
    }
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = Symbol("navigation failure");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
const ErrorTypeMessages = {
  [1]({ location: location2, currentLocation }) {
    return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [2]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [4]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [8]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [16]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
};
function createRouterError(type, params) {
  {
    return assign(new Error(ErrorTypeMessages[type](params)), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error2, type) {
  return error2 instanceof Error && NavigationFailureSymbol in error2 && (type == null || !!(error2.type & type));
}
const propertiesToLog = ["params", "query", "hash"];
function stringifyRoute(to) {
  if (typeof to === "string")
    return to;
  if ("path" in to)
    return to.path;
  const location2 = {};
  for (const key of propertiesToLog) {
    if (key in to)
      location2[key] = to[key];
  }
  return JSON.stringify(location2, null, 2);
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys2 = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [90];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys2.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match2 = path.match(re);
    const params = {};
    if (!match2)
      return null;
    for (let i = 1; i < match2.length; i++) {
      const value = match2[i] || "";
      const key = keys2[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text = isArray(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys: keys2,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff)
      return diff;
    i++;
  }
  if (a.length < b.length) {
    return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
  } else if (a.length > b.length) {
    return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp)
      return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(`Route paths should start with a "/": "${path}" should be "/${path}".`);
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer2}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens2 = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens2.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer2 = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer2)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer2
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer2}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer2,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer2 = "";
  }
  function addCharToBuffer() {
    buffer2 += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer2) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer2}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens2;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  {
    const existingKeys = /* @__PURE__ */ new Set();
    for (const key of parser.keys) {
      if (existingKeys.has(key.name))
        warn(`Found duplicated params with name "${key.name}" for path "${record.path}". Only the last one will be available on "$route.params".`);
      existingKeys.add(key.name);
    }
  }
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    {
      checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
    }
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      if (normalizedRecord.path === "*") {
        throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.');
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (parent && path[0] === "/")
        checkMissingParamsInAbsolutePath(matcher, parent);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
        {
          checkSameParams(originalRecord, matcher);
        }
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
      }
      originalRecord = originalRecord || matcher;
      if (matcher.record.components && Object.keys(matcher.record.components).length || matcher.record.name || matcher.record.redirect) {
        insertMatcher(matcher);
      }
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i = 0;
    while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0 && (matcher.record.path !== matchers[i].record.path || !isRecordChildOf(matcher, matchers[i])))
      i++;
    matchers.splice(i, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      {
        const invalidParams = Object.keys(location2.params || {}).filter((paramName) => !matcher.keys.find((k) => k.name === paramName));
        if (invalidParams.length) {
          warn(`Discarded invalid param(s) "${invalidParams.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
        }
      }
      name = matcher.record.name;
      params = assign(
        paramsFromLocation(
          currentLocation.params,
          matcher.keys.filter((k) => !k.optional).map((k) => k.name)
        ),
        location2.params && paramsFromLocation(location2.params, matcher.keys.map((k) => k.name))
      );
      path = matcher.stringify(params);
    } else if ("path" in location2) {
      path = location2.path;
      if (!path.startsWith("/")) {
        warn(`The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/router.`);
      }
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys2) {
  const newParams = {};
  for (const key of keys2) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "boolean" ? props : props[name];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}
function isSameParam(a, b) {
  return a.name === b.name && a.optional === b.optional && a.repeatable === b.repeatable;
}
function checkSameParams(a, b) {
  for (const key of a.keys) {
    if (!key.optional && !b.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b.record.path}" and the original record: "${a.record.path}" must have the exact same param named "${key.name}"`);
  }
  for (const key of b.keys) {
    if (!key.optional && !a.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b.record.path}" and the original record: "${a.record.path}" must have the exact same param named "${key.name}"`);
  }
}
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
  if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path) {
    warn(`The route named "${String(parent.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
  }
}
function checkMissingParamsInAbsolutePath(record, parent) {
  for (const key of parent.keys) {
    if (!record.keys.find(isSameParam.bind(null, key)))
      return warn(`Absolute path "${record.record.path}" must have the exact same param named "${key.name}" as its parent "${parent.record.path}".`);
  }
}
function isRecordChildOf(record, parent) {
  return parent.children.some((child) => child === record || isRecordChildOf(record, child));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
    warn(`Error decoding "${text}". Using original value`);
  }
  return "" + text;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("router view location matched");
const viewDepthKey = Symbol("router view depth");
const routerKey = Symbol("router");
const routeLocationKey = Symbol("route location");
const routerViewLocationKey = Symbol("router view location");
function useCallbacks() {
  let handlers = [];
  function add2(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1)
        handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add: add2,
    list: () => handlers,
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to, from, canOnlyBeCalledOnce(next, to, from));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    if (guard.length > 2) {
      const message = `The "next" callback was never called inside of ${guard.name ? '"' + guard.name + '"' : ""}:
${guard.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof guardReturn === "object" && "then" in guardReturn) {
        guardCall = guardCall.then((resolvedValue) => {
          if (!next._called) {
            warn(message);
            return Promise.reject(new Error("Invalid navigation guard"));
          }
          return resolvedValue;
        });
      } else if (guardReturn !== void 0) {
        if (!next._called) {
          warn(message);
          reject(new Error("Invalid navigation guard"));
          return;
        }
      }
    }
    guardCall.catch((err) => reject(err));
  });
}
function canOnlyBeCalledOnce(next, to, from) {
  let called = 0;
  return function() {
    if (called++ === 1)
      warn(`The "next" callback was called more than once in one navigation guard when going from "${from.fullPath}" to "${to.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);
    next._called = true;
    if (called === 1)
      next.apply(null, arguments);
  };
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  for (const record of matched) {
    if (!record.components && !record.children.length) {
      warn(`Record with path "${record.path}" is either missing a "component(s)" or "children" property.`);
    }
    for (const name in record.components) {
      let rawComponent = record.components[name];
      {
        if (!rawComponent || typeof rawComponent !== "object" && typeof rawComponent !== "function") {
          warn(`Component "${name}" in record with path "${record.path}" is not a valid component. Received "${String(rawComponent)}".`);
          throw new Error("Invalid route component");
        } else if ("then" in rawComponent) {
          warn(`Component "${name}" in record with path "${record.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const promise = rawComponent;
          rawComponent = () => promise;
        } else if (rawComponent.__asyncLoader && !rawComponent.__warnedDefineAsync) {
          rawComponent.__warnedDefineAsync = true;
          warn(`Component "${name}" in record with path "${record.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`);
        }
      }
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
      } else {
        let componentPromise = rawComponent();
        if (!("catch" in componentPromise)) {
          warn(`Component "${name}" in record with path "${record.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`);
          componentPromise = Promise.resolve(componentPromise);
        }
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props) {
  const router = inject$1(routerKey);
  const currentRoute = inject$1(routeLocationKey);
  const route = computed$2(() => router.resolve(unref$1(props.to)));
  const activeRecordIndex = computed$2(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1)
      return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
  });
  const isActive = computed$2(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed$2(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      return router[unref$1(props.replace) ? "replace" : "push"](
        unref$1(props.to)
      ).catch(noop);
    }
    return Promise.resolve();
  }
  if (isBrowser) {
    const instance = getCurrentInstance();
    if (instance) {
      const linkContextDevtools = {
        route: route.value,
        isActive: isActive.value,
        isExactActive: isExactActive.value
      };
      instance.__vrl_devtools = instance.__vrl_devtools || [];
      instance.__vrl_devtools.push(linkContextDevtools);
      watchEffect(() => {
        linkContextDevtools.route = route.value;
        linkContextDevtools.isActive = isActive.value;
        linkContextDevtools.isExactActive = isExactActive.value;
      }, { flush: "post" });
    }
  }
  return {
    route,
    href: computed$2(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent$1({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive$1(useLink(props));
    const { options } = inject$1(routerKey);
    const elClass = computed$2(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props.custom ? children : h$1("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  if (e.button !== void 0 && e.button !== 0)
    return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e.preventDefault)
    e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent$1({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    warnDeprecatedUsage();
    const injectedRoute = inject$1(routerViewLocationKey);
    const routeToDisplay = computed$2(() => props.route || injectedRoute.value);
    const injectedDepth = inject$1(viewDepthKey, 0);
    const depth = computed$2(() => {
      let initialDepth = unref$1(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed$2(() => routeToDisplay.value.matched[depth.value]);
    provide$1(viewDepthKey, computed$2(() => depth.value + 1));
    provide$1(matchedRouteKey, matchedRouteRef);
    provide$1(routerViewLocationKey, routeToDisplay);
    const viewRef = ref$1();
    watch$1(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h$1(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      if (isBrowser && component.ref) {
        const info2 = {
          depth: depth.value,
          name: matchedRoute.name,
          path: matchedRoute.path,
          meta: matchedRoute.meta
        };
        const internalInstances = isArray(component.ref) ? component.ref.map((r) => r.i) : [component.ref.i];
        internalInstances.forEach((instance) => {
          instance.__vrv_devtools = info2;
        });
      }
      return normalizeSlot(slots.default, { Component: component, route }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function warnDeprecatedUsage() {
  const instance = getCurrentInstance();
  const parentName = instance.parent && instance.parent.type.name;
  if (parentName && (parentName === "KeepAlive" || parentName.includes("Transition"))) {
    const comp = parentName === "KeepAlive" ? "keep-alive" : "transition";
    warn(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${comp}>
    <component :is="Component" />
  </${comp}>
</router-view>`);
  }
}
function formatRouteLocation(routeLocation, tooltip) {
  const copy = assign({}, routeLocation, {
    matched: routeLocation.matched.map((matched) => omit(matched, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: true,
      display: routeLocation.fullPath,
      tooltip,
      value: copy
    }
  };
}
function formatDisplay(display) {
  return {
    _custom: {
      display
    }
  };
}
let routerId = 0;
function addDevtools(app2, router, matcher) {
  if (router.__hasDevtools)
    return;
  router.__hasDevtools = true;
  const id = routerId++;
  setupDevtoolsPlugin({
    id: "org.vuejs.router" + (id ? "." + id : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: app2
  }, (api) => {
    if (typeof api.now !== "function") {
      console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    }
    api.on.inspectComponent((payload, ctx) => {
      if (payload.instanceData) {
        payload.instanceData.state.push({
          type: "Routing",
          key: "$route",
          editable: false,
          value: formatRouteLocation(router.currentRoute.value, "Current Route")
        });
      }
    });
    api.on.visitComponentTree(({ treeNode: node, componentInstance }) => {
      if (componentInstance.__vrv_devtools) {
        const info2 = componentInstance.__vrv_devtools;
        node.tags.push({
          label: (info2.name ? `${info2.name.toString()}: ` : "") + info2.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: PINK_500
        });
      }
      if (isArray(componentInstance.__vrl_devtools)) {
        componentInstance.__devtoolsApi = api;
        componentInstance.__vrl_devtools.forEach((devtoolsData) => {
          let backgroundColor = ORANGE_400;
          let tooltip = "";
          if (devtoolsData.isExactActive) {
            backgroundColor = LIME_500;
            tooltip = "This is exactly active";
          } else if (devtoolsData.isActive) {
            backgroundColor = BLUE_600;
            tooltip = "This link is active";
          }
          node.tags.push({
            label: devtoolsData.route.path,
            textColor: 0,
            tooltip,
            backgroundColor
          });
        });
      }
    });
    watch$1(router.currentRoute, () => {
      refreshRoutesView();
      api.notifyComponentUpdate();
      api.sendInspectorTree(routerInspectorId);
      api.sendInspectorState(routerInspectorId);
    });
    const navigationsLayerId = "router:navigations:" + id;
    api.addTimelineLayer({
      id: navigationsLayerId,
      label: `Router${id ? " " + id : ""} Navigations`,
      color: 4237508
    });
    router.onError((error2, to) => {
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "Error during Navigation",
          subtitle: to.fullPath,
          logType: "error",
          time: api.now(),
          data: { error: error2 },
          groupId: to.meta.__navigationId
        }
      });
    });
    let navigationId = 0;
    router.beforeEach((to, from) => {
      const data = {
        guard: formatDisplay("beforeEach"),
        from: formatRouteLocation(from, "Current Location during this navigation"),
        to: formatRouteLocation(to, "Target location")
      };
      Object.defineProperty(to.meta, "__navigationId", {
        value: navigationId++
      });
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          time: api.now(),
          title: "Start of navigation",
          subtitle: to.fullPath,
          data,
          groupId: to.meta.__navigationId
        }
      });
    });
    router.afterEach((to, from, failure) => {
      const data = {
        guard: formatDisplay("afterEach")
      };
      if (failure) {
        data.failure = {
          _custom: {
            type: Error,
            readOnly: true,
            display: failure ? failure.message : "",
            tooltip: "Navigation Failure",
            value: failure
          }
        };
        data.status = formatDisplay("\u274C");
      } else {
        data.status = formatDisplay("\u2705");
      }
      data.from = formatRouteLocation(from, "Current Location during this navigation");
      data.to = formatRouteLocation(to, "Target location");
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "End of navigation",
          subtitle: to.fullPath,
          time: api.now(),
          data,
          logType: failure ? "warning" : "default",
          groupId: to.meta.__navigationId
        }
      });
    });
    const routerInspectorId = "router-inspector:" + id;
    api.addInspector({
      id: routerInspectorId,
      label: "Routes" + (id ? " " + id : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function refreshRoutesView() {
      if (!activeRoutesPayload)
        return;
      const payload = activeRoutesPayload;
      let routes = matcher.getRoutes().filter((route) => !route.parent);
      routes.forEach(resetMatchStateOnRouteRecord);
      if (payload.filter) {
        routes = routes.filter((route) => isRouteMatching(route, payload.filter.toLowerCase()));
      }
      routes.forEach((route) => markRouteRecordActive(route, router.currentRoute.value));
      payload.rootNodes = routes.map(formatRouteRecordForInspector);
    }
    let activeRoutesPayload;
    api.on.getInspectorTree((payload) => {
      activeRoutesPayload = payload;
      if (payload.app === app2 && payload.inspectorId === routerInspectorId) {
        refreshRoutesView();
      }
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app2 && payload.inspectorId === routerInspectorId) {
        const routes = matcher.getRoutes();
        const route = routes.find((route2) => route2.record.__vd_id === payload.nodeId);
        if (route) {
          payload.state = {
            options: formatRouteRecordMatcherForStateInspector(route)
          };
        }
      }
    });
    api.sendInspectorTree(routerInspectorId);
    api.sendInspectorState(routerInspectorId);
  });
}
function modifierForKey(key) {
  if (key.optional) {
    return key.repeatable ? "*" : "?";
  } else {
    return key.repeatable ? "+" : "";
  }
}
function formatRouteRecordMatcherForStateInspector(route) {
  const { record } = route;
  const fields = [
    { editable: false, key: "path", value: record.path }
  ];
  if (record.name != null) {
    fields.push({
      editable: false,
      key: "name",
      value: record.name
    });
  }
  fields.push({ editable: false, key: "regexp", value: route.re });
  if (route.keys.length) {
    fields.push({
      editable: false,
      key: "keys",
      value: {
        _custom: {
          type: null,
          readOnly: true,
          display: route.keys.map((key) => `${key.name}${modifierForKey(key)}`).join(" "),
          tooltip: "Param keys",
          value: route.keys
        }
      }
    });
  }
  if (record.redirect != null) {
    fields.push({
      editable: false,
      key: "redirect",
      value: record.redirect
    });
  }
  if (route.alias.length) {
    fields.push({
      editable: false,
      key: "aliases",
      value: route.alias.map((alias) => alias.record.path)
    });
  }
  if (Object.keys(route.record.meta).length) {
    fields.push({
      editable: false,
      key: "meta",
      value: route.record.meta
    });
  }
  fields.push({
    key: "score",
    editable: false,
    value: {
      _custom: {
        type: null,
        readOnly: true,
        display: route.score.map((score) => score.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: route.score
      }
    }
  });
  return fields;
}
const PINK_500 = 15485081;
const BLUE_600 = 2450411;
const LIME_500 = 8702998;
const CYAN_400 = 2282478;
const ORANGE_400 = 16486972;
const DARK = 6710886;
function formatRouteRecordForInspector(route) {
  const tags = [];
  const { record } = route;
  if (record.name != null) {
    tags.push({
      label: String(record.name),
      textColor: 0,
      backgroundColor: CYAN_400
    });
  }
  if (record.aliasOf) {
    tags.push({
      label: "alias",
      textColor: 0,
      backgroundColor: ORANGE_400
    });
  }
  if (route.__vd_match) {
    tags.push({
      label: "matches",
      textColor: 0,
      backgroundColor: PINK_500
    });
  }
  if (route.__vd_exactActive) {
    tags.push({
      label: "exact",
      textColor: 0,
      backgroundColor: LIME_500
    });
  }
  if (route.__vd_active) {
    tags.push({
      label: "active",
      textColor: 0,
      backgroundColor: BLUE_600
    });
  }
  if (record.redirect) {
    tags.push({
      label: typeof record.redirect === "string" ? `redirect: ${record.redirect}` : "redirects",
      textColor: 16777215,
      backgroundColor: DARK
    });
  }
  let id = record.__vd_id;
  if (id == null) {
    id = String(routeRecordId++);
    record.__vd_id = id;
  }
  return {
    id,
    label: record.path,
    tags,
    children: route.children.map(formatRouteRecordForInspector)
  };
}
let routeRecordId = 0;
const EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
  const isExactActive = currentRoute.matched.length && isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
  route.__vd_exactActive = route.__vd_active = isExactActive;
  if (!isExactActive) {
    route.__vd_active = currentRoute.matched.some((match2) => isSameRouteRecord(match2, route.record));
  }
  route.children.forEach((childRoute) => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
  route.__vd_match = false;
  route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter) {
  const found = String(route.re).match(EXTRACT_REGEXP_RE);
  route.__vd_match = false;
  if (!found || found.length < 3) {
    return false;
  }
  const nonEndingRE = new RegExp(found[1].replace(/\$$/, ""), found[2]);
  if (nonEndingRE.test(filter)) {
    route.children.forEach((child) => isRouteMatching(child, filter));
    if (route.record.path !== "/" || filter === "/") {
      route.__vd_match = route.re.test(filter);
      return true;
    }
    return false;
  }
  const path = route.record.path.toLowerCase();
  const decodedPath = decode(path);
  if (!filter.startsWith("/") && (decodedPath.includes(filter) || path.includes(filter)))
    return true;
  if (decodedPath.startsWith(filter) || path.startsWith(filter))
    return true;
  if (route.record.name && String(route.record.name).includes(filter))
    return true;
  return route.children.some((child) => isRouteMatching(child, filter));
}
function omit(obj, keys2) {
  const ret = {};
  for (const key in obj) {
    if (!keys2.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
}
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  if (!routerHistory)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    } else {
      warn(`Cannot remove non-existent route "${String(name)}"`);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      {
        if (href2.startsWith("//"))
          warn(`Location "${rawLocation}" resolved to "${href2}". A resolved location cannot start with multiple slashes.`);
        else if (!matchedRoute2.matched.length) {
          warn(`No match found for location with path "${rawLocation}"`);
        }
      }
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      if ("params" in rawLocation && !("name" in rawLocation) && Object.keys(rawLocation.params).length) {
        warn(`Path "${rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);
      }
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(rawLocation.params)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash2 = rawLocation.hash || "";
    if (hash2 && !hash2.startsWith("#")) {
      warn(`A \`hash\` should always start with the character "#". Replace "${hash2}" with "#${hash2}".`);
    }
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash2),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    {
      if (href.startsWith("//")) {
        warn(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
      } else if (!matchedRoute.matched.length) {
        warn(`No match found for location with path "${"path" in rawLocation ? rawLocation.path : rawLocation}"`);
      }
    }
    return assign({
      fullPath,
      hash: hash2,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      if (!("path" in newTargetLocation) && !("name" in newTargetLocation)) {
        warn(`Invalid redirect found:
${JSON.stringify(newTargetLocation, null, 2)}
 when navigating to "${to.fullPath}". A redirect must contain a name or path. This will break in production.`);
        throw new Error("Invalid redirect");
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: "path" in newTargetLocation ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
          force,
          replace: replace2
        }),
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        true,
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error2) => isNavigationFailure(error2) ? isNavigationFailure(error2, 2) ? error2 : markAsReady(error2) : triggerError(error2, toLocation, from)).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(failure2, 2)) {
          if (isSameRouteLocation(stringifyQuery$1, resolve(failure2.to), toLocation) && redirectedFrom && (redirectedFrom._count = redirectedFrom._count ? redirectedFrom._count + 1 : 1) > 10) {
            warn(`Detected an infinite redirection in a navigation guard when going from "${from.fullPath}" to "${toLocation.fullPath}". Aborting to avoid a Stack Overflow. This will break in production if not fixed.`);
            return Promise.reject(new Error("Infinite redirect in navigation guard"));
          }
          return pushWithRedirect(
            assign({
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
              force
            }),
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error2 = checkCanceledNavigation(to, from);
    return error2 ? Promise.reject(error2) : Promise.resolve();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of to.matched) {
        if (record.beforeEnter && !from.matched.includes(record)) {
          if (isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    for (const guard of afterGuards.list())
      guard(to, from, failure);
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error2 = checkCanceledNavigation(toLocation, from);
    if (error2)
      return error2;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info2) => {
      if (!router.listening)
        return;
      const toLocation = resolve(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info2.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error2) => {
        if (isNavigationFailure(error2, 4 | 8)) {
          return error2;
        }
        if (isNavigationFailure(error2, 2)) {
          pushWithRedirect(
            error2.to,
            toLocation
          ).then((failure) => {
            if (isNavigationFailure(failure, 4 | 16) && !info2.delta && info2.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop);
          return Promise.reject();
        }
        if (info2.delta) {
          routerHistory.go(-info2.delta, false);
        }
        return triggerError(error2, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info2.delta && !isNavigationFailure(failure, 8)) {
            routerHistory.go(-info2.delta, false);
          } else if (info2.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error2, to, from) {
    markAsReady(error2);
    const list = errorHandlers.list();
    if (list.length) {
      list.forEach((handler) => handler(error2, to, from));
    } else {
      {
        warn("uncaught error during route navigation:");
      }
      console.error(error2);
    }
    return Promise.reject(error2);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve2, reject) => {
      readyHandlers.add([resolve2, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve2, reject]) => err ? reject(err) : resolve2());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick$1().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app2) {
      const router2 = this;
      app2.component("RouterLink", RouterLink);
      app2.component("RouterView", RouterView);
      app2.config.globalProperties.$router = router2;
      Object.defineProperty(app2.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref$1(currentRoute)
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
          warn("Unexpected error when starting the router:", err);
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed$2(() => currentRoute.value[key]);
      }
      app2.provide(routerKey, router2);
      app2.provide(routeLocationKey, reactive$1(reactiveRoute));
      app2.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app2.unmount;
      installedApps.add(app2);
      app2.unmount = function() {
        installedApps.delete(app2);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
      if (isBrowser) {
        addDevtools(app2, router2, matcher);
      }
    }
  };
  return router;
}
function runGuardQueue(guards) {
  return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRoute() {
  return inject$1(routeLocationKey);
}
const defaultName$1 = "\u6B64\u9879";
const zhCNMessages = {
  default: (_, control) => {
    var _a2;
    return `${(_a2 = control.name) != null ? _a2 : ""}\u9A8C\u8BC1\u5931\u8D25`;
  },
  required: (_, control) => {
    const { name = defaultName$1, example } = control;
    return `\u8BF7\u8F93\u5165${name}${example ? ", \u4F8B: " + example : ""}`;
  },
  requiredTrue: (_, control) => {
    const { name = defaultName$1 } = control;
    return `${name}\u5FC5\u987B\u4E3A 'true'`;
  },
  email: (_, control) => {
    const { example } = control;
    return `\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1\u683C\u5F0F${example ? ", \u4F8B: " + example : ""}`;
  },
  min: (err, __) => {
    return `\u8BF7\u8F93\u5165\u4E0D\u5C0F\u4E8E ${err.min} \u7684\u6570\u5B57`;
  },
  max: (err, __) => {
    return `\u8BF7\u8F93\u5165\u4E0D\u5927\u4E8E ${err.max} \u7684\u6570\u5B57`;
  },
  range: (err, __) => {
    return `\u8BF7\u8F93\u5165 ${err.min}-${err.max} \u4E4B\u95F4\u7684\u6570\u5B57`;
  },
  minLength: (err, __) => {
    const { minLength, isArray: isArray2 } = err;
    return isArray2 ? `\u8BF7\u81F3\u5C11\u9009\u62E9 ${minLength} \u9879` : `\u8BF7\u81F3\u5C11\u8F93\u5165 ${minLength} \u4E2A\u5B57\u7B26`;
  },
  maxLength: (err, __) => {
    const { maxLength, isArray: isArray2 } = err;
    return isArray2 ? `\u8BF7\u81F3\u591A\u9009\u62E9 ${maxLength} \u9879` : `\u8BF7\u81F3\u591A\u8F93\u5165 ${maxLength} \u4E2A\u5B57\u7B26`;
  },
  rangeLength: (err, __) => {
    const { minLength, maxLength, isArray: isArray2 } = err;
    return isArray2 ? `\u8BF7\u9009\u62E9 ${minLength}-${maxLength} \u9879` : `\u8BF7\u8F93\u5165 ${minLength}-${maxLength} \u4E2A\u5B57\u7B26`;
  },
  pattern: (_, control) => {
    const { example } = control;
    return `\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u683C\u5F0F${example ? ", \u4F8B: " + example : ""}`;
  }
};
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const emailRegexp = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const _Validators = class {
  static setMessages(messages) {
    _Validators.messages = { ..._Validators.messages, ...messages };
  }
  static getMessage(key) {
    return _Validators.messages[key];
  }
  static getError(key, control, errorContext = {}) {
    let message = void 0;
    const validMessage = _Validators.messages[key] || _Validators.messages.default || void 0;
    if (isFunction$1(validMessage)) {
      message = validMessage(errorContext, control);
    } else {
      message = validMessage;
    }
    return { ...errorContext, message };
  }
  static required(value, control) {
    if (isEmpty(value)) {
      return { required: _Validators.getError("required", control) };
    }
    return void 0;
  }
  static requiredTrue(value, control) {
    if (value === true) {
      return void 0;
    }
    return { requiredTrue: _Validators.getError("requiredTrue", control, { actual: value }) };
  }
  static email(value, control) {
    if (isEmpty(value) || emailRegexp.test(value)) {
      return void 0;
    }
    return { email: _Validators.getError("email", control, { actual: value }) };
  }
  static min(min2) {
    return (value, control) => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) >= min2) {
        return void 0;
      }
      return { min: _Validators.getError("min", control, { min: min2, actual: value }) };
    };
  }
  static max(max2) {
    return (value, control) => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) <= max2) {
        return void 0;
      }
      return { max: _Validators.getError("max", control, { max: max2, actual: value }) };
    };
  }
  static range(min2, max2) {
    return (value, control) => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) >= min2 && Number(value) <= max2) {
        return void 0;
      }
      return { range: _Validators.getError("range", control, { min: min2, max: max2, actual: value }) };
    };
  }
  static minLength(minLength) {
    return (value, control) => {
      if (isEmpty(value) || !hasLength(value) || value.length >= minLength) {
        return void 0;
      }
      return {
        minLength: _Validators.getError("minLength", control, {
          minLength,
          actual: value.length,
          isArray: isArray$1$1(value)
        })
      };
    };
  }
  static maxLength(maxLength) {
    return (value, control) => {
      if (isEmpty(value) || !hasLength(value) || value.length <= maxLength) {
        return void 0;
      }
      return {
        maxLength: _Validators.getError("maxLength", control, {
          maxLength,
          actual: value.length,
          isArray: isArray$1$1(value)
        })
      };
    };
  }
  static rangeLength(minLength, maxLength) {
    return (value, control) => {
      if (isEmpty(value) || !hasLength(value) || value.length >= minLength && value.length <= maxLength) {
        return void 0;
      }
      return {
        rangeLength: _Validators.getError("rangeLength", control, {
          minLength,
          maxLength,
          actual: value.length,
          isArray: isArray$1$1(value)
        })
      };
    };
  }
  static pattern(pattern) {
    if (!pattern) {
      return _Validators.nullValidator;
    }
    let regex;
    let regexStr;
    if (typeof pattern === "string") {
      regexStr = "";
      if (pattern.charAt(0) !== "^") {
        regexStr += "^";
      }
      regexStr += pattern;
      if (pattern.charAt(pattern.length - 1) !== "$") {
        regexStr += "$";
      }
      regex = new RegExp(regexStr);
    } else {
      regexStr = pattern.toString();
      regex = pattern;
    }
    return (value, control) => {
      if (isEmpty(value) || regex.test(value)) {
        return void 0;
      }
      return { pattern: _Validators.getError("pattern", control, { pattern: regexStr, actual: value }) };
    };
  }
  static nullValidator(_, _control) {
    return void 0;
  }
  static compose(validators) {
    if (!validators) {
      return void 0;
    }
    const presentValidators = validators.filter(isFunction$1);
    if (presentValidators.length == 0) {
      return void 0;
    }
    return (value, control) => mergeMessages(executeValidators(value, control, presentValidators));
  }
  static composeAsync(validators) {
    if (!validators) {
      return void 0;
    }
    const presentValidators = validators.filter(isFunction$1);
    if (presentValidators.length == 0) {
      return void 0;
    }
    return (value, control) => {
      const ValidateErrors = executeValidators(value, control, presentValidators);
      return Promise.all(ValidateErrors).then(mergeMessages);
    };
  }
};
let Validators = _Validators;
__publicField$2(Validators, "messages", zhCNMessages);
function isEmpty(val) {
  return isNil(val) || (isString$1(val) || isArray$1$1(val)) && val.length === 0;
}
function hasLength(val) {
  return !isNil(val) && isNumber(val.length);
}
function executeValidators(value, control, validators) {
  return validators.map((validator) => validator(value, control));
}
function mergeMessages(validateErrors) {
  let res = {};
  validateErrors.forEach((errors) => {
    res = isNil(errors) ? res : { ...res, ...errors };
  });
  return Object.keys(res).length === 0 ? void 0 : res;
}
function hasValidator(validators, validator) {
  return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
}
function addValidators(validators, currentValidators) {
  const current = convertArray(currentValidators);
  const validatorsToAdd = convertArray(validators);
  validatorsToAdd.forEach((v) => {
    if (!hasValidator(current, v)) {
      current.push(v);
    }
  });
  return current;
}
function removeValidators(validators, currentValidators) {
  return convertArray(currentValidators).filter((v) => !hasValidator(validators, v));
}
var __defProp$1$1 = Object.defineProperty;
var __defNormalProp$1$1 = (obj, key, value) => key in obj ? __defProp$1$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1$1 = (obj, key, value) => {
  __defNormalProp$1$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function isOptions(val) {
  return isPlainObject$1(val);
}
function toValidator(validator) {
  return isArray$1$1(validator) ? Validators.compose(validator) : validator;
}
function toAsyncValidator(asyncValidator) {
  return isArray$1$1(asyncValidator) ? Validators.composeAsync(asyncValidator) : asyncValidator;
}
let controlId = 0;
class AbstractControl {
  constructor(controls, validatorOrOptions, asyncValidator, initValue) {
    __publicField$1$1(this, "uid", controlId++);
    __publicField$1$1(this, "controls");
    __publicField$1$1(this, "valueRef");
    __publicField$1$1(this, "status");
    __publicField$1$1(this, "errors");
    __publicField$1$1(this, "valid");
    __publicField$1$1(this, "invalid");
    __publicField$1$1(this, "validating");
    __publicField$1$1(this, "disabled");
    __publicField$1$1(this, "blurred");
    __publicField$1$1(this, "unblurred");
    __publicField$1$1(this, "dirty");
    __publicField$1$1(this, "pristine");
    __publicField$1$1(this, "name");
    __publicField$1$1(this, "example");
    __publicField$1$1(this, "_controls");
    __publicField$1$1(this, "_valueRef");
    __publicField$1$1(this, "_status");
    __publicField$1$1(this, "_controlsStatus");
    __publicField$1$1(this, "_errors");
    __publicField$1$1(this, "_disabled");
    __publicField$1$1(this, "_blurred", ref$1(false));
    __publicField$1$1(this, "_dirty", ref$1(false));
    __publicField$1$1(this, "_validators");
    __publicField$1$1(this, "_composedValidators");
    __publicField$1$1(this, "_asyncValidators");
    __publicField$1$1(this, "_composedAsyncValidators");
    __publicField$1$1(this, "_parent");
    __publicField$1$1(this, "_trigger");
    this._controls = shallowRef(controls);
    this._valueRef = shallowRef(initValue != null ? initValue : this._calculateInitValue());
    this._forEachControls((control) => control.setParent(this));
    this._convertOptions(validatorOrOptions, asyncValidator);
    this._init();
  }
  get parent() {
    return this._parent;
  }
  get root() {
    let root2 = this;
    while (root2.parent) {
      root2 = root2.parent;
    }
    return root2;
  }
  get trigger() {
    var _a2, _b, _c;
    return (_c = (_b = this._trigger) != null ? _b : (_a2 = this._parent) == null ? void 0 : _a2.trigger) != null ? _c : "change";
  }
  reset() {
    if (this._controls.value) {
      this._forEachControls((control) => control.reset());
    } else {
      const currValue = this._valueRef.value;
      const initValue = this._calculateInitValue();
      if (currValue !== initValue) {
        this._valueRef.value = initValue;
      } else {
        this._validate();
      }
      this.markAsUnblurred();
      this.markAsPristine();
    }
  }
  async validate() {
    if (!this._disabled.value && this._controls.value) {
      const validates = [];
      this._forEachControls((control) => validates.push(control.validate()));
      if (validates.length > 0) {
        await Promise.all(validates);
      }
    }
    return this._validate();
  }
  disable() {
    this._disabled.value = true;
    this._errors.value = void 0;
    if (this._controls.value) {
      this._forEachControls((control) => control.disable());
    }
  }
  enable() {
    this._disabled.value = false;
    if (this._controls.value) {
      this._forEachControls((control) => control.enable());
    }
    this._validate();
  }
  markAsBlurred() {
    if (this._controls.value) {
      this._forEachControls((control) => control.markAsBlurred());
    } else {
      this._blurred.value = true;
    }
    if (this.trigger === "blur") {
      this._validate();
    }
  }
  markAsUnblurred() {
    if (this._controls.value) {
      this._forEachControls((control) => control.markAsUnblurred());
    } else {
      this._blurred.value = false;
    }
  }
  markAsDirty() {
    if (this._controls.value) {
      this._forEachControls((control) => control.markAsDirty());
    } else {
      this._dirty.value = true;
    }
  }
  markAsPristine() {
    if (this._controls.value) {
      this._forEachControls((control) => control.markAsPristine());
    } else {
      this._dirty.value = false;
    }
  }
  setValidators(newValidators) {
    this._validators = newValidators;
    this._composedValidators = toValidator(newValidators);
  }
  setAsyncValidators(newAsyncValidators) {
    this._asyncValidators = newAsyncValidators;
    this._composedAsyncValidators = toAsyncValidator(newAsyncValidators);
  }
  addValidators(validators) {
    this.setValidators(addValidators(validators, this._validators));
  }
  addAsyncValidators(validators) {
    this.setAsyncValidators(addValidators(validators, this._asyncValidators));
  }
  removeValidators(validators) {
    this.setValidators(removeValidators(validators, this._validators));
  }
  removeAsyncValidators(validators) {
    this.setAsyncValidators(removeValidators(validators, this._asyncValidators));
  }
  clearValidators() {
    this.setValidators(void 0);
  }
  clearAsyncValidators() {
    this.setAsyncValidators(void 0);
  }
  hasValidator(validator) {
    return hasValidator(this._validators, validator);
  }
  hasAsyncValidator(validator) {
    return hasValidator(this._asyncValidators, validator);
  }
  get(path) {
    if (isNil(path)) {
      return void 0;
    }
    const currPath = isArray$1$1(path) ? path : path.toString().split(".");
    if (currPath.length === 0) {
      return void 0;
    }
    return currPath.reduce((control, name) => control && control._find(name), this);
  }
  setErrors(errors, path) {
    var _a2;
    if (!isNil(path)) {
      (_a2 = this.get(path)) == null ? void 0 : _a2.setErrors(errors);
    } else {
      this._errors.value = errors;
    }
  }
  clearErrors(path) {
    this.setErrors(void 0, path);
  }
  getError(errorCode, path) {
    var _a2, _b;
    const control = path ? this.get(path) : this;
    return (_b = (_a2 = control == null ? void 0 : control._errors) == null ? void 0 : _a2.value) == null ? void 0 : _b[errorCode];
  }
  hasError(errorCode, path) {
    return !!this.getError(errorCode, path);
  }
  setParent(parent) {
    this._parent = parent;
  }
  watchValue(cb, options) {
    return watch$1(this.valueRef, cb, options);
  }
  watchStatus(cb, options) {
    return watch$1(this.status, cb, options);
  }
  async _validate() {
    let newErrors = void 0;
    if (!this._disabled.value) {
      let value = void 0;
      if (this._composedValidators) {
        value = this.getValue();
        newErrors = this._composedValidators(value, this);
      }
      if (isNil(newErrors) && this._composedAsyncValidators) {
        if (!this._composedValidators) {
          value = this.getValue();
        }
        this._status.value = "validating";
        newErrors = await this._composedAsyncValidators(value, this);
      }
    }
    this.setErrors(newErrors);
    return newErrors;
  }
  _convertOptions(validatorOrOptions, asyncValidator) {
    var _a2;
    let disabled = false;
    if (isOptions(validatorOrOptions)) {
      this.name = validatorOrOptions.name;
      this.example = validatorOrOptions.example;
      this._trigger = (_a2 = validatorOrOptions.trigger) != null ? _a2 : this._trigger;
      this.setValidators(validatorOrOptions.validators);
      this.setAsyncValidators(validatorOrOptions.asyncValidators);
      if (validatorOrOptions.disabled) {
        disabled = true;
        this._forEachControls((control) => control.disable());
      }
    } else {
      this.setValidators(validatorOrOptions);
      this.setAsyncValidators(asyncValidator);
    }
    this._disabled = ref$1(disabled);
  }
  _init() {
    this.controls = computed$2(() => this._controls.value);
    this.valueRef = computed$2(() => this._valueRef.value);
    this._initErrorsAndStatus();
    this.errors = computed$2(() => this._errors.value);
    this.status = computed$2(() => {
      const selfStatus = this._status.value;
      if (selfStatus === "valid") {
        return this._controlsStatus.value;
      }
      return selfStatus;
    });
    this.valid = computed$2(() => this.status.value === "valid");
    this.invalid = computed$2(() => this.status.value === "invalid");
    this.validating = computed$2(() => this.status.value === "validating");
    this.disabled = computed$2(() => this._disabled.value);
    this.blurred = computed$2(() => this._blurred.value);
    this.unblurred = computed$2(() => !this._blurred.value);
    this.dirty = computed$2(() => this._dirty.value);
    this.pristine = computed$2(() => !this._dirty.value);
  }
  _initErrorsAndStatus() {
    const disabled = this._disabled.value;
    let value;
    let errors;
    let status = "valid";
    let controlsStatus = "valid";
    if (!disabled) {
      if (this._composedValidators) {
        value = this.getValue();
        errors = this._composedValidators(value, this);
      }
      if (errors) {
        status = "invalid";
      }
      this._forEachControls((control) => {
        if (control.status.value === "invalid") {
          controlsStatus = "invalid";
        }
      });
    }
    this._errors = shallowRef(errors);
    this._status = ref$1(status);
    this._controlsStatus = ref$1(controlsStatus);
    if (!disabled && status === "valid" && controlsStatus === "valid" && this._composedAsyncValidators) {
      value = this._validators ? value : this.getValue();
      this._status.value = "validating";
      this._composedAsyncValidators(value, this).then((asyncErrors) => {
        this._errors.value = asyncErrors;
        this._status.value = asyncErrors ? "invalid" : "valid";
      });
    }
  }
}
const isAbstractControl = (val) => {
  return val instanceof AbstractControl;
};
const FORMS_CONTROL_TOKEN = Symbol("cdk-forms-control");
function useControl(controlKey = "control") {
  const { props } = getCurrentInstance();
  const parentControl = inject$1(FORMS_CONTROL_TOKEN, shallowRef());
  const control = shallowRef();
  let watchStop;
  const cleanWatch = () => {
    if (watchStop) {
      watchStop();
      watchStop = void 0;
    }
  };
  tryOnScopeDispose(cleanWatch);
  watch$1(
    [() => props[controlKey], parentControl],
    ([controlOrPath, pControl]) => {
      cleanWatch();
      if (isAbstractControl(controlOrPath)) {
        control.value = controlOrPath;
      } else if (!!pControl && !isNil(controlOrPath)) {
        watchStop = watch$1(
          pControl.controls,
          () => {
            const _control = pControl.get(controlOrPath);
            if (!_control) {
              Logger.warn("cdk/forms", `not find control by [${controlOrPath}]`);
            }
            control.value = _control;
          },
          { immediate: true }
        );
      }
    },
    { immediate: true }
  );
  return control;
}
function useAccessor(control, valueKey = "value", disabledKey = "disabled") {
  const accessor = reactive$1({});
  const { props } = getCurrentInstance();
  let valueStop;
  let disabledStop;
  let tempValueWatchStop;
  const cleanWatch = () => {
    if (valueStop) {
      valueStop();
      valueStop = void 0;
    }
    if (disabledStop) {
      disabledStop();
      disabledStop = void 0;
    }
    if (tempValueWatchStop) {
      tempValueWatchStop();
      tempValueWatchStop = void 0;
    }
  };
  const generateAccessorByControl = (currControl) => {
    valueStop = watch$1(
      currControl.valueRef,
      (value) => {
        accessor.value = value;
      },
      { immediate: true }
    );
    disabledStop = watch$1(
      currControl.disabled,
      (disabled) => {
        accessor.disabled = disabled;
      },
      { immediate: true }
    );
    accessor.setValue = (value, options) => currControl.setValue(value, { dirty: true, ...options });
    accessor.markAsBlurred = () => currControl.markAsBlurred();
  };
  const generateAccessorByProps = () => {
    const tempRef = shallowRef(props[valueKey]);
    tempValueWatchStop = watch$1(
      () => props[valueKey],
      (value) => tempRef.value = value
    );
    valueStop = watch$1(
      () => {
        var _a2;
        return (_a2 = props[valueKey]) != null ? _a2 : tempRef.value;
      },
      (value) => {
        accessor.value = value;
      },
      { immediate: true }
    );
    disabledStop = watch$1(
      () => props[disabledKey],
      (disabled) => {
        accessor.disabled = disabled;
      },
      { immediate: true }
    );
    accessor.setValue = (value) => {
      if (value != toRaw$1(accessor.value)) {
        tempRef.value = value;
        callEmit(props[`onUpdate:${valueKey}`], value);
      }
    };
    accessor.markAsBlurred = NoopFunction;
  };
  watch$1(
    () => unref$1(control),
    (currControl) => {
      cleanWatch();
      if (currControl) {
        generateAccessorByControl(currControl);
      } else {
        generateAccessorByProps();
      }
    },
    { immediate: true }
  );
  tryOnScopeDispose(cleanWatch);
  return accessor;
}
function useAccessorAndControl(options) {
  const { controlKey, valueKey, disabledKey } = options != null ? options : {};
  const control = useControl(controlKey);
  const accessor = useAccessor(control, valueKey, disabledKey);
  return { accessor, control };
}
const layoutProps = {
  fixed: { type: [Boolean, Object], default: false },
  floatSider: { type: Boolean, default: false }
};
const layoutHeaderProps = {};
const layoutContentProps = {};
const layoutFooterProps = {};
const layoutSiderProps = {
  collapsed: { type: Boolean, default: void 0 },
  breakpoint: String,
  pointer: { type: Boolean, default: false },
  pointerDelay: { type: [Number, Array], default: () => [0, 100] },
  "onUpdate:collapsed": [Function, Array]
};
const layoutSiderTriggerProps = {
  icon: {
    type: [String, Array],
    default: void 0
  }
};
var Layout = /* @__PURE__ */ defineComponent$1({
  name: "IxLayout",
  props: layoutProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-layout`);
    const mergedFixed = computed$2(() => {
      const {
        fixed
      } = props;
      if (isObject$1(fixed)) {
        const {
          header = false,
          sider = false
        } = fixed;
        return {
          header,
          sider
        };
      }
      return {
        header: fixed,
        sider: fixed
      };
    });
    const classes = computed$2(() => {
      const prefixCls = mergedPrefixCls.value;
      const {
        header,
        sider
      } = mergedFixed.value;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-fixed-header`]: header,
        [`${prefixCls}-fixed-sider`]: sider,
        [`${prefixCls}-float-sider`]: props.floatSider
      });
    });
    return () => {
      var _a2;
      return createVNode$1("section", {
        "class": classes.value
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    };
  }
});
var LayoutContent = /* @__PURE__ */ defineComponent$1({
  name: "IxLayoutContent",
  props: layoutContentProps,
  setup(_, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-layout-content`);
    return () => {
      var _a2;
      const prefixCls = mergedPrefixCls.value;
      return createVNode$1("main", {
        "class": `${prefixCls}`
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    };
  }
});
var LayoutFooter = /* @__PURE__ */ defineComponent$1({
  name: "IxLayoutFooter",
  props: layoutFooterProps,
  setup(_, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-layout-footer`);
    return () => {
      var _a2;
      const prefixCls = mergedPrefixCls.value;
      return createVNode$1("footer", {
        "class": prefixCls
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    };
  }
});
var LayoutHeader = /* @__PURE__ */ defineComponent$1({
  name: "IxLayoutHeader",
  props: layoutHeaderProps,
  setup(_, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-layout-header`);
    return () => {
      var _a2;
      const prefixCls = mergedPrefixCls.value;
      return createVNode$1("header", {
        "class": prefixCls
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    };
  }
});
const layoutSiderToken = Symbol("layoutSider");
var LayoutSider = /* @__PURE__ */ defineComponent$1({
  name: "IxLayoutSider",
  props: layoutSiderProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-layout-sider`);
    const [collapsed, setCollapsed] = useControlledProp(props, "collapsed", false);
    provide$1(layoutSiderToken, {
      mergedPrefixCls,
      collapsed,
      setCollapsed
    });
    const breakpointIndex = computed$2(() => {
      const {
        breakpoint
      } = props;
      return breakpoint ? BREAKPOINTS_KEYS.indexOf(breakpoint) : -1;
    });
    const useBreakpoint = computed$2(() => breakpointIndex.value > -1);
    const breakpoints = useSharedBreakpoints();
    let stopBreakpoints;
    watch$1(useBreakpoint, (breakpoint) => {
      stopBreakpoints == null ? void 0 : stopBreakpoints();
      if (breakpoint) {
        stopBreakpoints = watchEffect(() => {
          const currBreakpointIndex = BREAKPOINTS_KEYS.findIndex((key) => breakpoints[key]);
          setCollapsed(currBreakpointIndex <= breakpointIndex.value, "breakpoint");
        });
      }
    }, {
      immediate: true
    });
    let timer;
    const setCollapsedWithDelay = (collapsed2) => {
      const {
        pointerDelay
      } = props;
      const [showDelay, hideDelay] = Array.isArray(pointerDelay) ? pointerDelay : [pointerDelay, pointerDelay];
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setCollapsed(collapsed2, "pointer");
        timer = void 0;
      }, collapsed2 ? showDelay : hideDelay);
    };
    const pointerEvents = computed$2(() => {
      if (!props.pointer) {
        return void 0;
      }
      return {
        onPointerenter: () => setCollapsedWithDelay(false),
        onPointerleave: () => setCollapsedWithDelay(true)
      };
    });
    const classes = computed$2(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-collapsed`]: collapsed.value
      });
    });
    return () => {
      var _a2;
      return createVNode$1("aside", mergeProps$1({
        "class": classes.value
      }, pointerEvents.value), [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    };
  }
});
var LayoutSiderTrigger = /* @__PURE__ */ defineComponent$1({
  name: "IxLayoutSiderTrigger",
  props: layoutSiderTriggerProps,
  setup(props, {
    slots
  }) {
    const {
      mergedPrefixCls,
      collapsed,
      setCollapsed
    } = inject$1(layoutSiderToken);
    const mergedIcon = computed$2(() => {
      const {
        icon
      } = props;
      const [fold = "menu-fold", unfold = "menu-unfold"] = Array.isArray(icon) ? icon : [icon, icon];
      return collapsed.value ? fold : unfold;
    });
    const classes = computed$2(() => {
      const prefixCls = `${mergedPrefixCls.value}-trigger`;
      return {
        [prefixCls]: true,
        [`${prefixCls}-collapsed`]: collapsed.value
      };
    });
    const handleClick = () => {
      setCollapsed(!collapsed.value, "trigger");
    };
    return () => {
      var _a2;
      let iconNode;
      if (slots.icon) {
        iconNode = slots.icon({
          collapsed: collapsed.value
        });
      } else {
        const iconValue = mergedIcon.value;
        iconNode = isString$1(iconValue) ? createVNode$1(IxIcon, {
          "name": iconValue
        }, null) : iconValue;
      }
      return createVNode$1("div", {
        "class": classes.value
      }, [createVNode$1("span", null, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), createVNode$1(IxButton, {
        "mode": "text",
        "onClick": handleClick
      }, {
        icon: () => iconNode
      })]);
    };
  }
});
const IxLayout = Layout;
const IxLayoutContent = LayoutContent;
const IxLayoutFooter = LayoutFooter;
const IxLayoutHeader = LayoutHeader;
const IxLayoutSider = LayoutSider;
const IxLayoutSiderTrigger = LayoutSiderTrigger;
const inputProps$1 = {
  addonAfter: String,
  addonBefore: String,
  borderless: {
    type: Boolean,
    default: void 0
  },
  clearable: {
    type: Boolean,
    default: void 0
  },
  clearIcon: String,
  clearVisible: {
    type: Boolean,
    default: void 0
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  focused: {
    type: Boolean,
    default: void 0
  },
  prefix: String,
  size: String,
  status: String,
  suffix: String,
  onClear: Function
};
var Input$1 = /* @__PURE__ */ defineComponent$1({
  name: "\u0275Input",
  inheritAttrs: false,
  props: inputProps$1,
  setup(props, {
    attrs,
    slots,
    expose
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-input`);
    const inputRef = ref$1();
    const getInputElement = () => inputRef.value;
    expose({
      getInputElement
    });
    const classes = computed$2(() => {
      const {
        borderless,
        clearable,
        disabled,
        focused,
        size: size2,
        status,
        addonAfter,
        addonBefore,
        prefix,
        suffix
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-${size2}`]: true,
        [`${prefixCls}-${status}`]: !!status,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-clearable`]: clearable,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-focused`]: focused,
        [`${prefixCls}-with-addon-after`]: addonAfter || slots.addonAfter,
        [`${prefixCls}-with-addon-before`]: addonBefore || slots.addonBefore,
        [`${prefixCls}-with-prefix`]: prefix || slots.prefix,
        [`${prefixCls}-with-suffix`]: suffix || slots.suffix
      });
    });
    return () => {
      const {
        clearable,
        clearIcon,
        clearVisible,
        disabled,
        addonAfter,
        addonBefore,
        prefix,
        suffix,
        onClear
      } = props;
      const prefixCls = mergedPrefixCls.value;
      const addonBeforeNode = renderAddon(slots.addonBefore, addonBefore, `${prefixCls}-addon`, "__before-addon");
      const addonAfterNode = renderAddon(slots.addonAfter, addonAfter, `${prefixCls}-addon`, "__before-after");
      const prefixNode = renderIcon(slots.prefix, prefix, `${prefixCls}-prefix`, "__prefix");
      const suffixNode = renderIcon(slots.suffix, suffix, `${prefixCls}-suffix`, "__suffix");
      const clearNode = clearable && createVNode$1("span", {
        "key": "__clear",
        "class": `${prefixCls}-clear${clearVisible ? " visible" : ""}`,
        "onClick": onClear
      }, [slots.clearIcon ? slots.clearIcon() : createVNode$1(IxIcon, {
        "name": clearIcon
      }, null)]);
      if (!(addonBeforeNode || addonAfterNode || prefixNode || suffixNode || clearNode)) {
        return createVNode$1("input", mergeProps$1({
          "ref": inputRef,
          "class": classes.value,
          "disabled": disabled
        }, attrs), null);
      }
      const {
        class: className,
        style,
        ...rest
      } = attrs;
      const classNames = normalizeClass$1([classes.value, className]);
      const inputNode = createVNode$1("input", mergeProps$1({
        "ref": inputRef,
        "class": `${prefixCls}-inner`,
        "disabled": disabled
      }, rest), null);
      if (!(addonBeforeNode || addonAfterNode)) {
        return createVNode$1("span", {
          "class": classNames,
          "style": style
        }, [prefixNode, inputNode, suffixNode, clearNode]);
      }
      if (!(prefixNode || suffixNode || clearNode)) {
        return createVNode$1("span", {
          "class": classNames,
          "style": style
        }, [addonBeforeNode, inputNode, addonAfterNode]);
      }
      return createVNode$1("span", {
        "class": classNames,
        "style": style
      }, [addonBeforeNode, createVNode$1("span", {
        "key": "__wrapper",
        "class": `${prefixCls}-wrapper`
      }, [prefixNode, inputNode, suffixNode, clearNode]), addonAfterNode]);
    };
  }
});
function renderAddon(slot, prop, cls, key) {
  if (!(slot || prop)) {
    return void 0;
  }
  return createVNode$1("span", {
    "key": key,
    "class": cls
  }, [slot ? slot() : prop]);
}
function renderIcon(slot, prop, cls, key) {
  if (!(slot || prop)) {
    return void 0;
  }
  return createVNode$1("span", {
    "key": key,
    "class": cls
  }, [slot ? slot() : createVNode$1(IxIcon, {
    "name": prop
  }, null)]);
}
const \u0275Input = Input$1;
const inputCommonProps = {
  control: { type: [String, Number, Object], default: void 0 },
  value: { type: String, default: void 0 },
  clearable: { type: Boolean, default: void 0 },
  clearIcon: { type: String, default: void 0 },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  size: { type: String, default: void 0 },
  status: String,
  trim: { type: Boolean, default: void 0 },
  "onUpdate:value": [Function, Array],
  onChange: [Function, Array],
  onClear: [Function, Array],
  onCompositionStart: [Function, Array],
  onCompositionEnd: [Function, Array],
  onInput: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array]
};
const inputProps = {
  ...inputCommonProps,
  addonAfter: { type: String, default: void 0 },
  addonBefore: { type: String, default: void 0 },
  borderless: { type: Boolean, default: void 0 },
  prefix: { type: String, default: void 0 },
  suffix: { type: String, default: void 0 }
};
function useInput(props, config) {
  const { accessor, control } = useAccessorAndControl();
  useFormItemRegister(control);
  const mergedSize = useFormSize(props, config);
  const mergedStatus = useFormStatus(props, control);
  const clearable = computed$2(() => {
    var _a2;
    return (_a2 = props.clearable) != null ? _a2 : config.clearable;
  });
  const clearIcon = computed$2(() => {
    var _a2;
    return (_a2 = props.clearIcon) != null ? _a2 : config.clearIcon;
  });
  const clearVisible = computed$2(() => !accessor.disabled && !props.readonly && !!accessor.value);
  const mergedTrim = computed$2(() => {
    var _a2;
    return (_a2 = props.trim) != null ? _a2 : config.trim;
  });
  const isFocused = ref$1(false);
  const handleFocus = (evt) => {
    isFocused.value = true;
    callEmit(props.onFocus, evt);
  };
  const handleBlur = (evt) => {
    isFocused.value = false;
    accessor.markAsBlurred();
    callEmit(props.onBlur, evt);
    if (mergedTrim.value) {
      setValue(evt.target.value.trim());
    }
  };
  const { elementRef, focus, blur } = useFormFocusMonitor({
    handleFocus,
    handleBlur
  });
  const setValue = (value) => {
    const oldValue = toRaw$1(accessor.value);
    if (value !== oldValue) {
      accessor.setValue(value);
      callEmit(props.onChange, value, oldValue);
      nextTick$1(() => syncValue());
    }
  };
  const syncValue = () => {
    var _a2;
    const element = elementRef.value;
    const value = (_a2 = accessor.value) != null ? _a2 : "";
    if (element && element.value !== value) {
      element.value = value;
    }
  };
  watch$1(
    () => accessor.value,
    () => syncValue()
  );
  const isComposing = ref$1(false);
  const handleInput = (evt, emitInput = true) => {
    emitInput && callEmit(props.onInput, evt);
    if (isComposing.value) {
      return;
    }
    setValue(evt.target.value);
  };
  const handleCompositionStart = (evt) => {
    isComposing.value = true;
    callEmit(props.onCompositionStart, evt);
  };
  const handleCompositionEnd = (evt) => {
    callEmit(props.onCompositionEnd, evt);
    if (isComposing.value) {
      isComposing.value = false;
      handleInput(evt, false);
    }
  };
  const handleClear = (evt) => {
    accessor.setValue("");
    callEmit(props.onClear, evt);
  };
  return {
    elementRef,
    accessor,
    mergedSize,
    mergedStatus,
    clearable,
    clearIcon,
    clearVisible,
    isFocused,
    isComposing,
    focus,
    blur,
    handleInput,
    handleCompositionStart,
    handleCompositionEnd,
    handleFocus,
    handleBlur,
    handleClear,
    syncValue
  };
}
var Input = /* @__PURE__ */ defineComponent$1({
  name: "IxInput",
  props: inputProps,
  setup(props, {
    slots,
    expose
  }) {
    const config = useGlobalConfig$1("input");
    const {
      elementRef,
      accessor,
      mergedSize,
      mergedStatus,
      clearable,
      clearIcon,
      clearVisible,
      isFocused,
      focus,
      blur,
      handleInput,
      handleCompositionStart,
      handleCompositionEnd,
      handleClear,
      syncValue
    } = useInput(props, config);
    expose({
      focus,
      blur
    });
    const inputRef = ref$1();
    onMounted$1(() => {
      elementRef.value = inputRef.value.getInputElement();
      syncValue();
    });
    return () => {
      const {
        addonAfter,
        addonBefore,
        borderless,
        prefix,
        suffix
      } = props;
      return createVNode$1(\u0275Input, {
        "ref": inputRef,
        "addonAfter": addonAfter,
        "addonBefore": addonBefore,
        "borderless": borderless,
        "clearable": clearable.value,
        "clearIcon": clearIcon.value,
        "clearVisible": clearVisible.value,
        "disabled": accessor.disabled,
        "focused": isFocused.value,
        "prefix": prefix,
        "size": mergedSize.value,
        "status": mergedStatus.value,
        "suffix": suffix,
        "onClear": handleClear,
        "readonly": props.readonly,
        "onInput": handleInput,
        "onCompositionstart": handleCompositionStart,
        "onCompositionend": handleCompositionEnd
      }, slots);
    };
  }
});
const IxInput = Input;
const zhCN = {
  type: "zh-CN",
  table: {
    layout: {
      title: "\u5E03\u5C40\u8BBE\u7F6E",
      sm: "\u7D27\u51D1",
      md: "\u9002\u4E2D",
      lg: "\u5BBD\u677E",
      placeholder: "\u641C\u7D22\u5173\u952E\u5B57",
      all: "\u5168\u90E8",
      reset: "\u91CD\u7F6E",
      indexable: "\u5E8F\u53F7",
      expandable: "\u5C55\u5F00",
      selectable: "\u52FE\u9009",
      startPin: "\u56FA\u5B9A\u5728\u5217\u9996",
      endPin: "\u56FA\u5B9A\u5728\u5217\u5C3E",
      noPin: "\u4E0D\u56FA\u5B9A",
      startPinTitle: "\u56FA\u5B9A\u5728\u5217\u9996",
      endPinTitle: "\u56FA\u5B9A\u5728\u5217\u5C3E",
      noPinTitle: "\u4E0D\u56FA\u5B9A"
    }
  },
  tree: {
    expandAll: "\u5C55\u5F00\u5168\u90E8",
    collapseAll: "\u6536\u8D77\u5168\u90E8"
  },
  search: {
    keyword: "\u5173\u952E\u5B57",
    ok: "\u786E\u5B9A",
    cancel: "\u53D6\u6D88",
    selectAll: "\u5168\u9009",
    placeholder: "\u70B9\u51FB\u9009\u62E9\u7B5B\u9009\u6761\u4EF6, \u6309\u56DE\u8F66\u952E\u786E\u8BA4",
    switchToDatePanel: "\u5207\u6362\u65E5\u671F\u9009\u62E9",
    switchToTimePanel: "\u5207\u6362\u65F6\u95F4\u9009\u62E9"
  }
};
const defaultConfig = {
  common: { prefixCls: "ix-pro" },
  locale: zhCN,
  form: {
    ajvOptions: {
      allErrors: true,
      loopEnum: 50,
      code: { esm: true }
    },
    autoId: true,
    autoLabelFor: true,
    formatComponents: {
      default: { component: IxInput }
    },
    ignoreKeywords: ["type", "enum"],
    schemaFormatter: (fields, schema) => ({ fields: fields || {}, schema: schema || {} })
  },
  table: {
    columnIndexable: {
      align: "center",
      customCell: ({ rowIndex }) => rowIndex
    },
    layoutTool: {
      searchable: false
    }
  },
  tree: {
    clearIcon: "close-circle",
    collapseIcon: ["collapse", "uncollapse"]
  },
  textarea: {
    clearable: false,
    clearIcon: "close-circle",
    resize: "none",
    size: "md",
    showCount: false,
    trim: false
  },
  search: {
    clearable: true,
    clearIcon: "close-circle",
    searchIcon: "search"
  }
};
const tokens = Object.keys(defaultConfig).map((key) => [
  key,
  Symbol(key)
]);
const tokenMap = new Map(tokens);
const createGlobalConfig = (config) => {
  const install2 = (app2) => {
    const compNames = Object.keys(config);
    compNames.forEach((compName) => {
      const token = tokenMap.get(compName);
      const currConfig = defaultConfig[compName];
      merge$1(currConfig, config[compName]);
      app2.provide(token, currConfig);
    });
  };
  return { install: install2 };
};
function useGlobalConfig(compName, config) {
  const token = tokenMap.get(compName);
  const currConfig = inject$1(token, defaultConfig[compName]);
  if (!config) {
    return currConfig;
  }
  const cloneConfig = reactive$1(merge$1(cloneDeep(currConfig), config));
  provide$1(token, cloneConfig);
  return [cloneConfig, (config2) => merge$1(cloneConfig, config2)];
}
const dropdownToken = Symbol("dropdownToken");
const collapseTransitionProps = {
  appear: {
    type: Boolean,
    default: false
  },
  name: String,
  mode: {
    type: String,
    default: "height"
  },
  onAfterEnter: [Function, Array],
  onAfterLeave: [Function, Array]
};
var CollapseTransition = /* @__PURE__ */ defineComponent$1({
  name: "\u0275CollapseTransition",
  props: collapseTransitionProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-collapse-transition`);
    const onBeforeEnter = (el) => {
      const mode = props.mode;
      el.style[mode] = `0px`;
      el.style.opacity = "0";
    };
    const onEnter = (el) => {
      const mode = props.mode;
      el.style[mode] = `${mode === "width" ? el.scrollWidth : el.scrollHeight}px`;
      el.style.opacity = "1";
    };
    const onAfterEnter = (el) => {
      const mode = props.mode;
      el.style[mode] = "";
      el.style.opacity = "";
      callEmit(props.onAfterEnter);
    };
    const onBeforeLeave = (el) => {
      const mode = props.mode;
      el.style[mode] = `${mode === "width" ? el.offsetWidth : el.offsetHeight}px`;
    };
    const onLeave = (el) => {
      const mode = props.mode;
      el.style[mode] = `0px`;
      el.style.opacity = "0";
    };
    const onAfterLeave = (el) => {
      const mode = props.mode;
      el.style[mode] = "";
      el.style.opacity = "";
      callEmit(props.onAfterLeave);
    };
    return () => {
      const {
        appear,
        name = mergedPrefixCls.value
      } = props;
      return createVNode$1(Transition, {
        "appear": appear,
        "name": name,
        "onBeforeEnter": onBeforeEnter,
        "onEnter": onEnter,
        "onAfterEnter": onAfterEnter,
        "onBeforeLeave": onBeforeLeave,
        "onLeave": onLeave,
        "onAfterLeave": onAfterLeave
      }, {
        default: () => [slots.default()]
      });
    };
  }
});
const \u0275CollapseTransition = CollapseTransition;
const itemKey = "__IDUX_MENU_ITEM";
const itemGroupKey = "__IDUX_MENU_ITEM_GROUP";
const subKey = "__IDUX_MENU_SUB";
const dividerKey = "__IDUX_MENU_DIVIDER";
function useDataSource(props, slots) {
  return computed$2(() => {
    var _a2;
    const { dataSource } = props;
    if (dataSource) {
      return dataSource;
    } else {
      return convertDataSource((_a2 = slots.default) == null ? void 0 : _a2.call(slots));
    }
  });
}
const filterKeys = [itemKey, itemGroupKey, subKey, dividerKey];
function convertDataSource(nodes) {
  const dataSource = [];
  flattenNode(nodes, { key: filterKeys }).forEach((node) => {
    var _a2, _b, _c, _d;
    const type = node.type;
    const slots = (_a2 = node.children) != null ? _a2 : {};
    const props = (_b = node.props) != null ? _b : {};
    let data;
    if (type[itemKey]) {
      const { key, disabled, icon, label } = props;
      const { icon: customIcon, label: customLabel, default: customLabel2 } = slots;
      data = {
        key,
        disabled: disabled || disabled === "",
        icon,
        label,
        customIcon,
        customLabel: customLabel != null ? customLabel : customLabel2
      };
    } else if (type[itemGroupKey]) {
      const { key, children, icon, label } = props;
      const { icon: customIcon, label: customLabel } = slots;
      data = {
        type: "itemGroup",
        key,
        children: children != null ? children : convertDataSource((_c = slots.default) == null ? void 0 : _c.call(slots)),
        icon,
        label,
        customIcon,
        customLabel
      };
    } else if (type[subKey]) {
      const { key, children, disabled, icon, label, suffix } = props;
      const { icon: customIcon, label: customLabel, suffix: customSuffix } = slots;
      data = {
        type: "sub",
        key,
        children: children != null ? children : convertDataSource((_d = slots.default) == null ? void 0 : _d.call(slots)),
        disabled: disabled || disabled === "",
        icon,
        label,
        suffix,
        customIcon,
        customLabel,
        customSuffix
      };
    } else {
      const { key } = props;
      data = { type: "divider", key };
    }
    if (data.type !== "divider" && !data.key) {
      Logger.warn("components/menu", "key must exist", data);
    }
    dataSource.push(data);
  });
  return dataSource;
}
function useExpanded$1(props) {
  const [expandedKeys, setExpandedKeys] = useControlledProp(props, "expandedKeys", () => []);
  const handleExpand = (key, expanded) => {
    const index = expandedKeys.value.indexOf(key);
    if (expanded) {
      index === -1 && setExpandedKeys([...expandedKeys.value, key]);
    } else {
      if (index > -1) {
        const tempKeys = [...expandedKeys.value];
        tempKeys.splice(index, 1);
        setExpandedKeys(tempKeys);
      }
    }
  };
  let cachedExpandedKeys = [];
  watch$1(
    () => props.collapsed,
    (collapsed) => {
      if (collapsed) {
        cachedExpandedKeys = [...expandedKeys.value];
        setExpandedKeys([]);
      } else {
        setExpandedKeys(cachedExpandedKeys);
        cachedExpandedKeys = [];
      }
    }
  );
  return { expandedKeys, handleExpand };
}
function useSelected(props, dropdownContext) {
  const [selectedKeys, setSelectedKeys] = useControlledProp(props, "selectedKeys", () => []);
  const handleSelected = (key) => {
    if (dropdownContext) {
      const { hideOnClick, setVisibility } = dropdownContext;
      hideOnClick.value && setVisibility(false);
    }
    if (!props.selectable) {
      return;
    }
    const index = selectedKeys.value.indexOf(key);
    if (index > -1) {
      if (props.multiple) {
        const tempKeys = [...selectedKeys.value];
        tempKeys.splice(index, 1);
        setSelectedKeys(tempKeys);
      }
    } else {
      setSelectedKeys(props.multiple ? [...selectedKeys.value, key] : [key]);
    }
  };
  return { selectedKeys, handleSelected };
}
const menuToken = Symbol("menuToken");
const menuSubToken = Symbol("menuSubToken");
const menuItemGroupToken = Symbol("menuItemGroupToken");
const MenuDivider = (props) => {
  const {
    props: menuProps2,
    mergedPrefixCls
  } = inject$1(menuToken);
  const customAdditional = menuProps2.customAdditional ? menuProps2.customAdditional({
    data: props.data,
    index: props.index
  }) : void 0;
  return createVNode$1("li", mergeProps$1({
    "class": `${mergedPrefixCls.value}-divider`
  }, customAdditional), null);
};
MenuDivider.displayName = "MenuDivider";
const usePaddingLeft = (menuProps2, mode, indent, level, grouped) => {
  return computed$2(() => {
    if (mode.value !== "inline" || menuProps2.collapsed) {
      return void 0;
    }
    const groupedLeft = grouped ? 8 : 0;
    return `${indent.value * level + groupedLeft}px`;
  });
};
const menuProps = {
  expandedKeys: Array,
  selectedKeys: Array,
  collapsed: {
    type: Boolean,
    default: false
  },
  customAdditional: { type: Function, default: void 0 },
  dataSource: Array,
  getKey: {
    type: [String, Function],
    default: void 0
  },
  indent: Number,
  mode: {
    type: String,
    default: "vertical"
  },
  multiple: {
    type: Boolean,
    default: false
  },
  overlayClassName: String,
  overlayContainer: {
    type: [String, HTMLElement, Function],
    default: void 0
  },
  overlayDelay: {
    type: [Number, Array],
    default: () => [0, 100]
  },
  selectable: {
    type: Boolean,
    default: true
  },
  theme: String,
  "onUpdate:expandedKeys": [Function, Array],
  "onUpdate:selectedKeys": [Function, Array],
  onClick: [Function, Array]
};
const menuItemProps = {
  data: {
    type: Object,
    required: true
  },
  index: { type: Number, required: true }
};
const menuItemGroupProps = {
  data: {
    type: Object,
    required: true
  },
  index: { type: Number, required: true }
};
const menuSubProps = {
  data: {
    type: Object,
    required: true
  },
  index: { type: Number, required: true }
};
var MenuItem = /* @__PURE__ */ defineComponent$1({
  name: "MenuItem",
  props: menuItemProps,
  setup(props) {
    const key = useKey();
    const {
      props: menuProps2,
      slots: menuSlots,
      mergedPrefixCls,
      indent,
      selectedKeys,
      handleSelected,
      handleClick
    } = inject$1(menuToken);
    const menuSubContext = inject$1(menuSubToken, null);
    const menuItemGroupContext = inject$1(menuItemGroupToken, false);
    const level = menuSubContext ? menuSubContext.level + 1 : 1;
    const isSelected = computed$2(() => selectedKeys.value.includes(key));
    const classes = computed$2(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-level-${level}`]: true,
        [`${prefixCls}-item-disabled`]: props.data.disabled,
        [`${prefixCls}-item-selected`]: isSelected.value
      });
    });
    const mode = computed$2(() => menuProps2.mode);
    const paddingLeft = usePaddingLeft(menuProps2, mode, indent, level, menuItemGroupContext);
    const style = computed$2(() => {
      return {
        paddingLeft: paddingLeft.value
      };
    });
    const onClick = (evt) => {
      handleSelected(key);
      handleClick(key, "item", evt);
      menuSubContext == null ? void 0 : menuSubContext.handleItemClick();
    };
    return () => {
      const {
        disabled,
        icon,
        label,
        customIcon,
        customLabel,
        customSuffix
      } = props.data;
      const iconRender = customIcon != null ? customIcon : "itemIcon";
      const iconSlot = isString$1(iconRender) ? menuSlots[iconRender] : iconRender;
      const labelRender = customLabel != null ? customLabel : "itemLabel";
      const labelSlot = isString$1(labelRender) ? menuSlots[labelRender] : labelRender;
      const suffixRender = customSuffix != null ? customSuffix : "itemSuffix";
      const suffixSlot = isString$1(suffixRender) ? menuSlots[suffixRender] : suffixRender;
      const slotProps = iconSlot || labelSlot ? {
        ...props.data,
        selected: isSelected.value
      } : void 0;
      const iconNode = coverIcon(iconSlot, slotProps, icon);
      const labelNode = labelSlot ? labelSlot(slotProps) : label;
      const customAdditional = menuProps2.customAdditional ? menuProps2.customAdditional({
        data: props.data,
        index: props.index
      }) : void 0;
      const suffixNode = coverIcon(suffixSlot, slotProps, props.data.suffix);
      return createVNode$1("li", mergeProps$1({
        "class": classes.value,
        "style": style.value,
        "aria-label": label,
        "aria-selected": isSelected.value,
        "role": "menuitem",
        "onClick": disabled ? void 0 : onClick
      }, customAdditional), [iconNode, createVNode$1("span", null, [labelNode]), suffixNode && createVNode$1("span", {
        "class": `${mergedPrefixCls.value}-item-suffix`
      }, [suffixNode])]);
    };
  }
});
var MenuItemGroup = /* @__PURE__ */ defineComponent$1({
  name: "MenuItemGroup",
  props: menuItemGroupProps,
  setup(props) {
    const key = useKey();
    provide$1(menuItemGroupToken, true);
    const {
      props: menuProps2,
      slots: menuSlots,
      mergedPrefixCls,
      mergedGetKey,
      indent,
      handleClick
    } = inject$1(menuToken);
    const menuSubContext = inject$1(menuSubToken, null);
    const menuItemGroupContext = inject$1(menuItemGroupToken, null);
    const level = menuSubContext ? menuSubContext.level + 1 : 1;
    const mode = computed$2(() => menuProps2.mode);
    const paddingLeft = usePaddingLeft(menuProps2, mode, indent, level, !!menuItemGroupContext);
    const labelStyle = computed$2(() => ({
      paddingLeft: paddingLeft.value
    }));
    const classes = computed$2(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [`${prefixCls}-item-group`]: true,
        [`${prefixCls}-level-${level}`]: true
      });
    });
    const onClick = (evt) => {
      handleClick(key, "itemGroup", evt);
    };
    return () => {
      const {
        icon,
        label,
        children,
        customIcon,
        customLabel
      } = props.data;
      const iconRender = customIcon != null ? customIcon : "itemGroupIcon";
      const iconSlot = isString$1(iconRender) ? menuSlots[iconRender] : iconRender;
      const labelRender = customLabel != null ? customLabel : "itemGroupLabel";
      const labelSlot = isString$1(labelRender) ? menuSlots[labelRender] : labelRender;
      const slotProps = props.data;
      const iconNode = coverIcon(iconSlot, slotProps, icon);
      const labelNode = labelSlot ? labelSlot(slotProps) : label;
      const prefixCls = `${mergedPrefixCls.value}-item-group`;
      const customAdditional = menuProps2.customAdditional ? menuProps2.customAdditional({
        data: props.data,
        index: props.index
      }) : void 0;
      return createVNode$1("li", mergeProps$1({
        "class": classes.value,
        "aria-label": label
      }, customAdditional), [createVNode$1("div", {
        "class": `${prefixCls}-label`,
        "style": labelStyle.value,
        "onClick": onClick
      }, [iconNode, createVNode$1("span", null, [labelNode])]), createVNode$1("ul", {
        "class": `${prefixCls}-content`
      }, [coverChildren(children, mergedGetKey.value)])]);
    };
  }
});
var InlineContent = /* @__PURE__ */ defineComponent$1({
  name: "MenuSubInlineContent",
  setup() {
    const {
      mergedPrefixCls,
      mergedGetKey
    } = inject$1(menuToken);
    const {
      props,
      isExpanded
    } = inject$1(menuSubToken);
    const classes = computed$2(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [`${prefixCls}-inline`]: true
      });
    });
    return () => {
      return createVNode$1(\u0275CollapseTransition, {
        "appear": true
      }, {
        default: () => [withDirectives(createVNode$1("ul", {
          "class": classes.value
        }, [coverChildren(props.data.children, mergedGetKey.value)]), [[vShow, isExpanded.value]])]
      });
    };
  }
});
var Label = /* @__PURE__ */ defineComponent$1({
  name: "MenuSubLabel",
  setup() {
    const {
      slots: menuSlots,
      config,
      mergedPrefixCls,
      handleClick
    } = inject$1(menuToken);
    const {
      props,
      key,
      isExpanded,
      isSelected,
      changeExpanded,
      handleMouseEvent,
      mode,
      paddingLeft
    } = inject$1(menuSubToken);
    const mergedSuffix = computed$2(() => {
      const {
        suffix
      } = props.data;
      if (suffix) {
        return suffix;
      }
      return mode.value !== "horizontal" ? config.suffix : void 0;
    });
    const rotate = computed$2(() => {
      if (mode.value === "inline") {
        return isExpanded.value ? -90 : 90;
      }
      return 0;
    });
    const events2 = computed$2(() => {
      if (props.data.disabled) {
        return void 0;
      }
      if (mode.value === "inline") {
        return {
          onClick: (evt) => {
            handleClick(key, "sub", evt);
            changeExpanded(!isExpanded.value);
          }
        };
      } else {
        return {
          onClick: (evt) => handleClick(key, "sub", evt),
          onMouseenter: () => handleMouseEvent(true),
          onMouseleave: () => handleMouseEvent(false)
        };
      }
    });
    const style = computed$2(() => {
      return {
        paddingLeft: paddingLeft.value
      };
    });
    return () => {
      const {
        icon,
        label,
        customIcon,
        customLabel,
        customSuffix
      } = props.data;
      const iconRender = customIcon != null ? customIcon : "subIcon";
      const iconSlot = isString$1(iconRender) ? menuSlots[iconRender] : iconRender;
      const labelRender = customLabel != null ? customLabel : "subLabel";
      const labelSlot = isString$1(labelRender) ? menuSlots[labelRender] : labelRender;
      const suffixRender = customSuffix != null ? customSuffix : "subSuffix";
      const suffixSlot = isString$1(suffixRender) ? menuSlots[suffixRender] : suffixRender;
      const slotProps = iconSlot || labelSlot || suffixSlot ? {
        ...props.data,
        expanded: isExpanded.value,
        selected: isSelected.value
      } : void 0;
      const iconNode = coverIcon(iconSlot, slotProps, icon);
      const labelNode = labelSlot ? labelSlot(slotProps) : label;
      const suffixNode = coverIcon(suffixSlot, slotProps, mergedSuffix.value, rotate.value);
      const prefixCls = `${mergedPrefixCls.value}-sub-label`;
      return createVNode$1("div", mergeProps$1({
        "class": prefixCls,
        "style": style.value
      }, events2.value), [iconNode, createVNode$1("span", null, [labelNode]), suffixNode && createVNode$1("span", {
        "class": `${prefixCls}-suffix`
      }, [suffixNode])]);
    };
  }
});
var OverlayContent = /* @__PURE__ */ defineComponent$1({
  name: "MenuSubOverlayContent",
  setup() {
    const {
      mergedPrefixCls,
      theme,
      mergedGetKey
    } = inject$1(menuToken);
    const {
      props,
      isExpanded,
      handleMouseEvent
    } = inject$1(menuSubToken);
    const dropdownContext = inject$1(dropdownToken, null);
    const classes = computed$2(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-dropdown`]: !!dropdownContext,
        [`${prefixCls}-vertical`]: true,
        [`${prefixCls}-${theme.value}`]: true
      });
    });
    const events2 = computed$2(() => {
      if (props.data.disabled || !isExpanded.value) {
        return void 0;
      }
      return {
        onMouseenter: () => handleMouseEvent(true),
        onMouseleave: () => handleMouseEvent(false)
      };
    });
    return () => createVNode$1("ul", mergeProps$1({
      "class": classes.value
    }, events2.value), [coverChildren(props.data.children, mergedGetKey.value)]);
  }
});
var MenuSub = /* @__PURE__ */ defineComponent$1({
  name: "MenuSub",
  props: menuSubProps,
  setup(props) {
    const common = useGlobalConfig$1("common");
    const mergedTransitionName = computed$2(() => `${common.prefixCls}-fade`);
    const {
      props: menuProps2,
      config,
      mergedPrefixCls,
      indent,
      selectedKeys,
      expandedKeys,
      handleExpand
    } = inject$1(menuToken);
    const menuSubContext = inject$1(menuSubToken, null);
    const menuItemGroupContext = inject$1(menuItemGroupToken, false);
    const key = useKey();
    const mode = useMode(menuProps2, menuSubContext);
    const level = menuSubContext ? menuSubContext.level + 1 : 1;
    const paddingLeft = usePaddingLeft(menuProps2, mode, indent, level, menuItemGroupContext);
    const isSelected = computed$2(() => getState(props.data.children, selectedKeys.value));
    const {
      isExpanded,
      changeExpanded,
      handleMouseEvent
    } = useExpanded(props, key, expandedKeys, handleExpand, mode);
    const handleItemClick = () => {
      if (!props.data.disabled && mode.value !== "inline" && !menuProps2.multiple) {
        handleMouseEvent(false);
        handleExpand(key, false);
      }
    };
    provide$1(menuSubToken, {
      props,
      key,
      isExpanded,
      isSelected,
      mode,
      level,
      paddingLeft,
      changeExpanded,
      handleMouseEvent,
      handleItemClick
    });
    const placement = computed$2(() => mode.value === "vertical" ? "rightStart" : "bottomStart");
    const classes = computed$2(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [`${prefixCls}-sub`]: true,
        [`${prefixCls}-level-${level}`]: true,
        [`${prefixCls}-sub-disabled`]: props.data.disabled,
        [`${prefixCls}-sub-expanded`]: isExpanded.value,
        [`${prefixCls}-sub-selected`]: isSelected.value
      });
    });
    const overlayClasses = computed$2(() => {
      const {
        overlayClassName
      } = menuProps2;
      return normalizeClass$1({
        [`${mergedPrefixCls.value}-overlay`]: true,
        [overlayClassName || ""]: !!overlayClassName
      });
    });
    const offset2 = computed$2(() => {
      var _a2;
      return (_a2 = props.data.offset) != null ? _a2 : config.offset;
    });
    return () => {
      var _a2;
      const {
        disabled
      } = props.data;
      const isInline = mode.value === "inline";
      let children;
      if (isInline) {
        children = [createVNode$1(Label, null, null), createVNode$1(InlineContent, null, null)];
      } else {
        const trigger2 = () => createVNode$1(Label, null, null);
        const content = () => createVNode$1(OverlayContent, null, null);
        children = createVNode$1(\u0275Overlay, {
          "class": overlayClasses.value,
          "autoAdjust": true,
          "container": (_a2 = menuProps2.overlayContainer) != null ? _a2 : config.overlayContainer,
          "containerFallback": `.${mergedPrefixCls.value}-overlay-container`,
          "destroyOnHide": false,
          "delay": menuProps2.overlayDelay,
          "disabled": disabled,
          "offset": offset2.value,
          "placement": placement.value,
          "transitionName": mergedTransitionName.value,
          "trigger": "manual",
          "visible": isExpanded.value
        }, {
          default: trigger2,
          content
        });
      }
      const customAdditional = menuProps2.customAdditional ? menuProps2.customAdditional({
        data: props.data,
        index: props.index
      }) : void 0;
      return createVNode$1("li", mergeProps$1({
        "class": classes.value,
        "aria-expanded": isExpanded.value,
        "aria-haspopup": !isInline,
        "role": "menuitem"
      }, customAdditional), [children]);
    };
  }
});
function useMode(menuProps2, menuSubContext) {
  const defaultMode = menuProps2.mode !== "inline" && !!menuSubContext ? "vertical" : menuProps2.mode;
  const [mode, setMode] = useState(defaultMode);
  watch$1(() => menuProps2.mode, (mode2) => {
    nextTick$1(() => setMode(mode2 !== "inline" && !!menuSubContext ? "vertical" : mode2));
  });
  return mode;
}
function useExpanded(props, key, expandedKeys, handleExpand, mode) {
  const isHover = ref$1(false);
  const isExpanded = computed$2(() => {
    if (mode.value === "inline") {
      return expandedKeys.value.includes(key);
    }
    return isHover.value && expandedKeys.value.includes(key) || childExpanded.value;
  });
  const changeExpanded = (expanded) => handleExpand(key, expanded);
  const childExpanded = computed$2(() => getState(props.data.children, expandedKeys.value));
  const handleMouseEvent = debounce((value) => isHover.value = value, 100);
  watch$1([mode, childExpanded, isHover], ([currMode, currChildExpanded, currIsHover]) => {
    if (currMode !== "inline") {
      changeExpanded(currChildExpanded || currIsHover);
    }
  });
  return {
    isExpanded,
    changeExpanded,
    handleMouseEvent
  };
}
function getState(children, selectedKeys) {
  if (!children || children.length === 0) {
    return false;
  }
  return children.some((item) => {
    return item.key && selectedKeys.includes(item.key) || "children" in item && getState(item.children, selectedKeys);
  });
}
function coverChildren(data, getKetFn) {
  if (!data || data.length === 0) {
    return [];
  }
  const nodes = [];
  data.forEach((item, index) => {
    const {
      type
    } = item;
    const key = getKetFn(item);
    if (!type || type === "item") {
      nodes.push(createVNode$1(MenuItem, {
        "key": key,
        "index": index,
        "data": item
      }, null));
    } else if (type === "sub") {
      nodes.push(createVNode$1(MenuSub, {
        "key": key,
        "index": index,
        "data": item
      }, null));
    } else if (type === "itemGroup") {
      nodes.push(createVNode$1(MenuItemGroup, {
        "key": key,
        "index": index,
        "data": item
      }, null));
    } else if (type === "divider") {
      nodes.push(createVNode$1(MenuDivider, {
        "key": key,
        "index": index,
        "data": item
      }, null));
    } else {
      Logger.warn("components/menu", `type [${type}] not supported`);
    }
  });
  return nodes;
}
function coverIcon(slot, slotProps, iconOrName, rotate) {
  if (slot) {
    return slot(slotProps);
  }
  return isString$1(iconOrName) ? createVNode$1(IxIcon, {
    "name": iconOrName,
    "rotate": rotate
  }, null) : iconOrName;
}
var Menu = /* @__PURE__ */ defineComponent$1({
  name: "IxMenu",
  props: menuProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-menu`);
    const config = useGlobalConfig$1("menu");
    const mergedGetKey = useGetKey(props, config, "components/menu");
    const indent = computed$2(() => {
      var _a2;
      return (_a2 = props.indent) != null ? _a2 : config.indent;
    });
    const mode = computed$2(() => props.mode);
    const theme = computed$2(() => {
      var _a2;
      return (_a2 = props.theme) != null ? _a2 : config.theme;
    });
    const dropdownContext = inject$1(dropdownToken, null);
    const {
      expandedKeys,
      handleExpand
    } = useExpanded$1(props);
    const {
      selectedKeys,
      handleSelected
    } = useSelected(props, dropdownContext);
    const handleClick = (key, type, evt) => {
      callEmit(props.onClick, {
        key,
        type,
        event: evt
      });
    };
    provide$1(menuToken, {
      props,
      slots,
      config,
      mergedPrefixCls,
      mergedGetKey,
      indent,
      theme,
      expandedKeys,
      handleExpand,
      selectedKeys,
      handleSelected,
      handleClick
    });
    const classes = computed$2(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-${theme.value}`]: true,
        [`${prefixCls}-${mode.value}`]: true,
        [`${prefixCls}-collapsed`]: props.collapsed,
        [`${prefixCls}-dropdown`]: !!dropdownContext
      });
    });
    const dateSource = useDataSource(props, slots);
    return () => {
      return createVNode$1("ul", {
        "class": classes.value
      }, [coverChildren(dateSource.value, mergedGetKey.value)]);
    };
  }
});
const IxMenu = Menu;
function getMenuChildren(menu) {
  if (!menu || !("children" in menu)) {
    return NoopArray;
  }
  return menu.children;
}
function getTargetPaths(menus, target) {
  if (!target) {
    return getDefaultPaths(menus);
  }
  let result = [];
  for (let i = 0; i < menus.length; i++) {
    const curMenu = menus[i];
    if (curMenu.key === target) {
      result = [curMenu];
      break;
    } else {
      const activeChildren = getTargetPaths(getMenuChildren(curMenu), target);
      if (activeChildren.length > 0) {
        result = [curMenu, ...activeChildren];
        break;
      }
    }
  }
  return result;
}
function getDefaultPaths(menus) {
  if (!menus || menus.length === 0) {
    return NoopArray;
  }
  const currMenu = menus.find((menu) => menu.type !== "divider" && !menu.disabled);
  if (!currMenu) {
    return NoopArray;
  }
  const paths = [currMenu];
  const children = getMenuChildren(currMenu);
  if (children.length > 0) {
    paths.push(...getDefaultPaths(children));
  }
  return paths;
}
function useActiveKey(props) {
  var _a2;
  let defaultActiveKey = props.activeKey;
  const [activeKey, setActiveKey] = useControlledProp(props, "activeKey", defaultActiveKey);
  if (isNil(defaultActiveKey)) {
    const defaultPaths = getDefaultPaths(props.menus);
    defaultActiveKey = (_a2 = defaultPaths[defaultPaths.length - 1]) == null ? void 0 : _a2.key;
    if (defaultActiveKey) {
      setActiveKey(defaultActiveKey);
    }
  }
  return { activeKey, setActiveKey };
}
function useActiveHeaderKey(props, activePaths, headerMenus) {
  return computed$2(() => {
    const { type } = props;
    const currActivePaths = activePaths.value;
    if (type === "both") {
      if (currActivePaths.length === 0) {
        const [firstMenu] = headerMenus.value;
        return firstMenu == null ? void 0 : firstMenu.key;
      }
      return currActivePaths[0].key;
    }
    if (type === "header") {
      const lastPath = currActivePaths[currActivePaths.length - 1];
      return lastPath == null ? void 0 : lastPath.key;
    }
    return void 0;
  });
}
function useHeaderMenus(props) {
  return computed$2(() => {
    const { type, menus } = props;
    if (type === "header") {
      return menus;
    }
    if (type === "both") {
      return menus.map((menu) => {
        if (!menu.type || menu.type === "item" || menu.type === "divider") {
          return menu;
        }
        const { children, ...rest } = menu;
        rest.type = "item";
        return rest;
      });
    }
    return NoopArray;
  });
}
function useSiderMenus(props, activeHeaderKey) {
  return computed$2(() => {
    const { type, menus } = props;
    if (["mixin", "sider"].includes(type)) {
      return menus;
    }
    if (type === "both") {
      const currActiveMenu = menus.find((menu) => menu.key === activeHeaderKey.value);
      return getMenuChildren(currActiveMenu);
    }
    return NoopArray;
  });
}
const proLayoutToken = Symbol("proLayout");
var Logo = /* @__PURE__ */ defineComponent$1({
  name: "IxProLayoutLogo",
  setup(_, {
    slots
  }) {
    const {
      props,
      mergedPrefixCls
    } = inject$1(proLayoutToken);
    return () => {
      let logoNode;
      if (slots.logo) {
        logoNode = slots.logo();
      } else if (props.logo) {
        const {
          image,
          title,
          link = "/"
        } = props.logo;
        logoNode = createVNode$1("a", {
          "href": link
        }, [isString$1(image) ? createVNode$1("img", {
          "src": image,
          "alt": "logo"
        }, null) : image, title && createVNode$1("h1", null, [title])]);
      }
      return logoNode && createVNode$1("div", {
        "class": `${mergedPrefixCls.value}-logo`
      }, [logoNode]);
    };
  }
});
var Header = /* @__PURE__ */ defineComponent$1({
  name: "IxProLayoutHeader",
  setup(_, {
    slots
  }) {
    const {
      props,
      mergedPrefixCls,
      setActiveKey,
      headerMenus,
      activeHeaderKey
    } = inject$1(proLayoutToken);
    const theme = computed$2(() => {
      const {
        theme: theme2
      } = props;
      return isObject$1(theme2) ? theme2.header : theme2;
    });
    const classes = computed$2(() => {
      const prefixCls = `${mergedPrefixCls.value}-header`;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-${theme.value}`]: true
      });
    });
    const menuSelectedKeys = computed$2(() => activeHeaderKey.value ? [activeHeaderKey.value] : []);
    const onMenuClick = (menuClickOption) => {
      var _a2;
      if (props.type === "both") {
        const targetMenu = props.menus.find((menu) => menu.key === menuClickOption.key);
        if (targetMenu && "children" in targetMenu && !!((_a2 = targetMenu.children) == null ? void 0 : _a2.length)) {
          const activePaths = getDefaultPaths(targetMenu.children);
          setActiveKey(activePaths.pop().key);
          callEmit(props["onMenuClick"], {
            ...menuClickOption,
            type: targetMenu.type
          });
          return;
        }
      }
      if (menuClickOption.type === "item") {
        setActiveKey(menuClickOption.key);
      }
      callEmit(props["onMenuClick"], menuClickOption);
    };
    return () => {
      const prefixCls = `${mergedPrefixCls.value}-header`;
      const innerMenuProps = {
        overlayClassName: `${prefixCls}-menu-overlay`,
        dataSource: headerMenus.value,
        selectedKeys: menuSelectedKeys.value,
        mode: "horizontal",
        theme: theme.value,
        onClick: onMenuClick
      };
      const menuProps2 = mergeProps$1(innerMenuProps, props.headerMenu);
      const contentNode = slots.headerContent ? slots.headerContent(menuProps2) : createVNode$1(IxMenu, menuProps2, slots);
      return createVNode$1(IxLayoutHeader, {
        "class": classes.value
      }, {
        default: () => [createVNode$1(Logo, null, slots), createVNode$1("div", {
          "class": `${prefixCls}-content`
        }, [contentNode]), slots.headerExtra && createVNode$1("div", {
          "class": `${prefixCls}-extra`
        }, [slots.headerExtra()])]
      });
    };
  }
});
var Sider = /* @__PURE__ */ defineComponent$1({
  name: "IxProLayoutSider",
  setup(_, {
    slots
  }) {
    const {
      props,
      mergedPrefixCls,
      activeKey,
      setActiveKey,
      activePaths,
      siderMenus,
      collapsed,
      setCollapsed
    } = inject$1(proLayoutToken);
    const {
      expandedKeys,
      setExpandedKeys
    } = useExpandedKeys(activePaths, siderMenus);
    const theme = computed$2(() => {
      const {
        theme: theme2
      } = props;
      return isObject$1(theme2) ? theme2.sider : theme2;
    });
    const classes = computed$2(() => {
      const prefixCls = `${mergedPrefixCls.value}-sider`;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-${theme.value}`]: true
      });
    });
    const menuSelectedKeys = computed$2(() => [activeKey.value]);
    const onMenuClick = (menuClickOption) => {
      callEmit(props["onMenuClick"], menuClickOption);
    };
    return () => {
      const prefixCls = `${mergedPrefixCls.value}-sider`;
      const {
        siderHover
      } = props;
      const innerSiderProps = {
        collapsed: collapsed.value,
        "onUpdate:collapsed": setCollapsed,
        pointer: !!siderHover,
        pointerDelay: isObject$1(siderHover) ? siderHover.delay : void 0
      };
      const siderProps = mergeProps$1(innerSiderProps, props.sider);
      const innerMenuProps = {
        overlayClassName: `${prefixCls}-menu-overlay`,
        collapsed: siderProps.collapsed,
        dataSource: siderMenus.value,
        expandedKeys: expandedKeys.value,
        "onUpdate:expandedKeys": setExpandedKeys,
        selectedKeys: menuSelectedKeys.value,
        "onUpdate:selectedKeys": (keys2) => setActiveKey(keys2[0]),
        mode: !siderProps.collapsed || siderProps.pointer ? "inline" : "vertical",
        theme: theme.value,
        onClick: onMenuClick
      };
      const menuProps2 = mergeProps$1(innerMenuProps, props.siderMenu);
      const contentNode = slots.siderContent ? slots.siderContent(menuProps2) : createVNode$1(IxMenu, menuProps2, slots);
      return createVNode$1(IxLayoutSider, mergeProps$1({
        "class": classes.value
      }, siderProps), {
        default: () => [props.type === "sider" && createVNode$1(Logo, null, slots), slots.siderHeader && createVNode$1("div", {
          "class": `${prefixCls}-header`
        }, [slots.siderHeader()]), createVNode$1("div", {
          "class": `${prefixCls}-content`
        }, [contentNode]), slots.siderFooter && createVNode$1("div", {
          "class": `${prefixCls}-footer`
        }, [slots.siderFooter()])]
      });
    };
  }
});
function useExpandedKeys(activePaths, siderMenus) {
  const [expandedKeys, _setExpandedKeys] = useState(getExpandedKeys(activePaths.value));
  watch$1(activePaths, (paths) => _setExpandedKeys(getExpandedKeys(paths)));
  const setExpandedKeys = (keys2) => {
    const oldKeys = expandedKeys.value;
    if (oldKeys.length > keys2.length) {
      _setExpandedKeys(keys2);
      return;
    }
    let targetPaths;
    const lastKey = keys2[keys2.length - 1];
    const targetIndex = activePaths.value.findIndex((menu) => menu.key === lastKey);
    if (targetIndex > -1) {
      targetPaths = activePaths.value.slice(0, targetIndex + 1);
    } else {
      targetPaths = getTargetPaths(siderMenus.value, lastKey);
    }
    _setExpandedKeys(getExpandedKeys(targetPaths));
  };
  return {
    expandedKeys,
    setExpandedKeys
  };
}
function getExpandedKeys(menus) {
  return menus.filter((menu) => {
    var _a2;
    return menu.type === "sub" && !!((_a2 = menu.children) == null ? void 0 : _a2.length);
  }).map((menu) => menu.key);
}
const proLayoutProps = {
  activeKey: { type: [String, Number, Symbol], default: void 0 },
  collapsed: { type: Boolean, default: void 0 },
  compress: { type: Boolean, default: true },
  fixed: {
    type: [Boolean, Object],
    default: true
  },
  headerMenu: {
    type: Object,
    default: void 0
  },
  logo: {
    type: Object,
    default: void 0
  },
  menus: {
    type: Array,
    default: () => []
  },
  sider: {
    type: Object,
    default: void 0
  },
  siderHover: {
    type: [Boolean, Object],
    default: void 0
  },
  siderMenu: {
    type: Object,
    default: void 0
  },
  theme: {
    type: [String, Object],
    default: () => ({ header: "dark", sider: "light" })
  },
  type: {
    type: String,
    default: "both"
  },
  "onUpdate:activeKey": [Function, Array],
  "onUpdate:collapsed": [Function, Array],
  onMenuClick: [Function, Array]
};
var ProLayout = /* @__PURE__ */ defineComponent$1({
  name: "IxProLayout",
  props: proLayoutProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-layout`);
    const {
      activeKey,
      setActiveKey
    } = useActiveKey(props);
    const activePaths = computed$2(() => getTargetPaths(props.menus, activeKey.value));
    const headerMenus = useHeaderMenus(props);
    const activeHeaderKey = useActiveHeaderKey(props, activePaths, headerMenus);
    const siderMenus = useSiderMenus(props, activeHeaderKey);
    const [collapsed, setCollapsed] = useControlledProp(props, "collapsed", () => {
      const {
        collapsed: collapsed2 = false
      } = props.sider || {};
      return collapsed2;
    });
    provide$1(proLayoutToken, {
      props,
      slots,
      mergedPrefixCls,
      activeKey,
      setActiveKey,
      activePaths,
      headerMenus,
      activeHeaderKey,
      siderMenus,
      collapsed,
      setCollapsed
    });
    const classes = computed$2(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-is-${props.type}`]: true
      });
    });
    const showSider = computed$2(() => {
      const {
        type
      } = props;
      return type === "both" && siderMenus.value.length > 0 || type === "sider" || type === "mixin";
    });
    return () => {
      const prefixCls = mergedPrefixCls.value;
      return createVNode$1(IxLayout, {
        "class": classes.value,
        "fixed": props.fixed,
        "floatSider": !props.compress
      }, {
        default: () => [props.type !== "sider" && createVNode$1(Header, null, slots), showSider.value && createVNode$1(Sider, null, slots), createVNode$1(IxLayoutContent, {
          "class": `${prefixCls}-content`
        }, {
          default: () => {
            var _a2;
            return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)];
          }
        }), slots.footer && createVNode$1(IxLayoutFooter, {
          "class": `${prefixCls}-footer`
        }, {
          default: () => [slots.footer()]
        })]
      });
    };
  }
});
const IxProLayout = ProLayout;
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
const themeToken = Symbol("theme");
const appContextToken = Symbol("appContext");
const breakpointsToken = Symbol("breakpoint");
const pageContextToken = Symbol("pageContext");
const AppComp = defineComponent$1(() => {
  const {
    menuData,
    theme,
    render: render2,
    renderers,
    activeRecords,
    getRecordNavKey
  } = inject$1(appContextToken);
  const breakpoints = inject$1(breakpointsToken);
  const activeKey = computed$2(() => getRecordNavKey(activeRecords.value[0]));
  const rootWrapperCls = computed$2(() => {
    const prefixCls = "archive-app__root-wrapper";
    return normalizeClass$1({
      [prefixCls]: true,
      [`${prefixCls}-xs`]: breakpoints.xs,
      [`${prefixCls}-sm`]: breakpoints.sm,
      [`${prefixCls}-md`]: breakpoints.md,
      [`${prefixCls}-lg`]: breakpoints.lg,
      [`${prefixCls}-xl`]: breakpoints.xl
    });
  });
  const layoutType = computed$2(() => {
    if (breakpoints.sm || breakpoints.xs) {
      return "header";
    }
    return theme.layout.type;
  });
  const renderItemLabel = (item) => {
    if (item.recordType === "item" || item.recordType === "sub") {
      return createVNode$1(RouterLink, {
        "to": item.path
      }, {
        default: () => [createVNode$1("span", null, [item.name])]
      });
    }
    if (item.recordType === "link") {
      return createVNode$1("a", {
        "target": "_blank",
        "href": item.link
      }, [createVNode$1("span", null, [item.name])]);
    }
    return createVNode$1("span", null, [item.name]);
  };
  const renderLogo = renderers.logo ? () => render2(theme.logo, renderers.logo) : void 0;
  const renderHeaderContent = renderers.layoutHeaderContent ? (menuProps2) => render2(menuProps2, renderers.layoutHeaderContent) : void 0;
  const renderHeaderExtra = renderers.layoutHeaderExtra ? () => render2({}, renderers.layoutHeaderExtra) : void 0;
  const renderSiderHeaderLabel = () => render2({}, renderers.layoutSiderHeaderLabel, () => {
    var _a2, _b;
    return createVNode$1("span", {
      "class": "archive-app__sider-header-label"
    }, [(_b = (_a2 = activeRecords.value[activeRecords.value.length - 1]) == null ? void 0 : _a2.name) != null ? _b : ""]);
  });
  const renderSiderHeader = () => render2({}, renderers.layoutSiderHeader, () => {
    const label = renderSiderHeaderLabel();
    return theme.layout.siderCollapsable === "top" ? createVNode$1(IxLayoutSiderTrigger, null, {
      default: () => [label]
    }) : label;
  });
  const renderSiderContent = renderers.layoutSiderContent ? (menuProps2) => render2(menuProps2, renderers.layoutSiderContent) : void 0;
  const renderSiderFooterLabel = () => render2({}, renderers.layoutSiderFooterLabel);
  const renderSiderFooter = theme.layout.siderCollapsable === "bottom" || renderers.layoutSiderFooter ? () => render2({}, renderers.layoutSiderFooter, () => {
    const label = renderSiderFooterLabel();
    return theme.layout.siderCollapsable === "bottom" ? createVNode$1(IxLayoutSiderTrigger, null, {
      default: () => [label]
    }) : label;
  }) : void 0;
  const proLayoutSlots = {
    itemLabel: renderItemLabel,
    logo: renderLogo,
    headerContent: renderHeaderContent,
    headerExtra: renderHeaderExtra,
    siderHeader: renderSiderHeader,
    siderContent: renderSiderContent,
    siderFooter: renderSiderFooter
  };
  return () => createVNode$1(IxProLayout, {
    "class": rootWrapperCls.value,
    "activeKey": activeKey.value,
    "menus": menuData,
    "type": layoutType.value,
    "logo": theme.logo
  }, {
    default: () => [createVNode$1("div", {
      "class": "archive-app__main-content"
    }, [createVNode$1(RouterView, null, null)])],
    ...proLayoutSlots
  });
});
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function useAppRender(dataBase) {
  return (data, customRenderer, defaultRenderer) => {
    const defaultNodes = defaultRenderer == null ? void 0 : defaultRenderer();
    return customRenderer ? customRenderer(
      {
        theme: dataBase.theme,
        route: dataBase.route,
        breakpoints: dataBase.breakpoints,
        activeRecords: dataBase.activeRecords.value,
        ...data != null ? data : {}
      },
      defaultNodes
    ) : defaultNodes;
  };
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function useNavRecords(navRecords, route) {
  const pathRecordMap = /* @__PURE__ */ new Map();
  const parentRecordMap = /* @__PURE__ */ new Map();
  const traverseParents = (record, fn) => {
    const parent = parentRecordMap.get(record.id);
    if (!parent) {
      return;
    }
    fn(parent);
    traverseParents(parent, fn);
  };
  const recordNavKeyMap = /* @__PURE__ */ new Map();
  const getRecordNavKey = (record) => {
    if (!record) {
      return "";
    }
    if (recordNavKeyMap.has(record)) {
      return recordNavKeyMap.get(record);
    }
    let key = record.id;
    traverseParents(record, (parent) => {
      key += `-${parent.id}`;
    });
    recordNavKeyMap.set(record, key);
    return key;
  };
  const getMenuDataType = (type) => {
    switch (type) {
      case "item":
      case "sub":
        return type;
      case "group":
        return "itemGroup";
      case "link":
      default:
        return "item";
    }
  };
  const processRecords = (records) => C(records, "children", (record, parents) => {
    if (record.type === "item") {
      pathRecordMap.set(record.path, record);
    }
    if (parents[0]) {
      parentRecordMap.set(record.id, parents[0]);
    }
    const menu = {
      ...record,
      key: getRecordNavKey(record),
      type: getMenuDataType(record.type),
      label: record.name,
      recordType: record.type
    };
    return menu;
  });
  const menuData = processRecords(navRecords);
  const activeRecords = computed$2(() => {
    const _activeRecords = [];
    const currentActiveRecord = pathRecordMap.get(route.path);
    if (currentActiveRecord) {
      _activeRecords.push(currentActiveRecord);
      traverseParents(currentActiveRecord, (parent) => _activeRecords.push(parent));
    }
    return _activeRecords;
  });
  return {
    menuData,
    activeRecords,
    getRecordNavKey
  };
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function resolvePageProps(pageData, theme, renderers, options) {
  return {
    pageData,
    theme,
    options,
    renderers
  };
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function resolveRoutes(routesRecords, theme, renderers, options) {
  return [
    {
      path: "/",
      redirect: routesRecords[0].path
    },
    ...routesRecords.map((record) => {
      return {
        path: record.path,
        component: () => Promise.resolve().then(() => Page$1),
        props: resolvePageProps(record.pageData, theme, renderers, options)
      };
    })
  ];
}
const defaultLogoImg = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdD0iMTY0MDMzOTM2ODExNCIKICAgIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcC1pZD0iNDExNyIKICAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPgogICAgPC9kZWZzPgogICAgPHBhdGggZD0iTTcyMCAxOTMuMTJMODk2IDI5NC43MnY0NDMuNTJMNTEyIDk2MCAxMjggNzM4LjI0VjI5NC43MmwxNzYtMTAxLjZ2NDQzLjg3MmwyMDggMTIwIDIwOC0xMjBWMTkzLjEyeiIKICAgICAgICBmaWxsPSIjMUU3MUZGIiBwLWlkPSI0MTE4Ij48L3BhdGg+CiAgICA8cGF0aCBkPSJNMzA0IDE5My4xMnY0NDMuODcybDIwOCAxMjBWOTYwTDEyOCA3MzguMjRWMjk0LjcybDE3Ni0xMDEuNnoiIGZpbGw9IiMwRTU0Q0MiIHAtaWQ9IjQxMTkiPjwvcGF0aD4KICAgIDxwYXRoIGQ9Ik01MTIgNzIuOTkybDExMiA2NC43Njh2MTI5LjUwNEw1MTIgMzMybC0xMTItNjQuNzM2VjEzNy43NnoiIGZpbGw9IiMxRTcxRkYiIHAtaWQ9IjQxMjAiPjwvcGF0aD4KICAgIDxwYXRoIGQ9Ik00MDAgMTM3Ljc2TDUxMiAyMDIuNDk2djEyOS41MDRsLTExMi02NC43MzZWMTM3Ljc2eiIgZmlsbD0iIzBFNTRDQyIgcC1pZD0iNDEyMSI+PC9wYXRoPgogICAgPHBhdGggZD0iTTUxMiAzODhsMTEyIDY0LjczNnYxMjkuNTA0TDUxMiA2NDcuMDRsLTExMi02NC43Njh2LTEyOS41MDR6IiBmaWxsPSIjMzBENTlGIiBwLWlkPSI0MTIyIj48L3BhdGg+CiAgICA8cGF0aCBkPSJNNDAwIDQ1Mi45OTJMNTEyIDUxNy43NnYxMjkuNTA0bC0xMTItNjQuNzY4di0xMjkuNTA0eiIgZmlsbD0iIzFEQTM3NyIgcC1pZD0iNDEyMyI+PC9wYXRoPgo8L3N2Zz4K";
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
const defaultBreakpoints = {
  xs: "(min-width: 0px) and (max-width: 1023.99px)",
  sm: "(min-width: 1024px) and (max-width: 1365.99px)",
  md: "(min-width: 1366px) and (max-width: 1720.99px)",
  lg: "(min-width: 1721px) and (max-width: 1920.99px)",
  xl: "(min-width: 1921px)"
};
function resolveThemeOptions(options) {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  return {
    logo: (_a2 = options == null ? void 0 : options.logo) != null ? _a2 : {
      image: defaultLogoImg,
      title: "IDUX Archive",
      link: "/"
    },
    breakpoints: (_b = options == null ? void 0 : options.breakpoints) != null ? _b : defaultBreakpoints,
    layout: {
      theme: (_d = (_c = options == null ? void 0 : options.layout) == null ? void 0 : _c.theme) != null ? _d : "dark",
      type: (_f = (_e = options == null ? void 0 : options.layout) == null ? void 0 : _e.type) != null ? _f : "both",
      siderCollapsable: (() => {
        var _a22;
        const siderCollapsable = (_a22 = options == null ? void 0 : options.layout) == null ? void 0 : _a22.siderCollapsable;
        if (isString$1(siderCollapsable)) {
          return siderCollapsable;
        }
        if (siderCollapsable === false) {
          return false;
        }
        return "top";
      })()
    },
    footer: options == null ? void 0 : options.footer,
    page: {
      headerAffix: (_h = (_g = options == null ? void 0 : options.page) == null ? void 0 : _g.headerAffix) != null ? _h : false,
      enableAnchor: (_j = (_i = options == null ? void 0 : options.page) == null ? void 0 : _i.enableAnchor) != null ? _j : true,
      anchorMaxLevel: (_l = (_k = options == null ? void 0 : options.page) == null ? void 0 : _k.anchorMaxLevel) != null ? _l : 3
    }
  };
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
addIconDefinitions(IDUX_ICON_DEPENDENCIES);
addIconDefinitions([Expand, Unexpand, Copy, Link]);
const globalConfig = createGlobalConfig$1({
  common: {
    prefixCls: "archive-app"
  }
});
const proGlobalConfig = createGlobalConfig({
  common: {
    prefixCls: "archive-app-pro"
  }
});
const install = (app2) => {
  app2.use(globalConfig).use(proGlobalConfig);
};
const iduxInstall = { install };
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function mountApp(options) {
  const { navRecords, routeRecords, el, renderers = {}, setupOptions, setupApp } = options;
  const theme = resolveThemeOptions(options.theme);
  const routes = resolveRoutes(routeRecords, theme, renderers, setupOptions);
  const app2 = createApp$1(
    defineComponent$1({
      setup() {
        const route = useRoute();
        const navContext = useNavRecords(navRecords, route);
        const breakpoints = useBreakpoints(theme.breakpoints);
        const render2 = useAppRender({
          route,
          activeRecords: navContext.activeRecords,
          theme,
          breakpoints
        });
        provide$1(appContextToken, {
          ...navContext,
          route,
          theme,
          navRecords,
          renderers,
          render: render2
        });
        provide$1(themeToken, theme);
        provide$1(breakpointsToken, breakpoints);
        return () => h$1(AppComp);
      }
    })
  );
  app2.use(
    createRouter({
      history: createWebHistory("/"),
      scrollBehavior: (to, _, savedPosition) => {
        if (savedPosition) {
          return savedPosition;
        } else if (to.hash) {
          return { el: to.hash, behavior: "smooth" };
        } else {
          return { top: 0, behavior: "smooth" };
        }
      },
      routes
    })
  ).use(iduxInstall);
  setupApp == null ? void 0 : setupApp(app2);
  app2.mount(el);
}
const affixProps = {
  offset: {
    type: [Number, String, Object],
    default: 0
  },
  target: [String, HTMLElement, Function],
  onChange: Function
};
const events = ["scroll", "resize"];
const directions = ["top", "bottom", "left", "right"];
function normalizeOffset(offset2) {
  if (!isObject$1(offset2)) {
    return { top: convertNumber(offset2) };
  }
  const _offset = {};
  Object.keys(offset2).forEach((dire) => {
    _offset[dire] = convertNumber(offset2[dire]);
  });
  return _offset;
}
function getTargetRect(target, container) {
  const targetRect = target.getBoundingClientRect();
  const containerRect = isHTMLElement$1(container) ? container.getBoundingClientRect() : { top: 0, bottom: window.innerHeight, left: 0, right: window.innerWidth };
  if (targetRect.width === 0 && targetRect.height === 0) {
    return null;
  }
  return {
    top: targetRect.top - containerRect.top,
    left: targetRect.left - containerRect.left,
    bottom: containerRect.bottom - targetRect.bottom,
    right: containerRect.right - targetRect.right
  };
}
function getTargetSize(target) {
  if (target === window) {
    return {
      width: target.innerWidth,
      height: target.innerHeight
    };
  }
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  };
}
function observeTarget(target, cb) {
  events.forEach((event) => {
    on(target, event, cb);
  });
}
function removeObserveTarget(target, cb) {
  events.forEach((event) => {
    off(target, event, cb);
  });
}
function isDireSticky(dire, affixRect, offsetOption) {
  return !isUndefined(offsetOption[dire]) && affixRect[dire] <= offsetOption[dire];
}
function isSticky(target, container, offsetOption) {
  const targetRect = getTargetRect(target, container);
  return !!targetRect && directions.some((dire) => isDireSticky(dire, targetRect, offsetOption));
}
function calcStickyPosition(target, container, offsetOption) {
  const targetRect = getTargetRect(target, container);
  if (!targetRect) {
    return {};
  }
  const style = {};
  style.position = container === window ? "fixed" : "absolute";
  const _directions = [
    isDireSticky("bottom", targetRect, offsetOption) ? "bottom" : "top",
    isDireSticky("right", targetRect, offsetOption) ? "right" : "left"
  ];
  _directions.forEach((dire) => {
    if (isDireSticky(dire, targetRect, offsetOption)) {
      style[dire] = `${offsetOption[dire] - (container === window ? 0 : targetRect[dire])}px`;
    } else {
      style[dire] = `${container === window ? targetRect[dire] : 0}px`;
    }
  });
  return style;
}
var Affix = /* @__PURE__ */ defineComponent$1({
  name: "IxAffix",
  props: affixProps,
  setup(props, {
    slots,
    expose
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-affix`);
    const contentStyle = ref$1({});
    const affixStyle = ref$1({});
    const targetRef = ref$1(null);
    const affixRef = ref$1(null);
    const contentRef = ref$1(null);
    const offset2 = computed$2(() => normalizeOffset(props.offset));
    const isStickyRef = ref$1(false);
    watch$1(isStickyRef, (value) => {
      var _a2;
      return (_a2 = props.onChange) == null ? void 0 : _a2.call(props, value);
    });
    const throttleMeasure = throttleRAF(measure);
    function measure(event) {
      if (!affixRef.value || !targetRef.value || !contentRef.value) {
        clearStyle();
        return;
      }
      isStickyRef.value = isSticky(affixRef.value, targetRef.value, offset2.value);
      if (!isStickyRef.value) {
        clearStyle();
        return;
      }
      if (event && event.type === "resize") {
        clearStyle();
        nextTick$1(measure);
        return;
      }
      const {
        width,
        height
      } = getTargetSize(contentRef.value);
      contentStyle.value = {
        ...calcStickyPosition(affixRef.value, targetRef.value, offset2.value),
        width: `${width}px`,
        height: `${height}px`
      };
      affixStyle.value = {
        width: `${width}px`,
        height: `${height}px`
      };
      if (targetRef.value !== window) {
        affixStyle.value.position = "relative";
      }
    }
    function clearStyle() {
      affixStyle.value = {};
      contentStyle.value = {};
    }
    function initContainer() {
      targetRef.value = convertTarget(props.target);
      observeTarget(targetRef.value, throttleMeasure);
    }
    onMounted$1(() => {
      nextTick$1(() => {
        initContainer();
        measure();
      });
    });
    onUnmounted$1(() => {
      var _a2;
      removeObserveTarget(targetRef.value, throttleMeasure);
      (_a2 = throttleMeasure.cancel) == null ? void 0 : _a2.call(throttleMeasure);
    });
    watch$1(() => props.offset, measure);
    watch$1(() => props.target, () => {
      removeObserveTarget(targetRef.value, throttleMeasure);
      initContainer();
      measure();
    });
    expose({
      update: throttleMeasure
    });
    return () => {
      var _a2;
      const prefixCls = mergedPrefixCls.value;
      return createVNode$1("div", {
        "ref": affixRef,
        "style": affixStyle.value,
        "class": prefixCls
      }, [createVNode$1("div", {
        "ref": contentRef,
        "class": `${prefixCls}-content`,
        "style": contentStyle.value
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])]);
    };
  }
});
const IxAffix = Affix;
const messageProps = {
  visible: {
    type: Boolean,
    default: void 0
  },
  destroyOnHover: {
    type: Boolean,
    default: void 0
  },
  duration: Number,
  icon: [String, Object],
  type: {
    type: String,
    default: "info"
  },
  "onUpdate:visible": [Function, Array],
  onClose: [Function, Array]
};
const messageProviderProps = {
  container: {
    type: [String, HTMLElement, Function],
    default: void 0
  },
  maxCount: Number,
  top: [String, Number]
};
var Message = /* @__PURE__ */ defineComponent$1({
  name: "IxMessage",
  props: messageProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-message`);
    const config = useGlobalConfig$1("message");
    const classes = computed$2(() => {
      const prefixCls = mergedPrefixCls.value;
      return [prefixCls, `${prefixCls}-${props.type}`];
    });
    const mergedIcon = computed$2(() => {
      const {
        icon,
        type
      } = props;
      return icon != null ? icon : config.icon[type];
    });
    const {
      visible,
      onMouseEnter,
      onMouseLeave
    } = useEvents(props, config);
    return () => {
      var _a2;
      const icon = mergedIcon.value;
      const iconNode = isString$1(icon) ? createVNode$1(IxIcon, {
        "name": icon
      }, null) : icon;
      const prefixCls = mergedPrefixCls.value;
      return withDirectives(createVNode$1("div", {
        "class": classes.value,
        "onMouseenter": onMouseEnter,
        "onMouseleave": onMouseLeave
      }, [createVNode$1("div", {
        "class": `${prefixCls}-content`
      }, [createVNode$1("span", {
        "class": `${prefixCls}-content-icon`
      }, [iconNode]), createVNode$1("span", {
        "class": `${prefixCls}-content-text`
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])])]), [[vShow, visible.value]]);
    };
  }
});
const useEvents = (props, config) => {
  const duration = computed$2(() => {
    var _a2;
    return (_a2 = props.duration) != null ? _a2 : config.duration;
  });
  const destroyOnHover = computed$2(() => {
    var _a2;
    return (_a2 = props.destroyOnHover) != null ? _a2 : config.destroyOnHover;
  });
  const autoClose = computed$2(() => duration.value > 0);
  const [visible, setVisible] = useControlledProp(props, "visible", false);
  let timer = null;
  const startTimer = () => {
    timer = setTimeout(() => close(), duration.value);
  };
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  const close = () => {
    clearTimer();
    setVisible(false);
    callEmit(props.onClose);
  };
  const onMouseEnter = () => {
    if (autoClose.value && !destroyOnHover.value) {
      clearTimer();
    }
  };
  const onMouseLeave = () => {
    if (autoClose.value && !destroyOnHover.value) {
      startTimer();
    }
  };
  onMounted$1(() => {
    watchEffect(() => {
      clearTimer();
      if (visible.value && autoClose.value) {
        startTimer();
      }
    });
  });
  onBeforeUnmount$1(() => clearTimer());
  return {
    visible,
    onMouseEnter,
    onMouseLeave
  };
};
const MESSAGE_PROVIDER_TOKEN = Symbol("MESSAGE_PROVIDER_TOKEN");
var MessageProvider = /* @__PURE__ */ defineComponent$1({
  name: "IxMessageProvider",
  inheritAttrs: false,
  props: messageProviderProps,
  setup(props, {
    expose,
    slots,
    attrs
  }) {
    const common = useGlobalConfig$1("common");
    const config = useGlobalConfig$1("message");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-message`);
    const mergedPortalTarget = usePortalTarget(props, config, common, mergedPrefixCls);
    const style = computed$2(() => {
      var _a2;
      return {
        top: convertCssPixel((_a2 = props.top) != null ? _a2 : config.top)
      };
    });
    const maxCount = computed$2(() => {
      var _a2;
      return (_a2 = props.maxCount) != null ? _a2 : config.maxCount;
    });
    const {
      messages,
      loadContainer,
      open,
      info: info2,
      success,
      warning,
      error: error2,
      loading,
      update,
      destroy,
      destroyAll
    } = useMessage$1(maxCount);
    const apis = {
      open,
      info: info2,
      success,
      warning,
      error: error2,
      loading,
      update,
      destroy,
      destroyAll
    };
    provide$1(MESSAGE_PROVIDER_TOKEN, apis);
    expose(apis);
    return () => {
      var _a2;
      const child = messages.value.map((item) => {
        const {
          key,
          content,
          visible = true,
          onDestroy,
          ...restProps
        } = item;
        const onClose = () => destroy(key);
        const mergedProps = {
          key,
          visible,
          onClose
        };
        return createVNode$1(Message, mergeProps$1(mergedProps, restProps), {
          default: () => [content]
        });
      });
      return createVNode$1(Fragment$1, null, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots), createVNode$1(CdkPortal, {
        "target": mergedPortalTarget.value,
        "load": loadContainer.value
      }, {
        default: () => [createVNode$1(TransitionGroup, mergeProps$1({
          "tag": "div",
          "appear": true,
          "name": `${common.prefixCls}-move-up`,
          "class": `${mergedPrefixCls.value}-wrapper`,
          "style": style.value
        }, attrs), {
          default: () => [child]
        })]
      })]);
    };
  }
});
const useMessage$1 = (maxCount) => {
  const messages = ref$1([]);
  const getCurrIndex = (key) => {
    return messages.value.findIndex((message) => message.key === key);
  };
  const add2 = (item) => {
    var _a2;
    const currIndex = item.key ? getCurrIndex(item.key) : -1;
    if (currIndex !== -1) {
      messages.value.splice(currIndex, 1, item);
      return item.key;
    }
    if (messages.value.length >= maxCount.value) {
      messages.value = messages.value.slice(-maxCount.value + 1);
    }
    const key = (_a2 = item.key) != null ? _a2 : uniqueId("ix-message");
    messages.value.push({
      ...item,
      key
    });
    return key;
  };
  const update = (key, item) => {
    const currIndex = getCurrIndex(key);
    if (currIndex !== -1) {
      const newItem = {
        ...messages.value[currIndex],
        ...item
      };
      messages.value.splice(currIndex, 1, newItem);
    }
  };
  const destroy = (key) => {
    const keys2 = convertArray(key);
    keys2.forEach((key2) => {
      const currIndex = getCurrIndex(key2);
      if (currIndex !== -1) {
        const item = messages.value.splice(currIndex, 1);
        callEmit(item[0].onDestroy, key2);
      }
    });
  };
  const destroyAll = () => {
    messages.value = [];
  };
  const loadContainer = ref$1(false);
  const open = (options) => {
    const key = add2(options);
    const ref2 = {
      key,
      update: (options2) => update(key, options2),
      destroy: () => destroy(key)
    };
    if (!loadContainer.value) {
      loadContainer.value = true;
    }
    return ref2;
  };
  const messageTypes = ["info", "success", "warning", "error", "loading"];
  const [info2, success, warning, error2, loading] = messageTypes.map((type) => {
    return (content, options) => open({
      ...options,
      content,
      type
    });
  });
  return {
    messages,
    loadContainer,
    open,
    info: info2,
    success,
    warning,
    error: error2,
    loading,
    update,
    destroy,
    destroyAll
  };
};
const useMessage = () => {
  const modalProviderRef = inject$1(MESSAGE_PROVIDER_TOKEN, null);
  if (modalProviderRef === null) {
    return throwError("components/message", "<IxMessageProvider> not found.");
  }
  return modalProviderRef;
};
const IxMessageProvider = MessageProvider;
const radioGroupToken = Symbol("radioGroupToken");
const radioProps = {
  control: { type: [String, Number, Object], default: void 0 },
  checked: { type: Boolean, default: void 0 },
  autofocus: { type: Boolean, default: false },
  buttoned: { type: Boolean, default: void 0 },
  disabled: { type: Boolean, default: void 0 },
  label: { type: String, default: void 0 },
  mode: { type: String, default: void 0 },
  size: { type: String, default: void 0 },
  value: { type: null, default: void 0 },
  waveless: { type: Boolean, default: false },
  "onUpdate:checked": { type: [Function, Array] },
  onChange: { type: [Function, Array] },
  onBlur: { type: [Function, Array] },
  onFocus: { type: [Function, Array] }
};
const radioGroupProps = {
  control: { type: [String, Number, Object], default: void 0 },
  value: { type: null, default: void 0 },
  buttoned: { type: Boolean, default: false },
  dataSource: { type: Array },
  disabled: { type: Boolean, default: false },
  gap: { type: [Number, String], default: void 0 },
  name: { type: String, default: void 0 },
  mode: { type: String, default: void 0 },
  size: { type: String, default: "md" },
  "onUpdate:value": { type: [Function, Array] },
  onChange: { type: [Function, Array] }
};
const buttonSizeMap = {
  sm: "xs",
  md: "sm",
  lg: "md"
};
var Radio = /* @__PURE__ */ defineComponent$1({
  name: "IxRadio",
  inheritAttrs: false,
  props: radioProps,
  setup(props, {
    attrs,
    expose,
    slots
  }) {
    const key = useKey();
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-radio`);
    const config = useGlobalConfig$1("radio");
    const {
      elementRef,
      focus,
      blur
    } = useFormElement();
    const waveRef = ref$1();
    expose({
      focus,
      blur
    });
    const formContext = inject$1(FORM_TOKEN, null);
    const radioGroup = inject$1(radioGroupToken, null);
    const mergedName = computed$2(() => {
      var _a2;
      return (_a2 = attrs.name) != null ? _a2 : radioGroup == null ? void 0 : radioGroup.props.name;
    });
    const mergedValue = computed$2(() => {
      const {
        value
      } = props;
      if (!isNil(value)) {
        return value;
      }
      return radioGroup ? key : void 0;
    });
    const isButtoned = computed$2(() => {
      var _a2;
      return (_a2 = props.buttoned) != null ? _a2 : radioGroup == null ? void 0 : radioGroup.props.buttoned;
    });
    const size2 = computed$2(() => {
      var _a2, _b, _c;
      return (_c = (_b = (_a2 = props.size) != null ? _a2 : radioGroup == null ? void 0 : radioGroup.props.size) != null ? _b : formContext == null ? void 0 : formContext.size.value) != null ? _c : config.size;
    });
    const mergedWaveless = computed$2(() => {
      var _a2;
      return (_a2 = props.waveless) != null ? _a2 : config.waveless;
    });
    const mode = computed$2(() => {
      var _a2, _b;
      return (_b = (_a2 = props.mode) != null ? _a2 : radioGroup == null ? void 0 : radioGroup.props.mode) != null ? _b : "default";
    });
    const {
      isChecked,
      isDisabled,
      isFocused,
      handleChange,
      handleBlur,
      handleFocus
    } = useRadio(props, radioGroup, elementRef, mergedValue, waveRef, mergedWaveless);
    const classes = computed$2(() => {
      const buttoned = isButtoned.value;
      const checked = isChecked.value;
      const isPrimary = buttoned && checked && mode.value === "primary";
      const prefixCls = mergedPrefixCls.value;
      const commonPrefixCls = common.prefixCls;
      const classes2 = {
        [prefixCls]: true,
        [`${prefixCls}-checked`]: isChecked.value,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-${size2.value}`]: buttoned,
        [`${commonPrefixCls}-button`]: buttoned,
        [`${commonPrefixCls}-button-default`]: buttoned && !isPrimary,
        [`${commonPrefixCls}-button-primary`]: isPrimary,
        [`${commonPrefixCls}-button-disabled`]: buttoned && isDisabled.value,
        [`${commonPrefixCls}-button-${buttonSizeMap[size2.value]}`]: buttoned
      };
      return normalizeClass$1([classes2, attrs.class]);
    });
    return () => {
      const {
        autofocus,
        label
      } = props;
      const {
        class: className,
        style,
        type,
        tabindex,
        ...restAttrs
      } = attrs;
      const prefixCls = mergedPrefixCls.value;
      const labelNode = convertStringVNode(slots.default, label);
      return createVNode$1("label", {
        "class": classes.value,
        "style": style,
        "role": "radio",
        "aria-checked": isChecked.value,
        "aria-disabled": isDisabled.value
      }, [createVNode$1("span", {
        "class": `${prefixCls}-input`
      }, [createVNode$1("input", mergeProps$1({
        "ref": elementRef,
        "type": "radio",
        "class": `${prefixCls}-input-inner`,
        "aria-hidden": true,
        "autofocus": autofocus,
        "checked": isChecked.value,
        "disabled": isDisabled.value,
        "name": mergedName.value,
        "value": mergedValue.value,
        "onChange": handleChange,
        "onBlur": handleBlur,
        "onFocus": handleFocus
      }, restAttrs), null), !isButtoned.value && createVNode$1("span", {
        "class": `${prefixCls}-input-box`,
        "tabindex": tabindex
      }, [!mergedWaveless.value && createVNode$1(\u0275Wave, {
        "ref": waveRef
      }, null)])]), isButtoned.value && !mergedWaveless.value && createVNode$1(\u0275Wave, {
        "ref": waveRef
      }, null), labelNode && createVNode$1("span", {
        "class": `${prefixCls}-label`
      }, [labelNode])]);
    };
  }
});
const useRadio = (props, radioGroup, elementRef, mergedValue, waveRef, mergedWaveless) => {
  let isChecked;
  let isDisabled;
  const isFocused = ref$1(false);
  let handleChange;
  let handleBlur;
  const handleFocus = (evt) => {
    isFocused.value = true;
    callEmit(props.onFocus, evt);
  };
  if (radioGroup) {
    const {
      accessor,
      props: groupProps
    } = radioGroup;
    isChecked = computed$2(() => accessor.value === mergedValue.value);
    isDisabled = computed$2(() => accessor.disabled || !!props.disabled);
    handleBlur = (evt) => {
      isFocused.value = false;
      accessor.markAsBlurred();
      callEmit(props.onBlur, evt);
    };
    handleChange = (evt) => {
      var _a2;
      if (elementRef.value) {
        const checked = evt.target.checked;
        const value = mergedValue.value;
        const oldValue = accessor.value;
        accessor.setValue(value);
        elementRef.value.checked = false;
        callEmit(props.onChange, checked, !checked);
        callEmit(groupProps.onChange, value, oldValue);
        !mergedWaveless.value && ((_a2 = waveRef.value) == null ? void 0 : _a2.play());
      }
    };
  } else {
    const {
      accessor,
      control
    } = useAccessorAndControl({
      valueKey: "checked"
    });
    useFormItemRegister(control);
    isChecked = computed$2(() => !!accessor.value);
    isDisabled = computed$2(() => accessor.disabled);
    handleBlur = (evt) => {
      isFocused.value = false;
      accessor.markAsBlurred();
      callEmit(props.onBlur, evt);
    };
    handleChange = (evt) => {
      var _a2;
      if (elementRef.value) {
        const checked = evt.target.checked;
        accessor.setValue(checked);
        elementRef.value.checked = false;
        callEmit(props.onChange, checked, !checked);
        !mergedWaveless.value && ((_a2 = waveRef.value) == null ? void 0 : _a2.play());
      }
    };
  }
  return {
    isChecked,
    isDisabled,
    isFocused,
    handleChange,
    handleBlur,
    handleFocus
  };
};
var RadioGroup = /* @__PURE__ */ defineComponent$1({
  name: "IxRadioGroup",
  props: radioGroupProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-radio-group`);
    const {
      accessor,
      control
    } = useAccessorAndControl();
    useFormItemRegister(control);
    provide$1(radioGroupToken, {
      props,
      accessor
    });
    const mergedGap = computed$2(() => {
      var _a2;
      return (_a2 = props.gap) != null ? _a2 : props.buttoned ? 0 : 8;
    });
    const classes = computed$2(() => {
      const {
        buttoned
      } = props;
      const gap = mergedGap.value;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${common.prefixCls}-button-group`]: buttoned,
        [`${common.prefixCls}-button-group-compact`]: buttoned && (!gap || gap === "0")
      });
    });
    return () => {
      const {
        dataSource
      } = props;
      let children;
      if (dataSource) {
        children = dataSource.map((item) => {
          const {
            key,
            value
          } = item;
          return createVNode$1(Radio, mergeProps$1(item, {
            "key": key != null ? key : value,
            "value": value != null ? value : key
          }), null);
        });
      } else {
        children = slots.default ? slots.default() : void 0;
      }
      return createVNode$1(IxSpace, {
        "class": classes.value,
        "size": mergedGap.value
      }, {
        default: () => [children]
      });
    };
  }
});
const IxRadioGroup = RadioGroup;
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function usePageRender(dataBase) {
  return (data, customRenderer, defaultRenderer) => {
    var _a2;
    const defaultNodes = defaultRenderer == null ? void 0 : defaultRenderer();
    return customRenderer ? customRenderer(
      {
        theme: dataBase.theme,
        route: dataBase.route,
        breakpoints: dataBase.breakpoints,
        activeRecords: (_a2 = dataBase.activeRecords) == null ? void 0 : _a2.value,
        ...data != null ? data : {}
      },
      defaultNodes
    ) : defaultNodes;
  };
}
const resizeMap = /* @__PURE__ */ new Map();
function onResize(el, listener, options) {
  if (!el || !listener) {
    return;
  }
  if (resizeMap.has(el)) {
    resizeMap.get(el).listeners.push(listener);
  } else {
    const listeners = [listener];
    const ro = new ResizeObserver((entries) => {
      entries.forEach((entry) => listeners.forEach((fn) => fn(entry)));
    });
    ro.observe(el, options);
    resizeMap.set(el, { listeners, ro });
  }
}
function offResize(el, listener) {
  if (!el || !listener || !resizeMap.has(el)) {
    return;
  }
  const { listeners, ro } = resizeMap.get(el);
  const listenerIndex = listeners.indexOf(listener);
  if (listenerIndex > -1) {
    listeners.splice(listenerIndex, 1);
    if (listeners.length === 0) {
      ro.disconnect();
      resizeMap.delete(el);
    }
  }
}
function useResizeObserver(target, listener, options) {
  const stopWatch = watch$1(
    () => convertElement(target),
    (currElement, prevElement) => {
      if (prevElement) {
        offResize(prevElement, listener);
      }
      if (currElement) {
        onResize(currElement, listener, options);
      }
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    offResize(convertElement(target), listener);
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function getScroll(target = window) {
  if (target === window) {
    return {
      scrollTop: target.pageYOffset || document.documentElement.scrollTop,
      scrollLeft: target.pageXOffset || document.documentElement.scrollLeft
    };
  } else {
    const { scrollTop, scrollLeft } = target;
    return { scrollTop, scrollLeft };
  }
}
const scrollToTop = (options = {}) => {
  const { top, amountOfChange, target = window, duration = 450, easing = easeInOutCubic, callback } = options;
  if (isNil(top) && isNil(amountOfChange)) {
    return;
  }
  const { scrollTop } = getScroll(target);
  const startTime = Date.now();
  const frameFunc = () => {
    const time = Date.now() - startTime;
    const elapsed = time > duration ? duration : time;
    const _amountOfChange = amountOfChange != null ? amountOfChange : top - scrollTop;
    const nextScrollTop = easing(elapsed, scrollTop, _amountOfChange, duration);
    if (target === window) {
      target.scrollTo(window.pageXOffset, nextScrollTop);
    } else {
      target.scrollTop = nextScrollTop;
    }
    if (time < duration) {
      rAF(frameFunc);
    } else if (typeof callback === "function") {
      callback();
    }
  };
  rAF(frameFunc);
};
const anchorToken = Symbol("anchorToken");
const anchorProps = {
  affix: {
    type: Boolean,
    default: true
  },
  bounds: Number,
  hideLinkBall: {
    type: Boolean,
    default: void 0
  },
  offsetTop: Number,
  target: [String, HTMLElement, Function],
  targetOffset: Number,
  onChange: [Function, Array],
  onClick: [Function, Array]
};
const linkProps = {
  href: {
    type: String,
    required: true
  },
  title: String
};
var Anchor$1 = /* @__PURE__ */ defineComponent$1({
  name: "IxAnchor",
  props: anchorProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-anchor`);
    const config = useGlobalConfig$1("anchor");
    const hideLinkBall = computed$2(() => {
      var _a2;
      return (_a2 = props.hideLinkBall) != null ? _a2 : config.hideLinkBall;
    });
    const wrapperStyle = computed$2(() => {
      const {
        offsetTop
      } = props;
      return {
        maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : "100vh"
      };
    });
    const {
      activeLink
    } = useLinks(props, config);
    const {
      anchorRef,
      inkBallElRef,
      inkBallClasses,
      inkBallTop
    } = useInkBall(activeLink, mergedPrefixCls);
    return () => {
      var _a2;
      const prefixCls = mergedPrefixCls.value;
      const linkBall = hideLinkBall.value ? null : createVNode$1("span", {
        "class": inkBallClasses.value,
        "style": {
          top: inkBallTop.value
        },
        "ref": inkBallElRef
      }, null);
      const anchorNode = createVNode$1("div", {
        "class": `${prefixCls}-wrapper`,
        "style": wrapperStyle.value
      }, [createVNode$1("div", {
        "class": prefixCls,
        "ref": anchorRef
      }, [createVNode$1("div", {
        "class": `${prefixCls}-ink`
      }, [linkBall]), (_a2 = slots.default) == null ? void 0 : _a2.call(slots)])]);
      if (!props.affix) {
        return anchorNode;
      }
      return createVNode$1(IxAffix, {
        "target": props.target,
        "offset": props.offsetTop
      }, {
        default: () => [anchorNode]
      });
    };
  }
});
const useLinks = (props, config) => {
  const links = ref$1([]);
  const registerLink = (link) => {
    if (!links.value.includes(link)) {
      links.value.push(link);
    }
  };
  const unregisterLink = (link) => {
    const index = links.value.indexOf(link);
    if (index !== -1) {
      links.value.splice(index, 1);
    }
  };
  const activeLink = ref$1();
  const setActiveLink = (link) => {
    if (activeLink.value !== link) {
      activeLink.value = link;
      callEmit(props.onChange, link);
    }
  };
  const {
    scrollTo
  } = useScroll(props, config, links, setActiveLink);
  const handleLinkClick = (evt, linkProps2) => {
    callEmit(props.onClick, evt, linkProps2);
    scrollTo(linkProps2.href);
  };
  provide$1(anchorToken, {
    registerLink,
    unregisterLink,
    activeLink,
    handleLinkClick
  });
  return {
    activeLink
  };
};
const useInkBall = (activeLink, mergedPrefixCls) => {
  const anchorRef = ref$1();
  const inkBallElRef = ref$1();
  const inkBallClasses = computed$2(() => {
    const prefixCls = mergedPrefixCls.value;
    return {
      [`${prefixCls}-ink-ball`]: true,
      [`${prefixCls}-ink-ball-visible`]: !!activeLink.value
    };
  });
  const inkBallTop = ref$1();
  onMounted$1(() => {
    watchEffect(() => {
      var _a2, _b, _c;
      const activeLinkElement = (_a2 = anchorRef.value) == null ? void 0 : _a2.querySelector(`a[data-href="${activeLink.value}"]`);
      if (!activeLinkElement) {
        return;
      }
      const inkBallHeight = (_c = (_b = inkBallElRef.value) == null ? void 0 : _b.getBoundingClientRect().height) != null ? _c : 9;
      const {
        offsetTop,
        clientHeight
      } = activeLinkElement;
      inkBallTop.value = `${offsetTop + clientHeight / 2 - inkBallHeight / 2}px`;
    }, {
      flush: "post"
    });
  });
  return {
    anchorRef,
    inkBallElRef,
    inkBallClasses,
    inkBallTop
  };
};
const getTargetTop = (link, container) => {
  const targetElement = document.getElementById(link.split("#")[1]);
  if (targetElement) {
    const {
      top
    } = getOffset(targetElement, container);
    return top;
  }
  return null;
};
const getCurrentAnchor = (links, container, offsetTop, bounds) => {
  if (!links.length) {
    return "";
  }
  const maxSection = links.map((link) => {
    const top = getTargetTop(link, container);
    return {
      link,
      top
    };
  }).reduce((curr, item) => {
    const {
      top
    } = item;
    if (top !== null && top < offsetTop + bounds && curr.top < top) {
      return item;
    }
    return curr;
  });
  return maxSection.link;
};
const useScroll = (props, config, links, setActiveLink) => {
  const bounds = computed$2(() => {
    var _a2;
    return (_a2 = props.bounds) != null ? _a2 : config.bounds;
  });
  const container = ref$1();
  const eventType = "scroll";
  let animating = false;
  const targetOffset = computed$2(() => {
    var _a2, _b;
    return (_b = (_a2 = props.targetOffset) != null ? _a2 : props.offsetTop) != null ? _b : 0;
  });
  const handleScroll = () => {
    if (animating) {
      return;
    }
    const currLink = getCurrentAnchor(links.value, container.value, targetOffset.value, bounds.value);
    setActiveLink(currLink);
  };
  const scrollTo = (link) => {
    setActiveLink(link);
    const top = getTargetTop(link, container.value);
    if (top === null) {
      return;
    }
    animating = true;
    scrollToTop({
      amountOfChange: top - targetOffset.value,
      target: container.value,
      callback: () => {
        animating = false;
      }
    });
  };
  watch$1(() => props.target, () => {
    off(container.value, eventType, handleScroll);
    container.value = convertTarget(props.target);
    on(container.value, eventType, handleScroll);
    handleScroll();
  });
  onMounted$1(() => {
    container.value = convertTarget(props.target);
    on(container.value, eventType, handleScroll);
    handleScroll();
  });
  onBeforeUnmount$1(() => {
    off(container.value, eventType, handleScroll);
  });
  return {
    scrollTo
  };
};
var AnchorLink = /* @__PURE__ */ defineComponent$1({
  name: "IxAnchorLink",
  props: linkProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-anchor-link`);
    const {
      registerLink,
      unregisterLink,
      activeLink,
      handleLinkClick
    } = inject$1(anchorToken);
    watch$1(() => props.href, (newHref, oldHref) => {
      unregisterLink(oldHref);
      registerLink(newHref);
    });
    onMounted$1(() => registerLink(props.href));
    onBeforeUnmount$1(() => unregisterLink(props.href));
    const isActive = computed$2(() => activeLink.value === props.href);
    const classes = computed$2(() => {
      const prefixCls = mergedPrefixCls.value;
      return {
        [`${prefixCls}-title`]: true,
        [`${prefixCls}-title-active`]: isActive.value
      };
    });
    const onClick = (evt) => handleLinkClick(evt, props);
    return () => {
      var _a2, _b, _c;
      const {
        href,
        title
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return createVNode$1("div", {
        "class": prefixCls
      }, [createVNode$1("a", {
        "class": classes.value,
        "href": href,
        "data-href": href,
        "title": title,
        "onClick": onClick
      }, [(_b = (_a2 = slots.title) == null ? void 0 : _a2.call(slots)) != null ? _b : title]), (_c = slots.default) == null ? void 0 : _c.call(slots)]);
    };
  }
});
const IxAnchor = Anchor$1;
const IxAnchorLink = AnchorLink;
const Anchor = defineComponent$1({
  name: "Anchor",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const {
      headerFixed,
      headerHeight
    } = inject$1(pageContextToken);
    const renderLinks = (data) => {
      return data.map((item) => createVNode$1(IxAnchorLink, {
        "title": item.title,
        "href": item.href
      }, {
        default: () => [renderLinks(item.children)]
      }));
    };
    const anchorRef = ref$1();
    const target = ref$1();
    const offsetTop = computed$2(() => headerFixed.value ? headerHeight.value + 16 : 16);
    onMounted$1(() => {
      var _a2;
      target.value = I((_a2 = anchorRef.value) == null ? void 0 : _a2.$el);
    });
    return () => createVNode$1(IxAnchor, {
      "ref": anchorRef,
      "offsetTop": offsetTop.value,
      "target": target.value
    }, {
      default: () => [renderLinks(props.data)]
    });
  }
});
const BaseContentComp = defineComponent$1({
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  setup(props, {
    slots,
    expose
  }) {
    const {
      anchorOptions
    } = inject$1(pageContextToken);
    const enableAnchor = computed$2(() => !!anchorOptions.value.enabled);
    const anchorMaxLevel = computed$2(() => isObject$1(anchorOptions) ? anchorOptions.value.maxLevel : 3);
    const rootEl = ref$1();
    const anchorEl = ref$1();
    const anchorDatas = ref$1();
    const contentPaddingReight = ref$1();
    const calcContentPadding = () => {
      var _a2;
      const anchorWidth = (_a2 = anchorEl.value) == null ? void 0 : _a2.$el.getBoundingClientRect().width;
      contentPaddingReight.value = anchorWidth ? `${anchorWidth}px` : void 0;
    };
    const updateAnchor = () => {
      if (!rootEl.value) {
        return;
      }
      anchorDatas.value = parseAnchors(rootEl.value, anchorMaxLevel.value);
    };
    watch$1([anchorDatas, () => props.visible], ([, visible]) => {
      visible && nextTick$1(calcContentPadding);
    });
    onMounted$1(() => {
      if (!enableAnchor.value) {
        return;
      }
      watch$1(() => props.visible, (visible) => {
        visible && nextTick$1(updateAnchor);
      }, {
        immediate: true
      });
    });
    expose({
      updateAnchor
    });
    return () => {
      var _a2, _b;
      return createVNode$1("div", {
        "class": "archive-app__page__content"
      }, [createVNode$1("div", {
        "class": "archive-app__page__content__inner",
        "ref": rootEl
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), ((_b = anchorDatas.value) == null ? void 0 : _b.length) ? createVNode$1(Anchor, {
        "ref": anchorEl,
        "class": "archive-app__page__content__anchor",
        "data": anchorDatas.value
      }, null) : void 0]);
    };
  }
});
const anchorTags = [{
  tag: "h1",
  level: 1
}, {
  tag: "h2",
  level: 2
}, {
  tag: "h3",
  level: 3
}, {
  tag: "h4",
  level: 4
}];
function parseAnchors(root2, maxLevel) {
  const anchorRoot = {
    level: 0,
    title: "",
    href: "",
    children: []
  };
  let stackTop = anchorRoot;
  const anchorStack = [anchorRoot];
  const pushStack = (data) => {
    anchorStack.push(data);
    stackTop = data;
  };
  const popStack = () => {
    anchorStack.pop();
    stackTop = anchorStack[anchorStack.length - 1];
  };
  const hiddenEls = [];
  h(root2.children, "children", (el, parents) => {
    var _a2, _b, _c;
    if (getComputedStyle(el).display === "none") {
      hiddenEls.push(el);
      return;
    }
    if (!el.id || !el.textContent || parents.some((parent) => hiddenEls.includes(parent))) {
      return;
    }
    const level = (_a2 = anchorTags.find((tag) => tag.tag === el.tagName.toLowerCase())) == null ? void 0 : _a2.level;
    if (!level || level > maxLevel) {
      return;
    }
    const data = {
      level,
      title: (_c = (_b = el.getAttribute("title")) != null ? _b : el.textContent.replace(/^#/, "").replace(/#$/, "")) != null ? _c : el.id,
      href: `#${el.id}`,
      children: []
    };
    while (level <= stackTop.level) {
      popStack();
    }
    stackTop.children.push(data);
    pushStack(data);
  });
  return anchorRoot.children;
}
const AsyncContent = defineComponent$1({
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    component: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const elRef = ref$1();
    const instance = ref$1();
    const instanceMounted = ref$1(false);
    onMounted$1(() => {
      watch$1(() => props.component, async (comp) => {
        var _a2, _b, _c;
        instanceMounted.value = false;
        await ((_a2 = instance.value) == null ? void 0 : _a2.unmount());
        elRef.value.innerHTML = "";
        instance.value = (await comp()).default;
        const observer = new MutationObserver((mutations) => {
          var _a22;
          if (mutations.findIndex((m) => m.type === "childList") > -1 && ((_a22 = elRef.value) == null ? void 0 : _a22.children.length)) {
            instanceMounted.value = true;
            observer.disconnect();
          }
        });
        observer.observe(elRef.value, {
          childList: true,
          subtree: false,
          attributes: false
        });
        await ((_c = (_b = instance.value) == null ? void 0 : _b.mount) == null ? void 0 : _c.call(_b, elRef.value));
      }, {
        immediate: true
      });
    });
    const {
      render: render2,
      renderers: {
        pageContent: pageContentRenderer
      }
    } = inject$1(pageContextToken);
    return () => createVNode$1(BaseContentComp, {
      "visible": props.visible && instanceMounted.value
    }, {
      default: () => [render2({
        demos: [],
        visibleDemoIds: [],
        setVisibleDemoIds: () => {
        }
      }, pageContentRenderer, () => [createVNode$1("div", {
        "ref": elRef
      }, null)])]
    });
  }
});
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PendingCopy {
  constructor(text) {
    __publicField$1(this, "_textarea");
    const textarea = this._textarea = document.createElement("textarea");
    const styles = textarea.style;
    styles.opacity = "0";
    styles.position = "absolute";
    styles.left = styles.top = "-999em";
    textarea.setAttribute("aria-hidden", "true");
    textarea.value = text;
    document.body.appendChild(textarea);
  }
  copy() {
    const textarea = this._textarea;
    let successful = false;
    try {
      if (textarea) {
        const currentFocus = document.activeElement;
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        successful = document.execCommand("copy");
        if (currentFocus) {
          currentFocus.focus();
        }
      }
    } catch (err) {
      Logger.error("cdk/clipboard", err);
    }
    return successful;
  }
  destroy() {
    const textarea = this._textarea;
    if (textarea) {
      if (textarea.parentNode) {
        textarea.parentNode.removeChild(textarea);
      }
      this._textarea = void 0;
    }
  }
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const _Clipboard = class {
  static getInstance() {
    if (!_Clipboard.instance) {
      _Clipboard.instance = new _Clipboard();
    }
    return _Clipboard.instance;
  }
  constructor() {
  }
  copy(text) {
    const pendingCopy = this.beginCopy(text);
    const successful = pendingCopy.copy();
    pendingCopy.destroy();
    return successful;
  }
  beginCopy(text) {
    return new PendingCopy(text);
  }
};
let Clipboard = _Clipboard;
__publicField(Clipboard, "instance", null);
const useClipboard = () => {
  const clipboard = Clipboard.getInstance();
  const pendingSet = /* @__PURE__ */ new Set();
  let unmounted = false;
  let currentTimeout = null;
  onUnmounted$1(() => {
    if (currentTimeout !== null) {
      clearTimeout(currentTimeout);
    }
    pendingSet.forEach((copy2) => copy2.destroy());
    pendingSet.clear();
    unmounted = true;
  });
  function copy(text, attempts = 1) {
    const promise = new Promise((resolve) => {
      if (attempts > 1) {
        let remainingAttempts = attempts;
        const pending = clipboard.beginCopy(text);
        pendingSet.add(pending);
        const attempt = () => {
          const successful = pending.copy();
          if (!successful && --remainingAttempts && !unmounted) {
            currentTimeout = setTimeout(attempt, 1);
          } else {
            currentTimeout = null;
            pendingSet.delete(pending);
            pending.destroy();
            resolve(successful);
          }
        };
        attempt();
      } else {
        const successful = clipboard.copy(text);
        resolve(successful);
      }
    });
    return promise;
  }
  return { copy };
};
const tabsToken = Symbol("tabsToken");
const tabsProps = {
  selectedKey: { type: [Number, String, Symbol], default: void 0 },
  type: { type: String, default: "card" },
  forceRender: { type: Boolean, default: false },
  placement: { type: String, default: "top" },
  mode: { type: String, default: "default" },
  size: String,
  "onUpdate:selectedKey": [Function, Array],
  onTabClick: [Function, Array],
  onPreClick: [Function, Array],
  onNextClick: [Function, Array],
  onBeforeLeave: [Function, Array]
};
const tabProps = {
  title: { type: String, default: void 0 },
  forceRender: { type: Boolean, default: void 0 },
  disabled: { type: Boolean, default: false }
};
const tabNavProps = {
  defaultSelectedKey: { type: [Number, String, Symbol], default: void 0 },
  title: { type: String, default: void 0 },
  disabled: { type: Boolean, default: void 0 }
};
var Tab = /* @__PURE__ */ defineComponent$1({
  __IDUX_TAB: true,
  name: "IxTab",
  props: tabProps,
  setup(_, {
    slots
  }) {
    const {
      mergedPrefixCls
    } = inject$1(tabsToken);
    return () => {
      var _a2;
      return createVNode$1("div", {
        "class": `${mergedPrefixCls.value}-pane`
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    };
  }
});
var TabNav = /* @__PURE__ */ defineComponent$1({
  name: "IxTabNav",
  props: tabNavProps,
  setup(props, {
    slots
  }) {
    const key = useKey();
    const {
      selectedKey,
      selectedElRef,
      mergedPrefixCls,
      handleTabClick
    } = inject$1(tabsToken);
    const selfElRef = ref$1(null);
    const isSelected = computed$2(() => {
      var _a2;
      return ((_a2 = selectedKey.value) != null ? _a2 : props.defaultSelectedKey) === key;
    });
    const prefixCls = computed$2(() => `${mergedPrefixCls.value}-nav`);
    const classes = computed$2(() => {
      return normalizeClass$1({
        [`${prefixCls.value}-tab`]: true,
        [`${prefixCls.value}-tab-selected`]: isSelected.value,
        [`${prefixCls.value}-tab-disabled`]: props.disabled
      });
    });
    watchEffect(() => {
      if (isSelected.value && selfElRef.value) {
        selectedElRef.value = selfElRef.value;
      }
    });
    const onClick = (evt) => {
      if (!props.disabled) {
        handleTabClick(key, evt);
      }
    };
    return () => {
      var _a2, _b;
      const tab = createVNode$1("span", {
        "class": `${prefixCls.value}-tab-label`
      }, [createTextVNode$1(" "), (_b = (_a2 = slots.title) == null ? void 0 : _a2.call(slots)) != null ? _b : props.title]);
      return createVNode$1("div", {
        "class": classes.value,
        "onClick": onClick,
        "ref": selfElRef
      }, [tab]);
    };
  }
});
function useSelectedElOffset(isHorizontal, navPreNextSize, selectedElRef) {
  const [selectedLeft, setSelectedLeft] = useState(0);
  const [selectedTop, setSelectedTop] = useState(0);
  const selectedElOffset = computed$2(
    () => (isHorizontal.value ? selectedLeft.value : selectedTop.value) + navPreNextSize.value
  );
  const setSelectedElOffset = () => {
    var _a2, _b, _c, _d;
    setSelectedLeft((_b = (_a2 = selectedElRef.value) == null ? void 0 : _a2.offsetLeft) != null ? _b : 0);
    setSelectedTop((_d = (_c = selectedElRef.value) == null ? void 0 : _c.offsetTop) != null ? _d : 0);
  };
  return {
    selectedElOffset,
    setSelectedElOffset
  };
}
function useNavRelatedElSize(isHorizontal, navWrapperElRef, navElRef, navPreElRef, selectedElRef) {
  const [navWidth, setNavWidth] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  const [navWrapperWidth, setNavWrapperWidth] = useState(0);
  const [navWrapperHeight, setNavWrapperHeight] = useState(0);
  const [navPreNextWidth, setNavPreNextWidth] = useState(0);
  const [navPreNextHeight, setNavPreNextHeight] = useState(0);
  const [selectedWidth, setSelectedWidth] = useState(0);
  const [selectedHeight, setSelectedHeight] = useState(0);
  const navSize = computed$2(() => isHorizontal.value ? navWidth.value : navHeight.value);
  const navPreNextSize = computed$2(() => isHorizontal.value ? navPreNextWidth.value : navPreNextHeight.value);
  const navWrapperSize = computed$2(() => isHorizontal.value ? navWrapperWidth.value : navWrapperHeight.value);
  const selectedElSize = computed$2(() => isHorizontal.value ? selectedWidth.value : selectedHeight.value);
  const setNavElSize = () => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    setNavWrapperWidth((_b = (_a2 = navWrapperElRef.value) == null ? void 0 : _a2.offsetWidth) != null ? _b : 0);
    setNavWrapperHeight((_d = (_c = navWrapperElRef.value) == null ? void 0 : _c.offsetHeight) != null ? _d : 0);
    setNavWidth((_f = (_e = navElRef.value) == null ? void 0 : _e.offsetWidth) != null ? _f : 0);
    setNavHeight((_h = (_g = navElRef.value) == null ? void 0 : _g.offsetHeight) != null ? _h : 0);
  };
  const setSelectedElSize = () => {
    var _a2, _b, _c, _d;
    setSelectedWidth((_b = (_a2 = selectedElRef.value) == null ? void 0 : _a2.offsetWidth) != null ? _b : 0);
    setSelectedHeight((_d = (_c = selectedElRef.value) == null ? void 0 : _c.offsetHeight) != null ? _d : 0);
  };
  const setNavPreNextElSize = () => {
    var _a2, _b, _c, _d;
    setNavPreNextWidth((_b = (_a2 = navPreElRef.value) == null ? void 0 : _a2.$el.offsetWidth) != null ? _b : 0);
    setNavPreNextHeight((_d = (_c = navPreElRef.value) == null ? void 0 : _c.$el.offsetHeight) != null ? _d : 0);
  };
  return {
    navSize,
    navWrapperSize,
    navPreNextSize,
    selectedElSize,
    setNavElSize,
    setSelectedElSize,
    setNavPreNextElSize
  };
}
function useSelectedElVisibleSize(navWrapperSize, selectedElOffset, navOffset) {
  return computed$2(() => {
    return navWrapperSize.value + navOffset.value - selectedElOffset.value;
  });
}
function useNavPreNextClasses(props, mergedPrefixCls, type, disabled) {
  return computed$2(() => {
    const {
      placement
    } = props;
    const prefixCls = mergedPrefixCls.value;
    return normalizeClass$1({
      [`${prefixCls}-nav-${type}`]: true,
      [`${prefixCls}-nav-${type}-disabled`]: disabled.value,
      [`${prefixCls}-nav-${type}-${placement}`]: true
    });
  });
}
function filterTabVNodes(props, tabVNodes, selectedKey, defaultSelectedKey) {
  const renderTabVNodes = [];
  tabVNodes.forEach((vNode) => {
    var _a2;
    const {
      key
    } = vNode;
    const {
      forceRender,
      disabled
    } = vNode.props;
    const _disabled = !isNil(disabled);
    const useVShow = forceRender != null ? forceRender : props.forceRender;
    const show = ((_a2 = selectedKey.value) != null ? _a2 : defaultSelectedKey) === key && !_disabled;
    if (useVShow) {
      renderTabVNodes.push(withDirectives(vNode, [[vShow, show]]));
    } else if (show) {
      renderTabVNodes.push(vNode);
    }
  });
  return renderTabVNodes;
}
var InternalTabs = /* @__PURE__ */ defineComponent$1({
  props: {
    ...tabsProps,
    tabs: {
      type: Array,
      default: void 0
    }
  },
  setup(props) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed$2(() => `${common.prefixCls}-tabs`);
    const config = useGlobalConfig$1("tabs");
    const navWrapperElRef = ref$1(null);
    const navElRef = ref$1(null);
    const navBarElRef = ref$1(null);
    const navPreElRef = ref$1(null);
    const selectedElRef = ref$1(null);
    const [selectedKey, setSelectedKey] = useControlledProp(props, "selectedKey");
    const isLineType = computed$2(() => props.type === "line");
    const isSegmentType = computed$2(() => props.type === "segment");
    const horizontalPlacement = ["top", "bottom"];
    const isHorizontal = computed$2(() => horizontalPlacement.includes(props.placement));
    const mergedSize = computed$2(() => {
      var _a2;
      return (_a2 = props.size) != null ? _a2 : config.size;
    });
    const [navOffset, setNavOffset] = useState(0);
    const [barStyle, setBarStyle] = useState({});
    const {
      navSize,
      navWrapperSize,
      navPreNextSize,
      selectedElSize,
      setNavElSize,
      setSelectedElSize,
      setNavPreNextElSize
    } = useNavRelatedElSize(isHorizontal, navWrapperElRef, navElRef, navPreElRef, selectedElRef);
    const {
      selectedElOffset,
      setSelectedElOffset
    } = useSelectedElOffset(isHorizontal, navPreNextSize, selectedElRef);
    const hasScroll = computed$2(() => {
      return navSize.value > navWrapperSize.value;
    });
    watch$1(hasScroll, () => {
      setNavPreNextElSize();
      updateNavBarStyle();
      updateSelectedOffset();
    }, {
      flush: "post"
    });
    const selectedElVisibleSize = useSelectedElVisibleSize(navWrapperSize, selectedElOffset, navOffset);
    const updateSelectedOffset = () => {
      if (hasScroll.value) {
        const size2 = selectedElVisibleSize.value / navWrapperSize.value;
        const inVisibleRange = size2 < 2;
        if (inVisibleRange) {
          if (selectedElVisibleSize.value < selectedElSize.value) {
            setNavOffset(navOffset.value + selectedElSize.value - selectedElVisibleSize.value + navPreNextSize.value);
          } else if (selectedElVisibleSize.value / navWrapperSize.value > 1) {
            setNavOffset(navOffset.value - (selectedElVisibleSize.value % navWrapperSize.value + navPreNextSize.value));
          }
        } else {
          setNavOffset(selectedElOffset.value - navPreNextSize.value);
        }
      }
    };
    const preReached = ref$1(false);
    const nextReached = ref$1(false);
    const classes = computed$2(() => {
      const {
        type,
        placement,
        mode
      } = props;
      const prefixCls = mergedPrefixCls.value;
      const size2 = mergedSize.value;
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-${size2}`]: true,
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-nav-${placement}`]: placement === "top" || type === "line",
        [`${prefixCls}-nav-${mode}`]: type === "segment"
      });
    });
    const navWrapperClass = computed$2(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass$1({
        [`${prefixCls}-nav-wrapper`]: true,
        [`${prefixCls}-nav-wrapper-has-scroll`]: hasScroll.value
      });
    });
    const curryNavPreNextClasses = curry(useNavPreNextClasses)(props, mergedPrefixCls);
    const navPreClasses = curryNavPreNextClasses("pre", preReached);
    const navNextClasses = curryNavPreNextClasses("next", nextReached);
    const handleTabClick = async (key, evt) => {
      const leaveResult = callEmit(props.onBeforeLeave, key, selectedKey.value);
      const result = await leaveResult;
      if (result !== false) {
        callEmit(props.onTabClick, key, evt);
        if (key === selectedKey.value) {
          updateSelectedOffset();
        }
        setSelectedKey(key);
      }
    };
    const updateNavBarStyle = () => {
      var _a2;
      if (isLineType.value && navBarElRef.value) {
        const isBarDisabled = (_a2 = selectedElRef.value) == null ? void 0 : _a2.classList.contains(`${mergedPrefixCls.value}-nav-tab-disabled`);
        const barDisabledClassName = `${mergedPrefixCls.value}-nav-bar-disabled`;
        const barOffset = selectedElOffset.value - navOffset.value + "px";
        const barSize = selectedElSize.value + "px";
        setBarStyle({
          width: isHorizontal.value ? barSize : "",
          left: isHorizontal.value ? barOffset : "",
          top: isHorizontal.value ? "" : barOffset,
          height: isHorizontal.value ? "" : barSize
        });
        if (isBarDisabled) {
          addClass(navBarElRef.value, barDisabledClassName);
        } else {
          removeClass(navBarElRef.value, barDisabledClassName);
        }
      }
    };
    const handlePreClick = (evt) => {
      if (!preReached.value) {
        callEmit(props.onPreClick, evt);
        const mergedOffset = navOffset.value + navPreNextSize.value;
        const offset2 = mergedOffset < navWrapperSize.value ? 0 : mergedOffset - navWrapperSize.value;
        setNavOffset(offset2);
      }
    };
    const handleNextClick = (evt) => {
      if (!nextReached.value) {
        callEmit(props.onNextClick, evt);
        const mergedNavSize = navSize.value + navPreNextSize.value * 2;
        const _offset = navOffset.value + navWrapperSize.value;
        let offset2;
        if (mergedNavSize - _offset < navWrapperSize.value) {
          offset2 = mergedNavSize - navWrapperSize.value;
        } else {
          offset2 = _offset;
        }
        setNavOffset(offset2);
      }
    };
    const judgePreNextStatus = () => {
      preReached.value = navOffset.value === 0;
      nextReached.value = navSize.value - navOffset.value <= navWrapperSize.value;
    };
    const update = () => {
      setNavElSize();
      setNavPreNextElSize();
      setSelectedElSize();
      setSelectedElOffset();
      updateNavBarStyle();
      judgePreNextStatus();
    };
    watch$1(navOffset, (val) => {
      if (navElRef.value) {
        navElRef.value.style.transform = `translate${isHorizontal.value ? "X" : "Y"}(-${val}px)`;
        judgePreNextStatus();
        updateNavBarStyle();
      }
    }, {
      flush: "post"
    });
    let isAddTabs = false;
    watch$1(() => props.tabs, (val = [], oldVal = []) => {
      update();
      isAddTabs = val.length > oldVal.length;
    }, {
      flush: "post"
    });
    watch$1(navSize, (currentSize, oldSize) => {
      let offset2 = navOffset.value;
      if (currentSize < oldSize && !isAddTabs) {
        offset2 += currentSize - oldSize;
        setNavOffset(offset2 > 0 ? offset2 : 0);
      }
    }, {
      flush: "post"
    });
    watch$1(selectedKey, (val) => {
      var _a2;
      const hasSelectedKey = (_a2 = props.tabs) == null ? void 0 : _a2.find((item) => {
        return val === item.key;
      });
      if (!hasSelectedKey) {
        selectedElRef.value = null;
      }
    });
    watch$1(selectedElRef, () => {
      setSelectedElSize();
      setSelectedElOffset();
      setSelectedElOffset();
      updateSelectedOffset();
      updateNavBarStyle();
    }, {
      flush: "post"
    });
    useResizeObserver(navWrapperElRef, update);
    provide$1(tabsToken, {
      selectedKey,
      selectedElRef,
      mergedPrefixCls,
      handleTabClick
    });
    return () => {
      var _a2, _b;
      let defaultSelectedKey = 1;
      const tabVNodes = (_b = (_a2 = props.tabs) == null ? void 0 : _a2.map((item, index) => {
        if (isNil(item.key)) {
          item.key = index + 1;
        } else if (index === 0) {
          defaultSelectedKey = item.key;
        }
        return item;
      })) != null ? _b : [];
      return createVNode$1("div", {
        "class": classes.value
      }, [createVNode$1("div", {
        "class": navWrapperClass.value,
        "ref": navWrapperElRef
      }, [hasScroll.value && createVNode$1(IxIcon, {
        "class": navPreClasses.value,
        "name": isHorizontal.value ? "left" : "up",
        "onClick": handlePreClick,
        "ref": navPreElRef
      }, null), createVNode$1("div", {
        "class": `${mergedPrefixCls.value}-nav`,
        "ref": navElRef
      }, [
        tabVNodes.map((vnode) => {
          var _a22;
          return createVNode$1(TabNav, mergeProps$1(vnode.props, {
            "key": vnode.key,
            "defaultSelectedKey": defaultSelectedKey
          }), {
            title: (_a22 = vnode.children) == null ? void 0 : _a22.title
          });
        })
      ]), hasScroll.value && createVNode$1(IxIcon, {
        "class": navNextClasses.value,
        "name": isHorizontal.value ? "right" : "down",
        "onClick": handleNextClick
      }, null), !isSegmentType.value && createVNode$1("div", {
        "class": `${mergedPrefixCls.value}-nav-border`
      }, null), isLineType.value && createVNode$1("div", {
        "class": `${mergedPrefixCls.value}-nav-bar`,
        "ref": navBarElRef,
        "style": barStyle.value
      }, null)]), createVNode$1("div", {
        "class": `${mergedPrefixCls.value}-pane-wrapper`
      }, [filterTabVNodes(props, tabVNodes, selectedKey, defaultSelectedKey)])]);
    };
  }
});
var Tabs = /* @__PURE__ */ defineComponent$1({
  name: "IxTabs",
  inheritAttrs: false,
  props: tabsProps,
  setup(props, {
    attrs,
    slots
  }) {
    return () => {
      var _a2;
      const tabVNodes = flattenNode((_a2 = slots.default) == null ? void 0 : _a2.call(slots), {
        key: "__IDUX_TAB"
      });
      const [, setSelectedKey] = useControlledProp(props, "selectedKey");
      const handleChange = (key) => {
        setSelectedKey(key);
      };
      const internalTabsProps = {
        ...props,
        tabs: tabVNodes,
        "onUpdate:selectedKey": handleChange
      };
      return createVNode$1(InternalTabs, mergeProps$1(internalTabsProps, attrs), slots);
    };
  }
});
const IxTabs = Tabs;
const IxTab = Tab;
const DemoInstanceComp = defineComponent$1({
  props: {
    demoInstance: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const elRef = ref$1();
    const {
      mount,
      unmount
    } = (() => {
      return {
        mount: async (instance) => {
          var _a2;
          await ((_a2 = instance.mount) == null ? void 0 : _a2.call(instance, elRef.value));
        },
        unmount: async (instance) => {
          await instance.unmount();
        }
      };
    })();
    onMounted$1(() => mount(props.demoInstance));
    onBeforeUnmount$1(() => unmount(props.demoInstance));
    watch$1(() => props.demoInstance, async (current, pre) => {
      await unmount(pre);
      await mount(current);
    });
    return () => createVNode$1("div", {
      "ref": elRef
    }, null);
  }
});
const DemoToolComp = defineComponent$1({
  props: {
    prefixCls: {
      type: String,
      required: true
    },
    tooltip: String,
    onClick: {
      type: Function,
      required: true
    }
  },
  setup(props, {
    slots
  }) {
    return () => createVNode$1(IxTooltip, {
      "title": props.tooltip
    }, {
      default: () => {
        var _a2;
        return [createVNode$1("div", {
          "class": `${props.prefixCls}-demo__tool`,
          "onClick": props.onClick
        }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])];
      }
    });
  }
});
const demoProps = {
  lang: {
    type: String,
    required: true
  },
  prefixCls: {
    type: String,
    required: true
  },
  demoData: {
    type: Object,
    required: true
  },
  demoInstance: {
    type: Object,
    required: true
  },
  tools: Array
};
const DemoComp = defineComponent$1({
  props: demoProps,
  setup(props) {
    const mergedPrefixCls = `${props.prefixCls}-demo`;
    const mergedTools = computed$2(() => {
      var _a2, _b, _c;
      if (((_b = (_a2 = props.tools) == null ? void 0 : _a2.findIndex((tool) => tool.type === "expandCode")) != null ? _b : -1) > -1) {
        return props.tools;
      }
      return [...(_c = props.tools) != null ? _c : [], {
        type: "expandCode"
      }];
    });
    const sourceCodes = useSourceCodes(props);
    const selectedSourceTab = ref$1(0);
    const handleSelectedSourceTabChange = (tab) => {
      selectedSourceTab.value = tab;
    };
    const expanded = ref$1(false);
    const expandedTitle = computed$2(() => {
      if (props.lang === "zh") {
        return expanded.value ? "\u6536\u8D77\u4EE3\u7801" : "\u663E\u793A\u4EE3\u7801";
      }
      return expanded.value ? "Hide Code" : "Show Code";
    });
    const copyTitle = computed$2(() => props.lang === "zh" ? "\u590D\u5236\u4EE3\u7801" : "Copy Code");
    const onExpanded = () => {
      expanded.value = !expanded.value;
    };
    const {
      copy
    } = useClipboard();
    const {
      success
    } = useMessage();
    const onCopy = throttle(async () => {
      var _a2;
      const code = sourceCodes.value[(_a2 = selectedSourceTab.value) != null ? _a2 : 0].code;
      copy(decodeURIComponent(code)).then(() => {
        success(props.lang === "zh" ? "\u590D\u5236\u6210\u529F" : "copy succeeded");
      });
    }, 300);
    const renderTool = (tool) => {
      var _a2, _b;
      if (tool.type === "expandCode") {
        return createVNode$1(DemoToolComp, {
          "prefixCls": props.prefixCls,
          "tooltip": (_a2 = tool.tooltip) != null ? _a2 : expandedTitle.value,
          "onClick": onExpanded
        }, {
          default: () => [tool.render ? tool.render(expanded.value) : createVNode$1(IxIcon, {
            "name": expanded.value ? "unexpand" : "expand"
          }, null)]
        });
      }
      if (tool.type === "copyCode") {
        return createVNode$1(DemoToolComp, {
          "prefixCls": props.prefixCls,
          "tooltip": (_b = tool.tooltip) != null ? _b : copyTitle.value,
          "onClick": onCopy
        }, {
          default: () => [tool.render ? tool.render() : createVNode$1(IxIcon, {
            "name": "copy"
          }, null)]
        });
      }
      if (tool.type === "link") {
        return createVNode$1(DemoToolComp, {
          "prefixCls": props.prefixCls,
          "tooltip": tool.tooltip,
          "onClick": onCopy
        }, {
          default: () => [createVNode$1("a", {
            "class": `${mergedPrefixCls}__tool-link`,
            "href": tool.link,
            "target": "_blank",
            "rel": "noopener noreferrer"
          }, [tool.render ? tool.render() : createVNode$1(IxIcon, {
            "name": "link"
          }, null)])]
        });
      }
    };
    const renderSourceCode = () => {
      if (!expanded.value) {
        return;
      }
      const contentCls = `${mergedPrefixCls}__source-code__content`;
      let children;
      if (sourceCodes.value.length === 1) {
        children = createVNode$1("div", {
          "class": contentCls,
          "innerHTML": sourceCodes.value[0].parsedCode
        }, null);
      } else {
        children = createVNode$1(IxTabs, {
          "selectedKey": selectedSourceTab.value,
          "onUpdate:selectedKey": handleSelectedSourceTabChange
        }, {
          default: () => [sourceCodes.value.map((sourceCode, idx) => createVNode$1(IxTab, {
            "key": idx,
            "title": sourceCode.filename
          }, {
            default: () => [createVNode$1("div", {
              "class": contentCls,
              "innerHTML": sourceCode.parsedCode
            }, null)]
          }))]
        });
      }
      return createVNode$1("div", {
        "class": `${mergedPrefixCls}__source-code archive-md`
      }, [children]);
    };
    return () => {
      const demoData = props.demoData;
      const demoInstance = props.demoInstance;
      return createVNode$1("div", {
        "class": mergedPrefixCls
      }, [demoData.title && createVNode$1("h3", {
        "id": demoData.id,
        "class": `${mergedPrefixCls}__title`
      }, [createVNode$1("span", null, [demoData.title]), createVNode$1("a", {
        "class": "anchor",
        "href": "#" + demoData.id
      }, [createTextVNode$1("#")])]), demoData.description && createVNode$1("p", {
        "class": `${mergedPrefixCls}__description`
      }, [demoData.description]), createVNode$1("div", {
        "class": `${mergedPrefixCls}__content`
      }, [createVNode$1("div", {
        "class": `${mergedPrefixCls}__content-inner`
      }, [createVNode$1("div", {
        "class": `${mergedPrefixCls}__stage`
      }, [createVNode$1(DemoInstanceComp, {
        "demoInstance": demoInstance
      }, null)]), createVNode$1("div", {
        "class": `${mergedPrefixCls}__tools`
      }, [mergedTools.value.map((tool) => renderTool(tool))])])]), createVNode$1(Transition, {
        "name": `${mergedPrefixCls}-code-fade-down`
      }, {
        default: () => [renderSourceCode()]
      })]);
    };
  }
});
function useSourceCodes(props) {
  const [sourceCodes, setSourceCodes] = useState([]);
  watch$1(() => props.demoData, async (demoData) => {
    const loadedSourceCodes = await Promise.all(demoData.sourceCodes.map((sourceCode) => (async () => {
      return {
        filename: sourceCode.filename,
        code: await sourceCode.code(),
        parsedCode: await sourceCode.parsedCode()
      };
    })()));
    setSourceCodes(loadedSourceCodes);
  }, {
    immediate: true
  });
  return sourceCodes;
}
const DemosContent = defineComponent$1({
  props: {
    demoIds: {
      type: Array,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const {
      options: {
        getInitVisibleDemoIds,
        getDemoTools
      },
      renderers: {
        pageContent: pageContentRenderer
      },
      render: render2
    } = inject$1(pageContextToken);
    const baseContentRef = ref$1();
    const _getInitVisibleDemoIds = () => getInitVisibleDemoIds ? getInitVisibleDemoIds(demoDatas.value) : props.demoIds;
    const demoDatas = computed$2(() => props.demoIds.map((id) => allDemoDatas[id]));
    const visibleDemoIds = ref$1(_getInitVisibleDemoIds());
    const setVisibleDemoIds = (demoIds) => {
      visibleDemoIds.value = demoIds;
    };
    watch$1(() => props.demoIds, () => {
      visibleDemoIds.value = _getInitVisibleDemoIds();
    }, {
      flush: "post"
    });
    watch$1(visibleDemoIds, (ids, oldIds) => {
      if (ids.length !== oldIds.length) {
        nextTick$1(() => {
          baseContentRef.value.updateAnchor();
        });
      }
    });
    return () => {
      return createVNode$1(BaseContentComp, {
        "ref": baseContentRef,
        "visible": props.visible
      }, {
        default: () => [render2({
          demos: demoDatas.value,
          visibleDemoIds: visibleDemoIds.value,
          setVisibleDemoIds
        }, pageContentRenderer, () => props.demoIds.map((id) => withDirectives(createVNode$1(DemoComp, {
          "demoData": allDemoDatas[id],
          "demoInstance": allDemoInstance[id],
          "tools": getDemoTools == null ? void 0 : getDemoTools(allDemoDatas[id]),
          "prefixCls": "archive-app",
          "lang": "zh"
        }, null), [[vShow, visibleDemoIds.value.includes(id)]])))]
      });
    };
  }
});
const Page = defineComponent$1({
  props: {
    pageData: {
      type: Object,
      required: true
    },
    theme: {
      type: Object,
      required: true
    },
    options: Object,
    renderers: Object
  },
  setup(props) {
    var _a2, _b, _c;
    const wrapperRef = ref$1();
    const headerRef = ref$1();
    const headerAffixTarget = ref$1();
    const headerFixed = ref$1(false);
    const headerHeight = ref$1(0);
    const handleAffixChange = (value) => {
      headerFixed.value = value;
    };
    const appContext = inject$1(appContextToken, null);
    const theme = inject$1(themeToken);
    const breakpoints = inject$1(breakpointsToken);
    const render2 = usePageRender({
      theme,
      breakpoints,
      route: appContext == null ? void 0 : appContext.route,
      activeRecords: appContext == null ? void 0 : appContext.activeRecords
    });
    const anchorOptions = computed$2(() => ({
      enabled: props.theme.page.enableAnchor,
      maxLevel: props.theme.page.anchorMaxLevel
    }));
    const pageCls = computed$2(() => {
      const prefixCls = "archive-app__page";
      return normalizeClass$1({
        [prefixCls]: true,
        [`${prefixCls}-xs`]: breakpoints.xs,
        [`${prefixCls}-sm`]: breakpoints.sm,
        [`${prefixCls}-md`]: breakpoints.md,
        [`${prefixCls}-lg`]: breakpoints.lg,
        [`${prefixCls}-xl`]: breakpoints.xl
      });
    });
    onMounted$1(() => {
      var _a22, _b2;
      if (props.theme.page.headerAffix) {
        headerAffixTarget.value = I(wrapperRef.value);
      }
      headerHeight.value = (_b2 = (_a22 = headerRef.value) == null ? void 0 : _a22.getBoundingClientRect().height) != null ? _b2 : 0;
    });
    provide$1(pageContextToken, {
      headerFixed,
      headerHeight,
      anchorOptions,
      options: (_a2 = props.options) != null ? _a2 : {},
      renderers: (_b = props.renderers) != null ? _b : {},
      render: render2
    });
    const title = computed$2(() => props.pageData.title);
    const description = computed$2(() => props.pageData.description);
    const pageDemoIds = computed$2(() => props.pageData.demoIds);
    const pageComponent = computed$2(() => props.pageData.component);
    const tabs = computed$2(() => {
      var _a22, _b2;
      return (_b2 = (_a22 = props.pageData.tabs) == null ? void 0 : _a22.filter((tab) => tab.component || tab.demoIds)) != null ? _b2 : [];
    });
    const tabsRadioData = computed$2(() => tabs.value.map((tab) => ({
      label: tab.name,
      value: tab.id
    })));
    const showTabs = computed$2(() => {
      var _a22;
      return !((_a22 = pageDemoIds.value) == null ? void 0 : _a22.length) && tabs.value.length > 0;
    });
    const activeTabId = ref$1((_c = tabs.value[0]) == null ? void 0 : _c.id);
    const setActiveTabId = (tab) => {
      activeTabId.value = tab;
    };
    watch$1(() => props.pageData, () => {
      var _a22;
      activeTabId.value = (_a22 = tabs.value[0]) == null ? void 0 : _a22.id;
    });
    const headerCls = computed$2(() => ["archive-app__page__header", headerFixed.value ? "archive-app__page__header--fixed" : void 0]);
    const renderHeader = () => {
      var _a22;
      if (!title.value && !description.value && !tabs.value.length) {
        return;
      }
      const contentNode = createVNode$1("section", {
        "ref": headerRef,
        "class": headerCls.value
      }, [render2({
        title: title.value,
        description: description.value,
        tabs: tabs.value,
        activeTabId: activeTabId.value,
        setActiveTabId
      }, (_a22 = props.renderers) == null ? void 0 : _a22.pageHeader, () => [createVNode$1("h1", {
        "class": "archive-app__page__title"
      }, [title.value]), createVNode$1("p", {
        "class": "archive-app__page__description"
      }, [description.value]), showTabs.value && createVNode$1(IxRadioGroup, {
        "value": activeTabId.value,
        "dataSource": tabsRadioData.value,
        "size": "lg",
        "mode": "primary",
        "gap": 4,
        "buttoned": true,
        "onUpdate:value": setActiveTabId
      }, null)].filter(Boolean))]);
      if (props.theme.page.headerAffix) {
        return createVNode$1(IxAffix, {
          "class": "archive-app__page__header-affix",
          "target": headerAffixTarget.value,
          "onChange": handleAffixChange
        }, {
          default: () => [contentNode]
        });
      }
      return contentNode;
    };
    const renderContent2 = () => {
      let children;
      if (pageDemoIds.value) {
        children = createVNode$1(DemosContent, {
          "visible": true,
          "demoIds": pageDemoIds.value
        }, null);
      } else if (pageComponent.value) {
        children = createVNode$1(AsyncContent, {
          "visible": true,
          "component": pageComponent.value
        }, null);
      } else {
        children = tabs.value.map((tab) => {
          const visible = activeTabId.value === tab.id;
          if (tab.demoIds) {
            return withDirectives(createVNode$1(DemosContent, {
              "visible": visible,
              "demoIds": tab.demoIds
            }, null), [[vShow, visible]]);
          }
          return withDirectives(createVNode$1(AsyncContent, {
            "visible": visible,
            "component": tab.component
          }, null), [[vShow, visible]]);
        });
      }
      return createVNode$1("section", {
        "class": "archive-app__page__content"
      }, [children]);
    };
    return () => createVNode$1(IxMessageProvider, null, {
      default: () => [createVNode$1("article", {
        "ref": wrapperRef,
        "class": pageCls.value
      }, [renderHeader(), renderContent2()])]
    });
  }
});
const Page$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
const app = "";
mountApp(mountOptions);
export {
  __vitePreload as _,
  createStaticVNode as a,
  createCommentVNode as b,
  createElementBlock as c,
  createBaseVNode as d,
  createTextVNode as e,
  openBlock as o,
  x
};
