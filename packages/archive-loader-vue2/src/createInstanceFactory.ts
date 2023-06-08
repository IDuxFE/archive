/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ArchiveLoaderVue2Instance, ArchiveLoaderVue2Setup } from './types'
import type { InstanceProp, InstancePropTypes } from '@idux/archive-vite-plugin'

import Vue, { type Component, type PropType } from 'vue'

import { isArray, isFunction, isNil, isPlainObject } from 'lodash-es'

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

    const instanceData = { component, props: data ?? {}, key: `instance-${instanceDataKeySeed++}`, el }
    ;(instanceMountApp! as any).addInstanceData(instanceData)

    return instanceData
  }

  const unmountInstance = (instanceData?: InstanceData) => {
    instanceData && (instanceMountApp! as any).removeInstanceData(instanceData)
  }

  return <P extends object>(component: Component<any, any, any, P>): ArchiveLoaderVue2Instance<P> => {
    let instanceData: InstanceData
    const watchCallbacks = new Set<() => void>()
    const runCallbacks = () => {
      watchCallbacks.forEach(cb => {
        cb()
      })
    }

    function watchData(callback: (data: P | undefined) => void): () => void
    function watchData<K extends keyof P>(key: K, callback: (value: P[K] | undefined) => void): () => void
    function watchData<K extends keyof P>(
      key: K | ((data: P | undefined) => void),
      callback?: (value: P[K] | undefined) => void,
    ): () => void {
      let cb: () => void
      if (isFunction(key)) {
        cb = () => {
          key(instanceData.props)
        }
      } else {
        cb = () => {
          callback?.(instanceData.props?.[key])
        }
      }

      watchCallbacks.add(cb)

      return () => {
        watchCallbacks.delete(cb)
      }
    }

    function parsePropType(type?: PropType<unknown> | true | null): InstancePropTypes | undefined {
      if (!type || type === true) {
        return
      }

      const _type = isArray(type) ? type[0] : type

      switch (_type) {
        case Boolean:
          return 'boolean'

        case String:
          return 'string'

        case Number:
          return 'number'

        case Object:
          return 'object'

        case Array:
          return 'array'

        default:
          return
      }
    }

    return {
      mount(el, data) {
        instanceData = mountInstance(el, component, data) as InstanceData<P>

        const instanceProps = this.getProps()

        const defaultData = instanceProps.reduce((res, control) => {
          if (!isNil(control.default)) {
            res[control.key] = control.default
          }

          return res
        }, {} as P)

        if (Object.keys(defaultData).length > 0) {
          this.setData(defaultData)
        }
      },
      unmount() {
        unmountInstance(instanceData)
      },
      getProps() {
        if (!('props' in component) || !component.props) {
          return []
        }

        const props = component.props

        const instanceProps: InstanceProp<P>[] = []

        props &&
          Object.entries(props).forEach(([key, prop]) => {
            let propType: InstanceProp<P>['type'] | undefined
            let defaultValue
            if (isPlainObject(prop) && 'type' in prop) {
              propType = parsePropType(prop.type) as InstanceProp<P>['type']
              defaultValue = isFunction(prop.default) ? prop.default() : prop.default
            } else {
              propType = parsePropType(prop as PropType<unknown>) as InstanceProp<P>['type']
            }

            if (propType) {
              instanceProps.push({
                key: key as keyof P,
                type: propType,
                default: defaultValue,
              })
            }
          })

        return instanceProps
      },
      getData() {
        return instanceData.props
      },
      setData(data) {
        Object.entries(data).forEach(([key, value]) => {
          instanceMountApp?.$set(instanceData.props, key, value)
        })

        runCallbacks()
      },
      watchData,
    }
  }
}
