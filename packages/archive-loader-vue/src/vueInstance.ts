/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { type App, type DefineComponent, Teleport, createApp, createVNode, markRaw, ref } from 'vue'

import { ArchiveLoaderVueInstance, ArchiveLoaderVueSetup } from './types'

export interface InstanceData {
  key: string | number | symbol
  el: HTMLElement
  component: DefineComponent
}

export type VueInstanceFactory = (component: DefineComponent) => ArchiveLoaderVueInstance

export function createVueInstanceFactory(setup?: ArchiveLoaderVueSetup): VueInstanceFactory {
  let instanceMountApp: App | null = null
  let instanceDataKeySeed = 0

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

  const mountInstance = (el: HTMLElement, component: DefineComponent) => {
    mountApp()

    const instanceData = { component, key: `instance-${instanceDataKeySeed++}`, el }
    instanceDataRefs.value.add(instanceData)

    return instanceData
  }

  const unmountInstance = (instanceData?: InstanceData) => {
    instanceData && instanceDataRefs.value.delete(instanceData)
  }

  return (component: DefineComponent): ArchiveLoaderVueInstance => {
    let instanceData: InstanceData
    return {
      async mount(el: HTMLElement) {
        instanceData = mountInstance(el, markRaw(component))
      },
      async unmount() {
        unmountInstance(instanceData)
      },
    }
  }
}
