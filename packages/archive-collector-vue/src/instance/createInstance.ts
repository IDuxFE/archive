/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable camelcase */

import type { ResolvedVue3Demo, VueCollectorSetup } from '../types'
import type { DemoInstance } from '@idux-archive/vite-plugin'

import {
  type App,
  type DefineComponent,
  Teleport,
  createApp,
  createVNode,
  defineAsyncComponent,
  markRaw,
  ref,
} from 'vue'

interface Instance {
  demo: ResolvedVue3Demo
  el: HTMLElement
  component: DefineComponent
}

let __demo_mount_app__: App | null = null
const demoRefs = ref<Set<Instance>>(new Set())

export function createInstance(demo: ResolvedVue3Demo, setup?: VueCollectorSetup): DemoInstance {
  let instance: Instance
  return {
    async mount(el: HTMLElement) {
      instance = mountDemo(el, demo, setup)
    },
    async unmount() {
      unmountDemo(instance)
    },
  }
}

function renderDemos(setup?: VueCollectorSetup) {
  return [...demoRefs.value.values()].map(({ demo, el, component }) =>
    createVNode(
      Teleport,
      { to: el, key: demo.id },
      {
        default: () => {
          let vm = createVNode(component)
          vm = setup?.render?.(vm, demo) ?? vm
          return [vm]
        },
      },
    ),
  )
}

function mountApp(setup?: VueCollectorSetup) {
  if (__demo_mount_app__) {
    return
  }

  __demo_mount_app__ = createApp({
    render: setup?.renderApp ? () => setup?.renderApp!(renderDemos(setup)) : () => renderDemos(setup),
  })
  setup?.setupApp?.(__demo_mount_app__)
  __demo_mount_app__.mount(document.createDocumentFragment())
}

function mountDemo(el: HTMLElement, demo: ResolvedVue3Demo, setup?: VueCollectorSetup): Instance {
  mountApp(setup)

  const instance = { demo, el, component: markRaw(defineAsyncComponent(demo.component)) }
  demoRefs.value.add(instance)

  return instance
}

function unmountDemo(instance?: Instance) {
  instance && demoRefs.value.delete(instance)
}
