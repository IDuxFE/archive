import type { DemoInstance } from '@idux/archive-plugin'
import type { ResolvedVue3Demo, VueCollectorSetup } from '../types'
import { type App, createApp, render, createVNode, defineAsyncComponent, VNode } from 'vue'

let __demo_mount_app__: App | null = null

export function createInstance(demo: ResolvedVue3Demo, setup?: VueCollectorSetup): DemoInstance {
  let _el: HTMLElement
  return {
    async mount(el: HTMLElement) {
      _el = el
      mountDemo(el, demo, setup)
    },
    async unmount() {
      unmountDemo(_el)
    }
  }
}

function mountDemo(el: HTMLElement, demo: ResolvedVue3Demo, setup?: VueCollectorSetup): VNode {
  if (!__demo_mount_app__) {
    __demo_mount_app__ = createApp({ render: () => createVNode('div') })
    setup?.setupApp?.(__demo_mount_app__)
    __demo_mount_app__.mount(document.createDocumentFragment())
  }

  let vm = createVNode(defineAsyncComponent(demo.component))
  vm = setup?.render?.(vm) ?? vm
  vm.appContext = __demo_mount_app__._context
  
  render(vm, el)

  return vm
}

function unmountDemo(el?: HTMLElement) {
  el && render(null, el)
}