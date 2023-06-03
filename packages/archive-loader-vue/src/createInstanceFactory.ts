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
  type VNodeTypes,
  createApp,
  createVNode,
  markRaw,
  reactive,
  ref,
} from 'vue'

import { ArchiveLoaderVueInstance, ArchiveLoaderVueSetup } from './types'

export interface InstanceData<P = any> {
  key: string | number | symbol
  el: HTMLElement
  props: P | undefined
  component: DefineComponent<P>
}

export type InstanceFactory = <P extends object>(component: DefineComponent<P>) => ArchiveLoaderVueInstance<P>

export function createInstanceFactory(setup?: ArchiveLoaderVueSetup): InstanceFactory {
  let instanceMountApp: App | null = null
  let instanceDataKeySeed = 0

  const instanceDataRefs = ref<Set<InstanceData>>(new Set())

  const renderInstances = () => {
    return [...instanceDataRefs.value.values()].map(({ key, el, component, props }) =>
      createVNode(
        Teleport as unknown as VNodeTypes,
        { to: el, key },
        {
          default: () => [createVNode(component, props)],
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

  const mountInstance = <P>(el: HTMLElement, component: DefineComponent<P>, data?: P): InstanceData<P> => {
    mountApp()

    const instanceData = reactive({ component, props: data, key: `instance-${instanceDataKeySeed++}`, el })
    instanceDataRefs.value.add(instanceData as InstanceData<any>)

    return instanceData as InstanceData<P>
  }

  const unmountInstance = (instanceData?: InstanceData) => {
    instanceData && instanceDataRefs.value.delete(instanceData)
  }

  return <P extends object>(component: DefineComponent<P>): ArchiveLoaderVueInstance<P> => {
    let instanceData: InstanceData<P>
    return {
      mount(el, data) {
        instanceData = mountInstance(el, markRaw(component), data)
      },
      unmount() {
        unmountInstance(instanceData)
      },
      setData(data) {
        if (!data) {
          instanceData.props = undefined
        }

        const _props = { ...(instanceData.props ?? {}), ...data } as P
        instanceData.props = _props
      },
    }
  }
}
