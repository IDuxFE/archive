/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ArchiveLoaderVue2Instance, ArchiveLoaderVue2Setup } from './types'

import Vue, { type Component } from 'vue'

import { isFunction } from 'lodash-es'

import Teleport from './teleport'

export interface InstanceData<P = any> {
  key: string
  el: HTMLElement
  props: P | undefined
  component: Component
}

export type InstanceFactory = (component: Component) => ArchiveLoaderVue2Instance

interface FactoryApp {
  instanceDatas: InstanceData[]
  _findIndex: (instanceData: InstanceData) => number
  addInstanceData: (instanceData: InstanceData) => void
  removeInstanceData: (instanceData: InstanceData) => void
}

export function createInstanceFactory(setup?: ArchiveLoaderVue2Setup): InstanceFactory {
  let instanceMountApp: Vue | null = null
  let instanceDataKeySeed = 0

  const mountApp = () => {
    if (instanceMountApp) {
      return
    }

    const { data = {}, methods = {}, render, ...rest } = setup?.customOptions ?? {}

    instanceMountApp = new Vue({
      data() {
        const customOptions = (isFunction(data) ? data.call(this) : data) as object

        return {
          instanceDatas: [] as InstanceData[],
          ...customOptions,
        }
      },
      methods: {
        _findIndex(instanceData: InstanceData) {
          return (this as unknown as FactoryApp).instanceDatas.findIndex(d => d.key === instanceData.key)
        },
        addInstanceData(instanceData: InstanceData) {
          if ((this as unknown as FactoryApp)._findIndex(instanceData) > -1) {
            return
          }

          ;(this as unknown as FactoryApp).instanceDatas.push(instanceData)
        },
        removeInstanceData(instanceData: InstanceData) {
          const idx = (this as unknown as FactoryApp)._findIndex(instanceData)
          if (idx < 0) {
            return
          }

          ;(this as unknown as FactoryApp).instanceDatas.splice(idx, 1)
        },
        ...methods,
      },
      render(h) {
        const renderInstances = () => {
          return (this as unknown as FactoryApp).instanceDatas.map(({ key, el, component, props }) =>
            h(Teleport, { props: { to: el, component, componentProps: props }, key }),
          )
        }

        return setup?.renderApp
          ? setup.renderApp(renderInstances())
          : h('div', { style: { display: 'contents' } }, renderInstances())
      },
      ...rest,
    })

    setup?.setupApp?.(instanceMountApp)

    const div = document.createElement('div')
    document.body.appendChild(div)
    instanceMountApp.$mount(div)
  }

  const mountInstance = <P = any>(el: HTMLElement, component: Component<any, any, any, P>, data?: P) => {
    mountApp()

    const instanceData = { component, props: data, key: `instance-${instanceDataKeySeed++}`, el }
    ;(instanceMountApp! as any).addInstanceData(instanceData)

    return instanceData
  }

  const unmountInstance = (instanceData?: InstanceData) => {
    instanceData && (instanceMountApp! as any).removeInstanceData(instanceData)
  }

  return (component: Component): ArchiveLoaderVue2Instance => {
    let instanceData: InstanceData
    return {
      mount(el, data) {
        instanceData = mountInstance(el, component, data) as InstanceData
      },
      unmount() {
        unmountInstance(instanceData)
      },
      setData(data) {
        instanceMountApp?.$set(instanceData, 'props', data)
      },
    }
  }
}
