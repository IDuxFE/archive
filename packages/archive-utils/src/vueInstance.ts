/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import {
  type App,
  type DefineComponent,
  Teleport,
  VNode,
  VNodeChild,
  createApp,
  createVNode,
  defineAsyncComponent,
  markRaw,
  ref,
} from 'vue'

export interface InstanceData {
  key: string | number | symbol
  el: HTMLElement
  component: DefineComponent
}

export interface Instance {
  mount: (el: HTMLElement) => Promise<void>
  unmount: () => Promise<void>
}

export interface VueAppSetup {
  setupApp?: (app: App) => void
  renderApp?: (nodes: VNode[]) => VNodeChild
}

export type VueInstanceFactory = (component: () => Promise<DefineComponent>, key: string | number | symbol) => Instance

export function createVueInstanceFactory(setup?: VueAppSetup): VueInstanceFactory {
  let instanceMountApp: App | null = null
  const instanceDataRefs = ref<Set<InstanceData>>(new Set())

  const renderInstances = () => {
    return [...instanceDataRefs.value.values()].map(({ key, el, component }) =>
      createVNode(
        Teleport,
        { to: el, key },
        {
          default: () => [createVNode(component)],
        },
      ),
    )
  }

  const mountApp = () => {
    if (instanceMountApp) {
      return
    }

    instanceMountApp = createApp({
      render: () => (setup?.renderApp ? setup.renderApp(renderInstances()) : renderInstances()),
    })
    setup?.setupApp?.(instanceMountApp)

    const div = document.createElement('div')
    document.body.appendChild(div)
    instanceMountApp.mount(div)
  }

  const mountInstance = (el: HTMLElement, component: DefineComponent, key: string | number | symbol) => {
    mountApp()

    const instanceData = { component, key, el }
    instanceDataRefs.value.add(instanceData)

    return instanceData
  }

  const unmountInstance = (instanceData?: InstanceData) => {
    instanceData && instanceDataRefs.value.delete(instanceData)
  }

  return (component: () => Promise<DefineComponent>, key: string | number | symbol): Instance => {
    let instanceData: InstanceData
    return {
      async mount(el: HTMLElement) {
        instanceData = mountInstance(el, markRaw(defineAsyncComponent(component)), key)
      },
      async unmount() {
        unmountInstance(instanceData)
      },
    }
  }
}
