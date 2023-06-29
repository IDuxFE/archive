import { d as defineComponent, a as inject, r as ref, c as computed, o as onMounted, m, b as createVNode, w as watch, n as nextTick, p as provide, e as pageContextToken, f as onBeforeUnmount, g as isObject, u, j as withDirectives, v as vShow, k as normalizeClass, l as useGlobalConfig$1, q as watchEffect, s as off, t as convertTarget, x as on, y as appContextToken, z as themeToken, A as breakpointsToken, B as onUnmounted, C as callEmit, D as getOffset, E as convertNumber, F as throttleRAF, G as isHTMLElement } from "./app-default-a73ca19d.js";
import { u as useClipboard, D as Demo, B as Bi, I as IxMessageProvider, a as IxRadioGroup, s as scrollToTop } from "./Demo-099c9512.js";
function isUndefined(value) {
  return value === void 0;
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
function normalizeOffset(offset) {
  if (!isObject(offset)) {
    return { top: convertNumber(offset) };
  }
  const _offset = {};
  Object.keys(offset).forEach((dire) => {
    _offset[dire] = convertNumber(offset[dire]);
  });
  return _offset;
}
function getTargetRect(target, container) {
  const targetRect = target.getBoundingClientRect();
  const containerRect = isHTMLElement(container) ? container.getBoundingClientRect() : { top: 0, bottom: window.innerHeight, left: 0, right: window.innerWidth };
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
var Affix = /* @__PURE__ */ defineComponent({
  name: "IxAffix",
  props: affixProps,
  setup(props, {
    slots,
    expose
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-affix`);
    const contentStyle = ref({});
    const affixStyle = ref({});
    const targetRef = ref(null);
    const affixRef = ref(null);
    const contentRef = ref(null);
    const offset = computed(() => normalizeOffset(props.offset));
    const isStickyRef = ref(false);
    watch(isStickyRef, (value) => {
      var _a;
      return (_a = props.onChange) == null ? void 0 : _a.call(props, value);
    });
    const throttleMeasure = throttleRAF(measure);
    function measure(event) {
      if (!affixRef.value || !targetRef.value || !contentRef.value) {
        clearStyle();
        return;
      }
      isStickyRef.value = isSticky(affixRef.value, targetRef.value, offset.value);
      if (!isStickyRef.value) {
        clearStyle();
        return;
      }
      if (event && event.type === "resize") {
        clearStyle();
        nextTick(measure);
        return;
      }
      const {
        width,
        height
      } = getTargetSize(contentRef.value);
      contentStyle.value = {
        ...calcStickyPosition(affixRef.value, targetRef.value, offset.value),
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
    onMounted(() => {
      nextTick(() => {
        initContainer();
        measure();
      });
    });
    onUnmounted(() => {
      var _a;
      removeObserveTarget(targetRef.value, throttleMeasure);
      (_a = throttleMeasure.cancel) == null ? void 0 : _a.call(throttleMeasure);
    });
    watch(() => props.offset, measure);
    watch(() => props.target, () => {
      removeObserveTarget(targetRef.value, throttleMeasure);
      initContainer();
      measure();
    });
    expose({
      update: throttleMeasure
    });
    return () => {
      var _a;
      const prefixCls = mergedPrefixCls.value;
      return createVNode("div", {
        "ref": affixRef,
        "style": affixStyle.value,
        "class": prefixCls
      }, [createVNode("div", {
        "ref": contentRef,
        "class": `${prefixCls}-content`,
        "style": contentStyle.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});
const IxAffix = Affix;
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
const innerPageProps = {
  pageData: { type: Object, required: true },
  theme: { type: Object, required: true },
  options: Object,
  renderers: Object
};
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
let inited = false;
function useCopyCode() {
  if (inited) {
    return;
  }
  const { copy } = useClipboard();
  const timeoutIdMap = /* @__PURE__ */ new Map();
  window.addEventListener("click", (e) => {
    var _a;
    const el = e.target;
    if (el.matches('div[class*="language-"] > button.copy')) {
      const parent = el.parentElement;
      const sibling = (_a = el.nextElementSibling) == null ? void 0 : _a.nextElementSibling;
      if (!parent || !sibling) {
        return;
      }
      const isShell = /language-(shellscript|shell|bash|sh|zsh)/.test(parent.className);
      let text = "";
      sibling.querySelectorAll("span.line:not(.diff.remove)").forEach((node) => text += (node.textContent || "") + "\n");
      text = text.slice(0, -1);
      if (isShell) {
        text = text.replace(/^ *(\$|>) /gm, "").trim();
      }
      copy(text).then(() => {
        el.classList.add("copied");
        clearTimeout(timeoutIdMap.get(el));
        const timeoutId = setTimeout(() => {
          el.classList.remove("copied");
          el.blur();
          timeoutIdMap.delete(el);
        }, 2e3);
        timeoutIdMap.set(el, timeoutId);
      });
    }
  });
  inited = true;
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function usePageRender(dataBase) {
  return (data, customRenderer, defaultRenderer) => {
    var _a;
    const defaultNodes = defaultRenderer == null ? void 0 : defaultRenderer();
    return customRenderer ? customRenderer(
      {
        theme: dataBase.theme,
        route: dataBase.route,
        breakpoints: dataBase.breakpoints,
        activeRecords: (_a = dataBase.activeRecords) == null ? void 0 : _a.value,
        ...data ?? {}
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
function useAsyncProp(props, key) {
  const data = ref();
  onMounted(() => {
    watch(
      () => props[key],
      async (asyncProp) => {
        data.value = void 0;
        if (asyncProp) {
          data.value = await (asyncProp == null ? void 0 : asyncProp());
        }
      },
      {
        immediate: true
      }
    );
  });
  return data;
}
function useArrayAsyncProp(props, key) {
  const data = ref();
  onMounted(() => {
    watch(
      () => props[key],
      async (arrayAsyncProp) => {
        data.value = void 0;
        if (arrayAsyncProp) {
          data.value = await Promise.all(arrayAsyncProp == null ? void 0 : arrayAsyncProp.map((asyncProp) => asyncProp()));
        }
      },
      {
        immediate: true
      }
    );
  });
  return data;
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function useArchiveItemImport(props, key) {
  const data = useAsyncProp(props, key);
  const updatedItem = ref();
  const resolvedItem = computed(() => {
    var _a;
    return updatedItem.value ?? ((_a = data.value) == null ? void 0 : _a.default);
  });
  let stop;
  if (window.__ARCHIVE_HMR_RUNTIME__) {
    stop = window.__ARCHIVE_HMR_RUNTIME__.onItemChange((item) => {
      var _a, _b;
      if (((_a = updatedItem.value) == null ? void 0 : _a.id) === item.id || ((_b = data.value) == null ? void 0 : _b.default.id) === item.id) {
        updatedItem.value = item;
      }
    });
    onBeforeUnmount(() => {
      stop == null ? void 0 : stop();
    });
  }
  watch(data, () => {
    updatedItem.value = void 0;
  });
  return resolvedItem;
}
function useArchiveItemImports(props, key) {
  const data = useArrayAsyncProp(props, key);
  const updatedItems = ref({});
  const resolvedItems = computed(
    () => {
      var _a;
      return ((_a = data.value) == null ? void 0 : _a.map((mod) => {
        const item = mod.default;
        return updatedItems.value[item.id] ?? item;
      })) ?? [];
    }
  );
  let stop;
  if (window.__ARCHIVE_HMR_RUNTIME__) {
    stop = window.__ARCHIVE_HMR_RUNTIME__.onItemChange((item) => {
      var _a;
      if (!!updatedItems.value[item.id] || ((_a = data.value) == null ? void 0 : _a.findIndex((loadedItem) => loadedItem.default.id === item.id))) {
        updatedItems.value[item.id] = item;
      }
    });
    onBeforeUnmount(() => {
      stop == null ? void 0 : stop();
    });
  }
  watch(data, () => {
    updatedItems.value = {};
  });
  return resolvedItems;
}
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
var Anchor$1 = /* @__PURE__ */ defineComponent({
  name: "IxAnchor",
  props: anchorProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-anchor`);
    const config = useGlobalConfig$1("anchor");
    const hideLinkBall = computed(() => {
      var _a;
      return (_a = props.hideLinkBall) != null ? _a : config.hideLinkBall;
    });
    const wrapperStyle = computed(() => {
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
      var _a;
      const prefixCls = mergedPrefixCls.value;
      const linkBall = hideLinkBall.value ? null : createVNode("span", {
        "class": inkBallClasses.value,
        "style": {
          top: inkBallTop.value
        },
        "ref": inkBallElRef
      }, null);
      const anchorNode = createVNode("div", {
        "class": `${prefixCls}-wrapper`,
        "style": wrapperStyle.value
      }, [createVNode("div", {
        "class": prefixCls,
        "ref": anchorRef
      }, [createVNode("div", {
        "class": `${prefixCls}-ink`
      }, [linkBall]), (_a = slots.default) == null ? void 0 : _a.call(slots)])]);
      if (!props.affix) {
        return anchorNode;
      }
      return createVNode(IxAffix, {
        "target": props.target,
        "offset": props.offsetTop
      }, {
        default: () => [anchorNode]
      });
    };
  }
});
const useLinks = (props, config) => {
  const links = ref([]);
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
  const activeLink = ref();
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
  provide(anchorToken, {
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
  const anchorRef = ref();
  const inkBallElRef = ref();
  const inkBallClasses = computed(() => {
    const prefixCls = mergedPrefixCls.value;
    return {
      [`${prefixCls}-ink-ball`]: true,
      [`${prefixCls}-ink-ball-visible`]: !!activeLink.value
    };
  });
  const inkBallTop = ref();
  onMounted(() => {
    watchEffect(() => {
      var _a, _b, _c;
      const activeLinkElement = (_a = anchorRef.value) == null ? void 0 : _a.querySelector(`a[data-href="${activeLink.value}"]`);
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
  const bounds = computed(() => {
    var _a;
    return (_a = props.bounds) != null ? _a : config.bounds;
  });
  const container = ref();
  const eventType = "scroll";
  let animating = false;
  const targetOffset = computed(() => {
    var _a, _b;
    return (_b = (_a = props.targetOffset) != null ? _a : props.offsetTop) != null ? _b : 0;
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
  watch(() => props.target, () => {
    off(container.value, eventType, handleScroll);
    container.value = convertTarget(props.target);
    on(container.value, eventType, handleScroll);
    handleScroll();
  });
  onMounted(() => {
    container.value = convertTarget(props.target);
    on(container.value, eventType, handleScroll);
    handleScroll();
  });
  onBeforeUnmount(() => {
    off(container.value, eventType, handleScroll);
  });
  return {
    scrollTo
  };
};
var AnchorLink = /* @__PURE__ */ defineComponent({
  name: "IxAnchorLink",
  props: linkProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-anchor-link`);
    const {
      registerLink,
      unregisterLink,
      activeLink,
      handleLinkClick
    } = inject(anchorToken);
    watch(() => props.href, (newHref, oldHref) => {
      unregisterLink(oldHref);
      registerLink(newHref);
    });
    onMounted(() => registerLink(props.href));
    onBeforeUnmount(() => unregisterLink(props.href));
    const isActive = computed(() => activeLink.value === props.href);
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return {
        [`${prefixCls}-title`]: true,
        [`${prefixCls}-title-active`]: isActive.value
      };
    });
    const onClick = (evt) => handleLinkClick(evt, props);
    return () => {
      var _a, _b, _c;
      const {
        href,
        title
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return createVNode("div", {
        "class": prefixCls
      }, [createVNode("a", {
        "class": classes.value,
        "href": href,
        "data-href": href,
        "title": title,
        "onClick": onClick
      }, [(_b = (_a = slots.title) == null ? void 0 : _a.call(slots)) != null ? _b : title]), (_c = slots.default) == null ? void 0 : _c.call(slots)]);
    };
  }
});
const IxAnchor = Anchor$1;
const IxAnchorLink = AnchorLink;
const Anchor = defineComponent({
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
    } = inject(pageContextToken);
    const renderLinks = (data) => {
      return data.map((item) => createVNode(IxAnchorLink, {
        "title": item.title,
        "href": item.href
      }, {
        default: () => [renderLinks(item.children)]
      }));
    };
    const anchorRef = ref();
    const target = ref();
    const offsetTop = computed(() => headerFixed.value ? headerHeight.value + 16 : 16);
    onMounted(() => {
      var _a;
      target.value = m((_a = anchorRef.value) == null ? void 0 : _a.$el);
    });
    return () => createVNode(IxAnchor, {
      "ref": anchorRef,
      "offsetTop": offsetTop.value,
      "target": target.value
    }, {
      default: () => [renderLinks(props.data)]
    });
  }
});
const BaseContent = defineComponent({
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
    } = inject(pageContextToken);
    const enableAnchor = computed(() => !!anchorOptions.value.enabled);
    const anchorMaxLevel = computed(() => isObject(anchorOptions) ? anchorOptions.value.maxLevel : 3);
    const rootEl = ref();
    const anchorEl = ref();
    const anchorDatas = ref();
    const contentPaddingReight = ref();
    const calcContentPadding = () => {
      var _a;
      const anchorWidth = (_a = anchorEl.value) == null ? void 0 : _a.$el.getBoundingClientRect().width;
      contentPaddingReight.value = anchorWidth ? `${anchorWidth}px` : void 0;
    };
    const updateAnchor = () => {
      if (!rootEl.value) {
        return;
      }
      anchorDatas.value = parseAnchors(rootEl.value, anchorMaxLevel.value);
    };
    watch([anchorDatas, () => props.visible], ([, visible]) => {
      visible && nextTick(calcContentPadding);
    });
    onMounted(() => {
      if (!enableAnchor.value) {
        return;
      }
      watch(() => props.visible, (visible) => {
        visible && nextTick(updateAnchor);
      }, {
        immediate: true
      });
    });
    expose({
      updateAnchor
    });
    return () => {
      var _a, _b;
      return createVNode("div", {
        "class": "archive-app__page__content"
      }, [createVNode("div", {
        "class": "archive-app__page__content__inner",
        "ref": rootEl
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), ((_b = anchorDatas.value) == null ? void 0 : _b.length) ? createVNode(Anchor, {
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
function parseAnchors(root, maxLevel) {
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
  u(root.children, "children", (el, parents) => {
    var _a;
    if (getComputedStyle(el).display === "none") {
      hiddenEls.push(el);
      return;
    }
    if (!el.id || !el.textContent || parents.some((parent) => hiddenEls.includes(parent))) {
      return;
    }
    const level = (_a = anchorTags.find((tag) => tag.tag === el.tagName.toLowerCase())) == null ? void 0 : _a.level;
    if (!level || level > maxLevel) {
      return;
    }
    const data = {
      level,
      title: el.getAttribute("title") ?? el.textContent.replace(/^#/, "").replace(/#$/, "") ?? el.id,
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
const DemosContent = defineComponent({
  props: {
    demoImports: {
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
      render
    } = inject(pageContextToken);
    const baseContentRef = ref();
    const demoItems = useArchiveItemImports(props, "demoImports");
    const demoIds = computed(() => demoItems.value.map((demoItem) => demoItem.id));
    const _getInitVisibleDemoIds = () => getInitVisibleDemoIds ? getInitVisibleDemoIds(demoItems.value) : demoIds.value;
    const visibleDemoIds = ref(_getInitVisibleDemoIds());
    const setVisibleDemoIds = (demoIds2) => {
      visibleDemoIds.value = demoIds2;
    };
    watch(demoIds, () => {
      visibleDemoIds.value = _getInitVisibleDemoIds();
    }, {
      flush: "post"
    });
    watch(visibleDemoIds, (ids, oldIds) => {
      if (ids.length !== oldIds.length) {
        nextTick(() => {
          baseContentRef.value.updateAnchor();
        });
      }
    });
    return () => {
      return createVNode(BaseContent, {
        "ref": baseContentRef,
        "visible": props.visible
      }, {
        default: () => [render({
          demos: demoItems.value,
          visibleDemoIds: visibleDemoIds.value,
          setVisibleDemoIds
        }, pageContentRenderer, () => demoItems.value.map((demoItem) => withDirectives(createVNode(Demo, {
          "resolvedDemoItem": demoItem,
          "tools": getDemoTools == null ? void 0 : getDemoTools(demoItem),
          "lang": "zh"
        }, null), [[vShow, visibleDemoIds.value.includes(demoItem.id)]])))]
      });
    };
  }
});
const PageContent = defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    pageImport: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const resolvedItem = useArchiveItemImport(props, "pageImport");
    const {
      render,
      renderers: {
        pageContent: pageContentRenderer
      }
    } = inject(pageContextToken);
    const instanceMounted = ref(false);
    const onInstanceMountedChange = (mounted) => {
      instanceMounted.value = mounted;
    };
    return () => createVNode(BaseContent, {
      "visible": props.visible && instanceMounted.value
    }, {
      default: () => [render({
        demos: [],
        visibleDemoIds: [],
        setVisibleDemoIds: () => {
        }
      }, pageContentRenderer, () => {
        var _a;
        return [createVNode(Bi, {
          "instance": (_a = resolvedItem.value) == null ? void 0 : _a.instance,
          "onInstanceMountedChange": onInstanceMountedChange
        }, null)];
      })]
    });
  }
});
const Page = defineComponent({
  props: innerPageProps,
  setup(props) {
    var _a;
    const wrapperRef = ref();
    const headerRef = ref();
    const headerAffixTarget = ref();
    const headerFixed = ref(false);
    const headerHeight = ref(0);
    const handleAffixChange = (value) => {
      headerFixed.value = value;
    };
    const appContext = inject(appContextToken, null);
    const theme = inject(themeToken);
    const breakpoints = inject(breakpointsToken);
    useCopyCode();
    const render = usePageRender({
      theme,
      breakpoints,
      route: appContext == null ? void 0 : appContext.route,
      activeRecords: appContext == null ? void 0 : appContext.activeRecords
    });
    const anchorOptions = computed(() => ({
      enabled: props.theme.page.enableAnchor,
      maxLevel: props.theme.page.anchorMaxLevel
    }));
    const pageCls = computed(() => {
      const prefixCls = "archive-app__page";
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-xs`]: breakpoints.xs,
        [`${prefixCls}-sm`]: breakpoints.sm,
        [`${prefixCls}-md`]: breakpoints.md,
        [`${prefixCls}-lg`]: breakpoints.lg,
        [`${prefixCls}-xl`]: breakpoints.xl
      });
    });
    onMounted(() => {
      var _a2;
      if (props.theme.page.headerAffix) {
        headerAffixTarget.value = m(wrapperRef.value);
      }
      headerHeight.value = ((_a2 = headerRef.value) == null ? void 0 : _a2.getBoundingClientRect().height) ?? 0;
    });
    provide(pageContextToken, {
      headerFixed,
      headerHeight,
      anchorOptions,
      options: props.options ?? {},
      renderers: props.renderers ?? {},
      render
    });
    const title = computed(() => props.pageData.title);
    const description = computed(() => props.pageData.description);
    const demoImports = computed(() => props.pageData.demoImports);
    const pageImport = computed(() => props.pageData.import);
    const tabs = computed(() => {
      var _a2;
      return ((_a2 = props.pageData.tabs) == null ? void 0 : _a2.filter((tab) => tab.import || tab.demoImports)) ?? [];
    });
    const tabsRadioData = computed(() => tabs.value.map((tab) => ({
      label: tab.name,
      value: tab.id
    })));
    const showTabs = computed(() => {
      var _a2;
      return !((_a2 = demoImports.value) == null ? void 0 : _a2.length) && tabs.value.length > 0;
    });
    const activeTabId = ref((_a = tabs.value[0]) == null ? void 0 : _a.id);
    const setActiveTabId = (tab) => {
      activeTabId.value = tab;
    };
    watch(() => props.pageData, () => {
      var _a2;
      activeTabId.value = (_a2 = tabs.value[0]) == null ? void 0 : _a2.id;
    });
    const headerCls = computed(() => ["archive-app__page__header", headerFixed.value ? "archive-app__page__header--fixed" : void 0]);
    const renderHeader = () => {
      var _a2;
      if (!title.value && !description.value && !tabs.value.length) {
        return;
      }
      const contentNode = createVNode("section", {
        "ref": headerRef,
        "class": headerCls.value
      }, [render({
        title: title.value,
        description: description.value,
        tabs: tabs.value,
        activeTabId: activeTabId.value,
        setActiveTabId
      }, (_a2 = props.renderers) == null ? void 0 : _a2.pageHeader, () => [createVNode("h1", {
        "class": "archive-app__page__title"
      }, [title.value]), createVNode("p", {
        "class": "archive-app__page__description"
      }, [description.value]), showTabs.value && createVNode(IxRadioGroup, {
        "value": activeTabId.value,
        "dataSource": tabsRadioData.value,
        "size": "lg",
        "mode": "primary",
        "gap": 4,
        "buttoned": true,
        "onUpdate:value": setActiveTabId
      }, null)].filter(Boolean))]);
      if (props.theme.page.headerAffix) {
        return createVNode(IxAffix, {
          "class": "archive-app__page__header-affix",
          "target": headerAffixTarget.value,
          "onChange": handleAffixChange
        }, {
          default: () => [contentNode]
        });
      }
      return contentNode;
    };
    const renderContent = () => {
      let children;
      if (demoImports.value) {
        children = createVNode(DemosContent, {
          "visible": true,
          "demoImports": demoImports.value
        }, null);
      } else if (pageImport.value) {
        children = createVNode(PageContent, {
          "visible": true,
          "pageImport": pageImport.value
        }, null);
      } else {
        children = tabs.value.map((tab) => {
          const visible = activeTabId.value === tab.id;
          if (tab.demoImports) {
            return withDirectives(createVNode(DemosContent, {
              "visible": visible,
              "demoImports": tab.demoImports
            }, null), [[vShow, visible]]);
          }
          return withDirectives(createVNode(PageContent, {
            "visible": visible,
            "pageImport": tab.import
          }, null), [[vShow, visible]]);
        });
      }
      return createVNode("section", {
        "class": "archive-app__page__content"
      }, [children]);
    };
    return () => createVNode(IxMessageProvider, null, {
      default: () => [createVNode("article", {
        "ref": wrapperRef,
        "class": pageCls.value
      }, [renderHeader(), renderContent()])]
    });
  }
});
export {
  Page as default
};
